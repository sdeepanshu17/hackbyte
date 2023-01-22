import { Helmet } from 'react-helmet-async';
// @mui
import { styled } from '@mui/material/styles';
import { Link, Container, Typography, Divider, Stack, Button } from '@mui/material';
// hooks
import { AddFriend } from '../sections/addfriend';
import useResponsive from '../hooks/useResponsive';
// components
import Logo from '../components/logo';
import Iconify from '../components/iconify';
// sections

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  justifyContent: 'center',
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledSection = styled('div')(({ theme }) => ({
  width: '70%',
  // maxWidth: 480,
  borderRadius: 16,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function NewSplit() {
  const mdUp = useResponsive('up', 'md');

  return (
    <>
      <Helmet>
        <title> New Split | SplitIt </title>
      </Helmet>

      <StyledRoot>
        <StyledSection>
          <Container maxWidth="sm">
            <StyledContent>
              <Typography variant="h4" gutterBottom marginBottom={2}>
                Add Friend
              </Typography>
              <AddFriend />
            </StyledContent>
          </Container>
        </StyledSection>
      </StyledRoot>
    </>
  );
}
