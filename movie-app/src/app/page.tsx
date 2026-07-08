import Header from "./features/header";
import Hero from "./features/hero";
import MovieCard from "./features/movieCard";

export default function Home() {
  return (
    <main className="flex items-center justify-center">
      <div className="w-[1520px] flex flex-col items-center justify-center gap-2">
        <Header />
        <Hero />
        <div className="flex flex-col gap-13">
          <MovieCard />
        </div>
      </div>
    </main >
  );
}
