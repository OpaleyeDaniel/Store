import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, Phone, MapPin, Clock, MessageCircle, Headphones } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock form submission
    toast({
      title: "Message sent successfully!",
      description: "We'll get back to you within 24 hours.",
    });
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const contactMethods = [
    {
      icon: Mail,
      title: "Email Support",
      description: "Get help via email",
      contact: "help@fitforge.com",
      action: "mailto:help@fitforge.com"
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "Speak with our team",
      contact: "1-800-FIT-FORGE",
      action: "tel:1-800-348-3674"
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Chat with us online",
      contact: "Available 9AM-6PM EST",
      action: "#"
    },
    {
      icon: Headphones,
      title: "Technical Support",
      description: "Website & app issues",
      contact: "tech@fitforge.com",
      action: "mailto:tech@fitforge.com"
    }
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
                GET IN TOUCH
              </Badge>
              <h1 className="heading-display text-black mb-6">
                CONTACT US
              </h1>
              <p className="text-xl leading-relaxed text-neutral-600 mb-8">
                Have questions, feedback, or need assistance? We're here to help. 
                Reach out and we'll get back to you quickly.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Methods */}
        <section className="pb-16">
          <div className="container-fluid">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {contactMethods.map((method) => (
                <Card key={method.title} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="mx-auto w-12 h-12 bg-electric-blue/10 rounded-full flex items-center justify-center mb-4">
                      <method.icon className="w-6 h-6 text-electric-blue" />
                    </div>
                    <CardTitle className="text-lg">{method.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-neutral-600 mb-3">{method.description}</p>
                    <a 
                      href={method.action}
                      className="text-electric-blue hover:underline font-medium"
                    >
                      {method.contact}
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Contact Form & Info */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Contact Form */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Send us a Message</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium mb-2">
                            Full Name
                          </label>
                          <Input
                            id="name"
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium mb-2">
                            Email Address
                          </label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            required
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium mb-2">
                          Subject
                        </label>
                        <Select 
                          value={formData.subject} 
                          onValueChange={(value) => setFormData({...formData, subject: value})}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a topic" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="order">Order Question</SelectItem>
                            <SelectItem value="product">Product Information</SelectItem>
                            <SelectItem value="return">Returns & Exchanges</SelectItem>
                            <SelectItem value="technical">Technical Support</SelectItem>
                            <SelectItem value="partnership">Partnership Inquiry</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium mb-2">
                          Message
                        </label>
                        <Textarea
                          id="message"
                          rows={6}
                          value={formData.message}
                          onChange={(e) => setFormData({...formData, message: e.target.value})}
                          placeholder="Please provide as much detail as possible..."
                          required
                        />
                      </div>
                      
                      <Button type="submit" className="btn-electric w-full md:w-auto">
                        Send Message
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Info */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-electric-blue" />
                      Business Hours
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Monday - Friday</span>
                      <span className="text-sm font-medium">9AM - 6PM EST</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Saturday</span>
                      <span className="text-sm font-medium">10AM - 4PM EST</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Sunday</span>
                      <span className="text-sm font-medium">Closed</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-electric-blue" />
                      Our Location
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <address className="text-sm text-neutral-600 not-italic">
                      FitForge HQ<br />
                      123 Athletic Way<br />
                      Performance City, PC 12345<br />
                      United States
                    </address>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Response Times</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <h4 className="font-medium text-sm mb-1">Email Support</h4>
                      <p className="text-sm text-neutral-600">Within 24 hours</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm mb-1">Live Chat</h4>
                      <p className="text-sm text-neutral-600">Immediate response</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm mb-1">Phone Support</h4>
                      <p className="text-sm text-neutral-600">Wait time under 5 minutes</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Contact;