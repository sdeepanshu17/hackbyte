import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Iconify from '../../components/iconify';
import { ContextState } from '../../Context/Provider';


// ----------------------------------------------------------------------

export default function TransferForm() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/dashboard', { replace: true });
  };

  const {userToken} = ContextState();

    const [email, setEmail] = useState('');
    const [amount, setAmount] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    // const toast = useToast();

    const submitHandler = async () => {
        setIsLoading(true);
        if ( !email || !amount || amount<=0) {
            setIsLoading(false);
            return;
        }
        
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            }
            const {data} = await axios.post('http://localhost:4000/api/expense/transfer', {
                amount,
                
            }, config);

            if(data){
                setIsLoading(false);
                navigate('/dashboard', { replace: true });
            }

        } catch (error) {
            setIsLoading(false);
        }

    }

  return (
    <>
      <Stack spacing={3}>
        <TextField name="email" label="Email address" onChange={(e)=>setEmail(e.target.value)} />
        <TextField name="amount" type={"number"} label="Enter Amount" onChange={(e)=>setAmount(e.target.value)} />
      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={()=>submitHandler()}>
        Transfer Money
      </LoadingButton>
      </Stack>
    </>
  );
}