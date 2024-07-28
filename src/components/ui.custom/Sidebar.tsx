import { Separator } from '@radix-ui/react-dropdown-menu';
import {
  BriefcaseIcon,
  FolderIcon,
  GlassesIcon,
  RulerIcon,
  UserIcon,
} from 'lucide-react';
import Link from 'next/link';
import AuthButton from './sidebar/auth-button';
export default function SideBar() {
  return (
    <div className="hidden border-r bg-mainbackground lg:block">
      <div className="flex h-full max-h-screen flex-col gap-2 sticky top-1">
        <div className="flex h-[60px] items-center border-b px-6">
          <Link
            href="/"
            className="flex items-center gap-2 font-semibold text-[#d14d62]"
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
            <Link
              href="/sizing"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-[#d14d62] transition-all hover:bg-accent hover:text-accent-foreground"
              prefetch={false}
            >
              <RulerIcon className="h-4 w-4" />
              Sizing Guide
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-[#d14d62] transition-all hover:bg-accent hover:text-accent-foreground"
              prefetch={false}
            >
              <UserIcon className="h-4 w-4" />
              Account Management
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
}
