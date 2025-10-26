import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CheckoutProgressProps {
  currentStep: number;
  steps: Array<{ number: number; title: string; description: string }>;
}

const CheckoutProgress = ({ currentStep, steps }: CheckoutProgressProps) => {
  return (
    <div className="w-full py-8">
      <div className="flex items-center justify-between max-w-2xl mx-auto">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center">
            {/* Step Circle */}
            <div className="relative flex items-center">
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300",
                  step.number < currentStep
                    ? "bg-electric-blue text-white border-electric-blue"
                    : step.number === currentStep
                    ? "border-electric-blue text-electric-blue bg-white"
                    : "border-gray-300 text-gray-300 bg-white"
                )}
              >
                {step.number < currentStep ? (
                  <Check size={20} />
                ) : (
                  <span className="text-sm font-semibold">{step.number}</span>
                )}
              </div>
              
              {/* Step Info */}
              <div className="ml-3 hidden sm:block">
                <div
                  className={cn(
                    "text-sm font-medium transition-colors duration-300",
                    step.number <= currentStep ? "text-electric-blue" : "text-gray-500"
                  )}
                >
                  {step.title}
                </div>
                <div className="text-xs text-gray-500">{step.description}</div>
              </div>
            </div>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "flex-1 h-0.5 mx-4 transition-colors duration-300",
                  step.number < currentStep ? "bg-electric-blue" : "bg-gray-300"
                )}
              />
            )}
          </div>
        ))}
      </div>
      
      {/* Mobile Step Info */}
      <div className="sm:hidden text-center mt-4">
        <div className="text-sm font-medium text-electric-blue">
          {steps.find(step => step.number === currentStep)?.title}
        </div>
        <div className="text-xs text-gray-500">
          Step {currentStep} of {steps.length}
        </div>
      </div>
    </div>
  );
};

export default CheckoutProgress;