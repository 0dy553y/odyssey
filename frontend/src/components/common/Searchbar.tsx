import React, { useState } from 'react';
import InputBase from '@mui/material/InputBase';
import { styled, alpha } from '@mui/material/styles';
import { ReactComponent as SearchIcon } from '../../assets/icons/search-icon.svg';

interface SearchbarProps {
  placeholder: string;
}

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: 40,
  margin: '2em 0 2em 0',
  backgroundColor: alpha(theme.palette.common.white, 1),
  //'&:focus': {
  //  backgroundColor: alpha(theme.palette.common.black, 0.25),
  //},
  width: '100%',
  textAlign: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '70%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1.5, 0, 1.5, 0),
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const Searchbar: React.FC<SearchbarProps> = (props) => {
  const { placeholder } = props;
  const [filter, setFilter] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<any>) => {
    console.log(e.target.value);
    setFilter(e.target.value);
  };

  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        onChange={handleSearchChange}
        placeholder={placeholder}
        inputProps={{ 'aria-label': 'search' }}
      />
    </Search>
  );
};

export default Searchbar;
