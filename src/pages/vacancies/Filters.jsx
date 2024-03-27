import React, { useEffect, useState } from 'react';
import s from './Vacancies.module.css';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import SortIcon from '@mui/icons-material/Sort';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { FormControl, IconButton, InputLabel } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const Filters = props => {
  const [vesselType, setVesselType] = useState([]);
  const [rank, setRank] = useState([]);
  const nonDuplicateListVesselTypes = [...new Set(props.vesselType)];
  const nonDuplicateListRanks = [...new Set(props.rank)];
  const [open, setOpen] = useState(false);

  useEffect(() => {
    props.getSelectedVesselTypes(vesselType);
    props.getSelectedRanks(rank);
  }, [vesselType, rank]);

  const handleChangeRank = (event, value) => {
    setRank(value);
  };

  const handleChangeVesselType = (event, value) => {
    setVesselType(value);
  };

  const toggleDrawer = newOpen => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box
      // sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 325 }}
      sx={{ width: 325 }}
      role="presentation">
      <div className={s.filterHeader}>Filters</div>
      <Divider />
      <List>
        <div className={s.rankFilter}>
          <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="demo-multiple-name-label"></InputLabel>
            <Autocomplete
              multiple
              value={rank}
              onChange={handleChangeRank}
              id="checkboxes-tags-demo"
              options={nonDuplicateListRanks}
              disableCloseOnSelect
              getOptionLabel={option => option}
              renderOption={(props, option) => <li {...props}>{option}</li>}
              style={{ width: 300 }}
              renderInput={params => <TextField {...params} label="Rank" placeholder="Enter your rank" />}
            />
          </FormControl>
        </div>
      </List>
      <List>
        <div className={s.vesselTypeFilter}>
          <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="demo-multiple-name-label"></InputLabel>
            <Autocomplete
              multiple
              value={vesselType}
              onChange={handleChangeVesselType}
              id="checkboxes-tags-demo"
              options={nonDuplicateListVesselTypes}
              disableCloseOnSelect
              getOptionLabel={option => option}
              renderOption={(props, option) => <li {...props}>{option}</li>}
              style={{ width: 300 }}
              renderInput={params => (
                <TextField {...params} label="Vessel Type" placeholder="Enter Vessel Type" />
              )}
            />
          </FormControl>
        </div>
      </List>
      <Divider />
      <div className={s.chevronIcon}>
        <IconButton onClick={toggleDrawer(false)}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
    </Box>
  );
  return (
    <div className={s.sortIcon}>
      <Button onClick={toggleDrawer(true)}>
        {/* <Button onClick={toggleDrawer('right', true)}> */}
        <SortIcon />
      </Button>
      <Drawer open={open}>{DrawerList}</Drawer>
      {/* <Drawer anchor={'right'} open={state['right']} onClose={toggleDrawer('right', false)}> */}
      {/* {DrawerList} */}
      {/* </Drawer> */}
    </div>
  );
};
export default Filters;
