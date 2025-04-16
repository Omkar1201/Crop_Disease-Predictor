import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FiUploadCloud, FiChevronDown, FiCheckCircle } from "react-icons/fi";
import { TbLeaf, TbPlant } from "react-icons/tb";
import blurryImage from "../assets/blurry.png"
import clearImage from "../assets/clear.png"

const UserManual = () => {
    const [activeStep, setActiveStep] = useState(null);

    const steps = [
        {
            title: "Image Upload Guide",
            icon: <FiUploadCloud className="w-8 h-8" />,
            description: "Master the art of perfect plant imagery",
            tips: [
                "Use natural light - avoid harsh shadows",
                "Focus on single leaves for best results",
                "Max file size: 5MB (JPEG/PNG)",
                "Recommended resolution: 1200x800px"
            ],
            decoration: "✨"
        },
        {
            title: "Understanding Results",
            icon: <TbPlant className="w-8 h-8" />,
            description: "Decode your plant's health report",
            tips: [
                "Disease probability percentage",
                "AI confidence visualization",
                "Seasonal treatment recommendations",
                "Preventive care strategies"
            ],
            decoration: "📊"
        }
    ];

    // Floating leaf animation configuration
    const floatingLeaf = {
        initial: { y: -20, rotate: -15 },
        animate: {
            y: [0, -30, 0],
            rotate: [-15, 15, -15],
            transition: {
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="min-h-screen bg-gradient-to-b from-emerald-50/10 via-green-50 to-green-50 py-20 px-4"
        >
            <div className="max-w-6xl mx-auto relative overflow-hidden">
                {/* Floating decorative elements */}
                <motion.div {...floatingLeaf} className="absolute top-20 left-10 text-6xl opacity-20">
                    <TbLeaf />
                </motion.div>
                <motion.div {...floatingLeaf} className="absolute top-1/3 right-16 text-4xl opacity-15">
                    <TbLeaf />
                </motion.div>

                {/* Hero Section */}
                <div className="text-center mb-12 relative z-10">
                    <motion.h1
                        initial={{ y: -30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        className="text-6xl font-bold mb-6 bg-gradient-to-r from-emerald-600 via-green-500 to-teal-400 bg-clip-text text-transparent"
                    >
                        How to Use the System
                    </motion.h1>
                    <motion.div
                        className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-1.5 bg-gradient-to-r from-teal-400 to-green-400 rounded-full"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                    />
                </div>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-xl text-emerald-800/80 max-w-2xl text-center mx-auto mb-16 "
                >
                    Learn how to upload images, get accurate disease predictions, and follow essential do’s and don’ts for keeping your plants healthy.                </motion.p>

                {/* Upload Showcase */}
                <motion.div
                    className="group relative bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-10 mb-20 border-2 border-emerald-100/30 overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-emerald-50/50" />
                    <div className="flex flex-col md:flex-row gap-12 items-center relative z-10">
                        <motion.div
                            className="flex-1 space-y-8"
                            initial={{ x: -20 }}
                            animate={{ x: 0 }}
                        >
                            <div className="space-y-4">
                                <h3 className="text-3xl font-semibold text-emerald-900">
                                    Perfect Upload Guide
                                </h3>
                                <div className="flex items-center gap-3 text-emerald-600">
                                    <div className="h-px flex-1 bg-emerald-100/50" />
                                    <span className="text-sm">Follow these steps for best results</span>
                                    <div className="h-px flex-1 bg-emerald-100/50" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {['Natural Lighting', 'Close-Up Focus', 'High Resolution', 'Clear Background'].map((item, idx) => (
                                    <motion.div
                                        key={idx}
                                        whileHover={{ scale: 1.02 }}
                                        className="p-4 bg-white rounded-xl shadow-lg border border-emerald-100 flex items-center gap-4"
                                    >
                                        <div className="p-3 bg-emerald-100 rounded-lg">
                                            <FiCheckCircle className="w-6 h-6 text-emerald-600" />
                                        </div>
                                        <span className="text-emerald-800">{item}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        <div className="flex-1 relative">
                            <div className="grid grid-cols-2 gap-6">
                                <motion.div
                                    whileHover={{ y: -10 }}
                                    className="relative rounded-2xl overflow-hidden shadow-xl"
                                >
                                    <img
                                        src={clearImage}
                                        alt="Good Example"
                                        className="w-full h-64 object-cover"
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-emerald-900/60 p-4">
                                        <span className="text-white font-medium">Ideal Upload</span>
                                    </div>
                                </motion.div>
                                <motion.div
                                    whileHover={{ y: -10 }}
                                    className="relative rounded-2xl overflow-hidden shadow-xl"
                                >
                                    <img
                                        src={blurryImage}
                                        alt="Bad Example"
                                        className="w-full h-64 object-cover"
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-red-900/60 p-4">
                                        <span className="text-white font-medium">Avoid This</span>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Interactive Guide */}
                <div className="space-y-8 max-w-4xl mx-auto">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ scale: 0.98 }}
                            animate={{ scale: 1 }}
                            className="relative bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg overflow-hidden border border-emerald-100/30"
                        >
                            <div
                                className="p-8 cursor-pointer"
                                onClick={() => setActiveStep(activeStep === index ? null : index)}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-6">
                                        <motion.div
                                            className="p-4 bg-gradient-to-br from-emerald-100 to-green-50 rounded-xl shadow-inner"
                                            whileHover={{ scale: 1.1 }}
                                        >
                                            {step.icon}
                                        </motion.div>
                                        <div>
                                            <h3 className="text-2xl font-semibold text-emerald-900">{step.title}</h3>
                                            <p className="text-emerald-700/80 mt-2">{step.description}</p>
                                        </div>
                                    </div>
                                    <motion.div
                                        animate={{ rotate: activeStep === index ? 180 : 0 }}
                                        className="text-emerald-600"
                                    >
                                        <FiChevronDown className="w-8 h-8" />
                                    </motion.div>
                                </div>
                            </div>

                            <AnimatePresence>
                                {activeStep === index && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="border-t border-emerald-100/30"
                                    >
                                        <div className="p-8 bg-gradient-to-b from-emerald-50/30 to-white">
                                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                {step.tips.map((tip, tipIndex) => (
                                                    <motion.li
                                                        key={tipIndex}
                                                        initial={{ opacity: 0, x: -20 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm border border-emerald-100/30"
                                                    >
                                                        <div className="mt-1 p-2 bg-emerald-100 rounded-lg">
                                                            <span className="text-emerald-600">{step.decoration}</span>
                                                        </div>
                                                        <span className="text-emerald-800 flex-1">{tip}</span>
                                                    </motion.li>
                                                ))}
                                            </ul>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>

            </div>
        </motion.div>
    );
};

export default UserManual;