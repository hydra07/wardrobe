'use client';

import FileUploadDropzone from '@/components/ui.custom/FileUpload';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { axiosWithAuth } from '@/libs/axios';
import { ImageUploadOptions } from '@/libs/hooks/useImageUpload';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import formSchema from './schema';

const imageOptions: ImageUploadOptions = {
  type: 'other',
  onModel: 'User',
};
export default function UserProfile() {
  const { data: session } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  // const [username, setUsername] = useState<string | undefined>();
  // const [image, setImage] = useState<string | undefined>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const token = session?.user.accessToken;
      if (!token) {
        throw new Error(
          'Người dùng chưa đăng nhập hoặc không có thông tin phiên',
        );
      }
      // console.log(values);
      const response = await axiosWithAuth(token).patch('/user', values);
      if (response.status === 200) {
        toast.success('Success!');
        console.log('Success:', response.data);
      } else {
        toast.error('Failed!');
      }
      // console.log('Success:', response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleImageUpload = (urls: string[]) => {
    form.setValue('photos', urls);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Profile</CardTitle>
        <CardDescription>
          View and edit your profile information.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                    <Avatar className="w-24 h-24 border-2 border-gray-300 rounded-full shadow-md">
                      <AvatarImage src={field.value || session?.user.image} />
                      <AvatarFallback>
                        <img src={session?.user.image} />
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-2 flex-grow">
                      {/* <Label htmlFor="avatar" className="font-semibold">
                        Avatar URL
                      </Label> */}
                      <FormLabel>Avatar URL</FormLabel>
                      <Input
                        id="avatar"
                        {...field}
                        placeholder="https://example.com/avatar.jpg"
                        disabled={!isEditing}
                        className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <div className="space-y-2">
                    <FormLabel>Username</FormLabel>
                    <Input
                      id="username"
                      {...field}
                      placeholder={session?.user.name}
                      disabled={!isEditing}
                      className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="photos"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Photos</FormLabel>
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
            {isEditing ? (
              <>
                <Button
                  variant={'destructive'}
                  onClick={() => setIsEditing(false)}
                  className="bg-red-500 hover:bg-red-600 text-white"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white"
                >
                  Save Changes
                </Button>
              </>
            ) : (
              <Button
                onClick={() => setIsEditing(true)}
                className="bg-green-500 hover:bg-green-600 text-white"
              >
                Edit Profile
              </Button>
            )}
          </form>
        </Form>

        {/* <form onSubmit={handleSubmit} className="space-y-6"></form> */}
      </CardContent>
      <CardFooter className="flex justify-between"></CardFooter>
    </Card>
  );
}
