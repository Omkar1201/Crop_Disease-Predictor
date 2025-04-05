import React from 'react';
import about1 from '../assets/about1.jpg';
import about2 from '../assets/about2.jpg';
import { motion } from 'framer-motion';

const About = () => {
    return (
        <div className=" w-full overflow-hidden  min-h-screen bg-gradient-to-b from-green-50 to-white flex flex-col">
            <main className="flex-1 container mx-auto px-4 lg:px-8 py-12">
                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl lg:text-6xl font-bold text-emerald-800 mb-4">
                        Cultivating Healthier Crops Through AI
                    </h1>
                    <p className="text-lg lg:text-xl text-gray-600 max-w-4xl mx-auto">
                        Revolutionizing agriculture with intelligent disease detection and sustainable solutions
                    </p>
                </motion.div>

                {/* Technology Section */}
                <section className="flex flex-col lg:flex-row gap-8 mb-20 items-center">
                    <motion.div
                        className="w-full lg:w-1/2"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <img
                            src={about1}
                            alt="AI Technology"
                            className="rounded-2xl w-[43rem] h-[20rem] shadow-xl transform transition duration-500 hover:scale-105"
                        />
                    </motion.div>

                    <motion.div
                        className="w-full lg:w-1/2"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="bg-white px-8 py-12 rounded-2xl shadow-lg border border-emerald-50">
                            <h2 className="text-3xl font-bold text-emerald-700 mb-6 flex items-center gap-3">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                                Advanced Detection Technology
                            </h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                Harnessing cutting-edge machine learning and computer vision, our system provides:
                            </p>
                            <ul className="space-y-3 mb-6">
                                <li className="flex items-center gap-2 text-emerald-700">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    Real-time disease identification with 95%+ accuracy
                                </li>
                                <li className="flex items-center gap-2 text-emerald-700">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    Global crop database with 25+ disease patterns
                                </li>
                                <li className="flex items-center gap-2 text-emerald-700">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    Cross-platform compatibility for field use
                                </li>
                            </ul>
                        </div>
                    </motion.div>
                </section>

                {/* Solution Section */}
                <section className="flex flex-col lg:flex-row-reverse gap-8 mb-20 items-center">
                    <motion.div
                        className="w-full lg:w-1/2"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <img
                            src={about2}
                            alt="Plant Disease Solution"
                            className="rounded-2xl shadow-xl transform transition duration-500 hover:scale-105"
                        />
                    </motion.div>

                    <motion.div
                        className="w-full lg:w-1/2"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="bg-white p-8 rounded-2xl shadow-lg border border-emerald-50">
                            <h2 className="text-3xl font-bold text-emerald-700 mb-6 flex items-center gap-3">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                                Comprehensive Crop Solutions
                            </h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                Our holistic approach combines AI detection with actionable insights:
                            </p>
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="p-4 bg-emerald-50 rounded-lg">
                                    <h3 className="font-semibold text-emerald-700 mb-2">Preventive Care</h3>
                                    <p className="text-sm text-gray-600">Early detection systems and risk prediction models</p>
                                </div>
                                <div className="p-4 bg-emerald-50 rounded-lg">
                                    <h3 className="font-semibold text-emerald-700 mb-2">Treatment Plans</h3>
                                    <p className="text-sm text-gray-600">Organic and chemical treatment recommendations</p>
                                </div>
                                <div className="p-4 bg-emerald-50 rounded-lg">
                                    <h3 className="font-semibold text-emerald-700 mb-2">Expert Support</h3>
                                    <p className="text-sm text-gray-600">24/7 access to agricultural specialists</p>
                                </div>
                                <div className="p-4 bg-emerald-50 rounded-lg">
                                    <h3 className="font-semibold text-emerald-700 mb-2">Sustainability</h3>
                                    <p className="text-sm text-gray-600">Eco-friendly farming practice guides</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </section>
            </main>
        </div>
    );
}

export default About;