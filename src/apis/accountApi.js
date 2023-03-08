import http from "./http";

export const getUsers = () => {
  return http.get("/users");
};

export const getOrganizations = () => {
  return http.get("/organizations");
};

export const getUsersProfile = () => {
  return http.get("/userprofiles");
};

export const getDrivers = () => {
  return http.get("/drivers");
};

export const getNetworks = () => {
  return http.get("/networks");
}
