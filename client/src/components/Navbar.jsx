import { NavLink } from "react-router-dom";
import logo from "../assets/CropSwasthya.png";

const Navbar = () => {
    return (
        <nav className="w-full h-20 px-8 bg-white/95 backdrop-blur-md shadow-sm fixed top-0 left-0 right-0 flex items-center justify-between z-50">
            {/* Logo with hover effect */}
            <NavLink
                to="/"
                className="transition-transform duration-300 hover:scale-105"
            >
                <div className="w-24">
                    <img
                        src={logo}
                        alt="CropSwasthya Logo"
                        className="w-full h-full object-contain"
                    />
                </div>
            </NavLink>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-10">
                <ul className="flex items-center space-x-10">
                    {[
                        { to: "/", text: "Home" },
                        { to: "/selectfile", text: "Search" },
                        { to: "/about", text: "About" }
                    ].map((link) => (
                        <li key={link.text}>
                            <NavLink
                                to={link.to}
                                className={({ isActive }) => `
                                    relative px-4 py-2 text-gray-600 hover:text-blue-600 
                                    transition-colors duration-300 font-medium
                                    ${isActive ? "text-blue-600" : ""}
                                `}
                            >
                                {link.text}
                                <span className={`
                                    absolute bottom-0 left-1/2 w-0 h-0.5 bg-blue-600 
                                    transition-all duration-300 -translate-x-1/2
                                    ${link.isActive ? "w-full" : "group-hover:w-full"}
                                `} />
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;