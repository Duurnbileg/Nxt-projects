"use client"

import { useEffect, useState } from "react";
import { Header } from "./_components/header";
import { Hero } from "./_components/hero";
import { MovieList } from "./_components/movieList";
import { Footer } from "./_components/footer";
import { tmdbUrl } from "@/lib/tmdb";

export default function Home() {
  const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>([])
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([])
  const [popularMovies, setPopularMovies] = useState<Movie[]>([])

  const fetchTopRatedMovies = async () => {
    const response = await fetch(
      tmdbUrl("/movie/top_rated", { language: "en-US", page: 1 })
    )
    const data = await response.json()
    setTopRatedMovies(data.results ?? [])
  }
  const fetchUpcomingMovies = async () => {
    const response = await fetch(
      tmdbUrl("/movie/upcoming", { language: "en-US", page: 1 })
    )
    const data = await response.json()
    setUpcomingMovies(data.results ?? [])
  }
  const fetchPopularMovies = async () => {
    const response = await fetch(
      tmdbUrl("/movie/popular", { language: "en-US", page: 1 })
    )
    const data = await response.json()
    setPopularMovies(data.results ?? [])
  }

  useEffect(() => {
    fetchUpcomingMovies()
    fetchTopRatedMovies()
    fetchPopularMovies()
  }, [])

  return (
    <main className="w-full max-w-[1520px] flex flex-col items-center justify-center gap-16">
      <div className="w-full flex flex-col items-center justify-center gap-2 px-10 max-sm:px-4">
        <Header />
        <Hero movie={upcomingMovies} />
        <div className="w-[1260px] max-w-full flex flex-col items-center justify-center gap-16 mt-16">
          <MovieList genre="Upcoming" genreLink="upcoming" seeMoreShow={true} movie={upcomingMovies} />
          <MovieList genre="Popular" genreLink="popular" seeMoreShow={true} movie={popularMovies} />
          <MovieList genre="Top Rated" genreLink="toprated" seeMoreShow={true} movie={topRatedMovies} />
        </div>
      </div>
      <Footer />
    </main>
  );
}
