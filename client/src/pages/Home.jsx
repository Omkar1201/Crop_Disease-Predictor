import { useContext, useState } from "react"
import { AppContext } from "../context/AppContext"
import HeroSection from "../components/HeroSection"
import InfoSection from "../components/InfoSection"

const Home = ()=>{
    
    return (
        <div>
            <HeroSection/>
            <InfoSection/>
        </div>
    )
}
export default Home