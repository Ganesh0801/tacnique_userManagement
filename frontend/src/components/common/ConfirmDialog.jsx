import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';

/**
 * Generic yes/no confirmation dialog. Callers control open state and
 * supply the copy + onConfirm handler, keeping this component dumb/reusable.
 */
const ConfirmDialog = ({
  open,
  title = 'Are you sure?',
  description,
  confirmLabel = 'Confirm',
  confirmColor = 'error',
  loading = false,
  onClose,
  onConfirm,
}) => (
  <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
    <DialogTitle>{title}</DialogTitle>
    <DialogContent>
      <DialogContentText>{description}</DialogContentText>
    </DialogContent>
    <DialogActions sx={{ px: 3, pb: 2 }}>
      <Button onClick={onClose} disabled={loading} color="inherit">
        Cancel
      </Button>
      <Button onClick={onConfirm} disabled={loading} color={confirmColor} variant="contained">
        {loading ? 'Please wait...' : confirmLabel}
      </Button>
    </DialogActions>
  </Dialog>
);

export default ConfirmDialog;
