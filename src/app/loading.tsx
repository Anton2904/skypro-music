import { AppLayout } from '@/components/AppLayout/AppLayout';

export default function Loading() {
  return (
    <AppLayout title="Треки" tracks={[]}>
      <p>Загрузка треков...</p>
    </AppLayout>
  );
}
