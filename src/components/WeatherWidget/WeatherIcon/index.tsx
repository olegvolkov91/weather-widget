import { Box } from '@mui/material';

import { DynamicObject } from '@/types/weatherWidget';

type Props = {
  dataTestId: string;
  icon: string;
  size: string;
  styles?: DynamicObject;
};

const WeatherIcon: React.FC<Props> = ({
  dataTestId,
  icon,
  size,
  styles = {},
}) => (
  <Box
    data-testid={dataTestId}
    component="img"
    src={icon}
    alt="weather icon"
    sx={{ width: size, height: size, ...styles }}
  />
);

export default WeatherIcon;
