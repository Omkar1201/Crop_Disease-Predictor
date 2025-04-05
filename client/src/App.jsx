import { useState } from 'react'
import './App.css'
import toast from 'react-hot-toast'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import SelectFile from './components/SelectFile'
import Navbar from './components/Navbar'
import About from './pages/About'
function App() {

	return (
		<div className='pt-[5rem] '>
			<Navbar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/selectfile" element={<SelectFile />} />
				<Route path="/about" element={<About />} />
			</Routes>
		</div>
	)
}

export default App
