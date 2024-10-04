import { Separator } from '@radix-ui/react-dropdown-menu';
import {
  BriefcaseIcon,
  FolderIcon,
  GlassesIcon,
  UserIcon,
  UsersIcon,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from 'next/link';
import AuthButton from './sidebar/auth-button';
import { ThemeMode } from './ThemeMode';
export default function SideBar() {
  return (
    <div className="hidden border-r bg-mainbackground lg:block">
      <div className="flex h-full max-h-screen flex-col gap-2 sticky top-1">
        <div className="flex h-[60px] items-center border-b px-6">
          <Link
            href="/"
            className="flex items-center gap-2 font-semibold text-mainforeground"
            prefetch={false}
          >
            <img src="/logo.png" className="w-16 h-16" />
            <span className="text-lg">ClothOn</span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-4 text-sm font-medium">
            <AuthButton />
            <Separator className="my-2" />
            <Link
              href="/try"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-[#d14d62] transition-all hover:bg-accent hover:text-accent-foreground"
              prefetch={false}
            >
              <GlassesIcon className="h-4 w-4" />
              Try On
            </Link>
            <Link
              href="/suggestions"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-[#d14d62] transition-all hover:bg-accent hover:text-accent-foreground"
              prefetch={false}
            >
              <FolderIcon className="h-4 w-4" />
              Outfit Suggestions
            </Link>
            <Link
              href="/wardrobe"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-[#d14d62] transition-all hover:bg-accent hover:text-accent-foreground"
              prefetch={false}
            >
              <BriefcaseIcon className="h-4 w-4" />
              Wardrobe Management
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className='flex items-center gap-3 rounded-lg px-3 py-2 text-[#d14d62] transition-all hover:bg-accent hover:text-accent-foreground'>
                  <UsersIcon className="h-4 w-4" />
                  Community
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                // sideOffset={5}
                align="end"
                side="right"
                className="bg-mainbackground border border-accent rounded-lg"
              >
                <Link
                  href="/community"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-[#d14d62] transition-all hover:bg-accent hover:text-accent-foreground"
                  prefetch={false}
                >
                  All Posts
                </Link>
                <Link
                  href="/community/add"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-[#d14d62] transition-all hover:bg-accent hover:text-accent-foreground"
                  prefetch={false}
                >
                  Add Post
                </Link>

              </DropdownMenuContent>
            </DropdownMenu>
            {/*<Link*/}
            {/*  href="/community"*/}
            {/*  className="flex items-center gap-3 rounded-lg px-3 py-2 text-[#d14d62] transition-all hover:bg-accent hover:text-accent-foreground"*/}
            {/*  prefetch={false}*/}
            {/*>*/}
            {/*  <UsersIcon className="h-4 w-4" />*/}
            {/*  Community*/}
            {/*</Link>*/}
            <Link
              href="/user"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-[#d14d62] transition-all hover:bg-accent hover:text-accent-foreground"
              prefetch={false}
            >
              <UserIcon className="h-4 w-4" />
              Account Management
            </Link>
            <ThemeMode />
          </nav>
        </div>
      </div>
    </div>
  );
}
