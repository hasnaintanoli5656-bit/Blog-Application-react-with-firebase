import React from 'react';
import { Box, Container, Typography, IconButton } from '@mui/material';
import ArticleIcon from '@mui/icons-material/Article';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: '#0f172a', color: '#94a3b8', pt: 6, pb: 4, mt: 'auto', borderTop: '1px solid #1e293b' }}>
      <Container maxWidth="xl">
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'center', md: 'flex-start' }, gap: 4, mb: 4 }}>
          
          {/* Brand Info */}
          <Box sx={{ textAlign: { xs: 'center', md: 'left' }, maxWidth: '350px' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: { xs: 'center', md: 'flex-start' }, gap: 1, mb: 2 }}>
              <ArticleIcon sx={{ color: '#6366f1', fontSize: '28px' }} />
              <Typography
                variant="h6"
                sx={{
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: 800,
                  letterSpacing: '.1rem',
                  color: '#ffffff',
                }}
              >
                BLOGIFY
              </Typography>
            </Box>
            <Typography sx={{ fontSize: '14px', lineHeight: 1.6, color: '#94a3b8' }}>
              A modern platform to share your thoughts, stories, and creativity with a passionate global community.
            </Typography>
          </Box>

          {/* Quick Links */}
          <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
            <Typography sx={{ fontSize: '16px', fontWeight: 700, color: '#ffffff', mb: 2 }}>
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link to="/" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '14px' }} className="hover:text-indigo-400">
                Home
              </Link>
              <Link to="/blog" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '14px' }} className="hover:text-indigo-400">
                Create Blog
              </Link>
              <Link to="/login" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '14px' }} className="hover:text-indigo-400">
                Login / Signup
              </Link>
            </Box>
          </Box>

          {/* Social Icons */}
          <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
            <Typography sx={{ fontSize: '16px', fontWeight: 700, color: '#ffffff', mb: 2 }}>
              Connect With Us
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, justifyContent: { xs: 'center', md: 'flex-start' } }}>
              <IconButton component="a" href="https://github.com/hasnaintanoli5656-bit" target="_blank" sx={{ color: '#94a3b8', '&:hover': { color: '#ffffff', backgroundColor: '#1e293b' } }}>
                <GitHubIcon />
              </IconButton>
              <IconButton component="a" href="https://www.linkedin.com/in/hasnaintanoli/" target="_blank" sx={{ color: '#94a3b8', '&:hover': { color: '#3b82f6', backgroundColor: '#1e293b' } }}>
                <LinkedInIcon />
              </IconButton>
              
            </Box>
          </Box>

        </Box>

        {/* Divider & Copyright */}
        <Box sx={{ borderTop: '1px solid #1e293b', pt: 3, textAlign: 'center' }}>
          <Typography sx={{ fontSize: '13px', color: '#64748b' }}>
            © {new Date().getFullYear()} Blogify Application. All rights reserved. Built with React & Firebase.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;