var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var projectSchema = new Schema({
  projectTitle: { type: String, require: true },
  projectDescription: { type: String, require: true },
  projectStartDate: { type: String, require: true },
  projectOwner: { type: String, require: true },
  projectStatus: { type: String, require: true },
  bugs: { type: [String] },
  projectDevelopers: { type: Array },
});

projectSchema.pre("save", function (next) {
  var project = this;
  return next();
});

module.exports = mongoose.model("Project", projectSchema);
