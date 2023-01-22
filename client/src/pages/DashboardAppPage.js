import axios from 'axios';
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// components
import Iconify from '../components/iconify';
// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from '../sections/@dashboard/app';
import { ContextState } from '../Context/Provider';

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const theme = useTheme();

  const { user, userToken } = ContextState()
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getTransactions = async () => {
    setIsLoading(true);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userToken}`
        }
      }
      const { data } = await axios.get('http://localhost:4000/api/expense/transactions', config);

      if (data) {
        // console.log(data.transaction);
        setTransactions(data.transaction);
        setIsLoading(false);

      } else {
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }

  }

  // console.log(isLoading);
  // console.log(transactions);

  useEffect(() => {
    getTransactions();
  }, [])


  return (
    <>
      <Helmet>
        <title> Dashboard | Minimal UI </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={6}>
            <AppWidgetSummary title="Amount in Wallet" total={user?.balance} icon={'ant-design:android-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <AppWidgetSummary title="New Users" total={1352831} color="info" icon={'ant-design:apple-filled'} />
          </Grid>

          <Grid item xs={12} md={12} lg={12}>
            {
              isLoading ? <div>Loading...</div> : (
                <>
                  <AppNewsUpdate
                    title="Transactions"
                    list={transactions?.map((item, index) => ({
                      id: item._id,
                      title: item.message,
                      description: `From : ${item.from.name} - TO: ${item.to.name}`,
                      image: `/assets/images/covers/cover_${index + 1}.jpg`,
                      amount:item.amount,
                      postedAt: item.createdAt,
                    }))}
                  />
                </>
              )
            }
          </Grid>

        </Grid>
      </Container>
    </>
  );
}