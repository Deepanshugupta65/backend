import mongoose,{Schema} from "mongoose";
import jwt from "json-web-token"
import bcrypt from "bcrypt"
const userSchema = new Schema(
    {
       username:{
        type :String,
        required:true,
        unique:true,
        lowecase:true,
        trim:true,
        index :true
       },
       email:{
        type :String,
        required:true,
        unique:true,
        lowecase:true,
        trim:true,
       },
       fullName:{
        type :String,
        required:true,
        trim:true,
        index:true
       },
       avatar:{
        type :String, // cloud 
        required:true,
       },
       coverImage:{
        type:String,
       },
       watchHistory:[
        {
            type:Schema.Types.ObjectId,
            ref:"Video"
        }
       ],
       password:{
        type:String,
        required:[true,'password is required']
       },
       refreshToken:{
        type:String
       }
    },
    {
        timestamps:true
    } 
)
// mongoose plugins 30:00 password save
userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next();

    this.password =await bcrypt.hash(this.password,10)
    next()
})
// password check its return true value
userSchema.methods.isPasswordCorrect = async function(password){
     return await bcrypt.compare(password,this.password)
}
userSchema.methods.generateAccessToken = function(){
   return jwt.sign({
        _id:this._id,
        email:this.email,
        username:this.username,
        fullName:this.fullName
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
    expiresIn:process.env.ACCESS_TOKEN_EXPIRY    
    }
    )
}
 
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign({
         _id:this._id,
         
     },
     process.env.REFRESH_TOKEN_SECRET,
     {
     expiresIn:process.env.REFRESH_TOKEN_EXPIRY    
     }
     )
 }
export const User = mongoose.model("User",userSchema)