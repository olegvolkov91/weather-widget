import { Typography } from '@mui/material';

import { DynamicObject } from '@/types/weatherWidget';

import { StyledContainer } from './styles';

type Props = {
  dataTestId: string;
  value: number | string;
  label?: string;
  unit?: string;
  styles?: DynamicObject;
};

const WeatherInfo: React.FC<Props> = ({
  dataTestId,
  value,
  unit,
  label,
  styles = {},
}) => (
  <StyledContainer data-testid={dataTestId}>
    {label && (
      <Typography
        variant="body2"
        sx={{ ...styles, fontWeight: 'bold', marginBottom: '2px' }}
      >
        {label}
      </Typography>
    )}
    <Typography variant="h6" sx={{ ...styles }}>
      {value} {unit}
    </Typography>
  </StyledContainer>
);

export default WeatherInfo;
