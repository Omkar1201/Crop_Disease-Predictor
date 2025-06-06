const DiseaseLibrary = require('../models/DiseaseLibrary')

const getAllDiseases = async (req, res) => {

    try {
        const responseData = await DiseaseLibrary.find({});
        return res.status(200).json({
            success: true,
            responseData,
            message: "Disease Data retrived succesfully!"
        })
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
const addDiseaseInfo = async (req, res) => {
    try {
        const { diseaseName, plantName, cause, symptoms, prevention, images } = req.body;

        console.log("diseasename: ", diseaseName);
        console.log("plantname: ", plantName);
        console.log("cause: ", cause);
        console.log("symptoms: ", symptoms);
        console.log("prevention: ", prevention);
        console.log("images: ", images);
        return;
        // Check if the disease already exists in the database (case-insensitive)
        const existingDisease = await DiseaseLibrary.findOne({
            diseaseName: { $regex: new RegExp('^' + diseaseName + '$', 'i') },
            plantName: { $regex: new RegExp('^' + plantName + '$', 'i') }
        });

        if (existingDisease) {
            return res.status(400).json({
                success: false,
                message: "Disease data already exists in the database!"
            });
        }

        await DiseaseLibrary.create({
            diseaseName,
            plantName,
            cause,
            symptoms,
            prevention,
            images
        });

        return res.status(200).json({
            success: true,
            message: "Disease Data added successfully!"
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = { getAllDiseases, addDiseaseInfo }