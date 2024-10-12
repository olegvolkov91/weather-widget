import styled from '@emotion/styled';
import { Box } from '@mui/material';

import { WidgetSize } from '../../../types/weatherWidget';

type Styles = { size: WidgetSize };

export const StyledWidgetContainer = styled(Box)<Styles>(({ size }) => ({
  backgroundColor: '#247291',
  borderRadius: '8px',
  padding: '12px',
  width:
    size === WidgetSize.Small
      ? '180px'
      : size === WidgetSize.Medium
        ? '280px'
        : '400px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  color: 'white',
}));

export const StyledWeatherInfoContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-evenly',
  alignItems: 'center',
  marginBottom: '24px',
  width: '100%',
});

export const StyledAdditionalWeatherInfo = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

export const StyledForecastSection = styled(Box)<Styles>(({ size }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: size === WidgetSize.Medium ? 'space-around' : 'space-between',
  width: '100%',
  padding: '8px 0',
  borderTop: '1px solid white',
}));
