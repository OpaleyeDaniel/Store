import { Link } from 'react-router-dom';
import collectionEveryday from '@/assets/collection-everyday.jpg';
import collectionShorts from '@/assets/collection-shorts.jpg';

const CollectionBlocks = () => {
  const collections = [
    {
      id: 1,
      title: 'EVERYDAY SEAMLESS',
      subtitle: 'Move Without Limits',
      description: 'Buttery-soft essentials engineered for all-day comfort and performance.',
      image: collectionEveryday,
      cta: 'SHOP ESSENTIALS',
      link: '/collections/summer-essentials'
    },
    {
      id: 2,
      title: 'ALL-ROUNDER SHORTS',
      subtitle: 'Built for Every Workout',
      description: 'High-performance shorts that transition seamlessly from gym to street.',
      image: collectionShorts,
      cta: 'SHOP SHORTS',
      link: '/products?category=shorts'
    }
  ];

  return (
    <section className="py-24 bg-neutral-50">
      <div className="container-fluid">
        <div className="text-center mb-16">
          <p className="label-sm text-neutral-600 mb-4">FEATURED COLLECTIONS</p>
          <h2 className="display-lg text-black mb-6">
            PERFORMANCE MEETS
            <br />
            <span className="text-electric-blue">DISCOVERED</span>
          </h2>
          <p className="body-lg text-neutral-600 max-w-2xl mx-auto">
          THis is a circular economy platform where you dont sell your old items for cash , you trade them for "karma points" to get other itemsyou need,
          fostering community and sustainability.
          </p>
        </div>

        <div className="grid-hero gap-12">
          {collections.map((collection, index) => (
            <div
              key={collection.id}
              className={`collection-block group aspect-[4/3] animate-fade-in-up`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <img
                src={collection.image}
                alt={collection.title}
                className="w-full h-full object-cover"
              />
              <div className="collection-overlay" />
              
              <div className="collection-content">
                <p className="label-sm text-white/80 mb-2">{collection.subtitle}</p>
                <h3 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">{collection.title}</h3>
                <p className="text-white/90 mb-6 leading-relaxed hidden md:block">
                  {collection.description}
                </p>
                <Link to={collection.link} className="btn-electric">
                  {collection.cta}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CollectionBlocks;