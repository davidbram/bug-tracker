import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
//importing button icon
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

const useStyles = makeStyles((theme) => ({
  
}));

export default function IconButtons() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <IconButton aria-label="delete">
        <AddCircleOutlineIcon />
      </IconButton>
    </div>
  );
}
