import os from 'os'
import fs from 'fs'
import path from 'path';



const homeDir = os.homedir();
const csDir = path.join(homeDir, 'Documents', 'CodingSamrat');
const filePath = path.join(csDir, 'cashmate', 'cashmate.data.json')


// Function to load data from JSON file
export const loadData = () => {
    if (!fs.existsSync(filePath)) {
        return [];
    }


    // Return Data
    const data = fs.readFileSync(filePath);
    return JSON.parse(data);
};




// Function to save data to JSON file
export const saveData = (data) => {
    const directory = path.dirname(filePath);


    // Check if the directory exists, if not, create it
    if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory, { recursive: true });
    }

    // Write data to JSON File
    fs.writeFileSync(filePath, JSON.stringify(data, null, 4));
};