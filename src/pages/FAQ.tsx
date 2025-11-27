import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const faqs = [
    {
      category: "Orders & Shipping",
      questions: [
        {
          question: "How long does shipping take?",
          answer: "Standard shipping takes 5-7 business days, Express shipping takes 2-3 business days, and Overnight shipping takes 1 business day. Orders placed before 2PM EST ship the same day."
        },
        {
          question: "Do you offer free shipping?",
          answer: "Yes! We offer free standard shipping on all orders over $75. Orders under $75 have a flat $5.99 shipping fee."
        },
        {
          question: "Can I change or cancel my order?",
          answer: "You can modify or cancel your order within 1 hour of placing it. After that, orders move to our fulfillment center and cannot be changed. Contact us immediately if you need to make changes."
        },
        {
          question: "Do you ship internationally?",
          answer: "Yes, we ship to Canada, UK, Australia, and select European countries. International shipping rates are calculated at checkout and typically take 7-14 business days."
        }
      ]
    },
    {
      category: "Products & Sizing",
      questions: [
        {
          question: "How do I find my size?",
          answer: "Check our detailed size guide which includes measurements for chest, waist, and hips. If you're between sizes, we recommend sizing up for comfort. Our activewear is designed for a close, athletic fit."
        },
        {
          question: "What materials are your products made from?",
          answer: "Our products are made from high-performance fabrics including moisture-wicking polyester blends, four-way stretch materials, and sustainable recycled fibers. Each product page lists specific material compositions."
        },
        {
          question: "Are your products suitable for all types of workouts?",
          answer: "Yes! Our gear is designed for versatility - from high-intensity training to yoga, running to weightlifting. Each product description includes recommended activities and performance features."
        },
        {
          question: "How should I care for my skarma items?",
          answer: "Machine wash cold with like colors, avoid fabric softener, and air dry when possible. Detailed care instructions are included with each purchase and on product pages."
        }
      ]
    },
    {
      category: "Returns & Exchanges",
      questions: [
        {
          question: "What is your return policy?",
          answer: "We offer free returns within 30 days of delivery. Items must be unworn, unwashed, and in original condition with tags attached. Underwear, swimwear, and personalized items cannot be returned."
        },
        {
          question: "How do I start a return?",
          answer: "Log into your account and select the items you'd like to return. Print your prepaid return label and drop off at any UPS location. We'll process your refund within 3-5 business days of receiving your return."
        },
        {
          question: "Can I exchange for a different size or color?",
          answer: "Yes! We offer free exchanges for different sizes or colors of the same item, subject to availability. Size exchanges are expedited at no extra cost."
        },
        {
          question: "What if I received a defective item?",
          answer: "Defective items are replaced or refunded immediately. Contact our customer service team with photos of the defect, and we'll take care of it right away."
        }
      ]
    },
    {
      category: "Account & Payment",
      questions: [
        {
          question: "Do I need an account to make a purchase?",
          answer: "No, you can check out as a guest. However, creating an account allows you to track orders, save addresses, view order history, and manage returns more easily."
        },
        {
          question: "What payment methods do you accept?",
          answer: "We accept all major credit cards (Visa, Mastercard, American Express, Discover), PayPal, Apple Pay, Google Pay, and Shop Pay for convenient checkout."
        },
        {
          question: "Is my payment information secure?",
          answer: "Absolutely. We use industry-standard SSL encryption and never store your payment information. All transactions are processed through secure, PCI-compliant payment processors."
        },
        {
          question: "Can I save items for later?",
          answer: "Yes! Add items to your wishlist or save them in your cart. We'll even send you a reminder if you leave items in your cart, plus notify you if they go on sale."
        }
      ]
    }
  ];

  const filteredFAQs = faqs.map(category => ({
    ...category,
    questions: category.questions.filter(
      q => 
        q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <>
      <Navigation />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16">
          <div className="container-fluid">
            <div className="max-w-4xl">
              <Badge variant="outline" className="mb-4">
                HELP CENTER
              </Badge>
              <h1 className="heading-display text-black mb-6">
                FREQUENTLY ASKED QUESTIONS
              </h1>
              <p className="text-xl leading-relaxed text-neutral-600 mb-8">
                Find quick answers to common questions about orders, shipping, 
                returns, and more.
              </p>
              
              {/* Search */}
              <div className="relative max-w-lg">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search FAQs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="pb-16">
          <div className="container-fluid">
            <div className="max-w-4xl">
              {filteredFAQs.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-neutral-600">
                    No FAQs found matching your search. Try different keywords or 
                    <button 
                      onClick={() => setSearchTerm("")}
                      className="text-electric-blue hover:underline ml-1"
                    >
                      clear your search
                    </button>
                    .
                  </p>
                </div>
              ) : (
                <div className="space-y-8">
                  {filteredFAQs.map((category, categoryIndex) => (
                    <div key={category.category}>
                      <h2 className="text-2xl font-bold text-black mb-6">
                        {category.category}
                      </h2>
                      <Accordion type="single" collapsible className="space-y-4">
                        {category.questions.map((faq, index) => (
                          <AccordionItem 
                            key={`${categoryIndex}-${index}`}
                            value={`${categoryIndex}-${index}`}
                            className="border border-neutral-200 rounded-lg px-6"
                          >
                            <AccordionTrigger className="text-left hover:no-underline">
                              {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-neutral-600 leading-relaxed">
                              {faq.answer}
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 bg-neutral-50">
          <div className="container-fluid">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold text-black mb-4">
                Still Have Questions?
              </h2>
              <p className="text-neutral-600 mb-8">
                Can't find what you're looking for? Our customer service team 
                is here to help with any questions or concerns.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <div className="text-center">
                  <p className="font-medium text-black mb-1">Email Support</p>
                  <a 
                    href="mailto:help@skarma.com" 
                    className="text-electric-blue hover:underline"
                  >
                    help@skarma.com
                  </a>
                </div>
                <div className="hidden sm:block text-neutral-300">|</div>
                <div className="text-center">
                  <p className="font-medium text-black mb-1">Phone Support</p>
                  <a 
                    href="tel:1-800-348-3674" 
                    className="text-electric-blue hover:underline"
                  >
                    1-800-KARMA
                  </a>
                </div>
                <div className="hidden sm:block text-neutral-300">|</div>
                <div className="text-center">
                  <p className="font-medium text-black mb-1">Hours</p>
                  <p className="text-neutral-600">Mon-Fri, 9AM-6PM EST</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default FAQ;