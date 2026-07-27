import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Play, Star } from "lucide-react";
import Image from "next/image";

export default function Hero({ movies }: { movies: Movie[] }) {

    return (
        <main className="w-full h-[600px] relative overflow-hidden">
            <Carousel className="w-full h-full relative inset-0">
                <CarouselContent>
                    {movies.slice(0, 10).map((movie) => (
                        <CarouselItem
                            key={movie.id}
                            className="relative w-full h-[600px] basis-full"
                        >
                            <Image
                                src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                                alt={movie.title}
                                fill
                                priority
                                className="object-cover"
                            />
                            <div className="absolute inset-0 z-10 flex items-center">
                                <div className="ml-40 max-w-md text-white">
                                    <p>Now Playing</p>
                                    <h1 className="text-6xl font-bold">
                                        {movie.title}
                                    </h1>
                                    <div className="flex items-center gap-2 mt-4">
                                        <Star className="fill-yellow-400 text-yellow-400 w-5 h-5" />
                                        <p>
                                            {movie.vote_average.toFixed(1)}
                                            <span className="text-gray-300"> / 10</span>
                                        </p>
                                    </div>
                                    <p className="leading-relaxed mt-4">
                                        {movie.overview}
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
                <CarouselPrevious className="left-10 top-1/2 h-[32px] w-[32px]" />
                <CarouselNext className="right-10 top-1/2 h-[32px] w-[32px]" />
            </Carousel>
        </main>
    );
}
