import React from 'react';
import Authenticate from '@admin/views/accounts/Authenticate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login',
};

const AccountsPage = () => {
  return <Authenticate />;
};

export default AccountsPage;
