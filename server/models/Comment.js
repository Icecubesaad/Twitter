const {Schema, default: mongoose} = require("mongoose");
const Tweet_comment = new Schema({
    Text:{
        type : String,
        require : true
    }
    ,
    Likes:{
        type:Number,
        default:0
    }
    ,
    image:{
        type : Array,
        default:null
    },
    postedBy:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
    ,
    imageAmount:{
        type:Number,
        default:0
    },
    OriginalTweet:{
        type:Schema.Types.ObjectId
        ,
        ref: "Tweet"
    },
    Comments:{
        type:Number,
        default:0
    }
})
const Tweet_comments_model = mongoose.models.comment || mongoose.model('Comment',Tweet_comment)
module.exports= Tweet_comments_model