

const getHome = (req,res)=>{
    res.send("Welcome To DeepItLabs2")
}

const createUser = (req, res) => {
    console.log(req.body);

    const {name,age} = req.body;

    if(!name){
        return res.status(400).json({
            success:false,
            message:"name is required"
        })
    }

    if(!age){
        return res.status(400).json({
            success:false,
            message:"age is required"
        })
    }

    if(age <= 0){
        return res.status(400).json({
            success:false,
            message:"Age must be greater than zero"
        })
    }


    res.status(201).json({
        success: true,
        message: "User Received Data Successfully",
        data: req.body
    });
};

module.exports = {
    getHome,
    createUser
}