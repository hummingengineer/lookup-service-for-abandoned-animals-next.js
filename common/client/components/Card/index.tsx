import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';

import Grid from '@material-ui/core/Grid';
import CardMaterial from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import CardActionArea from '@material-ui/core/CardActionArea';

import { Card as CardData } from '../../types';

const useStyles = makeStyles({
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
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
});

function Card({ card }: { card: CardData }) {
  const classes = useStyles();

  return (
    <Grid item xs={12} sm={6} md={4}>
      <CardMaterial className={classes.card}>
        <CardMedia className={classes.cardMedia} image={card.popfile} />
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant="h5" component="h2">
            {card.kindCd}
          </Typography>
          <Typography>{card.specialMark}</Typography>
        </CardContent>
        <CardActions>
          <Button style={{ marginLeft: 'auto' }} size="small" color="primary">
            자세히
          </Button>
        </CardActions>
      </CardMaterial>
    </Grid>
  );
}
export default React.memo(Card);

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
      <CardMaterial style={{ height: 'inherit' }}>
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
      </CardMaterial>
    );
  }
);
