import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const eventsData = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../data/events.json'), 'utf-8'));

const getEventById = (id) => {
  return eventsData.events.find(e => e.id === id);
}

export default getEventById;