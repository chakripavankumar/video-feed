"use client'
import React from 'react';
import { useForm } from 'react-hook-form';
import { useCreateFood } from '@/hooks/queries';

type Form = { title: string; description?: string; video?: FileList };

export default function Page() {
  const { register, handleSubmit } = useForm<Form>();
  const create = useCreateFood();

  const onSubmit = (vals: Form) => {
    const fd = new FormData();
    fd.append('title', vals.title);
    if (vals.description) fd.append('description', vals.description);
    if (vals.video && vals.video[0]) fd.append('video', vals.video[0]);

    create.mutate(fd, {
      onSuccess: () => window.location.href = '/partner/food',
    });
  };

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-xl font-semibold">Upload Food Video</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label>Title</label>
          <input {...register('title')} />
        </div>
        <div>
          <label>Description</label>
          <textarea {...register('description')} />
        </div>
        <div>
          <label>Video</label>
          <input type="file" accept="video/*" {...register('video')} />
        </div>
        <button type="submit" disabled={create.isLoading}>Upload</button>
      </form>
    </main>
  );
}
