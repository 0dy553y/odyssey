import * as React from 'react';
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Stack,
} from '@mui/material';
import { DayOfWeek } from 'types/date';

import './RecurringDaysForm.scss';

interface RecurringDaysFormProps {
  isEditable: boolean;
}

const RecurringDaysForm: React.FC<RecurringDaysFormProps> = ({
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
              control={<Checkbox />}
              label={day[0]}
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
