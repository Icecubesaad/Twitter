//TODO OTP Integration
const Users = require("../models/User");
const bcrypt = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");
const Tweets =  require('../models/Tweet')
const Register = async (req, res) => {
  try {
    const body = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashed_password = await bcrypt.hash(body.Password, salt);
    const imageURL=req.file.path
    const user_created = await Users.create({
      Email: body.Email,
      Password: hashed_password,
      Username: body.Username,
      Usertag: body.Username,
      Image:imageURL
    });
    if (user_created) {
      res.status(200).json({ success: true });
    }
  } catch (error) {
    res.status(400).json({ error: error, success: false });
  }
};
const Login = async (req, res) => {
  try {
    const body = req.body;
    const requested_account = await Users.findOne({ Email: body.Email });
    if (requested_account) {
      const compare = await bcrypt.compare(
        body.Password,
        requested_account.Password
      );
      if (compare) {
        const token = jsonwebtoken.sign(
          { id: requested_account._id },
          process.env.SECRET,
          { expiresIn: "24h" }
        );
        res.cookie("token", token, { maxAge: 86400000 });
        res.status(200).json({ success: true, data: requested_account });
      } else {
        res
          .status(400)
          .json({
            message: "Login and Password arent correct",
            success: false,
          });
      }
    } else {
      res
        .status(400)
        .json({ message: "Login and Password arent correct", success: false });
    }
  } catch (error) {
    res.status(400).json({ message: error, success: false });
  }
};
const GetUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const user_account = await Users.findById(userId)
      .select("-Password")
      .exec();
    if (user_account) {
      res.status(200).json({ data: user_account, success: true });
    } else {
      res.status(400).json({ error: "Internal server error", success: false });
    }
  } catch (error) {
    res.status(400).json({ error: error, success: false });
  }
};
const checkUser = async (req, res) => {
  try {
    const body = req.body;
    const already_exist = await Users.findOne({ Email: body.Email }).select(
      "-Image -NewNotifications -Notifications -Total_tweets -Totla_likes -Following_list -Follower_list -Followers -Following -Like_list  -Password"
    );
    if (already_exist) {
      res.status(200).json({ success: true });
    } else {
      res.status(200).json({ success: false });
    }
  } catch (error) {
    res.status(400).json({ error: error,success: false });
  }
};
const checkusername = async (req, res) => {
  try {
    const body = req.body;
    const already_exist = await Users.findOne({
      Username: body.Username,
    }).select(
      "-Image -NewNotifications -Notifications -Total_tweets -Total_likes -Following_list -Follower_list -Followers -Following -Like_list  -Password"
    );
    if (already_exist) {
      res.status(200).json({ success: true });
    } else {
      res.status(200).json({ success: false });
    }
  } catch (error) {
    res.status(400).json({ error: error,success: false });
  }
};
const fetchSingleUser = async(req,res)=>{
  try {
    const id = req.params.id
    const user = await Users.findOne({_id:id}).select("-Like_list -Following_list -Follower_list").exec()
    if(user){
      res.status(200).json({success:true,data:user})
    }
    else{
      res.status(400).json({success:false})
    }
  } catch (error) {
    res.status(400).json({success:false,error:error})
  }

}
const fetchSingleUserLikes = async (req, res) => {
  try {
    const id = req.params.id;
    const limit = +req.query.limit || 5; // Default limit to 5 if not provided
    const skip = +req.query.skip || 0; // Default skip to 0 if not provided

    const user = await Users.findOne({ _id: id })
      .populate({
        path: 'Like_list',
        options: { limit, skip },
        populate: {
          path: 'postedBy', // Assuming 'postedBy' is the field to populate
          model: 'User' // Assuming 'User' is the model to populate from
        }
      })
      .exec();

    if (user) {
      res.status(200).json({ data: user.Like_list, success: true });
    } else {
      res.status(404).json({ message: "User not found", success: false });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};


const fetchSingleUserFollowers = async(req,res)=>{
  try {
    const id = req.params.id;
    const limit = +req.query.limit || 5; // Default limit to 5 if not provided
    const skip = +req.query.skip || 0; // Default skip to 0 if not provided
    console.log(id,limit,skip)
    const user = await Users.findOne({ _id: id })
      .populate({ path: "Follower_list", options: { limit: limit, skip: skip } });

    if (user) {
      console.log(user)
      res.status(200).json({ data: user.Follower_list, success: true });
    } else {
      res.status(404).json({ message: "User not found", success: false });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
}
const fetchSingleUserFollowing = async(req,res)=>{
  try {
    const id = req.params.id;
    const limit = +req.query.limit || 5; // Default limit to 5 if not provided
    const skip = +req.query.skip || 0; // Default skip to 0 if not provided

    const user = await Users.findOne({ _id: id })
      .populate({ path: "Following_list", options: { limit: limit, skip: skip } });

    if (user) {
      res.status(200).json({ data: user.Following_list, success: true });
    } else {
      res.status(404).json({ message: "User not found", success: false });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
}
const fetchSingleUserTweets = async(req,res)=>{
  try {
    const id = req.params.id;
    const limit = +req.query.limit || 5; // Default limit to 5 if not provided
    const skip = +req.query.skip || 0; // Default skip to 0 if not provided
    console.log(id,skip,limit)
    const tweets = await Tweets.find({ postedBy: id }).limit(limit).skip(skip).populate("postedBy").exec()
    if (tweets) {
      res.status(200).json({ data: tweets, success: true });
    } else {
      res.status(404).json({ message: "User not found", success: false });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
}
module.exports = {
  Register,
  Login,
  GetUser,
  checkUser,
  checkusername,
  fetchSingleUser,
  fetchSingleUserFollowers,
  fetchSingleUserLikes,
  fetchSingleUserFollowing,
  fetchSingleUserTweets
};
