import express from "express";
import {
  renderHome,
  renderClientsList,
  renderClientDetails,
  apiGetClients,
  apiGetClientById,
  renderClientEditDetails,
  renderClientCreation
} from "../controllers/clientController.js";
import { createClient } from "../data/clients.store.js";

const router = express.Router();

// SSR routes
router.get("/", renderHome);
router.get("/clients", renderClientsList);
router.get("/clients/:id", renderClientDetails);
router.get("/edit/:id", renderClientEditDetails);
router.get("/create", renderClientCreation);

// Submit routes
router.post("/", async (req, res) =>{
  console.log(
    req.body
  )
  const client = await createClient(req.body);
  res.status(201).json(client);
})

// API routes (AngularJS-ready)
router.get("/api/clients", apiGetClients);
router.get("/api/clients/:id", apiGetClientById);

export default router;
