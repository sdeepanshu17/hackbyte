import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link, Stack, MenuItem, FormControl, InputLabel, Select, Box, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { ContextState } from '../../Context/Provider';
import SelectForm from './SelectForm';

// ----------------------------------------------------------------------

export default function SplitForm() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/dashboard', { replace: true });
  };

  const handleSelectChange = (event) => {
    setFriend(event.target.value);
  };

  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { user, userToken } = ContextState();
  const [userFriends, setUserFriends] = useState([]);
  const [friend, setFriend] = useState('');

  useEffect(() => {
    const getFriends = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        };
        const { data } = await axios.get('http://localhost:4000/api/users/getfriends', config);
        setUserFriends(data.friends);
      } catch (error) {
        console.log(error.message);
      }
    };
    getFriends();
  }, [userFriends]);

  const submitHandler = async () => {
    setIsLoading(true);
    if (!email || !amount || amount <= 0) {
      setIsLoading(false);
    }

    console.log(friend);
  };

  return (
    <>
      <Stack spacing={3}>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Age</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={friend}
              label="Age"
              onChange={handleSelectChange}
            >
              {userFriends &&
                userFriends.map((userFriend) => (
                  <MenuItem key={user.addr} value={userFriend._id}>
                    {userFriend.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Box>
        <TextField name="amount" type={'number'} label="Enter Amount" onChange={(e) => setAmount(e.target.value)} />
        <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={() => submitHandler()}>
          Split
        </LoadingButton>
      </Stack>
    </>
  );
}
