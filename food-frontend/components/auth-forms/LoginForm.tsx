'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginDTO } from '@/lib/schemas';
import { useLogin } from '@/hooks/queries';

export default function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginDTO>({
    resolver: zodResolver(loginSchema),
  });
  const mutation = useLogin();

  const onSubmit = (vals: LoginDTO) => {
    mutation.mutate(vals, {
      onSuccess: () => {
        window.location.href = '/';
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label>Email</label>
        <input {...register('email')} />
        {errors.email && <p>{errors.email.message}</p>}
      </div>
      <div>
        <label>Password</label>
        <input type="password" {...register('password')} />
        {errors.password && <p>{errors.password.message}</p>}
      </div>
      <button type="submit">Login</button>
    </form>
  );
}
