var helper = require("./helper");
var User = require("../models/user");

const signUp = (req, res) => {
  if (!req.body.email || !req.body.password || !req.body.username)
    res.json({ success: false, msg: "Enter all fields" });
  else {
    var newUser = User({
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    // using callback
    // Adventure.findOne({ country: "Croatia" }, function (err, adventure) {});
    User.findOne(
      { $or: [{ email: req.body.email }, { username: req.body.username }] },
      (err, user) => {
        if (err) throw err;
        if (user) res.status(403).send({ success: false, msg: "User exists" });
        else {
          newUser.save((err) => {
            if (err) res.json({ success: false, msg: "Failed to save" });
            else res.json({ success: true, msg: "Successfully Saved" });
          });
        }
      }
    );
  }
};

const login = (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) throw err;
    if (!user)
      res.status(404).send({ success: false, msg: "Authentication failed" });
    else {
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          token = helper.encodeToken(user._id, user.username);
          res.json({ success: true, token: token });
        } else res.status(403).send({ success: false, msg: "Authentication failed" });
      });
    }
  });
};

module.exports = {
  signUp,
  login,
};
