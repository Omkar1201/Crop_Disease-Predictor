import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { PiPlantLight } from "react-icons/pi";
import { FaBars, FaTimes } from "react-icons/fa";

const navItems = [
    { to: "/", text: "Home" },
    {
        text: "Diagnose",
        submenu: [
            { to: "/selectfile", text: "Upload Image" },
            { to: "/plantreport", text: "Plant Report" }
        ]
    },
    { to: "/community-forum", text: "Community Forum" },
    { to: "/disease-library", text: "Disease Library" },
    { to: "/about", text: "About" },
    // { to: "/signin", text: "Signin" },
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
    const [hoveredItem, setHoveredItem] = useState(null);
    const [expandedItem, setExpandedItem] = useState(null);
    const location = useLocation();

    const resetScroll = () => {
        window.scrollTo(0, 0);
        setIsOpen(false);
        setExpandedItem(null);
    };

    return (
        <motion.nav
            initial="hidden"
            animate="visible"
            variants={navbarVariants}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="w-full h-16 px-8 bg-white/10 backdrop-blur-md fixed top-0 left-0 right-0 flex items-center justify-between z-50 bg-gradient-to-b from-green-100/20 to-green-100/20"
        >
            {/* Logo */}
            <NavLink to="/" onClick={resetScroll}>
                <motion.div
                    className="w-20 flex items-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <div className="flex items-center ">
                        <PiPlantLight className="text-4xl text-emerald-800 " />
                        <p className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-green-500 ml-2">PlantGuard</p>
                    </div>
                </motion.div>
            </NavLink>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-10">
                <ul className="flex items-center space-x-10">
                    {navItems.map((item, index) => {
                        const isActiveParent = item.submenu?.some(subItem => subItem.to === location.pathname);

                        return (
                            <motion.li
                                key={item.text}
                                variants={listItemVariants}
                                custom={index}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {item.submenu ? (
                                    <div
                                        className="relative"
                                        onMouseEnter={() => setHoveredItem(item.text)}
                                        onMouseLeave={() => setHoveredItem(null)}
                                    >
                                        <button className={`px-4 py-2 text-gray-600 hover:text-emerald-800 font-medium cursor-pointer ${isActiveParent ? "text-emerald-800" : ""}`}>
                                            <span className="relative">
                                                {item.text}
                                                {isActiveParent && (
                                                    <motion.span
                                                        layoutId="underline"
                                                        className="absolute bottom-[-1.4rem] left-0 w-full h-[0.25rem] bg-emerald-800"
                                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                                    />
                                                )}
                                            </span>
                                        </button>
                                        <AnimatePresence>
                                            {hoveredItem === item.text && (
                                                <motion.ul
                                                    initial={{ opacity: 0, y: -10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -10 }}
                                                    className="absolute top-full left-0 bg-white shadow-lg rounded-md mt-1 py-2 min-w-[200px]"
                                                >
                                                    {item.submenu.map((subItem) => (
                                                        <li key={subItem.text}>
                                                            <NavLink
                                                                to={subItem.to}
                                                                onClick={resetScroll}
                                                                className={({ isActive }) =>
                                                                    `block px-4 py-2 text-gray-600 hover:bg-emerald-50 hover:text-emerald-800 ${isActive ? "text-emerald-800 bg-emerald-50" : ""
                                                                    }`
                                                                }
                                                            >
                                                                {subItem.text}
                                                            </NavLink>
                                                        </li>
                                                    ))}
                                                </motion.ul>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                ) : (
                                    <NavLink
                                        to={item.to}
                                        onClick={resetScroll}
                                        className={({ isActive }) =>
                                            `relative px-4 py-2 text-gray-600 hover:text-emerald-800 font-medium transition-colors duration-300 ${isActive ? "text-emerald-800" : ""}`
                                        }
                                    >
                                        {({ isActive }) => (
                                            <span className="relative">
                                                {item.text}
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
                                )}
                            </motion.li>
                        );
                    })}
                </ul>
            </div>

            {/* Mobile Menu Button */}
            <button
                onClick={() => {
                    setIsOpen(!isOpen);
                    if (!isOpen) setExpandedItem(null);
                }}
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
                            {navItems.map((item, index) => {
                                const isActiveParent = item.submenu?.some(subItem => subItem.to === location.pathname);
                                const isActiveItem = location.pathname === item.to;

                                return (
                                    <motion.li
                                        key={item.text}
                                        variants={listItemVariants}
                                        custom={index}
                                        className="w-full text-center"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        {item.submenu ? (
                                            <div className="w-full">
                                                <button
                                                    onClick={() => setExpandedItem(expandedItem === item.text ? null : item.text)}
                                                    className={`px-4 py-2 text-gray-800 hover:text-emerald-800 font-medium ${isActiveParent ? "text-emerald-800" : ""}`}
                                                >
                                                    <span className="relative">
                                                        {item.text}
                                                        {(isActiveParent || expandedItem === item.text) && (
                                                            <motion.span
                                                                layoutId="mobile-underline"
                                                                className="absolute bottom-[-0.5rem] left-1/2 -translate-x-1/2 w-4/5 h-[0.25rem] bg-emerald-800"
                                                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                                            />
                                                        )}
                                                    </span>
                                                </button>
                                                <AnimatePresence>
                                                    {expandedItem === item.text && (
                                                        <motion.ul
                                                            initial={{ opacity: 0, maxHeight: 0 }}
                                                            animate={{ opacity: 1, maxHeight: 1000 }}
                                                            exit={{ opacity: 0, maxHeight: 0 }}
                                                            className="space-y-2 overflow-hidden"
                                                        >
                                                            {item.submenu.map((subItem) => (
                                                                <motion.li
                                                                    key={subItem.text}
                                                                    className="w-full text-center"
                                                                >
                                                                    <NavLink
                                                                        to={subItem.to}
                                                                        onClick={resetScroll}
                                                                        className={({ isActive }) =>
                                                                            `block px-4 py-2 text-gray-800 hover:text-emerald-800 font-medium transition-colors duration-300 ${isActive ? "text-emerald-800" : ""
                                                                            }`
                                                                        }
                                                                    >
                                                                        <span className="relative">
                                                                            {subItem.text}
                                                                            {location.pathname === subItem.to && (
                                                                                <motion.span
                                                                                    layoutId="mobile-sub-underline"
                                                                                    className="absolute bottom-[-0.3rem] left-1/2 -translate-x-1/2 w-4/5 h-[0.15rem] bg-emerald-800"
                                                                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                                                                />
                                                                            )}
                                                                        </span>
                                                                    </NavLink>
                                                                </motion.li>
                                                            ))}
                                                        </motion.ul>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        ) : (
                                            <NavLink
                                                to={item.to}
                                                onClick={resetScroll}
                                                className={({ isActive }) =>
                                                    `block px-4 py-2 text-gray-800 hover:text-emerald-800 font-medium transition-colors duration-300 ${isActive ? "text-emerald-800" : ""}`
                                                }
                                            >
                                                <span className="relative">
                                                    {item.text}
                                                    {(isActiveItem) && (
                                                        <motion.span
                                                            layoutId="mobile-underline"
                                                            className="absolute bottom-[-0.5rem] left-1/2 -translate-x-1/2 w-4/5 h-[0.25rem] bg-emerald-800"
                                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                                        />
                                                    )}
                                                </span>
                                            </NavLink>
                                        )}
                                    </motion.li>
                                );
                            })}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;