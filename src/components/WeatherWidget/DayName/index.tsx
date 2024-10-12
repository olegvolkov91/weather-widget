import { Typography } from '@mui/material';
import { format } from 'date-fns';

import NotificationBar from '@/common/NotificationBar';
import { DEFAULT_DATE } from '@/constants';
import { DynamicObject } from '@/types/weatherWidget';

type Props = {
  dataTestId: string;
  dateFormat?: string;
  date?: string;
  styles?: DynamicObject;
};

const DayName: React.FC<Props> = ({
  dataTestId,
  dateFormat = 'EEEE',
  date = DEFAULT_DATE,
  styles = {},
}) => {
  try {
    const dayName = format(new Date(date), dateFormat);
    return (
      <Typography
        data-testid={dataTestId}
        color="white"
        fontSize="10px"
        fontWeight="bold"
        variant="body2"
        sx={{ ...styles }}
      >
        {dayName}
      </Typography>
    );
  } catch {
    NotificationBar.showError('Invalid format pattern or date value');
    return null;
  }
};

export default DayName;
