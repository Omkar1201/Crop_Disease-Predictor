import { useContext, useState } from "react"
import { AppContext } from "../context/AppContext"

const Home = ()=>{
    const {image} = useContext(AppContext)
    console.log(image);
    
    return (
        <div>
            Home
        </div>
    )
}
export default Home