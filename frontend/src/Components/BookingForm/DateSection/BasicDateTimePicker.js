import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

export default function BasicDateTimePicker({ value, onChangeHandler, minDatetime, label }) {
    return (
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DateTimePicker
          minutesStep={15}
          renderInput={(props) => <TextField {...props} />}
          label={label}
          value={value}
          onChange={onChangeHandler}
          minDateTime={minDatetime}
        />
      </LocalizationProvider>
    );
  }