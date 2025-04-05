import React from "react";
// import "./stylee.css";
import { NavLink } from "react-router-dom";
import { FaLinkedin, FaInstagramSquare, FaTwitterSquare, FaFacebookSquare, FaArrowRight } from "react-icons/fa";

const FooterSection = () => {
    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
      };
      
      const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0 },
      };
      
      const cardHover = {
        hover: { 
          y: -5,
          transition: { type: "spring", stiffness: 300 }
        }
      };
    return (
        <div className="w-full bg-gradient-to-br from-[#2a362e] to-[#1d2728] pt-12 mt-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12">
                    {/* Social Links */}
                    <div className="space-y-4">
                        <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-500 text-lg font-semibold">
                            Connect With Us
                        </h3>
                        <div className="flex space-x-4">
                            {[
                                { icon: FaLinkedin, color: "#0A66C2" },
                                { icon: FaInstagramSquare, color: "#E1306C" },
                                { icon: FaTwitterSquare, color: "#1DA1F2" },
                                { icon: FaFacebookSquare, color: "#1877F2" },
                            ].map((SocialIcon, index) => (
                                <SocialIcon.icon
                                    key={index}
                                    className="text-3xl cursor-pointer text-white opacity-80 hover:opacity-100 transition-opacity duration-300 hover:-translate-y-1 transform"
                                    style={{ color: SocialIcon.color }}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-500 text-lg font-semibold">
                            Quick Links
                        </h3>
                        <div className="flex flex-col space-y-2">
                            <NavLink
                                to="/About"
                                className="text-gray-300 hover:text-white flex items-center group transition-all duration-300"
                            >
                                <FaArrowRight className="mr-2 text-teal-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                About Us
                            </NavLink>
                            <a href="#" className="text-gray-300 hover:text-white flex items-center group transition-all duration-300">
                                <FaArrowRight className="mr-2 text-teal-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                Terms & Conditions
                            </a>
                            <a href="#" className="text-gray-300 hover:text-white flex items-center group transition-all duration-300">
                                <FaArrowRight className="mr-2 text-teal-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                Privacy Policy
                            </a>
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-4">
                        <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-500 text-lg font-semibold">
                            Contact Us
                        </h3>
                        <div className="space-y-2">
                            <p className="text-gray-300">123 Financial Street</p>
                            <p className="text-gray-300">New York, NY 10001</p>
                            <p className="text-gray-300">Tel: +1 (555) 123-4567</p>
                            <p className="text-gray-300">Email: support@bankingplus.com</p>
                        </div>
                    </div>

                    {/* Newsletter */}
                    <div className="space-y-4">
                        <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-500 text-lg font-semibold">
                            Stay Updated
                        </h3>
                        <form className="flex flex-col space-y-3">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="bg-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
                            />
                            <button
                                type="submit"
                                className="bg-gradient-to-r from-teal-500 to-emerald-600 text-white px-6 py-2 rounded-lg hover:from-teal-600 hover:to-emerald-700 transition-all duration-300 font-medium"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                {/* Divider */}

                <div className="border-t border-gray-700"></div>
                {/* Copyright */}
                <div className="py-6 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-400 text-sm text-center mb-2 md:mb-0">
                        © 2023 Banking Plus. All rights reserved.
                    </p>
                    {/* <div className="flex space-x-4">
                        <img src="/visa.svg" alt="Visa" className="h-8 opacity-75 hover:opacity-100 transition-opacity" />
                        <img src="/mastercard.svg" alt="Mastercard" className="h-8 opacity-75 hover:opacity-100 transition-opacity" />
                        <img src="/amex.svg" alt="Amex" className="h-8 opacity-75 hover:opacity-100 transition-opacity" />
                    </div> */}
                </div>
            </div>
        </div>
    );
};

export default FooterSection;