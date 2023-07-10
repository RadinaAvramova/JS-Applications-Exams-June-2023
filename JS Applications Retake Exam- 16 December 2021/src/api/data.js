import * as api from "./api.js";
const endpoints = {
  allCatalogs: "/data/theaters?sortBy=_createdOn%20desc&distinct=title",
  details: "/data/theaters/",
  onDelete: "/data/theaters/",
  update: "/data/theaters/",
  create: "/data/theaters/",
  profileData: (userId) =>
    `/data/theaters?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`,
};

export async function getAll() {
  return await api.get(endpoints.allCatalogs);
}
export async function getDetails(id) {
  return await api.get(endpoints.details + id);
}

export async function getProfileData(id) {
  return await api.get(endpoints.profileData(id) );
}

export async function deleteDetail(id) {
  return api.del(endpoints.onDelete + id);
}

export async function onUpdate(id, data) {
  return await api.put(endpoints.update + id, data);
}

export async function createOffer(data) {
  return api.post(endpoints.create, data);
}