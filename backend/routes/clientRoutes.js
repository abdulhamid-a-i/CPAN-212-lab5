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
import { createClient, deleteClientById, updateClient } from "../data/clients.store.js";

const router = express.Router();

// SSR routes
router.get("/", renderHome);
router.get("/clients", renderClientsList);
router.get("/clients/:id", renderClientDetails);
router.get("/edit/:id", renderClientEditDetails);
router.get("/create", renderClientCreation);

// Submit routes
router.post("/", async (req, res) =>{
  const client = await createClient(req.body);
  res.status(201).json(client);
})

router.patch("/clients/:id/edit", async (req, res) =>{
  const updated = await updateClient(req.body.id , req.body);
  res.json({ok: true, updated});
})

router.delete("/clients/:id", async (req, res) => {
  console.log("delete request recieved")
  console.log(req.body.id);
  await deleteClientById(req.body.id);
  res.status(200).json({ok: true, deleted:'deleted'})
})

// API routes (AngularJS-ready)
router.get("/api/clients", apiGetClients);
router.get("/api/clients/:id", apiGetClientById);

export default router;
