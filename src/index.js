#!/usr/bin/env node

import fs from 'fs';
import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";
import inquirer from 'inquirer';
import { exec } from 'child_process';
import CliTable3 from 'cli-table3';
import os from 'os';
import path from 'path';
import { uId } from './libs/index.js';

const homeDir = os.homedir();


const filePath = path.join(homeDir, 'test.cashmate.data.json')

// Function to get formatted date as DD-MM-YYYY
function getDDMMYYYY(date) {
    const _date = new Date(date);
    const day = String(_date.getDate()).padStart(2, '0');
    const month = String(_date.getMonth() + 1).padStart(2, '0');
    const year = _date.getFullYear();
    return `${day}-${month}-${year}`;
}

function getHHMM(date) {
    const _date = new Date(date);

    let hours = _date.getHours();
    let minutes = _date.getMinutes();

    // Add leading zeros to hours and minutes if needed
    if (hours < 10) hours = '0' + hours;
    if (minutes < 10) minutes = '0' + minutes;

    return `${hours}:${minutes}`;
}

function getFormattedDate(date) {
    return `${getDDMMYYYY(date)} ${getHHMM(date)}`;
}

// Function to clear the terminal
const clearTerminal = async () => {
    exec('cls', (err) => {
        if (err) {
            console.error('Error clearing the terminal:', err);
        }
    });
};

// Function to load data from JSON file
const loadData = () => {
    if (!fs.existsSync(filePath)) {
        return [];
    }
    const data = fs.readFileSync(filePath);
    return JSON.parse(data);
};

// Function to save data to JSON file
const saveData = (data) => {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 4));
};

// Function to add a new record
const addRecord = async () => {
    const answers = await inquirer.prompt([
        {
            type: 'list',
            name: 'type',
            message: 'Is this an earning or an expense?',
            choices: ['earning', 'expense'],
        },
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

    const { type, amount, description } = answers;
    const record = {
        id: uId,
        type,
        amount: parseFloat(amount),
        description,
        date: new Date().toISOString(),
    };

    const data = loadData();
    data.push(record);
    saveData(data);
    console.log(`${type} recorded successfully!`);
};

// Function to calculate the current balance
const calculateBalance = (data) => {
    const totalEarnings = data.reduce((sum, record) => record.type === 'earning' ? sum + record.amount : sum, 0);
    const totalExpenses = data.reduce((sum, record) => record.type === 'expense' ? sum + record.amount : sum, 0);
    return totalEarnings - totalExpenses;
};

// Function to calculate the total for a given type
const calculateTotal = (data, type) => {
    return data.reduce((sum, record) => record.type === type ? sum + record.amount : sum, 0);
};

// Function to view records
const viewRecords = async () => {
    const { viewType } = await inquirer.prompt([
        {
            type: 'list',
            name: 'viewType',
            message: 'Which records would you like to view?',
            choices: ['all', 'expense', 'earning'],
        },
    ]);

    const data = loadData().reverse();

    const table = new CliTable3({
        head: ['Date', 'Description', 'Type', 'Amount'],
        colWidths: [18, 20, 9, 10],
        colAligns: ['center', 'left', 'center', 'right'],
    });

    // Filter records based on the viewType
    const filteredData = data.filter(record => viewType === 'all' || record.type === viewType);

    // Add records to the table
    filteredData.forEach(record => {
        const sign = record.type === 'earning' ? '+' : '-';
        table.push([getFormattedDate(record.date), record.description, record.type, `${record.amount}`]);
    });

    // Calculate total or balance
    let footerLabel, footerValue;
    if (viewType === 'all') {
        const balance = calculateBalance(data);
        footerLabel = 'Balance';
        footerValue = balance;
    } else {
        const total = calculateTotal(data, viewType);
        footerLabel = viewType === 'earning' ? 'Total' : 'Total';
        footerValue = total;
    }

    // Add the total or balance to the table
    table.push(['', '', footerLabel, footerValue]);

    // Display the table in the terminal
    console.log(table.toString());

    console.log('');
};

// Main function
const main = async () => {
    clearTerminal();

    const answer = await inquirer.prompt({
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: ['Add a record', 'View records', 'Exit'],
    });

    switch (answer.action) {
        case 'Add a record':
            await addRecord();
            break;
        case 'View records':
            await clearTerminal();
            await viewRecords();
            break;
        case 'Exit':
            console.log('Goodbye!');
            process.exit();
    }

    main();
};

// Run the main function
main();
