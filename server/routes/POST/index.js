const express=require('express')
const router=express.Router();
const { storage } = require('../../storage/storage');
const multer = require('multer');
const upload = multer({ storage });
const uploadTweet=multer({storage,
    limits: { 
        fileSize: 5 * 1024 * 1024, // 5 MB limit per file
        files: 4 // Maximum number of files allowed
      }})
const {Register,Login, checkUser, checkusername,uploadImage}=require('../../controller/auth')
const {postTweet}=require('../../controller/tweet')
const  {postComment}=require('../../controller/comment')
const {Like, Follow} =require('../../controller/action');
const { updatePassword, updateUsername, updateBio, updateProfilePic, updateBanner } = require('../../controller/update');
router.post('/checkUser',checkUser)
router.post('/checkusername',checkusername)
router.post('/register',upload.single("Image"),Register);
router.post('/login',Login)
router.post('/tweet',uploadTweet.array("Image"),postTweet)
router.post('/comment/:id',uploadTweet.array("Image"),postComment)
router.post('/like/:id/:type',Like)
router.post('/follow/:id/:follow',Follow)
router.post('/updatePassword/:id',updatePassword)
router.post('/updateUsername/:id',updateUsername)
router.post('/updateBio/:id',updateBio)
router.post('/updateProfilePic/:id',upload.single("Image"),updateProfilePic)
router.post('/updateBanner/:id',upload.single("Image"),updateBanner)
module.exports=router