import React from 'react'
import Banner from './components/Banner/Banner'
import MovieSlide from './components/MovieSlide/MovieSlide'
import UpcomingMovieSlide from './components/MovieSlide/UpcomingMovieSlider'
import TopMovieSlide from './components/MovieSlide/TopMovieSlide'

const Homepage = () => {
  return (
    <div className='home'>
      <div className='banner-area'>
      <Banner />
      </div>
      <div className='slide-area'>
      <MovieSlide/>
      <UpcomingMovieSlide/>
      <TopMovieSlide/>
      </div>
    </div>
  )
}

export default Homepage
