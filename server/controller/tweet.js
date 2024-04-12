const Tweet = require("../models/Tweet");
const postTweet = async (req, res) => {
  try {
    const body = req.body;
    const imageURLs=[];
    let imageAmount;
    if(!req.files){
      imageAmount=0;
    }
    else{
      req.files.map((e)=>{
        imageURLs.push(e.path)
      })
    }
    imageAmount=imageURLs.length
    const tweet = await Tweet.create({
      Text: body.Text,
      postedBy: body.Author,
      image:imageURLs,
      imageAmount:imageAmount
    });
    if (tweet) {
      res.status(200).json({ data: tweet,success: true });
    } else {
      res.status(400).json({ message: "Internal server error",success: false });
    }
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: error,success: false });
  }
};
//  get a specific tweet
const getTweet = async (req, res) => {
  try {
    const id=req.params.id
    const tweet = await Tweet.findById(id)
      .populate("postedBy")
      .select("-LikedBy")
      .exec();
    if (tweet) {
      res.status(200).json({data:tweet,success: true});
    } else {
      res.status(400).json({ message: "Internal Server Error",success: false });
    }
  } catch (error) {
    res.status(400).json({ error: error,success: false });
  }
};
const getAllTweet = async (req, res) => {
  try {
    const limit = req.query.limit;
    const skip = req.query.skip;
    const tweets = await Tweet.find().limit(limit).skip(skip).select("-LikedBy").populate("postedBy");
    if (tweets) {
      res.status(200).json({data:tweets,success: true});
    } else {
      res.status(400).json({ message: "Internal Server Error",success: false });
    }
  } catch (error) {
    res.status(400).json({ error: error,success: false });
  }
};
// const getComments=async(req,res)=>{
//     try {
//         const limit = req.query.limit;
//         const skip = req.query.skip;
//         const tweets = await Tweet.find().limit(limit).skip(skip).select("-Comments -LikedBy");
//         if (tweets) {
//           res.status(200).json(tweets);
//         } else {
//           res.status(400).json({ message: "Internal Server Error" });
//         }
//       } catch (error) {
//         res.status(400).json({ error: error });
//       }
// }
module.exports = {
  postTweet,
  getTweet,
  getAllTweet,
};
