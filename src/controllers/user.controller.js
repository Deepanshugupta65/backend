import {asyncHandler} from "../utils/asyncHandler"

const registerUser = asyncHandler(async (req,res) =>{
    res.Status(200).json({
        message:"ok"
    })
})


export {registerUser}