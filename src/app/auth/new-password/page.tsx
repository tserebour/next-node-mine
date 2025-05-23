import * as React from 'react';
import type { Metadata } from 'next';

import { config } from '@/config';
import { GuestGuard } from '@/components/auth/guest-guard';
import { Layout } from '@/components/auth/layout';
import { ResetPasswordForm } from '@/components/auth/reset-password-form';
import { CreateNewPasswordForm } from '@/components/auth/create-new-password';

export const metadata = { title: `Reset password | Auth | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (
    <Layout asideContent={{
    title: '? Change Password',
    description: 'Fill In the Form to Change your password',

  }}>
      <GuestGuard>
        <CreateNewPasswordForm />
      </GuestGuard>
    </Layout>
  );
}
