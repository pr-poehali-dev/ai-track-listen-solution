import Header from '@/components/Header';
import Hero from '@/components/Hero';
import MusicPlayer from '@/components/MusicPlayer';
import Catalog from '@/components/Catalog';
import About from '@/components/About';
import Subscription from '@/components/Subscription';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <MusicPlayer />
        <Catalog />
        <About />
        <Subscription />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;