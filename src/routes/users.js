import express from 'express';
import getUsers from '../services/users/getUsers.js';// import getUsers function
import * as Sentry from '@sentry/node';// Import Sentry for error tracking
import createUser from '../services/users/createUser.js';// Import createUser function
import getUserById from '../services/users/getUserById.js';// Import getUserById function
import updateUserById from '../services/users/updateUserById.js';// Import updateUserById function
import deleteUserById from '../services/users/deleteUserById.js';// Import deleteUserById function
import jwtAuth from '../utils/middleware/jwtAuth.js';// Import JWT authentication middleware
const router = express.Router();

// Initialize Sentry
Sentry.init({
    dsn: "https://85c24d1b85af39b1c862c23cdb902af4@o4509004034473984.ingest.de.sentry.io/4509004071829584",
    
  });

// Middleware to handle Sentry errors
router.use(Sentry.Handlers.requestHandler());
router.use(Sentry.Handlers.errorHandler());


///users: GET (Fetch all users and their information)s listing.
router.get("/", async (_, res) => {
     try {
        const usersData = await getUsers();
        res.status(200).json(usersData);
     }  catch (error) {
        Sentry.captureException(error);
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Error fetching users" });
     }
});

//POST -> (Create a new user)(payload)
router.post('/', jwtAuth, (req, res) => {
try {
   const { name, email, password } = req.body;
   const newUser = createUser(name, email, password);
   res.status(201).json(newUser);

} catch (error) {
   Sentry.captureException(error);
   console.error("Error creating user:", error);
   res.status(500).json({ message: "Error creating user" });
}
});

///users/:id: GET (Fetch a single user)
router.get('/:id', async (req, res) => {
   try {
      const { id } = req.params;
      const usersData = await getUserById(id);
      if (!usersData) {
         return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(usersData); 
      
   } catch (error) {
      Sentry.captureException(error);
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Error fetching user" });
   }
});

//PUT (Update a user by id)
router.put('/:id', jwtAuth, (req, res) => {
try {
   const { id } = req.params;
   const { name, email, password } = req.body;
   const usersData = updateUserById(id, name, email, password);
   res.status(200).json(usersData);
} catch (error) {
   Sentry.captureException(error);
   console.error("Error updating user:", error);
   res.status(500).json({ message: "Error updating user" });
}
});

//DELETE (Remove a user by id)
router.delete('/:id', jwtAuth, (req,res) => {
   try {
      const { id } = req.params;
      const result = deleteUserById(id);

      if (!result) {
         return res.status(404).json({ message: "User not found" });
      } else {
         res.status(200).json({ message: "User deleted successfully" });
      }
   } catch (error) {
      Sentry.captureException(error);
      console.error("Error deleting user:", error);
      res.status(500).json({ message: "Error deleting user" });
   }
});

    export default router;