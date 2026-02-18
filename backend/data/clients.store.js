


export async function createClient(data) {
  const clients = await readIndex();
  const client = {
    id: randomUUID(),
    ...data,
    createdDate: new Date().getDate
  };
  incidents.push(client);
  await writeIndex(clients);
  return client;
}