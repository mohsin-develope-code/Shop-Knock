const express = require("express");
const router = express.Router();
const UserModel = require('../Model/user')
const {checkAuth, checkAuthorization} = require('../Middleware/checkAuth')

const {handleUpdatedUser, handleDeletedUser} = require('../Controller/userController');




//Update User Profile
router.put('/:id' ,checkAuth,  handleUpdatedUser);



//Delete User Profile
router.delete('/:id' ,checkAuth,  handleDeletedUser);













//=====================================================================================
//                          ADMIN ROUTES




// Get User by Admin
router.get('/find/:id', checkAuthorization, async (req, res) => {

    try {

       const findUser = await UserModel.findById(req.params.id)
       res.status(200).json(findUser)

    } 
    catch (err) {
        res.status(500)
           .json('Internal Server Error')
    }
      
} )






// All Get User by Admin
router.get('/alluser', checkAuthorization, async (req, res) => {
    const query = req.query.new;

    try {

       const allUser = query? await UserModel.find().sort({_id: -1}).limit(1) : await UserModel.find()

    //    const allUser = await UserModel.find({})
       res.status(200).json(allUser)

    } 
    catch (err) {
        res.status(500)
           .json('Internal Server Error')
    }
      
} )








module.exports = router;