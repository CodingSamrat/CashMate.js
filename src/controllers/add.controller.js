
import { loadData, saveData } from "../libs/filesystem.js";
import { ObjectId } from 'bson';

export async function AddRecord(type, amount, description) {
    const id = new ObjectId();
    // Create new record
    const record = {
        id,
        type,
        amount: parseFloat(amount),
        description,
        date: new Date().toISOString(),
    };

    const data = loadData();
    data.push(record);
    saveData(data);
    console.log(`${type} recorded successfully!`);
}