import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useCountries } from './hooks/useCountries';
import Preloader from './Preloader';

const CountrySelectDialogs = ({ field, initialNationality }) => {
  const { countries, isFetchingCountries, getCountries } = useCountries();

  return (
    <Autocomplete
      id="country-select"
      sx={{ width: 335 }}
      size="small"
      options={countries}
      onOpen={getCountries}
      autoHighlight
      getOptionLabel={option => option.label}
      value={countries.find(option => option.label === field.value) || null}
      onChange={(event, newValue) => {
        field.onChange(newValue ? newValue.label : '');
      }}
      renderOption={(props, option) => (
        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
          <img
            loading="lazy"
            width="20"
            srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
            src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
            alt=""
          />
          {option.label} ({option.code})
        </Box>
      )}
      renderInput={params => (
        <TextField
          {...params}
          InputLabelProps={{ shrink: true }}
          label="Choose a country"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {isFetchingCountries ? <Preloader /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
};

export default CountrySelectDialogs;
