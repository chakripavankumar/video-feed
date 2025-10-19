import React from 'react';
import dynamic from 'next/dynamic';
const LoginForm = dynamic(() => import('@/components/auth-forms/LoginForm'), { ssr: false });

export default function Page() {
  return (
    <main className="max-w-lg mx-auto p-6">
      <h1 className="text-2xl font-bold">Sign in</h1>
      <LoginForm />
    </main>
  );
}