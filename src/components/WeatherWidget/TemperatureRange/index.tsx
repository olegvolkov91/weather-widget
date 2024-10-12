import { Box } from '@mui/material';

import { MaxTemperature, MinTemperature, StyledContainer } from './styles';

type Props = {
  dataTestId: string;
  minTemp: number;
  maxTemp: number;
};

const TemperatureRange: React.FC<Props> = ({
  dataTestId,
  minTemp,
  maxTemp,
}) => (
  <StyledContainer data-testid={dataTestId}>
    <MaxTemperature>{maxTemp}°C</MaxTemperature>
    <Box component="span" mx={0.5}>
      |
    </Box>
    <MinTemperature>{minTemp}°C</MinTemperature>
  </StyledContainer>
);

export default TemperatureRange;
