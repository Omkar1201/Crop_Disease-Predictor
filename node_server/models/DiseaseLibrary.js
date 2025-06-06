const mongoose = require('mongoose');

const DiseaseLibrarySchema = new mongoose.Schema({
    diseaseName: {
        type: String,
        required: true,
        trim: true
    },
    plantName: {
        type: String,
        required: true,
        trim: true
    },
    causes: [{
        type: String,
        trim: true
    }],
    symptoms: [{
        type: String,
        required: true,
        trim: true
    }],
    preventions: [{
        type: String,
        trim: true
    }],
    images: [{
        type: String
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Case-insensitive compound index for duplicate prevention
DiseaseLibrarySchema.index(
    { diseaseName: 1, plantName: 1 },
    { unique: true, collation: { locale: 'en', strength: 2 } }
);

module.exports = mongoose.model('DiseaseLibrary', DiseaseLibrarySchema);