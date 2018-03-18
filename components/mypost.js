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



const OnePost = ({classes,data}) => {

  return (

    <div>
      <Paper className={classes.root} elevation={4}>
        <Typography variant="headline" component="h3">
          {data.title}
        </Typography>
        <Typography component="p">
          {data.description}
        </Typography>
      </Paper>
    </div>
  )
}



OnePost.propTypes = {
  classes: PropTypes.object.isRequired,
  data :PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(OnePost));