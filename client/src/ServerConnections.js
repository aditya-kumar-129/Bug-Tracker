const axios = require("axios");
const URL = "http://localhost:5000";

export const registerUser = async (name, username, userEmail, userPassword) => {
  let response;
  try {
    response = await axios.post(`${URL}/signup`, {
      name: name,
      username: username,
      email: userEmail,
      password: userPassword,
    });
    return response.status;
  } catch (err) {
    return err;
  }
};

export const loginUser = async (userEmail, userPassword) => {
  let response;
  try {
    response = await axios.post(`${URL}/login`, {
      email: userEmail,
      password: userPassword,
    });
    return response.data.token;
  } catch (err) {
    return err;
  }
};

export const getUserData = async () => {
  let response;
  console.log(localStorage.getItem("token"));
  try {
    response = await axios.get(`${URL}/getInfo`, {
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    return response.data;
  } catch (err) {
    return err;
  }
};

export const addBug = async (
  projectID,
  bugTitle,
  bugDescription,
  bugSeverity,
  bugDueDate
) => {
  let response;
  try {
    response = await axios.post(
      `${URL}/addbug`,
      {
        projectID: projectID,
        bugTitle: bugTitle,
        bugDescription: bugDescription,
        bugSeverity: bugSeverity,
        bugDueDate: bugDueDate,
      },
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (err) {
    return err;
  }
};

export const addProject = async (
  projectTitleParam,
  projectDescriptionParam
) => {
  let response;
  try {
    response = await axios.post(
      `${URL}/addproject`,
      {
        projectTitle: projectTitleParam,
        projectDescription: projectDescriptionParam,
      },
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (err) {
    return err;
  }
};