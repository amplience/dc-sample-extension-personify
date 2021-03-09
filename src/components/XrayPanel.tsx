import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import { TagChooser } from '.';
import { useXrayContext } from './XrayContext';

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: '20%',
  },
  drawerPaper: {
    width: '20%',
    padding: theme.spacing(2),
  },
}));

export default function XrayPanel() {
  const classes = useStyles();
  const { isOpen, setIsOpen } = useXrayContext();

  return (
    <Drawer
      anchor="left"
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className={classes.drawer}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <TagChooser />
    </Drawer>
  );
}
