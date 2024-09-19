import * as z from 'zod';

const formSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: 'Tên phải có ít nhất 2 ký tự.',
    })
    .optional(),
  image: z.string().url().optional(),
  photos: z.array(z.string().url()).optional(),
});

export default formSchema;
