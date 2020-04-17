function generateReadme(answers) {
  return `
# ${answers.title}
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
