'use client';

import { lusitana } from '@/app/ui/fonts';

export default function CampaignSummaryChart({
  toRaise,
  pledged,
  raised,
}: {
  toRaise: number;
  pledged: number;
  raised: number;
}) {
  const chartHeight = 240;

  const values = [
    { label: 'To Raise', value: toRaise, color: 'bg-blue-300' },
    { label: 'Pledged', value: pledged, color: 'bg-blue-500' },
    { label: 'Raised', value: raised, color: 'bg-blue-700' },
  ];

  const topValue = Math.max(toRaise, pledged, raised, 1);
  const yAxisLabels = [topValue, topValue * 0.66, topValue * 0.33, 0].map((v) =>
    `$${Math.round(v).toLocaleString()}`
  );

  return (
    <div className="mt-10 w-full max-w-4xl rounded-xl bg-gray-50 p-6 shadow-sm">
      <h2
        className={`${lusitana.className} text-lg md:text-xl mb-6`}
        /* Added bottom margin here */
      >
        Campaign Progress Overview
      </h2>

      <div className="flex gap-4">
        {/* Y-Axis */}
        <div
          className="hidden sm:flex flex-col justify-between text-sm text-gray-500 pr-4"
          style={{ height: `${chartHeight}px` }}
        >
          {yAxisLabels.map((label) => (
            <p key={label}>{label}</p>
          ))}
        </div>

        {/* Bars */}
        <div
          className="flex flex-1 justify-around items-end gap-4 pt-4"
          /* Added padding-top here to push bars down */
          style={{ height: `${chartHeight}px` }}
        >
          {values.map((item) => (
            <div key={item.label} className="flex flex-col items-center w-20">
              <div
                className={`w-full rounded-t-md ${item.color}`}
                style={{
                  height: `${(item.value / topValue) * chartHeight}px`,
                  transition: 'height 0.3s ease',
                }}
              />
              <p className="mt-3 text-sm text-gray-700">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
