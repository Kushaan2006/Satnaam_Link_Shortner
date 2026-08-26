import { userLogin, userSignUp } from "../services/authService.js";

export const signUpController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const res = await userSignUp(name, email, password);
    return res.status(201).json(res);
  } catch (error) {
    console.error(`Signup Failed ;-; - ${error}`);
    return res.status(400).json({ message: error.message });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const res = await userLogin(email, password);
    return res.status(200).json(res);
  } catch (error) {
    console.error(`Login Failed ;-; - ${error}`);
    return res.status(400).json({ message: error.message });
  }
};
