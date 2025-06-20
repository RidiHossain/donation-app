'use client';

import { ArrowPathIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { lusitana } from '@/app/ui/fonts';
import { CampaignDonor } from '@/app/lib/definitions';

type ExtendedDonor = CampaignDonor & {
  status: 'Due' | 'On Time';
};

export default function CampaignDonorsTable({
  donors,
}: {
  donors: CampaignDonor[];
}) {
  const donorsWithStatus: ExtendedDonor[] = donors.map((donor) => ({
    ...donor,
    status: Math.random() < 0.5 ? 'Due' : 'On Time',
  }));

  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Campaign Donors
      </h2>
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4 shadow-sm">
        <div className="bg-white px-6">
          {donorsWithStatus.map((donor, i) => (
            <div
              key={`${donor.email}-${i}`}
              className={clsx(
                'flex flex-row items-center justify-between py-4',
                { 'border-t': i !== 0 },
              )}
            >
              <div>
                <p className="text-sm font-semibold md:text-base">{donor.name}</p>
                <p className="text-sm text-gray-500">{donor.email}</p>
              </div>

              <div className="flex items-center gap-3">
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

                <button
                  className={clsx(
                    'text-sm font-medium px-3 py-1 rounded-md transition-colors',
                    donor.status === 'Due'
                      ? 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  )}
                  disabled={donor.status !== 'Due'}
                >
                  Notify
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center pb-2 pt-6">
          <ArrowPathIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500">Updated just now</h3>
        </div>
      </div>
    </div>
  );
}
