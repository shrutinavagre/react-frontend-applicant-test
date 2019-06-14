import http from "./httpServices";

let apiEndPoint = " https://jsonplaceholder.typicode.com/users";

export function getUsers() {
  return http.get(apiEndPoint);
}
