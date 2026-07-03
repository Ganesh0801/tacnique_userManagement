import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { EMPTY_USER_FORM } from '../../utils/constants';
import { validateUserForm } from '../../utils/validators';

/**
 * Modal form used for both "Add User" and "Edit User". When `user` is
 * provided the form is pre-filled and submits as an update; otherwise it
 * starts blank and submits as a create.
 */
const UserFormDialog = ({ open, user, onClose, onSubmit, saving }) => {
  const [values, setValues] = useState(EMPTY_USER_FORM);
  const [errors, setErrors] = useState({});
  const isEditMode = Boolean(user);

  useEffect(() => {
    if (open) {
      setValues(
        user
          ? {
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              department: user.department,
            }
          : EMPTY_USER_FORM
      );
      setErrors({});
    }
  }, [open, user]);

  const handleChange = (field) => (e) => {
    setValues((prev) => ({ ...prev, [field]: e.target.value }));
    // Clear the field's error as soon as the user starts fixing it
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = () => {
    const validationErrors = validateUserForm(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      onSubmit(values);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {isEditMode ? 'Edit User' : 'Add New User'}
        <IconButton onClick={onClose} size="small">
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Stack spacing={2.5} mt={0.5}>
          <TextField
            label="First Name"
            fullWidth
            value={values.firstName}
            onChange={handleChange('firstName')}
            error={Boolean(errors.firstName)}
            helperText={errors.firstName}
            autoFocus
          />
          <TextField
            label="Last Name"
            fullWidth
            value={values.lastName}
            onChange={handleChange('lastName')}
            error={Boolean(errors.lastName)}
            helperText={errors.lastName}
          />
          <TextField
            label="Email"
            type="email"
            fullWidth
            value={values.email}
            onChange={handleChange('email')}
            error={Boolean(errors.email)}
            helperText={errors.email}
          />
          <TextField
            label="Department"
            fullWidth
            value={values.department}
            onChange={handleChange('department')}
            error={Boolean(errors.department)}
            helperText={errors.department}
          />
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={onClose} color="inherit" disabled={saving}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" disabled={saving}>
          {saving ? 'Saving...' : isEditMode ? 'Save Changes' : 'Add User'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserFormDialog;
