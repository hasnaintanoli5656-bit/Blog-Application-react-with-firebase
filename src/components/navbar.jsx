import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import ArticleIcon from '@mui/icons-material/Article';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from "firebase/auth";
import { auth } from '../firebase/config.js';

const pages = [
  { name: "Home", url: "/" }, 
  { name: "Create Blog", url: "/blog" }
];

function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.log("Logout error:", error);
    }
  };

  const settings = [
    { name: 'Profile', handler: () => {} },
    { name: 'Dashboard', handler: () => {} },
    { name: 'Logout', handler: logoutHandler }
  ];

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  return (
    <AppBar position="sticky" elevation={0} sx={{ backgroundColor: '#ffffff', color: '#1e293b', borderBottom: '1px solid #e2e8f0' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          
          {/* Logo / Brand */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <ArticleIcon sx={{ color: '#6366f1', fontSize: '28px' }} />
            <Typography
              variant="h6"
              component={Link}
              to="/"
              sx={{
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 800,
                letterSpacing: '.1rem',
                color: '#0f172a',
                textDecoration: 'none',
              }}
            >
              BLOGIFY
            </Typography>
          </Box>

          {/* Desktop Navigation Links */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                component={Link}
                to={page.url}
                sx={{ 
                  color: '#475569', 
                  fontWeight: 600,
                  textTransform: 'none',
                  '&:hover': { color: '#6366f1', backgroundColor: '#f8fafc' } 
                }}
              >
                {page.name}
              </Button>
            ))}
          </Box>

          {/* User Profile & Menu */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="User Avatar" src="/static/images/avatar/2.jpg" sx={{ border: '2px solid #6366f1' }} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              anchorEl={anchorElUser}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting.name} onClick={() => { handleCloseUserMenu(); setting.handler(); }}>
                  <Typography sx={{ textAlign: 'center', fontSize: '14px', fontWeight: 500 }}>{setting.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;