import React from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

import useSelectField from '../../hooks/useSelectField';

function SelectField({
  id,
  label,
  value,
  handleForm,
}: {
  id: string;
  label: string;
  value: { parent: Array<string>; current: string };
  handleForm: <T>(event: T, name: string, value: string) => void;
}) {
  const { items, isLoading, isError } = useSelectField(id, value.parent);

  if (isLoading) return null;
  if (isError) return null;

  return (
    <form noValidate autoComplete="off">
      <TextField
        select
        fullWidth
        variant="outlined"
        id={id}
        name={id}
        label={label}
        value={value.current}
        onChange={(e) => handleForm(e, e.target.name, e.target.value)}
      >
        {items &&
          items.map((item) => (
            <MenuItem key={item.value} value={item.value}>
              {item.label}
            </MenuItem>
          ))}
      </TextField>
    </form>
  );
}

export default React.memo(SelectField);
