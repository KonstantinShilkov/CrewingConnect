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
            <div>
              <TextField
                {...props.register('qualificationCertificate')}
                required
                size="small"
                InputLabelProps={{ shrink: true }}
                label="Qualification /Certificate"
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
          <Button type="submit">Add Qualification / Certificate</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default QualificationCertificatesTableDialog;
