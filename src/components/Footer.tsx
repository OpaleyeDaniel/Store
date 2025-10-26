import { Instagram, Twitter, Facebook, Youtube } from 'lucide-react';

const Footer = () => {
  const footerSections = [
    {
      title: 'SHOP',
      links: [
        { name: 'New Arrivals', href: '/new-arrivals' },
        { name: 'Women', href: '/women' },
        { name: 'Men', href: '/men' },
        { name: 'Sale', href: '/sale' }
      ]
    },
    {
      title: 'HELP',
      links: [
        { name: 'Size Guide', href: '/size-guide' },
        { name: 'Shipping', href: '/shipping' },
        { name: 'Returns', href: '/returns' },
        { name: 'FAQ', href: '/faq' },
        { name: 'Contact Us', href: '/contact' }
      ]
    },
    {
      title: 'ABOUT',
      links: [
        { name: 'Our Story', href: '/about' },
        { name: 'Partnerships', href: '/partnerships' },
        { name: 'Privacy Policy', href: '/privacy-policy' },
        { name: 'Terms of Service', href: '/terms-of-service' }
      ]
    }
  ];

  const socialLinks = [
    { icon: Instagram, href: 'https://instagram.com/fitforgeofficial', label: 'Instagram' },
    { icon: Twitter, href: 'https://twitter.com/fitforge', label: 'Twitter' },
    { icon: Facebook, href: 'https://facebook.com/fitforgeofficial', label: 'Facebook' },
    { icon: Youtube, href: 'https://youtube.com/@fitforge', label: 'YouTube' }
  ];

  return (
    <footer className="bg-white border-t border-neutral-200">
      <div className="container-fluid py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2 text-center sm:text-left">
            <h2 className="text-2xl font-black tracking-tight mb-4">
              FIT<span className="text-electric-blue">FORGE</span>
            </h2>
            <p className="text-neutral-600 mb-6 leading-relaxed max-w-md mx-auto sm:mx-0">
              Engineered for athletes who refuse to settle. Performance wear 
              that moves with your ambition and amplifies your potential.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center justify-center sm:justify-start space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="p-2 text-neutral-600 hover:text-electric-blue transition-colors duration-200"
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.title} className="text-center sm:text-left">
              <h3 className="label-sm text-black mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-sm text-neutral-600 hover:text-black transition-colors duration-200"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="border-t border-neutral-200 pt-12 mb-12">
          <div className="max-w-md mx-auto text-center sm:text-left sm:mx-0">
            <h3 className="heading-lg text-black mb-2">
              TRAIN WITH THE <span className="text-electric-blue">BEST</span>
            </h3>
            <p className="text-neutral-600 mb-6">
              Weekly training tips, product drops, and athlete stories delivered to your inbox.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border border-neutral-300 rounded-full focus:outline-none focus:ring-2 focus:ring-electric-blue focus:border-transparent"
              />
              <button className="btn-electric w-full sm:w-auto">
                SUBSCRIBE
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-neutral-200 pt-8">
          <div className="text-center">
            <span className="text-sm text-neutral-600">© 2025 FitForge. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;