import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import SelectFile from './components/SelectFile'
import Navbar from './components/Navbar'
import About from './pages/About'
import FooterSection from './components/FooterSection'
import PlantReport from './components/PlantReport'
import Contact from './pages/Contact'
import ErrorPage from './pages/ErrorPage'
import ForumPage from './pages/ForumPage'
function App() {

	return (
		<div className='pt-[4rem] bg-gradient-to-b from-green-50 to-white'>
			<Navbar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/selectfile" element={<SelectFile />} />
				<Route path="/about" element={<About />} />
				<Route path="/plantreport" element={<PlantReport />} />
				<Route path="/contact" element={<Contact />} />
				<Route path="/community-forum" element={<ForumPage />} />
				<Route path="*" element={<ErrorPage />} />
			</Routes>
			<FooterSection />
		</div>
	)
}

export default App
