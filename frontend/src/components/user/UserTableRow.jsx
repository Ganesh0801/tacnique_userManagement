import React from 'react';
import { TableRow, TableCell, Avatar, Stack, Typography, Chip, IconButton, Tooltip } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const DEPARTMENT_COLORS = {
  engineering: '#4F46E5',
  design: '#DB2777',
  marketing: '#D97706',
  sales: '#0EA5A4',
  hr: '#16A34A',
  finance: '#9333EA',
};

const getInitials = (firstName, lastName) => `${firstName?.[0] ?? ''}${lastName?.[0] ?? ''}`.toUpperCase();

const getDepartmentColor = (department) =>
  DEPARTMENT_COLORS[department?.toLowerCase()] || '#6B7280';

const UserTableRow = ({ user, onEdit, onDelete }) => (
  <TableRow hover>
    <TableCell sx={{ color: 'text.secondary', fontFamily: 'monospace', fontSize: 12 }}>
      {user._id.slice(-6)}
    </TableCell>
    <TableCell>
      <Stack direction="row" spacing={1.5} alignItems="center">
        <Avatar sx={{ width: 32, height: 32, fontSize: 13, bgcolor: getDepartmentColor(user.department) }}>
          {getInitials(user.firstName, user.lastName)}
        </Avatar>
        <Typography variant="body2" fontWeight={600}>
          {user.firstName} {user.lastName}
        </Typography>
      </Stack>
    </TableCell>
    <TableCell>
      <Typography variant="body2" color="text.secondary">
        {user.email}
      </Typography>
    </TableCell>
    <TableCell>
      <Chip
        label={user.department}
        size="small"
        sx={{
          bgcolor: `${getDepartmentColor(user.department)}1A`,
          color: getDepartmentColor(user.department),
        }}
      />
    </TableCell>
    <TableCell align="right">
      <Tooltip title="Edit user">
        <IconButton size="small" onClick={() => onEdit(user)}>
          <EditOutlinedIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Tooltip title="Delete user">
        <IconButton size="small" color="error" onClick={() => onDelete(user)}>
          <DeleteOutlineIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </TableCell>
  </TableRow>
);

export default UserTableRow;
