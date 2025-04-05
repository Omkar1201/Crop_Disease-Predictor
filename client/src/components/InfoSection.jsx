import React from "react";
import { motion } from "framer-motion";
import { TbPlant2, TbLanguage, TbSpeakerphone } from "react-icons/tb";
import { FiArrowUpRight } from "react-icons/fi";
import { Link } from "react-router";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.4,
            delayChildren: 0.3
        }
    }
};

const cardVariants = (index) => ({
    hidden: {
        y: 40,
        opacity: 0,
        scale: 0.95,
        filter: "blur(4px)"
    },
    visible: {
        y: 0,
        opacity: 1,
        scale: 1,
        rotateX: 0,
        filter: "blur(0px)",
        transition: {
            type: "spring",
            stiffness: 120,
            damping: 15,
            delay: index * 0.1
        }
    }
});

const hoverVariants = {
    hover: {
        y: -15,
        transition: {
            type: "spring",
            stiffness: 300,
            staggerChildren: 0.1
        }
    }
};

const contentVariants = {
    hover: {
        scale: 1.02,
        transition: { duration: 0.3 }
    }
};

const InfoSection = () => {
    const cards = [
        {
            icon: <TbPlant2 />,
            title: "AI-Powered Plant Diagnosis",
            text: "Detect plant diseases instantly with 95% accuracy using our AI model. Supports 10+ plants for fast and reliable diagnosis. Just upload a photo and get instant results with treatment suggestions.",
            color: "from-emerald-500 to-teal-500",
            pattern: "url(#plant-pattern)"
        },
        {
            icon: <TbLanguage />,
            title: "Regional Language Support",
            text: "To make the app user-friendly for farmers and local communities, we provide support for multiple regional languages. This helps users understand the information easily in their native language.",
            color: "from-amber-500 to-orange-500",
            pattern: "url(#language-pattern)"
        },
        {
            icon: <TbSpeakerphone />,
            title: "Text-to-Speech Assistance",
            text: "The app includes a text-to-speech feature that reads out disease names, symptoms, and treatment steps. This is helpful for users who prefer listening over reading or face reading challenges.",
            color: "from-indigo-500 to-purple-500",
            pattern: "url(#voice-pattern)"
        }
    ];

    return (
        <section className="py-24 px-4 sm:px-8 lg:px-16 bg-gradient-to-b from-green-50/50 to-white relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-32 -left-32 w-96 h-96 bg-emerald-100/30 rounded-full blur-3xl" />
                <div className="absolute -bottom-48 -right-48 w-96 h-96 bg-amber-100/30 rounded-full blur-3xl" />
            </div>

            <div className="max-w-7xl mx-auto relative">
                {/* Section header */}
                <motion.header
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-20"
                >
                    <h2 className="text-5xl font-bold mb-6 relative inline-block">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-green-500">
                            Agricultural Innovation
                        </span>
                        <motion.div
                            className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-1.5 bg-gradient-to-r from-teal-400 to-green-400 rounded-full"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                        />
                    </h2>
                    <p className="text-xl text-gray-600 mt-6 max-w-3xl mx-auto leading-relaxed">
                        Transforming traditional farming through cutting-edge AI solutions and accessible technology
                    </p>
                </motion.header>

                {/* Cards grid */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    {cards.map((card, index) => (
                        <motion.div
                            key={index}
                            variants={cardVariants(index)}
                            whileHover="hover"
                            className="group relative"
                        >
                            <motion.div
                                variants={hoverVariants}
                                className="h-full bg-white rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300 overflow-hidden border border-white/20 backdrop-blur-sm"
                            >
                                {/* Gradient background */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-20`} />

                                {/* Pattern overlay */}
                                <svg className="absolute inset-0 opacity-10 mix-blend-overlay">
                                    <pattern
                                        id={`pattern-${index}`}
                                        width="20"
                                        height="20"
                                        patternUnits="userSpaceOnUse"
                                    >
                                        <circle cx="10" cy="10" r="1" fill="currentColor" />
                                    </pattern>
                                    <rect width="100%" height="100%" fill={`url(#pattern-${index})`} />
                                </svg>

                                {/* Card content */}
                                <motion.div
                                    variants={contentVariants}
                                    className="relative h-full flex flex-col justify-between"
                                >
                                    <div className="p-8 pt-12">
                                        <div className="mb-8">
                                            <div className="w-14 h-14 rounded-2xl bg-black/5 backdrop-blur-sm flex items-center justify-center mb-6">
                                                {React.cloneElement(card.icon, {
                                                    className: "w-8 h-8 text-white",
                                                    style: { filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))" }
                                                })}
                                            </div>
                                            <h3 className="text-2xl font-bold text-gray-800 mb-4 leading-tight">
                                                {card.title}
                                            </h3>
                                            <p className="text-gray-600 leading-relaxed">
                                                {card.text}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Interactive footer */}
                                    <Link to='/selectfile'>
                                        <motion.div
                                            className="px-8 pb-6 cursor-pointer w-fit"
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <button className="flex items-center space-x-2 text-emerald-600 hover:text-emerald-700 transition-colors cursor-pointer">
                                                <span className="font-medium">Explore Feature</span>
                                                <FiArrowUpRight className="w-5 h-5" />
                                            </button>
                                        </motion.div>
                                    </Link>
                                </motion.div>
                            </motion.div>

                            {/* Hover effects */}
                            <div className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="absolute -top-8 -left-8 w-32 h-32 bg-purple-200/20 rounded-full blur-xl animate-pulse" />
                                <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-emerald-200/20 rounded-full blur-xl animate-pulse delay-100" />
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default InfoSection;