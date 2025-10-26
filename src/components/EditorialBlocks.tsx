import { Link } from 'react-router-dom';
import editorialDetermination from '@/assets/editorial-determination.jpg';
import editorialMotion from '@/assets/editorial-motion.jpg';

const EditorialBlocks = () => {
  const editorials = [
    {
      id: 1,
      title: 'HOW DO YOU',
      subtitle: 'TRAIN?',
      description: 'Every champion has a story. Every story starts with a choice to push beyond what\'s comfortable.',
      image: editorialDetermination,
      cta: 'FIND YOUR WHY'
    },
    {
      id: 2,
      title: 'BUILT FOR',
      subtitle: 'MOTION',
      description: 'When performance meets passion, limits become starting points. Gear that moves with your ambition.',
      image: editorialMotion,
      cta: 'SHOP PERFORMANCE'
    }
  ];

  return (
    <section className="py-24 bg-black">
      <div className="container-fluid">
        <div className="text-center mb-16">
          <p className="label-sm text-white/60 mb-4">ATHLETE STORIES</p>
          <h2 className="display-lg text-white mb-6">
            FORGE YOUR
            <br />
            <span className="text-electric-blue">LEGACY</span>
          </h2>
          <p className="body-lg text-white/80 max-w-2xl mx-auto">
            Behind every breakthrough is relentless dedication. Behind every champion 
            is the gear that never gives up.
          </p>
        </div>

        <div className="grid-hero gap-8">
          {editorials.map((editorial, index) => (
            <div
              key={editorial.id}
              className={`editorial-block group animate-fade-in-up`}
              style={{ animationDelay: `${index * 0.3}s` }}
            >
              <img
                src={editorial.image}
                alt={`${editorial.title} ${editorial.subtitle}`}
                className="editorial-bg"
              />
              <div className="editorial-overlay" />
              
              <div className="editorial-content">
                <h3 className="heading-xl text-white mb-2">
                  {editorial.title}
                </h3>
                <h4 className="heading-xl text-electric-blue mb-6">
                  {editorial.subtitle}
                </h4>
                <p className="text-white/90 mb-8 leading-relaxed">
                  {editorial.description}
                </p>
                <Link 
                  to={editorial.id === 1 ? '/new-arrivals' : '/products'} 
                  className="btn-electric"
                >
                  {editorial.cta}
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="mt-24 text-center">
          <div className="max-w-2xl mx-auto">
            <h3 className="heading-xl text-white mb-4">
              JOIN THE <span className="text-electric-blue">FORGE FAMILY</span>
            </h3>
            <p className="text-white/80 mb-8">
              Get early access to drops, training tips from elite athletes, 
              and exclusive member benefits.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 bg-white/10 backdrop-blur-subtle border border-white/20 rounded-full text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-electric-blue focus:border-transparent"
              />
              <button className="btn-electric whitespace-nowrap">
                JOIN NOW
              </button>
            </div>
            
            <p className="text-xs text-white/60 mt-4">
              No spam, just performance. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditorialBlocks;