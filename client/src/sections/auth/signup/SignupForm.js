import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { ToastContainer, toast } from 'react-toastify';
import Web3 from 'web3';
import 'react-toastify/dist/ReactToastify.css';
// components
import Iconify from '../../../components/iconify';
import { ContextState } from '../../../Context/Provider';

// Initialize web3.js
const web3 = new Web3();


// ----------------------------------------------------------------------

export default function SignupForm() {

    const address = web3.eth.accounts.create();
    const addr =address.address;
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    const {user} = ContextState();
    console.log(user);

    const handleClick = () => {
        navigate('/dashboard', { replace: true });
    };

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cnfPassword, setCnfPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    // const toast = useToast();

    const submitHandler = async () => {
        setIsLoading(true);
        console.log(name);
        console.log(email);
        console.log(password);
        console.log(cnfPassword);

        if (!email || !password || !cnfPassword || !name) {
            toast.warn("Please Fill All the fields", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            setIsLoading(false);
            return;
        }
        if (password !== cnfPassword){
            toast.warn("Passwords do not match", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            setIsLoading(false);
            return;
        }

        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            }
            const { data } = await axios.post('http://localhost:4000/api/users/register', {
                name,
                email,
                password,
                addr
            }, config);

            console.log(data);

            // setEmail('');
            // setPassword('');

            localStorage.setItem('userToken', data.token);
            setIsLoading(false);
            // navigate('/user/activity')
            navigate('/dashboard')
        } catch (error) {
            toast.error("Error Occured!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            setIsLoading(false);
        }
    }

    return (
        <>
            <Stack spacing={3}>
            <ToastContainer />
                <TextField name="name" label="Enter name" onChange={(e) => setName(e.target.value)} />
                <TextField name="email" label="Email address" onChange={(e) => setEmail(e.target.value)} />

                <TextField
                    name="password"
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <TextField
                    name="cnfPassword"
                    type='password'
                    label="Confirm Password"
                    onChange={(e) => setCnfPassword(e.target.value)}
                />
            </Stack>

            <Stack direction="row" alignItems="right" justifyContent="space-between" sx={{ my: 2 }}>
                <Link variant="subtitle2" underline="hover">
                    Forgot password?
                </Link>
            </Stack>

            <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isLoading} onClick={submitHandler}>
                Sign Up
            </LoadingButton>
        </>
    );
}