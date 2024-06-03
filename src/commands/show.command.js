import { Show } from "../controllers/show.controller.js";


const ShowCommand = {
    command: 'show [type]',
    describe: 'Show records based on type',
    builder: (yargs) => {
        return yargs.positional('type', {
            describe: 'Type of records to show (all, expenses, earnings)',
            type: 'string',
            choices: ['all', 'expense', 'earning', 'exp', 'ern'],
            default: 'all', // Default value
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
            case 'all':
                Show()
                break;
            case 'expense':
                // Add logic to show expenses
                Show('expense')
                break;
            case 'earning':
                // Add logic to show earnings
                Show('earning')
                break;
            default:
                console.info('Invalid type specified');
                break;
        }
    }
};

export default ShowCommand