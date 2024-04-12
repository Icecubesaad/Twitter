const express=require('express');
const { GetUser, fetchSingleUser, fetchSingleUserLikes,fetchSingleUserTweets, fetchSingleUserFollowing, fetchSingleUserFollowers } = require('../../controller/auth');
const getUser=require('../../middleware/getUser')
const {getAllTweet,getTweet}=require('../../controller/tweet');
const { getComments, getcomment, fetchSingleUserComments } = require('../../controller/comment');
const { whoToFollow } = require('../../controller/action');
const router=express.Router();
router.get('/getUser',getUser,GetUser)
router.get('/getAllTweet',getAllTweet)
router.get('/getTweet/:id',getTweet)
router.get('/getComments/:id',getComments)
router.get('/getComment/:id',getcomment)
router.get('/getSingleUser/:id',fetchSingleUser)
router.get('/getSingleUserLikes/:id',fetchSingleUserLikes)
router.get('/getSingleUserFollowing/:id',fetchSingleUserFollowing)
router.get('/getSingleUserFollowers/:id',fetchSingleUserFollowers)
router.get('/getSingleUserTweets/:id',fetchSingleUserTweets)
router.get('/getSingleUserComments/:id',fetchSingleUserComments)
router.get('/whoToFollow',whoToFollow)
module.exports=router