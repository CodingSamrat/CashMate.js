import inquirer from 'inquirer';
import { AddRoute } from './add.route.js';
import { ShowRoute } from './show.route.js';


export async function MainRoute() {
    const answers = await inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: [
                { name: '> Add', value: 'add' },
                { name: '> Show', value: 'show' },
                { name: '> Exit', value: 'exit' }
            ],
        }
    ]);


    switch (answers.action) {
        case 'add':
            // console.log('You chose Add\n');
            await AddRoute()
            break;
        case 'show':
            // console.log('You chose Option 2\n');
            await ShowRoute()
            break;
        case 'exit':
            console.log('Goodbye!\n');
            process.exit();
    }



    // Recursive call to main to keep the CLI running
    await MainRoute();
};