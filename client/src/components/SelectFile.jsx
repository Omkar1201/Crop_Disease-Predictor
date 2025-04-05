import React, { useContext, useRef, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { LuUpload } from "react-icons/lu";
// import Navbar from './Navbar';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { SlCloudUpload } from "react-icons/sl";
import { RxCross2 } from "react-icons/rx";
// import "./stylee.css"
import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';


export default function SelectFile() {
    const { image, setImage, setPlantData } = useContext(AppContext);

    const [isLoading, setLoading] = useState(false);
    const fileInputRef = useRef(null);

    const navigate = useNavigate()


    const handleFileChange = (event) => {
        try {
            const file = event.target.files[0];
            setImage(file);
        }
        catch (err) {
            toast.error('Error in selecting image')
        }
    };

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    // Drag and Drop
    const handleDragOver = (event) => {
        event.preventDefault();
    };
    const handleDrop = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        if (file) {
            setImage(file);
        }
    };

    // Image upload
    const handleImageUpload = async (event) => {
        event.preventDefault()
        try {
            setLoading(true);
            const fd = new FormData();
            fd.append("file_from_react", image)
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/predictions`, fd)
            console.log(response);

            setPlantData({
                diseaseName: response.data?.Disease || 'Unknown',
                plantName: response.data?.Crop || 'Unknown',
                Flag: response.data?.flag || 'Unknown',
                causes: response.data?.cause || 'Unknown',
                symptoms: response.data?.sym || 'Unknown',
                cure: response.data?.cure || 'Unknown',
            })
            setTimeout(() => {
                navigate('/plantreport')
            }, 500)
        }
        catch (error) {
            toast.error(`Error - ${error.response?.data?.message}` || 'Upload failed')
        }
        finally {
            setLoading(false);
        }

    };
    console.log(image);

    return (

        <div className='flex flex-col py-7 items-center bg-gradient-to-br'>
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className='rounded-2xl border border-opacity-10 border-white shadow-xl p-8 max-w-2xl w-full mx-4 transition-all duration-300 hover:shadow-2xl bg-white/50 backdrop-blur-sm'
            >
                <motion.div
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    className={`border-3 border-dashed flex min-h-[20rem] w-full bg-white/70 rounded-xl flex-col justify-center items-center transition-all duration-200 ${!image ? 'hover:bg-emerald-50/40 cursor-pointer border-emerald-200' : 'border-emerald-100'
                        }`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    {image ? (
                        <div className='relative flex justify-center w-full h-full p-4 group'>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3 }}
                                className='relative'
                            >
                                <img
                                    src={URL.createObjectURL(image)}
                                    className={`max-h-80 w-auto rounded-lg shadow-lg transition-opacity ${isLoading ? 'opacity-40 animate-pulse' : 'opacity-100'
                                        }`}
                                    alt='Selected'
                                />
                                <motion.button
                                    whileHover={{ scale: 1.2 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => setImage('')}
                                    className='absolute -right-2 -top-2 text-zinc-600 p-1 shadow-lg rounded-full bg-red-100 hover:scale-110 duration-200 transition-all cursor-pointer'
                                    disabled={isLoading}
                                >
                                    <RxCross2 className='w-5 h-5' />
                                </motion.button>
                            </motion.div>
                            {isLoading && (
                                <div className='absolute inset-0 flex items-center justify-center'>
                                    <div className='animate-spin rounded-full h-12 w-12 border-4 border-emerald-800 border-t-transparent'></div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <motion.div
                            className='flex flex-col items-center space-y-6 px-4 text-center'
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{  duration: 0.5 }}
                        >
                            <motion.div
                                className='p-5 bg-emerald-500/10 rounded-full transition-all duration-300 group-hover:scale-110'
                                whileHover={{ scale: 1.15 }}
                            >
                                <SlCloudUpload className='w-14 h-14 text-emerald-800 opacity-90' />
                            </motion.div>
                            <div className='space-y-2'>
                                <h3 className='text-2xl font-bold bg-gradient-to-r from-emerald-700 to-emerald-800 bg-clip-text text-transparent'>
                                    Drag & Drop to Upload
                                </h3>
                                <p className='text-emerald-800 text-sm max-w-md'>
                                    Supported formats: JPEG, JPG, PNG, WEBP, ICO<br />
                                    Max file size: 5MB
                                </p>
                            </div>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                className='hidden'
                                accept='image/*'
                            />
                            <motion.button
                                onClick={handleButtonClick}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className='bg-gradient-to-r cursor-pointer from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center gap-2'
                            >
                                <LuUpload className='w-5 h-5' />
                                Choose File
                            </motion.button>
                        </motion.div>
                    )}
                </motion.div>
            </motion.div>

            {image && (
                <motion.button
                    onClick={handleImageUpload}
                    whileHover={{ scale: isLoading ? 1 : 1.05 }}
                    whileTap={{ scale: isLoading ? 1 : 0.95 }}
                    className={`mt-8 bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-emerald-600 hover:to-teal-600 cursor-pointer text-white px-12 py-3.5 rounded-xl font-semibold text-lg transition-all duration-300 ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:scale-105 hover:shadow-lg'
                        }`}
                    disabled={isLoading}
                >
                    {isLoading ? 'Uploading...' : 'Upload Image'}
                </motion.button>
            )}
        </div>)
}
