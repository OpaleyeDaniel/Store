import { Product } from '@/types';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Truck, RotateCcw, Shield, Shirt, Droplets, Sun, Wind } from 'lucide-react';

interface ProductInformationProps {
  product: Product;
}

const ProductInformation = ({ product }: ProductInformationProps) => {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-foreground">Product Information</h2>
      
      <Accordion type="multiple" className="w-full">
        {/* Description */}
        <AccordionItem value="description">
          <AccordionTrigger className="text-lg font-semibold">
            Description & Features
          </AccordionTrigger>
          <AccordionContent className="space-y-4">
            <div className="prose prose-gray max-w-none">
              <p className="text-muted-foreground leading-relaxed">
                {product.description || `Experience the perfect blend of performance and style with our ${product.title}. 
                Engineered with cutting-edge fabric technology and designed for the modern athlete, 
                this piece delivers uncompromising comfort and durability for your most demanding workouts.`}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="space-y-3">
                <h4 className="font-semibold text-foreground flex items-center gap-2">
                  <Droplets className="w-4 h-4 text-blue-600" />
                  Moisture Management
                </h4>
                <ul className="space-y-1 text-sm text-muted-foreground ml-6">
                  <li>• Advanced moisture-wicking technology</li>
                  <li>• Quick-dry fabric keeps you comfortable</li>
                  <li>• Anti-microbial treatment prevents odor</li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-foreground flex items-center gap-2">
                  <Wind className="w-4 h-4 text-green-600" />
                  Comfort & Fit
                </h4>
                <ul className="space-y-1 text-sm text-muted-foreground ml-6">
                  <li>• Four-way stretch for unlimited mobility</li>
                  <li>• Flatlock seams prevent chafing</li>
                  <li>• {product.fit || 'Athletic'} fit for optimal performance</li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-foreground flex items-center gap-2">
                  <Sun className="w-4 h-4 text-orange-500" />
                  Protection
                </h4>
                <ul className="space-y-1 text-sm text-muted-foreground ml-6">
                  <li>• UPF 50+ sun protection</li>
                  <li>• UV-resistant fabric technology</li>
                  <li>• Fade-resistant colors</li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-foreground flex items-center gap-2">
                  <Shirt className="w-4 h-4 text-purple-600" />
                  Construction
                </h4>
                <ul className="space-y-1 text-sm text-muted-foreground ml-6">
                  <li>• Reinforced stress points for durability</li>
                  <li>• Double-needle stitching</li>
                  <li>• Pre-shrunk for consistent fit</li>
                </ul>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Materials & Care */}
        <AccordionItem value="materials">
          <AccordionTrigger className="text-lg font-semibold">
            Materials & Care Instructions
          </AccordionTrigger>
          <AccordionContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Fabric Composition</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Polyester</span>
                      <Badge variant="secondary">78%</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Elastane/Spandex</span>
                      <Badge variant="secondary">22%</Badge>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Certifications</h4>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p>• OEKO-TEX Standard 100 certified</p>
                    <p>• Bluesign approved fabric</p>
                    <p>• CPSIA compliant</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Care Instructions</h4>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full" />
                      Machine wash cold (30°C max)
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full" />
                      Use mild detergent, no bleach
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-yellow-500 rounded-full" />
                      Tumble dry low heat
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-red-500 rounded-full" />
                      Do not iron, dry clean, or use fabric softener
                    </p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Storage Tips</h4>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p>• Hang dry for best results</p>
                    <p>• Store flat or hang to prevent creasing</p>
                    <p>• Keep away from direct sunlight when storing</p>
                  </div>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Sizing */}
        <AccordionItem value="sizing">
          <AccordionTrigger className="text-lg font-semibold">
            Sizing & Fit Information
          </AccordionTrigger>
          <AccordionContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-foreground mb-3">Size Specifications (Size M)</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Length</span>
                    <span className="font-medium">25 inches</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Inseam</span>
                    <span className="font-medium">25 inches</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Rise</span>
                    <span className="font-medium">10 inches</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Waistband Width</span>
                    <span className="font-medium">3.5 inches</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-foreground mb-3">Fit Details</h4>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>• <span className="font-medium text-foreground">{product.fit || 'Athletic fit'}:</span> Fitted through hip and thigh</p>
                  <p>• <span className="font-medium text-foreground">High-rise:</span> Sits above natural waistline</p>
                  <p>• <span className="font-medium text-foreground">Compression:</span> Medium support and hold</p>
                  <p>• <span className="font-medium text-foreground">Stretch:</span> Four-way stretch fabric</p>
                </div>
              </div>
            </div>
            
            <div className="bg-muted/30 p-4 rounded-lg mt-4">
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Model Info:</span> 
                Model is 5'8" with a 25" waist and 36" hips, wearing size M. 
                For reference, she typically wears size M in our leggings and size S in our tops.
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Shipping & Returns */}
        <AccordionItem value="shipping">
          <AccordionTrigger className="text-lg font-semibold">
            Shipping & Returns
          </AccordionTrigger>
          <AccordionContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Truck className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Shipping Options</h4>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <p><span className="font-medium">Standard (5-7 days):</span> Free on orders $75+</p>
                      <p><span className="font-medium">Express (2-3 days):</span> $9.99</p>
                      <p><span className="font-medium">Next Day:</span> $19.99</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Secure Packaging</h4>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <p>• Recyclable shipping materials</p>
                      <p>• Protective packaging for all items</p>
                      <p>• Carbon-neutral shipping available</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <RotateCcw className="w-5 h-5 text-purple-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Returns & Exchanges</h4>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <p><span className="font-medium">30-day return window</span> from delivery date</p>
                      <p><span className="font-medium">Free returns</span> on all orders</p>
                      <p><span className="font-medium">Easy online returns</span> process</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Return Conditions</h4>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p>• Items must be unworn with tags attached</p>
                    <p>• Original packaging preferred but not required</p>
                    <p>• Swimwear must have hygiene liner intact</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-muted/30 p-4 rounded-lg">
              <h4 className="font-semibold text-foreground mb-2">International Shipping</h4>
              <p className="text-sm text-muted-foreground">
                We ship to over 50 countries worldwide. International shipping rates and delivery times vary by destination. 
                Duties and taxes may apply and are the responsibility of the customer.
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default ProductInformation;