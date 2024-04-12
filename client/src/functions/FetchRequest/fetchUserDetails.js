
const fetchUserDetails=async(token)=>{
    const request=await fetch("/api/get/getUser",{
        method:"GET",
        headers:{
            "token":token
        }
    })
    const response=await request.json()
    console.log(response,"from somehw")
    return response
}
export default fetchUserDetails