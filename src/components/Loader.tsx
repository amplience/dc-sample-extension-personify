import React, { PropsWithChildren } from 'react';
import { CircularProgress, withStyles, WithStyles } from '@material-ui/core';
import clsx from 'clsx';

const styles = () => ({
  root: {
    width: '100%',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

interface Props extends PropsWithChildren<WithStyles<typeof styles>> {
  className?: string;
  style?: React.CSSProperties;
}

const Loader = (props: Props) => {
  const { classes, className } = props;

  return (
    <div className={clsx(classes.root, className)}>
      <CircularProgress color="primary" />
    </div>
  );
};

export default withStyles(styles)(Loader);
