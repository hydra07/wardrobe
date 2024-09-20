'use client';
import FileUploadDropzone from '@/components/ui.custom/FileUpload';
import MultipleImage from '@/components/ui.custom/MultipleImage';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { Textarea } from '@/components/ui/textarea';
import { axiosWithAuth } from '@/libs/axios';
import { ImageUploadOptions } from '@/libs/hooks/useImageUpload';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import { cloneElement, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as z from 'zod';
import formSchema from './schema';
import { ListTags, Tags } from './Tags';
function Item({ item }: any) {
  return (
    <Dialog>
      <DialogTrigger>
        <Card className="relative group transition-all duration-300 ease-in-out transform hover:-translate-y-2 hover:shadow-lg overflow-hidden">
          <div onClick={(e) => e.stopPropagation()} className="aspect-square">
            <MultipleImage images={item.images} />
          </div>
          <CardContent className="py-4">
            <h3 className="font-semibold tracking-tight text-lg mb-2">
              {item.title}
            </h3>
            <p className="text-sm leading-relaxed text-gray-600 line-clamp-2">
              {item.description}
            </p>
          </CardContent>
          <div className="p-4">
            <ListTags tags={item.tags} />
          </div>
        </Card>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <ScrollArea className="w-full overflow-y-auto rounded-md max-h-[80vh]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold mb-4">
              Edit cloth
            </DialogTitle>
            <DialogDescription className="space-y-6">
              <div onClick={(e) => e.stopPropagation()} className="mb-4">
                <MultipleImage images={item.images} />
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <Input
                    placeholder="Add name for your cloth..."
                    value={item.title}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <Textarea
                    placeholder="Add description for your cloth..."
                    className="w-full min-h-[100px]"
                    value={item.description}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Add tags
                  </label>
                  <Tags />
                </div>
                <div className="flex justify-center items-center space-x-4 pt-4">
                  <Button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2">
                    Submit
                  </Button>
                  <Button variant="destructive" className="px-6 py-2">
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
interface WardrobeProps {
  tag?: string | null;
  listItem?: React.ReactElement;
}
export default function Wardrobe({ tag, listItem }: WardrobeProps) {
  const { data: session } = useSession();
  const [clothes, setClothes] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    console.log(tag);
    const fetchClothes = async () => {
      try {
        const queryParams = [];
        if (tag) {
          queryParams.push(`tag=${tag}`);
        }
        const queryString =
          queryParams.length > 0 ? `?${queryParams.join('&')}` : '';
        const token = session?.user.accessToken;
        console.log(token);
        if (!token) {
          return null;
        }
        const response = await axiosWithAuth(token).get(
          `/clothes${queryString}`,
        );
        if (response.status !== 200) {
          throw new Error('Không thể lấy danh sách quần áo');
        }
        const data = response.data;
        setClothes(data.clothes);
      } catch (error) {
        console.error('Lỗi khi lấy danh sách quần áo:', error);
      } finally {
        setLoading(false);
      }
    };
    setLoading(true);
    fetchClothes();
  }, [session, tag]);
  if (!session) return null;
  console.log(clothes);
  return (
    <div className="">
      {loading ? (
        <Skeleton className="h-10 w-full" />
      ) : listItem ? (
        cloneElement(listItem, { clothes })
      ) : (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 w-10/12">
          {Array.isArray(clothes) &&
            clothes.map((cloth, index) => <Item key={index} item={cloth} />)}
        </div>
      )}
    </div>
  );
}

export function ClothForm() {
  const { data: session } = useSession();
  const [tags, setTags] = useState<any[]>([]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      brand: 'NONAME',
      description: '',
      images: [],
      tags: [],
    },
  });

  const imageOptions: ImageUploadOptions = {
    type: 'clother',
    onModel: 'Clothes',
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const token = session?.user.accessToken;
      if (!token) {
        throw new Error(
          'Người dùng chưa đăng nhập hoặc không có thông tin phiên',
        );
      }
      const response = await axiosWithAuth(token).post('/clothes', values);
      if (response.status === 200) {
        toast.success('Success!');
        console.log('Success:', response.data);
      } else {
        toast.error('Failed!');
      }
      console.log('Success:', response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const handleImageUpload = (urls: string[]) => {
    form.setValue('images', urls);
  };
  const handleTagsChange = async (tags: any[]) => {
    // console.log('tags', tags);
    form.setValue(
      'tags',
      tags.map((tag) => tag.value),
    );
    // console.log('tags', form.getValues('tags'));
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2">
          Add Cloth
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <ScrollArea className="w-full overflow-y-auto rounded-md max-h-[80vh]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold mb-4">
              Add Cloth
            </DialogTitle>
            <DialogDescription>
              <Form {...form}>
                <form
                  className="space-y-6"
                  onSubmit={form.handleSubmit(onSubmit)}
                >
                  <FormField
                    control={form.control}
                    name="images"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <FileUploadDropzone
                            onImageUpload={handleImageUpload}
                            imageOptions={imageOptions}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700">
                          Title
                        </FormLabel>
                        <FormControl>
                          <Input {...field} className="w-full" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="brand"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700">
                          Brand
                        </FormLabel>
                        <FormControl>
                          <Input {...field} className="w-full" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700">
                          Description
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder="Add description for your cloth..."
                            className="w-full min-h-[100px]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700">
                          Tags
                        </FormLabel>
                        <FormControl>
                          <Tags handleChange={handleTagsChange} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <div className="flex justify-center items-center space-x-4 pt-4">
                    <Button
                      className="bg-green-600 hover:bg-green-700 text-white px-6 py-2"
                      type="submit"
                    >
                      Submit
                    </Button>
                    <Button variant="destructive" className="px-6 py-2">
                      Cancel
                    </Button>
                  </div>
                </form>
              </Form>
            </DialogDescription>
          </DialogHeader>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

export function FilterWardrobe() {
  return (
    <>
      {/* <div className="w-full max-w-3xl mx-auto mb-8"> */}
      <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 sm:space-x-4">
        <h2 className="text-2xl font-semibold">Filter Wardrobe</h2>
        <Select defaultValue="name">
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Select sort by.." />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Sort by</SelectLabel>
              <SelectItem value="data">Date</SelectItem>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="description">Description</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    {/* </div> */}
    </>
  );
}
