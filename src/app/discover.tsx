import { useState } from 'react';

import { DecadePanel } from '@/components/DecadePanel';
import { DecadeTimeline } from '@/components/DecadeTimeline';
import { PageHeader } from '@/components/PageHeader';
import { Reveal } from '@/components/ScrollReveal';
import { Screen } from '@/components/Screen';
import { decades } from '@/data/decades';

const DEFAULT_DECADE = '1950s';

export default function DiscoverScreen() {
  const [selectedId, setSelectedId] = useState(DEFAULT_DECADE);
  const decade = decades.find((item) => item.id === selectedId) ?? decades[0];

  return (
    <Screen>
      <Reveal>
        <PageHeader eyebrow="02 — DISCOVER" title="Explore jazz," italic="decade by decade." />
        <DecadeTimeline decades={decades} selectedId={selectedId} onSelect={setSelectedId} />
        <DecadePanel key={decade.id} decade={decade} />
      </Reveal>
    </Screen>
  );
}
