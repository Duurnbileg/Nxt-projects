import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function DetailedContent({ movie }: { movie: Movie }) {
    return (
        <div className="flex flex-col gap-5">
            <div>
                <Badge variant={"outline"}>Fairy tale</Badge>
                <Badge variant={"outline"}>Pop musical</Badge>
                <Badge variant={"outline"}>Fantasy</Badge>
                <Badge variant={"outline"}>musical</Badge>
                <Badge variant={"outline"}>Romance</Badge>
            </div>
            <p>Elphaba, a misunderstood young woman because of her green skin, and Glinda, a popular girl, become friends at Shiz University in the Land of Oz. After an encounter with the Wonderful Wizard of Oz, their friendship reaches a crossroads. </p>
            <div className="flex flex-col gap-2">
                <div className="flex gap-13">
                    <p className="font-bold">Director</p>
                    <p>Jon M. Chu</p>
                </div>
                <Separator />
            </div>
            <div className="flex flex-col gap-2">
                <div className="flex gap-13">
                    <p className="font-bold">Writers</p>
                    <p>Release date
                        <span> · </span>
                        PG
                        <span> · </span>
                        Duration time
                    </p>
                </div>
                <Separator />
            </div>
            <div className="flex flex-col gap-2">
                <div className="flex gap-13">
                    <p className="font-bold">Director</p>
                    <p>Release date
                        <span> · </span>
                        PG
                        <span> · </span>
                        Duration time
                    </p>
                </div>
                <Separator />
            </div>
        </div>
    )

}