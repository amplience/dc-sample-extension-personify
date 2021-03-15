import React, { MouseEventHandler, PropsWithChildren, useEffect, useState } from 'react';
import clsx from 'clsx';
import { HeroBannerBlock } from '.';
import { getTargetedContent } from '../services';
import { withStyles, WithStyles } from '@material-ui/core';
import { useConfigContext } from './ConfigContext';
import { TargetedContent, TargetedContentGroup } from '../services/getTargetedContent';
import { usePersonifyContext } from './PersonifyContext';

const styles = () => ({
  root: {},
});

interface Props extends PropsWithChildren<WithStyles<typeof styles>> {
  className?: string;
  style?: React.CSSProperties;
}

const PersonalizedHeroBannerBlock = (props: Props) => {
  const { classes, className } = props;
  const { dc: dcConfig } = useConfigContext();
  const personify = usePersonifyContext();
  const [group, setGroup] = useState<TargetedContentGroup | undefined>();

  const getVariants = (content: Record<string, any>) => content;
  const findVariant = (id: string, content: TargetedContent) => {
    const found: TargetedContentGroup | undefined = content.find((group: any) => group.id === id) || content[0];
    if (found) {
      setGroup(found);
    }
  };

  const callToActionOnClick = (name: string, url: string): MouseEventHandler<HTMLButtonElement> => (event) => {
    event.preventDefault();
    const type = 'content';
    if (!personify.config.actions[name]) {
      personify.config.actions[name] = {
        type,
        contenturl: url,
        getContentName: () => name,
      };
      personify.action(name);
    }
  };

  useEffect(() => {
    async function determineVariant() {
      const targetedContent: TargetedContent = await getTargetedContent(dcConfig);
      personify.decision(personify, {}, getVariants(targetedContent), (id: string) => findVariant(id, targetedContent));
    }

    determineVariant();
  }, [dcConfig, personify]);

  return (
    <div className={clsx(classes.root, className)}>
      {group && <HeroBannerBlock {...group.component} callToActionOnClick={callToActionOnClick}></HeroBannerBlock>}
    </div>
  );
};

export default withStyles(styles)(PersonalizedHeroBannerBlock);
