import React from 'react';
import { Box, Typography, Link, Button, Grid, TextField } from "@mui/material";

// Style Guide Colors as defined:
const COLORS = {
    // Background/Neutral (Mint/Pale Green)
    footerBg: '#BCD8C1', 
    // Primary Accent (Orange/Terracotta)
    primaryAccent: '#E57A44', 
    // Dark Text/Header (Dark Purple/Near Black)
    textDark: '#422040', 
    // Secondary Accent (Pale Yellow/Khaki)
    secondaryAccent: '#E3D985', 
};

// Footer Links Data
const companyLinks = [
    { label: 'About Us', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Press', href: '#' },
    { label: '#' },
];

const resourceLinks = [
    { label: 'Blog', href: '#' },
    { label: 'Help Center', href: '#' },
    { label: 'FAQ', href: '#' },
    { label: 'Terms & Privacy', href: '#' },
];


// Renamed component from App to Footer
const Footer = () => { 

    // Simple handler for the newsletter form
    const handleNewsletterSubmit = (e) => { 
        e.preventDefault(); 
        console.log('Newsletter subscription attempted!');
        // Add actual subscription logic here
    };

    return (
        // This is the footer element itself. The parent Layout.jsx handles the full-page layout.
        <Box 
            component="footer" 
            sx={{ 
                backgroundColor: COLORS.footerBg, 
                color: COLORS.textDark, 
                p: { xs: 3, md: 6 }, 
                boxShadow: '0 -4px 6px -1px rgba(0, 0, 0, 0.1), 0 -2px 4px -2px rgba(0, 0, 0, 0.06)'
            }}
        >
            {/* Inner content is centered via margin: 0 auto and max-width: 1280px */}
            <Box sx={{ maxWidth: '1280px', margin: '0 auto' }}>
                
                {/* Clients and Partners Logo Section */}
                <Box 
                    sx={{ 
                        mb: 5, 
                        p: { xs: 3, sm: 4 }, 
                        backgroundColor: COLORS.secondaryAccent, 
                        opacity: 0.7, 
                        borderRadius: 3, 
                        boxShadow: 3,
                        transition: 'all 300ms',
                        '&:hover': {
                            boxShadow: 6,
                        }
                    }}
                >
                    <Typography variant="h6" component="h3" sx={{ fontWeight: 700, textAlign: 'center', mb: 3, letterSpacing: '0.05em' }}>
                        Trusted by Innovators & Industry Leaders
                    </Typography>
                    
                    {/* Logos Grid (5 responsive placeholders) */}
                    <Grid container spacing={3} justifyContent="center" alignItems="center">
                        {[...Array(5)].map((_, index) => (
                            <Grid 
                                item 
                                xs={6} sm={4} lg={2} 
                                key={index}
                                // Hiding the 5th logo on small screens for responsiveness
                                sx={{ display: { xs: index === 4 ? 'none' : 'flex', lg: 'flex' }, justifyContent: 'center' }} 
                            >
                                <Box
                                    component="img"
                                    src={`https://placehold.co/120x40/${COLORS.secondaryAccent.substring(1)}/${COLORS.textDark.substring(1)}?text=Client+${String.fromCharCode(65 + index)}`} 
                                    alt={`Client ${String.fromCharCode(65 + index)} Logo`} 
                                    sx={{ 
                                        height: 40, 
                                        width: 'auto', 
                                        objectFit: 'contain', 
                                        borderRadius: 1,
                                        transition: 'transform 200ms',
                                        '&:hover': { transform: 'scale(1.05)' }
                                    }}
                                    // Error handling in case placeholder fails
                                    onError={(e) => { e.target.onerror = null; e.target.src=`https://placehold.co/120x40/${COLORS.secondaryAccent.substring(1)}/${COLORS.textDark.substring(1)}?text=Logo`; }} 
                                />
                            </Grid>
                        ))}
                    </Grid>
                    <Typography variant="caption" display="block" sx={{ fontSize: '0.75rem', textAlign: 'center', color: COLORS.textDark, opacity: 0.7, mt: 2 }}>
                      
                    </Typography>
                </Box>
                {/* END: Clients and Partners Logo Section */}
                
                {/* Main Footer Grid */}
                <Grid container spacing={5} sx={{ pb: 4, borderBottom: `1px solid ${COLORS.textDark}33` }}>

                    {/* 1. Brand Info & Social */}
                    <Grid item xs={12} sm={6} lg={3}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                            <Typography variant="h5" component="h2" sx={{ fontWeight: 700, color: COLORS.primaryAccent, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                                UNELMA
                            </Typography>
                            <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
                                Innovative platforms for a better digital experience.
                            </Typography>
                            
                            {/* Social Icons (Using SVG paths directly) */}
                            <Box sx={{ display: 'flex', gap: 2, pt: 1 }}>
    {/* 1. X (formerly Twitter) Icon */}
    <Link 
        href="https://x.com/yourprofile" 
        target="_blank" 
        color="inherit" 
        sx={{ 
            color: COLORS.primaryAccent, 
            transition: 'color 300ms, transform 300ms', 
            '&:hover': { color: COLORS.textDark, transform: 'scale(1.15)' } 
        }}
        aria-label="Follow us on X" // Added for accessibility
    >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2 1.1-.8 1.4-2.8 0-4s-3.7-1-4.7-3c-3-6 2-10.2 6-8.2 2.8 1.4 5 3.8 6.4 5.7.5.3 1.1.2 1.4-.4.4-.8.4-1.6 0-2.4 1.3.1 2.3 0 3.3-.8z"/>
        </svg>
    </Link>
    
    {/* 2. Facebook Icon */}
    <Link 
        href="https://facebook.com/yourprofile" 
        target="_blank" 
        color="inherit" 
        sx={{ 
            color: COLORS.primaryAccent, 
            transition: 'color 300ms, transform 300ms', 
            '&:hover': { color: COLORS.textDark, transform: 'scale(1.15)' } 
        }}
        aria-label="Find us on Facebook" // Added for accessibility
    >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
        </svg>
    </Link>
</Box>
                        </Box>
                    </Grid>

                    {/* 2. Company Links */}
                    <Grid item xs={6} sm={6} lg={3}>
                        <Typography variant="h6" component="h3" sx={{ fontWeight: 600, mb: 2, borderLeft: 4, borderColor: COLORS.primaryAccent, pl: 2, fontSize: '1.125rem' }}>Company</Typography>
                        <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0, display: 'flex', flexDirection: 'column', gap: 1 }}>
                            {companyLinks.map((item) => (
                                <Box component="li" key={item.label}>
                                    <Link href={item.href} underline="none" sx={{ fontSize: '0.875rem', color: COLORS.textDark, transition: 'color 200ms', '&:hover': { color: COLORS.primaryAccent } }}>
                                        {item.label}
                                    </Link>
                                </Box>
                            ))}
                        </Box>
                    </Grid>

                    {/* 3. Support & Resources */}
                    <Grid item xs={6} sm={6} lg={3}>
                        <Typography variant="h6" component="h3" sx={{ fontWeight: 600, mb: 2, borderLeft: 4, borderColor: COLORS.primaryAccent, pl: 2, fontSize: '1.125rem' }}>Resources</Typography>
                        <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0, display: 'flex', flexDirection: 'column', gap: 1 }}>
                            {resourceLinks.map((item) => (
                                <Box component="li" key={item.label}>
                                    <Link href={item.href} underline="none" sx={{ fontSize: '0.875rem', color: COLORS.textDark, transition: 'color 200ms', '&:hover': { color: COLORS.primaryAccent } }}>
                                        {item.label}
                                    </Link>
                                </Box>
                            ))}
                        </Box>
                    </Grid>

                    {/* 4. Newsletter Signup */}
                    <Grid item xs={12} lg={3}>
                        <Typography variant="h6" component="h3" sx={{ fontWeight: 600, mb: 2, borderLeft: 4, borderColor: COLORS.primaryAccent, pl: 2, fontSize: '1.125rem' }}>Stay Updated</Typography>
                        <Typography variant="body2" sx={{ fontSize: '0.875rem', mb: 2 }}>
                            Subscribe for the latest news and features.
                        </Typography>
                        
                        {/* Newsletter Form */}
                        <Box 
                            component="form" 
                            onSubmit={handleNewsletterSubmit}
                            sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 1 }}
                        >
                            <TextField 
                                fullWidth
                                size="small"
                                type="email" 
                                placeholder="Your email" 
                                required
                                variant="outlined"
                                sx={{
                                    // Custom styling to mimic Tailwind look
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: 2, // Equivalent to rounded-lg
                                        backgroundColor: `${COLORS.secondaryAccent}66`, // Secondary Accent with opacity
                                        color: COLORS.textDark,
                                        '& fieldset': { borderColor: `${COLORS.textDark}4D` }, // Border color
                                        '&:hover fieldset': { borderColor: COLORS.primaryAccent },
                                        '&.Mui-focused fieldset': { borderColor: COLORS.primaryAccent, borderWidth: '2px' },
                                        '& input::placeholder': { color: `${COLORS.textDark}99`, opacity: 1 },
                                    },
                                }}
                            />
                            <Button 
                                type="submit" 
                                variant="contained"
                                disableElevation
                                sx={{ 
                                    backgroundColor: COLORS.primaryAccent,
                                    color: 'white',
                                    fontWeight: 600,
                                    py: 1, 
                                    px: 2,
                                    borderRadius: 2, // rounded-lg
                                    boxShadow: 3,
                                    transition: 'all 300ms',
                                    '&:hover': { 
                                        backgroundColor: COLORS.primaryAccent, // Maintain color, use opacity change for hover effect
                                        opacity: 0.9,
                                        boxShadow: 6,
                                    }
                                }}
                            >
                                Subscribe
                            </Button>
                        </Box>
                    </Grid>
                </Grid>

                {/* Copyright Row */}
                <Box sx={{ pt: 3, textAlign: 'center', fontSize: '0.875rem', color: `${COLORS.textDark}B3` }}>
                    <Typography variant="caption" component="p" sx={{ fontSize: 'inherit' }}>
                        &copy; 2025 UNELMA Platforms. All rights reserved.
                    </Typography>
                </Box>

            </Box>
        </Box>
    );
};

export default Footer;