import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuid } from 'uuid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const eventsData = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../data/events.json'), 'utf-8'));

const createEvent = (createdBy, title, description, image, catergoryIds, location, startTime, endTime) => {
  const newEvent = {
    id: uuid(),
    createdBy: uuid(),
    title,
    description,
    image,
    catergoryIds,       
    location,
    startTime,
    endTime
  };

  eventsData.events.push(newEvent);
  fs.writeFileSync(path.resolve(__dirname, '../../data/events.json'), JSON.stringify(eventsData, null, 2), 'utf-8');
  return newEvent;
}

export default createEvent ;