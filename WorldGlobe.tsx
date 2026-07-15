'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cities, type City } from '@/lib/data';

gsap.registerPlugin(ScrollTrigger);

const RADIUS = 2.4;

function latLngToVector3(lat: number, lng: number, radius: number) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const x = -radius * Math.sin(phi) * Math.cos(theta);
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.sin(theta);
  return new THREE.Vector3(x, y, z);
}

export default function WorldGlobe() {
  const mountRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [activeCity, setActiveCity] = useState<City | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      mount.clientWidth / mount.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 6.4);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    // Globo — wireframe de puntos (dot-matrix), estética de mapa de expedición
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    const dotGeometry = new THREE.SphereGeometry(0.012, 6, 6);
    const dotMaterial = new THREE.MeshBasicMaterial({ color: 0x57544c });
    const dotMesh = new THREE.InstancedMesh(dotGeometry, dotMaterial, 2600);
    const dummy = new THREE.Object3D();
    let idx = 0;
    const rows = 60;
    for (let i = 0; i < rows; i++) {
      const lat = -90 + (180 / rows) * i;
      const circumference = Math.cos((lat * Math.PI) / 180);
      const count = Math.max(4, Math.floor(rows * 2 * circumference));
      for (let j = 0; j < count; j++) {
        const lng = (360 / count) * j - 180;
        const pos = latLngToVector3(lat, lng, RADIUS);
        dummy.position.copy(pos);
        dummy.lookAt(pos.clone().multiplyScalar(2));
        dummy.updateMatrix();
        if (idx < 2600) {
          dotMesh.setMatrixAt(idx, dummy.matrix);
          idx++;
        }
      }
    }
    dotMesh.count = idx;
    globeGroup.add(dotMesh);

    // Núcleo interior sutil
    const coreGeometry = new THREE.SphereGeometry(RADIUS - 0.05, 32, 32);
    const coreMaterial = new THREE.MeshBasicMaterial({
      color: 0x0a0a09,
      transparent: true,
      opacity: 0.9,
    });
    globeGroup.add(new THREE.Mesh(coreGeometry, coreMaterial));

    // Marcadores de ciudad + arcos hacia Ibiza (hub)
    const hub = cities[0];
    const hubPos = latLngToVector3(hub.lat, hub.lng, RADIUS);
    const cityMeshes: { mesh: THREE.Mesh; city: City }[] = [];

    cities.forEach((city) => {
      const pos = latLngToVector3(city.lat, city.lng, RADIUS);

      const markerGeo = new THREE.SphereGeometry(0.045, 12, 12);
      const markerMat = new THREE.MeshBasicMaterial({ color: 0xc99a5f });
      const marker = new THREE.Mesh(markerGeo, markerMat);
      marker.position.copy(pos);
      globeGroup.add(marker);
      cityMeshes.push({ mesh: marker, city });

      // Halo pulsante
      const haloGeo = new THREE.RingGeometry(0.06, 0.09, 24);
      const haloMat = new THREE.MeshBasicMaterial({
        color: 0xc99a5f,
        transparent: true,
        opacity: 0.5,
        side: THREE.DoubleSide,
      });
      const halo = new THREE.Mesh(haloGeo, haloMat);
      halo.position.copy(pos);
      halo.lookAt(pos.clone().multiplyScalar(2));
      globeGroup.add(halo);
      gsap.to(halo.scale, {
        x: 2.2,
        y: 2.2,
        z: 2.2,
        duration: 1.8 + Math.random(),
        repeat: -1,
        ease: 'power1.out',
        delay: Math.random() * 1.5,
      });
      gsap.to(haloMat, {
        opacity: 0,
        duration: 1.8 + Math.random(),
        repeat: -1,
        ease: 'power1.out',
        delay: Math.random() * 1.5,
      });

      if (city.id !== hub.id) {
        // Arco curvo entre la ciudad y el hub (Ibiza)
        const mid = pos.clone().add(hubPos).multiplyScalar(0.5).normalize().multiplyScalar(RADIUS + 0.9);
        const curve = new THREE.QuadraticBezierCurve3(pos, mid, hubPos);
        const points = curve.getPoints(50);
        const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
        const lineMat = new THREE.LineBasicMaterial({
          color: 0xc99a5f,
          transparent: true,
          opacity: 0.35,
        });
        globeGroup.add(new THREE.Line(lineGeo, lineMat));
      }
    });

    // Iluminación ambiental mínima
    scene.add(new THREE.AmbientLight(0xffffff, 0.6));

    // Interacción: raycasting para detectar hover sobre marcadores
    const raycaster = new THREE.Raycaster();
    raycaster.params.Mesh.threshold = 0.02;
    const pointer = new THREE.Vector2();
    let hoveredCity: City | null = null;

    const onPointerMove = (e: PointerEvent) => {
      const rect = mount.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };
    mount.addEventListener('pointermove', onPointerMove);

    let autoRotate = true;
    const onPointerDown = () => {
      autoRotate = false;
    };
    const onPointerUp = () => {
      autoRotate = true;
    };
    mount.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointerup', onPointerUp);

    let dragX = 0;
    const onDrag = (e: PointerEvent) => {
      if (e.buttons !== 1) return;
      dragX += e.movementX * 0.005;
    };
    mount.addEventListener('pointermove', onDrag);

    const clock = new THREE.Clock();
    let frameId: number;

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      if (autoRotate) {
        globeGroup.rotation.y += delta * 0.08;
      } else {
        globeGroup.rotation.y += dragX;
        dragX *= 0.9;
      }

      raycaster.setFromCamera(pointer, camera);
      const intersects = raycaster.intersectObjects(cityMeshes.map((c) => c.mesh));
      if (intersects.length > 0) {
        const hit = cityMeshes.find((c) => c.mesh === intersects[0].object);
        if (hit && hoveredCity?.id !== hit.city.id) {
          hoveredCity = hit.city;
          setActiveCity(hit.city);
        }
      }

      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener('resize', onResize);

    // Entrada suave del globo al hacer scroll hasta la sección
    gsap.fromTo(
      globeGroup.scale,
      { x: 0.7, y: 0.7, z: 0.7 },
      {
        x: 1,
        y: 1,
        z: 1,
        duration: 1.6,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
      }
    );

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('pointerup', onPointerUp);
      mount.removeEventListener('pointermove', onPointerMove);
      mount.removeEventListener('pointerdown', onPointerDown);
      mount.removeEventListener('pointermove', onDrag);
      renderer.dispose();
      dotGeometry.dispose();
      dotMaterial.dispose();
      coreGeometry.dispose();
      coreMaterial.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden bg-ink py-20 md:py-28">
      <div className="px-6 md:px-16">
        <span className="eyebrow">03 — The World</span>
        <h2 className="mt-4 font-display text-giant font-light">Across every dancefloor.</h2>
      </div>

      <div className="relative mt-8 grid grid-cols-1 items-center gap-8 px-4 md:mt-4 md:grid-cols-2 md:px-16">
        <div
          ref={mountRef}
          data-cursor-hover
          className="h-[55vh] w-full cursor-grab active:cursor-grabbing md:h-[75vh]"
        />

        <div className="relative min-h-[220px] px-2 md:px-0">
          {activeCity ? (
            <div key={activeCity.id} className="animate-[fadeIn_0.6s_ease]">
              <div className="relative aspect-[4/5] w-full max-w-sm overflow-hidden">
                <Image
                  src={activeCity.image}
                  alt={activeCity.event}
                  fill
                  sizes="400px"
                  className="object-cover grayscale"
                />
              </div>
              <div className="mt-5">
                <span className="eyebrow">{activeCity.country} — {activeCity.year}</span>
                <h3 className="mt-2 font-display text-4xl font-light">{activeCity.name}</h3>
                <p className="mt-1 text-sm font-light text-stone">{activeCity.event}</p>
              </div>
            </div>
          ) : (
            <p className="max-w-xs text-sm font-light leading-relaxed text-stone">
              Mueve el ratón sobre el globo para descubrir cada ciudad donde D-RAMONES ha
              dejado su huella.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
