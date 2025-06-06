const express = require('express')
const router = express.Router()
const { createPost, getAllpost,postViewed } = require('../controllers/Post')
const {signup,login}=require('../controllers/Auth')
const { createComment } = require('../controllers/Comment')
const { auth } = require('../middleware/auth')
const { getAllDiseases, addDiseaseInfo } = require('../controllers/Disease')

router.post('/signup', signup)
router.post('/signin', login)
router.post('/createpost',auth, createPost)
router.post('/createcomment/:postId',auth, createComment)
router.post('/postviewed/:postId',postViewed)
router.post('/disease/adddiseaseinfo',addDiseaseInfo);

router.get('/getallposts', getAllpost);
router.get('/disease/getalldiseases',getAllDiseases);


module.exports = router