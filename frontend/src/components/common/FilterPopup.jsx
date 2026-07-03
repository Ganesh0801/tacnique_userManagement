import React, { useState } from 'react';
import {
  Popover,
  Box,
  Stack,
  TextField,
  Button,
  Typography,
  Badge,
  IconButton,
  Tooltip,
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import { EMPTY_FILTERS } from '../../utils/constants';

const FilterPopup = ({ filters, onApply }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [draft, setDraft] = useState(filters);

  const activeCount = Object.values(filters).filter(Boolean).length;

  const open = Boolean(anchorEl);

  const handleOpen = (e) => {
    setDraft(filters);
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => setAnchorEl(null);

  const handleChange = (field) => (e) => setDraft((prev) => ({ ...prev, [field]: e.target.value }));

  const handleApply = () => {
    onApply(draft);
    handleClose();
  };

  const handleClear = () => {
    setDraft(EMPTY_FILTERS);
    onApply(EMPTY_FILTERS);
    handleClose();
  };

  return (
    <>
      <Tooltip title="Filter users">
        <IconButton onClick={handleOpen} color={activeCount ? 'primary' : 'default'}>
          <Badge badgeContent={activeCount} color="primary">
            <FilterListIcon />
          </Badge>
        </IconButton>
      </Tooltip>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Box p={2.5} width={300}>
          <Typography variant="subtitle1" gutterBottom>
            Filter Users
          </Typography>
          <Stack spacing={2} mt={1}>
            <TextField
              label="First Name"
              size="small"
              fullWidth
              value={draft.firstName}
              onChange={handleChange('firstName')}
            />
            <TextField
              label="Last Name"
              size="small"
              fullWidth
              value={draft.lastName}
              onChange={handleChange('lastName')}
            />
            <TextField
              label="Email"
              size="small"
              fullWidth
              value={draft.email}
              onChange={handleChange('email')}
            />
            <TextField
              label="Department"
              size="small"
              fullWidth
              value={draft.department}
              onChange={handleChange('department')}
            />
          </Stack>
          <Stack direction="row" spacing={1} justifyContent="flex-end" mt={3}>
            <Button size="small" color="inherit" onClick={handleClear}>
              Clear
            </Button>
            <Button size="small" variant="contained" onClick={handleApply}>
              Apply
            </Button>
          </Stack>
        </Box>
      </Popover>
    </>
  );
};

export default FilterPopup;
