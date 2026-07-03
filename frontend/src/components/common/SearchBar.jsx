import React, { useEffect, useState } from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import useDebounce from '../../hooks/useDebounce';

/**
 * Free-text search box. Debounces internally and only calls onSearch once
 * the user pauses typing, so the parent never has to manage a timer.
 */
const SearchBar = ({ onSearch, placeholder = 'Search users by name, email or department...' }) => {
  const [value, setValue] = useState('');
  const debouncedValue = useDebounce(value, 400);

  useEffect(() => {
    onSearch(debouncedValue.trim());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

  return (
    <TextField
      fullWidth
      size="small"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder={placeholder}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon fontSize="small" color="action" />
          </InputAdornment>
        ),
        endAdornment: value && (
          <InputAdornment position="end">
            <IconButton size="small" onClick={() => setValue('')} edge="end">
              <ClearIcon fontSize="small" />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchBar;
