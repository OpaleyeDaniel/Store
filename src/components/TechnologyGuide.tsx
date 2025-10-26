import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Droplets, 
  Wind, 
  Shield, 
  Zap, 
  Thermometer, 
  Leaf, 
  Atom,
  Activity
} from 'lucide-react';

const TechnologyGuide = () => {
  const fabricTechnologies = [
    {
      name: "MoistureTech Pro",
      icon: Droplets,
      category: "Moisture Management",
      description: "Advanced fiber structure that moves sweat away from skin 3x faster than cotton.",
      benefits: [
        "Instant moisture wicking",
        "Quick-dry performance", 
        "Anti-microbial properties",
        "Odor resistance"
      ],
      usedIn: ["All activewear", "Base layers", "Sports bras"]
    },
    {
      name: "FlexFlow 4D", 
      icon: Wind,
      category: "Stretch & Movement",
      description: "Four-way stretch technology that moves with your body in every direction.",
      benefits: [
        "360° stretch capability",
        "Shape retention",
        "Freedom of movement",
        "Compression support"
      ],
      usedIn: ["Leggings", "Shorts", "Fitted tops"]
    },
    {
      name: "UltraShield UV",
      icon: Shield, 
      category: "Protection",
      description: "Built-in UPF 50+ protection that blocks 98% of harmful UV rays.",
      benefits: [
        "UPF 50+ sun protection",
        "Fade-resistant colors",
        "Long-lasting coverage",
        "Chemical-free protection"
      ],
      usedIn: ["Outdoor gear", "Swimwear", "All garments"]
    },
    {
      name: "ThermoBalance",
      icon: Thermometer,
      category: "Temperature Control", 
      description: "Intelligent fabric that adapts to your body temperature for optimal comfort.",
      benefits: [
        "Body temperature regulation",
        "Cooling when hot",
        "Warming when cold",
        "Energy efficiency"
      ],
      usedIn: ["Base layers", "Winter gear", "Recovery wear"]
    },
    {
      name: "BioFresh Guard",
      icon: Activity,
      category: "Hygiene",
      description: "Natural antimicrobial treatment that fights odor-causing bacteria.",
      benefits: [
        "Long-lasting freshness",
        "Natural antimicrobial",
        "Safe for sensitive skin",
        "Wash-resistant treatment"
      ],
      usedIn: ["Underwear", "Socks", "High-intensity gear"]
    },
    {
      name: "EcoForce Fiber",
      icon: Leaf,
      category: "Sustainability",
      description: "Recycled and bio-based fibers that deliver performance without compromise.",
      benefits: [
        "Made from recycled materials",
        "Lower carbon footprint",
        "Biodegradable options",
        "Performance equal to virgin fibers"
      ],
      usedIn: ["Sustainable collections", "Everyday wear"]
    }
  ];

  const constructionTechnologies = [
    {
      name: "Flatlock Pro Seaming",
      description: "Advanced seam construction that eliminates chafing and creates smooth comfort zones.",
      benefits: ["Zero-chafe guarantee", "Smooth surface", "Enhanced durability", "Professional finish"]
    },
    {
      name: "Seamless Integration",
      description: "Circular knit construction that reduces seams by up to 80% for ultimate comfort.",
      benefits: ["Minimal seams", "Body-hugging fit", "No pressure points", "Second-skin feel"]
    },
    {
      name: "Compression Zoning",
      description: "Strategic compression placement that supports key muscle groups during activity.",
      benefits: ["Targeted muscle support", "Improved blood flow", "Reduced fatigue", "Enhanced performance"]
    },
    {
      name: "Reinforced Stress Points",
      description: "Extra reinforcement at high-stress areas to extend garment life and maintain fit.",
      benefits: ["Extended durability", "Shape retention", "Professional quality", "Value investment"]
    }
  ];

  const sustainabilityFeatures = [
    {
      title: "Recycled Materials",
      percentage: "78%",
      description: "Of our fabrics come from post-consumer recycled sources",
      impact: "Diverts 2.3M plastic bottles from landfills annually"
    },
    {
      title: "Bio-Based Fibers", 
      percentage: "22%",
      description: "Made from renewable plant-based sources",
      impact: "50% lower carbon footprint vs. traditional synthetics"
    },
    {
      title: "Water Reduction",
      percentage: "65%",
      description: "Less water used in our dyeing processes",
      impact: "Saves 500M gallons of water annually"
    },
    {
      title: "Renewable Energy",
      percentage: "100%",
      description: "Of our facilities powered by renewable sources",
      impact: "Carbon neutral manufacturing operations"
    }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Technology & Innovation
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Discover the cutting-edge technologies and sustainable innovations 
          that make FitForge gear perform at the highest level.
        </p>
      </div>

      <Tabs defaultValue="fabrics" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="fabrics">Fabric Technologies</TabsTrigger>
          <TabsTrigger value="construction">Construction</TabsTrigger>
          <TabsTrigger value="sustainability">Sustainability</TabsTrigger>
        </TabsList>

        <TabsContent value="fabrics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fabricTechnologies.map((tech, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <tech.icon className="w-5 h-5 text-primary" />
                    </div>
                    <Badge variant="outline">{tech.category}</Badge>
                  </div>
                  <CardTitle className="text-lg">{tech.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{tech.description}</p>
                  
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Key Benefits:</h4>
                    <ul className="space-y-1">
                      {tech.benefits.map((benefit, idx) => (
                        <li key={idx} className="text-xs text-muted-foreground flex items-center gap-2">
                          <div className="w-1 h-1 bg-primary rounded-full" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Used In:</h4>
                    <div className="flex flex-wrap gap-1">
                      {tech.usedIn.map((item, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="construction" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {constructionTechnologies.map((tech, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl">{tech.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{tech.description}</p>
                  
                  <div>
                    <h4 className="font-semibold mb-3">Advantages:</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {tech.benefits.map((benefit, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-primary rounded-full" />
                          <span className="text-sm text-muted-foreground">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-gradient-to-r from-primary/10 to-primary/5">
            <CardContent className="p-8">
              <div className="text-center space-y-4">
                <Atom className="w-12 h-12 text-primary mx-auto" />
                <h3 className="text-2xl font-bold text-foreground">
                  Innovation Lab
                </h3>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Our dedicated R&D facility continuously develops new technologies 
                  to push the boundaries of athletic performance and sustainability.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">50+</div>
                    <p className="text-sm text-muted-foreground">Patents filed</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">24/7</div>
                    <p className="text-sm text-muted-foreground">Testing protocols</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">12</div>
                    <p className="text-sm text-muted-foreground">Months average development</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sustainability" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sustainabilityFeatures.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="text-4xl font-bold text-primary mb-2">
                    {feature.percentage}
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {feature.description}
                  </p>
                  <div className="text-xs text-primary font-medium">
                    {feature.impact}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="overflow-hidden">
            <CardHeader className="bg-green-50">
              <CardTitle className="flex items-center gap-2">
                <Leaf className="w-5 h-5 text-green-600" />
                Circular Design Philosophy
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Zap className="w-8 h-8 text-blue-600" />
                  </div>
                  <h4 className="font-semibold mb-2">Design</h4>
                  <p className="text-sm text-muted-foreground">
                    Every product designed for longevity, repairability, and end-of-life recyclability.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Activity className="w-8 h-8 text-green-600" />
                  </div>
                  <h4 className="font-semibold mb-2">Use</h4>
                  <p className="text-sm text-muted-foreground">
                    Durable construction and timeless design ensure years of high-performance use.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Leaf className="w-8 h-8 text-purple-600" />
                  </div>
                  <h4 className="font-semibold mb-2">Recycle</h4>
                  <p className="text-sm text-muted-foreground">
                    Take-back program transforms worn garments into new high-performance materials.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="bg-muted/30 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-foreground mb-4">
              Sustainability Commitments
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span className="text-sm">Carbon neutral shipping (achieved 2023)</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span className="text-sm">100% renewable energy facilities (achieved 2022)</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span className="text-sm">Zero waste to landfill (achieved 2024)</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  <span className="text-sm">Net-zero emissions by 2030 (in progress)</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  <span className="text-sm">100% recyclable packaging by 2025 (in progress)</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  <span className="text-sm">Biodegradable materials research (ongoing)</span>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TechnologyGuide;