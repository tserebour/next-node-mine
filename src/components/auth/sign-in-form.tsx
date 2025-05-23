'use client';

import * as React from 'react';
import RouterLink from 'next/link';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import GoogleIcon from '@mui/icons-material/Google';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Eye as EyeIcon } from '@phosphor-icons/react/dist/ssr/Eye';
import { EyeSlash as EyeSlashIcon } from '@phosphor-icons/react/dist/ssr/EyeSlash';
import { Controller, useForm } from 'react-hook-form';
import { z as zod } from 'zod';
import LockIcon from '@mui/icons-material/Lock';
import { paths } from '@/paths';
import { authClient } from '@/lib/auth/client';
import { useUser } from '@/hooks/use-user';
import InputAdornment from '@mui/material/InputAdornment';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import { FormControlLabel } from '@mui/material';
import { RememberMe } from '@mui/icons-material';
import { AuthAside } from './auth-aside';
import { Layout } from './layout';

const schema = zod.object({
  email: zod.string().min(1, { message: 'Email is required' }).email(),
  password: zod.string().min(1, { message: 'Password is required' }),
});

type Values = zod.infer<typeof schema>;

const defaultValues = { email: 'sofia@devias.io', password: 'Secret1' } satisfies Values;

export function SignInForm(): React.JSX.Element {
  const router = useRouter();

  const { checkSession } = useUser();

  const [showPassword, setShowPassword] = React.useState<boolean>();

  const [isPending, setIsPending] = React.useState<boolean>(false);

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Values>({ defaultValues, resolver: zodResolver(schema) });

  const onSubmit = React.useCallback(
    async (values: Values): Promise<void> => {
      setIsPending(true);

      const { error } = await authClient.signInWithPassword(values);

      if (error) {
        setError('root', { type: 'server', message: error });
        setIsPending(false);
        return;
      }

      // Refresh the auth state
      await checkSession?.();

      // UserProvider, for this case, will not refresh the router
      // After refresh, GuestGuard will handle the redirect
      router.refresh();
    },
    [checkSession, router, setError]
  );
  const labelRememberMe = { inputProps: { 'aria-label': 'Remember Me' } };

  return (
<Stack

    >


      <Stack spacing={1}>
        {/* temporary for testing change password page */}
        <Link href={paths.auth.newPassword}>Change Password</Link>
        <Typography variant="h4" align='center' color={'#FF8400'} marginBlock={2}>Sign in</Typography>
        <Stack spacing={2} marginBlock={2}>
          <Button variant="outlined" dir='ltr' startIcon={<GoogleIcon />} sx={{
            color: 'black', fontStyle: 'bold',
            border: '1px solid #7d827e',
            '&:hover': {
              backgroundColor: '#f0f0f0',
              color: 'black'
            },

            margin: 'auto',
            borderRadius: 5,
            paddingInline: { xs: 6, md: 13 },
            fontSize: { xs: 16, md: 20 },
            paddingBlock: 2,

          }}>Continue with Google</Button>
        </Stack>
        <Typography color="text.secondary" variant="body2" align='center' dir="ltr">
          or use your email to log into your account:

        </Typography>
      </Stack>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2} dir="ltr">
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <FormControl error={Boolean(errors.email)} variant="outlined" fullWidth>
                <InputLabel htmlFor="email">UserName</InputLabel>
                <OutlinedInput {...field} label="Email address" type="email" id="email"
                  sx={{ backgroundColor: '#FAE8D7' }}
                  startAdornment={
                    <InputAdornment position="start">
                      <PersonOutlineIcon />
                    </InputAdornment>
                  }
                />
                {errors.email ? <FormHelperText>{errors.email.message}</FormHelperText> : null}
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <FormControl error={Boolean(errors.password)}>
                <InputLabel htmlFor="password">Password</InputLabel>
                <OutlinedInput sx={{ backgroundColor: '#FAE8D7' }}
                  startAdornment={
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  }
                  {...field}
                  endAdornment={
                    showPassword ? (
                      <EyeIcon
                        cursor="pointer"
                        fontSize="var(--icon-fontSize-md)"
                        onClick={(): void => {
                          setShowPassword(false);
                        }}
                      />
                    ) : (
                      <EyeSlashIcon
                        cursor="pointer"
                        fontSize="var(--icon-fontSize-md)"
                        onClick={(): void => {
                          setShowPassword(true);
                        }}
                      />
                    )
                  }
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                />
                {errors.password ? <FormHelperText>{errors.password.message}</FormHelperText> : null}
              </FormControl>
            )}
          />
          <div>
            <Stack direction={'row'} justifyContent={'space-between'} spacing={2}>
              <Stack direction={'row'} display={'inline-block'}>
                <Typography variant="subtitle2" color={'#858585'}>Remember Me <Checkbox {...labelRememberMe} defaultChecked
                  sx={{
                    color: 'black',
                    '&.Mui-checked': {
                      color: 'orange',
                    },
                  }}
                />
                </Typography>
              </Stack>
              <Stack>
                <Link component={RouterLink} href={paths.auth.resetPassword} variant="subtitle2" color={'#858585'}>
                  Forgot password?
                </Link>
              </Stack>

            </Stack>
          </div>
          {errors.root ? <Alert color="error">{errors.root.message}</Alert> : null}
          <Button disabled={isPending} type="submit" variant="contained" sx={{ backgroundColor: 'orange', fontSize: 20 }}>
            Sign in
          </Button>
        </Stack>
      </form>
      <Alert color="warning">
        Use{' '}
        <Typography component="span" sx={{ fontWeight: 700 }} variant="inherit">
          sofia@devias.io
        </Typography>{' '}
        with password{' '}
        <Typography component="span" sx={{ fontWeight: 700 }} variant="inherit">
          Secret1
        </Typography>
      </Alert>

    </Stack>
  );
}
