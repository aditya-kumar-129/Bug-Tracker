const express = require("express");
const actions = require("../methods/actions");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello World");
});

router.get("/dashboard", (req, res) => {
  res.send("dashboard");
});

// Authenitication routes
router.post("/signup", actions.signUp);
router.post("/login", actions.login);

// Routes related to information about project and bug
router.get("/getinfo", actions.getInfo);
router.get("/getprojectinfo", actions.getProjectInfo);
router.get("/getprojectsforauser", actions.getProjectsForAUser);
router.get("/getbugsForaUser", actions.getBugsForAUser);
router.get("/getbugsforaproject", actions.getBugsForAProject);
router.get("/getbuginfo", actions.getBugInfo);

//@desc Adding new project and editing the project detals.
router.post("/addproject", actions.addProject);
router.post("/editproject", actions.editProject);