import { useContext, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';


const DiseaseLibrary = () => {
    const navigate = useNavigate();
    const { diseaseInfo } = useContext(AppContext);


    const [diseaseNameQuery, setDiseaseNameQuery] = useState('');
    const [plantNameQuery, setPlantNameQuery] = useState('');
    const [symptomsQuery, setSymptomsQuery] = useState('');

    const filteredDiseases = diseaseInfo.filter(disease => {
        const matchesDiseaseName = disease.diseaseName.toLowerCase().includes(diseaseNameQuery.toLowerCase());
        const matchesPlantName = disease.plantName.toLowerCase().includes(plantNameQuery.toLowerCase());
        const matchesSymptoms = disease.symptoms.some(symptom =>
            symptom.toLowerCase().includes(symptomsQuery.toLowerCase())
        );

        return (
            (diseaseNameQuery ? matchesDiseaseName : true) &&
            (plantNameQuery ? matchesPlantName : true) &&
            (symptomsQuery ? matchesSymptoms : true)
        );
    });

    const clearFilters = () => {
        setDiseaseNameQuery('');
        setPlantNameQuery('');
        setSymptomsQuery('');
    };

    return (
        <div className="min-h-screen p-8 bg-gradient-to-b from-emerald-50 to-white">
            <div className="max-w-7xl mx-auto">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-5xl font-bold bg-gradient-to-r from-emerald-600 to-green-400 bg-clip-text text-transparent pb-8 text-center"
                >
                    Plant Disease Library
                </motion.h1>

                {/* Search Filters Section */}
                <motion.div
                    className="bg-white/80 p-6 rounded-xl shadow-md mb-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Search by Disease Name
                            </label>
                            <input
                                type="text"
                                placeholder="e.g. Powdery Mildew"
                                className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                value={diseaseNameQuery}
                                onChange={(e) => setDiseaseNameQuery(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Search by Plant Name
                            </label>
                            <input
                                type="text"
                                placeholder="e.g. Tomatoes"
                                className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                value={plantNameQuery}
                                onChange={(e) => setPlantNameQuery(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Search by Symptoms
                            </label>
                            <input
                                type="text"
                                placeholder="e.g. Yellow spots"
                                className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                value={symptomsQuery}
                                onChange={(e) => setSymptomsQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    {(diseaseNameQuery || plantNameQuery || symptomsQuery) && (
                        <div className="mt-4 flex justify-end">
                            <button
                                onClick={clearFilters}
                                className="text-green-600 hover:text-green-800 font-medium flex items-center cursor-pointer"
                            >
                                Clear All Filters
                                <svg
                                    className="w-4 h-4 ml-2"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    )}
                </motion.div>

                {/* Disease Cards */}
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    <AnimatePresence>
                        {filteredDiseases.map((disease) => (
                            <motion.div
                                key={disease._id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0,0,0,0.1)" }}
                                className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer"
                                onClick={() => navigate(`/disease-library/disease/${disease._id}`)}
                            >
                                <div className="p-6">
                                    <div className="flex items-start justify-between">
                                        <h3 className="text-xl font-semibold text-gray-800 mb-2">{disease.diseaseName}</h3>
                                        <span className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full">
                                            {disease.plantName}
                                        </span>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-sm text-gray-600">
                                            <span className="font-medium">Symptoms:</span> {disease.symptoms.join(', ')}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* No Results Message */}
                {filteredDiseases.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-12"
                    >
                        <div className="text-2xl text-gray-500 mb-4">
                            🌱 No diseases found matching your filters
                        </div>
                        <button
                            onClick={clearFilters}
                            className="text-green-600 hover:text-green-800 font-medium cursor-pointer"
                        >
                            Clear all filters
                        </button>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default DiseaseLibrary;