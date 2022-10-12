var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var bcrypt = require("bcrypt");
var userSchema = new Schema({
  email: { type: String, require: true },
  password: { type: String, require: true },
  name: { type: String, require: true },
  username: { type: String, require: true },
});

// https://stackoverflow.com/questions/14588032/mongoose-password-hashing
userSchema.pre("save", function (next) {
  //stackoverflow.com/questions/49440561/virtual-field-not-setting-field-in-mongoose-model/49441708#49441708
  if (this.isModified("password") || this.isNew) {
    // https://heynode.com/blog/2020-04/salt-and-hash-passwords-bcrypt/
    bcrypt.genSalt(10, function (err, salt) {
      if (err) return next(err);
      bcrypt.hash(this.password, salt, function (err, hash) {
        if (err) return next(err);
        this.password = hash;
        next();
      });
    });
  } else return next();
});

// https://stackoverflow.com/questions/14588032/mongoose-password-hashing
// https://www.mongodb.com/blog/post/password-authentication-with-mongoose-part-1
userSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

module.exports = mongoose.model("User", userSchema);
