import { useHistory, useLocation } from 'react-router-dom';
import { format } from 'date-fns';

import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import SubjectOutlined from '@material-ui/icons/SubjectOutlined';
import AddCircleOutline from '@material-ui/icons/AddCircleOutline';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import Avatar from '@material-ui/core/Avatar';
import avatar from '../assets/images/mario-av.png';

import { makeStyles } from '@material-ui/core';

const drawerWidth = 240;

const menuItems = [
  {
    id: 101,
    label: 'Notes List',
    icon: <SubjectOutlined color="secondary" />,
    path: '/',
  },
  {
    id: 102,
    label: 'Create Notes',
    icon: <AddCircleOutline color="secondary" />,
    path: '/create',
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  page: {
    backgroundColor: '#f9f9f9',
    width: '100%',
    padding: theme.spacing(3),
  },
  drawer: {
    width: drawerWidth,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  activeTab: {
    background: '#f0f0f0',
  },
  title: {
    padding: theme.spacing(2),
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
  },
  toolbar: theme.mixins.toolbar,
  date: {
    flexGrow: 1,
  },
  avatar: {
    marginLeft: theme.spacing(2),
  },
}));

export default function Layout({ children }) {
  const classes = useStyles();
  const history = useHistory();
  const { pathname } = useLocation();

  const menuItemsRender = menuItems.map((menuItem) => (
    <ListItem
      button
      key={menuItem.id}
      onClick={() => history.push(menuItem.path)}
      className={pathname === menuItem.path ? classes.activeTab : null}
    >
      <ListItemIcon>{menuItem.icon}</ListItemIcon>
      <ListItemText primary={menuItem.label} />
    </ListItem>
  ));

  return (
    <div className={classes.root}>
      {/* app bar */}

      <AppBar className={classes.appBar} elevation={0}>
        <Toolbar position="static">
          <Typography className={classes.date}>
            Today is the {format(new Date(), 'do MMMM Y')}
          </Typography>
          <Typography>UserName</Typography>
          <Avatar className={classes.avatar} src={avatar} />
        </Toolbar>
      </AppBar>
      {/* side drawer */}
      <Drawer
        className={classes.drawer}
        variant="permanent"
        anchor="left"
        classes={{ paper: classes.drawerPaper }}
        PaperProps={{ elevation: 2 }}
      >
        <div>
          <Typography variant="h5" className={classes.title}>
            My Notes
          </Typography>
        </div>

        {/* list links */}
        <List>{menuItemsRender}</List>
      </Drawer>

      <div className={classes.page}>
        <div className={classes.toolbar}></div>
        {children}
      </div>
    </div>
  );
}
