import React from 'react';
import s from './QualificationDocuments.module.css';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { Controller } from 'react-hook-form';
import CountrySelectDialogs from '../../../common/CountrySelectDialogs';

const SeamanBookIdTableDialog = props => {
  return (
    <Dialog open={props.open} onClose={props.handleClose}>
      <form onSubmit={props.handleSubmit(props.saveButtonClick)}>
        <DialogTitle>Seaman's Book / Identification Documents</DialogTitle>
        <DialogContent>
          <div className={s.newSeamanBookContainer}>
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

export default SeamanBookIdTableDialog;
