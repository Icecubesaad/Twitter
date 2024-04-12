const {Schema, default: mongoose} = require("mongoose");
const Tweet = new Schema({
  Text: {
    type: String,
    require: true,
  },
  Likes: {
    type: Number,
    default:0
  },
  image: {
    type: Array,
    default:null
  },
  postedBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  imageAmount: {
    type: Number,
    default:0
  },
  totalComments:{
    type:Schema.Types.Number,
    default:0
  }
});
const Tweet_model = mongoose.models.tweet || mongoose.model("Tweet", Tweet);
module.exports= Tweet_model;
