var helper = require("./helper");
var User = require("../models/user");
var Project = require("../models/project");
var Bug = require("../models/bug");

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

// The dashBoard content
const getInfo = (req, res) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    let userID = helper.getUserId(req).id;
    User.findById(userID, (err, data) => {
      res.json(data);
    });
  } else res.json({ success: false, msg: "No headers" });
};

const getProjectsForAUser = (req, res) => {
  const userID = helper.getUserId(req).username;
  Project.find(
    {
      $or: [
        { projectOwner: userID },
        { projectDevelopers: { $in: [`${userID}`] } },
      ],
    },
    (err, projects) => {
      res.json(projects);
    }
  );
};

const getProjectInfo = (req, res) => {
  let projectID = req.param("projectID");
  Project.findById(projectID, (err, data) => {
    if (err) res.json(err);
    else res.json(data);
  });
};

const getBugsForAUser = (req, res) => {
  const username = helper.getUserId(req).username;
  Bug.find(
    {
      $or: [{ createdBy: username }, { assignedTo: { $in: [`${username}`] } }],
    },
    (err, bug) => {
      res.json(bug);
    }
  );
};

const getBugsForAProject = (req, res) => {
  const projectID = req.param("projectID");
  Bug.find({ projectID: projectID }, (err, bug) => {
    res.json(bug);
  });
};

const getBugInfo = (req, res) => {
  let bugID = req.param("id");
  Bug.findById(bugID, (err, data) => {
    try {
      res.json(data);
    } catch (err) {
      return err;
    }
  });
};

const addProject = (req, res) => {
  let userName = helper.getUserId(req).username;
  let newProject = Project({
    projectTitle: req.body.projectTitle,
    projectDescription: req.body.projectDescription,
    projectStartDate: moment().format("DD-MM-YYYY").toString(),
    projectOwner: userName,
    projectStatus: "Open",
  });

  newProject.save(function (err, savedProject) {
    if (err) {
      console.log(err);
      res.json({ success: false, msg: "Failed to save" });
    } else res.send(savedProject);
  });
};

const editProject = (req, res) => {
  let projectID = req.body.projectID;
  Project.findOneAndUpdate(
    { _id: projectID },
    {
      $set: {
        projectTitle: req.body.projectTitle,
        projectDescription: req.body.projectDescription,
      },
    },
    { returnNewDocument: true },
    (err, project) => {
      if (err) res.send(err);
      else res.json({ projectDetail: project });
    }
  );
};

module.exports = {
  signUp,
  login,
  getInfo,
  getProjectsForAUser,
  getProjectInfo,
  getBugsForAUser,
  getBugsForAProject,
  getBugInfo,
  addProject,
  editProject,
};
