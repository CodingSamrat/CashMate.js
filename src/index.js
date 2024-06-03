#!/usr/bin/env node


import { MainRoute } from "./route/main.route.js";
import Yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';
import ShowCommand from "./commands/show.command.js";
import AddCommand from "./commands/add.command.js";



if (process.argv.length > 2) {
    // Initialize yargs with the process arguments and export it
    const yargs = Yargs(hideBin(process.argv));

    // Register Commands
    yargs.command(ShowCommand)
    yargs.command(AddCommand)


    // Run SpeedyCLI
    yargs.parse()
}
else {
    // Run Intractable cli
    MainRoute();

}





