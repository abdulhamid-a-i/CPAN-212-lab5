import { randomUUID } from "crypto";
import { readIndex, writeIndex, deleteIndex } from "../utils/fileStore.js";
import { todayKeyLocal } from "../utils/time.js";


export async function createClient(data) {
  const clients = await readIndex();
  const client = {
    id: randomUUID(),
    ...data,
    createdDate: todayKeyLocal()
  };
  clients.push(client);
  await writeIndex(clients);
  return client;
}

export async function updateClient(id, data){
    const clients = await readIndex();
    const idx = clients.findIndex((i) => String(i.id) === String(id));
    clients[idx].fullName = data.fullName;
    clients[idx].email = data.email;
    clients[idx].riskCategory = data.riskCategory;
    await writeIndex(clients);
    return clients[idx];
}

  export async function deleteClientById(id){
    const clients = await readIndex()
    if (id < 0) return null;
    const updatedClients = clients.filter(d => d.id !== id);
    await deleteIndex(updatedClients);
    return {ok: true}
  }

