import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { jsPDF } from "jspdf";
import { AppContext } from '../context/AppContext';
import { RxSpeakerLoud, RxDownload } from "react-icons/rx";
import './NotoSans-Regular-normal';
import axios from 'axios';

const RenderFormattedText = ({ text }) => {
    const formattedText = text.replace(/\*(.*?)\*/g, "<strong>$1</strong>");

    return <span dangerouslySetInnerHTML={{ __html: formattedText }} />;
};

const PlantReport = () => {
    const { image, plantData, translations, setPlantData } = useContext(AppContext);
    const [selectedLanguage, setSelectedLanguage] = useState('en')
    const [speakingIndex, setSpeakingIndex] = useState(null)
    const [isLoading, setIsLoading] = useState(false);
    const generatePDF = async (image, plantName, diseaseName, cause, symptoms, cure) => {
        if (!image) {
            toast.error('No image found');
            return;
        }

        const font = "NotoSans-Regular"
        // const font = "helvetica"

        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.getWidth();
        const margin = 15;
        const lineHeight = 6;
        let y = margin;

        // Add header
        doc.setFillColor(240, 240, 240);
        doc.rect(0, 0, pageWidth, 20, 'F');
        doc.setFontSize(20);
        doc.setFont(font, `${font === "NotoSans-Regular" ? "normal" : "bold"}`);
        doc.setTextColor(60, 60, 60);
        doc.text("Plant Disease Report", margin, 15);

        // Add horizontal line
        doc.setDrawColor(200, 200, 200);
        doc.line(margin, 22, pageWidth - margin, 22);

        const reader = new FileReader();
        reader.onload = async (e) => {
            const imgData = e.target.result;
            y = 30;

            // Add image with border
            const imgWidth = 60;
            const imgHeight = 60;
            const centerX = (pageWidth - imgWidth) / 2;
            doc.addImage(imgData, "PNG", centerX, y, imgWidth, imgHeight);
            doc.rect(centerX - 2, y - 2, imgWidth + 4, imgHeight + 4);

            y += imgHeight + 15;

            // Section styling with corrected color parameters
            const sectionTitleStyle = {
                fontSize: 14,
                fontStyle: 'bold',
                textColor: [40, 100, 50],
                borderColor: [200, 210, 200]
            };

            // Grid layout
            doc.setFontSize(12);
            doc.setFont(font, `${font === "NotoSans-Regular" ? "normal" : "bold"}`);
            doc.setTextColor(80, 80, 80);
            doc.text(`${translations[selectedLanguage].plantName}:`, margin, y);
            doc.text(`${translations[selectedLanguage].diseaseName}:`, pageWidth / 2, y);

            doc.setFont(font, "normal");
            doc.setTextColor(60, 60, 60);
            y += lineHeight;
            doc.text(plantName, margin, y);
            doc.text(diseaseName, pageWidth / 2, y);

            y += lineHeight * 2;

            const addSection = (title, content) => {
                if (y > doc.internal.pageSize.height - 50) {
                    doc.addPage();
                    y = margin;
                }

                // Section title with spread operator for RGB values
                doc.setFontSize(sectionTitleStyle.fontSize);
                doc.setFont(font, `${font === "NotoSans-Regular" ? "normal" : "bold"}`);
                doc.setTextColor(...sectionTitleStyle.textColor);
                doc.text(title, margin, y);

                doc.setDrawColor(...sectionTitleStyle.borderColor);
                doc.line(margin, y + 2, margin + 40, y + 2);

                y += lineHeight * 1.5;

                // Content
                doc.setFontSize(12);
                doc.setFont(font, "normal");
                doc.setTextColor(60, 60, 60);

                const cleanedContent = content.replace(/\*/g, '');

                const splitText = doc.splitTextToSize(cleanedContent, pageWidth - margin * 2);
                splitText.forEach((line, index) => {
                    if (y > doc.internal.pageSize.height - 20) {
                        doc.addPage();
                        y = margin;
                    }
                    doc.text(line, margin, y);
                    y += lineHeight;
                });

                y += lineHeight * 1.5;
            };

            addSection(`${translations[selectedLanguage].causes}`, cause);
            addSection(`${translations[selectedLanguage].symptoms}`, symptoms);
            addSection(`${translations[selectedLanguage].cure}`, cure);

            // Footer
            const totalPages = doc.internal.getNumberOfPages();
            for (let i = 1; i <= totalPages; i++) {
                doc.setPage(i);
                doc.setFontSize(10);
                doc.setTextColor(150, 150, 150);
                doc.text(`Page ${i} of ${totalPages}`, pageWidth - 40, doc.internal.pageSize.height - 10);
                doc.line(margin, doc.internal.pageSize.height - 15, pageWidth - margin, doc.internal.pageSize.height - 15);
            }

            doc.save(`${plantName}_${diseaseName}_report.pdf`);
        };

        reader.readAsDataURL(image);
    };

    const handleSpeak = (text, index) => {
        if (!text || text.trim() === '' || text === 'Unknown') {
            toast.error("No text found!");
            return;
        }

        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);

            utterance.lang = `${selectedLanguage}-IN`;
            let voices = window.speechSynthesis.getVoices();

            // Check if voices are loaded
            if (voices.length === 0) {
                window.speechSynthesis.onvoiceschanged = () => {
                    voices = window.speechSynthesis.getVoices();
                    assignVoiceAndSpeak(voices, utterance, index);
                };
            } else {
                assignVoiceAndSpeak(voices, utterance, index);
            }
        } else {
            toast.error('Text-to-Speech not supported');
        }
    };

    const assignVoiceAndSpeak = (voices, utterance, index) => {
        const Voice = voices.find(
            (voice) =>
                voice.lang === `${selectedLanguage}-IN` ||
                voice.lang.startsWith(`${selectedLanguage}`)
        );

        if (Voice) {
            utterance.voice = Voice;
        } else {
            toast.error("Selected language is not supported by the browser");
            return;
        }

        utterance.onstart = () => setSpeakingIndex(index);
        utterance.onend = () => setSpeakingIndex(null);
        window.speechSynthesis.speak(utterance);
    };


    const translation = async (event) => {
        setSelectedLanguage(event.target.value)
        try {
            setIsLoading(true)
            const response = await axios.post(
                `${process.env.REACT_APP_BASE_URL}/translation`,
                {
                    plantData,
                    targetLanguage: event.target.value
                }
            )
            console.log(response.data.translations);
            setPlantData({
                diseaseName: response.data?.translations.diseaseName || 'Unknown',
                plantName: response.data?.translations.plantName || 'Unknown',
                Flag: response.data?.translations.flag || 'Unknown',
                causes: response.data?.translations.causes || 'Unknown',
                symptoms: response.data?.translations.symptoms || 'Unknown',
                cure: response.data?.translations.cure || 'Unknown',
            })
        }
        catch (error) {
            toast.error(error.message)
            console.log(error);
        }
        finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="p-8 bg-gradient-to-br from-emerald-50 to-green-50 rounded-3xl shadow-2xl transition-all duration-500 ease-in-out animate-fadeInUp hover:shadow-3xl relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute -top-16 -right-16 w-32 h-32 bg-green-200/30 rounded-full blur-xl"></div>
            <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-emerald-200/20 rounded-full blur-lg"></div>

            {isLoading && (
                <div className="absolute inset-0 bg-white/80 z-30 backdrop-blur-sm flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-500 border-t-transparent"></div>
                </div>
            )}

            <div className="flex flex-col justify-between lg:flex-row gap-8 mb-8 relative z-10">
                {/* Image Card */}
                <div className="w-full lg:max-w-md xl:max-w-lg transform perspective-1000">
                    <div className="relative overflow-hidden min-h-[20rem] rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 group">
                        {image && (
                            <>
                                <img
                                    src={URL.createObjectURL(image)}
                                    alt="Selected Image"
                                    className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-green-600/30 via-transparent to-transparent" />
                                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-green-900/60">
                                    <h3 className="text-lg font-bold text-white truncate">
                                        {plantData?.plantName || 'Plant Analysis'}
                                    </h3>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* Language Selector */}
                <div className="flex flex-col items-start lg:items-end gap-4">
                    <div className="flex items-center bg-white rounded-lg p-2 shadow-md">
                        <svg
                            className="w-6 h-6 text-green-600 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                            />
                        </svg>
                        <select
                            value={selectedLanguage}
                            onChange={translation}
                            className="py-2 px-3 border-0 outline-none cursor-pointer rounded-md text-green-800 font-medium bg-transparent"
                        >
                            <option value={'en'}>English</option>
                            <option value={'mr'}>Marathi</option>
                            <option value={'hi'}>Hindi</option>
                            <option value={'gu'}>Gujarati</option>
                            <option value={'bn'}>Bengali</option>
                            <option value={'ta'}>Tamil</option>
                            <option value={'te'}>Telugu</option>
                            <option value={'kn'}>Kannada</option>
                            <option value={'ml'}>Malayalam</option>
                            <option value={'pa'}>Punjabi</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Information Cards */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 relative z-10">
                {[
                    {
                        label: translations[selectedLanguage].plantName,
                        value: plantData?.plantName,
                        icon: '🌿',
                    },
                    {
                        label: translations[selectedLanguage].diseaseName,
                        value: plantData?.diseaseName,
                        icon: '🦠',
                    },
                    {
                        label: translations[selectedLanguage].causes,
                        value: plantData?.causes,
                        icon: '⚠️',
                    },
                    {
                        label: translations[selectedLanguage].symptoms,
                        value: plantData?.symptoms,
                        icon: '💊',
                    },
                    {
                        label: translations[selectedLanguage].cure,
                        value: plantData?.cure,
                        icon: '🌱',
                    },
                ].map((item, index) => (
                    <div
                        key={index}
                        className="group p-5 bg-white/90 backdrop-blur-sm rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-green-100 hover:border-green-200 relative"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-white to-green-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                        <div className="relative z-10">
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center gap-3">
                                    <span className="text-2xl">{item.icon}</span>
                                    <h3 className="text-lg font-semibold text-green-800">
                                        {item.label}
                                    </h3>
                                </div>
                                <button
                                    onClick={() => handleSpeak(item.value, index)}
                                    className="p-2 hover:bg-green-100 rounded-full transition-colors duration-200 tooltip"
                                    data-tip="Read aloud"
                                >
                                    <RxSpeakerLoud
                                        className={`text-xl ${speakingIndex === index
                                                ? 'text-green-700 animate-pulse'
                                                : 'text-green-500'
                                            }`}
                                    />
                                </button>
                            </div>
                            <div className="pl-11">
                                <p className="text-green-900/80 leading-relaxed whitespace-pre-line">
                                    <RenderFormattedText text={item.value || 'Not available'} />
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Download Button */}
            <div className="mt-10 flex justify-center relative z-10">
                <button
                    onClick={() =>
                        generatePDF(
                            image,
                            plantData?.plantName,
                            plantData?.diseaseName,
                            plantData?.causes,
                            plantData?.symptoms,
                            plantData?.cure
                        )
                    }
                    className="flex items-center gap-3 bg-gradient-to-br from-green-500 to-emerald-600 text-white font-semibold rounded-xl px-8 py-4 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 active:scale-95 group"
                >
                    <RxDownload className="text-xl transition-transform group-hover:-translate-y-0.5" />
                    <span className="bg-gradient-to-r from-white/90 to-white bg-clip-text text-transparent">
                        Download Report
                    </span>
                </button>
            </div>
        </div>
    );
};

export default PlantReport;