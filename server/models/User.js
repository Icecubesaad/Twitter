const {Schema, default: mongoose} = require("mongoose");
const UserSchema = new Schema({
  Username: {
    type: Schema.Types.String,
    require: true,
  },
  Usertag: {
    type: Schema.Types.String,
    require: true,
    unqiue: true,
  },
  Email: {
    type: Schema.Types.String,
    require: true,
    unique: true,
    validate: {
      validator: function (v) {
        // Regular expression for validating email format
        return /\S+@\S+\.\S+/.test(v);
      },
      message: (props) => `${props.value} is not a valid email address!`,
    },
    index: {unique: true, dropDups: true}
  },
  Image: {
    type: Schema.Types.String,
  },
  Password: {
    type: Schema.Types.String,
    require: true,
  },
  BioText:{
    type:Schema.Types.String,
    default:null
  },
  Bookmarks:[
    {
      type: Schema.Types.ObjectId,
      ref: "Tweet",
      default: null
    }
  ],
  Like_list: [
    {
      type: Schema.Types.ObjectId,
      ref: "Tweet",
      default: null
    }
  ],
  Followers: {
    type: Schema.Types.Number,
    default:0
  },
  Following: {
    type: Schema.Types.Number,
    default:0
  },
  Follower_list: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
      default:null
    },
  ],
  Following_list: [{
    type: Schema.Types.ObjectId,
    ref:"User"
  }],
  Total_tweets: {
    type: Schema.Types.Number,
    default:0
  },
  NewNotifications: {
    type: Schema.Types.Number,
    default:0
  },
  Notifications: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment",
      default:null
    },
  ],
  Total_likes:{
    type:Schema.Types.Number,
    default:0
  }
});
const User_model = mongoose.models.User || mongoose.model("User", UserSchema);
module.exports= User_model;
