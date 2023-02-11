import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import './Item.css';
import {names, urls, speeds, ranges} from './config.js'

function Item(props) {

    function handleClickItem() {
        props.onClick(props.index);
    }

    return (
        <div>
        <Box sx={{ position: 'relative', display: 'inline-flex' }} onClick={handleClickItem}>
        <CircularProgress variant="determinate" color={props.select? 'secondary':'primary'} size={150} thickness={props.select? 1.8:1.0} value={(props.distance>0? Math.min(100, props.distance*100.0/ranges[props.index]):100)}/>
        <Box
            sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            }}
        >
            <Typography variant="caption" component="div" color="text.secondary">
            <div className='ItemContainer'>
                <img className="ItemImg" src={urls[props.index]} alt='item'/>
                <div className="ItemText"> {names[props.index]} </div>
            </div>
            </Typography>
        </Box>
        </Box>
        {props.distance>0 && <div className='ItemResult'> {(props.distance * 60.0 / speeds[props.index]).toPrecision(3) } min </div>}
        </div>
    );
}
  
export default Item;