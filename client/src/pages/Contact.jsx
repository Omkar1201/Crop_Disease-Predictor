import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import emailjs from '@emailjs/browser';
import { FiUpload, FiUser, FiPhone, FiFileText, FiX, FiSend, FiClock, FiMapPin, FiPhoneCall } from "react-icons/fi";
import contactIllustration from '../assets/mybg.jpg';

const Contact = () => {
    const form = useRef();
    const [imagePreview, setImagePreview] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 30, opacity: 0, scale: 0.95 },
        visible: {
            y: 0,
            opacity: 1,
            scale: 1,
            transition: {
                type: 'spring',
                stiffness: 120,
                damping: 12
            }
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleCancelImage = () => {
        setImagePreview(null);
        if (form.current) {
            form.current.image.value = '';
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await emailjs.sendForm(
                'service_oroytlo',
                'template_1jhrbhd',
                form.current,
                'JORWKOabqaRgQl7Kw'
            );
            toast.success("Message sent successfully!");
            form.current.reset();
            setImagePreview(null);
        } catch (error) {
            console.error(error);
            toast.error(error.text || "Failed to send message. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="relative py-24 px-4 md:px-10 bg-gradient-to-br from-emerald-50 via-green-50 to-cyan-50" id="contact">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(12)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute bg-gradient-to-r from-emerald-200/20 to-green-200/20 rounded-full blur-xl"
                        initial={{
                            scale: 0,
                            opacity: 0,
                            x: Math.random() * 100 - 50,
                            y: Math.random() * 100 - 50
                        }}
                        animate={{
                            scale: [0, 1.2, 0],
                            opacity: [0, 0.4, 0],
                            rotate: Math.random() * 360
                        }}
                        transition={{
                            duration: Math.random() * 8 + 8,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        style={{
                            width: `${Math.random() * 200 + 100}px`,
                            height: `${Math.random() * 200 + 100}px`,
                        }}
                    />
                ))}
            </div>

            <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 items-center relative">
                {/* Left Side - Illustration & Contact Info */}
                <motion.div
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="w-full md:w-1/2 space-y-10"
                >
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="overflow-hidden rounded-[3rem] shadow-2xl border-8 border-white/20 relative group"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-green-600/10 mix-blend-multiply" />
                        <motion.img
                            src={contactIllustration}
                            alt="Plant Care Illustration"
                            className="w-full h-auto transform transition-transform duration-500"
                            initial={{ scale: 1 }}
                            animate={{ scale: 1 }}
                            whileHover={{ scale: 1.05 }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/30 to-transparent" />
                    </motion.div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="space-y-6 bg-white/95 p-8 rounded-[2.5rem] shadow-2xl backdrop-blur-lg border border-emerald-50 relative overflow-hidden"
                    >
                        <div className="absolute -top-20 -right-20 w-64 h-64 bg-emerald-100/20 rounded-full blur-3xl" />
                        <motion.h3 variants={itemVariants} className="text-3xl font-bold bg-gradient-to-r from-emerald-700 to-green-600 bg-clip-text text-transparent">
                            Connect With Us
                        </motion.h3>

                        <motion.div variants={containerVariants} className="space-y-5">
                            {[
                                {
                                    icon: <FiMapPin className="w-6 h-6" />,
                                    title: "Agricultural Institute",
                                    subtitle: "Green Valley Campus",
                                    color: "from-emerald-600 to-green-500"
                                },
                                {
                                    icon: <FiPhoneCall className="w-6 h-6" />,
                                    title: "Phone Support",
                                    subtitle: "+91 555 123-4567",
                                    color: "from-cyan-600 to-emerald-500"
                                },
                                {
                                    icon: <FiClock className="w-6 h-6" />,
                                    title: "Response Time",
                                    subtitle: "Within 24 hours",
                                    color: "from-amber-600 to-yellow-500"
                                }
                            ].map((item, index) => (
                                <motion.div
                                    key={index}
                                    variants={itemVariants}
                                    whileHover={{ x: 8 }}
                                    className="flex items-center gap-5 p-5 rounded-2xl bg-gradient-to-r from-white to-emerald-50 hover:to-green-50 transition-all group relative overflow-hidden"
                                >
                                    <div className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
                                    <div className="p-3.5 bg-gradient-to-br from-emerald-100 to-green-100 rounded-xl text-emerald-700 shadow-sm">
                                        {item.icon}
                                    </div>
                                    <div className="space-y-1">
                                        <p className="font-semibold text-emerald-900">{item.title}</p>
                                        <p className="text-sm text-emerald-700/80">{item.subtitle}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                </motion.div>

                {/* Right Side - Contact Form */}
                <motion.div
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="w-full md:w-1/2"
                >
                    <motion.form
                        ref={form}
                        onSubmit={handleSubmit}
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="bg-white/95 p-10 rounded-[2.5rem] shadow-2xl space-y-8 border-8 border-emerald-50/30 relative overflow-hidden backdrop-blur-sm"
                    >
                        <div className="absolute -top-32 -right-32 w-96 h-96 bg-emerald-100/20 rounded-full blur-3xl" />
                        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-green-100/20 rounded-full blur-3xl" />

                        <div className="text-center space-y-3 relative z-10">
                            <motion.h2
                                variants={itemVariants}
                                className="text-4xl font-bold bg-gradient-to-r from-emerald-700 to-green-600 bg-clip-text text-transparent"
                            >
                                Have Questions or Suggestions?
                            </motion.h2>
                            <motion.p
                                variants={itemVariants}
                                className="text-emerald-700/90 text-lg"
                            >
                                We’d love to hear from you. Fill out the form and we’ll get back to you shortly.
                            </motion.p>
                        </div>

                        <div className="grid grid-cols-1 gap-6 relative z-10">
                            {[
                                { icon: <FiUser className="w-5 h-5" />, type: "text", name: "name", placeholder: "Your Name" },
                                { 
                                    icon: <FiPhone className="w-5 h-5" />, 
                                    type: "tel", 
                                    name: "phone", 
                                    placeholder: "+91 234 567 8901",
                                    pattern: "[0-9]{10}"
                                },
                            ].map((input, index) => (
                                <motion.div key={index} variants={itemVariants}>
                                    <div className="relative group">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 bg-emerald-100 rounded-lg text-emerald-600 group-focus-within:bg-emerald-200 transition-colors">
                                            {input.icon}
                                        </div>
                                        <input
                                            type={input.type}
                                            name={input.name}
                                            placeholder={input.placeholder}
                                            required
                                            pattern={input.pattern}
                                            className="w-full outline-none pl-16 pr-6 py-4 border-2 border-emerald-100 rounded-2xl focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100/50 transition-all bg-white/80 hover:border-emerald-200 placeholder-emerald-600/60"
                                        />
                                    </div>
                                </motion.div>
                            ))}

                            <motion.div variants={itemVariants}>
                                <div className="relative group">
                                    <div className="absolute left-4 top-5 p-2.5 bg-emerald-100 rounded-lg text-emerald-600 group-focus-within:bg-emerald-200 transition-colors">
                                        <FiFileText className="w-5 h-5" />
                                    </div>
                                    <textarea
                                        rows="5"
                                        name="message"
                                        placeholder="Write your message here..."
                                        required
                                        className="w-full outline-none pl-16 pr-6 py-4 border-2 border-emerald-100 rounded-2xl focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100/50 transition-all bg-white/80 hover:border-emerald-200 placeholder-emerald-600/60"
                                    ></textarea>
                                </div>
                            </motion.div>

                            <motion.div variants={itemVariants}>
                                <div className="relative group">
                                    <div className="border-2 border-dashed border-emerald-100 rounded-2xl p-5 transition-all hover:border-emerald-400 hover:bg-emerald-50/30 bg-gradient-to-br from-white to-emerald-50/50">
                                        <AnimatePresence mode='wait'>
                                            {!imagePreview ? (
                                                <motion.label
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -10 }}
                                                    className="flex flex-col items-center justify-center cursor-pointer gap-3 min-h-[150px]"
                                                >
                                                    <div className="p-3 bg-emerald-100 rounded-xl text-emerald-600 group-hover:bg-emerald-200 transition-colors">
                                                        <FiUpload className="w-8 h-8 animate-pulse" />
                                                    </div>
                                                    <span className="text-emerald-700 font-medium text-lg">Upload Plant Image</span>
                                                    <span className="text-sm text-emerald-600/70">JPEG, PNG (Max 5MB)</span>
                                                    <input
                                                        type="file"
                                                        name="image"
                                                        accept="image/*"
                                                        className="hidden"
                                                        onChange={handleImageChange}
                                                    />
                                                </motion.label>
                                            ) : (
                                                <motion.div
                                                    initial={{ opacity: 0, scale: 0.9 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    exit={{ opacity: 0, scale: 0.9 }}
                                                    className="relative flex justify-center items-center min-h-[150px]"
                                                >
                                                    <img
                                                        src={imagePreview}
                                                        alt="Preview"
                                                        className="w-40 h-40 object-cover rounded-xl border-2 border-emerald-100 shadow-lg"
                                                    />
                                                    <motion.button
                                                        type="button"
                                                        onClick={handleCancelImage}
                                                        whileHover={{ scale: 1.1 }}
                                                        className="absolute -top-3 -right-3 bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 transition-colors shadow-lg"
                                                    >
                                                        <FiX className="w-5 h-5" />
                                                    </motion.button>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div variants={itemVariants}>
                                <motion.button
                                    type="submit"
                                    disabled={isSubmitting}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full bg-gradient-to-r cursor-pointer from-emerald-600 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white font-semibold py-3 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-emerald-300/40 flex items-center justify-center gap-3 group relative overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-20 transition-opacity" />
                                    <span className="text-lg tracking-wide">Send Message</span>
                                    {isSubmitting ? (
                                        <motion.div
                                            className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"
                                        />
                                    ) : (
                                        <FiSend className="w-6 h-6 transition-transform group-hover:translate-x-1" />
                                    )}
                                </motion.button>
                            </motion.div>
                        </div>
                    </motion.form>
                </motion.div>
            </div>
        </section>
    );
};

export default Contact;