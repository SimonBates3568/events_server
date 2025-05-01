import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const eventsData = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../data/events.json'), 'utf-8'));

const updateEventById = (id, title, description, image, catergoryIds, location, startTime, endTime) => {
    const event = eventsData.events.find((e) => e.id === id);
    if (event === -1) {
        throw new Error(`Event with id ${id} not found`);
    }

    event.title = title ?? event.title;
    event.description = description ?? event.description;
    event.image = image ?? event.image; 
    event.catergoryIds = catergoryIds ?? event.catergoryIds;
    event.location = location ?? event.location;          
    event.startTime = startTime ?? event.startTime;
    event.endTime = endTime ?? event.endTime;

    fs.writeFileSync(path.resolve(__dirname, '../../data/events.json'), JSON.stringify(eventsData, null, 2));

    return event;
}

export default updateEventById;