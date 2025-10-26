import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Truck, Clock, MapPin, Package } from "lucide-react";

const Shipping = () => {
  const shippingOptions = [
    {
      name: "Standard Shipping",
      time: "5-7 Business Days",
      cost: "FREE on orders $75+, $5.99 under $75",
      icon: Truck,
    },
    {
      name: "Express Shipping",
      time: "2-3 Business Days",
      cost: "$12.99",
      icon: Clock,
    },
    {
      name: "Overnight Shipping",
      time: "1 Business Day",
      cost: "$24.99",
      icon: Package,
    },
  ];

  return (
    <>
      <Navigation />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16">
          <div className="container-fluid">
            <div className="max-w-4xl">
              <Badge variant="outline" className="mb-4">
                DELIVERY INFO
              </Badge>
              <h1 className="heading-display text-black mb-6">
                SHIPPING & DELIVERY
              </h1>
              <p className="text-xl leading-relaxed text-neutral-600 mb-8">
                Fast, reliable shipping to get your gear to you quickly. 
                Free standard shipping on orders over $75.
              </p>
            </div>
          </div>
        </section>

        {/* Shipping Options */}
        <section className="pb-16">
          <div className="container-fluid">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {shippingOptions.map((option) => (
                <Card key={option.name} className="text-center">
                  <CardHeader>
                    <div className="mx-auto w-12 h-12 bg-electric-blue/10 rounded-full flex items-center justify-center mb-4">
                      <option.icon className="w-6 h-6 text-electric-blue" />
                    </div>
                    <CardTitle className="text-lg">{option.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-neutral-600 mb-2">{option.time}</p>
                    <p className="font-medium text-black">{option.cost}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Shipping Details */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-electric-blue" />
                    Shipping Locations
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Domestic Shipping</h4>
                    <p className="text-sm text-neutral-600">
                      We ship to all 50 US states, including Alaska and Hawaii. 
                      APO/FPO addresses are also supported.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">International Shipping</h4>
                    <p className="text-sm text-neutral-600">
                      Currently available to Canada, UK, Australia, and select European countries. 
                      International shipping rates calculated at checkout.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Processing Time</h4>
                    <p className="text-sm text-neutral-600">
                      Orders placed before 2PM EST Monday-Friday ship the same day. 
                      Weekend orders ship the next business day.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Order Tracking</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Tracking Your Order</h4>
                    <p className="text-sm text-neutral-600 mb-3">
                      Once your order ships, you'll receive a tracking number via email. 
                      You can also track your order in your account dashboard.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Delivery Updates</h4>
                    <p className="text-sm text-neutral-600 mb-3">
                      Receive SMS and email notifications about your delivery status, 
                      including when your package is out for delivery.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Delivery Issues</h4>
                    <p className="text-sm text-neutral-600">
                      If you experience any delivery issues, contact our support team 
                      at shipping@fitforge.com for immediate assistance.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Special Considerations */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Special Considerations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-2">Weather Delays</h4>
                    <p className="text-sm text-neutral-600">
                      Severe weather conditions may cause shipping delays. We'll notify you 
                      if your order is affected and provide updated delivery estimates.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Peak Season</h4>
                    <p className="text-sm text-neutral-600">
                      During holidays and peak seasons, shipping times may be extended. 
                      We recommend ordering early for time-sensitive deliveries.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Address Requirements</h4>
                    <p className="text-sm text-neutral-600">
                      Please ensure your shipping address is complete and accurate. 
                      We cannot redirect packages once they're in transit.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Signature Required</h4>
                    <p className="text-sm text-neutral-600">
                      Orders over $200 require a signature upon delivery for security. 
                      You can request signature waiver during checkout if preferred.
                    </p>
                  </div>
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

export default Shipping;