const mongoose = require("mongoose");


const connectionRequestSchema = new mongoose.Schema({
    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
        
    },
      toUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
        
    },
    status:{
        type:String,
        enum:["ignore","interested","accepted","rejected"],
        message:"{VALUE} is not a valid status",
        required:true
        
    }
},{
    timestamps:true
});


const ConnectionRequestModel = new mongoose.model("ConnectionRequest",connectionRequestSchema);

module.exports = ConnectionRequestModel;