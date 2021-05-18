import React from 'react';
import Grid from '@material-ui/core/Grid';
import PaginationMaterial from '@material-ui/lab/Pagination';

function Pagination({
  page,
  totalPage,
  handleCriteria,
}: {
  page: number;
  totalPage: number;
  handleCriteria: (event: React.ChangeEvent<unknown>, name: string, value: number) => void;
}) {
  return (
    <Grid container justify="center">
      <PaginationMaterial
        count={totalPage}
        page={page}
        onChange={(event, value) => handleCriteria(event, 'pageNo', value)}
        color="primary"
      />
    </Grid>
  );
}

export default React.memo(Pagination);
