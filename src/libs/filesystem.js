// Function to load data from JSON file
export const loadData = () => {
    if (!fs.existsSync(filePath)) {
        return [];
    }
    const data = fs.readFileSync(filePath);
    return JSON.parse(data);
};

// Function to save data to JSON file
export const saveData = (data) => {
    const directory = path.dirname(filePath);
    console.log(directory)
    // Check if the directory exists, if not, create it
    if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory, { recursive: true });
    }
    console.log(filePath)
    fs.writeFileSync(filePath, JSON.stringify(data, null, 4));
};