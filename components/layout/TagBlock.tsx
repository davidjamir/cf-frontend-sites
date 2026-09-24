import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Tag } from "lucide-react";

export default function TagBlock({ tags }: { tags: string[] }) {
    return (
        <div className="mt-4 pt-4">
            <div className="flex flex-wrap items-center gap-2">
                <span className="font-semibold">Tags:</span>

                {tags.map((tag) => (
                    <Link
                        key={tag}
                        prefetch={false}
                        href={`/tag/${tag}`}
                        className="relative z-30 inline-flex text-sm no-underline hover:underline"
                    >
                        <Badge className="bg-green-400/20 text-green-900 backdrop-blur hover:bg-green-400/30 hover:text-green-950 transition-colors">
                            <Tag data-icon="inline-start" />
                            {tag}
                        </Badge>
                    </Link>
                ))}
            </div>
        </div>
    );
}
