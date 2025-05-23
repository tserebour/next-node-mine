'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Controller, useForm } from 'react-hook-form';
import { z as zod } from 'zod';
import EmailIcon from '@mui/icons-material/Email';
import { authClient } from '@/lib/auth/client';
import InputAdornment from '@mui/material/InputAdornment';
import { paths } from '@/paths';

const schema = zod.object({ email: zod.string().min(1, { message: 'Email is required' }).email() });

type Values = zod.infer<typeof schema>;

const defaultValues = { email: '' } satisfies Values;

export function ResetPasswordForm(): React.JSX.Element {
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

      const { error } = await authClient.resetPassword(values);

      if (error) {
        setError('root', { type: 'server', message: error });
        setIsPending(false);
        return;
      }

      setIsPending(false);

      // Redirect to confirm password reset
    },
    [setError]
  );

  return (
    <Stack>
    <Stack spacing={1}  >
      <Typography variant="h2" align='center' color={'orange'} marginY={4} >Reset password</Typography>
      <Typography variant="h6" align='center' color={'GrayText'} marginY={4} >
        A link will be provided to the provided e-mail to create a new password</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2} dir='ltr'>
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <FormControl error={Boolean(errors.email)}>
                <InputLabel>Email address</InputLabel>
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
          {errors.root ? <Alert color="error">{errors.root.message}</Alert> : null}
          <Stack sx={{marginY:10}}>
          <Button disabled={isPending} type="submit" variant="outlined" sx={{borderColor:'orange', color:'orange',
           '&:hover': {
                  backgroundColor: 'orange',
                  color: 'white',
                },
             marginBottom:5}}>
            Reset Password
          </Button>
           <Button href={paths.auth.signIn} disabled={isPending} type="submit" variant="contained" sx={{backgroundColor:'orange',
             }}>
            Back to Login
          </Button>
          </Stack>
        </Stack>
      </form>
    </Stack>
    </Stack>
  );
}
