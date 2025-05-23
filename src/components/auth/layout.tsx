
import * as React from 'react';
import RouterLink from 'next/link';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Item from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';

import { paths } from '@/paths';
import { DynamicLogo, Logo } from '@/components/core/logo';
import loginlogo from '../../../public/loginbackground/loginbckground.jpg';
import { flexbox } from '@mui/system';
import { Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { DynamicNexLogo } from '../core/nexlogo';
import { AuthAside } from './auth-aside';
export interface LayoutProps {
  children: React.ReactNode;
  asideContent?: AsideContent;

}

export interface AsideContent {
  title: string;
  description: string ;
  cta?: {
    label: string;
    href: string;
  };
}
export function Layout({ children,asideContent }: LayoutProps): React.JSX.Element {

  return (

    <Box
      sx={{
        display: { xs: 'flex', lg: 'grid' },
        flexDirection: 'column',
        gridTemplateColumns: '1fr 1fr',
        minHeight: '100%',
        direction: 'rtl'

      }}
    >
      {/* signup form */}
      <Box sx={{ display: 'flex', flex: '1 1 auto', flexDirection: 'column' }}>

        <Box sx={{ alignItems: 'center', display: 'flex', flex: '1 1 auto', justifyContent: 'center', p: 3 }}>
          <Box sx={{ maxWidth: '450px', width: '100%' }}>{children}</Box>
        </Box>
      </Box>
      {/* signup form */}
       {/* Reusable aside panel */}
 {asideContent && (
  <AuthAside
    title={asideContent.title}
    description={asideContent.description}
    cta={asideContent.cta}
  />
)}

        </Box>


  );
}
