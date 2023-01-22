import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { ethers } from 'ethers';
import web3 from 'web3';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LoadingButton } from '@mui/lab';
import Iconify from '../../components/iconify';

// ----------------------------------------------------------------------

export default function SplitForm({state}) {
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
          toast.warn("Please Fill All the fields", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
            setIsLoading(false);
        }
        try {
          const config = {
            headers: {
              'Content-Type': 'application/json',
              Authentication: `Bearer ${localStorage.getItem('userToken')}`,
            },
            };
          const { data } = await axios.post("http://localhost:4000/api/users/getuser", { email });
          console.log(data);
          const {provider, signer, contract} = state
          console.log(state);
          // const rec=document.getElementById('reciever').value
          // const amount=document.getElementById('amount').value
          // const address = web3.eth.accounts.create();
          const v = {value:ethers.utils.parseEther(amount)};
          console.log(v);
          console.log(data.user.addr);
          toast.warn("Please accept transaction from your MetaMask account", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          const transaction = await contract.sendBal(data.user.addr,v);
          await transaction.wait()
          toast.success("Transaction Successful!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          console.log("Done")
        } catch (error) {
          toast.error("Error Occured!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          console.log(error);
        }

    }

  return (
    <>
      <Stack spacing={3}>
      <ToastContainer />
        <TextField name="email" label="Email address" id="email" onChange={(e)=>setEmail(e.target.value)} />
        <TextField name="amount" type={"number"} label="Enter Amount" onChange={(e)=>setAmount(e.target.value)} />
      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={()=>submitHandler()}>
        Send Money
      </LoadingButton>
      </Stack>
    </>
  );
}