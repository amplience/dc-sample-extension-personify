import React, { PropsWithChildren } from 'react';
import { CircularProgress, withStyles, WithStyles } from '@material-ui/core';
import clsx from 'clsx';
import { useConfigContext } from './ConfigContext';
import XrayPanel from './XrayPanel';
import { PersonalizedHeroBannerBlock } from '.';

const styles = () => ({
  root: {},
});

interface Props extends PropsWithChildren<WithStyles<typeof styles>> {
  className?: string;
  style?: React.CSSProperties;
}

const Page = (props: Props) => {
  const { classes, className } = props;
  const config = useConfigContext();

  return (
    <div className={clsx(classes.root, className)}>
      {config.xray && <XrayPanel />}
      <PersonalizedHeroBannerBlock />;
    </div>
  );
};

export default withStyles(styles)(Page);
