//TODO add the getComment function and other necessary things that i cant think of atm
const Comment = require("../models/Comment");
const User = require("../models/User");
const Tweet = require("../models/Tweet");
const postComment = async (req, res) => {
  try {
    const body = req.body;
    const original_tweet = req.params.id
    const imageURLs = [];
    let imageAmount;
    if (!req.files) {
      imageAmount = 0;
    }
    else {
      req.files.map((e) => {
        imageURLs.push(e.path)
      })
    }
    imageAmount = imageURLs.length
    console.log(body, original_tweet, imageURLs, imageAmount)
    const comment = await Comment.create({
      Text: body.Text,
      postedBy: body.Author,
      OriginalTweet: original_tweet,
      image: imageURLs,
      imageAmount: imageAmount
    });
    if (comment) {
      console.log("comment posted ✅ , id = ", comment._id)
      const tweet = await Tweet.findOneAndUpdate(
        { _id: original_tweet },
        { $inc: { totalComments: 1 } }
      )
        .select("-image -imageAmount -LikedBy -postedBy")
        .exec();
        try {
          const user = await User.findOneAndUpdate(
            { _id: body.UserId },
            { $push: { Notifications: comment._id }, $inc: { NewNotifications: 1 } },
            { new: true }
          )
            .select(
              "-Image -Follower_list -Following_list"
            )
            .exec();
            if (user) {
              res.status(200).json({ success: true, data: comment });
            } else {
              res.status(400).json({ error: "Error posting comment", success: false });
            }
        } catch (error) {
          console.log(error)
          res.status(400).json({ error: error, success: false });
        }
     
      
    }
    else {
      res.status(400).json({ error: "Internal Server Error", success: false })
    }

  } catch (error) {
    res.status(400).json({ error: "Internal Server Error", success: false });
  }
};
const getComments = async (req, res) => {
  try {
    const id = req.params.id
    const limit = req.query.limit
    const skip = req.query.skip
    const comments = await Comment.find({ OriginalTweet: id }).limit(limit).skip(skip).populate("postedBy");
    if (comments) {
      res.status(200).json({ data: comments, success: true })
    }
    else {
      res.status(400).json({ success: false })
    }
  } catch (error) {
    res.status(400).json({ error: error, success: false })
  }
}
const getcomment = async(req,res)=>{
  try {
    const id = req.params.id
    const comment = await Comment.findOne({_id:id}).populate("postedBy")
    .select("-LikedBy")
    .exec();
    if(comment){
      res.status(200).json({data : comment, success : true})
    }
    else{
      res.status(400).json({error:"Internal Server Error",success:false})
    }
  } catch (error) {
      res.status(400).json({error:error,success:false})
  }
}
const fetchSingleUserComments = async(req,res)=>{
  try {
    const id = req.params.id;
    const limit = +req.query.limit || 5; // Default limit to 5 if not provided
    const skip = +req.query.skip || 0; // Default skip to 0 if not provided
    const Comments = await Comment.find({ postedBy: id }).limit(limit).skip(skip).populate("postedBy").exec()
    if (Comments) {
      res.status(200).json({ data: Comments, success: true });
    } else {
      res.status(404).json({ message: "User not found", success: false });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
}
module.exports = {
  postComment,
  getComments,
  getcomment,
  fetchSingleUserComments
};
