import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const SizeGuide = () => {
  const womensSizes = [
    { size: "XS", chest: "30-32", waist: "24-26", hips: "34-36" },
    { size: "S", chest: "32-34", waist: "26-28", hips: "36-38" },
    { size: "M", chest: "34-36", waist: "28-30", hips: "38-40" },
    { size: "L", chest: "36-38", waist: "30-32", hips: "40-42" },
    { size: "XL", chest: "38-40", waist: "32-34", hips: "42-44" },
    { size: "XXL", chest: "40-42", waist: "34-36", hips: "44-46" },
  ];

  const mensSizes = [
    { size: "XS", chest: "34-36", waist: "28-30", hips: "34-36" },
    { size: "S", chest: "36-38", waist: "30-32", hips: "36-38" },
    { size: "M", chest: "38-40", waist: "32-34", hips: "38-40" },
    { size: "L", chest: "40-42", waist: "34-36", hips: "40-42" },
    { size: "XL", chest: "42-44", waist: "36-38", hips: "42-44" },
    { size: "XXL", chest: "44-46", waist: "38-40", hips: "44-46" },
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
                FIT GUIDE
              </Badge>
              <h1 className="heading-display text-black mb-6">
                SIZE GUIDE
              </h1>
              <p className="text-xl leading-relaxed text-neutral-600 mb-8">
                Find your perfect fit with our comprehensive sizing guide. 
                All measurements are in inches.
              </p>
            </div>
          </div>
        </section>

        {/* Size Charts */}
        <section className="pb-16">
          <div className="container-fluid">
            <Tabs defaultValue="women" className="max-w-6xl">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="women">Women's Sizes</TabsTrigger>
                <TabsTrigger value="men">Men's Sizes</TabsTrigger>
              </TabsList>
              
              <TabsContent value="women" className="mt-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Women's Size Chart</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-3 px-4">Size</th>
                            <th className="text-left py-3 px-4">Chest</th>
                            <th className="text-left py-3 px-4">Waist</th>
                            <th className="text-left py-3 px-4">Hips</th>
                          </tr>
                        </thead>
                        <tbody>
                          {womensSizes.map((size) => (
                            <tr key={size.size} className="border-b">
                              <td className="py-3 px-4 font-medium">{size.size}</td>
                              <td className="py-3 px-4">{size.chest}"</td>
                              <td className="py-3 px-4">{size.waist}"</td>
                              <td className="py-3 px-4">{size.hips}"</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="men" className="mt-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Men's Size Chart</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-3 px-4">Size</th>
                            <th className="text-left py-3 px-4">Chest</th>
                            <th className="text-left py-3 px-4">Waist</th>
                            <th className="text-left py-3 px-4">Hips</th>
                          </tr>
                        </thead>
                        <tbody>
                          {mensSizes.map((size) => (
                            <tr key={size.size} className="border-b">
                              <td className="py-3 px-4 font-medium">{size.size}</td>
                              <td className="py-3 px-4">{size.chest}"</td>
                              <td className="py-3 px-4">{size.waist}"</td>
                              <td className="py-3 px-4">{size.hips}"</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Measuring Guide */}
            <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">How to Measure</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Chest/Bust</h4>
                      <p className="text-sm text-neutral-600">
                        Measure around the fullest part of your chest, keeping the tape measure horizontal.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Waist</h4>
                      <p className="text-sm text-neutral-600">
                        Measure around the narrowest part of your waist, typically just above your hip bones.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Hips</h4>
                      <p className="text-sm text-neutral-600">
                        Measure around the fullest part of your hips, keeping the tape measure horizontal.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Fit Tips</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-sm text-neutral-600">
                      • Our activewear is designed for a close, athletic fit
                    </p>
                    <p className="text-sm text-neutral-600">
                      • If between sizes, we recommend sizing up for comfort
                    </p>
                    <p className="text-sm text-neutral-600">
                      • High-stretch fabrics provide flexibility in movement
                    </p>
                    <p className="text-sm text-neutral-600">
                      • Check individual product descriptions for specific fit notes
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Need Help?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-neutral-600 mb-4">
                    Still unsure about sizing? Our customer service team is here to help.
                  </p>
                  <div className="space-y-2">
                    <p className="text-sm">
                      <strong>Email:</strong> sizing@fitforge.com
                    </p>
                    <p className="text-sm">
                      <strong>Phone:</strong> 1-800-FIT-FORGE
                    </p>
                    <p className="text-sm">
                      <strong>Hours:</strong> Mon-Fri, 9AM-6PM EST
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default SizeGuide;