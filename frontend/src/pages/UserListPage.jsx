import React, { useState } from 'react';
import { Box, Stack, Button, Alert, Paper } from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import PageContainer from '../components/layout/PageContainer';
import SearchBar from '../components/common/SearchBar';
import FilterPopup from '../components/common/FilterPopup';
import UserTable from '../components/user/UserTable';
import PaginationBar from '../components/user/PaginationBar';
import UserFormDialog from '../components/user/UserFormDialog';
import ConfirmDialog from '../components/common/ConfirmDialog';
import useUsers from '../hooks/useUsers';
import { useNotify } from '../context/SnackbarContext';
import { createUser, updateUser, deleteUser } from '../api/userApi';
const UserListPage = () => {
  const {
    users,
    pagination,
    loading,
    error,
    filters,
    sortBy,
    sortOrder,
    goToPage,
    changePageSize,
    applyFilters,
    applySearch,
    toggleSort,
    refresh,
  } = useUsers();
  const notify = useNotify();

  const [formOpen, setFormOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [saving, setSaving] = useState(false);

  const [userToDelete, setUserToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const openAddForm = () => {
    setEditingUser(null);
    setFormOpen(true);
  };

  const openEditForm = (user) => {
    setEditingUser(user);
    setFormOpen(true);
  };

  const closeForm = () => setFormOpen(false);

  const handleFormSubmit = async (values) => {
    setSaving(true);
    try {
      if (editingUser) {
        await updateUser(editingUser._id, values);
        notify.success('User updated successfully');
      } else {
        await createUser(values);
        notify.success('User added successfully');
      }
      setFormOpen(false);
      refresh();
    } catch (err) {
      notify.error(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteConfirm = async () => {
    setDeleting(true);
    try {
      await deleteUser(userToDelete._id);
      notify.success('User deleted successfully');
      setUserToDelete(null);
      refresh();
    } catch (err) {
      notify.error(err.message);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <PageContainer>
      <Paper variant="outlined" sx={{ p: { xs: 2, md: 3 }, borderRadius: 3 }}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          alignItems={{ xs: 'stretch', sm: 'center' }}
          justifyContent="space-between"
          mb={3}
        >
          <Box display="flex" gap={1} flex={1}>
            <SearchBar onSearch={applySearch} />
            <FilterPopup filters={filters} onApply={applyFilters} />
          </Box>
          <Button
            variant="contained"
            startIcon={<AddRoundedIcon />}
            onClick={openAddForm}
            sx={{ whiteSpace: 'nowrap' }}
          >
            Add User
          </Button>
        </Stack>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <UserTable
          users={users}
          loading={loading}
          sortBy={sortBy}
          sortOrder={sortOrder}
          onSort={toggleSort}
          onEdit={openEditForm}
          onDelete={setUserToDelete}
        />

        {!loading && users.length > 0 && (
          <PaginationBar
            pagination={pagination}
            onPageChange={goToPage}
            onPageSizeChange={changePageSize}
          />
        )}
      </Paper>

      <UserFormDialog
        open={formOpen}
        user={editingUser}
        saving={saving}
        onClose={closeForm}
        onSubmit={handleFormSubmit}
      />

      <ConfirmDialog
        open={Boolean(userToDelete)}
        title="Delete this user?"
        description={
          userToDelete
            ? `This will permanently remove ${userToDelete.firstName} ${userToDelete.lastName} from the list. This action cannot be undone.`
            : ''
        }
        confirmLabel="Delete"
        loading={deleting}
        onClose={() => setUserToDelete(null)}
        onConfirm={handleDeleteConfirm}
      />
    </PageContainer>
  );
};

export default UserListPage;
