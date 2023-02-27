import http from './http'


export const getUsers  = () => {
   return http.get('/users')
}

export const getOrganizations  = () => {
   return http.get('/organizations')
}
