#!/usr/bin/env node

export default class CsArgs {
    constructor(version = '1.0.0') {
        this.commands = {};
        this.version = version;
        this.command('help', 'Show help information', this.showHelp.bind(this));
        this.command('version', 'Show version information', this.showVersion.bind(this));
    }

    // Method to register a new command
    command(name, description, callback) {
        this.commands[name] = { description, callback };
    }

    // Method to parse command-line arguments and execute the appropriate callback
    parse() {
        const [, , command, ...args] = process.argv;

        if (!command || command === '--help') {
            this.showHelp();
            return;
        }

        if (command === '--version') {
            this.showVersion();
            return;
        }

        const selectedCommand = this.commands[command];
        if (!selectedCommand) {
            console.log(`Command '${command}' not found.`);
            return;
        }

        selectedCommand.callback(args);
    }

    // Method to show help information
    showHelp() {
        console.log('Usage: csargs <command>');
        console.log('Available commands:');
        Object.entries(this.commands).forEach(([name, { description }]) => {
            console.log(`  ${name}: ${description}`);
        });
    }

    // Method to show version information
    showVersion() {
        console.log(`Version: ${this.version}`);
    }
}

// Usage:

export const csargs = new CsArgs('1.0.0');

// Register other commands
csargs.command('add', 'Add new todo', (args) => {
    console.log('Adding new todo:', args.join(' '));
});

csargs.command('list', 'List all todos', () => {
    console.log('Listing all todos...');
    // Add logic to list todos
});

csargs.command('remove', 'Remove a todo', (args) => {
    console.log('Removing todo with ID:', args[0]);
    // Add logic to remove todo
});

// Parse command-line arguments
// csargs.parse();
