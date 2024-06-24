/**
 * v0 by Vercel.
 * @see https://v0.dev/t/1B2P3N9zy6o
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';

export default function Component() {
  return (
    <div className="grid min-h-screen w-full grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 lg:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-[60px] items-center border-b px-6 bg-[#fcc8d1]">
            <Link
              href="#"
              className="flex items-center gap-2 font-semibold text-[#d14d62]"
              prefetch={false}
            >
              <FolderIcon className="h-6 w-6" />
              <span className="">Wardrobe</span>
            </Link>
            <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
              <BellIcon className="h-4 w-4" />
              <span className="sr-only">Toggle notifications</span>
            </Button>
          </div>
          <div className="flex-1 overflow-auto py-2">
            <nav className="grid items-start px-4 text-sm font-medium">
              <Link
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-[#d14d62]"
                prefetch={false}
              >
                <HomeIcon className="h-4 w-4" />
                My Wardrobe
              </Link>
              <Link
                href="#"
                className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-[#d14d62] transition-all hover:text-[#d14d62]"
                prefetch={false}
              >
                <FolderIcon className="h-4 w-4" />
                Outfit Suggestions
              </Link>
              <Link
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-[#d14d62]"
                prefetch={false}
              >
                <CameraIcon className="h-4 w-4" />
                Virtual Try-On
              </Link>
            </nav>
          </div>
          <div className="mt-auto p-4">
            <Card>
              <CardHeader className="pb-4">
                <CardTitle>Upgrade to Pro</CardTitle>
                <CardDescription>
                  Unlock all features and get unlimited access to our support
                  team
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button size="sm" className="w-full">
                  Upgrade
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-muted/40 px-6">
          <Link href="#" className="lg:hidden" prefetch={false}>
            <FolderIcon className="h-6 w-6 text-[#d14d62]" />
            <span className="sr-only">Wardrobe</span>
          </Link>
          <div className="w-full flex-1">
            <form>
              <div className="relative">
                <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search your wardrobe..."
                  className="w-full bg-background shadow-none appearance-none pl-8 md:w-2/3 lg:w-1/3"
                />
              </div>
            </form>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full border w-8 h-8"
              >
                <img
                  src="/placeholder.svg"
                  width="32"
                  height="32"
                  className="rounded-full"
                  alt="Avatar"
                />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
          <div className="flex items-center">
            <h1 className="font-semibold text-lg md:text-2xl">My Wardrobe</h1>
            <Button className="ml-auto" size="sm">
              Add Item
            </Button>
          </div>
          <div className="border shadow-sm rounded-lg">
            <Tabs defaultValue="all">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="tops">Tops</TabsTrigger>
                <TabsTrigger value="bottoms">Bottoms</TabsTrigger>
                <TabsTrigger value="dresses">Dresses</TabsTrigger>
                <TabsTrigger value="accessories">Accessories</TabsTrigger>
              </TabsList>
              <TabsContent value="all">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                  <Card className="relative group">
                    <Link
                      href="#"
                      className="absolute inset-0 z-10"
                      prefetch={false}
                    >
                      <span className="sr-only">View</span>
                    </Link>
                    <img
                      src="/placeholder.svg"
                      alt="Clothing Item"
                      width={300}
                      height={400}
                      className="object-cover w-full aspect-[3/4] rounded-lg group-hover:opacity-50 transition-opacity"
                    />
                    <CardContent className="pt-4">
                      <h3 className="font-semibold">White T-Shirt</h3>
                      <p className="text-sm text-muted-foreground">
                        Casual, Cotton
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline" className="text-xs">
                          Tops
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          White
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="relative group">
                    <Link
                      href="#"
                      className="absolute inset-0 z-10"
                      prefetch={false}
                    >
                      <span className="sr-only">View</span>
                    </Link>
                    <img
                      src="/placeholder.svg"
                      alt="Clothing Item"
                      width={300}
                      height={400}
                      className="object-cover w-full aspect-[3/4] rounded-lg group-hover:opacity-50 transition-opacity"
                    />
                    <CardContent className="pt-4">
                      <h3 className="font-semibold">Blue Jeans</h3>
                      <p className="text-sm text-muted-foreground">
                        Casual, Denim
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline" className="text-xs">
                          Bottoms
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          Blue
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="relative group">
                    <Link
                      href="#"
                      className="absolute inset-0 z-10"
                      prefetch={false}
                    >
                      <span className="sr-only">View</span>
                    </Link>
                    <img
                      src="/ao.webp"
                      alt="Clothing Item"
                      width={300}
                      height={400}
                      className="object-cover w-full aspect-[3/4] rounded-lg group-hover:opacity-50 transition-opacity"
                    />
                    <CardContent className="pt-4">
                      <h3 className="font-semibold">Black Dress</h3>
                      <p className="text-sm text-muted-foreground">
                        Formal, Polyester
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline" className="text-xs">
                          Dresses
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          Black
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="relative group">
                    <Link
                      href="#"
                      className="absolute inset-0 z-10"
                      prefetch={false}
                    >
                      <span className="sr-only">View</span>
                    </Link>
                    <img
                      src="/placeholder.svg"
                      alt="Clothing Item"
                      width={300}
                      height={400}
                      className="object-cover w-full aspect-[3/4] rounded-lg group-hover:opacity-50 transition-opacity"
                    />
                    <CardContent className="pt-4">
                      <h3 className="font-semibold">Leather Belt</h3>
                      <p className="text-sm text-muted-foreground">
                        Accessory, Leather
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline" className="text-xs">
                          Accessories
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          Brown
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              <TabsContent value="tops">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4" />
              </TabsContent>
              <TabsContent value="bottoms">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4" />
              </TabsContent>
              <TabsContent value="dresses">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4" />
              </TabsContent>
              <TabsContent value="accessories">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4" />
              </TabsContent>
            </Tabs>
          </div>
          <div className="border shadow-sm rounded-lg">
            <Tabs defaultValue="suggestions">
              <TabsList>
                <TabsTrigger value="suggestions">
                  Outfit Suggestions
                </TabsTrigger>
                <TabsTrigger value="favorites">Favorites</TabsTrigger>
              </TabsList>
              <TabsContent value="suggestions">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                  <Card className="relative group">
                    <Link
                      href="#"
                      className="absolute inset-0 z-10"
                      prefetch={false}
                    >
                      <span className="sr-only">View</span>
                    </Link>
                    <img
                      src="/placeholder.svg"
                      alt="Outfit Suggestion"
                      width={400}
                      height={500}
                      className="object-cover w-full aspect-[4/5] rounded-lg group-hover:opacity-50 transition-opacity"
                    />
                    <CardContent className="pt-4">
                      <h3 className="font-semibold">Casual Summer Outfit</h3>
                      <p className="text-sm text-muted-foreground">
                        White T-Shirt, Blue Jeans, Sandals
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline" className="text-xs">
                          Casual
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          Summer
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="relative group">
                    <Link
                      href="#"
                      className="absolute inset-0 z-10"
                      prefetch={false}
                    >
                      <span className="sr-only">View</span>
                    </Link>
                    <img
                      src="/placeholder.svg"
                      alt="Outfit Suggestion"
                      width={400}
                      height={500}
                      className="object-cover w-full aspect-[4/5] rounded-lg group-hover:opacity-50 transition-opacity"
                    />
                    <CardContent className="pt-4">
                      <h3 className="font-semibold">Formal Evening Outfit</h3>
                      <p className="text-sm text-muted-foreground">
                        Black Dress, Heels, Leather Clutch
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline" className="text-xs">
                          Formal
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          Evening
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="relative group">
                    <Link
                      href="#"
                      className="absolute inset-0 z-10"
                      prefetch={false}
                    >
                      <span className="sr-only">View</span>
                    </Link>
                    <img
                      src="/placeholder.svg"
                      alt="Outfit Suggestion"
                      width={400}
                      height={500}
                      className="object-cover w-full aspect-[4/5] rounded-lg group-hover:opacity-50 transition-opacity"
                    />
                    <CardContent className="pt-4">
                      <h3 className="font-semibold">Cozy Winter Outfit</h3>
                      <p className="text-sm text-muted-foreground">
                        Sweater, Jeans, Boots, Scarf
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline" className="text-xs">
                          Casual
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          Winter
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              <TabsContent value="favorites">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4" />
              </TabsContent>
            </Tabs>
          </div>
          <div className="border shadow-sm rounded-lg">
            <Tabs defaultValue="try-on">
              <TabsList>
                <TabsTrigger value="try-on">Virtual Try-On</TabsTrigger>
                <TabsTrigger value="measurements">Measurements</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
}

function BellIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  );
}

function CameraIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
      <circle cx="12" cy="13" r="3" />
    </svg>
  );
}

function FolderIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
    </svg>
  );
}

function HomeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function SearchIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
