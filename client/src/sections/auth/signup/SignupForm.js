import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';


// ----------------------------------------------------------------------

export default function SignupForm() {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

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
        if (!email || !password) {
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
                password
            }, config);

            console.log(data);

            setEmail('');
            setPassword('');

            localStorage.setItem('userToken', data.token);
            setIsLoading(false);
            // navigate('/user/activity')
            navigate('/dashboard')
        } catch (error) {
            setEmail("")
            setPassword("")
            setIsLoading(false);
        }
    }

    return (
        <>
            <Stack spacing={3}>
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
                    onChange={(e) => setPassword(e.target.value)}
                />
            </Stack>

            <Stack direction="row" alignItems="right" justifyContent="space-between" sx={{ my: 2 }}>
                {/* <Checkbox name="remember" label="Remember me" /> */}
                <Link variant="subtitle2" underline="hover">
                    Forgot password?
                </Link>
            </Stack>

            <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={() => submitHandler()}>
                Login
            </LoadingButton>
        </>
    );
}