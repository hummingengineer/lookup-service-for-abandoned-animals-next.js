import React, { ChangeEvent } from 'react';
import Grid from '@material-ui/core/Grid';
import PaginationMaterial from '@material-ui/lab/Pagination';

function Pagination({
  page,
  totalPage,
  handleForm,
}: {
  page: number;
  totalPage: number;
  handleForm: (event: ChangeEvent<unknown>, name: string, value: number) => void;
}) {
  return (
    <Grid container justify="center">
      <PaginationMaterial
        count={totalPage}
        page={page}
        onChange={(event, value) => handleForm(event, 'pageNo', value)}
        color="primary"
      />
    </Grid>
  );
}

export default React.memo(Pagination);
