import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface CategoryImage {
  category: string;
  imageUrl: string;
  prompt: string;
}

const categoryPrompts = {
  // Women's categories
  'leggings': 'Professional fitness photography of athletic woman in black high-waisted leggings, modern gym setting, natural lighting, premium activewear brand aesthetic, full body shot',
  'sports-bras': 'High-end athletic photography of confident woman wearing supportive sports bra, studio lighting, premium fitness brand style, upper body focus',
  'tops': 'Clean athletic photography of woman wearing breathable tank top during workout, modern gym environment, professional fitness brand photography, active pose',
  'seamless': 'Premium lifestyle photography of woman in seamless activewear set, minimalist studio, soft professional lighting, luxury fitness brand aesthetic, elegant pose',
  
  // Men's categories
  'shorts': 'Professional athletic photography of fit man wearing performance shorts in premium gym setting, modern lighting, high-end activewear brand style, action pose',
  'sport': 'High-quality fitness photography of athletic man in complete sportswear outfit, contemporary training environment, professional brand photography aesthetic, dynamic movement',
  'arrivals': 'Fresh athletic photography of man in latest performance apparel, bright modern gym, contemporary activewear brand aesthetic, confident stance'
};

export const useCategoryImages = () => {
  const [images, setImages] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const generateCategoryImage = async (category: string): Promise<string> => {
    try {
      const prompt = categoryPrompts[category as keyof typeof categoryPrompts] || categoryPrompts.seamless;
      
      // Call AI Gateway to generate actual images
      const { data: functionData, error: functionError } = await supabase.functions.invoke('ai', {
        body: { 
          message: prompt,
          generateImage: true
        }
      });

      if (functionError) {
        console.error('AI call failed:', functionError);
        return generateGradientForCategory(category);
      }

      // Use the generated image URL if available
      if (functionData?.imageUrl) {
        return functionData.imageUrl;
      }
      
      return generateGradientForCategory(category);
    } catch (error) {
      console.error('Error generating category image:', error);
      return generateGradientForCategory(category);
    }
  };

  const generateGradientForCategory = (category: string): string => {
    const gradients = {
      // Women's categories - premium activewear brand colors
      'leggings': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      'sports-bras': 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', 
      'tops': 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      'seamless': 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      
      // Men's categories - masculine, professional tones
      'shorts': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      'sport': 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      'arrivals': 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    };
    
    return gradients[category as keyof typeof gradients] || gradients.seamless;
  };

  const loadCategoryImages = async () => {
    setLoading(true);
    const newImages: Record<string, string> = {};
    
    const categories = ['leggings', 'sports-bras', 'tops', 'seamless', 'shorts', 'sport', 'arrivals'];
    
    for (const category of categories) {
      newImages[category] = await generateCategoryImage(category);
    }
    
    setImages(newImages);
    setLoading(false);
  };

  useEffect(() => {
    loadCategoryImages();
  }, []);

  return { images, loading, regenerateImage: generateCategoryImage };
};