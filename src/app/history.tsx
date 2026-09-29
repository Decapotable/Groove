import { PageHeader } from '@/components/PageHeader';
import { HistoryChapter } from '@/components/HistoryChapter';
import { Reveal } from '@/components/ScrollReveal';
import { Screen } from '@/components/Screen';
import { chapters } from '@/data/history';

export default function HistoryScreen() {
  return (
    <Screen>
      <Reveal>
        <PageHeader
          eyebrow="05 — HISTORY"
          title="A century"
          italic="of sound."
          subtitle="Six chapters, from the dance halls of the 1920s to the studios of today."
        />
      </Reveal>
      {chapters.map((chapter, index) => (
        <Reveal key={chapter.id}>
          <HistoryChapter chapter={chapter} index={index} />
        </Reveal>
      ))}
    </Screen>
  );
}
