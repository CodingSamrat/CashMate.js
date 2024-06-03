
import { Show } from "../controllers/show.controller.js";
import { MainRoute } from "./main.route.js";

import inquirer from "inquirer";

export async function ShowRoute() {
    const answers = await inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What do you want to Show?',
            choices: [
                { name: '> All', value: 'all' },
                { name: '> Earning', value: 'earning' },
                { name: '> Expense', value: 'expense' },
                { name: '> Back', value: 'back' }
                // { name: '> Remove', value: 'remove' },
            ],
        }
    ]);


    switch (answers.action) {
        case 'all':
            // console.log('You chose All\n');
            await Show()
            break;
        case 'earning':
            // console.log('You chose Earning\n');
            await Show('earning')
            break;
        case 'expense':
            // console.log('You chose Expense\n');
            await Show('expense')
            break;
        case 'back':
            await MainRoute()
            console.log('\n')
            break;
    }
}

