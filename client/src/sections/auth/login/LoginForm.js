import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';


// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const handleClick = () => {
    navigate('/dashboard', { replace: true });
  };

  const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    // const toast = useToast();

    const submitHandler = async () => {
        setIsLoading(true);
        if (!email || !password) {
            // toast({
            //     title: 'Alert',
            //     description: "Email and Passoword Required!!",
            //     status: 'error',
            //     position: 'bottom-right',
            //     variant: 'subtle',
            //     duration: 3000,
            //     isClosable: true,
            // });
            setIsLoading(false);
            return;
        }

        try {

            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            }
            const { data } = await axios.post('http://localhost:4000/api/users/login', {
                email,
                password
            }, config);

            console.log(data);

            setEmail('');
            setPassword('');

            localStorage.setItem('userToken', data.token);
            setIsLoading(false);
            navigate('/dashboard', { replace: true });
            // navigate('/user/activity')
        } catch (error) {
            // toast({
            //     title: 'Error',
            //     description: "Enter valid Email OR Password",
            //     status: 'error',
            //     position: 'bottom-right',
            //     variant: 'subtle',
            //     duration: 3000,
            //     isClosable: true,
            // });
            setEmail("")
            setPassword("")
            setIsLoading(false);
        }
    }

  return (
    <>
      <Stack spacing={3}>
        <TextField name="email" label="Email address" onChange={(e)=>setEmail(e.target.value)} />

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
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Checkbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={()=>submitHandler()}>
        Login
      </LoadingButton>
    </>
  );
}