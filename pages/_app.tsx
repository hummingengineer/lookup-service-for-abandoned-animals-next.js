import Head from 'next/head';
import dynamic from 'next/dynamic';
import type { AppProps } from 'next/app';

import { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';

import { makeStyles, Theme, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import orange from '@material-ui/core/colors/orange';
import deepOrange from '@material-ui/core/colors/deepOrange';

import { wrapper } from '../common/client/store';
import { RootState } from '../common/client/store';

const CssBaseline = dynamic(() => import('@material-ui/core/CssBaseline'));

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    padding: () => theme.spacing(3),
  },
  appBarSpacer: theme.mixins.toolbar,
}));

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles);
    }
  }, []);

  const isDarkTheme = useSelector((state: RootState) => state.darkTheme.isOn);

  const theme = useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: isDarkTheme ? 'dark' : 'light',
          primary: {
            main: isDarkTheme ? orange[500] : '#3f51b5',
          },
          secondary: {
            main: isDarkTheme ? deepOrange[900] : '#f50057',
          },
        },
      }),
    [isDarkTheme]
  );

  const classes = useStyles();

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no"
        />
        <meta name="description" content="유기동물 조회 서비스" />
        <meta name="keywords" content="animal,pet" />
        <title>유기동물 조회 서비스</title>
      </Head>

      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className={classes.root}>
          <header>
            {/* <AppBar /> */}
            {/* <Drawer /> */}
          </header>
          <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Component {...pageProps} />
          </main>
        </div>
      </ThemeProvider>
    </>
  );
}

export default wrapper.withRedux(MyApp);
