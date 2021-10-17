import * as React from 'react';
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Stack,
} from '@mui/material';
import { DayOfWeek } from 'types/date';
import { Schedule } from 'types/challenges';

import './RecurringDaysForm.scss';

interface RecurringDaysFormProps {
  isEditable: boolean;
  schedule: Schedule;
}

const RecurringDaysForm: React.FC<RecurringDaysFormProps> = ({
  schedule,
  isEditable,
}) => {
  return (
    <FormControl
      disabled={!isEditable}
      component="fieldset"
      className="recurring-days-form"
    >
      <FormGroup>
        <Stack direction="row" justifyContent="space-between" spacing={0}>
          {Object.values(DayOfWeek).map((day) => (
            <FormControlLabel
              key={day}
              value={day}
              control={<Checkbox checked={schedule[day]} />}
              label={day[0].toLocaleUpperCase()}
              labelPlacement="top"
              className={'day-checkbox'}
            />
          ))}
        </Stack>
      </FormGroup>
    </FormControl>
  );
};

export default RecurringDaysForm;
