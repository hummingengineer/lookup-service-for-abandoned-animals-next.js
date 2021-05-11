import Box from '@material-ui/core/Box';
import ErrorIcon from '@material-ui/icons/ErrorOutline';

export default function Error() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      style={{
        height: 'inherit',
        color: 'red',
        flexDirection: 'column',
      }}
    >
      <ErrorIcon />
      <div style={{ fontSize: '1.0rem' }}>Error</div>
    </Box>
  );
}
