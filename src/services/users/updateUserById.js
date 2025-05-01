import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const usersData = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../data/users.json'), 'utf-8'));

if (!usersData || !Array.isArray(usersData.users)) {
    throw new Error('Invalid users data structure in users.json');
}

const updateUserById = (id, name, username, email, password, image) => {
    const user = usersData.users.find(user => user.id === id);
    if (!user) {
        throw new Error(`User with id ${id} not found`);
    }
    user.username = username ?? user.username;
    user.name = name ?? user.name;
    user.email = email ?? user.email;     
    user.password = password ?? user.password;
    user.image = image ?? user.image;


    fs.writeFileSync(path.resolve(__dirname, '../../data/users.json'), JSON.stringify(usersData, null, 2));
    return user;    
}

export default updateUserById;





