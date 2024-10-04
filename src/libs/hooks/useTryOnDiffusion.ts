import axios from 'axios';
import { useState } from 'react';

interface TryOnDiffusionParams {
  modelImage: File | string; // Có thể là File (nếu tải từ máy) hoặc chuỗi Base64 (nếu đã chuyển đổi)
  clothImage: File | string;
  category: 'Upper body' | 'Lower body' | 'Dress';
  numInferenceSteps?: number;
  guidanceScale?: number;
  seed?: number;
  base64?: boolean;
}

const fileToBase64 = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (reader.result === null) {
        reject(new Error('Failed to read file'));
      } else {
        // Assuming you want to strip the MIME type prefix for all images, not just PNGs
        const base64Data = (reader.result as string).replace(
          /^data:image\/[a-zA-Z]+;base64,/,
          '',
        );
        resolve(base64Data);
      }
    };
    reader.onerror = (error) => reject(error);
  });
};

const urlToBase64 = async (url: string): Promise<string> => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch the URL: ${response.statusText}`);
    }
    console.log(url);
    const blob = await response.blob();
    console.log(blob);
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        if (reader.result === null) {
          reject(new Error('Failed to convert blob to Base64'));
        } else {
          const base64Data = (reader.result as string).replace(
            /^data:image\/[a-zA-Z]+;base64,/,
            '',
          );
          resolve(base64Data);
        }
      };
      reader.onerror = (error) => reject(error);
    });
  } catch (error: any) {
    throw new Error(`Error during conversion: ${error.message}`);
  }
};

export const useTryOnDiffusion = () => {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const api_key = process.env.NEXT_PUBLIC_TRY_ON; // Thay bằng API key của bạn
  const url = 'https://api.segmind.com/v1/try-on-diffusion';

  const tryOnDiffusion = async (params: TryOnDiffusionParams) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      // Chuyển đổi ảnh nếu cần
      // const modelImage =
      //   typeof params.modelImage === 'string'
      //     ? params.modelImage
      //     : await toBase64(params.modelImage);
      // const clothImage =
      //   typeof params.clothImage === 'string'
      //     ? params.clothImage
      //     : await toBase64(params.clothImage);

      // const modelImage = await urlToBase64(
      //   typeof params.modelImage === 'string'
      //     ? params.modelImage : await fileToBase64(params.modelImage as File)
      // );
      const modelImage =
        typeof params.modelImage === 'string'
          ? await urlToBase64(params.modelImage)
          : await fileToBase64(params.modelImage as File);
      const clothImage =
        typeof params.clothImage === 'string'
          ? await urlToBase64(params.clothImage)
          : await fileToBase64(params.clothImage as File);
      console.log(modelImage);
      const data = {
        model_image: modelImage,
        cloth_image: clothImage,
        category: params.category,
        num_inference_steps: params.numInferenceSteps || 40,
        // num_inference_steps: params.numInferenceSteps || 25,
        guidance_scale: params.guidanceScale || 3.75,
        seed: params.seed || 12467,
        base64: params.base64 !== undefined ? params.base64 : true,
      };
      console.log(data);
      // Gọi API
      const response = await axios.post(url, data, {
        headers: {
          'x-api-key': api_key,
          // 'Content-Type': 'application/json',
        },
      });

      console.log(response.data);
      setResult(response.data);
    } catch (error: any) {
      setError(error.response?.data);
    } finally {
      setLoading(false);
    }
  };
  // console.log(result);
  return { tryOnDiffusion, result, loading, error };
};
