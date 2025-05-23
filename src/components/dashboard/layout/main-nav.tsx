'use client';

import * as React from 'react';
import Avatar from '@mui/material/Avatar'; // Kept for potential future use or if user profile is implied
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography'; // Added for text elements in the header
import InputBase from '@mui/material/InputBase'; // Added for the search input
import {
  Bell as BellIcon,
  List as ListIcon, // Kept for mobile nav toggle
  MagnifyingGlass as MagnifyingGlassIcon, // Kept for search icon within input
  Users as UsersIcon, // Replaced with UserCircle for profile icon
  Star as StarIcon, // Added for the star icon on the left
  Sun as SunIcon, // Added for theme toggle
  Layout as LayoutIcon, // Added for the layout icon
  UserCircle as UserCircleIcon, // Used for the user profile icon
} from '@phosphor-icons/react/dist/ssr';
import { Button } from '@mui/material';

// Mocking hooks and components from your original context for self-containment
// In a real project, you would import these from their respective paths.
const usePopover = () => ({
  anchorRef: React.useRef(null),
  open: false,
  handleOpen: () => {},
  handleClose: () => {},
});

// Mock MobileNav and UserPopover for demonstration
const MobileNav = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  if (!open) return null;
  return (
    <Box sx={{ p: 2, bgcolor: 'background.paper', border: '1px dashed grey', position: 'fixed', top: 0, left: 0, width: '250px', height: '100%', zIndex: 1200 }}>
      <Typography>Mobile Navigation Content</Typography>
      <Button onClick={onClose}>Close</Button>
    </Box>
  );
};
const UserPopover = ({ anchorEl, open, onClose }: { anchorEl: HTMLElement | null; open: boolean; onClose: () => void }) => {
  if (!open) return null;
  return (
    <Box sx={{ p: 2, bgcolor: 'background.paper', border: '1px dashed grey', position: 'absolute', top: anchorEl?.offsetTop, left: anchorEl?.offsetLeft, zIndex: 1300 }}>
      <Typography>User Popover Content</Typography>
      <Button onClick={onClose}>Close</Button>
    </Box>
  );
};

export function MainNav(): React.JSX.Element {
  const [openNav, setOpenNav] = React.useState<boolean>(false);
  const userPopover = usePopover();

  return (
    <React.Fragment>
      <Box
        component="header"
        sx={{
          borderBottom: '1px solid #E0E0E0', // Light gray border
          backgroundColor: '#FFFFFF', // White background
          position: 'sticky',
          top: 0,
          zIndex: 'var(--mui-zIndex-appBar)',
          boxShadow: '0 2px 4px rgba(0,0,0,0.02)', // Subtle shadow
        }}
      >
        <Stack
          direction="row"
          spacing={2}
          sx={{ alignItems: 'center', justifyContent: 'space-between', minHeight: '64px', px: 3 }} // Increased padding
        >
          {/* Left Section: Navigation/Breadcrumbs */}
          <Stack sx={{ alignItems: 'center' }} direction="row" spacing={1}>
            <IconButton
              onClick={(): void => {
                setOpenNav(true);
              }}
              sx={{ display: { lg: 'none' } }} // Show on small screens for mobile nav
            >
              <ListIcon fontSize="var(--icon-fontSize-lg)" />
            </IconButton>
            <StarIcon fontSize="var(--icon-fontSize-md)" color="#757575" /> {/* Star icon */}
            <Typography variant="body1" sx={{ color: '#424242', fontWeight: 500 }}>
              Projects
            </Typography>
            <Typography variant="body1" sx={{ color: '#BDBDBD' }}>
              /
            </Typography>
            <Typography variant="body1" sx={{ color: '#424242', fontWeight: 500 }}>
              Project 1
            </Typography>
            <Typography variant="body1" sx={{ color: '#BDBDBD' }}>
              /
            </Typography>
            <Typography variant="body1" sx={{ color: '#424242', fontWeight: 500 }}>
              Notifications
            </Typography>
          </Stack>

          {/* Right Section: Search and Icons */}
          <Stack sx={{ alignItems: 'center' }} direction="row" spacing={1}>
            {/* Search Input */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                bgcolor: '#F5F5F5', // Light gray background for search
                borderRadius: '8px',
                px: 1.5,
                py: 0.5,
                width: '200px', // Fixed width for search input
              }}
            >
              <MagnifyingGlassIcon fontSize="var(--icon-fontSize-md)" color="#757575" style={{ marginRight: 8 }} />
              <InputBase
                placeholder="Search"
                sx={{ flexGrow: 1, fontSize: '0.875rem', color: '#424242' }}
              />
            </Box>

            {/* Theme Toggle Icon */}
            <Tooltip title="Toggle theme">
              <IconButton>
                <SunIcon fontSize="var(--icon-fontSize-lg)" color="#FF7043" /> {/* Orange sun icon */}
              </IconButton>
            </Tooltip>

            {/* Notifications Icon with Badge */}
            <Tooltip title="Notifications">
              <Badge badgeContent={4} color="success" variant="dot" sx={{ '& .MuiBadge-dot': { bgcolor: '#4CAF50' } }}>
                <IconButton>
                  <BellIcon fontSize="var(--icon-fontSize-lg)" color="#757575" />
                </IconButton>
              </Badge>
            </Tooltip>

            {/* User Profile Icon */}
            <Tooltip title="Profile">
              <IconButton
                onClick={userPopover.handleOpen}
                ref={userPopover.anchorRef}
              >
                <UserCircleIcon fontSize="var(--icon-fontSize-lg)" color="#757575" />
              </IconButton>
            </Tooltip>

            {/* Layout Icon */}
            <Tooltip title="Layout">
              <IconButton>
                <LayoutIcon fontSize="var(--icon-fontSize-lg)" color="#757575" />
              </IconButton>
            </Tooltip>
          </Stack>
        </Stack>
      </Box>
      {/* User Popover and Mobile Nav are kept for completeness based on original component structure */}
      <UserPopover anchorEl={userPopover.anchorRef.current} onClose={userPopover.handleClose} open={userPopover.open} />
      <MobileNav
        onClose={() => {
          setOpenNav(false);
        }}
        open={openNav}
      />
    </React.Fragment>
  );
}

// Example usage of the MainNav component (for demonstration)
export function App() {
  return (
    <Box sx={{ height: '200px', width: '100%', bgcolor: '#f0f2f5' }}>
      <MainNav />
      <Typography sx={{ p: 3 }}>
        Content below the header...
      </Typography>
    </Box>
  );
}
