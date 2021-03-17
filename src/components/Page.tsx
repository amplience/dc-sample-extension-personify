import React, { PropsWithChildren } from 'react';
import { withStyles, WithStyles } from '@material-ui/core';
import clsx from 'clsx';
import { useConfigContext } from './ConfigContext';
import XrayPanel from './XrayPanel';
import { PersonalizedHeroBannerBlock } from '.';
import { useXrayContext } from './XrayContext';

const styles = () => ({
  root: {},
  content: {
    minHeight: '100vh',
  },
});

interface Props extends PropsWithChildren<WithStyles<typeof styles>> {
  className?: string;
  style?: React.CSSProperties;
}

const Page = (props: Props) => {
  const { classes, className } = props;
  const config = useConfigContext();
  const { setIsOpen } = useXrayContext();

  return (
    <div className={clsx(classes.root, className)}>
      {config.xray && <XrayPanel />}
      <div className={clsx(classes.content, className)} onClick={() => setIsOpen(true)}>
        <PersonalizedHeroBannerBlock />
      </div>
    </div>
  );
};

export default withStyles(styles)(Page);
