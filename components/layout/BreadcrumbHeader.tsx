import Link from "next/link";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function BreadcrumbHeader({
    component,
    value,
}: {
    component?: "Tag" | "Category" | "Search";
    value?: string;
}) {
    return (
        <Breadcrumb className="text-6xl pt-2 pb-8 ">
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink
                        render={
                            <Link href="/" prefetch={false}>
                                Home
                            </Link>
                        }
                    />
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbLink
                        render={
                            <Link href="/" prefetch={false}>
                                {component}
                            </Link>
                        }
                    />
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbPage>{value}</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    );
}
