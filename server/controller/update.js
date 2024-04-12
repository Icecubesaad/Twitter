const User = require("../models/User")
const updateUsername = async(req,res)=>{
    try {
        const id = req.params.id
        const {name} = req.body
        const UserToUpdate = await User.findOneAndUpdate(id,{$set:{Username:name}}).select("-Email -Password -Image -Following -Followers -Follower_list -Following_list -NewNotifications -Notifications").exec()
        if(UserToUpdate){
            res.status(200).json({success:true,data : UserToUpdate})
        }
        else{
            res.status(400).json({success:false})
        }
    } catch (error) {
        res.status(400).json({success:false,error:error})
    }
}
const updateBio = async(req,res)=>{
    try {
        const id = req.params.id
        const {bio} = req.body
        const UserToUpdate = await User.findOneAndUpdate(id,{$set:{BioText:bio}}).select("-Email -Password -Image -Following -Followers -Follower_list -Following_list -NewNotifications -Notifications").exec()
        if(UserToUpdate){
            res.status(200).json({success:true,data : UserToUpdate})
        }
        else{
            res.status(400).json({success:false})
        }
    } catch (error) {
        res.status(400).json({success:false,error:error})
    }
}
const updateBanner = async(req,res)=>{
    try {
        const id = req.params.id
        const {banner} = req.body
        const UserToUpdate = await User.findOneAndUpdate(id,{$set:{Username:name}}).select("-Email -Password -Image -Following -Followers -Follower_list -Following_list -NewNotifications -Notifications").exec()
        if(UserToUpdate){
            res.status(200).json({success:true,data : UserToUpdate})
        }
        else{
            res.status(400).json({success:false})
        }
    } catch (error) {
        res.status(400).json({success:false,error:error})
    }
}
const updateProfilePic = async(req,res)=>{
    try {
        const id = req.params.id
        const {name} = req.body
        const UserToUpdate = await User.findOneAndUpdate(id,{$set:{Username:name}}).select("-Email -Password -Image -Following -Followers -Follower_list -Following_list -NewNotifications -Notifications").exec()
        if(UserToUpdate){
            res.status(200).json({success:true,data : UserToUpdate})
        }
        else{
            res.status(400).json({success:false})
        }
    } catch (error) {
        res.status(400).json({success:false,error:error})
    }
}
const updatePassword = async(req,res)=>{
    try {
        const id = req.params.id
        const {password} = req.body
        const UserToUpdate = await User.findOneAndUpdate(id,{$set:{Password:password}}).select("-Email  -Image -Following -Followers -Follower_list -Following_list -NewNotifications -Notifications").exec()
        if(UserToUpdate){
            res.status(200).json({success:true,data : UserToUpdate})
        }
        else{
            res.status(400).json({success:false})
        }
    } catch (error) {
        res.status(400).json({success:false,error:error})
    }
}
module.exports = {
    updateUsername,
    updateBio,
    updateBanner,
    updateProfilePic,
    updatePassword
}