import * as z from 'zod';

const formSchema = z.object({
  title: z.string().min(2, {
    message: 'Tên phải có ít nhất 2 ký tự.',
  }),
  description: z.string().min(10, {
    message: 'Mô tả phải có ít nhất 10 ký tự.',
  }),
  brand: z.string(),
  // tags: z.optional(),
  // .min(1, {
  //   message: 'Phải có ít nhất một thẻ.',
  // })
  tags: z.array(z.string()).optional(),
  images: z
    .array(z.string().url())
    .min(1, {
      message: 'Hãy tải ảnh lên',
    })
    .optional(),
});

export default formSchema;
