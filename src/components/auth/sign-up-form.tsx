'use client';

import * as React from 'react';
import RouterLink from 'next/link';
import EmailIcon from '@mui/icons-material/Email';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Controller, useForm } from 'react-hook-form';
import { z as zod } from 'zod';
import GoogleIcon from '@mui/icons-material/Google';
import { paths } from '@/paths';
import { authClient } from '@/lib/auth/client';
import { useUser } from '@/hooks/use-user';
import InputAdornment from '@mui/material/InputAdornment';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LockIcon from '@mui/icons-material/Lock';
import { AuthAside } from './auth-aside';
const schema = zod.object({
  firstName: zod.string().min(1, { message: 'First name is required' }),
  lastName: zod.string().min(1, { message: 'Last name is required' }),
  email: zod.string().min(1, { message: 'Email is required' }).email(),
  password: zod.string().min(6, { message: 'Password should be at least 6 characters' }),
  terms: zod.boolean().refine((value) => value, 'You must accept the terms and conditions'),
});

type Values = zod.infer<typeof schema>;

const defaultValues = { firstName: '', lastName: '', email: '', password: '', terms: false } satisfies Values;

export function SignUpForm(): React.JSX.Element {
  const router = useRouter();

  const { checkSession } = useUser();

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

      const { error } = await authClient.signUp(values);

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

  return (
    <Stack spacing={3}>


      <Stack spacing={1}>
        <Typography variant="h2" align='center' color={'#FF8400'} marginBlock={2}>Create Account</Typography>
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
          or use your email for registration:

        </Typography>
      </Stack>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2} dir="ltr">
          <Controller
            control={control}
            name="firstName"
            render={({ field }) => (
              <FormControl error={Boolean(errors.firstName)}>
                <InputLabel htmlFor="firstName">Name</InputLabel>
                <OutlinedInput {...field} label="firstName"  id="firstName"
                  sx={{ backgroundColor: '#FAE8D7' }}
                  startAdornment={
                    <InputAdornment position="start">
                      <PersonOutlineIcon />
                    </InputAdornment>
                  }
                />
                {errors.firstName ? <FormHelperText>{errors.firstName.message}</FormHelperText> : null}
              </FormControl>
            )}
          />
          {/* <Controller
            control={control}
            name="lastName"
            render={({ field }) => (
              <FormControl error={Boolean(errors.firstName)}>
                <InputLabel>Last name</InputLabel>
                <OutlinedInput {...field} label="Last name" />
                {errors.firstName ? <FormHelperText>{errors.firstName.message}</FormHelperText> : null}
              </FormControl>
            )}
          /> */}
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <FormControl error={Boolean(errors.email)}>
                <InputLabel htmlFor="email">Email</InputLabel>
                <OutlinedInput {...field} label="Email address" type="email" id="email"
                  sx={{ backgroundColor: '#FAE8D7' }}
                  startAdornment={
                    <InputAdornment position="start">
                      <EmailIcon />
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
                <OutlinedInput sx={{ backgroundColor: '#FAE8D7' }} label="Password" type="password" id="password"
                  startAdornment={
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  }/>
                {errors.password ? <FormHelperText>{errors.password.message}</FormHelperText> : null}
              </FormControl>
            )}
          />
          <Controller
            control={control}
            // name="password_confirmation"
            name='lastName'
            render={({ field }) => (
              <FormControl error={Boolean(errors.password)}>
                <InputLabel htmlFor="password_confirmation">Confirm Password</InputLabel>
                <OutlinedInput sx={{ backgroundColor: '#FAE8D7' }} label="Confirm Password" type="password"
                 id="password_confirmation"
                  startAdornment={
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  }/>
                {errors.password ? <FormHelperText>{errors.password.message}</FormHelperText> : null}
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="terms"
            render={({ field }) => (
              <div>
                <FormControlLabel
                  control={<Checkbox {...field} />}
                  label={
                    <React.Fragment>
                      I have read the <Link>terms and conditions</Link>
                    </React.Fragment>
                  }
                />
                {errors.terms ? <FormHelperText error>{errors.terms.message}</FormHelperText> : null}
              </div>
            )}
          />
          {errors.root ? <Alert color="error">{errors.root.message}</Alert> : null}
          <Button disabled={isPending} type="submit" variant="contained"
          sx={{ backgroundColor: 'orange', fontSize: 20 }}>
            Sign up
          </Button>
        </Stack>
      </form>
      <Alert color="warning">Created users are not persisted</Alert>

    </Stack>

  );
}
