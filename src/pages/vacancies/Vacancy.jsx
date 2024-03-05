import { Card, CardActions, CardContent } from '@mui/joy';
import React, { useState } from 'react';
import s from './Vacancies.module.css'
import { Collapse } from '@mui/material';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Button } from '@mui/joy';


const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

const Vacancy = (props) => {
    const [expanded, setExpanded] = useState({});

    const handleExpandClick = (id) => {
        setExpanded(expanded => ({
            ...expanded,
            [id]: !expanded[id],
        }));
    };

    return (
        <Card
            variant="outlined"
            sx={{ width: 400, maxWidth: '100%', gap: 1.5 }}
        >
            <div className={s.vacancyDescreption}>
                <CardContent>
                    <div className={s.shortVacancy} >
                        <div> <h3>{props.rank} on {props.vesselType}</h3></div>
                        <div>Salary: {props.salary} </div>
                        <div>Join Date:{props.joinDate} </div>
                        <div>Duration:{props.duration} </div>
                    </div>
                </CardContent>
                <CardActions >
                    <ExpandMore
                        expand={expanded[props.id]}
                        onClick={() => handleExpandClick(props.id)}
                        aria-expanded={expanded[props.id]}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </ExpandMore>
                </CardActions>
                <Collapse in={expanded[props.id]}
                    timeout="auto"
                    unmountOnExit>
                    <div className={s.expandedVacancy}>
                        <div> <h4>Requrements</h4></div>
                        <div>Visa:{props.visa} </div>
                        <div>English Level:{props.englishLevel} </div>
                        <div>Prefferred citizenship:{props.prefferedCitizenship} </div>
                        <div> <h4>Vessel info </h4></div>
                        <div>Vessel type:{props.vesselType} </div>
                        <div>Build year:{props.vesselBuildYear} </div>
                        <div>Vessel flag:{props.vesselFlag} </div>
                        <div>DWT:{props.vesselDwt} </div>
                        <div>Main Engine:{props.vesselMainEngine} </div>
                        <div>Crew onboard:{props.crewOnboard} </div>
                        <div>Sailing area:{props.sailingArea}</div>
                        <div> <h4>Additional Info</h4></div>
                        <div>{props.additionalInfo}(add info can be opened after registration
                            and Apply button disabled or not exist ?)</div>
                        <Button size="sm"
                            type='submit'
                            variant="solid"
                            color="neutral"
                        >
                            Apply
                        </Button>
                    </div>
                </Collapse>
            </div>
        </Card>
    )
}

export default Vacancy