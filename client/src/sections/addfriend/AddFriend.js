import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Stack, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { ToastContainer, toast } from 'react-toastify';
import { ContextState } from '../../Context/Provider';

// ----------------------------------------------------------------------

export default function AddFriend() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/dashboard', { replace: true });
  };

  const [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState('');

  const { user, userToken } = ContextState();

  const submitHandler = async () => {
    setIsLoading(true);
    if (!email) {
      setIsLoading(false);
    }

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authentication: `Bearer ${userToken}`,
        },
      };
      const { data } = await axios.post('http://localhost:4000/api/users/getuser', { email });
      console.log(data.user);
      const friendId = data.user._id;
      const res = await axios.post('http://localhost:4000/api/users/addfriend', { friendId }, config);
      console.log(res);
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
        <TextField
          name="email"
          type={'email'}
          label="Enter E-mail of Friend"
          onChange={(e) => setEmail(e.target.value)}
        />
        <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={() => submitHandler()}>
          Add Friend
        </LoadingButton>
      </Stack>
    </>
  );
}
