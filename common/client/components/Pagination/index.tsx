import Grid from '@material-ui/core/Grid';
import PaginationMaterial from '@material-ui/lab/Pagination';

export default function Pagination({ page, totalPage, handleForm }) {
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
