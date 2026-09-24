"use client";
import Link from "next/link";
import Logo from "@/components/layout/Logo";
import SearchForm from "@/components/layout/SearchForm";
import PrimaryMenu from "@/components/layout/PrimaryMenu";
import { Site } from "@/core/domain/site";

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { MenuIcon } from "lucide-react";
import SocialBlock from "@/components/layout/SocialBlock";

type Props = {
  site: Site;
};

export default function NewsHeader({ site }: Props) {
  return (
    <div className="relative z-50 w-full max-w-300 mx-auto flex items-center justify-between">
      {/* LEFT */}
      <div className="flex-1 flex justify-start">
        <Logo logo={site.logo} wordmark={site.wordmark} size="medium" />
      </div>

      {/* CENTER */}
      <div className="hidden md:flex flex-2 md:justify-end lg:justify-center min-w-0" >
        <PrimaryMenu items={site.pages || []} />
      </div>

      {/* RIGHT */}
      <div className=" hidden lg:flex flex-1 justify-end min-w-0">
        <SearchForm textColor={site.config.colorTextHeader} />
      </div>

      {/* MENU MOBILE */}
      <div className="md:hidden flex flex-1 justify-end min-w-0 cursor-pointer bg-transparent">
        <Sheet>
          <SheetTrigger render={
            <Button variant="outline" size="icon-lg" aria-label="Open menu" style={{
              backgroundColor: "transparent",
              color: site.config.colorTextHeader,
            }}>
              <MenuIcon />
            </Button>
          } />
          <SheetContent>
            <SheetHeader className="flex justify-center items-center">
              <SheetTitle className="font-bold">Menu Bar</SheetTitle>
              <SheetDescription className="sr-only">
                Navigation menu for pages, categories, and search.
              </SheetDescription>
            </SheetHeader>
            <div className="grid flex-1 auto-rows-min gap-6 px-4">
              <div className="grid gap-3">
                <Label>Search</Label>
                <SearchForm />
              </div>
              {
                site.pages.length > 0 && (
                  <div className="grid gap-2">
                    <Label>Pages</Label>
                    {site.pages?.map((page) => (
                      <Link key={page.id} href={page.slug} prefetch={false} className="block">
                        <SheetClose render={
                          <Button variant="ghost" className="w-full cursor-pointer justify-start text-xs">
                            {page.name}
                          </Button>
                        } />
                      </Link>
                    ))}
                  </div>
                )
              }
              {
                site.categories.length > 0 && (
                  <div className="grid gap-2">
                    <Label>Categories</Label>
                    {site.categories?.map((category) => (
                      <Link key={category.id} href={category.slug} prefetch={false} className="block">
                        <SheetClose render={
                          <Button variant="ghost" className="w-full cursor-pointer justify-start text-xs">
                            {category.name}
                          </Button>
                        } />
                      </Link>
                    ))}
                  </div>
                )}
              {
                site.networks.length > 0 && (
                  <div className="grid gap-2">
                    <Label>Networks</Label>
                    {site.networks?.map((network) => (
                      <Link key={network.slug} href={`/network/${network.slug}`} prefetch={false} className="block">
                        <SheetClose render={
                          <Button variant="ghost" className="w-full cursor-pointer justify-start text-xs">
                            {network.name}&lsquo;s Network Sites
                          </Button>
                        } />
                      </Link>
                    ))}
                  </div>
                )
              }
              <SocialBlock mode="dark" />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
