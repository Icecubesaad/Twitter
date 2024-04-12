const jwt=require('jsonwebtoken')
const getUser=async(req,res,next)=>{
    try {
        const token=req.headers['token'];
        if(!token){
            res.status(401).json({message:"No token provided"})
        }
        else{
            const verify=await jwt.verify(token,process.env.SECRET)
            if(verify){
                req.user=verify
                next()
            }
            else{
                res.status(400).json({message:"error"})
            }
        }
    } catch (error) {
        res.status(400).json({error:error})
    }
}
module.exports=getUser