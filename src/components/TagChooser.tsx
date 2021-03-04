import { withStyles, WithStyles, Theme, Chip, Typography, CardHeader, CardContent } from '@material-ui/core';
import { useUserContext } from '@lib/UserContext';

import GpsFixedIcon from '@material-ui/icons/GpsFixed';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import { useDebug } from '@components/ui';
import { AdminCard } from '@components/AdminCard';

const styles = (theme: Theme) => ({
  root: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column' as 'column',
  },

  tags: {
    display: 'flex',
    flexWrap: 'wrap' as 'wrap',
    listStyle: 'none' as 'none',
    padding: 0,
    margin: 0,
  },

  icon: {
    fill: `${theme.palette.primary.main}`,
  },

  chip: {
    margin: theme.spacing(0.5),
  },
});

interface Props extends WithStyles<typeof styles> {
  className?: string;
  style?: React.CSSProperties;
}

const ProgressIcon = ({ value }: any) => {
  return (
    <div
      style={{
        width: 30,
        height: 30,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 6,
      }}
    >
      {Math.round(value * 100)}%
    </div>
  );
};

const notName = (name: string) => (x: string) => x !== name;

const getNames = (name: string, collection: Array<string>) => {
  return collection.includes(name) ? collection.filter(notName(name)) : [...collection, name];
};

const TargetingPanel: React.SFC<Props> = ({ classes }) => {
  const {
    personalizationTags,
    setPersonalizationTags,
    personalizationBehaviors,
    setPersonalizationBehaviors,
  } = useDebug();

  const {
    engines: { personify = {} },
  } = useUserContext();
  const { missions = [], mission_tags = [] } = personify;

  const handleClickTag = (name: string) => {
    const updatedTags = getNames(name, personalizationTags);
    setPersonalizationTags(updatedTags);
  };

  const handleClickBehavior = (name: string) => {
    const updatedBehaviours = getNames(name, personalizationBehaviors);
    setPersonalizationBehaviors(updatedBehaviours);
  };

  return (
    <div className={classes.root}>
      <AdminCard>
        <CardHeader
          avatar={
            <>
              <GpsFixedIcon className={classes.icon} />
            </>
          }
          title="Targeting Behaviors"
        />
        <CardContent>
          <ul className={classes.tags}>
            {missions.map(({ name, val }: { name: string; val: number }) => {
              const selected = personalizationBehaviors.indexOf(name) !== -1;

              return (
                <li key={name} className={classes.chip}>
                  <Chip
                    variant="default"
                    label={name}
                    icon={<ProgressIcon value={val} />}
                    onClick={() => handleClickBehavior(name)}
                    clickable
                    color={selected ? 'primary' : undefined}
                  />
                </li>
              );
            })}
            {missions.length === 0 && <Typography variant="caption">No targeting campaign for this page.</Typography>}
          </ul>
        </CardContent>
      </AdminCard>

      <AdminCard>
        <CardHeader
          avatar={
            <>
              <LocalOfferIcon className={classes.icon} />
            </>
          }
          title="Targeting Tags"
        />
        <CardContent>
          <ul className={classes.tags}>
            {mission_tags.map(({ tag_name, tag_score }) => {
              const selected = personalizationTags.indexOf(tag_name) !== -1;

              return (
                <li key={tag_name} className={classes.chip}>
                  <Chip
                    variant="default"
                    label={tag_name}
                    icon={<ProgressIcon value={tag_score} />}
                    onClick={() => handleClickTag(tag_name)}
                    clickable
                    color={selected ? 'primary' : undefined}
                  />
                </li>
              );
            })}
            {missions.length === 0 && <Typography variant="caption">No targeting campaign for this page.</Typography>}
          </ul>
        </CardContent>
      </AdminCard>
    </div>
  );
};

export default withStyles(styles)(TargetingPanel);
