const fs = require("fs");
const inquirer = require("inquirer");
const axios = require("axios");
const util = require("util");
//const generate = require("./generateMarkdown");
//const FileIO = require("./fileIO");
//console.log(generate);
const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
    // questions to prompt user
    return inquirer.prompt([
     {
         type: "input",
         name: "username",
         message: "What is your Github username: ",
     },
     {
         type: "input",
         name: "title",
         message: "What is the title of your project:", 
     },
     {
         type: "input",
         name: "description",
         message: "Description of your project:",
     },
     {
         type: "input",
         name: "installation",
         message: "Describe the Steps used to install your project? ",
     },
     {
         type: "input",
         name: "credits",
         message: "List your collaborators with links to their github profiles",
     },

])
}
function generateReadme(answers) {
    return `
  # ${answers.title}
  ![GitHub repo size](https://img.shields.io/github/repo-size/${answers.username}/${answers.repository})
  ![GitHub issues](https://img.shields.io/github/issues/${answers.username}/${answers.repository})
  ## Description
  ${answers.description}
  ## Table of Contents
  1. [Installation](#Installation)
  2. [Usage](#Usage)
  3. [Licence](#License)
  4. [Contributing](#Contributing)
  5. [Tests](#Tests)
  6. [Questions](#Questions)
  ## Installation
  ${answers.installation}
  ## credits
  ${answers.credits}
  ## License
  ![License](https://img.shields.io/github/license/${answers.username}/${answers.title}?style=flat-square)
  ## Contributing
  [![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-v2.0%20adopted-ff69b4.svg)](code_of_conduct.md)
  ## Tests
  ${answers.tests}
  ## Questions
  ${answers.Email}
  ![Profile Image](${answers.profileImage})`;
  }
//async function init to start and get answers from promptuser function
async function init(){
    console.log("hi");
    try {
        const answers = await promptUser();
        console.log(answers.username);
        answers.profileImage = await getuserImage(answers.username);
        answers.Email = await getuserEmail(answers.username);
        const readme = generateReadme(answers)
        await writeFileAsync("ReadmeGenerated.md", readme);
    }catch(err){
        console.log(err);
    }

}

// async function to get user github profile Image
async function getuserImage(username) {

    console.log(username);
    try{
        const queryUrl1 = `https://api.github.com/users/${username}`;
        const userImage = await axios.get(queryUrl1);
        console.log(userImage.data.avatar_url);
        return userImage.data.avatar_url;
        
    }catch(err){
        console.log(err);
    }
}
// async function to get email from the user
async function getuserEmail(username) {
    try{
        const queryUrl2 = `https://api.github.com/users/${username}`;
        const userEmail = await axios.get(queryUrl2);
        console.log(userEmail.data.email);
        return userEmail.data.email;
    }catch(err) {
        console.log(err);
    }
}
    


init();
