import React from 'react';
import { Box, Stack, Typography, Pagination, Select, MenuItem, FormControl } from '@mui/material';
import { PAGE_SIZE_OPTIONS } from '../../utils/constants';

const PaginationBar = ({ pagination, onPageChange, onPageSizeChange }) => {
  const { page, limit, totalCount, totalPages } = pagination;

  const rangeStart = totalCount === 0 ? 0 : (page - 1) * limit + 1;
  const rangeEnd = Math.min(page * limit, totalCount);

  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      justifyContent="space-between"
      alignItems="center"
      spacing={2}
      mt={2}
    >
      <Typography variant="body2" color="text.secondary">
        Showing {rangeStart}-{rangeEnd} of {totalCount} users
      </Typography>

      <Stack direction="row" spacing={2} alignItems="center">
        <Box display="flex" alignItems="center" gap={1}>
          <Typography variant="body2" color="text.secondary">
            Rows per page
          </Typography>
          <FormControl size="small">
            <Select value={limit} onChange={(e) => onPageSizeChange(Number(e.target.value))}>
              {PAGE_SIZE_OPTIONS.map((size) => (
                <MenuItem key={size} value={size}>
                  {size}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Pagination
          page={page}
          count={totalPages}
          onChange={(_, value) => onPageChange(value)}
          color="primary"
          shape="rounded"
        />
      </Stack>
    </Stack>
  );
};

export default PaginationBar;
