const bcrypt = require('bcrypt');
const UserModel = require('../Model/user');




//==================================================================
//                     Update User Profile

async function handleUpdatedUser (req, res) {

    if(req.body.password){
        req.body.password = await bcrypt.hash(req.body.password, 10)
    }


    try {
       const updatedUser = await UserModel.findByIdAndUpdate(req.params.id, {
        $set : req.body
       }, {new: true})

       res.status(200)
          .json(updatedUser)
    } 

    catch(err) {
        res.status(500)
           .json('Internal Server Error')
    }

}








//==================================================================
//                     Delete User Profile


async function handleDeletedUser (req, res) {
      
    try {
        
        const deletedUser = await UserModel.findByIdAndDelete(req.params.id)
        
        res.status(200).json({message: "This user deleted from database", deletedUser})
    }
    catch (err) {
        res.status(500)
           .json('Internal Server Error')
    }
}

















module.exports = {
    handleUpdatedUser,
    handleDeletedUser,
}