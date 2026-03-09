const mongoose=require("mongoose");
const bcrypt=require("bcryptjs");    
const userSchema=new mongoose.Schema({

    email:{
        type:String,
        required:[true,"email is required for creating a user"],
        trim:true,
        lowercase:true,
        match:[/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,"Please provide a valid email address"],
        unique:[true,"Email already exists, please use a different email address"]
    },
    name:{
        type:String,
        required:[true,"Name is required for creating a user"],
        trim:true
    },
    password:{
        type:String,
        required:[true,"Password is required for creating a user"],
        minlength:[6,"Password must be at least 6 characters long"],
        select:false
    }
},{
    timestamps:true
})
userSchema.pre("save",async function(){

if(!this.isModified("password")){
    return ;
}
const hash =await bcrypt.hash(this.password,10);
 this.password=hash;
 return ;

})
userSchema.methods.comparePassword=async function(password){
    return await bcrypt.compare(password,this.password);
    
}
const userModel=mongoose.model("User",userSchema);
module.exports=userModel;