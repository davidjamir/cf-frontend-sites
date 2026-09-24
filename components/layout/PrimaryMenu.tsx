import Link from "next/link";
import { Category } from "@/core/domain/category";
import { Page } from "@/core/domain/page";

import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

type Props = {
    items: Page[] | Category[];
};

export default function PrimaryMenu({ items }: Props) {
    return (
        <>
            <NavigationMenu>
                <NavigationMenuList>
                    {items.map((item) => {
                        return (
                            <NavigationMenuItem key={item.id}>
                                <NavigationMenuLink
                                    className={`
                                    ${navigationMenuTriggerStyle()}
                                    text-sm
                                    lg:text-base
                                    bg-transparent
                                    hover:bg-white/10
                                    focus:bg-white/10
                                    data-active:bg-white/10
                                    data-[state=open]:bg-white/10
                                `}
                                    render={
                                        <Link href={item.slug} prefetch={false}>
                                            {item.name}
                                        </Link>
                                    }
                                />
                            </NavigationMenuItem>
                        );
                    })}
                </NavigationMenuList>
            </NavigationMenu>
        </>
    );
}
