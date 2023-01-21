import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Iconify from '../../components/iconify';


// ----------------------------------------------------------------------

export default function SplitForm() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/dashboard', { replace: true });
  };

    const [email, setEmail] = useState('');
    const [amount, setAmount] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    // const toast = useToast();

    const submitHandler = async () => {
        setIsLoading(true);
        if (!email || !amount || amount<=0) {
            setIsLoading(false);
        }
    }

  return (
    <>
      <Stack spacing={3}>
        <TextField name="email" label="Email address" onChange={(e)=>setEmail(e.target.value)} />
        <TextField name="amount" type={"number"} label="Enter Amount" onChange={(e)=>setAmount(e.target.value)} />
      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={()=>submitHandler()}>
        Login
      </LoadingButton>
      </Stack>
    </>
  );
}