import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

function AppContextProvider({ children }) {
    const [image, setImage] = useState('');
    const [plantData, setPlantData] = useState({
        diseaseName: '',
        plantName: '',
        causes: '',
        symptoms: '',
        cure: '',
        isHealthy: false
    })
    const translations = {
        en: {
            plantName: "Plant Name",
            diseaseName: "Disease Name",
            causes: "Causes of Disease",
            symptoms: "Symptoms of Disease",
            cure: "Cure of Disease",
            noText: "No text found!",
            download: "Download PDF",
            plantHealthy: "Plant is Healthy"
        },
        mr: {
            plantName: "वनस्पतीचे नाव",
            diseaseName: "रोगाचे नाव",
            causes: "रोगाची कारणे",
            symptoms: "रोगाची लक्षणे",
            cure: "रोगाचा उपचार",
            noText: "माहिती आढळली नाही!",
            download: "पीडीएफ डाउनलोड करा",
            plantHealthy: "वनस्पती निरोगी आहे"
        },
        hi: {
            plantName: "पौधे का नाम",
            diseaseName: "रोग का नाम",
            causes: "रोग के कारण",
            symptoms: "रोग के लक्षण",
            cure: "रोग का इलाज",
            noText: "कोई पाठ नहीं मिला!",
            download: "पीडीएफ डाउनलोड करें",
            plantHealthy: "पौधा स्वस्थ है"
        },
        gu: {
            plantName: "વનસ્પતિનું નામ",
            diseaseName: "રોગનું નામ",
            causes: "રોગના કારણો",
            symptoms: "રોગના લક્ષણો",
            cure: "રોગનો ઈલાજ",
            noText: "કોઈ લખાણ મળ્યું નથી!",
            download: "PDF ડાઉનલોડ કરો",
            plantHealthy: "વનસ્પતિ તંદુરસ્ત છે"
        },
        bn: {
            plantName: "গাছের নাম",
            diseaseName: "রোগের নাম",
            causes: "রোগের কারণ",
            symptoms: "রোগের লক্ষণ",
            cure: "রোগের চিকিৎসা",
            noText: "কোনো লেখা পাওয়া যায়নি!",
            download: "পিডিএফ ডাউনলোড করুন",
            plantHealthy: "গাছটি সুস্থ আছে"
        },
        ta: {
            plantName: "சரகத்தின் பெயர்",
            diseaseName: "நோயின் பெயர்",
            causes: "நோயின் காரணங்கள்",
            symptoms: "நோயின் அறிகுறிகள்",
            cure: "நோயின் சிகிச்சை",
            noText: "எழுத்து காணவில்லை!",
            download: "PDF பதிவிறக்கவும்",
            plantHealthy: "செடி ஆரோக்கியமாக உள்ளது"
        },
        te: {
            plantName: "చెట్టు పేరు",
            diseaseName: "రోగం పేరు",
            causes: "రోగం కారణాలు",
            symptoms: "రోగం లక్షణాలు",
            cure: "రోగం చికిత్స",
            noText: "పాఠ్యం కనబడలేదు!",
            download: "పిడిఎఫ్ డౌన్లోడ్ చేయండి",
            plantHealthy: "చెట్టు ఆరోగ్యంగా ఉంది"
        },
        kn: {
            plantName: "ಸಸ್ಯದ ಹೆಸರು",
            diseaseName: "ರೋಗದ ಹೆಸರು",
            causes: "ರೋಗದ ಕಾರಣಗಳು",
            symptoms: "ರೋಗದ ಲಕ್ಷಣಗಳು",
            cure: "ರೋಗದ ಚಿಕಿತ್ಸೆಯು",
            noText: "ಪಠ್ಯ ದೊರಕಿಲ್ಲ!",
            download: "ಪಿಡಿಎಫ್ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ",
            plantHealthy: "ಸಸ್ಯವು ಆರೋಗ್ಯವಾಗಿದ್ದುದು"
        },
        ml: {
            plantName: "ചെടിയുടെ പേര്",
            diseaseName: "രോഗത്തിന്റെ പേര്",
            causes: "രോഗത്തിന്റെ കാരണങ്ങൾ",
            symptoms: "രോഗത്തിന്റെ ലക്ഷണങ്ങൾ",
            cure: "രോഗം ചികിത്സ",
            noText: "പാഠം ലഭ്യമല്ല!",
            download: "PDF ഡൗൺലോഡ് ചെയ്യുക",
            plantHealthy: "ചെടി ആരോഗ്യമാണ്"
        },
        pa: {
            plantName: "ਪੌਦੇ ਦਾ ਨਾਮ",
            diseaseName: "ਬਿਮਾਰੀ ਦਾ ਨਾਮ",
            causes: "ਬਿਮਾਰੀ ਦੇ ਕਾਰਨ",
            symptoms: "ਬਿਮਾਰੀ ਦੇ ਲੱਛਣ",
            cure: "ਬਿਮਾਰੀ ਦਾ ਇਲਾਜ",
            noText: "ਕੋਈ ਪਾਠ ਨਹੀਂ ਮਿਲਿਆ!",
            download: "PDF ਡਾਊਨਲੋਡ ਕਰੋ",
            plantHealthy: "ਪੌਦਾ ਤੰਦਰੁਸਤ ਹੈ"
        }
    };


    const getRelativeTime = (updatedAt) => {
        const updated = new Date(updatedAt);
        const now = new Date();
        const diffMs = now - updated;
        const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

        if (diffDays < 1) {
            return `${diffHrs}h ago`;
        } else if (diffDays < 7) {
            return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
        } else {
            return updated.toLocaleDateString(); // fallback to full date if more than 1 week
        }
    }

    // const [threads, setThreads] = useState([
    //     {
    //         _id: 1,
    //         title: 'Help! Yellow spots on tomato leaves',
    //         content: `I've noticed these yellow spots appearing on my tomato plant leaves over the past week. 
    //           They start as small dots and gradually expand. Has anyone experienced this before? 
    //           I'm using organic fertilizer and water every 2 days.`,
    //         category: 'diseases',
    //         author: {userName:'UrbanGardener23'},
    //         replies: 15,
    //         views: 245,
    //         updatedAt: '2025-04-12T10:54:27.235+00:00',
    //         trending: true,
    //         comments: [
    //             {
    //                 _id: 1,
    //                 author: {userName:'PlantDoctor'},
    //                 commentBody: 'This looks like early blight. Try removing affected leaves and applying copper fungicide.',
    //                 updatedAt: '1h ago'
    //             },
    //         ]
    //     },
    //     {

    //         _id: 2,
    //         title: 'Why are my basil leaves curling?',
    //         content: `The edges of my basil plant leaves are curling inward, and some are turning a bit yellow. 
    //                       I'm watering every day and it's in partial sunlight. Could it be a nutrient issue or pests?`,
    //         category: 'gardening',
    //         author: {userName:'HerbLover'},
    //         replies: 8,
    //         views: 180,
    //         updatedAt: '2025-04-12T10:54:27.235+00:00',
    //         trending: false,
    //         comments: [
    //             {
    //                 _id: 1,
    //                 author: {userName:'GreenThumb101'},
    //                 commentBody: 'Sounds like it might be aphids. Check the underside of the leaves. Neem oil helps.',
    //                 updatedAt: '4h ago'
    //             }
    //         ]
    //     },
    //     {
    //         _id: 3,
    //         title: 'What’s causing white powder on my cucumber leaves?',
    //         content: `I’ve noticed a white powdery coating on the top of my cucumber leaves. It spreads quickly.
    //                       I’m worried it could be powdery mildew. What’s the best way to deal with it organically?`,
    //         category: 'diseases',
    //         author: {userName:'VeggieGrower45'},
    //         replies: 12,
    //         views: 210,
    //         updatedAt: '2025-04-12T10:54:27.235+00:00',
    //         trending: true,
    //         comments: [
    //             {
    //                 _id: 1,
    //                 author: {userName:'OrganicGuru'},
    //                 commentBody: 'Definitely sounds like powdery mildew. Mix 1 part milk with 9 parts water and spray it.',
    //                 updatedAt: '20h ago'
    //             }
    //         ]
    //     },

    // ]);

    const [threads, setThreads] = useState([]);
    const [diseaseInfo,setDiseaseInfo] = useState([]);

    const updateThread = (threadId, updatedThread) => {
        setThreads(prevThreads =>
            prevThreads.map(thread =>
                thread._id === threadId ? updatedThread : thread
            )
        );
    };

    useEffect(() => {
        const fetchThreads = async () => {
            try {
                const responseData = await axios.get(`${import.meta.env.VITE_BASE_URL_NODE}/api/v1/getallposts`,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                )
                setThreads(responseData.data?.allPosts)
            }
            catch (error) {
                console.log(error);
            }
        }

        const fetchDiseaseInfo = async () => {
            try{
                const responseData = await axios.get(
                    `${import.meta.env.VITE_BASE_URL_NODE}/api/v1/disease/getalldiseases`,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                );
                setDiseaseInfo(responseData.data?.responseData);
            }
            catch(error)
            {
                console.log(error);
            }
        }

        fetchThreads()
        fetchDiseaseInfo()
    }, [])

    const value = {
        image, setImage,
        plantData, setPlantData,
        translations,
        threads, setThreads,
        getRelativeTime,
        updateThread,
        diseaseInfo,setDiseaseInfo
    }

    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}

export default AppContextProvider;