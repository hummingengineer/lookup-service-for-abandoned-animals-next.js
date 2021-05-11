import clsx from 'clsx';
import { makeStyles, Theme } from '@material-ui/core/styles';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  container: {
    paddingTop: () => theme.spacing(4),
    paddingBottom: () => theme.spacing(4),
  },
  paper: {
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  space: {
    padding: () => theme.spacing(2),
  },
  fixedHeight: {
    height: 240,
  },
}));

export function Dashboard() {
  const classes = useStyles();

  return (
    <Container maxWidth="lg" className={classes.container}>
      <Grid container spacing={3}>
        {/* Chart */}
        <Grid item xs={12} md={8} lg={9}>
          <Paper className={clsx(classes.paper, classes.space, classes.fixedHeight)}>
            <Chart />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
