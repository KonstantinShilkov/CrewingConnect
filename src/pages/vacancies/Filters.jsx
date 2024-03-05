import React, { useEffect, useState } from 'react'
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import s from './Vacancies.module.css'
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import { useTheme } from '@mui/material/styles';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};
function getStyles(name, vesselType, theme) {
    return {
        fontWeight:
            vesselType.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

const Filters = (props) => {
    const theme = useTheme();
    const [vesselType, setVesselType] = useState([]);

    useEffect(() => {
        props.getSelectedTypes(vesselType)
    }, [vesselType])

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setVesselType(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    return (
        <div>
            <div className={s.rankFilter}>
                <FormControl sx={{ m: 1, minWidth: 300 }}>
                    <InputLabel htmlFor="grouped-native-select">Rank</InputLabel>
                    <Select native defaultValue=""
                        id="grouped-native-select"
                        label="Rank">
                        <option aria-label="None"
                            value=''
                        />
                        <optgroup label="Deck">
                            <option value={1}>Master </option>
                            <option value={2}>Ch. Officer </option>
                            <option value={3}>2nd Officer</option>
                            <option value={4}>3rd Officer</option>
                            <option value={5}>4th Officer</option>
                            <option value={6}>Bosun</option>
                            <option value={7}>AB</option>
                            <option value={8}>OS</option>
                            <option value={9}>Trainee Officer</option>
                            <option value={10}>Deck Cadet</option>
                            <option value={11}>Ch.Cook</option>
                            <option value={12}>Cook</option>
                            <option value={13}>Messman</option>
                        </optgroup>
                        <optgroup label="Engine">
                            <option value={14}>Ch. Engineer</option>
                            <option value={15}>2nd Engineer</option>
                            <option value={16}>3rd Engineer</option>
                            <option value={17}>4th Engineer</option>
                            <option value={18}>Watch Engineer</option>
                            <option value={19}>Gas Engineer</option>
                            <option value={20}>Trainee Engineer</option>
                            <option value={21}>Electrical Engineer</option>
                            <option value={22}>ETO</option>
                            <option value={23}>Electrician</option>
                            <option value={24}>Ass. El. Engineer</option>
                            <option value={25}>Motorman</option>
                            <option value={26}>Oiler</option>
                            <option value={27}>Wiper</option>
                            <option value={28}>Fitter</option>
                            <option value={29}>Engine Cadet</option>
                            <option value={30}>Pumpman</option>
                        </optgroup>
                    </Select>
                </FormControl>
            </div>
            <div className={s.vesselFilter}>
                <FormControl sx={{ m: 1, width: 300 }}>
                    <InputLabel id="demo-multiple-name-label">Vessel Type</InputLabel>
                    <Select
                        labelId="demo-multiple-name-label"
                        id="demo-multiple-name"
                        multiple
                        value={vesselType}
                        onChange={handleChange}
                        input={<OutlinedInput label="VesselType" />}
                        MenuProps={MenuProps}
                    >
                        {props.vesselType.map((name) => (
                            <MenuItem
                                key={name}
                                value={name}
                                style={getStyles(name, vesselType, theme)}
                            >
                                {name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
        </div>
    )
}

export default Filters