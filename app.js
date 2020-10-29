const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const employees = [];
// Selecting member role
const memberRole = () => {
    inquirer.prompt({
        type:"list",
        name:"type",
        message:"Choose team members role ",
        choices:["Manager",
                "Engineer",
                "Intern"]
    }).then(val => {
   if (val.type === "Manager"){
        addManager();
        createTeam();
        }
    else if (val.type === "Engineer"){
        addEngineer();
    } else {
        addIntern();
    }
})
}
// Cycling through manager prompts to creat manager card
const addManager = () => {
        inquirer.prompt([{
            type: "input",
            name: "name",
            message: "Enter manager's name"
        },
        {
            type: "input",
            name: "id",
            message: "Enter manager's id",
            validate: answer => {
                const pass = answer.match(
                    /^[1-9]\d*$/
                );
                if (pass){
                    return true;
                }
                return "Please enter a valid ID number.";
            }
        },
        {
            type: "input",
            name: "email",
            message: "Enter manager's email",
            validate: answer => {
                const pass = answer.match(
                    /\S+@\S+\.\S+/
                );
                if (pass){
                    return true;
                }
                return "Please enter a valid email address."
            }
        },
        {
            type:"input",
            name:"officeNumber",
            message:"Enter manager's phone number",
            validate: answer => {
                const pass = answer.match(
                    /^\d{10}$/
                );
                if (pass){
                    return true;
                }
                return "Please enter a ten digit phone number."
            }
            
        }
        // Adding new employee to array
        ]).then(function ({name, id, email, officeNumber }) {
            this.employee = new Manager(name, id, email, officeNumber);
            employees.push(this.employee);
            console.log(employees);
            // Prompt to add another team member
        }).then(function addAnother(){
            inquirer.prompt({
                type:"confirm",
                name:"add",
                message:"Would you like to add more team members?"
            }).then(val =>{
                if(val.add){
                    memberRole();
                }else{
                    createTeam();
                }
            })
        })
    }
    // Function to cycle through engineer prompts
    const addEngineer = () => {
        inquirer.prompt([{
            type: "input",
            name: "name",
            message: "Enter engineer's first name"
        },
        {
            type: "input",
            name: "id",
            message: "Enter engineer's ID",
            validate: answer => {
                const pass = answer.match(
                    /^[1-9]\d*$/
                );
                if (pass){
                    return true;
                }
                return "Please enter a valid ID number.";
            }
        },
        {
            type: "input",
            name: "email",
            message: "Enter engineer's E-mail",
            validate: answer => {
                const pass = answer.match(
                    /\S+@\S+\.\S+/
                );
                if (pass){
                    return true;
                }
                return "Please enter a valid email address."
            }
        },
        {
            type:"input",
            name:"github",
            message:"Enter engineer's github username"
        }
         // Adding new employee to array
        ]).then(function ({name, id, email, github }) {
            this.employee = new Engineer(name, id, email, github);
            employees.push(this.employee);
            console.log(employees);
            // Prompt to add another team member
        }).then(function addAnother(){
            inquirer.prompt({
                type:"confirm",
                name:"add",
                message:"Would you like to add more members?"
            }).then(val =>{
                if(val.add){
                    memberRole();
                }else{
                    createTeam();
                }
            })
        })
    }
    // function to cycle through intern prompts
    const addIntern = () => {
        inquirer.prompt([{
            type: "input",
            name: "name",
            message: "Enter intern's first name"
        },
        {
            type: "input",
            name: "id",
            message: "Enter intern's id",
            validate: answer => {
                const pass = answer.match(
                    /^[1-9]\d*$/
                );
                if (pass){
                    return true;
                }
                return "Please enter a valid ID number.";
            }
        },
        {
            type: "input",
            name: "email",
            message: "Enter intern's E-mail",
            validate: answer => {
                const pass = answer.match(
                    /\S+@\S+\.\S+/
                );
                if (pass){
                    return true;
                }
                return "Please enter a valid email address."
            }
        },
        {
            type:"input",
            name:"school",
            message:"Enter intern's school name"
        }
        ]).then(function ({name, id, email, school }) {
            this.employee = new Intern(name, id, email, school);
            employees.push(this.employee);
            console.log(employees);
        }).then(function addAnother(){
            inquirer.prompt({
                type:"confirm",
                name:"add",
                message:"Would you like to add more members?"
            }).then(val =>{
                if(val.add){
                    memberRole();
                }else{
                    createTeam();
                }
            })
        })
    }
    // Function to build team and write to file.  
    const createTeam = () => {
        if (!fs.existsSync(OUTPUT_DIR)) {
            fs.mkdirSync(OUTPUT_DIR)
        }
        fs.writeFileSync(outputPath, render(employees), "utf-8");
    
    }
    

memberRole()
