'use client';

import { useEffect, useState } from 'react';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Image from 'next/image';

export type ExtendedPledge = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  campaign_name: string;
  campaign_id: string;
  payment_type: string;
  start_date: string;
  end_date: string | null;
  amount: string;
  totalPledged: number;
  totalPaid: number;
  nextPaymentDate: string;
  status: 'Due' | 'On Time';
};

export default function DonorPledgeTable({ pledges }: { pledges: ExtendedPledge[] }) {
  if (!pledges || pledges.length === 0) return null;

  return (
    <div className="mt-8 w-full overflow-x-auto">
      <h2 className="text-xl font-semibold mb-4">Pledge Summary</h2>
      <div className="rounded-xl bg-gray-50 p-4 shadow-sm w-full min-w-[800px]">
        <div className="bg-white w-full rounded-md">
          {/* Table Head */}
          <div className="grid grid-cols-6 gap-4 px-6 py-3 border-b font-semibold text-sm text-gray-600">
            <div>Campaign</div>
            <div>Total Pledged</div>
            <div>Paid So Far</div>
            <div>Next Payment</div>
            <div>Status</div>
            <div>Action</div>
          </div>

          {/* Table Rows */}
          {pledges.map((pledge, i) => (
            <div
              key={`${pledge.id}-${pledge.campaign_id}`}
              className={clsx(
                'grid grid-cols-6 gap-4 px-6 py-4 text-sm items-center',
                { 'border-t': i !== 0 }
              )}
            >
              <div className="font-medium flex items-center gap-2">
                <Image
                  src={pledge.image_url || '/customers/default-avatar.png'}
                  alt={`${pledge.name}'s profile`}
                  className="rounded-full"
                  width={32}
                  height={32}
                />
                {pledge.campaign_name}
              </div>
              <div>${pledge.totalPledged.toLocaleString()}</div>
              <div>${pledge.totalPaid.toLocaleString()}</div>
              <div>{pledge.nextPaymentDate}</div>
              <div>
                <span
                  className={clsx(
                    'text-xs font-medium px-2 py-1 rounded-md',
                    pledge.status === 'Due'
                      ? 'bg-red-100 text-red-600'
                      : 'bg-green-100 text-green-600'
                  )}
                >
                  {pledge.status}
                </span>
              </div>
              <div>
                <button
                  className={clsx(
                    'text-sm font-medium px-3 py-1 rounded-md transition-colors',
                    pledge.status === 'Due'
                      ? 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                      : 'bg-blue-50 text-blue-500 hover:bg-blue-100'
                  )}
                  onClick={() => alert(`Notification sent to ${pledge.email}`)}
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
