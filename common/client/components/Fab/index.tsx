import dynamic from 'next/dynamic';
import React, { useState, useCallback } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';

import Zoom from '@material-ui/core/Zoom';
import FabMaterial from '@material-ui/core/Fab';
import SearchIcon from '@material-ui/icons/Search';

import { Form } from '../../types';

const Dialog = dynamic(() => import('../Dialog'));

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  fab: {
    position: 'fixed',
    bottom: () => theme.spacing(2),
    right: () => theme.spacing(2),
  },
}));

function Fab({
  handleCriteria,
}: {
  handleCriteria: (event: React.ChangeEvent<unknown>, name: string, value: Form) => void;
}) {
  const classes = useStyles();

  const [isDialog, setDialog] = useState(false);
  const handleDialog = useCallback(() => setDialog((prev) => !prev), []);

  return (
    <>
      <Zoom in>
        <FabMaterial
          className={classes.fab}
          color="primary"
          aria-label="search"
          onClick={handleDialog}
        >
          <SearchIcon />
        </FabMaterial>
      </Zoom>

      <Dialog isDialog={isDialog} handleDialog={handleDialog} handleCriteria={handleCriteria} />
    </>
  );
}

export default React.memo(Fab);
