import { useState } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { PiPlantLight } from "react-icons/pi";
import { FaBars, FaTimes } from "react-icons/fa";

const navItems = [
    { to: "/", text: "Home" },
    { to: "/selectfile", text: "Search" },
    { to: "/about", text: "About" },
    { to: "/team", text: "Our Team" },
];

const navbarVariants = {
    hidden: { y: -100 },
    visible: { y: 0 },
};

const listItemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: (index) => ({
        opacity: 1,
        y: 0,
        transition: { delay: index * 0.1 }
    }),
};

const mobileMenuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
};

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.nav
            initial="hidden"
            animate="visible"
            variants={navbarVariants}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="w-full h-16 px-8 bg-white/95 backdrop-blur-md shadow-s fixed top-0 left-0 right-0 flex items-center justify-between z-50 bg-gradient-to-b from-green-100 to-green-50"
        >
            {/* Logo */}
            <NavLink to="/">
                <motion.div
                    className="w-20 flex items-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <div className="flex items-center ">
                        <PiPlantLight className="text-4xl text-emerald-800 " />
                        <p className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-green-500 ml-2">PlantGuard </p>
                    </div>
                </motion.div>
            </NavLink>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-10">
                <ul className="flex items-center space-x-10">
                    {navItems.map((link, index) => (
                        <motion.li
                            key={link.text}
                            variants={listItemVariants}
                            custom={index}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <NavLink
                                to={link.to}
                                className={({ isActive }) =>
                                    `relative px-4 py-2 text-gray-600 hover:text-emerald-800 font-medium transition-colors duration-300 ${isActive ? "text-emerald-800" : ""
                                    }`
                                }
                            >
                                {({ isActive }) => (
                                    <span className="relative">
                                        {link.text}
                                        {isActive && (
                                            <motion.span
                                                layoutId="underline"
                                                className="absolute bottom-[-1.4rem] left-0 w-full h-[0.25rem] bg-emerald-800"
                                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                            />
                                        )}
                                    </span>
                                )}
                            </NavLink>
                        </motion.li>
                    ))}
                </ul>
            </div>

            {/* Mobile Menu Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-2 text-gray-600 hover:text-emerald-800 transition-colors"
                aria-label="Toggle menu"
            >
                {isOpen ? (
                    <FaTimes className="text-2xl" />
                ) : (
                    <FaBars className="text-2xl" />
                )}
            </button>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        variants={mobileMenuVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        transition={{ type: "spring", stiffness: 100, damping: 20 }}
                        className="fixed md:hidden top-16 left-0 right-0 bg-gradient-to-b from-green-100 to-green-50 backdrop-blur-md shadow-sm z-40"
                    >
                        <ul className="flex flex-col items-center py-4 space-y-4">
                            {navItems.map((link, index) => (
                                <motion.li
                                    key={link.text}
                                    variants={listItemVariants}
                                    custom={index}
                                    className="w-full text-center"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <NavLink
                                        to={link.to}
                                        onClick={() => setIsOpen(false)}
                                        className={({ isActive }) =>
                                            `block px-4 py-2 text-gray-600 hover:text-emerald-800 font-medium transition-colors duration-300 ${isActive ? "text-emerald-800" : ""
                                            }`
                                        }
                                    >
                                        {link.text}
                                    </NavLink>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;