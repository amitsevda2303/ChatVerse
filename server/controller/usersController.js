const User = require("../Model/userModal");
const bcrypt = require("bcrypt")


module.exports.register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const usernameCheck = await User.findOne({ username });
        if (usernameCheck) {
            return res.json({ message: "Username already taken", status: false });
        }

        const emailCheck = await User.findOne({ email });
        if (emailCheck) {
            return res.json({ message: "Email already taken", status: false });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            username: username,
            email: email,
            password: hashedPassword
        })
        delete user.password
        return res.json({ status: true, user })
    }
    catch (ex) {
        next(ex)
    }
}



module.exports.login = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username: username });
        if (!user) {
            return res.json({ message: "Incorrect Credentials", status: false});
        }

        const ispasswordValid = await bcrypt.compare(password, user.password);
        if (!ispasswordValid) {
            return res.json({ message: "Incorrect Credentials", status: false  });
        }
        delete user.password
        return res.json({ status: true, user })
    }
    catch (ex) {
        next(ex)
    }
}