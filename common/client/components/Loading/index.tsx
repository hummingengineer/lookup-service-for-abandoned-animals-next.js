import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';

export default function Loading() {
  return <Skeleton variant="rect" width="100%" height="100%" />;
}

export function ChartLoading() {
  return (
    <>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        <Skeleton />
      </Typography>
      <Skeleton variant="rect" width="100%" height="100%" />
    </>
  );
}
