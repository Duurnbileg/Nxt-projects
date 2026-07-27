import DetailedHero from "../components/detailedHero";
import DetailedContent from "../components/detailedContent";
import Header from "@/app/_components/header";
import MovieCard from "@/app/_components/movieCard";
import { Button } from "@/components/ui/button";
import { ArrowRight, Link } from "lucide-react";
import Footer from "@/app/_components/footer";

export default function Detailed({ movie }: { movie: Movie }) {

    return (
        <main className="w-full flex items-center justify-center">
            <div className="w-full max-w-380 h-150 flex flex-col items-center">
                <Header />
                <div className=" flex flex-col items-center justify-center w-270 gap-8">
                    <DetailedHero />
                    <DetailedContent movie={movie} />
                </div>
                <div className="w-full flex flex-col items-center justify-center gap-2">
                    <div className="flex items-center justify-between w-270 mt-8">
                        <p className="text-2xl font-semibold mb-4">More like this</p>
                        <div className="flex items-center">
                            <Button variant="ghost" size="sm" className="ml-4">
                                <p>See more</p>
                                <ArrowRight className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                    <div className="w-full flex flex-wrap gap-8 justify-center">
                        {
                            // TODO: Add related movies data
                            // relatedMovies.slice(0, 5).map((item) => (
                            //     <MovieCard key={item.id} movie={item} variant="small" />
                            // ))
                        }
                    </div>
                </div>
                <Footer />
            </div >
        </main >
    );
}
