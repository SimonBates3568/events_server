import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import usersRouter from "./routes/users.js"; // Import users router
import eventsRouter from "./routes/events.js"; // Import events router
import * as Sentry from '@sentry/node';
import log from "./utils/middleware/logMiddleware.js"; // Import logging middleware
import categoriesRouter from "./routes/categories.js"; // Import categories router
import loginRouter from "./routes/jwtLogin.js"; // Import login router

const app = express();


// Initialize Sentry for error tracking
Sentry.init({
  dsn: "https://85c24d1b85af39b1c862c23cdb902af4@o4509004034473984.ingest.de.sentry.io/4509004071829584",
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Sentry.Integrations.Express({ app }),
    // Automatically instrument Node.js libraries and frameworks
    ...Sentry.autoDiscoverNodePerformanceMonitoringIntegrations(),
  ],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

dotenv.config(); // Load environment variables from .env file


/// MIDDLEWARE
app.use(Sentry.Handlers.requestHandler());// Request handler for Sentry
app.use(Sentry.Handlers.tracingHandler());// Tracing handler for Sentry
app.use(cors());// Enable CORS for all origins
app.use(express.json());// Parse incoming JSON requests
app.use(log);// Log requests and responses


/// ROUTES
app.use('/users', usersRouter); // Use users router for /users endpoint)
app.use('/events', eventsRouter); // Use events router for /events endpoint
app.use('/categories', categoriesRouter ); // Use categories router for /categories endpoint
app.use('/login', loginRouter);// Handle requests to /login

app.get("/", (_, res) => {
  res.send("Hello world!");
});

// The error handler must be before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler());

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
