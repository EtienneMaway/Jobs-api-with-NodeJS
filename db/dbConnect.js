const mongoose  = require("mongoose")

const connectDb = async (url) => {
    try{
        await mongoose.connect(url, 
            {
                useUnifiedTopology:true,
                useNewUrlParser: true
            }
        )
    }catch(err){
        console.log(err)
    }
    
}

module.exports = connectDb