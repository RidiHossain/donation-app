'use client';

import { useEffect, useState } from 'react';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { lusitana } from '@/app/ui/fonts';
import { CampaignDonor } from '@/app/lib/definitions';
import Image from 'next/image';

type ExtendedDonor = CampaignDonor & {
  totalPledged: number;
  totalPaid: number;
  nextPaymentDate: string;
  status: 'Due' | 'On Time';
};

export default function CampaignDonorsTable({
  donors,
}: {
  donors: CampaignDonor[];
}) {
  const [donorsWithMock, setDonorsWithMock] = useState<ExtendedDonor[]>([]);

  useEffect(() => {
    const today = new Date();

    const enriched = donors.map((donor) => {
      const totalPledged = Math.floor(Math.random() * 500) + 100;
      const totalPaid = Math.floor(totalPledged * (0.3 + Math.random() * 0.5));
      const nextPaymentDate = new Date(
        today.getTime() + (Math.random() > 0.5 ? 1 : -1) * 7 * 24 * 60 * 60 * 1000
      );
      const status: 'Due' | 'On Time' = nextPaymentDate < today ? 'Due' : 'On Time';

      return {
        ...donor,
        totalPledged,
        totalPaid,
        nextPaymentDate: nextPaymentDate.toISOString().split('T')[0],
        status,
      };
    });

    setDonorsWithMock(enriched);
  }, [donors]);

  // ✅ Notify handler
  const handleNotify = async (donor: ExtendedDonor) => {
  try {
    const res = await fetch('/api/notify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: donor.email,
        name: donor.name, // optional
        status: donor.status, // optional
        totalPledged: donor.totalPledged, // optional
        totalPaid: donor.totalPaid, // optional
      }),
    });

    if (res.ok) {
      alert(`Notification sent to ${donor.email}`);
    } else {
      alert(`Failed to send notification to ${donor.email}`);
    }
  } catch (error) {
    console.error('Error sending notification:', error);
    alert('Something went wrong.');
  }
};

  return (
    <div className="flex w-full flex-col md:col-span-4 overflow-x-auto">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Campaign Donors
      </h2>

      <div className="rounded-xl bg-gray-50 p-4 shadow-sm w-full min-w-[800px]">
        <div className="bg-white w-full rounded-md">
          {/* Table Head */}
          <div className="grid grid-cols-6 gap-4 px-6 py-3 border-b font-semibold text-sm text-gray-600">
            <div>Name</div>
            <div>Total Pledged</div>
            <div>Paid So Far</div>
            <div>Next Payment</div>
            <div>Status</div>
            <div>Action</div>
          </div>

          {/* Table Rows */}
          {donorsWithMock.map((donor, i) => (
            <div
              key={`${donor.name}-${i}`}
              className={clsx(
                'grid grid-cols-6 gap-4 px-6 py-4 text-sm items-center',
                { 'border-t': i !== 0 }
              )}
            >
              <div className="font-medium flex items-center gap-2">
                <Image
                  src={donor.image_url || '/customers/default-avatar.png'}
                  alt={`${donor.name}'s profile picture`}
                  className="rounded-full"
                  width={32}
                  height={32}
                />
                {donor.name}
              </div>

              <div>${donor.totalPledged.toLocaleString()}</div>
              <div>${donor.totalPaid.toLocaleString()}</div>
              <div>{donor.nextPaymentDate}</div>
              <div>
                <span
                  className={clsx(
                    'text-xs font-medium px-2 py-1 rounded-md',
                    donor.status === 'Due'
                      ? 'bg-red-100 text-red-600'
                      : 'bg-green-100 text-green-600'
                  )}
                >
                  {donor.status}
                </span>
              </div>
              <div>
                <button
                  className={clsx(
                    'text-sm font-medium px-3 py-1 rounded-md transition-colors',
                    donor.status === 'Due'
                      ? 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                      : 'bg-blue-50 text-blue-500 hover:bg-blue-100'
                  )}
                  onClick={() => handleNotify(donor)}
                >
                  Notify
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center pt-6">
          <ArrowPathIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500">Updated just now</h3>
        </div>
      </div>
    </div>
  );
}
