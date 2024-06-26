import { Card, CardActions, CardContent } from '@mui/joy';
import React, { useEffect, useRef, useState } from 'react';
import s from './Vacancies.module.css';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const Vacancy = ({ vacancy }) => {
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState('paper');
  const handleClickOpen = scrollType => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = useRef(null);
  useEffect(() => {
    if (open && descriptionElementRef.current !== null) {
      descriptionElementRef.current.focus();
    }
  }, [open]);

  return (
    <React.Fragment>
      <Card variant="outlined" sx={{ width: 400, maxWidth: '100%', gap: 1.5 }}>
        <div className={s.vacancyCard}>
          <CardContent>
            <div className={s.shortVacancy}>
              <div>
                <h3>
                  {vacancy.rank} on {vacancy.vesselType}
                </h3>
              </div>
              <div>Salary: {vacancy.salary} </div>
              <div>Join Date:{vacancy.joinDate} </div>
              <div>Duration:{vacancy.duration} </div>
            </div>
          </CardContent>
          <CardActions>
            <Button className={s.buttonApply} onClick={handleClickOpen('paper')}>
              details / apply
            </Button>
          </CardActions>

          <Dialog
            open={open}
            onClose={handleClose}
            scroll={scroll}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description">
            <DialogTitle id="scroll-dialog-title">
              <h3>
                {vacancy.rank} on {vacancy.vesselType}
              </h3>
            </DialogTitle>
            <DialogContent dividers={scroll === 'paper'}>
              <DialogContentText id="scroll-dialog-description" ref={descriptionElementRef} tabIndex={-1}>
                <div className={s.expandedVacancy}>
                  <div>Salary: {vacancy.salary} </div>
                  <div>Join Date:{vacancy.joinDate} </div>
                  <div>Duration:{vacancy.duration} </div> <h4>Requrements</h4>
                </div>
                <div>Visa:{vacancy.visa} </div>
                <div>English Level:{vacancy.englishLevel} </div>
                <div>Prefferred citizenship:{vacancy.prefferedCitizenship} </div>
                <div>
                  {' '}
                  <h4>Vessel info </h4>
                </div>
                <div>Vessel type:{vacancy.vesselType} </div>
                <div>Build year:{vacancy.vesselBuildYear} </div>
                <div>Vessel flag:{vacancy.vesselFlag} </div>
                <div>DWT:{vacancy.vesselDwt} </div>
                <div>Main Engine:{vacancy.vesselMainEngine} </div>
                <div>Crew onboard:{vacancy.crewOnboard} </div>
                <div>Sailing area:{vacancy.sailingArea}</div>
                <div>
                  <h4>Additional Info</h4>
                </div>
                <div>
                  {vacancy.additionalInfo}(add info can be opened after registration and Apply button
                  disabled or not exist ?)
                </div>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Close</Button>
              <Button onClick={handleClose}>Apply</Button>
            </DialogActions>
          </Dialog>
        </div>
      </Card>
    </React.Fragment>
  );
};

export default Vacancy;
