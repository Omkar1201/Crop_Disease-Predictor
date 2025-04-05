import { useState } from 'react'
import './App.css'
import toast from 'react-hot-toast'
import { Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import SelectFile from './components/SelectFile'
function App() {
	
	return (
		<div>
			Lets Begin
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/selectfile" element={<SelectFile/>} />
			</Routes>
		</div>
	)
}

export default App
