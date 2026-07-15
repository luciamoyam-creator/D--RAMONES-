import Hero from '@/components/Hero';
import BornInIbiza from '@/components/BornInIbiza';
import Legacy from '@/components/Legacy';
import WorldGlobe from '@/components/WorldGlobe';
import Events from '@/components/Events';
import Contact from '@/components/Contact';
import Nav from '@/components/Nav';

export default function Home() {
  return (
    <main id="top" className="relative w-full bg-ink">
      <Nav />
      <Hero />
      <BornInIbiza />
      <div id="legacy">
        <Legacy />
      </div>
      <div id="world">
        <WorldGlobe />
      </div>
      <div id="events">
        <Events />
      </div>
      <div id="contact">
        <Contact />
      </div>
    </main>
  );
}
