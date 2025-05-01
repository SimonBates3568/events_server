import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuid } from 'uuid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const userData = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../data/users.json'), 'utf-8'));

const createUser = (name, email, password) => {
  const newUser = {
    id: uuid(),
    name,
    email,
    password,
  };

  userData.users.push(newUser);

  fs.writeFileSync(path.resolve(__dirname, '../../data/users.json'), JSON.stringify(userData, null, 2));

  return newUser;
}
export default createUser;


