const mongoose=require('mongoose')
const connectDB=async()=>{
    try {
        const connection=await mongoose.connect(process.env.DATABASE_URL)
        if(connection){
            console.log("connected to database")
        }
        else{
            console.log("couldnt connect to database")
        }
    } catch (error) {
        console.log(error)
    }
}
module.exports=connectDB