import React from 'react';
import s from './QualificationDocuments.module.css';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { Controller } from 'react-hook-form';
import CountrySelectDialogs from '../../../common/CountrySelectDialogs';

const LicensesTableDialog = props => {
  return (
    <Dialog open={props.open} onClose={props.handleClose}>
      <form onSubmit={props.handleSubmit(props.saveButtonClick)}>
        <DialogTitle>Add License</DialogTitle>
        <DialogContent>
          <div className={s.newLicensesContainer}>
            <div className={s.nationalPlace}>
              <Controller
                control={props.control}
                name="national"
                render={({ field }) => <CountrySelectDialogs field={field} />}
              />
              <TextField
                {...props.register('placeIssues')}
                required
                size="small"
                InputLabelProps={{ shrink: true }}
                label="Place Issues"
              />
            </div>
            <div className={s.gradeType}>
              <TextField
                {...props.register('gradeOfLicenses')}
                required
                size="small"
                InputLabelProps={{ shrink: true }}
                label="Grade of Licenses"
              />
              <TextField
                {...props.register('licenseType')}
                required
                size="small"
                InputLabelProps={{ shrink: true }}
                label="Licenses Type (S or M)"
              />
            </div>
            <div className={s.number}>
              <TextField
                {...props.register('number')}
                required
                size="small"
                InputLabelProps={{ shrink: true }}
                label="Number"
              />
            </div>
            <div className={s.date}>
              <TextField
                {...props.register('dateIssues')}
                required
                size="small"
                InputLabelProps={{ shrink: true }}
                type="date"
                label="Date Issues"
              />
              <TextField
                {...props.register('expireDate')}
                required
                size="small"
                InputLabelProps={{ shrink: true }}
                type="date"
                label="Expire Date"
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

export default LicensesTableDialog;
