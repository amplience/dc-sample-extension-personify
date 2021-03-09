import React, { MouseEventHandler, PropsWithChildren, useEffect, useState } from 'react';
import clsx from 'clsx';
import { HeroBannerBlock } from '.';
import { getTargetedContent } from '../services';
import { withStyles, WithStyles } from '@material-ui/core';
import { useConfigContext } from './ConfigContext';
import { TargetedContent, TargetedContentGroup } from '../services/getTargetedContent';
import { usePersonifyContext } from './PersonifyContext';
import { useXrayContext } from './XrayContext';

const styles = () => ({
  root: {},
});

interface Props extends PropsWithChildren<WithStyles<typeof styles>> {
  className?: string;
  style?: React.CSSProperties;
}

const getVariants = (content: Record<string, any>) => content;
const findVariant = (
  id: string,
  content: TargetedContent,
  setter: React.Dispatch<TargetedContentGroup | undefined>
) => {
  const found: TargetedContentGroup | undefined = content.find((group: any) => group.id === id) || content[0];
  if (found) {
    setter(found);
  }
};

const PersonalizedHeroBannerBlock = (props: Props) => {
  const { classes, className } = props;
  const { dc: dcConfig, xray } = useConfigContext();
  const { personalizationTags, personalizationBehaviors } = useXrayContext();
  const personify = usePersonifyContext();
  const [group, setGroup] = useState<TargetedContentGroup | undefined>();

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
      if (xray) {
        const behaviors = [...personify.apiMissions];
        const tags = [...personify.apiTags];
        personify.apiMissions = personify.apiMissions.filter((mission: any) =>
          personalizationBehaviors.includes(mission.name)
        );
        personify.apiTags = personify.apiTags.filter((tag: any) => personalizationTags.includes(tag.tag_name));
        personify.makeDecision(personify, {}, getVariants(targetedContent), (id: string) =>
          findVariant(id, targetedContent, setGroup)
        );
        personify.apiMissions = behaviors;
        personify.apiTags = tags;
      } else {
        personify.makeDecision(personify, {}, getVariants(targetedContent), (id: string) =>
          findVariant(id, targetedContent, setGroup)
        );
      }
    }

    determineVariant();
  }, [dcConfig, personify, xray, personalizationTags, personalizationBehaviors]);

  return (
    <div className={clsx(classes.root, className)}>
      {group && <HeroBannerBlock {...group.component} callToActionOnClick={callToActionOnClick}></HeroBannerBlock>}
    </div>
  );
};

export default withStyles(styles)(PersonalizedHeroBannerBlock);
