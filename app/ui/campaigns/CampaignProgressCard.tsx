'use client';

import { useEffect, useState } from 'react';

type CampaignProgressCardProps = {
  totalAmount: number;
  totalPledged: number;
  totalCollected: number;
};

export default function CampaignProgressCard({
  totalAmount,
  totalPledged,
  totalCollected,
}: CampaignProgressCardProps) {
  const [pledgedPercent, setPledgedPercent] = useState(0);
  const [collectedPercent, setCollectedPercent] = useState(0);

  useEffect(() => {
    const pledged = Math.min((totalPledged / totalAmount) * 100, 100);
    const collected = Math.min((totalCollected / totalAmount) * 100, pledged);
    setTimeout(() => {
      setPledgedPercent(pledged);
      setCollectedPercent(collected);
    }, 200);
  }, [totalPledged, totalCollected, totalAmount]);

  return (
    <div className="w-full rounded-md shadow bg-white p-6 space-y-4">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Campaign Progress</h2>

      <div className="relative h-8 rounded bg-gray-200 overflow-visible group cursor-pointer">
        {/* pledged layer */}
        <div
          className="absolute top-0 left-0 h-full bg-blue-300 transition-all duration-1000 ease-in-out"
          style={{ width: `${pledgedPercent}%`, zIndex: 10 }}
        />
        {/* collected layer */}
        <div
          className="absolute top-0 left-0 h-full bg-blue-600 transition-all duration-1000 ease-in-out"
          style={{ width: `${collectedPercent}%`, zIndex: 20 }}
        />

        {/* Hover labels */}
        <div className="pointer-events-none absolute top-[-30px] left-0 w-full flex justify-center gap-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50 text-sm text-gray-900 font-semibold">
          <div className="bg-white rounded px-2 py-1 shadow">
            Collected: {collectedPercent.toFixed(1)}%
          </div>
          <div className="bg-white rounded px-2 py-1 shadow">
            Pledged: {pledgedPercent.toFixed(1)}%
          </div>
          <div className="bg-white rounded px-2 py-1 shadow">
            Target: 100%
          </div>
        </div>
      </div>

      <div className="flex justify-between text-sm text-gray-700 mt-2">
        <div>Raised: ${totalCollected.toLocaleString()}</div>
        <div>Pledged: ${totalPledged.toLocaleString()}</div>
        <div>Target: ${totalAmount.toLocaleString()}</div>
      </div>
    </div>
  );
}
