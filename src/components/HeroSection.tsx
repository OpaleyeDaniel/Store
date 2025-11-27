import heroImage from '@/assets/hero-athlete.jpg';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="hero-section">
      <img
        src={""|| "COMING SOON"}
        alt="Athletic woman in motion - Premium fitness wear"
        className="hero-bg"
      />
      <div className="hero-overlay" />
      
      <div className="hero-content">
        <div className="mb-6">
          <p className="label-sm text-white/80 mb-4">NEW PRODUCT COLLECTION</p>
          <h1 className="display-xl text-white text-shadow mb-6">
            CLAIM YOUR
            <br />
            <span className="text-electric-blue">LIMITS</span>
          </h1>
          <p className="body-lg text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
          A circular economy platform where you dont sell your old items for cash , you trade them for "karma points" to get other itemsyou need,
          fostering community and sustainability.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link to="/collections" className="btn-electric w-full sm:w-auto">
            SHOP COLLECTION
          </Link>
          <Link to="/new-arrivals" className="btn-outline text-white border-white hover:bg-white hover:text-black w-full sm:w-auto">
            DISCOVER MORE
          </Link>
        </div>
        
        <div className="mt-12 flex items-center justify-center space-x-8 text-white/60">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">15K+</div>
            <div className="text-sm">PRODUCTS</div>
          </div>
          <div className="w-px h-8 bg-white/20"></div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">98%</div>
            <div className="text-sm">Satisfaction</div>
          </div>
          <div className="w-px h-8 bg-white/20"></div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">24/7</div>
            <div className="text-sm">Support</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;