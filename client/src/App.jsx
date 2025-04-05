import { useState } from 'react'
import './App.css'
import toast from 'react-hot-toast'
import { Routes,Route } from 'react-router-dom'
import Home from './components/Home'
function App() {
	
	return (
		<div>
			Lets Begin
			<Routes>
				<Route path="/" element={<Home />} />
			</Routes>
		</div>
	)
}

export default App
