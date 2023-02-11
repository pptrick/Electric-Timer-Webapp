import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Item from './Item';
import LargeItem from './LargeItem';
import './MainPage.css';

import {ranges} from './config.js'

const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
});

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      select: -1,
      showResult: false,
      inputText: '',
      distance: -1,
      helperText: ''
    };
  }

  handleClickItem = (index) => {
    this.setState({select: index});
    console.log("Select item ", index);
  }

  handleClickConvertButton = () => {
    if(this.state.select >= 0 && this.state.distance > 0 && this.state.distance<=ranges[this.state.select]){
      this.setState({showResult: true});
    }
  }

  handleTextInput = (e) => {
    this.setState({inputText: e.target.value});
    var dist = Number(e.target.value)
    console.log(dist)
    if(dist>0){
      this.setState({distance: dist, helperText: ""});
    }
    else if(dist===0){
      this.setState({helperText: ""});
    }
    else{
      this.setState({distance: -1, helperText: "Please enter valid numbers! e.g. 1, 3.2, ..."});
    }
  }

  handleReset = () => {
    this.setState({
      select: -1,
      showResult: false,
      inputText: '',
      distance: -1,
      helperText: ''
    });
  }

  render(){
    return (
    <div className="MainContainer">
    <ThemeProvider theme={darkTheme}>
        <div className='MainBackground'>
            <h1 className="MainTitle"><span style={{color: "#4eabfc"}}>Electric</span> Timer</h1>
            
            {/* Selection and Input */}

            {!this.state.showResult &&
            <p className='MainDescription'>Transform the distance to time 🚀 <br/> Choose a transportation, enter the distance in miles, and get your time!</p>
            }
            
            {!this.state.showResult &&
            <div className='MainSelection'>
              <Grid container justifyContent="center" spacing={{ xs: 1, md: 1 }} columns={{ xs: 4, sm: 8, md: 10 }}>
                {Array.from(Array(10)).map((_, index) => (
                  this.state.distance <= ranges[index]?
                  <Grid xs={2} sm={2} md={2} key={index}>
                    <Item index={index} select={this.state.select===index? true: false} onClick={this.handleClickItem}/>
                    <div style={{marginBottom: "15px"}}></div>
                  </Grid>:
                  <div></div>
                ))}
              </Grid>
            </div>
            }
            
            {!this.state.showResult &&
            <div className='MainInput'>
              <Grid container spacing={2}>
                <Grid item xs={9}>
                  <TextField fullWidth value={this.state.inputText} onChange={this.handleTextInput} label="distance (mile)" id="fullWidth" helperText={this.state.helperText}/>
                </Grid>
                <Grid item xs={2}>
                  <Button style={{minWidth: '100%', minHeight: '100%'}} variant="contained" onClick={this.handleClickConvertButton}>Convert</Button>
                </Grid>
              </Grid>
            </div>
            }       

            {/* Showing Results */}

            {this.state.showResult &&
            <p className='MainDescription'>Hurray🎉 We got the time you want!</p>
            }

            {this.state.showResult && 
            <div className='MainResults' id='results'>
              <LargeItem distance={this.state.distance} index={this.state.select}/>
              <div className='MainResetButton'><Button variant="contained" size='large' onClick={this.handleReset}>Reset Distance</Button></div>
            </div>
            }

            {this.state.showResult &&
            <div className='MainMoreResults'>
              <Grid container justifyContent="center" spacing={{ xs: 1, md: 1 }} columns={{ xs: 4, sm: 8, md: 10 }}>
                {Array.from(Array(10)).map((_, index) => (
                  this.state.distance <= ranges[index]?
                  <Grid xs={2} sm={2} md={2} key={index}>
                    <Item distance={this.state.distance} index={index} select={this.state.select===index? true: false} onClick={this.handleClickItem}/>
                  </Grid>:
                  <div></div>
                ))}
              </Grid>
            </div>
            }
        </div>
    </ThemeProvider>
    </div>
    );
  }
}
  
export default MainPage;