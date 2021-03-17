import React from 'react';
import { withStyles, WithStyles, Typography, Theme, Button } from '@material-ui/core';
import clsx from 'clsx';

import { fade } from '@material-ui/core/styles/colorManipulator';
import { CmsImage, getImageURL, ImageScaleMode, noop } from '../utils';
import Overlay from './Overlay';

const styles = (theme: Theme) => ({
  root: {},
  image: {
    width: '100%',
  },
  overlay: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayPanel: {
    background: fade(theme.palette.background.default, 0.9),
    padding: '20px 30px',
    textAlign: 'center' as 'center',
  },
  subTitle: {
    marginBottom: theme.spacing(2),
  },
});

interface Props extends WithStyles<typeof styles> {
  className?: string;
  style?: React.CSSProperties;

  image: CmsImage;

  title: string;
  description?: string;
  callToActionOnClick?: any;
  callToAction?: string;
  callToActionHref?: string;
}

const HeroBannerBlock = (props: Props) => {
  const {
    classes,
    className,
    image,
    title,
    description,
    callToAction,
    callToActionHref,
    callToActionOnClick = noop,
  } = props;

  const imageUrl = getImageURL(image, {
    width: 3000,
    upscale: false,
    scaleMode: ImageScaleMode.ASPECT_RATIO,
    aspectRatio: '16:5',
  });

  return (
    <div className={clsx(classes.root, className)}>
      <Overlay
        overlay={
          <div className={classes.overlay}>
            <div className={classes.overlayPanel}>
              <Typography variant="h2">{title}</Typography>
              {description && (
                <Typography variant="body1" className={classes.subTitle}>
                  {description}
                </Typography>
              )}
              {callToAction && (
                <Button variant="outlined" onClick={callToActionOnClick(title, callToActionHref)}>
                  {callToAction}
                </Button>
              )}
            </div>
          </div>
        }
      >
        <img className={classes.image} src={imageUrl} alt="" />
      </Overlay>
    </div>
  );
};

export default withStyles(styles)(HeroBannerBlock);
