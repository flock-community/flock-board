import React, { ReactNode } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  makeStyles
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

interface AppLayoutProps {
  children: ReactNode;
  title: string;
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  main: {
    display: "flex",
    "align-items": "center",
    "flex-direction": "column"
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

export function AppLayout({ children, title }: AppLayoutProps) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
      <main className={classes.main}>{children}</main>
    </div>
  );
}
