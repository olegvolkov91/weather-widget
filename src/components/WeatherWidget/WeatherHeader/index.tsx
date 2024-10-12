import { Box } from '@mui/material';

import { DEFAULT_DATE } from '@/constants';

import DayName from '../DayName';
import { StyledTypogrpahy } from './styles';

type Props = {
  dataTestId: string;
  name: string;
  country: string;
  date?: string;
};

const WeatherHeader: React.FC<Props> = ({
  dataTestId,
  name,
  country,
  date = DEFAULT_DATE,
}) => (
  <Box data-testid={dataTestId} mb={2} textAlign="center">
    <StyledTypogrpahy variant="h6">
      {name}, {country}
    </StyledTypogrpahy>
    <DayName
      dataTestId="weather-header-day"
      date={date}
      styles={{ fontSize: '12px', marginTop: '4px' }}
      dateFormat="EEEE, MMM d"
    />
  </Box>
);

export default WeatherHeader;
