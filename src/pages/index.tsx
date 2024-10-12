import { Box } from '@mui/material';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import WidgetWrapper from '@/components/WeatherWidget';
import { WeatherProvider } from '@/providers/WeatherProvider';

const Home: React.FC = () => (
  <Box>
    <WeatherProvider>
      <WidgetWrapper />
    </WeatherProvider>
    <ToastContainer />
  </Box>
);

export default Home;
