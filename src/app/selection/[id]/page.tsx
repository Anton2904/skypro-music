import { AppLayout } from '@/components/AppLayout/AppLayout';
import { TrackList } from '@/components/TrackList/TrackList';
import { getSelectionTracks } from '@/lib/api/musicApi';

export const dynamic = 'force-dynamic';

type SelectionPageProps = {
  params: Promise<{ id: string }>;
};

export default async function SelectionPage({ params }: SelectionPageProps) {
  const { id } = await params;

  try {
    const tracks = await getSelectionTracks(id);

    return (
      <AppLayout title="Подборка" tracks={tracks}>
        <TrackList tracks={tracks} />
      </AppLayout>
    );
  } catch (error) {
    return (
      <AppLayout title="Подборка" tracks={[]}>
        <p>Не удалось загрузить подборку: {error instanceof Error ? error.message : 'неизвестная ошибка'}</p>
      </AppLayout>
    );
  }
}
