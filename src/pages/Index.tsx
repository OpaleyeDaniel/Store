import Navigation from '../components/Navigation';
import HeroSection from '../components/HeroSection';
import CollectionBlocks from '../components/CollectionBlocks';
import ProductGrid from '../components/ProductGrid';
import EditorialBlocks from '../components/EditorialBlocks';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
        <CollectionBlocks />
        <ProductGrid />
        <EditorialBlocks />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
