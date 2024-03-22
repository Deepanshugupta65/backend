import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/users.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponses.js"
const registerUser = asyncHandler(async (req,res) =>{
    // res.status(200).json({
    //     message:"ok"
    // })

    // get user detail from frontend 
    // validation - not empty
    // check if user already exsit by username or email
    //  check img and avatar
    // upload them into cloudinary , avatar
    // create user object - creation entry in db
    // remove password and refresh token field from response
    // check for user creation
    //  return res
   
   const{fullname,email,username,password} =  req.body
    //  testing
    //  console.log("email:",email);
    if(
        [fullname,email,username,password].some((field)=>
        field?.trim()==="")
    ){
        throw new ApiError(400,"all fields are required")
    }

   const existedUser =  User.findOne({
        $or:[{username},{email}]
    })
    if(existedUser){
        throw new ApiError(409,"User with email or username alreay exist")
    }
   const avatarLoacalPath= req.files?.avatar[0] ?.path;
   const coverImageLocalPath = req.files?.coverImage[0] ?.
   path;
   if(!avatarLoacalPath){
    throw new ApiError(400,"Avatar file is required")
   }
  const avatar = await uploadOnCloudinary(avatarLoacalPath)
  const coverImage= await uploadOnCloudinary(coverImageLocalPath)

  if(!avatar){
    throw new ApiError(400,"avatar file is required")
  }
 const user = await User.create({
    fullname,
    avatar:avatar.url,
    coverImage:coverImage?.url || "",
    email,
    password,
    username:username.toLowerCase()
  })
  const createdUser  = await User.findById(user._id).select(
    "-password -refreshToken"
  )
  if(!createdUser){
    throw new ApiError(500,"something went wroong while regis the user")
  }
   return res.status(201).json(
    new ApiResponse(200,createdUser,"user registered successfully")
   )
})


export {
    registerUser,
}