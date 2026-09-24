import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";

export default function Loading() {
    // Or a custom loading skeleton component
    return <div className="flex items-center justify-center h-full">
        <Badge className="flex flex-row bg-transparent text-black gap-4 p-4 text-lg">
            <Spinner data-icon="inline-start" />
            Loading...
        </Badge>
    </div>
}