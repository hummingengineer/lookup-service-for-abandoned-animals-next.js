import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(() => ({
  overlayTitle: {
    position: 'absolute',
    left: '9%',
    bottom: '20%',
    width: '100%',
    color: 'white',
  },
  overlayContent: {
    position: 'absolute',
    left: '10%',
    bottom: '10%',
    width: '100%',
    color: 'rgba(255,255,255,0.78)',
  },
}));

export const ImageCard = React.memo(
  ({
    popfile,
    kindCd,
    processState,
  }: {
    popfile: string;
    kindCd: string;
    processState: string;
  }) => {
    const classes = useStyles();

    return (
      <Card style={{ height: 'inherit' }}>
        <CardActionArea style={{ height: 'inherit' }}>
          <CardMedia component="img" alt="popfile" image={popfile} title="popfile" height="100%" />
          <Typography
            variant="h5"
            component="h2"
            align="left"
            noWrap
            className={classes.overlayTitle}
          >
            {kindCd}
          </Typography>
          <Typography
            variant="body2"
            component="p"
            align="left"
            noWrap
            className={classes.overlayContent}
          >
            {processState}
          </Typography>
        </CardActionArea>
      </Card>
    );
  }
);
