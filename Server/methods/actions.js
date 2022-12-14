var helper = require("./helper");
var User = require("../models/user");
var Project = require("../models/project");
var Bug = require("../models/bug");
const moment = require("moment");
const bug = require("../models/bug");
const project = require("../models/project");

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
    console.log("Registered user successfully");
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
          token = encodeToken(user._id, user.username);
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
    console.log("userID: " + userID);
    User.findById(userID, (err, data) => {
      res.json(data);
    });
  } else {
    res.json({ success: false, msg: "No headers" });
  }
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
    if (err) res.json({ success: false, msg: "Failed to save" });
    else res.send(savedProject);
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

const addBug = (req, res) => {
  let projectID = req.body.projectID;
  let userName = helper.getUserId(req).username;
  let newBug = Bug({
    projectID: projectID,
    createdBy: userName,
    bugTitle: req.body.bugTitle,
    bugDescription: req.body.bugDescription,
    bugStatus: "Open",
    bugSeverity: req.body.bugSeverity,
    bugDueDate: req.body.bugDueDate,
  });
  newBug.save((err, savedBug) => {
    if (err) res.json({ success: false, msg: err });
    // If you already have a bug for a project then we just have to push the current bug in that array.
    else {
      Project.findOneAndUpdate(
        { _id: projectID },
        { $push: { bugs: savedBug._id } },
        (err, project) => {
          if (err) res.send(err);
        }
      );
    }
  });
};

const addDeveloper = (req, res) => {
  let developer = req.body.developer;
  let projectID = req.body.projectID;
  Project.findOneAndUpdate(
    { _id: projectID },
    // https://www.mongodb.com/docs/manual/reference/operator/update/addToSet/
    { $addToSet: { projectDevelopers: developer } },
    { returnNewDocument: true },
    (err, project) => {
      if (err) res.send(err);
      else res.json({ projectDetail: project });
    }
  );
};

const assignBug = (req, res) => {
  let bugID = req.body.bugID;
  let assignedTo = req.body.assignedTo;
  let bd, ud;
  Bug.findOneAndUpdate(
    { _id: bugID },
    { $addToSet: { assignedTo: assignedTo } },
    { returnNewDocument: true },
    (err, bugs) => {
      if (err) res.send(err);
      else {
        Project.findOneAndUpdate(
          { _id: bugs.projectID },
          { $addToSet: { projectDevelopers: assignedTo } },
          { returnNewDocument: true },
          (err, project) => {
            if (err) res.send(err);
            else res.send({ projectDetail: project, ...ud, ...bd });
          }
        );
      }
    }
  );
};

const editBug = (req, res) => {
  let bugID = req.body.bugID;
  Bug.findOneAndUpdate(
    { _id: bugID },
    {
      $set: {
        bugTitle: req.body.bugTitle,
        bugDescription: req.body.bugDescription,
        bugSeverity: req.body.bugSeverity,
        bugDueDate: req.body.bugDueDate,
      },
    },
    { returnNewDocument: true },
    (err, bugs) => {
      if (err) res.send(err);
      else bd = { bugDetail: bugs };
    }
  );
};

const deleteProject = (req, res) => {
  let projectID = req.body.projectID;
  let bugs = req.body.bugs;
  Project.findOneAndDelete({ _id: projectID }, (err, project) => {
    if (err) console.log(err);
  });
  bugs.map((bugID) => {
    Bug.findOneAndDelete({ _id: bugID }, (err) => {
      console.log(err);
    });
  });
};

const deleteBug = (req, res) => {
  let bugID = req.body.bugID;
  Bug.findOneAndDelete({ _id: bugID }, (err, bug) => {
    if (err) return res.json({ succes: false, error: err });
  });
  Project.updateMany(
    { $in: { bugs: bugID } },
    { $pull: { bugs: bugID } },
    (err, project) => {
      if (err) res.json(err);
    }
  );
};

const getProjectIdForABug = (req, res) => {
  let bugID = req.body.bugID;
  Bug.findOne({ _id: bugID }, (err, bug) => {
    if (err) return res.json({ succes: false, error: err });
    else res.send(bug.projectID);
  });
};

const closeBug = (req, res) => {
  let bugID = req.body.bugID;

  Bug.findOneAndUpdate({ _id: bugID }, { bugStatus: "Closed" }, (err, bug) => {
    if (err) return res.json({ succes: false, error: err });
    else res.send(bug.projectID);
  });
};

const closeProject = (req, res) => {
  let projectID = req.body.projectID;
  Project.findOneAndUpdate(
    { _id: projectID },
    { projectStatus: "Closed" },
    (err, project) => {
      if (err) return res.json({ succes: false, error: err });
      else res.send(project);
    }
  );
};

module.exports = {
  signUp,
  login,
  addProject,
  addBug,
  getInfo,
  assignBug,
  getProjectInfo,
  getBugInfo,
  addDeveloper,
  getProjectsForAUser,
  getBugsForAUser,
  editProject,
  editBug,
  deleteProject,
  deleteBug,
  getProjectIdForABug,
  closeBug,
  getBugsForAProject,
  closeProject,
};
