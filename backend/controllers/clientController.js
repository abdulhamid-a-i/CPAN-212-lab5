import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// ES module __dirname replacement (for controllers folder)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const loadClients = () => {
  const dataPath = path.join(__dirname, "..", "data", "clients.json");
  const raw = fs.readFileSync(dataPath, "utf-8");
  const parsed = JSON.parse(raw);
  return Array.isArray(parsed) ? parsed : [];
};

const findClientById = (clients, id) =>
  clients.find(c => String(c.id) === String(id));

// SSR: Home
export const renderHome = (req, res) => {
  res.render("pages/home", {
    pageTitle: "Home",
    message:
      "This portal demonstrates dynamic server-side rendering using EJS layouts and partials. JSON APIs are available for an AngularJS frontend that will be added later.",
    now: new Date().toLocaleString()
  });
};

// SSR: Clients list
export const renderClientsList = (req, res) => {
  const clients = loadClients();

  res.render("pages/clients", {
    pageTitle: "Clients",
    clients,
    totalClients: clients.length,
    now: new Date().toLocaleString()
  });
};

// SSR: Client details
export const renderClientDetails = (req, res) => {
  const clients = loadClients();
  const client = findClientById(clients, req.params.id);
  if (!client) {
    return res.status(404).render("pages/home", {
      pageTitle: "Client Not Found",
      message: `No client record found for id: ${req.params.id}`,
      now: new Date().toLocaleString()
    });
  }
  
  console.log("client keys:", Object.keys(client || {}));

  res.render("pages/clientDetails", {
    pageTitle: "Client Profile",
    client,
    now: new Date().toLocaleString()
  });
};

// API: all clients
export const apiGetClients = (req, res) => {
  const clients = loadClients();
  res.json({ total: clients.length, clients });
};

// API: client by id
export const apiGetClientById = (req, res) => {
  const clients = loadClients();
  const client = findClientById(clients, req.params.id);

  if (!client) {
    return res.status(404).json({ error: "Client Not Found", id: req.params.id });
  }

  res.json({ client });
};
