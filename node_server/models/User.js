const mongoose=require('mongoose')

const Userschema=new mongoose.Schema(
    {
        fullName:{
            type:String,
            required:true
        },
        userName:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true
        },

    }
)
module.exports=mongoose.model("User",Userschema)