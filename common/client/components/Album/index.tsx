import React from 'react';
import dynamic from 'next/dynamic';
import { makeStyles, Theme } from '@material-ui/core/styles';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import { Criteria, Card as CardData } from '../../types';
import useAlbum from '../../hooks/useAlbum';

const Loading = dynamic<{}>(() => import('../Loading').then((mod) => mod.CardLoading));
const Card = dynamic<{ card: CardData }>(() => import('../Card').then((mod) => mod.default));
const Pagination = dynamic(() => import('../Pagination'));

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
}));

function Album({
  criteria,
  handleCriteria,
}: {
  criteria: Criteria;
  handleCriteria: (event: React.ChangeEvent<unknown>, name: string, value: number) => void;
}) {
  const classes = useStyles();

  const { cards, totalCount, isLoading, isError } = useAlbum(criteria);

  if (isLoading)
    return (
      <Container className={classes.cardGrid} maxWidth="md">
        <Grid container spacing={4}>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((v) => (
            <Loading key={v.toString()} />
          ))}
        </Grid>
      </Container>
    );
  if (isError) return null;

  return (
    <>
      <Container className={classes.cardGrid} maxWidth="md">
        <Grid container spacing={4}>
          {cards.map((card: CardData) => (
            <Card key={card.desertionNo} card={card} />
          ))}
        </Grid>
      </Container>
      <Pagination
        page={parseInt(criteria.pageNo)}
        totalPage={Math.ceil(parseInt(totalCount) / parseInt(criteria.numOfRows))}
        handleCriteria={handleCriteria}
      />
    </>
  );
}

export default React.memo(Album);
