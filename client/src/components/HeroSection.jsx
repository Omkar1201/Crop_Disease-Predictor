import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import img3 from "../assets/img2.jpg";

const HeroSection = () => {
    const variantContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delayChildren: 0.3,
                staggerChildren: 0.2
            }
        }
    };

    const variantItem = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.5 }
        }
    };

    return (
        <div className="relative bg-gradient-to-br from-green-50 to-emerald-50">
            <div className="relative mx-auto px-4 sm:px-6 lg:px-8 py-24">
                <motion.div
                    className="flex flex-col lg:flex-row items-center gap-12 max-w-7xl mx-auto"
                    variants={variantContainer}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Image Section */}
                    <motion.div
                        variants={variantItem}
                        className="w-full lg:w-1/2 flex justify-center"
                    >
                        <div className="relative">
                            <div className="absolute -inset-4 bg-emerald-100/50 rounded-3xl transform -rotate-4"></div>
                            <div className="absolute -inset-4 bg-emerald-100/50 rounded-3xl transform rotate-4"></div>
                            <img
                                src={img3}
                                alt="Crop Health Analysis"
                                className="relative rounded-3xl shadow-2xl w-full max-w-md lg:max-w-full hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                    </motion.div>

                    {/* Text Content */}
                    <motion.div
                        variants={variantItem}
                        className="w-full lg:w-1/2 text-center lg:text-left"
                    >
                        <motion.div variants={variantContainer}>
                            <motion.div variants={variantItem}>
                                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6">
                                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-green-500">
                                        Smart Crop Health
                                    </span>{" "}
                                    Analysis System
                                </h1>
                            </motion.div>

                            <motion.div variants={variantItem}>
                                <p className="text-lg md:text-xl mb-8 text-gray-600 max-w-2xl mx-auto lg:mx-0">
                                    Empowering Farmers with Smart Plant Disease Detection.
                                    Get instant diagnosis, local language support, and voice assistance.
                                    Simplifying farming with technology, one click at a time.
                                </p>
                            </motion.div>

                            <motion.div
                                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                                variants={variantItem}
                            >
                                <NavLink to="/selectfile">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="bg-gradient-to-r from-emerald-600 to-green-600 text-white px-8 py-[0.6rem] rounded-xl text-lg font-semibold hover:shadow-lg transition-all cursor-pointer"
                                    >
                                        Start Diagnosis →
                                    </motion.button>
                                </NavLink>

                                <NavLink to="/about">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="border-2 border-emerald-600 text-emerald-700 hover:bg-emerald-50 px-8 py-[0.5rem] rounded-xl text-lg font-semibold transition-colors cursor-pointer"
                                    >
                                        Learn More
                                    </motion.button>
                                </NavLink>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};

export default HeroSection;