'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import { useColorScheme } from '@mui/material/styles';
import RouterLink from 'next/link';
import { NoSsr } from '@/components/core/no-ssr';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { paths } from '@/paths';

const HEIGHT = 60;
const WIDTH = 60;

type Color = 'dark' | 'light';

export interface LogoProps {
  color?: Color;
  emblem?: boolean;
  height?: number;
  width?: number;
}

export function Logo({ color = 'dark', emblem, height = HEIGHT, width = WIDTH }: LogoProps): React.JSX.Element {
  let url: string;

  if (emblem) {
    url = color === 'light' ? '/assets/logo-emblem.svg' : '/assets/logo-emblem--dark.svg';
  } else {
    url = color === 'light' ? '/assets/logo.svg' : '/assets/logo--dark.svg';
  }

  return <Box alt="logo" component="img" height={height} src={url} width={width} />;
}

export interface DynamicLogoProps {
  colorDark?: Color;
  colorLight?: Color;
  emblem?: boolean;
  height?: number;
  width?: number;
}
type LogoTitleProps={
  logoTitle?:string
}
export function DynamicNexLogo({logoTitle}: LogoTitleProps): React.JSX.Element {


  return (
     <Stack  spacing={1} sx={{ alignItems: 'left', display: 'inline-flex' }} dir="ltr" direction={'row'}>
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                backgroundColor: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  backgroundColor: '#FF8400',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography
                  variant="subtitle1"
                  sx={{
                    color: '#ffffff',
                    fontWeight: 'bold',
                  }}
                >
                  N
                </Typography>

              </Box>

            </Box>

 <Typography variant="h4" color="white">
              {logoTitle}
            </Typography>
          </Stack>

  );
}
