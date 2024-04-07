import React, { useEffect, useState } from 'react';
import s from './Vacancies.module.css';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import FilterListIcon from '@mui/icons-material/FilterList';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
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
    <div>
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
              renderInput={params => <TextField {...params} label="Ranks" placeholder="Enter your rank" />}
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
                <TextField {...params} label="Vessel Types" placeholder="Vessel Type" />
              )}
            />
          </FormControl>
        </div>
      </List>
      <Divider />
      <div className={s.chevronIcon}>
        <IconButton onClick={toggleDrawer(false)}>
          <ChevronRightIcon />
        </IconButton>
      </div>
    </div>
  );
  return (
    <div className={s.sortIcon}>
      <Button onClick={toggleDrawer(true)}>
        <FilterListIcon />
      </Button>
      <Drawer anchor="right" open={open}>
        {DrawerList}
      </Drawer>
    </div>
  );
};
export default Filters;
