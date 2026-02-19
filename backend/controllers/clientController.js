import fs from "fs";

import { PATHS, RISKCATEGORIES } from "../config.js";

// ES module __dirname replacement (for controllers folder)


const loadClients = () => {
  const dataPath = PATHS.DATA_PATH
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

// SSR: Client details (Using the term client causes a problem.)
export const renderClientDetails = (req, res) => {
  const clients = loadClients();
  const r_client = findClientById(clients, req.params.id);
  if (!r_client) {
    return res.status(404).render("pages/home", {
      pageTitle: "Client Not Found",
      message: `No client record found for id: ${req.params.id}`,
      now: new Date().toLocaleString(),
    });
  }
  
  console.log("client keys:", Object.keys(r_client || {}));

  res.render("pages/clientDetails", {
    pageTitle: "Client Profile",
    r_client,
    now: new Date().toLocaleString(),
  });
};

export const renderClientEditDetails = (req, res) => {
  const clients = loadClients();
  const r_client = findClientById(clients, req.params.id);
  if (!r_client) {
    return res.status(404).render("pages/home", {
      pageTitle: "Client Not Found",
      message: `No client record found for id: ${req.params.id}`,
      now: new Date().toLocaleString(),
    });
  }
  
  console.log("client keys:", Object.keys(r_client || {}));

  res.render("pages/edit", {
    pageTitle: "Edit Client Profile",
    r_client,
    riskCategories: RISKCATEGORIES,
    isEditing: true,
    form_action: "/clients/:id/edit",
    form_method: 'PATCH',
    now: new Date().toLocaleString(),
  });
};

// SSR Client details Create page
export const renderClientCreation = (req, res) => {

  res.render("pages/creation", {
    pageTitle: "Client Profile Creation",
    r_client: {},
    riskCategories: RISKCATEGORIES,
    form_action: "/",
    form_method: 'POST',
    now: new Date().toLocaleString(),
    isEditing: false
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
  const r_client = findClientById(r_clients, req.params.id);

  if (!r_client) {
    return res.status(404).json({ error: "Client Not Found", id: req.params.id });
  }

  res.json({ r_client });
};
