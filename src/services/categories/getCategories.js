import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const categoriesData = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../data/categories.json'), 'utf-8'));

const getCategories = () => {
    return categoriesData;
}

export default getCategories;