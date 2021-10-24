import React, { useEffect, useState } from 'react';
import ChevronLeft from '@mui/icons-material/ChevronLeft';
import {
  AppBar,
  Box,
  IconButton,
  InputAdornment,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import { useHistory } from 'react-router-dom';
import api from '../../api';
import { ApiResponse } from '../../types/api';
import { AddFriendListData } from '../../types/friends';
import SearchIcon from '@mui/icons-material/Search';
import AddFriendsList from '../../components/friendsList/AddFriendsList';

const AddFriendsPage: React.FC = () => {
  const history = useHistory();
  const [users, setUsers] = useState<AddFriendListData[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  useEffect(() => {
    if (!searchQuery) {
      setUsers([]);
      return;
    }
    api.friends
      .searchUsersByUsername(searchQuery)
      .then((response: ApiResponse<AddFriendListData[]>) => {
        const users = response.payload.data;
        setUsers(users);
      });
  }, [searchQuery]);

  return (
    <Box sx={{ padding: '2em 1.5em 0 1.5em' }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" onClick={() => history.goBack()}>
            <ChevronLeft />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Typography component="h1" variant="h4" style={{ fontFamily: 'Frock' }}>
        Add friends
      </Typography>
      <TextField
        fullWidth
        placeholder="Search by username"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        onChange={(event) => setSearchQuery(event.target.value)}
      />
      <AddFriendsList users={users} />
    </Box>
  );
};

export default AddFriendsPage;
