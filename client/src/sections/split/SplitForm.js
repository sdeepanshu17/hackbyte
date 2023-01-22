import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link, Stack, MenuItem, FormControl, InputLabel, Select, Box, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { ToastContainer, toast } from 'react-toastify';
import { ethers } from 'ethers';
import web3 from 'web3';
import { ContextState } from '../../Context/Provider';
import 'react-toastify/dist/ReactToastify.css';

// ----------------------------------------------------------------------

export default function SplitForm({ state }) {
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
      toast.warn('Please Fill All the fields', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
      setIsLoading(false);
    }
    try {
      console.log(friend);
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authentication: `Bearer ${localStorage.getItem('userToken')}`,
        },
      };

      const { data } = await axios.post('http://localhost:4000/api/users/getuser', { email: friend }, config);
      console.log(data);

      const { provider, signer, contract } = state;
      console.log(state);
      // const rec=document.getElementById('reciever').value
      // const amount=document.getElementById('amount').value
      // const address = web3.eth.accounts.create();
      const v = { value: ethers.utils.parseEther(amount) };
      console.log(v);
      // console.log(data.user.addr);
      toast.warn('Please accept transaction from your MetaMask account', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
      const transaction = await contract.sendBal(data.user.addr, v);
      await transaction.wait();
      toast.success('Transaction Successful!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
      console.log('Done');
    } catch (error) {
      toast.error('Error Occured!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
      console.log(error);
    }
  };

  return (
    <>
      <Stack spacing={3}>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Friend Name</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={friend}
              label="Friend Name"
              onChange={handleSelectChange}
            >
              {userFriends &&
                userFriends.map((userFriend) => (
                  <MenuItem key={userFriend._id} value={userFriend.email}>
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
