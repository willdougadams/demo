import { Typography, Paper, Link, List, ListItem, ListItemAvatar, Avatar, ListItemText, Box, Divider } from '@mui/material'
import MonitorIcon from '@mui/icons-material/Monitor';
import BugReportIcon from '@mui/icons-material/BugReport';
import StorageIcon from '@mui/icons-material/Storage';
import LanIcon from '@mui/icons-material/Lan';
import React from 'react'
import { HelixAnimation } from './HelixAnimation';

export const Home: React.FC = () => {
  return <Box paddingX={"5vw"} justifyContent="center" alignItems="center">
    <Typography variant="h3">
      If you&apos;ve found yourself here, you&apos;re likely considering hiring me.  Welcome!
    </Typography>
    <Divider style={{marginBottom: "3vh"}}/>
    <Typography variant="body1" maxWidth="66%">
      Coding interviews are fine to ensure I&apos;m not lying on my resume, but to demonstrate the breadth of my experience
      I set up this MVP of an Internet Software Product™ to cover the whole stack: frontend, backend, CI/CD, testing, 
      and code standards.
    </Typography>
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <MonitorIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Frontend" secondary="Typescript - React - Material UI" />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <StorageIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Backend" secondary="Typescript - NodeJS" />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <BugReportIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Testing" secondary="Jest - Enzyme" />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <LanIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="CI/CD" secondary="CircleCI - Github - Heroku" />
      </ListItem>
    </List>
    <Typography variant="body1" maxWidth="66%">
    For more details check out the repo:
    <Link href="https://github.com/willdougadams/demo" target="_blank">
      https://github.com/willdougadams/demo
    </Link>
    </Typography>
    <Divider />
    <Typography variant="body1" maxWidth="66%">
      Just for fun let&apos;s have Github Copilot write an intro for my demo site:
      <Paper sx={{marginLeft: "2vw"}}>
        I&apos;m a full-stack web developer with a passion for learning and a desire to build things that make people&apos;s lives better.
        I have a BS in Computer Science from CSUMB and have been working in the industry for 5 years. I&apos;ve worked on a variety of 
        projects from small internal tools to large-scale web applications. I&apos;m a quick learner and have a passion for learning however
        I can. I&apos;m a strong communicator and have experience working with teams of all sizes. I&apos;m a strong advocate for writing clean,
        maintainable code and I&apos;m always looking for ways to improve my skills.
      </Paper>
      Pretty good, huh?
    </Typography>
    <HelixAnimation />
  </Box>
}