import express from 'express';
import * as Sentry from '@sentry/node';// Import Sentry for error tracking
import getEvents from '../services/events/getEvents.js';// Import function to get events
import createEvent from '../services/events/createEvent.js';// Import function to create events
import getEventById from '../services/events/getEventById.js';// Import function to get event by ID
import updateEventById from '../services/events/updateEventById.js';// Import function to update event by ID
import deleteEvent from '../services/events/deleteEvent.js';// Import function to delete event by ID
import jwtAuth from '../utils/middleware/jwtAuth.js';// Import JWT authentication middleware
const router = express.Router();

// Initialize Sentry
Sentry.init({
    dsn: "https://85c24d1b85af39b1c862c23cdb902af4@o4509004034473984.ingest.de.sentry.io/4509004071829584",
    
  });

// Middleware to handle Sentry errors
router.use(Sentry.Handlers.requestHandler());
router.use(Sentry.Handlers.errorHandler());


///events: GET (Fetch all events)
router.get('/', (req, res) => {
    try {
        const events = getEvents();
        res.status(200).json(events);
    } catch (error) {
        Sentry.captureException(error);
        console.error('Error fetching events:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//POST (Create a new event)
router.post('/', jwtAuth, (req, res) => {
    try {
        const { createdBy, title, description, image, catergoryIds, location, startTime, endTime } = req.body;
        const newEvent = createEvent(createdBy, title, description, image, catergoryIds, location, startTime, endTime);
        res.status(201).json(newEvent);
    } catch (error) {
        Sentry.captureException(error);
        console.error('Error creating event:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

///events/:id: GET (Fetch a single event)
router.get('/:id', (req, res) => {
    try {
      const { id } = req.params;
      const event = getEventById(id);
      if (!event) {
        res.status(404).send(`Event with id ${id} was not found!`);
      } else {
        res.status(200).json(event);
      }
    } catch (error) {
      Sentry.captureException(error);
      console.error(error);
      res.status(500).send('Something went wrong while getting event by id!');
    }
  });


//PUT (Update an event by id)
router.put('/:id', jwtAuth, (req, res) => {
    try {
      const { id } = req.params;
      const { title, description, image, catergoryIds, location, startTime, endTime} = req.body;
      const updatedEvent = updateEventById(id, title, description, image, catergoryIds, location, startTime, endTime);
      if (!updatedEvent) {
        return res.status(404).send(`Event with id ${id} was not found!`);
      }
      res.status(200).json(updatedEvent);
    } catch (error) {
      Sentry.captureException(error);
      console.error(error);
      res.status(500).send('Something went wrong while updating book by id!');
    }
  });

// DELETE (Remove an event)
router.delete('/:id', jwtAuth, (req, res) => {
    try {
        const { id } = req.params;
        const deletedEvent = deleteEvent(id);
        if (!deleteEvent) {
            return res.status(404).send(`Event with id ${id} was not found!`);
        } else {
            res.status(200).send(`Event with id ${deletedEvent} was deleted!`);
        }
      
    } catch (error) {
        Sentry.captureException(error);
        console.error(error);
        res.status(500).send('Something went wrong while deleting event by id!');
    }
});

export default router;