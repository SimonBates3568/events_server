import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const usersData = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../data/users.json'), 'utf-8'));

const getUserById = (id) => {
    return usersData.users.find(user => user.id === id)
};

export default getUserById;