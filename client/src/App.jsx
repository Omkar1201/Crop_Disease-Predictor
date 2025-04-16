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
import ThreadDetail from './components/ThreadDetail'
import Signin from './components/Signin'
import DiseaseLibrary from './components/DiseaseLibrary'
import DiseaseDetails from './components/DiseaseDetails'
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
				<Route path="/community-forum/thread/:threadId" element={<ThreadDetail />} />
				<Route path="/signin" element={<Signin />} />
				<Route path="/disease-library" element={<DiseaseLibrary />} />
				<Route path="/disease-library/disease/:diseaseId" element={<DiseaseDetails />} />
				<Route path="*" element={<ErrorPage />} />
			</Routes>
			<FooterSection />
		</div>
	)
}

export default App
