const mongoose = require("mongoose");

//connect to database
const connnect = async () => {
    try {
        await mongoose.connect(
            `mongodb+srv://mtuong669:tkpm_123456@hotel-hcmus.jkv9s1x.mongodb.net/?retryWrites=true&w=majority`
        );
        console.log("connnect db sucessfully");
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
};

module.exports = { connnect };
