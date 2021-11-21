import React, { useEffect, useState } from 'react';
import { ReactComponent as BackArrow } from 'assets/icons/arrow-left.svg';
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
import SearchIcon from '@mui/icons-material/SearchRounded';
import AddFriendsList from '../../components/friendsList/AddFriendsList';
import { makeStyles } from '@mui/styles';
import { getUser } from 'store/auth/selectors';
import { useSelector } from 'react-redux';

const useStyles = makeStyles(() => ({
  textField: {
    borderRadius: 25,
    backgroundColor: 'white',
    padding: 10,
    marginTop: 20,
  },
}));

const SearchUsersPage: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();

  const [users, setUsers] = useState<AddFriendListData[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const selfUser = useSelector(getUser)!;

  useEffect(() => {
    if (!searchQuery) {
      setUsers([]);
      return;
    }
    api.friends
      .searchUsersByUsername(searchQuery)
      .then((response: ApiResponse<AddFriendListData[]>) => {
        const users = response.payload.data;
        setUsers(users.filter((user) => user.id !== selfUser.id));
      });
  }, [searchQuery]);

  return (
    <Box sx={{ padding: '2em 1.5em 0 1.5em' }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            style={{ marginLeft: '-1.5em' }}
            edge="start"
            onClick={() => history.goBack()}
          >
            <BackArrow filter="invert(1)" height="1.5em" width="1.5em" />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Typography component="h1" variant="h4" style={{ fontFamily: 'Frock' }}>
        Search Users
      </Typography>
      <TextField
        fullWidth
        placeholder="Search by username"
        className={classes.textField}
        variant="standard"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          disableUnderline: true,
        }}
        onChange={(event) => setSearchQuery(event.target.value)}
      />
      <AddFriendsList users={users} />
    </Box>
  );
};

export default SearchUsersPage;
