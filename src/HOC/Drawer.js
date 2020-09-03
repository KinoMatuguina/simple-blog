import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';

export default function Drawer(WrappedComponent) {
  return function DrawerHOC() {
    const useStyles = makeStyles({
      title: {
        color: "#FFF",
        marginRight: 'auto'
      },
      viewAll: {
        color: '#FFF'
      }
    });
  
    let history = useHistory();
    const classes = useStyles();
  
    const handleViewAll = () => {
      history.push('/')
    }

    return (
      <div>
        <AppBar position="static">
            <Toolbar>
                <Typography className={classes.title} variant="h6">
                  Simple Blog
                </Typography>
                {history.location.pathname !== "/" ? <Button color="inherit" className={classes.viewAll} onClick={handleViewAll}>View All</Button> : null}
            </Toolbar>
        </AppBar>
        <WrappedComponent />
      </div>
    )
  }
}
