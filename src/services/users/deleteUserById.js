import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const bookData = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../data/users.json'), 'utf-8'));

const deleteUserById = (id) => {
    const userIndex = bookData.users.findIndex(user => user.id === id);

    if (userIndex === -1) {
        throw new Error(`User with id ${id} not found`);
    };

    bookData.users.splice(userIndex, 1);
    fs.writeFileSync(path.resolve(__dirname, '../../data/users.json'), JSON.stringify(bookData, null, 2));
    return { message: `User with id ${id} deleted successfully` };
};
export default deleteUserById;