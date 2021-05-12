import dynamic from 'next/dynamic';
import clsx from 'clsx';
import { makeStyles, Theme } from '@material-ui/core/styles';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import useQuery from '../../hooks/useQuery';
import { Row } from '../../types';

const Chart = dynamic(() => import('../Chart'));
const Card = dynamic<{ popfile: string; kindCd: string; processState: string }>(() =>
  import('../Card').then((mod) => mod.ImageCard)
);
const Table = dynamic<{ rows: Array<Row> }>(() => import('../Table'));
const CardLoading = dynamic(() => import('../Loading'));
const TableLoading = dynamic<{}>(() => import('../Loading').then((mod) => mod.LoadingWithTitle));
const Error = dynamic(() => import('../Error'));

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

export default function Dashboard() {
  const classes = useStyles();

  const { data, isLoading, isError } = useQuery(
    '{ abandonmentPublic(numOfRows: "5") { item { popfile processState happenDt kindCd happenPlace careAddr careTel } } }'
  );

  let card;
  let table;
  if (isLoading) {
    card = <CardLoading />;
    table = <TableLoading />;
  } else if (isError) {
    card = <Error />;
    table = <Error />;
  } else {
    card = (
      <Card
        popfile={data.abandonmentPublic.item[0].popfile}
        kindCd={data.abandonmentPublic.item[0].kindCd}
        processState={data.abandonmentPublic.item[0].processState}
      />
    );
    table = <Table rows={data.abandonmentPublic.item} />;
  }

  return (
    <Container maxWidth="lg" className={classes.container}>
      <Grid container spacing={3}>
        {/* Chart */}
        <Grid item xs={12} md={8} lg={9}>
          <Paper className={clsx(classes.paper, classes.space, classes.fixedHeight)}>
            <Chart />
          </Paper>
        </Grid>
        {/* Recent card */}
        <Grid item xs={12} md={4} lg={3}>
          <Paper className={clsx(classes.paper, classes.fixedHeight)}>{card}</Paper>
        </Grid>
        {/* Recent table */}
        <Grid item xs={12}>
          <Paper className={clsx(classes.paper, classes.space)}>{table}</Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
