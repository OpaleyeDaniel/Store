import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";

const PrivacyPolicy = () => {
  return (
    <>
      <Navigation />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16">
          <div className="container-fluid">
            <div className="max-w-4xl">
              <Badge variant="outline" className="mb-4">
                LEGAL
              </Badge>
              <h1 className="heading-display text-black mb-6">
                PRIVACY POLICY
              </h1>
              <p className="text-xl leading-relaxed text-neutral-600 mb-8">
                Your privacy is important to us. This policy explains how we collect, 
                use, and protect your personal information.
              </p>
              <p className="text-sm text-neutral-500">
                Last updated: January 15, 2025
              </p>
            </div>
          </div>
        </section>

        {/* Policy Content */}
        <section className="pb-16">
          <div className="container-fluid">
            <div className="max-w-4xl prose prose-neutral max-w-none">
              <div className="space-y-8">
                <section>
                  <h2 className="text-2xl font-bold text-black mb-4">Information We Collect</h2>
                  <div className="space-y-4 text-neutral-600">
                    <h3 className="text-lg font-semibold text-black">Personal Information</h3>
                    <p>
                      When you create an account, make a purchase, or contact us, we may collect:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Name, email address, and phone number</li>
                      <li>Billing and shipping addresses</li>
                      <li>Payment information (processed securely by our payment partners)</li>
                      <li>Order history and preferences</li>
                      <li>Communication preferences and marketing consent</li>
                    </ul>

                    <h3 className="text-lg font-semibold text-black mt-6">Automatically Collected Information</h3>
                    <p>
                      When you visit our website, we automatically collect:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>IP address and device information</li>
                      <li>Browser type and version</li>
                      <li>Pages visited and time spent on our site</li>
                      <li>Referral sources and search terms</li>
                      <li>Cookies and similar tracking technologies</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-black mb-4">How We Use Your Information</h2>
                  <div className="space-y-4 text-neutral-600">
                    <p>We use your information to:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Process and fulfill your orders</li>
                      <li>Provide customer support and respond to inquiries</li>
                      <li>Send order confirmations, shipping updates, and account notifications</li>
                      <li>Personalize your shopping experience and product recommendations</li>
                      <li>Send marketing communications (with your consent)</li>
                      <li>Improve our website, products, and services</li>
                      <li>Prevent fraud and ensure security</li>
                      <li>Comply with legal obligations</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-black mb-4">Information Sharing</h2>
                  <div className="space-y-4 text-neutral-600">
                    <p>We may share your information with:</p>
                    
                    <h3 className="text-lg font-semibold text-black">Service Providers</h3>
                    <p>
                      Third-party companies that help us operate our business, including payment processors, 
                      shipping companies, email service providers, and analytics services.
                    </p>

                    <h3 className="text-lg font-semibold text-black">Legal Requirements</h3>
                    <p>
                      When required by law, court order, or government regulation, or to protect our 
                      rights, property, or safety.
                    </p>

                    <h3 className="text-lg font-semibold text-black">Business Transfers</h3>
                    <p>
                      In connection with a merger, acquisition, or sale of all or part of our business.
                    </p>

                    <p className="font-medium">
                      We do not sell, rent, or trade your personal information to third parties for 
                      their marketing purposes.
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-black mb-4">Data Security</h2>
                  <div className="space-y-4 text-neutral-600">
                    <p>
                      We implement appropriate technical and organizational measures to protect your 
                      personal information against unauthorized access, alteration, disclosure, or destruction.
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>SSL encryption for data transmission</li>
                      <li>Secure servers and data centers</li>
                      <li>Regular security audits and updates</li>
                      <li>Access controls and employee training</li>
                      <li>PCI DSS compliance for payment processing</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-black mb-4">Your Rights</h2>
                  <div className="space-y-4 text-neutral-600">
                    <p>You have the right to:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Access and review your personal information</li>
                      <li>Correct inaccurate or incomplete information</li>
                      <li>Delete your account and personal information</li>
                      <li>Opt out of marketing communications</li>
                      <li>Restrict or object to certain data processing</li>
                      <li>Data portability (receive your data in a structured format)</li>
                    </ul>
                    <p>
                      To exercise these rights, contact us at privacy@fitforge.com or through your 
                      account settings.
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-black mb-4">Cookies and Tracking</h2>
                  <div className="space-y-4 text-neutral-600">
                    <p>
                      We use cookies and similar technologies to enhance your browsing experience, 
                      analyze site traffic, and for marketing purposes. You can control cookie 
                      preferences through your browser settings.
                    </p>
                    
                    <h3 className="text-lg font-semibold text-black">Types of Cookies We Use</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li><strong>Essential:</strong> Required for website functionality</li>
                      <li><strong>Performance:</strong> Help us improve site performance</li>
                      <li><strong>Functional:</strong> Remember your preferences and settings</li>
                      <li><strong>Marketing:</strong> Deliver relevant ads and measure effectiveness</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-black mb-4">Children's Privacy</h2>
                  <div className="space-y-4 text-neutral-600">
                    <p>
                      Our services are not intended for children under 13 years of age. We do not 
                      knowingly collect personal information from children under 13. If we become 
                      aware that we have collected such information, we will delete it promptly.
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-black mb-4">International Transfers</h2>
                  <div className="space-y-4 text-neutral-600">
                    <p>
                      Your information may be transferred to and processed in countries other than 
                      your own. We ensure appropriate safeguards are in place to protect your 
                      information in accordance with this privacy policy.
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-black mb-4">Policy Updates</h2>
                  <div className="space-y-4 text-neutral-600">
                    <p>
                      We may update this privacy policy from time to time. We will notify you of 
                      any material changes by posting the new policy on our website and updating 
                      the "Last updated" date. Continued use of our services after changes 
                      constitutes acceptance of the updated policy.
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-black mb-4">Contact Us</h2>
                  <div className="space-y-4 text-neutral-600">
                    <p>
                      If you have questions or concerns about this privacy policy or our data 
                      practices, please contact us:
                    </p>
                    <div className="bg-neutral-50 p-6 rounded-lg">
                      <p><strong>Email:</strong> privacy@fitforge.com</p>
                      <p><strong>Phone:</strong> 1-800-FIT-FORGE</p>
                      <p><strong>Mail:</strong><br />
                        FitForge Privacy Team<br />
                        123 Athletic Way<br />
                        Performance City, PC 12345
                      </p>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;