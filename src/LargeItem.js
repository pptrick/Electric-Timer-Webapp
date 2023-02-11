import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import './LargeItem.css';
import {names, urls, speeds, ranges} from './config.js'

function LargeItem(props) {
    return (
        <div>
        <div className='LargeItemDistanceText'> {props.distance} miles / {ranges[props.index]} miles</div>
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <CircularProgress 
                variant="determinate" 
                color={'secondary'} 
                size={400} 
                thickness={2.0} 
                value={(props.distance>0? Math.min(100, props.distance*100.0/ranges[props.index]):100)}
            />
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
                <div className='LargeItemContainer'>
                    <img className="LargeItemImg" src={urls[props.index]} alt='item'/>
                    <div className="LargeItemText"> {names[props.index]} </div>
                    <div className="LargeItemValue"> {(props.distance * 60.0 / speeds[props.index]).toPrecision(3)} min </div>
                </div>
                </Typography>
            </Box>
        </Box>
        </div>
    );
}
  
export default LargeItem;