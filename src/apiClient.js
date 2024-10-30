import axios from "axios";
const url = 'https://todos-backend-vsjt.onrender.com/todos'

//"http://localhost:3001/";

export class ApiClient {
  constructor(tokenProvider, logoutHandler) {
    this.tokenProvider = tokenProvider;
    this.logoutHandler = logoutHandler;
  }

  apiCall(method, url, data, params) {
    return axios({
      method,
      url,
      data,
    })
  }

  getTodos() {
    return this.apiCall("get", url);
  }

  addTodo(title, description, dueDate) {
    return this.apiCall("post", url, {title, description, dueDate });
  }

  editTodo(id, title, description, dueDate, completed) {
    return this.apiCall("put", `${url}/${id}`, { title, description, dueDate, completed});
  }

  removeTodo(id) {
    return this.apiCall("delete", `${url}/${id}`);
  }

  searchTodos(searchterm) {
    return this.apiCall("get", `${url}/search`,"",{query:`${searchterm}`});
  }

  addTag(id, tag) {
    return this.apiCall("patch", `${url}/${id}/tags`, {tag})
  }
}
