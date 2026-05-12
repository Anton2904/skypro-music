import { AppLayout } from '@/components/AppLayout/AppLayout';
import { TrackList } from '@/components/TrackList/TrackList';
import { getAllTracks } from '@/lib/api/musicApi';

export const dynamic = 'force-dynamic';

export default async function Home() {
  try {
    const tracks = await getAllTracks();

    return (
      <AppLayout title="Треки" tracks={tracks}>
        <TrackList tracks={tracks} />
      </AppLayout>
    );
  } catch (error) {
    return (
      <AppLayout title="Треки" tracks={[]}>
        <p>Не удалось загрузить треки: {error instanceof Error ? error.message : 'неизвестная ошибка'}</p>
      </AppLayout>
    );
  }
}
