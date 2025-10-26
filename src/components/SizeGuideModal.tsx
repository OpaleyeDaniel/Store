import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Info, Ruler } from 'lucide-react';

interface SizeGuideModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SizeGuideModal = ({ open, onOpenChange }: SizeGuideModalProps) => {
  const womensSizes = [
    { size: 'XS', bust: '32-34"', waist: '24-26"', hips: '34-36"', numeric: '0-2' },
    { size: 'S', bust: '34-36"', waist: '26-28"', hips: '36-38"', numeric: '4-6' },
    { size: 'M', bust: '36-38"', waist: '28-30"', hips: '38-40"', numeric: '8-10' },
    { size: 'L', bust: '38-40"', waist: '30-32"', hips: '40-42"', numeric: '12-14' },
    { size: 'XL', bust: '40-42"', waist: '32-34"', hips: '42-44"', numeric: '16-18' },
    { size: 'XXL', bust: '42-44"', waist: '34-36"', hips: '44-46"', numeric: '20-22' }
  ];

  const mensSizes = [
    { size: 'S', chest: '34-36"', waist: '28-30"', inseam: '30"', numeric: '28-30' },
    { size: 'M', chest: '38-40"', waist: '30-32"', inseam: '31"', numeric: '30-32' },
    { size: 'L', chest: '42-44"', waist: '32-34"', inseam: '32"', numeric: '32-34' },
    { size: 'XL', chest: '46-48"', waist: '36-38"', inseam: '33"', numeric: '36-38' },
    { size: 'XXL', chest: '50-52"', waist: '40-42"', inseam: '34"', numeric: '40-42' }
  ];

  const measurementTips = [
    {
      area: "Bust/Chest",
      instruction: "Measure around the fullest part of your chest, keeping the tape measure parallel to the floor."
    },
    {
      area: "Waist",
      instruction: "Measure around your natural waistline, typically the narrowest part of your torso."
    },
    {
      area: "Hips",
      instruction: "Measure around the fullest part of your hips, about 8 inches below your natural waistline."
    },
    {
      area: "Inseam",
      instruction: "Measure from the top of your inner thigh down to your ankle bone."
    }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Ruler className="w-5 h-5" />
            Size Guide
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="women" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="women">Women's Sizes</TabsTrigger>
            <TabsTrigger value="men">Men's Sizes</TabsTrigger>
          </TabsList>

          <TabsContent value="women" className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Women's Size Chart</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2 font-medium">Size</th>
                      <th className="text-left p-2 font-medium">Bust</th>
                      <th className="text-left p-2 font-medium">Waist</th>
                      <th className="text-left p-2 font-medium">Hips</th>
                      <th className="text-left p-2 font-medium">Numeric</th>
                    </tr>
                  </thead>
                  <tbody>
                    {womensSizes.map((size) => (
                      <tr key={size.size} className="border-b">
                        <td className="p-2 font-semibold">{size.size}</td>
                        <td className="p-2">{size.bust}</td>
                        <td className="p-2">{size.waist}</td>
                        <td className="p-2">{size.hips}</td>
                        <td className="p-2">{size.numeric}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Fit Information</h4>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p><strong>Leggings:</strong> High-waisted, compression fit</p>
                  <p><strong>Sports Bras:</strong> Medium to high support</p>
                  <p><strong>Tops:</strong> Athletic fit, slightly relaxed</p>
                  <p><strong>Shorts:</strong> 5-7" inseam, compression waistband</p>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3">Size Recommendations</h4>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p><strong>Between sizes?</strong> Size up for looser fit</p>
                  <p><strong>Compression pieces:</strong> Choose your normal size</p>
                  <p><strong>Layering pieces:</strong> Consider sizing up</p>
                  <p><strong>High-impact sports:</strong> Ensure snug fit</p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="men" className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Men's Size Chart</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2 font-medium">Size</th>
                      <th className="text-left p-2 font-medium">Chest</th>
                      <th className="text-left p-2 font-medium">Waist</th>
                      <th className="text-left p-2 font-medium">Inseam</th>
                      <th className="text-left p-2 font-medium">Numeric</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mensSizes.map((size) => (
                      <tr key={size.size} className="border-b">
                        <td className="p-2 font-semibold">{size.size}</td>
                        <td className="p-2">{size.chest}</td>
                        <td className="p-2">{size.waist}</td>
                        <td className="p-2">{size.inseam}</td>
                        <td className="p-2">{size.numeric}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Fit Information</h4>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p><strong>Shorts:</strong> 5-9" inseam options, compression liner</p>
                  <p><strong>Shirts:</strong> Athletic cut, performance fit</p>
                  <p><strong>Tanks:</strong> Muscle fit, freedom of movement</p>
                  <p><strong>Tights:</strong> Compression fit, squat-proof</p>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3">Size Recommendations</h4>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p><strong>Athletic build:</strong> Choose your normal size</p>
                  <p><strong>Layering:</strong> Size up for base layers</p>
                  <p><strong>Compression gear:</strong> Ensure snug fit</p>
                  <p><strong>Casual wear:</strong> Size up for relaxed fit</p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <Separator />

        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Info className="w-5 h-5" />
            How to Measure
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {measurementTips.map((tip, index) => (
              <div key={index} className="border rounded-lg p-4">
                <h4 className="font-semibold text-sm mb-2">{tip.area}</h4>
                <p className="text-sm text-muted-foreground">{tip.instruction}</p>
              </div>
            ))}
          </div>

          <div className="bg-muted/50 p-4 rounded-lg">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 mt-0.5 text-primary flex-shrink-0" />
              <div className="text-sm">
                <p className="font-semibold mb-1">Need Help?</p>
                <p className="text-muted-foreground">
                  Our fit specialists are available to help you find the perfect size. 
                  Contact us at{' '}
                  <a href="mailto:fit@fitforge.com" className="text-primary hover:underline">
                    fit@fitforge.com
                  </a>{' '}
                  or chat with us online.
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SizeGuideModal;