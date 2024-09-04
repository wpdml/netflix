import React from 'react'
import Banner from './components/Banner/Banner'
import MovieSlide from './components/MovieSlide/MovieSlide'
import UpcomingMovieSlide from './components/MovieSlide/UpcomingMovieSlider'

const Homepage = () => {
  return (
    <div>
      <Banner/>
      <MovieSlide/>
      <UpcomingMovieSlide/>
    </div>
  )
}

export default Homepage
