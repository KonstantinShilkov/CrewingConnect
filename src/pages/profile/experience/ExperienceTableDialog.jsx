import React from 'react';
import s from './Experience.module.css';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

const ExperienceTableDialog = props => {
  return (
    <Dialog open={props.open} onClose={props.handleClose}>
      <form onSubmit={props.handleSubmit(props.saveButtonClick)}>
        <DialogTitle>Add Experience</DialogTitle>
        <DialogContent>
          <div className={s.newExperienceContainer}>
            <div className={s.vesselNameType}>
              <TextField
                {...props.register('vesselName')}
                required
                size="small"
                InputLabelProps={{ shrink: true }}
                label="Vessel Name"
                style={{ width: '160px' }}
              />
              <TextField
                {...props.register('vesselType')}
                required
                size="small"
                InputLabelProps={{ shrink: true }}
                label="Vessel Type"
                style={{ width: '160px' }}
              />
            </div>
            <div className={s.tradeEngine}>
              <TextField
                {...props.register('typeTrade')}
                required
                size="small"
                InputLabelProps={{ shrink: true }}
                label="Type/kW or Area/DW"
                style={{ width: '160px' }}
              />
              <TextField
                {...props.register('engineType')}
                required
                size="small"
                InputLabelProps={{ shrink: true }}
                label="Steam or Motor"
                style={{ width: '160px' }}
              />
            </div>
            <div className={s.companyRank}>
              <TextField
                {...props.register('companyName')}
                required
                size="small"
                InputLabelProps={{ shrink: true }}
                label="Company Name"
                style={{ width: '160px' }}
              />
              <TextField
                {...props.register('rank')}
                required
                size="small"
                InputLabelProps={{ shrink: true }}
                label="Rank"
                style={{ width: '160px' }}
              />
            </div>
            <div className={s.date}>
              <TextField
                {...props.register('fromDate')}
                required
                size="small"
                InputLabelProps={{ shrink: true }}
                type="date"
                label="From"
                style={{ width: '160px' }}
              />
              <TextField
                {...props.register('tillDate')}
                required
                size="small"
                InputLabelProps={{ shrink: true }}
                type="date"
                label="Till"
                style={{ width: '160px' }}
              />
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose}>Cancel</Button>
          <Button className={s.addButton} type="submit">
            Add
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ExperienceTableDialog;
