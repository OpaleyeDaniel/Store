import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import SizeGuideModal from "@/components/SizeGuideModal";
import TechnologyGuide from "@/components/TechnologyGuide";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Ruler, 
  Atom, 
  Users, 
  Heart, 
  Award,
  Trophy,
  Target,
  Globe,
  ChevronRight,
  ExternalLink
} from "lucide-react";
import athletePartnership from "@/assets/athlete-partnership.jpg";
import teamCollaboration from "@/assets/team-collaboration.jpg";

const BrandExperience = () => {
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  const partnershipTiers = [
    {
      tier: "Elite Ambassador",
      level: "Professional Athletes",
      benefits: [
        "Custom gear development",
        "Performance feedback integration", 
        "Revenue sharing program",
        "Global marketing campaigns"
      ],
      requirements: [
        "International competition level",
        "Social media presence 100K+",
        "Brand alignment values"
      ]
    },
    {
      tier: "Performance Partner",
      level: "Competitive Athletes",
      benefits: [
        "Product testing opportunities",
        "Exclusive early access",
        "Training content collaboration",
        "Event appearance opportunities"
      ],
      requirements: [
        "Regional/national competition",
        "Active training schedule",
        "Community engagement"
      ]
    },
    {
      tier: "Community Champion",
      level: "Fitness Influencers & Coaches",
      benefits: [
        "Product discounts",
        "Content creation support",
        "Community event partnerships",
        "Referral commission program"
      ],
      requirements: [
        "Fitness industry involvement",
        "Authentic community engagement",
        "Brand value alignment"
      ]
    }
  ];

  const communityPrograms = [
    {
      name: "Youth Sports Scholarships",
      description: "Annual $500K fund supporting young athletes from underrepresented communities",
      impact: "2,500+ athletes supported since 2020",
      category: "Education"
    },
    {
      name: "Adaptive Athletics Initiative", 
      description: "Developing specialized gear and supporting adaptive sports programs worldwide",
      impact: "15 adaptive sports organizations partnered",
      category: "Inclusion"
    },
    {
      name: "Community Gym Partnerships",
      description: "Equipment donations and facility upgrades for underserved communities",
      impact: "200+ gyms and community centers supported",
      category: "Access"
    },
    {
      name: "Environmental Cleanup Events",
      description: "Athlete-led environmental restoration projects in training locations",
      impact: "50+ cleanup events, 500 tons waste removed",
      category: "Environment"
    }
  ];

  const certifications = [
    { name: "B Corporation Certified", year: "2022", description: "Meeting highest standards of social and environmental performance" },
    { name: "OEKO-TEX Standard 100", year: "2020", description: "Ensuring all textiles are free from harmful substances" },
    { name: "Cradle to Cradle Certified", year: "2023", description: "Products designed for circular economy principles" },
    { name: "Fair Trade Certified", year: "2021", description: "Supporting fair wages and safe working conditions" }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        <Breadcrumb 
          items={[
            { label: "Home", href: "/" },
            { label: "Brand Experience" }
          ]} 
        />

        <div className="container mx-auto px-4 py-16">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Brand Experience
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our size guides, innovative technologies, athlete partnerships, 
              and community initiatives that make FitForge more than just activewear.
            </p>
          </div>

          {/* Quick Access Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <Card 
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => setShowSizeGuide(true)}
            >
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Ruler className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle className="text-lg">Size Guide</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground mb-4">
                  Find your perfect fit with our comprehensive sizing charts and measurement guide.
                </p>
                <Button variant="outline" size="sm">
                  Open Size Guide
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Atom className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle className="text-lg">Technology</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground mb-4">
                  Discover the innovative fabrics and construction methods behind our gear.
                </p>
                <Button variant="outline" size="sm">
                  Learn More
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Trophy className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle className="text-lg">Athletes</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground mb-4">
                  Meet the world-class athletes who trust FitForge for peak performance.
                </p>
                <Button variant="outline" size="sm">
                  View Partners
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Heart className="w-6 h-6 text-red-600" />
                </div>
                <CardTitle className="text-lg">Community</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground mb-4">
                  Learn about our social responsibility initiatives and community impact.
                </p>
                <Button variant="outline" size="sm">
                  Get Involved
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="technology" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="technology">Technology</TabsTrigger>
              <TabsTrigger value="athletes">Athletes</TabsTrigger>
              <TabsTrigger value="community">Community</TabsTrigger>
              <TabsTrigger value="certifications">Certifications</TabsTrigger>
            </TabsList>

            <TabsContent value="technology" className="mt-8">
              <TechnologyGuide />
            </TabsContent>

            <TabsContent value="athletes" className="mt-8 space-y-12">
              {/* Partnership Hero */}
              <div className="relative rounded-lg overflow-hidden">
                <img 
                  src={athletePartnership} 
                  alt="Athlete partnership"
                  className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40 flex items-center">
                  <div className="container mx-auto px-4">
                    <div className="max-w-2xl text-white">
                      <h2 className="text-3xl font-bold mb-4">Partner with Champions</h2>
                      <p className="text-xl mb-6">
                        Join our community of elite athletes who push the boundaries 
                        of performance and help us create the next generation of athletic gear.
                      </p>
                      <Button size="lg" variant="secondary">
                        Apply for Partnership
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Partnership Tiers */}
              <div>
                <h3 className="text-2xl font-bold text-center mb-8">Partnership Tiers</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {partnershipTiers.map((tier, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant={index === 0 ? "default" : "secondary"}>
                            {tier.tier}
                          </Badge>
                          <Award className="w-5 h-5 text-muted-foreground" />
                        </div>
                        <CardTitle className="text-lg">{tier.level}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-sm mb-2">Benefits:</h4>
                          <ul className="space-y-1">
                            {tier.benefits.map((benefit, idx) => (
                              <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                                <div className="w-1 h-1 bg-primary rounded-full" />
                                {benefit}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-sm mb-2">Requirements:</h4>
                          <ul className="space-y-1">
                            {tier.requirements.map((req, idx) => (
                              <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                                <div className="w-1 h-1 bg-muted-foreground rounded-full" />
                                {req}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Application Process */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Application Process</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="font-bold text-primary">1</span>
                      </div>
                      <h4 className="font-semibold mb-2">Apply</h4>
                      <p className="text-sm text-muted-foreground">
                        Submit your application with athletic achievements and social presence
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="font-bold text-primary">2</span>
                      </div>
                      <h4 className="font-semibold mb-2">Review</h4>
                      <p className="text-sm text-muted-foreground">
                        Our team evaluates alignment with brand values and partnership goals
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="font-bold text-primary">3</span>
                      </div>
                      <h4 className="font-semibold mb-2">Interview</h4>
                      <p className="text-sm text-muted-foreground">
                        Virtual or in-person meeting to discuss partnership opportunities
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="font-bold text-primary">4</span>
                      </div>
                      <h4 className="font-semibold mb-2">Welcome</h4>
                      <p className="text-sm text-muted-foreground">
                        Onboarding, gear allocation, and partnership launch planning
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="community" className="mt-8 space-y-12">
              {/* Community Header */}
              <div className="text-center">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Community Impact
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  We believe athletic potential exists in every community. Our initiatives 
                  focus on creating access, opportunity, and positive change.
                </p>
              </div>

              {/* Impact Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">$2.5M</div>
                  <p className="text-muted-foreground">Total community investment</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">15K+</div>
                  <p className="text-muted-foreground">Youth athletes supported</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">200+</div>
                  <p className="text-muted-foreground">Community programs</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">50+</div>
                  <p className="text-muted-foreground">Countries reached</p>
                </div>
              </div>

              {/* Programs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {communityPrograms.map((program, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline">{program.category}</Badge>
                        <Users className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <CardTitle className="text-lg">{program.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-muted-foreground">{program.description}</p>
                      <div className="text-sm font-semibold text-primary">
                        {program.impact}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Get Involved CTA */}
              <Card className="bg-gradient-to-r from-primary/10 to-primary/5">
                <CardContent className="p-8 text-center">
                  <h3 className="text-2xl font-bold text-foreground mb-4">
                    Join Our Mission
                  </h3>
                  <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                    Whether you're an athlete, coach, or community leader, there are many 
                    ways to get involved in our initiatives and make a positive impact.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button size="lg">
                      Nominate an Athlete
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                    <Button size="lg" variant="outline">
                      Partner with Us
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="certifications" className="mt-8 space-y-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Certifications & Standards
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Our commitment to quality, safety, and sustainability is validated 
                  by leading industry certifications and standards.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {certifications.map((cert, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <Badge variant="default">{cert.year}</Badge>
                        <Award className="w-5 h-5 text-primary" />
                      </div>
                      <CardTitle className="text-lg">{cert.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{cert.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="bg-muted/30">
                <CardContent className="p-8 text-center">
                  <Globe className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-foreground mb-4">
                    Global Standards
                  </h3>
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    We maintain certifications across all our global facilities and 
                    supply chain partners, ensuring consistent quality and ethical 
                    practices worldwide.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Size Guide Modal */}
        <SizeGuideModal open={showSizeGuide} onOpenChange={setShowSizeGuide} />
      </main>
      <Footer />
    </div>
  );
};

export default BrandExperience;