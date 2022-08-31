const mongoose = require("mongoose")

const user = new mongoose.Schema(
    {
        name : {
            type : String,
            require : true,
        },
        email : {
            type : String,
            require : true,
            unique : true,
        },
        password : {
            type : String,
            require : true,
        },

},
{collection:"user-Details"}
)

mongoose.model("user-Details",user)