import api from "./apiService";

const searchCpv = (key) => api.get("search/" + key);

const getCpv = (id) => api.get("tree/" + id);

export { searchCpv, getCpv };
