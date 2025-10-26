import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCcw, Shield, Calendar, CreditCard } from "lucide-react";

const Returns = () => {
  return (
    <>
      <Navigation />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16">
          <div className="container-fluid">
            <div className="max-w-4xl">
              <Badge variant="outline" className="mb-4">
                HASSLE-FREE RETURNS
              </Badge>
              <h1 className="heading-display text-black mb-6">
                RETURNS & EXCHANGES
              </h1>
              <p className="text-xl leading-relaxed text-neutral-600 mb-8">
                Not completely satisfied? No problem. Easy returns and exchanges 
                within 30 days of purchase.
              </p>
            </div>
          </div>
        </section>

        {/* Return Process */}
        <section className="pb-16">
          <div className="container-fluid">
            {/* Key Features */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-electric-blue/10 rounded-full flex items-center justify-center mb-4">
                    <Calendar className="w-6 h-6 text-electric-blue" />
                  </div>
                  <CardTitle className="text-lg">30-Day Window</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-neutral-600">
                    Return or exchange items within 30 days of delivery
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-electric-blue/10 rounded-full flex items-center justify-center mb-4">
                    <RefreshCcw className="w-6 h-6 text-electric-blue" />
                  </div>
                  <CardTitle className="text-lg">Free Returns</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-neutral-600">
                    Free return shipping on all domestic orders
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-electric-blue/10 rounded-full flex items-center justify-center mb-4">
                    <Shield className="w-6 h-6 text-electric-blue" />
                  </div>
                  <CardTitle className="text-lg">Quality Guarantee</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-neutral-600">
                    Defective items replaced or refunded immediately
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-electric-blue/10 rounded-full flex items-center justify-center mb-4">
                    <CreditCard className="w-6 h-6 text-electric-blue" />
                  </div>
                  <CardTitle className="text-lg">Quick Refunds</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-neutral-600">
                    Refunds processed within 3-5 business days
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Return Process Steps */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>How to Return Items</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-10 h-10 bg-electric-blue text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                      1
                    </div>
                    <h4 className="font-medium mb-2">Start Your Return</h4>
                    <p className="text-sm text-neutral-600">
                      Log into your account and select the items you'd like to return. 
                      Print your prepaid return label.
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-10 h-10 bg-electric-blue text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                      2
                    </div>
                    <h4 className="font-medium mb-2">Pack & Ship</h4>
                    <p className="text-sm text-neutral-600">
                      Package items in original condition with tags attached. 
                      Drop off at any UPS location or schedule a pickup.
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-10 h-10 bg-electric-blue text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                      3
                    </div>
                    <h4 className="font-medium mb-2">Get Refunded</h4>
                    <p className="text-sm text-neutral-600">
                      Once we receive your return, we'll inspect and process your 
                      refund within 3-5 business days.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Return Policy Details */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Return Requirements</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Item Condition</h4>
                    <p className="text-sm text-neutral-600">
                      Items must be unworn, unwashed, and in original condition with all tags attached.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Original Packaging</h4>
                    <p className="text-sm text-neutral-600">
                      While not required, returning items in original packaging helps ensure safe transit.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Proof of Purchase</h4>
                    <p className="text-sm text-neutral-600">
                      Original receipt or order confirmation required for all returns and exchanges.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Non-Returnable Items</h4>
                    <p className="text-sm text-neutral-600">
                      Underwear, swimwear, and personalized items cannot be returned for hygiene reasons.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Exchanges & Store Credit</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Size Exchanges</h4>
                    <p className="text-sm text-neutral-600">
                      Need a different size? We'll expedite your exchange at no extra cost.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Color Exchanges</h4>
                    <p className="text-sm text-neutral-600">
                      Exchange for a different color of the same item, subject to availability.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Store Credit Option</h4>
                    <p className="text-sm text-neutral-600">
                      Receive store credit instead of a refund. Store credit never expires and can be used on sale items.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Gift Returns</h4>
                    <p className="text-sm text-neutral-600">
                      Gift recipients can return items for store credit without a receipt using our gift return process.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* CTA Section */}
            <Card className="mt-8 text-center">
              <CardContent className="py-8">
                <h3 className="text-xl font-bold mb-4">Ready to Start a Return?</h3>
                <p className="text-neutral-600 mb-6 max-w-2xl mx-auto">
                  Log into your account to initiate a return or contact our customer service team for assistance.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="btn-electric">
                    Start Return Online
                  </Button>
                  <Button size="lg" variant="outline">
                    Contact Support
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Returns;