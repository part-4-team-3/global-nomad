'use client';

import MyPageForm from '@/components/organisms/my-page-form/MyPageForm';
import PasswordCheckForm from '@/components/organisms/my-page-form/PasswordCheckForm';
import { useState } from 'react';

export default function MyPageForms() {
  const [password, setPassword] = useState<string>('');

  const isEmpty = password === '';

  return (
    <>
      {isEmpty && <PasswordCheckForm setPassword={setPassword} />}
      {!isEmpty && <MyPageForm password={password} />}
    </>
  );
}
