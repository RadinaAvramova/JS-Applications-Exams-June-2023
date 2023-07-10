import * as api from "./api.js";

const endpoints = {
  getCatalogInfo: "/data/albums?sortBy=_createdOn%20desc&distinct=name",
  create: "/data/albums",
  details: "/data/albums/",
  onDel: "/data/albums/",
  update: "/data/albums/",
};

export async function getAll() {
  return api.get(endpoints.getCatalogInfo);
}

export async function toCreate(data) {
  return api.post(endpoints.create, data);
}

export async function onDetails(id) {
  return api.get(endpoints.details + id);
}

export async function onDelete(id) {
  return api.del(endpoints.onDel + id);
}

export async function onUpdate(id, data) {
  return api.put(endpoints.update + id, data);
}