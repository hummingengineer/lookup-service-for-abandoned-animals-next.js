import React from 'react';
import Typography from '@material-ui/core/Typography';

function Title({ children }: { children: string }) {
  return (
    <Typography component="h2" variant="h6" color="primary" gutterBottom>
      {children}
    </Typography>
  );
}

export default React.memo(Title);
