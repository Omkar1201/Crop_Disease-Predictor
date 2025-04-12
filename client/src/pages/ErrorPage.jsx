import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { TbError404 } from "react-icons/tb";
import { BiHomeHeart } from "react-icons/bi";

const ErrorPage = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delayChildren: 0.3,
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen bg-gradient-to-br from-emerald-50/50 to-green-50 flex items-center justify-center p-4"
        >
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="max-w-2xl w-full text-center space-y-8"
            >
                <motion.div
                    variants={itemVariants}
                    className="flex justify-center text-9xl text-emerald-600"
                >
                    <TbError404 className="drop-shadow-lg" />
                </motion.div>

                <motion.div variants={itemVariants}>
                    <h1 className="text-5xl font-bold text-emerald-900 mb-4">
                        Oops! Lost in the Green
                    </h1>
                    <p className="text-xl text-emerald-800/90 max-w-xl mx-auto">
                        The page you're looking for seems to have wandered off into the digital wilderness.
                        Let's get you back to cultivating healthy plants!
                    </p>
                </motion.div>

                <motion.div variants={itemVariants}>
                    <div className="relative inline-block group">
                        <div className="absolute inset-0 bg-emerald-100 rounded-xl transform group-hover:scale-105 transition-transform duration-300" />
                        <Link
                            to="/"
                            className="relative flex items-center justify-center gap-2 px-8 py-4 text-emerald-900 font-semibold rounded-xl hover:text-emerald-800 transition-colors"
                        >
                            <BiHomeHeart className="w-6 h-6" />
                            <span>Return to Home Garden</span>
                        </Link>
                    </div>
                </motion.div>

                <motion.div
                    variants={itemVariants}
                    className="mt-12 flex justify-center"
                >
                    <motion.div
                        animate={{
                            y: [-5, 5, -5],
                            rotate: [0, 5, -5, 0]
                        }}
                        transition={{
                            duration: 6,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="text-6xl text-emerald-600 opacity-50"
                    >
                        🌿
                    </motion.div>
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

export default ErrorPage;