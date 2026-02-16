import express from "express";
import {
  renderHome,
  renderClientsList,
  renderClientDetails,
  apiGetClients,
  apiGetClientById
} from "../controllers/clientController.js";

const router = express.Router();

// SSR routes
router.get("/", renderHome);
router.get("/clients", renderClientsList);
router.get("/clients/:id", renderClientDetails);

// API routes (AngularJS-ready)
router.get("/api/clients", apiGetClients);
router.get("/api/clients/:id", apiGetClientById);

export default router;
