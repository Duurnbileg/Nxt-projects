import type { Movie } from "@/app/type";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Play, Star } from "lucide-react";
import Image from "next/image";

export const Hero = ({ movies }: { movies: Movie[] }) => {

    return (
        <main className="w-full h-[700px] relative overflow-hidden rounded-4xl">
            <Carousel className="w-full h-full relative inset-0">
                <CarouselContent>
                    {movies.slice(0, 10).map((item) => (
                        <CarouselItem
                            key={item.id}
                            className="relative w-full h-[700px] basis-full"
                        >
                            <Image
                                src={`https://image.tmdb.org/t/p/original${item.backdrop_path}`}
                                alt={item.title}
                                fill
                                priority
                                className="object-cover"
                                loading="eager"
                            />
                            <div className="w-full h-full bg-black opacity-40 absolute"></div>
                            <div className="absolute inset-0 z-10 flex items-center">
                                <div className="ml-40 max-w-md text-white">
                                    <p>Now Playing</p>
                                    <h1 className="text-6xl font-bold">
                                        {item.title}
                                    </h1>
                                    <div className="flex items-center gap-2 mt-4">
                                        <Star className="fill-yellow-400 text-yellow-400 w-5 h-5" />
                                        <p className="text-2xl font-semibold">
                                            {item.vote_average.toFixed(1)}
                                            <span className="text-gray-300 text-base"> / 10</span>
                                        </p>
                                    </div>
                                    <p className="leading-relaxed mt-4">
                                        {item.overview}
                                    </p>
                                    <Button className="mt-6">
                                        <Play className="mr-2 h-4 w-4" />
                                        Watch Trailer
                                    </Button>
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="!top-1/2 !-translate-y-1/2 left-10" />
                <CarouselNext className="!top-1/2 !-translate-y-1/2 right-10" />
            </Carousel>
        </main>
    );
}
