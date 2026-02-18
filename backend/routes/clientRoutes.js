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
import { createClient, updateClient } from "../data/clients.store.js";

const router = express.Router();

// SSR routes
router.get("/", renderHome);
router.get("/clients", renderClientsList);
router.get("/clients/:id", renderClientDetails);
router.get("/edit/:id", renderClientEditDetails);
router.get("/create", renderClientCreation);

// Submit routes
router.post("/", async (req, res) =>{
  
  console.log("form data recieved")
  const client = await createClient(req.body);
  res.status(201).json(client);
})

router.patch("/clients/:id/edit", async (req, res) =>{
  console.log(req.body)
  const updated = await updateClient(req.body.id , req.body);
  res.json({ok: true, updated});
})

// API routes (AngularJS-ready)
router.get("/api/clients", apiGetClients);
router.get("/api/clients/:id", apiGetClientById);

export default router;
