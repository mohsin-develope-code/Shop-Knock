import React from 'react'
import PopProducts from '../Components/PopProducts'
import HeroSection from '../Components/HeroSection'
import Brands from '../Components/Brands'
import Deliver from '../Components/Deliver'
import CardSlide from '../Components/CardSlide'
import NewCollections from '../Components/NewCollections'



const Home = () => {



  return (
    <div>

      
        <HeroSection/>
      
        <Brands/>

        <NewCollections/>

        <PopProducts/>

        <CardSlide/>

        <Deliver/>
      

    </div>
  )
}

export default Home