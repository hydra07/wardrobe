'use client';
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
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

import FileUploadDropzone from '@/components/ui.custom/FileUpload';
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
import { listTags } from '@/demo/api';
import { ListTags, Tags } from './Tags';

function Item({ item }: any) {
  return (
    <Dialog>
      <DialogTrigger>
        <Card className="relative group transition-all duration-300 ease-in-out transform hover:-translate-y-2 hover:shadow-lg">
          <img
            src="/ao.webp"
            alt="Product Image"
            width={300}
            height={300}
            className="rounded-lg object-cover w-full aspect-square group-hover:opacity-50 transition-opacity"
          />
          <CardContent className="py-4">
            <h3 className="font-semibold tracking-tight">{item.name}</h3>
            <small className="text-sm leading-none text-muted-foreground">
              {item.description}
            </small>
            <div className="flex items-center justify-between mt-2"></div>
          </CardContent>
          <div className="p-4">
            <ListTags tags={listTags} />
          </div>
        </Card>
      </DialogTrigger>
      <DialogContent>
        <ScrollArea className="w-full overflow-y-auto rounded-md">
          <DialogHeader>
            <DialogTitle>Edit cloth</DialogTitle>
            <DialogDescription className="sm:max-w-[425px] h-full max-h-[80vh] flex flex-col">
              <div className="flex flex-col space-y-3">
                <img
                  src="/ao.webp"
                  alt="Product Image"
                  width={200}
                  className="rounded-lg object-cover w-full aspect-square group-hover:opacity-50 transition-opacity"
                />
                <div>
                  <label>Name</label>
                  <Input
                    placeholder="Add name for your cloth..."
                    value={item.name}
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

export default function Wardrobe({}: any) {
  return (
    <div className="">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 w-10/12">
        <Item item={{ name: 'Shirt', description: 'This is a shirt' }} />
        <Item item={{ name: 'Shirt', description: 'This is a shirt' }} />
        <Item item={{ name: 'Shirt', description: 'This is a shirt' }} />
        <Item item={{ name: 'Shirt', description: 'This is a shirt' }} />
        <Item item={{ name: 'Shirt', description: 'This is a shirt' }} />
      </div>
    </div>
  );
}

export function AddCloth() {
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
              <form className="flex flex-col space-y-2">
                <FileUploadDropzone />
                <div>
                  <label>Name</label>
                  <Input
                    placeholder="Add name for your cloth..."
                    // value={item.name}
                  />
                </div>
                <div>
                  <label>Description</label>
                  <Textarea
                    placeholder="Add description for your cloth..."
                    className="w-full"
                    // value={item.description}
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
              </form>
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
