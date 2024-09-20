'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useTryOnDiffusion } from '@/libs/hooks/useTryOnDiffusion';
import { useEffect, useState } from 'react';

export default function ToolBar({
  isSuggestion,
  setIsSuggestion,
  user,
  clothImage,
  setLoading,
  setResult,
}: any) {
  const { tryOnDiffusion, result, loading, error } = useTryOnDiffusion();
  const [modelImage, setModelImage] = useState<File | string | null>(
    user?.photos?.[0]?.url ?? null,
  );
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [category, setCategory] = useState<
    'Upper body' | 'Lower body' | 'Dress'
  >('Upper body');
  const handleSubmit = () => {
    console.log(modelImage, clothImage);
    if (modelImage && clothImage) {
      tryOnDiffusion({
        modelImage,
        clothImage,
        category,
        numInferenceSteps: 35,
        guidanceScale: 2,
        seed: 12467,
        base64: true,
      });
      // }
    }
  };
  useEffect(() => {
    setLoading(loading);
    setResult(result);
  }, [loading, result]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setModelImage(file);
      const url = URL.createObjectURL(file);
      setImagePreviewUrl(url);
    }
  };
  return (
    <Card className="w-full max-w-md mx-auto shadow-lg">
      <CardHeader className="">
        <CardTitle className="text-xl font-semibold text-center">
          Tool bar
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Wardrobe</span>
            <Switch
              onCheckedChange={setIsSuggestion}
              checked={isSuggestion}
              className="ml-2"
            />
            <span className="text-sm text-gray-600">Suggestion</span>
          </div>

          {!imagePreviewUrl &&
            Array.isArray(user?.photos) &&
            user.photos.length > 0 && (
              <div className="space-y-4">
                <span className="block text-center text-sm text-gray-600">
                  Your photo
                </span>
                <img
                  src={user.photos[0].url}
                  alt="User photo"
                  className="w-32 h-32 object-cover mx-auto rounded-full shadow-md"
                />
                <span className="block text-center text-sm text-gray-500">
                  Or
                </span>
              </div>
            )}

          <Select
            defaultValue="Upper body"
            onValueChange={(value) =>
              setCategory(value as 'Upper body' | 'Lower body' | 'Dress')
            }
            value={category}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Upper body">Upper body</SelectItem>
              <SelectItem value="Lower body">Lower body</SelectItem>
              <SelectItem value="Dress">Dress</SelectItem>
            </SelectContent>
          </Select>

          <div className="space-y-4">
            {imagePreviewUrl && (
              <img
                src={imagePreviewUrl}
                alt="Image preview"
                className="max-w-full h-auto max-h-48 object-cover mx-auto rounded-lg shadow-md"
              />
            )}
            <Input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>

          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
          >
            {loading ? 'Processing...' : 'Submit'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
