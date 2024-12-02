const UserModel = require("../Model/user");
const bcrypt = require("bcrypt");
const { setUserToken } = require("../Utils/jwt");

async function handleUserSignup(req, res) {
  try {
    const { firstName, lastName, phone, email, password } = req.body;

    const userCheck = await UserModel.findOne({ email });
    if (userCheck) {
      return res.json({ message: "User Already Exist", status: false });
    }

    const user = new UserModel({ firstName, lastName, phone, email, password });
    user.password = await bcrypt.hash(password, 10);
    await user.save();

    res.status(201).json({ message: "Sign up Successfully", status: true });
  } catch (error) {
    res.status(500).json({ message: "Internel Server Error" });
  }
}

async function handleUserLogin(req, res) {
  try {
    const { email, password } = req.body;

    const userCheck = await UserModel.findOne({ email });
    if (!userCheck) {
      return res
        .status(400)
        .json({ message: "Invalid User Details", status: false });
    }

    const isPassEqual = await bcrypt.compare(password, userCheck.password);
    if (!isPassEqual) {
      return res
        .status(400)
        .json({ message: "Incorrect Password", status: false });
    }

    const token = setUserToken(userCheck);
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "Lax",
      path: "/",
    });

    res
      .status(200)
      .json({ message: "Login Successfully", status: true, token: token });
  } catch (error) {
    res.status(500).json({ message: "Internel Server Error" });
  }
}

async function handleUserLogout(req, res) {
  res.status(200).json({ message: "user logout", status: true });
}

module.exports = {
  handleUserSignup,
  handleUserLogin,
  handleUserLogout,
};
