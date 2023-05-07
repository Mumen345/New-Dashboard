import http from "./http";

export const getUsers = () => {
  return http.get("/users?deleted=False");
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

// Gets a single user information
export const userDetailsQuery = (user) => {
   return http.get(`/user/${user}`);
} 

// Gets a single user profile data
export const userProfileDetailsQuery = (user) => {
  return http.get(`/userprofile/${user}/?is_userid=true`);
} 

// Gets a single user information
export const dashboardQuery = () => {
   return http.get('/dashboard');
}

// Gets a single user information
export const journeysQuery = () => {
   return http.get('/trip/journey');
}

// approve organization
export const approveOrgQuery = (org) => {
  return http.post('/approveorganization', {'organizationid':`${org}`});
}

// Get biometrics
export const getBiometrics = () => {
  return http.get('/biometric');
}

// Get public onboarding data
export const getPublicOnboarding = () => {
  return http.get('/public_onboarding');
}