import { fetchDonorById, fetchPledgesByDonorId } from '@/app/lib/data';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { formatCurrency, formatDateToLocal } from '@/app/lib/utils';

export default async function DonorProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const donor = await fetchDonorById(id);
  const pledges = await fetchPledgesByDonorId(id);

  if (!donor) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center gap-4 mb-6">
        <Image
          src={donor.image_url || '/customers/default-avatar.png'}
          alt={`${donor.name}'s profile`}
          className="rounded-full"
          width={64}
          height={64}
        />
        <div>
          <h1 className="text-2xl font-bold">{donor.name}</h1>
          <p className="text-gray-600">{donor.email}</p>
        </div>
      </div>

      <div className="mb-6 space-y-1">
        <p><strong>Phone:</strong> {donor.phone}</p>
        <p><strong>Address:</strong> {donor.address}</p>
      </div>

      <h2 className="text-xl font-semibold mb-3">Pledges</h2>
      {pledges.length > 0 ? (
        <ul className="divide-y divide-gray-200">
          {pledges.map((pledge: any) => (
            <li key={pledge.id} className="py-3">
              <p>
                <span className="font-medium">{formatCurrency(pledge.amount)}</span> to{' '}
                <Link
                  href={`/dashboard/campaigns/${encodeURIComponent(pledge.campaign_name)}`}
                  className="text-blue-600 hover:underline"
                >
                  {pledge.campaign_name}
                </Link>
              </p>
              <p className="text-sm text-gray-500">Date: {formatDateToLocal(pledge.date)}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No pledges found.</p>
      )}
    </div>
  );
}
