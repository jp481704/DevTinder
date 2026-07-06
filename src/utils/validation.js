const validator = require("validator");

const validateSignUpData = (req, res) => {
  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("firstName and lastName are required");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("email is not valid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("password is not strong");
  }
};


const validateEditProfileData=(req)=>{
const {firstName,lastName,about,gender}=req.body;


  const allowedUpdates = [
      "firstName",
      "lastName",
      "emailId",
      "userId",
      "photoUrl",
      "about",
      "skills",
      "age",
      "gender",
    ];

    const isUpdateAllowed = Object.keys(req.body).every((update) =>
      allowedUpdates.includes(update),
    );

    return isUpdateAllowed;
}

module.exports = { validateSignUpData,validateEditProfileData };
