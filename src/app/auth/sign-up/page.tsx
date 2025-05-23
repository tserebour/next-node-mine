import * as React from 'react';
import type { Metadata } from 'next';

import { config } from '@/config';
import { GuestGuard } from '@/components/auth/guest-guard';
import { Layout } from '@/components/auth/layout';
import { SignUpForm } from '@/components/auth/sign-up-form';

export const metadata = { title: `Sign up | Auth | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (
    <Layout asideContent={{
    title: '!Welcome',
    description: 'Sign Up to start creating and monitoring your projects remotely',
    cta: { label: 'Log In', href: '/auth/sign-in' }
  }}>
      <GuestGuard>
        <SignUpForm />
      </GuestGuard>
    </Layout>
  );
}
