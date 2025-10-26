import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import RatingInput from './RatingInput';
import { ReviewFormData } from '@/types/reviews';
import { Upload, X } from 'lucide-react';

interface ReviewFormProps {
  onSubmit: (data: ReviewFormData) => Promise<boolean>;
  loading?: boolean;
}

const ReviewForm = ({ onSubmit, loading = false }: ReviewFormProps) => {
  const [formData, setFormData] = useState<ReviewFormData>({
    rating: 0,
    review_text: '',
    photos: []
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (formData.rating === 0) {
      newErrors.rating = 'Please select a rating';
    }

    if (formData.review_text.trim().length < 50) {
      newErrors.review_text = 'Review must be at least 50 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const success = await onSubmit(formData);
    if (success) {
      setFormData({
        rating: 0,
        review_text: '',
        photos: []
      });
      setErrors({});
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    files.forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const imageUrl = event.target?.result as string;
          setFormData(prev => ({
            ...prev,
            photos: [...prev.photos, imageUrl]
          }));
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const removePhoto = (index: number) => {
    setFormData(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="bg-background border rounded-lg p-6">
      <h3 className="text-lg font-semibold text-foreground mb-6">Write a Review</h3>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Rating */}
        <div className="space-y-2">
          <Label htmlFor="rating">Rating *</Label>
          <div className="flex items-center gap-4">
            <RatingInput
              value={formData.rating}
              onChange={(rating) => {
                setFormData(prev => ({ ...prev, rating }));
                if (errors.rating) {
                  setErrors(prev => ({ ...prev, rating: '' }));
                }
              }}
              size="lg"
              disabled={loading}
            />
            <span className="text-sm text-muted-foreground">
              {formData.rating > 0 && `${formData.rating} star${formData.rating > 1 ? 's' : ''}`}
            </span>
          </div>
          {errors.rating && (
            <p className="text-sm text-destructive">{errors.rating}</p>
          )}
        </div>

        {/* Review Text */}
        <div className="space-y-2">
          <Label htmlFor="review_text">Your Review *</Label>
          <Textarea
            id="review_text"
            placeholder="Share your experience with this product (minimum 50 characters)..."
            value={formData.review_text}
            onChange={(e) => {
              setFormData(prev => ({ ...prev, review_text: e.target.value }));
              if (errors.review_text && e.target.value.length >= 50) {
                setErrors(prev => ({ ...prev, review_text: '' }));
              }
            }}
            disabled={loading}
            rows={4}
            className="resize-none"
          />
          <div className="flex justify-between items-center">
            <span className={`text-xs ${
              formData.review_text.length >= 50 ? 'text-green-600' : 'text-muted-foreground'
            }`}>
              {formData.review_text.length}/50 characters minimum
            </span>
          </div>
          {errors.review_text && (
            <p className="text-sm text-destructive">{errors.review_text}</p>
          )}
        </div>

        {/* Photo Upload */}
        <div className="space-y-2">
          <Label htmlFor="photos">Photos (Optional)</Label>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <input
                type="file"
                id="photos"
                multiple
                accept="image/*"
                onChange={handlePhotoUpload}
                disabled={loading || formData.photos.length >= 5}
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById('photos')?.click()}
                disabled={loading || formData.photos.length >= 5}
                className="flex items-center gap-2"
              >
                <Upload className="w-4 h-4" />
                Add Photos
              </Button>
              <span className="text-sm text-muted-foreground">
                {formData.photos.length}/5 photos
              </span>
            </div>

            {/* Photo Preview */}
            {formData.photos.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.photos.map((photo, index) => (
                  <div key={index} className="relative">
                    <img
                      src={photo}
                      alt={`Preview ${index + 1}`}
                      className="w-20 h-20 object-cover rounded-lg border"
                    />
                    <button
                      type="button"
                      onClick={() => removePhoto(index)}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center hover:bg-destructive/80 transition-colors"
                      disabled={loading}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={loading || formData.rating === 0 || formData.review_text.length < 50}
          className="w-full bg-gradient-to-r from-orange-400 to-red-400 hover:from-orange-500 hover:to-red-500 text-white hover:scale-[1.03] transition-all duration-300 hover:shadow-lg"
        >
          {loading ? 'Submitting...' : 'Submit Review'}
        </Button>
      </form>
    </div>
  );
};

export default ReviewForm;