import React from 'react';
import s from './QualificationDocuments.module.css';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

const QualificationCertificatesTableDialog = props => {
  return (
    <Dialog open={props.open} onClose={props.handleClose}>
      <form onSubmit={props.handleSubmit(props.saveButtonClick)}>
        <DialogTitle>Qualifications / Certificates</DialogTitle>
        <DialogContent>
          <div className={s.newQualificationCertificateContainer}>
            <div className={s.qualificationPlace}>
              <TextField
                {...props.register('qualificationCertificate')}
                required
                size="small"
                InputLabelProps={{ shrink: true }}
                label="Qualification /Certificate"
              />
              <TextField
                {...props.register('placeIssues')}
                required
                size="small"
                InputLabelProps={{ shrink: true }}
                label="Place Issues"
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

export default QualificationCertificatesTableDialog;
