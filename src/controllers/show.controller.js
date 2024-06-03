import CliTable3 from "cli-table3";
import { getFormattedDate } from "../libs/datetime.js";
import { loadData } from "../libs/filesystem.js";
import { Branding } from "../libs/branding.js";



export async function Show(viewType = 'all') {
    Branding()

    const data = await loadData()


    const table = new CliTable3({
        head: ['Date', 'Description', 'Type', 'Amount'],
        colWidths: [18, 20, 9, 10],
        colAligns: ['center', 'left', 'center', 'right'],
    });

    // Filter records based on the viewType
    const filteredData = await data.filter(record => viewType === 'all' || record.type === viewType);


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
        footerLabel = 'Total';
        footerValue = total;
    }


    // Add the total or balance to the table
    table.push(['', '', footerLabel, footerValue]);

    // Display the table in the terminal
    console.log(table.toString());

    console.log('');
}




const calculateBalance = (data) => {
    const totalEarnings = data.reduce((sum, record) => record.type === 'earning' ? sum + record.amount : sum, 0);
    const totalExpenses = data.reduce((sum, record) => record.type === 'expense' ? sum + record.amount : sum, 0);
    return totalEarnings - totalExpenses;
};

// Function to calculate the total for a given type
const calculateTotal = (data, type) => {
    return data.reduce((sum, record) => record.type === type ? sum + record.amount : sum, 0);
};