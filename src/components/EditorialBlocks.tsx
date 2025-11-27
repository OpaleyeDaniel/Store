/** @format */

import { Link } from "react-router-dom";
import editorialDetermination from "@/assets/editorial-determination.jpg";
import editorialMotion from "@/assets/editorial-motion.jpg";

const EditorialBlocks = () => {
  const editorials = [
    {
      id: 1,
      title: "HOW IT WORKS",
      subtitle: "LIST AN ITEM:",
      description:
        "Snap a picture of something you no loner need (e.g, a book, a kitchen gadget, a jacket, e.t.c).the AI suggests a karma value based on the items condition, brand and demand.",
      image: editorialDetermination,
      cta: "FIND YOUR WHY",
    },
    {
      id: 2,
      title: "LEARN KARMA POINT",
      subtitle: "EARN POINT",
      description:
        "Once another user picks up your items (via delievery, a meet up or shipping),you receive the karma points.",
      image: editorialMotion,
      cta: "SHOP PERFORMANCE",
    },
  ];

  return (
    <section className='py-24 bg-black'>
      <div className='container-fluid'>
        <div className='text-center mb-16'>
          <p className='label-sm text-white/60 mb-4'>PEOPLE STORIES</p>
          <h2 className='display-lg text-white mb-6'>
            CLAIM YOUR
            <br />
            <span className='text-electric-blue'>LEGACY</span>
          </h2>
          <p className='body-lg text-white/80 max-w-2xl mx-auto'>
            The Foundation - Core Technology & Economy This is the
            non-negotiable bedrock of the app. If this isn't rock-solid, the app
            will fail.
          </p>
        </div>

        <div className='grid-hero gap-8'>
          {editorials.map((editorial, index) => (
            <div
              key={editorial.id}
              className={`editorial-block group animate-fade-in-up`}
              style={{ animationDelay: `${index * 0.3}s` }}
            >
              <img
                src={editorial.image}
                alt={`${editorial.title} ${editorial.subtitle}`}
                className='editorial-bg'
              />
              <div className='editorial-overlay' />

              <div className='editorial-content'>
                <h3 className='heading-xl text-white mb-2'>
                  {editorial.title}
                </h3>
                <h4 className='heading-xl text-electric-blue mb-6'>
                  {editorial.subtitle}
                </h4>
                <p className='text-white/90 mb-8 leading-relaxed'>
                  {editorial.description}
                </p>
                <Link
                  to={editorial.id === 1 ? "/new-arrivals" : "/products"}
                  className='btn-electric'
                >
                  {editorial.cta}
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className='mt-24 text-center'>
          <div className='max-w-2xl mx-auto'>
            <h3 className='heading-xl text-white mb-4'>
              JOIN THE <span className='text-electric-blue'>KARMA FAMILY</span>
            </h3>
            <p className='text-white/80 mb-8'>
              premium features like promoted listings for business, optimal
              shipping insurance, or taking a small karma fee on high value
              trades
            </p>

            <div className='flex flex-col sm:flex-row gap-4 max-w-md mx-auto'>
              <input
                type='email'
                placeholder='Enter your email'
                className='flex-1 px-6 py-4 bg-white/10 backdrop-blur-subtle border border-white/20 rounded-full text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-electric-blue focus:border-transparent'
              />
              <button className='btn-electric whitespace-nowrap'>
                JOIN NOW
              </button>
            </div>

            <p className='text-xs text-white/60 mt-4'>
              No spam, just performance. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditorialBlocks;
