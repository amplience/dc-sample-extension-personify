import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';

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

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      className={classes.drawer}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      This is the xray panel
      {/* <TagChooser></TagChooser> */}
    </Drawer>
  );
}
