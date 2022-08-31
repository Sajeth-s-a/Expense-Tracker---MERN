const mongoose = require("mongoose")

const expenses = new mongoose.Schema(
    {
        name : {
            type : String,
            require : true,
            unique : true,
        },
        amount : {
            type : Number,
            require : true,
        },
        createdAt : {
            type : Date,
            default : Date.now
        }

},
{collection:"user-expenses"}
)

mongoose.model("user-expenses",expenses)