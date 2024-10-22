import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useCourses } from './hooks/useCourses';
import Preloader from './Preloader';
import { useState } from 'react';

const CourseSelectDialogs = ({ field }) => {
  const { courses, isFetchingCourses, getCourses } = useCourses();
  const [dynamicOptions, setDynamicOptions] = useState([]);

  const handleInputChange = (event, newInputValue) => {
    if (!courses.some(option => option.course === newInputValue)) {
      setDynamicOptions(newInputValue ? [{ course: newInputValue }, ...courses] : courses);
    } else {
      setDynamicOptions(courses);
    }
  };

  const handleChange = (event, newValue) => {
    const valueToSet =
      typeof newValue === 'string'
        ? newValue
        : newValue && newValue.inputValue
        ? newValue.inputValue
        : newValue
        ? newValue.course
        : '';
    field.onChange(valueToSet);
  };

  return (
    <Autocomplete
      id="course-select"
      sx={{ width: 335 }}
      size="small"
      options={dynamicOptions}
      onOpen={getCourses}
      autoHighlight
      getOptionLabel={option => option.course || field.onChange}
      freeSolo
      onChange={handleChange}
      onInputChange={handleInputChange}
      renderOption={(props, option) => (
        <Box component="li" {...props}>
          {option.course}
        </Box>
      )}
      renderInput={params => (
        <TextField
          {...params}
          label="Courses"
          placeholder="Select or enter a course"
          InputLabelProps={{ shrink: true }}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {isFetchingCourses ? <Preloader /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
};

export default CourseSelectDialogs;
