import React from "react";
import { NavLink } from "react-router-dom";
import { FaLinkedin, FaInstagramSquare, FaTwitterSquare, FaFacebookSquare, FaArrowRight, FaLeaf, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { GiPlantWatering } from "react-icons/gi";
import { PiPlantLight } from "react-icons/pi";

const FooterSection = () => {
    return (
        <div className="w-full bg-gradient-to-br from-[#1a2e28] to-[#0f1d1f] pt-12 relative overflow-hidden">
            {/* Decorative leaf pattern */}
            <div className="absolute inset-0 opacity-10 z-0">
                {[...Array(20)].map((_, i) => (
                    <FaLeaf
                        key={i}
                        className="absolute text-white"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            fontSize: `${Math.random() * 20 + 10}px`,
                            transform: `rotate(${Math.random() * 360}deg)`,
                        }}
                    />
                ))}
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12">
                    {/* Brand Identity */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                            <PiPlantLight className="text-4xl text-emerald-400 animate-pulse" />
                            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-green-500">
                                PlantGuard
                            </span>
                        </div>
                        <p className="text-gray-300 text-sm pr-8">
                            Detect diseases, recommend treatments, and boost crop yield – all in one platform.</p>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-500 text-lg font-semibold">
                            Quick Links
                        </h3>
                        <div className="flex flex-col space-y-2">
                            <NavLink
                                to="/about"
                                className="text-gray-300 hover:text-white flex items-center group transition-all duration-300 hover:pl-2"
                            >
                                <FaArrowRight className="mr-2 text-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                About Us
                            </NavLink>
                            <NavLink
                                // to="/disease-library"
                                className="text-gray-300 hover:text-white flex items-center group transition-all duration-300 hover:pl-2"
                            >
                                <FaArrowRight className="mr-2 text-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                Disease Library
                            </NavLink>
                            <NavLink
                                // to="/privacy"
                                className="text-gray-300 hover:text-white flex items-center group transition-all duration-300 hover:pl-2"
                            >
                                <FaArrowRight className="mr-2 text-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                Privacy Policy
                            </NavLink>
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-4">
                        <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-500 text-lg font-semibold">
                            Contact Us
                        </h3>
                        <div className="space-y-3">
                            <div className="flex items-center">
                                <FaMapMarkerAlt className="text-emerald-600 mr-3" />
                                <p className="text-gray-300">123 Pimpri Road</p>
                            </div>
                            <div className="flex items-center">
                                <FaPhoneAlt className="text-emerald-600 mr-3" />
                                <p className="text-gray-300">+91 123456789</p>
                            </div>
                            <div className="flex items-center">
                                <FaEnvelope className="text-emerald-600 mr-3" />
                                <p className="text-gray-300">support@plantguard.ai</p>
                            </div>
                        </div>
                    </div>

                    {/* Newsletter */}
                    <div className="space-y-4">
                        <h3 className=" bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-green-500 text-lg font-semibold">
                            Farmer's Journal
                        </h3>
                        <form className="flex flex-col space-y-3">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="bg-gray-800 rounded-full px-6 py-3 text-white focus:outline-none focus:ring-2 focus:ring-teal-400 border border-gray-600 hover:border-teal-400 transition-all"
                            />
                            <button
                                type="submit"
                                className="bg-gradient-to-r cursor-pointer from-emerald-600 to-green-600 text-white px-6 py-3 rounded-full hover:from-teal-600 hover:to-emerald-700 transition-all duration-300 font-medium flex items-center justify-center group"
                            >
                                <span>Subscribe Now</span>
                                <FaLeaf className="ml-2 transform group-hover:rotate-45 transition-transform" />
                            </button>
                        </form>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-700 relative">
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <FaLeaf className="text-teal-400 text-2xl bg-[#0f1d1f] px-2" />
                    </div>
                </div>

                {/* Copyright */}
                <div className="py-6 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                    <p className="text-gray-400 text-sm flex items-center">
                        <FaLeaf className="mr-2 text-teal-400 animate-pulse" />
                        © 2025 PlantGuard. Cultivating healthier ecosystems.
                    </p>
                    <div className="flex space-x-6">
                        {[
                            { icon: FaLinkedin, color: "#0A66C2" },
                            { icon: FaInstagramSquare, color: "#E1306C" },
                            { icon: FaTwitterSquare, color: "#1DA1F2" },
                            { icon: FaFacebookSquare, color: "#1877F2" },
                        ].map((SocialIcon, index) => (
                            <SocialIcon.icon
                                key={index}
                                className="text-2xl cursor-pointer opacity-80 hover:opacity-100 transition-opacity duration-300 hover:scale-125 transform"
                                style={{ color: SocialIcon.color }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FooterSection;