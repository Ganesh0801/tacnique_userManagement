import axiosInstance from './axiosInstance';

/**
 * Fetch a page of users, applying search, per-field filters and sorting.
 * @param {Object} params - { page, limit, search, firstName, lastName, email, department, sortBy, sortOrder }
 */
export const fetchUsers = async (params) => {
  const { data } = await axiosInstance.get('/users', { params });
  return data; // { success, data: User[], pagination }
};

export const fetchUserById = async (id) => {
  const { data } = await axiosInstance.get(`/users/${id}`);
  return data.data;
};

export const createUser = async (payload) => {
  const { data } = await axiosInstance.post('/users', payload);
  return data.data;
};

export const updateUser = async (id, payload) => {
  const { data } = await axiosInstance.put(`/users/${id}`, payload);
  return data.data;
};

export const deleteUser = async (id) => {
  const { data } = await axiosInstance.delete(`/users/${id}`);
  return data.data;
};
