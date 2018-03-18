import Router from 'next/router'
import React from 'react'
import Head from '../components/head'
import Nav from '../components/nav'
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import OnePost from '../components/mypost';

import withRoot from '../src/withRoot';
import { withStyles } from 'material-ui/styles';
import fetch from 'isomorphic-unfetch'


const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
  }),
  button: {
    margin: theme.spacing.unit,
  },
});

function linkBut(){

  Router.push('/about')
} 


class Index extends React.Component{


componentDidMount(){
  if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js")
          .catch(err => console.error("Service worker registration failed", err))
  } else {
      console.log("Service worker not supported");
  }
}


  render(){
    const {classes,shows} = this.props
    return(
      <div>
        <Head title="home"/>
        <Nav/>

       <Paper className={classes.root} elevation={4}>
        <Typography variant="headline" component="h3">
          Pagina 1 Home
        </Typography>
        
        {shows.map((i,key)=>

            <div key={key}>
                  <OnePost data={i}/>

            </div>
        )}


        <Button onClick={linkBut} variant="raised" color="primary" className={classes.button}>
        ABOUT
      </Button>
      </Paper>


      </div>
    )
  }
}

Index.getInitialProps = async function () {
  const res = await fetch('https://rest-mbcode.herokuapp.com/api/mypost')
  const data = await res.json()
  return {
    shows: data
  }
}


Index.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(Index));