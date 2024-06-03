import { AddRecord } from "../controllers/add.controller.js";
import { MainRoute } from "./main.route.js";

import inquirer from "inquirer";

export async function AddRoute() {
    const answers = await inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What do you want to Add?',
            choices: [
                { name: '> Earning', value: 'earning' },
                { name: '> Expense', value: 'expense' },
                { name: '> Back', value: 'back' }
                // { name: '> Remove', value: 'remove' },
            ],
        }
    ]);


    switch (answers.action) {
        case 'earning':
            // console.log('You chose Earning\n');
            await Add('earning')
            break;
        case 'expense':
            // console.log('You chose Expense\n');
            await Add('expense')
            break;
        case 'back':
            await MainRoute()
            console.log('\n')
            break;
    }
}



// ====================================================
// Name: Add
// Description: ...
// Route: main/add/earning
// ====================================================
async function Add(type) {

    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'amount',
            message: 'Enter the amount:',
            validate: (input) => {
                const value = parseFloat(input);
                return isNaN(value) ? 'Please enter a valid number' : true;
            },
        },
        {
            type: 'input',
            name: 'description',
            message: 'Enter a description:',
        },
    ]);

    const { amount, description } = answers;

    AddRecord(type, amount, description)

};
