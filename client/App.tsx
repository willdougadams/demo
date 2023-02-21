import * as React from 'react'
import Box from '@mui/material/Box'
import { DrawerHeader } from './common/styledComponents'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import CssBaseline from '@mui/material/CssBaseline'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Home } from './home/Home'
import { Contact } from './contact/Contact'
import HomeIcon from '@mui/icons-material/Home'
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact'
import HighlightAltIcon from '@mui/icons-material/HighlightAlt';
import { ThemeProvider } from '@mui/material'
import { darkTheme, lightTheme, hotdogStandTheme } from './themes'
import { AppBar, Drawer, DrawerLink } from './appbar/AppBar'
import { Selector } from './selector/Selector'
import { Game } from './game/SimpleGame'

enum THEME_NAMES {
  LIGHT = 'light',
  DARK = 'dark',
  HOTDOG = 'hotdog'
}

enum PATHS {
  HOME = '/',
  SELECTOR = '/selector',
  CONTACT = '/contact',
  GAME = '/game'
}

export const App: React.FC = () => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [theme, setTheme] = React.useState<string>(THEME_NAMES.DARK)

  const themeForString = (themeString: string) => {
    if (themeString === THEME_NAMES.LIGHT) return lightTheme
    if (themeString === THEME_NAMES.HOTDOG) return hotdogStandTheme
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
      <Typography variant="h6" noWrap component="div" sx={{marginRight: 5}}>
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
              <DrawerLink open={open} to={PATHS.HOME} text={'Home'} icon={<HomeIcon />}/>
              <DrawerLink open={open} to={PATHS.SELECTOR} text={'Selector'} icon={<HighlightAltIcon />}/>
              <DrawerLink open={open} to={PATHS.GAME} text={'Simple Game'} icon={<HighlightAltIcon />}/>
              <DrawerLink open={open} to={PATHS.CONTACT} text={'Contact'} icon={<ConnectWithoutContactIcon />}/>
            </List>
          </Drawer>
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <DrawerHeader />
            <Routes>
              <Route path={PATHS.HOME} element={<Home />} />
              <Route path={PATHS.SELECTOR} element={<Selector />} />
              <Route path={PATHS.GAME} element={<Game />} />
              <Route path={PATHS.CONTACT} element={<Contact />} />
            </Routes>
          </Box>
        </Router>
      </Box>
    </ThemeProvider>
  );
}