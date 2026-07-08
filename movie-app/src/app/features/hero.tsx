import { Star } from "lucide-react";
import Image from "next/image";

export default function Hero() {
    return (
        <main className="w-full h-[600px] relative ">
            <Image
                src="/Wicked.png"
                alt="hero"
                width={1440}
                height={600}
                className="absolute w-full" 
            ></Image>
            <div className="relative z-10 flex h-full w-full pl-40 items-center text-white">
                <div className="w-[400px]">
                    <p>Now playing:</p>
                    <h1 className="text-6xl font-bold">Wicked</h1>
                    <div className="flex text-base items-center gap-2">
                        <Star className="w-5 h-5 fill-amber-300 stroke-amber-300" />
                        <p className="text-lg">
                            6.9
                            <span className="text-gray-300 text-base">/10</span>
                        </p>
                    </div>
                    <p className="mt-4 text-sm">
                        Elphaba, a misunderstood young woman because of her green skin, and Glinda, a popular girl, become friends at Shiz University in the Land of Oz. After an encounter with the Wonderful Wizard of Oz, their friendship reaches a crossroads.
                    </p>
                </div>
            </div>
        </main>
    );
}
