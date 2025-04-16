import { useContext, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FaExclamationTriangle, FaStethoscope, FaShieldAlt } from 'react-icons/fa';
import { FiArrowLeft } from 'react-icons/fi';
import { AppContext } from '../context/AppContext';

const ImageCarousel = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextImage = () => {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    const prevImage = () => {
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    return (
        <div className="relative h-80 overflow-hidden group">
            <div className="absolute inset-0 flex">
                {images.map((img, index) => (
                    <motion.img
                        key={index}
                        src={img}
                        alt="Disease example"
                        className="w-full h-full object-cover"
                        initial={{ opacity: 0 }}
                        animate={{
                            opacity: index === currentIndex ? 1 : 0,
                            x: `${(index - currentIndex) * 100}%`
                        }}
                        transition={{ duration: 0.3 }}
                    />
                ))}
            </div>

            {/* Navigation Arrows */}
            <div className="absolute inset-0 hidden group-hover:flex items-center justify-between p-2">
                <button
                    onClick={prevImage}
                    className="bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition-colors"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <button
                    onClick={nextImage}
                    className="bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition-colors"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>

            {/* Dots Indicator */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                {images.map((_, index) => (
                    <div
                        key={index}
                        className={`w-2 h-2 rounded-full transition-colors ${index === currentIndex ? 'bg-white' : 'bg-white/50'}`}
                    />
                ))}
            </div>
        </div>
    );
};

const Section = ({ title, items, icon }) => (
    <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-green-50/60 rounded-xl p-6 mb-6 shadow-sm"
    >
        <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-green-100 rounded-lg text-green-600">
                {icon}
            </div>
            <h2 className="text-2xl font-semibold text-green-800">
                {title}
            </h2>
        </div>
        <ul className="space-y-3 pl-2">
            {
                items?.map((item, index) => (
                    <motion.li
                        key={index}
                        initial={{ x: -20 }}
                        animate={{ x: 0 }}
                        className="flex items-start gap-2 text-gray-700 text-lg leading-relaxed"
                    >
                        <span className="text-green-400 mt-1">•</span>
                        {item}
                    </motion.li>
                ))}
        </ul>
    </motion.div>
);

const DiseaseDetails = () => {
    const { diseaseInfo } = useContext(AppContext)

    const { diseaseId } = useParams();
    const navigate = useNavigate();
    const disease = diseaseInfo.find(d => d._id.toString() === diseaseId);

    if (!disease) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="min-h-screen bg-gradient-to-b from-emerald-50 to-white flex items-center justify-center"
            >
                <div className="max-w-2xl text-center px-4">
                    <motion.div
                        initial={{ scale: 0.5 }}
                        animate={{ scale: 1 }}
                        className="mb-8 text-9xl text-emerald-600"
                    >
                        🍂
                    </motion.div>
                    <h1 className="text-4xl font-bold text-emerald-900 mb-4">
                        Disease Not Found
                    </h1>
                    <p className="text-lg text-emerald-700 mb-8">
                        Disease you are looking for is not found. Let's return to the library
                        and explore more botanical solutions together.
                    </p>
                    <button
                        onClick={() => navigate(-1)}
                        className="inline-flex items-center gap-2 px-8 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors text-lg cursor-pointer"
                    >
                        <FiArrowLeft className="w-5 h-5" />
                        Back to Plant Library
                    </button>
                </div>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen bg-gradient-to-b from-emerald-50 to-white p-8"
        >
            <div className="max-w-4xl mx-auto">
                <Link
                    to="/disease-library"
                    className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700 mb-8"
                >
                    <FiArrowLeft className="w-5 h-5" />
                    <span>Back to Library</span>
                </Link>
                <motion.div
                    initial={{ y: 20 }}
                    animate={{ y: 0 }}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden"
                >
                    {disease?.images && (
                        <div className="relative">
                            <ImageCarousel images={disease?.images} />
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-green-200 to-white p-6">
                                <div className="flex items-center gap-3 mb-2">
                                    <h1 className="text-4xl font-bold text-emerald-600">
                                        {disease?.diseaseName}
                                    </h1>
                                </div>
                                <p className="text-lg text-emerald-600">
                                    Common in: {disease?.plantName}
                                </p>
                            </div>
                        </div>
                    )}

                    <div className="p-8">
                        <div className="space-y-8">
                            <Section
                                title="Primary Causes"
                                items={disease?.causes}
                                icon={<FaExclamationTriangle className="w-6 h-6" />}
                            />

                            <Section
                                title="Key Symptoms"
                                items={disease?.symptoms}
                                icon={<FaStethoscope className="w-6 h-6" />}
                            />

                            <Section
                                title="Prevention & Treatment"
                                items={disease?.preventions}
                                icon={<FaShieldAlt className="w-6 h-6" />}
                            />
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default DiseaseDetails;
