import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const users = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../data/users.json'), 'utf-8'));

const getUsers = () => {
    return users;
}

export default getUsers;
