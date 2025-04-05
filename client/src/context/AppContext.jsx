import { createContext, useState } from "react";


export const AppContext = createContext();

function AppContextProvider({ children }) {
    const [image, setImage] = useState('');
    const [plantData, setPlantData] = useState({
        diseaseName: '',
        plantName: '',
        causes: '',
        symptoms: '',
        cure: '',
    })
    const translations = {
        en: {
            plantName: "Plant Name",
            diseaseName: "Disease Name",
            causes: "Causes of Disease",
            symptoms: "Symptoms of Disease",
            cure: "Cure of Disease",
            noText: "No text found!",
            download: "Download PDF"
        },
        mr: {
            plantName: "वनस्पतीचे नाव",
            diseaseName: "रोगाचे नाव",
            causes: "रोगाची कारणे",
            symptoms: "रोगाची लक्षणे",
            cure: "रोगाचा उपचार",
            noText: "माहिती आढळली नाही!",
            download: "पीडीएफ डाउनलोड करा"
        },
        hi: {
            plantName: "पौधे का नाम",
            diseaseName: "रोग का नाम",
            causes: "रोग के कारण",
            symptoms: "रोग के लक्षण",
            cure: "रोग का इलाज",
            noText: "कोई पाठ नहीं मिला!",
            download: "पीडीएफ डाउनलोड करें"
        },
        gu: {
            plantName: "વનસ્પતિનું નામ",
            diseaseName: "રોગનું નામ",
            causes: "રોગના કારણો",
            symptoms: "રોગના લક્ષણો",
            cure: "રોગનો ઈલાજ",
            noText: "કોઈ લખાણ મળ્યું નથી!",
            download: "PDF ડાઉનલોડ કરો"
        },
        bn: {
            plantName: "গাছের নাম",
            diseaseName: "রোগের নাম",
            causes: "রোগের কারণ",
            symptoms: "রোগের লক্ষণ",
            cure: "রোগের চিকিৎসা",
            noText: "কোনো লেখা পাওয়া যায়নি!",
            download: "পিডিএফ ডাউনলোড করুন"
        },
        ta: {
            plantName: "சரகத்தின் பெயர்",
            diseaseName: "நோயின் பெயர்",
            causes: "நோயின் காரணங்கள்",
            symptoms: "நோயின் அறிகுறிகள்",
            cure: "நோயின் சிகிச்சை",
            noText: "எழுத்து காணவில்லை!",
            download: "PDF பதிவிறக்கவும்"
        },
        te: {
            plantName: "చెట్టు పేరు",
            diseaseName: "రోగం పేరు",
            causes: "రోగం కారణాలు",
            symptoms: "రోగం లక్షణాలు",
            cure: "రోగం చికిత్స",
            noText: "పాఠ్యం కనబడలేదు!",
            download: "పిడిఎఫ్ డౌన్లోడ్ చేయండి"
        },
        kn: {
            plantName: "ಸಸ್ಯದ ಹೆಸರು",
            diseaseName: "ರೋಗದ ಹೆಸರು",
            causes: "ರೋಗದ ಕಾರಣಗಳು",
            symptoms: "ರೋಗದ ಲಕ್ಷಣಗಳು",
            cure: "ರೋಗದ ಚಿಕಿತ್ಸೆಯು",
            noText: "ಪಠ್ಯ ದೊರಕಿಲ್ಲ!",
            download: "ಪಿಡಿಎಫ್ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ"
        },
        ml: {
            plantName: "ചെടിയുടെ പേര്",
            diseaseName: "രോഗത്തിന്റെ പേര്",
            causes: "രോഗത്തിന്റെ കാരണങ്ങൾ",
            symptoms: "രോഗത്തിന്റെ ലക്ഷണങ്ങൾ",
            cure: "രോഗം ചികിത്സ",
            noText: "പാഠം ലഭ്യമല്ല!",
            download: "PDF ഡൗൺലോഡ് ചെയ്യുക"
        },
        pa: {
            plantName: "ਪੌਦੇ ਦਾ ਨਾਮ",
            diseaseName: "ਬਿਮਾਰੀ ਦਾ ਨਾਮ",
            causes: "ਬਿਮਾਰੀ ਦੇ ਕਾਰਨ",
            symptoms: "ਬਿਮਾਰੀ ਦੇ ਲੱਛਣ",
            cure: "ਬਿਮਾਰੀ ਦਾ ਇਲਾਜ",
            noText: "ਕੋਈ ਪਾਠ ਨਹੀਂ ਮਿਲਿਆ!",
            download: "PDF ਡਾਊਨਲੋਡ ਕਰੋ"
        }
    };
    
    const value = {
        image, setImage,
        plantData, setPlantData,
        translations
    }

    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}

export default AppContextProvider;