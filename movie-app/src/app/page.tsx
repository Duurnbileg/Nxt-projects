"use client"

import { useEffect, useState } from "react";
import Footer from "./_components/footer";
import Header from "./_components/header";
import Hero from "./_components/hero";
import MovieList from "./_components/movieList";

const API_KEY = "c57b8556952c6312699fd719663951e1"
const BASE_URL = "https://api.themoviedb.org/3"
const UPCOMING_ENDPOINT = "/movie/upcoming?language=en-US&page=1"
const TOPRATED_ENDPOINT = "/movie/top_rated?language=en-US&page=1"
const POPULAR_ENDPOINT = "/movie/popular?language=en-US&page=1"

const upcomingApiUrl = `${BASE_URL}${UPCOMING_ENDPOINT}&api_key=${API_KEY}`
const topRatedApiUrl = `${BASE_URL}${TOPRATED_ENDPOINT}&api_key=${API_KEY}`
const popularApiUrl = `${BASE_URL}${POPULAR_ENDPOINT}&api_key=${API_KEY}`


export default function Home() {
  const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>([])
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([])
  const [popularMovies, setPopularMovies] = useState<Movie[]>([])

  const fetchTopRatedMovies = async () => {
    const response = await fetch(topRatedApiUrl)
    const data = await response.json()
    setTopRatedMovies(data.results)
  }


  const fetchUpcomingMovies = async () => {
    const response = await fetch(upcomingApiUrl)
    const data = await response.json()
    setUpcomingMovies(data.results)
  }
  const fetchPopularMovies = async () => {
    const response = await fetch(popularApiUrl)
    const data = await response.json()
    setPopularMovies(data.results)
  }

  useEffect(() => {
    fetchUpcomingMovies()
    fetchTopRatedMovies()
    fetchPopularMovies()
  }, [])

  return (
    <main className="w-[1440px] max-w-[1520px] flex items-center justify-center">
      <div className="w-380 flex flex-col items-center justify-center gap-2">
        <Header />
        <div className="w-full flex flex-col items-center justify-center gap-16 mt-2">
          <Hero movies={upcomingMovies} />
          <MovieList genre="Upcoming" seeMoreShow={true} movies={upcomingMovies} />
          <MovieList genre="Popular" seeMoreShow={true} movies={popularMovies} />
          <MovieList genre="Top Rated" seeMoreShow={true} movies={topRatedMovies} />
        </div>
        <Footer />
      </div>
    </main >
  );
}
