import { motion } from "framer-motion";
import { LuLinkedin } from "react-icons/lu";
import { FiGithub } from "react-icons/fi";
import { FiMail } from "react-icons/fi";
import omkar from '../assets/omkar.jpg'
import bhairavnath from '../assets/bhairavnath.jpeg'
import digvijay from '../assets/digvijay.jpeg'
import kartik from '../assets/kartik.jpeg'

const teamMembers = [
    {
        name: "Digvijay Kalokhe",
        role: "UI/UX Designer",
        image: digvijay,
        email: "digvijaykalokhe16@gmail.com",
        linkedin: "https://www.linkedin.com/in/digvijay-kalokhe-b975442ab/",
        github: "https://github.com/digvijay160902/",
    },
    {
        name: "Omkar Salunkhe",
        role: "Frontend Developer",
        image: omkar, 
        email: "omkarsalunkhe1201@gmail.com",
        linkedin: "https://www.linkedin.com/in/omkar-salunkhe-28784b214",
        github: "https://github.com/omkar1201",
    },
    {
        name: "Bhairavnath Bhuse",
        role: "Backend Developer",
        image: bhairavnath,
        email: "bhairavnathbhuse@gmail.com",
        linkedin: "https://www.linkedin.com/in/bhairavnath-bhuse-740266231/",
        github: "https://github.com/Bhairavnath-Bhuse",
    },
    {
        name: "Kartik Dixit",
        role: "ML Engineer",
        image: kartik,
        email: "kartik.dixit@gmail.com",
        linkedin: "https://www.linkedin.com/in/kartik-prasad-dixit-6a627b225/",
        github: "https://github.com/Kartik-Dixit-11",
    }, 
    
];

export default function TeamSection() {
    return (
        <section
            className="relative bg-gradient-to-b from-emerald-50 to-green-50 py-28 px-4 sm:px-10 lg:px-20 overflow-hidden"
            id="team"
        >
            {/* Organic Background Shapes */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute -top-28 -left-40 w-[28rem] h-[28rem] bg-emerald-200 rounded-full mix-blend-multiply blur-3xl animate-float" />
                <div className="absolute top-1/2 right-0 w-72 h-72 bg-teal-200 rounded-full mix-blend-multiply blur-3xl animate-float-delayed" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-bold text-center mb-20 bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-green-400"
                >
                    Meet Our Team
                </motion.h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-14">
                    {teamMembers.map((member, idx) => (
                        <motion.div
                            key={idx}
                            className="group w-[18.5rm] relative bg-white/40 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-emerald-100 hover:shadow-3xl transition-all duration-300 ease-out hover:-translate-y-3 cursor-pointer"
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: idx * 0.15, type: "spring" }}
                            viewport={{ once: true }}
                        >
                            {/* Top Accent Bar */}
                            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-600 to-green-400 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                            <div className="relative z-10 space-y-6">
                                {/* Profile Image */}
                                <div className="relative mx-auto w-36 h-36">
                                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-300 to-teal-400 rounded-full opacity-0 transition-opacity duration-300 blur-xl" />
                                    <motion.div
                                        className="p-1.5 rounded-full bg-gradient-to-br from-emerald-100 to-teal-50 shadow-inner"
                                        whileHover={{ rotate: 5, scale: 1.05 }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                    >
                                        <img
                                            src={member.image}
                                            alt={member.name}
                                            className="w-full h-full rounded-full object-cover border-4 border-white"
                                        />
                                    </motion.div>
                                </div>

                                {/* Name & Role */}
                                <div className="text-center space-y-2">
                                    <h3 className="text-2xl font-semibold text-gray-800">{member.name}</h3>
                                    <p className="text-sm font-medium bg-gradient-to-r from-emerald-600 to-emerald-600 bg-clip-text text-transparent">
                                        {member.role}
                                    </p>
                                </div>

                                {/* Social Links */}
                                <div className="flex justify-center space-x-4">
                                    <a
                                        href={`mailto:${member.email}`}
                                        className="p-2.5 bg-white hover:bg-emerald-50 rounded-xl transition-all duration-300 hover:-translate-y-1 shadow-sm"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <FiMail className="w-6 h-6 text-emerald-600 hover:text-emerald-800 transition-colors" />
                                    </a>
                                    <a
                                        href={member.linkedin}
                                        className="p-2.5 bg-white hover:bg-emerald-50 rounded-xl transition-all duration-300 hover:-translate-y-1 shadow-sm"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <LuLinkedin className="w-6 h-6 text-emerald-600 hover:text-emerald-800 transition-colors" />
                                    </a>
                                    <a
                                        href={member.github}
                                        className="p-2.5 bg-white hover:bg-emerald-50 rounded-xl transition-all duration-300 hover:-translate-y-1 shadow-sm"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <FiGithub className="w-6 h-6 text-emerald-600 hover:text-emerald-800 transition-colors" />
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Floating Leaf Pattern */}
                <div className="absolute -bottom-40 left-0 right-0 h-96 opacity-10 pointer-events-none">
                    <div className="absolute w-24 h-24 bg-leaf-pattern bg-contain animate-float-delayed" />
                    <div className="absolute right-0 w-32 h-32 bg-leaf-pattern bg-contain animate-float" />
                </div>
            </div>
        </section>

    );
}