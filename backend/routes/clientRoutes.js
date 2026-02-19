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
import { findById,createClient, deleteClientById, updateClient } from "../data/clients.store.js";
import { validateCreateClient, validateUpdate } from "../utils/validators.js";


const router = express.Router();

// SSR routes
router.get("/", renderHome);
router.get("/clients", renderClientsList);
router.get("/clients/:id", renderClientDetails);
router.get("/edit/:id", renderClientEditDetails);
router.get("/create", renderClientCreation);

// Submit routes
router.post("/", async (req, res) =>{
  const result = await validateCreateClient(req.body);
  if(!result.ok){
    return res.status(400).json({ error: result.errors });
  } 
  const client = await createClient(result.value);
  res.status(201).json(client);
})

router.patch("/clients/:id/edit", async (req, res) =>{
  const client = await findById(req.params.id);
  if (!client) return res.status(404).json({ error: "Client not found" });

    const result = await validateUpdate(req.body);
  if(!result.ok){
    return res.status(400).json({ error: result.errors });
  } 

  const updated = await updateClient(req.body.id , req.body);
  res.status(200).json({ok: true, updated});
})

router.delete("/clients/:id", async (req, res) => {
  const client = await findById(req.params.id);
  if (!client) return res.status(404).json({ error: "Client not found" });

  await deleteClientById(req.body.id);
  res.status(200).json({ok: true, deleted:'deleted'})
})

// API routes (AngularJS-ready)
router.get("/api/clients", apiGetClients);
router.get("/api/clients/:id", apiGetClientById);

export default router;
