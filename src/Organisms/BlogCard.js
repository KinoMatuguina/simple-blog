import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
import Delete from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';
import Visibility from '@material-ui/icons/Visibility';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    alignItems: 'center',
    maxWidth: 345,
    paddingBottom: 64,
    justifyContent: 'center',
    position: 'relative',
  },
  avatar: {
    backgroundColor: red[500],
  },
  actions: {
    position: 'absolute',
    bottom:0,
    left: 0
  },
  overflowWrap: {
    overflowWrap: "anywhere",
  },
  content: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  }
}));

export default function BlogCard(props) {
  const classes = useStyles();
  return (
    <Card className={(props.singlePost) ? props.singlePost : classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {props.name[0].toUpperCase()}
          </Avatar>
        }
        title={props.title}
        subheader={props.name}
      />
      <CardContent>
        <p className={(props.overflowWrap) ? classes.overflowWrap : classes.content}>
          {props.content}
        </p>
      </CardContent>
      <CardActions disableSpacing className={classes.actions}>
        {
          !props.hasView ?
          <><IconButton onClick={props.onDelete} aria-label="Delete">
            <Delete />
          </IconButton>
          <IconButton onClick={props.onEdit} aria-label="Edit">
            <Edit />
          </IconButton></> : null

        }
        {
          props.hasView ? 
          <IconButton onClick={props.onView} aria-label="View">
            <Visibility />
          </IconButton> : null
        }
      </CardActions>
    </Card>
  );
}