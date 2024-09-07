import React from 'react'
import Banner from './components/Banner/Banner'
import MovieSlide from './components/MovieSlide/MovieSlide'
import UpcomingMovieSlide from './components/MovieSlide/UpcomingMovieSlider'
import TopMovieSlide from './components/MovieSlide/TopMovieSlide'

const Homepage = () => {
  return (
    <div>
      <Banner/>
      <MovieSlide/>
      <UpcomingMovieSlide/>
      <TopMovieSlide/>
    </div>
  )
}

export default Homepage
