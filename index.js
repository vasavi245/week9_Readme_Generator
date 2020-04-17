const fs = require("fs");
const inquirer = require("inquirer");
const axios = require("axios");
const util = require("util");
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
         type: 'input',
         name: 'email',
         message: 'What is your email?',
     },
     {
         type: 'input',
         name: 'repo',
         message: 'What is the name of your repository?',
     },
     {
         type: "input",
         name: "title",
         message: "What is the title of your project:", 
     },
     {
         type: "editor",
         name: "description",
         message: "Description of your project:",
     },
     {
         type: "editor",
         name: "installation",
         message: "Describe the Steps used to install your project? ",
     },
     {
         type: 'editor',
         name: 'usage',
         message: 'Describe the usage of your application:'
     },
     {
         type: 'editor',
         name:  'contributing',
         message: 'Any contributions you would like to add?',
     },
     {
        type: 'input',
        name: 'tests',
        message: 'Any tests for this project?',
     },

])
}
function generateReadme(answers) {
    return `
  # ${answers.title}
  ![npm](https://img.shields.io/npm/v/npm?color=green)
  ![GitHub issues](https://img.shields.io/github/issues/${answers.username}/${answers.repo})
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
  ## Usage
  ${answers.usage}
  ## Contributing
  ${answers.contributing}
  ## Tests  
  ${answers.tests}
  ## License
  ![GitHub](https://img.shields.io/github/license/${answers.username}/${answers.repo}?style=plastic)
  ## Questions
  * <img src="${answers.Image}" alt="avatar" style="border-radius: 16px" width="150" />
  If you have any questions about the repo, open an issue or contact [${answers.username}](https://api.github.com/users/${answers.username}) directly at ${answers.email}`;
  }
//async function init to start and get answers from promptuser function
async function init(){
    try {
        const answers = await promptUser();
        console.log(answers.username);
        answers.Image = await getuserImage(answers.username);
        console.log(answers.email);
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



init();
