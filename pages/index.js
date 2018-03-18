import Router from 'next/router'
import React from 'react'
import Head from '../components/head'
import Nav from '../components/nav'
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';

import withRoot from '../src/withRoot';
import { withStyles } from 'material-ui/styles';



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
    const {classes} = this.props
    return(
      <div>
        <Head title="home"/>
        <Nav/>

       <Paper className={classes.root} elevation={4}>
        <Typography variant="headline" component="h3">
          Pagina 1 Home
        </Typography>
        
        <Button onClick={linkBut} variant="raised" color="primary" className={classes.button}>
        ABOUT
      </Button>
      </Paper>


      </div>
    )
  }
}


Index.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(Index));