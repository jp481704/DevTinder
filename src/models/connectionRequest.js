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


connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 }, { unique: true }); 

connectionRequestSchema.pre("save",function(){
   connectionRequestSchema.pre("save", function (next) {
  if (this.fromUserId.equals(this.toUserId)) {
    return next(new Error("Cannot send connection request to yourself"));
  }
  next();
});
});
const ConnectionRequestModel = new mongoose.model("ConnectionRequest",connectionRequestSchema);

module.exports = ConnectionRequestModel;