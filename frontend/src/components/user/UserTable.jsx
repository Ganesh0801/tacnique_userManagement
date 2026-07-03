import React from 'react';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableSortLabel,
  TableContainer,
  Paper,
} from '@mui/material';
import UserTableRow from './UserTableRow';
import Loader from '../common/Loader';
import EmptyState from '../common/EmptyState';

const COLUMNS = [
  { key: 'id', label: 'ID', sortable: false },
  { key: 'firstName', label: 'Name', sortable: true },
  { key: 'email', label: 'Email', sortable: true },
  { key: 'department', label: 'Department', sortable: true },
  { key: 'actions', label: '', sortable: false },
];

const UserTable = ({ users, loading, sortBy, sortOrder, onSort, onEdit, onDelete }) => {
  if (loading) return <Loader label="Fetching users..." />;
  if (!users.length) return <EmptyState />;

  return (
    <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: 3 }}>
      <Table>
        <TableHead>
          <TableRow>
            {COLUMNS.map((col) => (
              <TableCell key={col.key} align={col.key === 'actions' ? 'right' : 'left'}>
                {col.sortable ? (
                  <TableSortLabel
                    active={sortBy === col.key}
                    direction={sortBy === col.key ? sortOrder : 'asc'}
                    onClick={() => onSort(col.key)}
                  >
                    {col.label}
                  </TableSortLabel>
                ) : (
                  col.label
                )}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <UserTableRow key={user._id} user={user} onEdit={onEdit} onDelete={onDelete} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserTable;
