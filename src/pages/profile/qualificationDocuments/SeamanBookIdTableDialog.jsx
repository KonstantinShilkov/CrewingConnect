import React from 'react';
import s from './QualificationDocuments.module.css';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

const SeamanBookIdTableDialog = props => {
  return (
    <Dialog open={props.open} onClose={props.handleClose}>
      <form onSubmit={props.handleSubmit(props.saveButtonClick)}>
        <DialogTitle>Seaman's Book / Identification Documents</DialogTitle>
        <DialogContent>
          <div className={s.newSeamanBookContainer}>
            <div>
              <TextField
                {...props.register('national')}
                required
                size="small"
                InputLabelProps={{ shrink: true }}
                label="National"
                style={{ width: '160px' }}
              />
            </div>
            <div>
              <TextField
                {...props.register('number')}
                required
                size="small"
                InputLabelProps={{ shrink: true }}
                label="Number"
                style={{ width: '160px' }}
              />
            </div>
            <div>
              <TextField
                {...props.register('placeIssues')}
                required
                size="small"
                InputLabelProps={{ shrink: true }}
                label="Place Issues"
                style={{ width: '160px' }}
              />
            </div>
            <div>
              <TextField
                {...props.register('dateIssues')}
                required
                size="small"
                InputLabelProps={{ shrink: true }}
                type="date"
                label="Date Issues"
                style={{ width: '160px' }}
              />
            </div>
            <div>
              <TextField
                {...props.register('expireDate')}
                required
                size="small"
                InputLabelProps={{ shrink: true }}
                type="date"
                label="Expire Date"
                style={{ width: '160px' }}
              />
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose}>Cancel</Button>
          <Button type="submit">Add Seaman's book or id</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default SeamanBookIdTableDialog;
