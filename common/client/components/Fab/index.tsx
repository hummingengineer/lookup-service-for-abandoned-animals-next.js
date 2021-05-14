import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';

import Zoom from '@material-ui/core/Zoom';
import FabMaterial from '@material-ui/core/Fab';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  fab: {
    position: 'fixed',
    bottom: () => theme.spacing(2),
    right: () => theme.spacing(2),
  },
}));

export function Fab() {
  const classes = useStyles();

  return (
    <Zoom in>
      <FabMaterial
        className={classes.fab}
        color="primary"
        aria-label="search"
        // onClick={handleDialogOpen}
      >
        <SearchIcon />
      </FabMaterial>
    </Zoom>
  );
}

export default React.memo(Fab);
