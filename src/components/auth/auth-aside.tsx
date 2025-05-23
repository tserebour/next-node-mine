import React from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import RouterLink from 'next/link';
import { paths } from '@/paths';
import { DynamicNexLogo } from '../core/nexlogo';
import loginlogo from '../../../public/loginbackground/loginbckground.jpg';

export interface AuthAsideProps {
  title: string;
  description: string;
  cta?: {
    label: string;
    href: string;
  };
}

export function AuthAside({ title, description, cta }: AuthAsideProps) {
  return (
    <Box
      sx={{
        backgroundImage: `url(${loginlogo.src})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
       backgroundColor: 'rgba(255, 132, 0, 0.65)',
    backgroundBlendMode: 'soft-light',
    boxShadow: '4px 0px 7.2px 2px rgba(0, 0, 0, 0.25)', // from Figma
        display: { xs: 'none', lg: 'flex' },
        p: 3,
      maxHeight:'100%'
      }}
    >
      <Stack>
        <Box
          component={RouterLink}
          href={paths.home}
          dir="ltr"
          sx={{ display: 'inline-block', fontSize: 0, alignItems: 'flex-end' }}
        >
          <DynamicNexLogo logoTitle="Nexnode" />
        </Box>

        <Stack spacing={3} sx={{ m: 'auto' }}>
          <Typography color="white" sx={{ lineHeight: '32px', textAlign: 'center' }} variant="h2">
            {title}
          </Typography>

          <Typography align="center" color="white" variant="h5" sx={{ mt: 5 }}>
            {description}
          </Typography>

          {cta && (
            <Button
              variant="outlined"
              href={cta.href}
              sx={{
                color: '#FFFFFF',
                '&:hover': {
                  backgroundColor: '#f0f0f0',
                  color: 'black',
                },
                margin: 'auto',
                fontSize: 20,
                borderRadius: 5,
                borderColor: '#FFFFFF',
                paddingInline: 13,
                paddingBlock: 2,
                mt: 5,
              }}
            >
              {cta.label}
            </Button>
          )}
        </Stack>
      </Stack>
    </Box>
  );
}
