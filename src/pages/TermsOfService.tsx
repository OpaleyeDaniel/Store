import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";

const TermsOfService = () => {
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
                TERMS OF SERVICE
              </h1>
              <p className="text-xl leading-relaxed text-neutral-600 mb-8">
                These terms govern your use of our website and services. 
                Please read them carefully before making a purchase.
              </p>
              <p className="text-sm text-neutral-500">
                Last updated: January 15, 2025
              </p>
            </div>
          </div>
        </section>

        {/* Terms Content */}
        <section className="pb-16">
          <div className="container-fluid">
            <div className="max-w-4xl prose prose-neutral max-w-none">
              <div className="space-y-8">
                <section>
                  <h2 className="text-2xl font-bold text-black mb-4">Acceptance of Terms</h2>
                  <div className="space-y-4 text-neutral-600">
                    <p>
                      By accessing and using the FitForge website (the "Service"), you accept and agree 
                      to be bound by these Terms of Service ("Terms"). If you do not agree to these 
                      Terms, you may not access or use our Service.
                    </p>
                    <p>
                      These Terms apply to all visitors, users, and customers who access or use the Service.
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-black mb-4">Use of Our Service</h2>
                  <div className="space-y-4 text-neutral-600">
                    <h3 className="text-lg font-semibold text-black">Permitted Use</h3>
                    <p>You may use our Service to:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Browse and purchase our products</li>
                      <li>Create an account and manage your profile</li>
                      <li>Access customer support and information</li>
                      <li>Participate in promotional activities</li>
                    </ul>

                    <h3 className="text-lg font-semibold text-black">Prohibited Use</h3>
                    <p>You may not use our Service to:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Violate any laws or regulations</li>
                      <li>Infringe on intellectual property rights</li>
                      <li>Transmit harmful or malicious code</li>
                      <li>Engage in fraudulent activities</li>
                      <li>Interfere with or disrupt the Service</li>
                      <li>Collect user information without consent</li>
                      <li>Use the Service for commercial purposes without authorization</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-black mb-4">Account Registration</h2>
                  <div className="space-y-4 text-neutral-600">
                    <p>
                      When creating an account, you must provide accurate, complete, and current 
                      information. You are responsible for maintaining the confidentiality of your 
                      account credentials and for all activities under your account.
                    </p>
                    <p>
                      You must notify us immediately of any unauthorized use of your account or 
                      any security breach.
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-black mb-4">Products and Orders</h2>
                  <div className="space-y-4 text-neutral-600">
                    <h3 className="text-lg font-semibold text-black">Product Information</h3>
                    <p>
                      We strive to display our products as accurately as possible. However, we cannot 
                      guarantee that colors, textures, or other details will appear exactly as shown 
                      on your device.
                    </p>

                    <h3 className="text-lg font-semibold text-black">Pricing</h3>
                    <p>
                      All prices are in USD and subject to change without notice. We reserve the right 
                      to correct pricing errors and cancel orders placed at incorrect prices.
                    </p>

                    <h3 className="text-lg font-semibold text-black">Order Acceptance</h3>
                    <p>
                      Your order constitutes an offer to purchase. We reserve the right to accept or 
                      decline any order for any reason, including but not limited to product availability, 
                      pricing errors, or fraudulent activity.
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-black mb-4">Payment Terms</h2>
                  <div className="space-y-4 text-neutral-600">
                    <p>
                      Payment is due at the time of order placement. We accept major credit cards, 
                      PayPal, and other approved payment methods. By providing payment information, 
                      you represent that you are authorized to use the payment method.
                    </p>
                    <p>
                      If payment is declined or cannot be processed, we may cancel your order or 
                      suspend your account until payment issues are resolved.
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-black mb-4">Shipping and Delivery</h2>
                  <div className="space-y-4 text-neutral-600">
                    <p>
                      Shipping costs and delivery times are calculated at checkout based on your 
                      location and selected shipping method. Risk of loss passes to you upon delivery 
                      to the carrier.
                    </p>
                    <p>
                      Delivery dates are estimates and not guaranteed. We are not liable for delays 
                      caused by shipping carriers, weather, or other factors beyond our control.
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-black mb-4">Returns and Refunds</h2>
                  <div className="space-y-4 text-neutral-600">
                    <p>
                      Our return policy allows returns within 30 days of delivery for unworn, 
                      unwashed items in original condition with tags attached. Certain items 
                      (underwear, swimwear, personalized items) cannot be returned for hygiene reasons.
                    </p>
                    <p>
                      Refunds will be processed to your original payment method within 3-5 business 
                      days of receiving your return. Shipping costs are non-refundable unless the 
                      return is due to our error.
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-black mb-4">Intellectual Property</h2>
                  <div className="space-y-4 text-neutral-600">
                    <p>
                      All content on our Service, including text, graphics, logos, images, and software, 
                      is the property of FitForge or its licensors and is protected by copyright, trademark, 
                      and other intellectual property laws.
                    </p>
                    <p>
                      You may not reproduce, distribute, modify, or create derivative works from our 
                      content without express written permission.
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-black mb-4">Privacy Policy</h2>
                  <div className="space-y-4 text-neutral-600">
                    <p>
                      Your privacy is important to us. Our Privacy Policy explains how we collect, 
                      use, and protect your information when you use our Service. By using our Service, 
                      you consent to our privacy practices.
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-black mb-4">Disclaimers and Limitations</h2>
                  <div className="space-y-4 text-neutral-600">
                    <h3 className="text-lg font-semibold text-black">Warranty Disclaimer</h3>
                    <p>
                      Our Service is provided "as is" and "as available" without warranties of any kind, 
                      either express or implied. We disclaim all warranties, including but not limited 
                      to merchantability, fitness for a particular purpose, and non-infringement.
                    </p>

                    <h3 className="text-lg font-semibold text-black">Limitation of Liability</h3>
                    <p>
                      To the maximum extent permitted by law, FitForge shall not be liable for any 
                      indirect, incidental, special, consequential, or punitive damages, or any loss 
                      of profits or revenues, whether incurred directly or indirectly.
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-black mb-4">Indemnification</h2>
                  <div className="space-y-4 text-neutral-600">
                    <p>
                      You agree to indemnify and hold FitForge harmless from any claims, damages, 
                      losses, and expenses arising from your use of our Service, violation of these 
                      Terms, or infringement of any rights of another party.
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-black mb-4">Governing Law</h2>
                  <div className="space-y-4 text-neutral-600">
                    <p>
                      These Terms are governed by the laws of the State of [State] without regard to 
                      conflict of law principles. Any disputes arising from these Terms or your use 
                      of our Service will be resolved in the courts of [State].
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-black mb-4">Changes to Terms</h2>
                  <div className="space-y-4 text-neutral-600">
                    <p>
                      We reserve the right to modify these Terms at any time. Changes will be effective 
                      immediately upon posting to our website. Your continued use of our Service after 
                      changes constitutes acceptance of the modified Terms.
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-black mb-4">Contact Information</h2>
                  <div className="space-y-4 text-neutral-600">
                    <p>
                      If you have questions about these Terms, please contact us:
                    </p>
                    <div className="bg-neutral-50 p-6 rounded-lg">
                      <p><strong>Email:</strong> legal@fitforge.com</p>
                      <p><strong>Phone:</strong> 1-800-FIT-FORGE</p>
                      <p><strong>Mail:</strong><br />
                        FitForge Legal Department<br />
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

export default TermsOfService;