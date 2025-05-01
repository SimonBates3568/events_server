import express from 'express';
import * as Sentry from '@sentry/node';// Import Sentry for error tracking
import getCategories from '../services/categories/getCategories.js';// Import function to get categories
import createCategory from '../services/categories/createCategorie.js';// Import function to create a category
import getCategoriesById from '../services/categories/getCategoriesById.js';// Import function to get a category by ID
import updateCategorieById from '../services/categories/updateCategorieById.js';// Import function to update a category by ID
import deleteCategorie from '../services/categories/deleteCategorie.js';// Import function to delete a category by ID
import jwtAuth from '../utils/middleware/jwtAuth.js';// Import JWT authentication middleware
const router = express.Router();

// Initialize Sentry
Sentry.init({
    dsn: "https://85c24d1b85af39b1c862c23cdb902af4@o4509004034473984.ingest.de.sentry.io/4509004071829584",
    
  });

// Middleware to handle Sentry errors
router.use(Sentry.Handlers.requestHandler());
router.use(Sentry.Handlers.errorHandler());

/// GET (Fetch all categories)
router.get('/', (_, res) => {
    try {
        const categories = getCategories();
        res.status(200).json(categories);
    } catch (error) {
        Sentry.captureException(error);
        console.error('Error fetching categories:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// POST (Create a new category)
router.post('/', jwtAuth,  (req, res) => {
    try {
    const { name } = req.body;
    const newCategory = createCategory(name);
    res.status(201).json(newCategory);
    } catch (error) {
        Sentry.captureException(error);
        console.error('Error creating category:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
// /categories/:id: GET (Fetch a single category)
router.get('/:id', (req, res) => {
    try {
      const { id } = req.params;
      const categorie = getCategoriesById(id);
      if (!categorie) {
        res.status(404).send(`Category with id ${id} was not found!`);
      } else {
        res.status(200).json(categorie);
      }
    } catch (error) {
      Sentry.captureException(error);
      console.error(error);
      res.status(500).send('Something went wrong while getting book by id!');
    }
  });

// PUT (Update a category)
router.put('/:id', jwtAuth,  (req, res) => {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const updatedCategorie = updateCategorieById(id, name);
      res.status(200).json(updatedCategorie);
    } catch (error) {
      Sentry.captureException(error);
      console.error(error);
      res.status(500).send('Something went wrong while updating book by id!');
    }
  });

// DELETE (Remove a category)
router.delete('/:id', jwtAuth, (req, res) => {
    try {
        const { id } = req.params;
        const deletedEvent = deleteCategorie(id);
        if (!deleteCategorie) {
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
