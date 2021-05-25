import makeStyles from '@material-ui/core/styles/makeStyles';

import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';

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
});

export default function Loading() {
  return <Skeleton variant="rect" width="100%" height="100%" />;
}

export function LoadingWithTitle() {
  return (
    <>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        <Skeleton />
      </Typography>
      <Skeleton variant="rect" width="100%" height="100%" />
    </>
  );
}

export function TableLoading() {
  return (
    <>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        <Skeleton />
      </Typography>
      {[0, 1, 2, 3, 4].map((v) => (
        <Typography key={v.toString()}>
          <Skeleton />
        </Typography>
      ))}
    </>
  );
}

export function CardLoading() {
  const classes = useStyles();

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card className={classes.card}>
        <Skeleton variant="rect" className={classes.cardMedia} />
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant="h5" component="h2">
            <Skeleton />
          </Typography>
          <Typography>
            <Skeleton />
          </Typography>
        </CardContent>
        <CardActions>
          <Button style={{ marginLeft: 'auto' }} size="small" color="primary">
            <Skeleton width="100%" height="100%" />
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
