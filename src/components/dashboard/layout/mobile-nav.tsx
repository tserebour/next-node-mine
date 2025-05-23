'use client';

import * as React from 'react';
import { useState } from 'react';
// Mocking next/link for self-contained example
// In a real Next.js project, use: import RouterLink from 'next/link';
const RouterLink = React.forwardRef(({ href, ...props }: any, ref) => (
  <a href={href} ref={ref} {...props} />
));
RouterLink.displayName = 'RouterLink';

// Mocking next/navigation's usePathname for a self-contained example
// In a real Next.js project, use: import { usePathname } from 'next/navigation';
const usePathname = () => '/dashboard/project-details'; // Mock active path to highlight "Project Details"

import Box from '@mui/material/Box';
import Button from '@mui/material/Button'; // Added for the "Pro version" button
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer'; // Added for MobileNav
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import {
  ChartPie as ChartPieIcon,
  FolderSimple as FolderSimpleIcon,
  CaretDown as CaretDownIcon,
  CaretUp as CaretUpIcon,
  ChartBar as ChartBarIcon,
  CurrencyDollar as CurrencyDollarIcon,
  ChatCircleDots as ChatCircleDotsIcon,
  UserCircle as UserCircleIcon,
  SignOut as SignOutIcon,
  ArrowSquareUpRight as ArrowSquareUpRightIcon, // Added for "Pro version" button
  CaretUpDown as CaretUpDownIcon, // Added for "Workspace" box
} from '@phosphor-icons/react/dist/ssr';

// Mock paths as they are not fully provided in the original context
const paths = {
  home: '/',
  dashboard: {
    overview: '/dashboard/overview',
    project1: '/dashboard/project-1',
    projectDetails: '/dashboard/project-details',
    projects: '/dashboard/projects',
    project2: '/dashboard/project-2',
    project3: '/dashboard/project-3',
    project4: '/dashboard/project-4',
    project5: '/dashboard/project-5',
    reports: '/dashboard/reports',
    financials: '/dashboard/financials',
    messaging: '/dashboard/messaging',
    userProfile: '/dashboard/user-profile',
  },
  auth: {
    signIn: '/auth/sign-in',
  },
};

/**
 * Mock function to determine if a navigation item is active.
 * In a real application, this would likely involve more complex logic
 * like checking for partial matches or specific route patterns.
 */
const isNavItemActive = ({ pathname, href }: { pathname: string; href?: string }) => {
  if (!href) return false;
  return pathname === href;
};

/**
 * Custom Logo component for "Nexnode".
 * Uses Material UI Box and Typography for styling the logo text and icon.
 */
function Logo() {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      {/* Styled Box for the 'N' icon */}
      <Box
        sx={{
          width: '24px',
          height: '24px',
          borderRadius: '4px',
          bgcolor: '#FF7043', // Orange color for the 'N'
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 'bold',
          fontSize: '1rem',
        }}
      >
        N
      </Box>
      {/* Typography for "Nexnode" text */}
      <Typography variant="h6" sx={{ color: '#FF7043', fontWeight: 600 }}>
        Nexnode
      </Typography>
    </Box>
  );
}

/**
 * Interface for defining the structure of a navigation item.
 */
interface NavItemConfig {
  key: string;
  title: string;
  href?: string;
  icon?: string;
  external?: boolean;
  disabled?: boolean;
  matcher?: string;
  section?: string; // Custom property to group items into sections (e.g., Favorites, Dashboards)
  items?: NavItemConfig[]; // For nested navigation items (e.g., Pages -> Projects)
}

/**
 * Array of navigation items, structured to match the provided image.
 * Includes sections and nested items with their respective icons and paths.
 */
const navItems: NavItemConfig[] = [
  {
    key: 'favorites-overview',
    title: 'Overview',
    href: paths.dashboard.overview,
    icon: 'chartPie',
    section: 'Favorites',
  },
  {
    key: 'favorites-project-1',
    title: 'Project 1',
    href: paths.dashboard.project1,
    icon: 'chartPie',
    section: 'Favorites',
  },
  {
    key: 'dashboards-overview',
    title: 'Overview',
    href: paths.dashboard.overview,
    icon: 'chartPie',
    section: 'Dashboards',
  },
  {
    key: 'dashboards-project-details',
    title: 'Project Details',
    href: paths.dashboard.projectDetails,
    icon: 'folderSimple',
    section: 'Dashboards',
  },
  {
    key: 'dashboards-projects',
    title: 'Projects',
    href: paths.dashboard.projects,
    icon: 'folderSimple',
    section: 'Dashboards',
  },
  {
    key: 'pages', // Parent item for the 'Pages' section
    title: 'Pages',
    icon: 'folderSimple', // Icon for the main 'Pages' entry
    section: 'Pages',
    items: [
      {
        key: 'pages-projects-parent', // Parent for the nested projects list
        title: 'Projects',
        icon: 'folderSimple', // Icon for the 'Projects' sub-item
        items: [
          { key: 'pages-projects-1', title: 'Project 1', href: paths.dashboard.project1 },
          { key: 'pages-projects-2', title: 'Project 2', href: paths.dashboard.project2 },
          { key: 'pages-projects-3', title: 'Project 3', href: paths.dashboard.project3 },
          { key: 'pages-projects-4', title: 'Project 4', href: paths.dashboard.project4 },
          { key: 'pages-projects-5', title: 'Project 5', href: paths.dashboard.project5 },
        ],
      },
      { key: 'pages-reports', title: 'Reports', href: paths.dashboard.reports, icon: 'chartBar' },
      { key: 'pages-financials', title: 'Financials', href: paths.dashboard.financials, icon: 'currencyDollar' },
      { key: 'pages-messaging', title: 'Messaging', href: paths.dashboard.messaging, icon: 'chatCircleDots' },
      { key: 'pages-user-profile', title: 'User Profile', href: paths.dashboard.userProfile, icon: 'userCircle' },
    ],
  },
  {
    key: 'logout',
    title: 'Log out',
    href: paths.auth.signIn, // Placeholder for logout action
    icon: 'signOut',
    section: 'Footer', // Custom section to place it at the bottom
  },
];

/**
 * Mapping of icon names (strings) to Phosphor Icon components.
 */
const navIcons: Record<string, React.ElementType> = {
  chartPie: ChartPieIcon,
  folderSimple: FolderSimpleIcon,
  chartBar: ChartBarIcon,
  currencyDollar: CurrencyDollarIcon,
  chatCircleDots: ChatCircleDotsIcon,
  userCircle: UserCircleIcon,
  signOut: SignOutIcon,
};

/**
 * Props interface for the NavItem component.
 */
interface NavItemProps extends Omit<NavItemConfig, 'items'> {
  pathname: string;
  items?: NavItemConfig[]; // Include items for recursive rendering
  depth?: number; // Used for indentation of nested items
}

/**
 * NavItem component represents a single item in the side navigation.
 * It handles active states, icons, and collapsible nested lists.
 */
function NavItem({ disabled, external, href, icon, matcher, pathname, title, items, depth = 0 }: NavItemProps): React.JSX.Element {
  const active = isNavItemActive({ pathname, href });
  const Icon = icon ? navIcons[icon] : null;
  const hasChildren = items && items.length > 0;

  // State to manage the expanded/collapsed state of nested items.
  // 'Pages' and 'Projects' under 'Pages' are expanded by default as per the image.
  const [expanded, setExpanded] = useState(
    (depth === 0 && title === 'Pages') || (depth === 1 && title === 'Projects')
  );

  /**
   * Handles the click event for navigation items.
   * If the item has children, it toggles the expanded state.
   */
  const handleToggleExpand = (event: React.MouseEvent) => {
    if (hasChildren) {
      event.preventDefault(); // Prevent navigation if it's a parent item
      setExpanded(!expanded);
    }
  };

  // Calculate left padding based on the depth to create indentation for nested items.
  const paddingLeft = 16 + depth * 16; // Base padding + 16px per depth level

  return (
    <li>
      <Box
        {...(href && !hasChildren // If it's a leaf node with a href, make it a link
          ? {
              component: external ? 'a' : RouterLink,
              href,
              target: external ? '_blank' : undefined,
              rel: external ? 'noreferrer' : undefined,
            }
          : { // Otherwise, it's a button role, primarily for expanding/collapsing
              role: 'button',
              onClick: handleToggleExpand,
            })}
        sx={{
          alignItems: 'center',
          borderRadius: 1,
          color: active ? '#FF7043' : '#424242', // Orange for active, dark gray for inactive text
          bgcolor: active ? '#FFF3E0' : 'transparent', // Light orange background for active item
          cursor: 'pointer',
          display: 'flex',
          flex: '0 0 auto',
          gap: 1,
          pl: `${paddingLeft}px`, // Apply dynamic left padding
          pr: '16px', // Right padding
          py: '6px', // Vertical padding
          position: 'relative',
          textDecoration: 'none',
          whiteSpace: 'nowrap',
          '&:hover': {
            bgcolor: '#EEEEEE', // Lighter gray on hover
          },
          ...(disabled && {
            bgcolor: 'var(--NavItem-disabled-background)', // Disabled background color
            color: 'var(--NavItem-disabled-color)', // Disabled text color
            cursor: 'not-allowed', // Not-allowed cursor for disabled items
          }),
        }}
      >
        {Icon ? (
          // Render the icon if available
          <Box sx={{ alignItems: 'center', display: 'flex', justifyContent: 'center', flex: '0 0 auto' }}>
            <Icon
              fill={active ? '#FF7043' : '#757575'} // Orange fill for active icon, medium gray for inactive
              fontSize="var(--icon-fontSize-md)" // Icon size
              weight={active ? 'fill' : undefined} // Fill icon if active
            />
          </Box>
        ) : (
          // For sub-items without specific icons, render a small dot
          depth > 0 && (
            <Box
              sx={{
                width: '6px', // Size of the dot
                height: '6px',
                borderRadius: '50%', // Make it a circle
                bgcolor: active ? '#FF7043' : '#BDBDBD', // Orange dot if active, else light gray
                mr: '8px', // Margin to separate dot from text
                ml: '8px', // Adjust left margin to align with icon area
              }}
            />
          )
        )}
        <Box sx={{ flex: '1 1 auto' }}>
          <Typography component="span" sx={{ color: 'inherit', fontSize: '0.875rem', fontWeight: 500, lineHeight: '28px' }}>
            {title}
          </Typography>
        </Box>
        {hasChildren && (
          // Render caret icon for expandable items
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {expanded ? <CaretUpIcon fontSize="var(--icon-fontSize-sm)" /> : <CaretDownIcon fontSize="var(--icon-fontSize-sm)" />}
          </Box>
        )}
      </Box>
      {hasChildren && expanded && (
        // Recursively render children if expanded
        <Stack component="ul" spacing={0.5} sx={{ listStyle: 'none', m: 0, p: 0 }}>
          {items?.map((item) => (
            <React.Fragment key={item.key}>
              <NavItem pathname={pathname} {...item} depth={depth + 1} />
              {/* Add a dashed divider after 'Project 3' within the nested projects list */}
              {depth + 1 === 2 && item.key === 'pages-projects-3' && (
                <Divider sx={{ borderColor: '#E0E0E0', borderStyle: 'dashed', my: 0.5 }} />
              )}
            </React.Fragment>
          ))}
        </Stack>
      )}
    </li>
  );
}

/**
 * SideNav component, the main container for the navigation.
 * It structures the navigation into sections as seen in the image.
 */
export function SideNav(): React.JSX.Element {
  const pathname = usePathname(); // Get the current path for active item highlighting

  // Group navigation items by their 'section' property for structured rendering.
  const sections: Record<string, NavItemConfig[]> = navItems.reduce((acc: Record<string, NavItemConfig[]>, curr: NavItemConfig) => {
    const sectionName = curr.section || 'Uncategorized'; // Default to 'Uncategorized' if no section
    if (!acc[sectionName]) {
      acc[sectionName] = [];
    }
    acc[sectionName].push(curr);
    return acc;
  }, {});

  return (
    <Box
      sx={{
        // Custom CSS variables for consistent styling across the side navigation.
        '--SideNav-background': '#FFFFFF', // White background for the sidebar
        '--SideNav-color': '#424242', // Dark gray text color for general items
        '--NavItem-color': '#424242', // Dark gray for inactive navigation items
        '--NavItem-hover-background': '#F5F5F5', // Lighter gray on hover
        '--NavItem-active-background': '#FFF3E0', // Light orange background for active items
        '--NavItem-active-color': '#FF7043', // Orange text color for active items
        '--NavItem-disabled-color': '#9E9E9E', // Gray for disabled items
        '--NavItem-icon-color': '#757575', // Medium gray for inactive item icons
        '--NavItem-icon-active-color': '#FF7043', // Orange for active item icons
        '--NavItem-icon-disabled-color': '#BDBDBD', // Lighter gray for disabled item icons

        bgcolor: 'var(--SideNav-background)', // Apply background color
        color: 'var(--SideNav-color)', // Apply text color
        display: { xs: 'none', lg: 'flex' }, // Hide on small screens, show on large
        flexDirection: 'column', // Arrange content vertically
        height: '100%', // Full height of its parent
        left: 0,
        maxWidth: '100%',
        position: 'fixed', // Fixed position on the screen
        scrollbarWidth: 'none', // Hide scrollbar for Firefox
        top: 0,
        width: '280px', // Fixed width for the sidebar as seen in the image
        zIndex: 1000, // High z-index to stay on top
        '&::-webkit-scrollbar': { display: 'none' }, // Hide scrollbar for Webkit browsers
        borderRight: '1px solid #E0E0E0', // Subtle border on the right side
      }}
    >
      {/* Logo Section */}
      <Stack spacing={2} sx={{ p: 3 }}>
        <Box component={RouterLink} href={paths.home} sx={{ display: 'inline-flex' }}>
          <Logo />
        </Box>
      </Stack>
      <Divider sx={{ borderColor: '#E0E0E0' }} /> {/* Divider after logo */}

      {/* Navigation Items Section */}
      <Box component="nav" sx={{ flex: '1 1 auto', p: '12px 0' }}>
        {/* Render Favorites section */}
        {sections['Favorites'] && (
          <Stack spacing={0.5} sx={{ px: 2, pb: 1 }}>
            <Typography variant="overline" sx={{ color: '#9E9E9E', mb: 0.5 }}>
              Favorites
            </Typography>
            <Stack component="ul" spacing={0.5} sx={{ listStyle: 'none', m: 0, p: 0 }}>
              {sections['Favorites'].map((item) => (
                <NavItem pathname={pathname} {...item} />
              ))}
            </Stack>
          </Stack>
        )}
        {sections['Favorites'] && <Divider sx={{ borderColor: '#E0E0E0', my: 1 }} />} {/* Divider after Favorites */}

        {/* Render Dashboards section */}
        {sections['Dashboards'] && (
          <Stack spacing={0.5} sx={{ px: 2, pb: 1 }}>
            <Typography variant="overline" sx={{ color: '#9E9E9E', mb: 0.5 }}>
              Dashboards
            </Typography>
            <Stack component="ul" spacing={0.5} sx={{ listStyle: 'none', m: 0, p: 0 }}>
              {sections['Dashboards'].map((item) => (
                <NavItem  pathname={pathname} {...item} />
              ))}
            </Stack>
          </Stack>
        )}
        {sections['Dashboards'] && <Divider sx={{ borderColor: '#E0E0E0', my: 1 }} />} {/* Divider after Dashboards */}

        {/* Render Pages section */}
        {sections['Pages'] && (
          <Stack spacing={0.5} sx={{ px: 2, pb: 1 }}>
            <Typography variant="overline" sx={{ color: '#9E9E9E', mb: 0.5 }}>
              Pages
            </Typography>
            <Stack component="ul" spacing={0.5} sx={{ listStyle: 'none', m: 0, p: 0 }}>
              {sections['Pages'].map((item) => (
                <NavItem  pathname={pathname} {...item} />
              ))}
            </Stack>
          </Stack>
        )}
      </Box>

      {/* Log out Section (always at the bottom) */}
      {sections['Footer'] && (
        <Stack spacing={0.5} sx={{ p: '12px 0' }}>
          <Stack component="ul" spacing={0.5} sx={{ listStyle: 'none', m: 0, p: 0 }}>
            {sections['Footer'].map((item) => (
              <NavItem pathname={pathname} {...item} />
            ))}
          </Stack>
        </Stack>
      )}
    </Box>
  );
}

export interface MobileNavProps {
  onClose?: () => void;
  open?: boolean;
}

export function MobileNav({ open, onClose }: MobileNavProps): React.JSX.Element {
  const pathname = usePathname();

  // Group navigation items by their 'section' property for structured rendering.
  const sections: Record<string, NavItemConfig[]> = navItems.reduce((acc: Record<string, NavItemConfig[]>, curr: NavItemConfig) => {
    const sectionName = curr.section || 'Uncategorized';
    if (!acc[sectionName]) {
      acc[sectionName] = [];
    }
    acc[sectionName].push(curr);
    return acc;
  }, {});

  return (
    <Drawer
      PaperProps={{
        sx: {
          // Custom CSS variables for consistent styling across the mobile navigation.
          '--MobileNav-background': '#FFFFFF', // White background for the sidebar
          '--MobileNav-color': '#424242', // Dark gray text color for general items
          '--NavItem-color': '#424242', // Dark gray for inactive navigation items
          '--NavItem-hover-background': '#F5F5F5', // Lighter gray on hover
          '--NavItem-active-background': '#FFF3E0', // Light orange background for active items
          '--NavItem-active-color': '#FF7043', // Orange text color for active items
          '--NavItem-disabled-color': '#9E9E9E', // Gray for disabled items
          '--NavItem-icon-color': '#757575', // Medium gray for inactive item icons
          '--NavItem-icon-active-color': '#FF7043', // Orange for active item icons
          '--NavItem-icon-disabled-color': '#BDBDBD', // Lighter gray for disabled item icons

          bgcolor: 'var(--MobileNav-background)',
          color: 'var(--MobileNav-color)',
          display: 'flex',
          flexDirection: 'column',
          maxWidth: '100%',
          scrollbarWidth: 'none',
          width: '280px', // Fixed width for the mobile sidebar
          zIndex: 1000,
          '&::-webkit-scrollbar': { display: 'none' },
        },
      }}
      onClose={onClose}
      open={open}
    >
      <Stack spacing={2} sx={{ p: 3 }}>
        <Box component={RouterLink} href={paths.home} sx={{ display: 'inline-flex' }}>
          {/* Using the custom Logo component */}
          <Logo />
        </Box>
        {/* Workspace Box */}
        <Box
          sx={{
            alignItems: 'center',
            backgroundColor: '#F5F5F5', // Lighter background for the workspace box
            border: '1px solid #E0E0E0', // Light gray border
            borderRadius: '8px', // Slightly less rounded corners
            cursor: 'pointer',
            display: 'flex',
            p: '8px 12px', // Adjusted padding
          }}
        >
          <Box sx={{ flex: '1 1 auto' }}>
            <Typography color="#757575" variant="body2" sx={{ fontSize: '0.75rem' }}>
              Workspace
            </Typography>
            <Typography color="#424242" variant="subtitle1" sx={{ fontWeight: 600 }}>
              Devias
            </Typography>
          </Box>
          <CaretUpDownIcon fontSize="var(--icon-fontSize-sm)" color="#757575" />
        </Box>
      </Stack>
      <Divider sx={{ borderColor: '#E0E0E0' }} />

      <Box component="nav" sx={{ flex: '1 1 auto', p: '12px 0' }}>
        {/* Render Favorites section */}
        {sections['Favorites'] && (
          <Stack spacing={0.5} sx={{ px: 2, pb: 1 }}>
            <Typography variant="overline" sx={{ color: '#9E9E9E', mb: 0.5 }}>
              Favorites
            </Typography>
            <Stack component="ul" spacing={0.5} sx={{ listStyle: 'none', m: 0, p: 0 }}>
              {sections['Favorites'].map((item) => (
                <NavItem  pathname={pathname} {...item} />
              ))}
            </Stack>
          </Stack>
        )}
        {sections['Favorites'] && <Divider sx={{ borderColor: '#E0E0E0', my: 1 }} />}

        {/* Render Dashboards section */}
        {sections['Dashboards'] && (
          <Stack spacing={0.5} sx={{ px: 2, pb: 1 }}>
            <Typography variant="overline" sx={{ color: '#9E9E9E', mb: 0.5 }}>
              Dashboards
            </Typography>
            <Stack component="ul" spacing={0.5} sx={{ listStyle: 'none', m: 0, p: 0 }}>
              {sections['Dashboards'].map((item) => (
                <NavItem  pathname={pathname} {...item} />
              ))}
            </Stack>
          </Stack>
        )}
        {sections['Dashboards'] && <Divider sx={{ borderColor: '#E0E0E0', my: 1 }} />}

        {/* Render Pages section */}
        {sections['Pages'] && (
          <Stack spacing={0.5} sx={{ px: 2, pb: 1 }}>
            <Typography variant="overline" sx={{ color: '#9E9E9E', mb: 0.5 }}>
              Pages
            </Typography>
            <Stack component="ul" spacing={0.5} sx={{ listStyle: 'none', m: 0, p: 0 }}>
              {sections['Pages'].map((item) => (
                <NavItem  pathname={pathname} {...item} />
              ))}
            </Stack>
          </Stack>
        )}
      </Box>

      <Divider sx={{ borderColor: '#E0E0E0' }} />
      {/* "Need more features?" section */}
      <Stack spacing={2} sx={{ p: '12px' }}>
        <div>
          <Typography color="#424242" variant="subtitle2" sx={{ fontWeight: 600 }}>
            Need more features?
          </Typography>
          <Typography color="#757575" variant="body2" sx={{ fontSize: '0.8rem' }}>
            Check out our Pro solution template.
          </Typography>
        </div>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Box
            component="img"
            alt="Pro version"
            src="https://placehold.co/160x90/E0E0E0/424242?text=Pro+Version" // Placeholder image
            sx={{ height: 'auto', width: '160px', borderRadius: '8px' }}
          />
        </Box>
        <Button
          component="a"
          endIcon={<ArrowSquareUpRightIcon fontSize="var(--icon-fontSize-md)" />}
          fullWidth
          href="https://material-kit-pro-react.devias.io/"
          sx={{ mt: 2, bgcolor: '#FF7043', '&:hover': { bgcolor: '#E65100' } }} // Orange button styling
          target="_blank"
          variant="contained"
        >
          Pro version
        </Button>
      </Stack>

      {/* Log out Section (always at the bottom) */}
      {sections['Footer'] && (
        <Stack spacing={0.5} sx={{ p: '12px 0' }}>
          <Stack component="ul" spacing={0.5} sx={{ listStyle: 'none', m: 0, p: 0 }}>
            {sections['Footer'].map((item) => (
              <NavItem  pathname={pathname} {...item} />
            ))}
          </Stack>
        </Stack>
      )}
    </Drawer>
  );
}
