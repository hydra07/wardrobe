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
import { Textarea } from '@/components/ui/textarea';
import { axiosWithAuth } from '@/libs/axios';
import { ImageUploadOptions } from '@/libs/hooks/useImageUpload';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as z from 'zod';
import formSchema from './schema';
import { ListTags, Tags } from './Tags';
function Item({ item }: any) {
  return (
    <Dialog>
      <DialogTrigger>
        <Card className="relative group transition-all duration-300 ease-in-out transform hover:-translate-y-2 hover:shadow-lg">
          <div onClick={(e) => e.stopPropagation()}>
            <MultipleImage images={item.images} />
          </div>
          <CardContent className="py-4">
            <h3 className="font-semibold tracking-tight">{item.title}</h3>
            <small className="text-sm leading-none text-muted-foreground">
              {item.description}
            </small>
            <div className="flex items-center justify-between mt-2"></div>
          </CardContent>
          <div className="p-4">
            <ListTags tags={item.tags} />
          </div>
        </Card>
      </DialogTrigger>
      <DialogContent>
        <ScrollArea className="w-full overflow-y-auto rounded-md">
          <DialogHeader>
            <DialogTitle>Edit cloth</DialogTitle>
            <DialogDescription className="sm:max-w-[425px] h-full max-h-[80vh] flex flex-col">
              <div className="flex flex-col space-y-3">
                {/* <img
                  src="/ao.webp"
                  alt="Product Image"
                  width={200}
                  className="rounded-lg object-cover w-full aspect-square group-hover:opacity-50 transition-opacity"
                /> */}
                <div onClick={(e) => e.stopPropagation()}>
                  <MultipleImage images={item.images} />
                </div>
                <div>
                  <label>Name</label>
                  <Input
                    placeholder="Add name for your cloth..."
                    value={item.title}
                  />
                </div>
                <div>
                  <label>Description</label>
                  <Textarea
                    placeholder="Add description for your cloth..."
                    className="w-full"
                    value={item.description}
                  />
                </div>
                <div className="">
                  <label>Add tags</label>
                  <Tags />
                </div>
                <div className="flex justify-center items-center space-x-4">
                  <Button className="bg-green-600">Submit</Button>
                  <Button variant="destructive">Cancel</Button>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

export default function Wardrobe({ tag }: any) {
  const { data: session } = useSession();
  const [clothes, setClothes] = useState([]);
  useEffect(() => {
    console.log(tag);
    const fetchClothes = async () => {
      try {
        const queryParams = [];
        if (tag) {
          queryParams.push(`tag=${tag}`);
        }
        // if (page) {
        //   queryParams.push(`take=${take}`);
        //   queryParams.push(`skip=${(page - 1) * take}`);
        // }
        const queryString =
          queryParams.length > 0 ? `?${queryParams.join('&')}` : '';
        const token = session?.user.accessToken;
        console.log(token);
        if (!token) {
          // throw new Error(
          //   'Người dùng chưa đăng nhập hoặc không có thông tin phiên',
          // );
          return null;
        }
        const response = await axiosWithAuth(token).get(
          `/clothes${queryString}`,
        );
        // const response = await axiosWithAuth(token).get(
        //   `/clothes?skip=${0}&take=${5}&tag=${tag}`,
        // );
        if (response.status !== 200) {
          throw new Error('Không thể lấy danh sách quần áo');
        }
        const data = response.data;
        setClothes(data.clothes);
      } catch (error) {
        console.error('Lỗi khi lấy danh sách quần áo:', error);
      }
    };

    fetchClothes();
  }, [session, tag]);
  if (!session) return null;
  console.log(clothes);
  return (
    <div className="">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 w-10/12">
        {Array.isArray(clothes) &&
          clothes.map((cloth, index) => <Item key={index} item={cloth} />)}
      </div>
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
        <Button className="">Add Cloth</Button>
      </DialogTrigger>
      <DialogContent>
        <ScrollArea className="w-full overflow-y-auto rounded-md">
          <DialogHeader>
            <DialogTitle>Add Cloth</DialogTitle>
            <DialogDescription>
              <Form {...form}>
                <form
                  className="flex flex-col space-y-2"
                  onSubmit={form.handleSubmit(onSubmit)}
                >
                  <FormField
                    control={form.control}
                    name="images"
                    render={({ field }) => (
                      <FormItem>
                        {/* <FormLabel>Images</FormLabel> */}
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
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        {/* <FormDescription>Enter name cloth</FormDescription> */}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="brand"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Brand</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        {/* <FormDescription>Enter brand cloth</FormDescription> */}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder="Add description for your cloth..."
                            className="w-full"
                          />
                        </FormControl>
                        {/* <FormDescription>
                          Enter Description cloth
                        </FormDescription> */}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tags</FormLabel>
                        <FormControl>
                          {/* <Textarea
                            {...field}
                            placeholder="Add description for your cloth..."
                            className="w-full"
                          /> */}
                          <Tags handleChange={handleTagsChange} />
                        </FormControl>
                        {/* <FormDescription>
                          Enter Description cloth
                        </FormDescription> */}
                        {/* <FormMessage /> */}
                      </FormItem>
                    )}
                  />
                  {/* <div className="">
                    <label>Add tags</label>
                  </div> */}
                  <div className="flex justify-center items-center space-x-4">
                    <Button className="bg-green-600" type="submit">
                      Submit
                    </Button>
                    <Button variant="destructive">Cancel</Button>
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
      <div className="w-3/5 mb-5 flex flex-row space-x-3">
        <h2 className="text-xl font-semibold">Filter Wardrobe</h2>
        <Select defaultValue="name">
          <SelectTrigger className="w-[180px]">
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
    </>
  );
}
