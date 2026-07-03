import { useCallback, useEffect, useState } from 'react';
import { fetchUsers } from '../api/userApi';
import { DEFAULT_PAGE_SIZE, EMPTY_FILTERS } from '../utils/constants';

/**
 * Owns every piece of state needed to render the user table: the current
 * page of data, loading/error flags, and the search/filter/sort criteria
 * that drive the API query. Keeping this in one hook means UserListPage
 * stays a thin presentational layer.
 */
const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, limit: DEFAULT_PAGE_SIZE, totalCount: 0, totalPages: 1 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [sortBy, setSortBy] = useState('firstName');
  const [sortOrder, setSortOrder] = useState('asc');

  const loadUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchUsers({
        page: pagination.page,
        limit: pagination.limit,
        search: search || undefined,
        ...filters,
        sortBy,
        sortOrder,
      });
      setUsers(response.data);
      setPagination((prev) => ({ ...prev, ...response.pagination }));
    } catch (err) {
      setError(err.message);
      setUsers([]);
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination.page, pagination.limit, search, filters, sortBy, sortOrder]);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const goToPage = (page) => setPagination((prev) => ({ ...prev, page }));

  const changePageSize = (limit) => setPagination((prev) => ({ ...prev, limit, page: 1 }));

  const applyFilters = (nextFilters) => {
    setFilters(nextFilters);
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const applySearch = (term) => {
    setSearch(term);
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const toggleSort = (field) => {
    if (sortBy === field) {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  return {
    users,
    pagination,
    loading,
    error,
    search,
    filters,
    sortBy,
    sortOrder,
    goToPage,
    changePageSize,
    applyFilters,
    applySearch,
    toggleSort,
    refresh: loadUsers,
  };
};

export default useUsers;
