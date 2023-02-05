import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { DrawerHeader } from './common/styledComponents';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { Home } from './home/Home'
import { Contact } from './contact/Contact'
import HomeIcon from '@mui/icons-material/Home'
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import InfoIcon from '@mui/icons-material/Info';
import { Button, ThemeProvider } from '@mui/material';
import { darkTheme, lightTheme, hotdogStandTheme } from './index';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

interface DrawerLinkProps {
  open: boolean
  to: string
  text: string
  icon: React.ReactNode
}

const DrawerLink: React.FC<DrawerLinkProps> = ({open, to, text, icon}) => {
  const navigate = useNavigate()
  return (
    <ListItem>
      <ListItemButton
        onClick={() => navigate(to)}
          sx={{
            minHeight: 48,
            justifyContent: open ? 'initial' : 'center',
            px: 2.5,
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 3 : 'auto',
              justifyContent: 'center',
            }}
          >
            {icon}
          </ListItemIcon>
          <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
      </ListItemButton>
    </ListItem>
  )
}

enum THEME_NAMES {
  LIGHT = 'light',
  DARK = 'dark',
  HOTDOG = 'hotdog'
}

export const App: React.FC = () => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [theme, setTheme] = React.useState<string>(THEME_NAMES.DARK)

  const themeForString = (themeString: string) => {
    if (themeString === 'light') return lightTheme
    if (themeString === 'hotdog') return hotdogStandTheme
    return darkTheme
  }

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const Greeting = () => {
    const now = new Date()
    const hour = now.getHours()
    return (
      <Typography variant="h6" noWrap component="div">
        { hour > 2 && hour <= 12 && 'Good Morning!'}
        { hour > 12 && hour <= 17 && 'Good Afternoon!'}
        { (hour > 17 || hour <= 2) && 'Good Evening!'}
      </Typography>
    )
  }

  return (
    <ThemeProvider theme={themeForString(theme)} >
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        <Router>
          <AppBar position="fixed" open={open}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{
                  marginRight: 5,
                  ...(open && { display: 'none' }),
                }}
              >
                <MenuIcon />
              </IconButton>
              <Greeting />
              <Select
                value={theme}
                label="Theme"
                onChange={(event) => setTheme(event.target.value)}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
              >
                <MenuItem value={THEME_NAMES.LIGHT}>Light</MenuItem>
                <MenuItem value={THEME_NAMES.DARK}>Dark</MenuItem>
                <MenuItem value={THEME_NAMES.HOTDOG}>Hot Dog Stand</MenuItem>
              </Select>
            </Toolbar>
          </AppBar>

          <Drawer variant="permanent" open={open}>
            <DrawerHeader>
              <IconButton onClick={handleDrawerClose}>
                <ChevronLeftIcon />
              </IconButton>
            </DrawerHeader>
            <Divider />
            <List>
              <DrawerLink open={open} to={'/'} text={'Home'} icon={<HomeIcon />}/>
              <DrawerLink open={open} to={'/contact'} text={'Contact'} icon={<ConnectWithoutContactIcon />}/>
              <DrawerLink open={open} to={'/about'} text={'About'} icon={<InfoIcon />}/>
            </List>
          </Drawer>
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <DrawerHeader />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/contact' element={<Contact />} />
            </Routes>
          </Box>
        </Router>
      </Box>
    </ThemeProvider>
  );
}