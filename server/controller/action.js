//TODO test it-
const User = require('../models/User')
const Tweet = require('../models/Tweet')
const Comment = require('../models/Comment')
const Like = async (req, res) => {
    try {
        const body = req.body
        const type = req.params.type
        const id = req.params.id
        console.log(id, type, body)
        if (type === 'c') {
            // increasing  the likes of comment
            const comment = await Comment.findOneAndUpdate({ _id: id }, { $inc: { Likes: 1 } }, { new: true }).select("-Text -Comments -image -imageAmount").exec();
            // add this liked tweet in the liked list of the user that liked it
            const user = await User.findOneAndUpdate({ _id: body.userId }, { $push: { Like_list: id }, $inc: { Total_likes: 1 } }, { new: true }).select("-Email -Password -Image -Following -Followers -Follower_list -Following_list -NewNotifications -Notifications -Username").exec()
            // pushing notifications to the author of comment
            const author = await User.findOneAndUpdate({ _id: body.author }, { $push: { Notifications: id }, $inc: { NewNotifications: 1 } }).select("-Email -Password -Image -Following -Followers -Follower_list -Following_list -NewNotifications -Notifications -Username").exec()
            if (user && author && comment) {
                res.status(200).json({ success: true })
            }
            else {
                res.status(400).json({ error: "Internal server error", success: false })
            }
        }
        if (type == 't') {
            // increasing  the likes of tweet
            const tweet = await Tweet.findOneAndUpdate({ _id: id }, { $inc: { Likes: 1 } }, { new: true }).select("-Text -Comments -image -imageAmount").exec();
            // add this liked tweet in the liked list of the user that liked it
            const user = await User.findOneAndUpdate({ _id: body.userId }, { $push: { Like_list: id }, $inc: { Total_likes: 1 } }, { new: true }).select("-Email -Password -Image -Following -Followers -Follower_list -Following_list -NewNotifications -Notifications -Username").exec()
            // pushing notifications to the author of tweet
            const author = await User.findOneAndUpdate({ _id: body.author }, { $push: { Notifications: id }, $inc: { NewNotifications: 1 } }).select("-Email -Password -Image -Following -Followers -Follower_list -Following_list -NewNotifications -Notifications -Username").exec()
            if (tweet) {
                console.log('tweet ✅')
                if (user) {
                    console.log('user ✅')
                    if (author) {
                        res.status(200).json({ success: true })
                    }
                }
            }
            // if(user&&author&&tweet){
            //     res.status(200).json({success: true})
            // }
            else {
                res.status(400).json({ error: "Internal server error", success: false })
            }
        }
    } catch (error) {
        res.status(400).json({ error: error, success: false })
    }

}
const Follow = async (req, res) => {
    try {
        const id = req.params.id    // id of the user that followed the other user
        const Followed_id = req.params.follow // id of the user that got followed
        const user = await User.findOneAndUpdate({ _id: id }, { $inc: { Following: 1 }, $push: { Following_list: Followed_id } })
        const followed_user = await User.findOneAndUpdate({ _id: Followed_id }, { $inc: { Followers: 1 }, $push: { Follower_list: id } })
        if (user && followed_user) {
            res.status(200).json({ success: true })
        }
        else {
            res.status(400).json({ success: false })
        }
    } catch (error) {
        res.status(400).json({ error: error, success: false })
    }
}
const whoToFollow = async(req,res)=>{
    // implement according to user interest
    try {
        const users = await User.aggregate([{ $sample: { size: 3 } }])
        if(users){
            res.status(200).json({data:users,success:true})
        }
        else{
            res.status(400).json({success:false})
        }
        
    } catch (error) {
        res.status(400).json({error:error,success:false})
    }
}
module.exports = {
    Like,
    Follow,
    whoToFollow
}