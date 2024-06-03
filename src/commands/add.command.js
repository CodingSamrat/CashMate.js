import { AddRecord } from "../controllers/add.controller.js";


const AddCommand = {
    command: 'add <type> <amount> <desc>',
    describe: 'Add new record',
    builder: (yargs) => {
        return yargs.positional('type', {
            describe: 'Type of records (expense, earning)',
            type: 'string',
            choices: ['expense', 'earning', 'exp', 'ern'],
        });
    },
    handler: (argv) => {

        let type = argv.type;

        // Map aliases to their respective types
        const typeMapping = {
            exp: 'expense',
            ern: 'earning',
        };

        type = typeMapping[type] || type;

        switch (type) {
            case 'expense':
                // Add logic to show expenses
                AddRecord('expense', argv.amount, argv.desc)
                break;
            case 'earning':
                // Add logic to show earnings
                AddRecord('earning', argv.amount, argv.desc)
                break;
            default:
                console.info('Invalid type specified');
                break;
        }
    }
};

export default AddCommand