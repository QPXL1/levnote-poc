import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

const initialStrands = [
  {
    id: 'mem_001',
    label: 'First Sighting of the Orchard',
    acquired_by: 'RWDDW',
    timestamp: '2025-07-23T18:44:00Z',
    emotional_signature: 'awe',
    reactive_potential: 4,
    strand_status: 'dormant',
  },
  {
    id: 'mem_002',
    label: 'Saltstorm Encounter',
    acquired_by: 'KJMN',
    timestamp: '2025-07-23T18:46:00Z',
    emotional_signature: 'fear',
    reactive_potential: 5,
    strand_status: 'active',
  },
  {
    id: 'mem_003',
    label: 'Echo in Glass Orchard',
    acquired_by: 'Ally',
    timestamp: '2025-07-23T18:47:00Z',
    emotional_signature: 'grief',
    reactive_potential: 3,
    strand_status: 'dormant',
  },
];

export default function MemoryInventory() {
  const [strands, setStrands] = useState(initialStrands);
  const [activePlayer, setActivePlayer] = useState('RWDDW');

  const handleActivate = (id) => {
    setStrands((prev) =>
      prev.map((s) =>
        s.id === id && s.strand_status !== 'corrupted'
          ? { ...s, strand_status: 'active' }
          : s
      )
    );
    console.log(`🔁 Strand ${id} activated.`);
  };

  const players = [...new Set(strands.map((s) => s.acquired_by))];

  return (
    <div className="p-4 bg-black text-green-400">
      <h2 className="text-xl font-mono mb-4">== MEMORY INVENTORY CORE MODULE ==</h2>

      <Tabs defaultValue={activePlayer} onValueChange={setActivePlayer}>
        <TabsList className="bg-green-900 text-green-300">
          {players.map((p) => (
            <TabsTrigger
              key={p}
              value={p}
              className="px-4 py-2 hover:bg-green-700"
            >
              {p}
            </TabsTrigger>
          ))}
        </TabsList>

        {players.map((p) => (
          <TabsContent key={p} value={p} className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            {strands
              .filter((s) => s.acquired_by === p)
              .map((strand) => (
                <Card key={strand.id} className="bg-green-950 border-green-700">
                  <CardContent className="text-sm font-mono p-4">
                    <p className="text-green-300 font-semibold">{strand.label}</p>
                    <p>Status: {strand.strand_status}</p>
                    <p>Emotion: {strand.emotional_signature}</p>
                    <p>Potential: {strand.reactive_potential}</p>
                    <p>Time: {new Date(strand.timestamp).toLocaleTimeString()}</p>
                    <Button
                      onClick={() => handleActivate(strand.id)}
                      className="mt-2 bg-green-700 hover:bg-green-500 text-black"
                    >
                      Activate Strand
                    </Button>
                  </CardContent>
                </Card>
              ))}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
