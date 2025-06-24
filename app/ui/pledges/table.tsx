import Image from 'next/image';
import { UpdatePledges, DeletePledge } from '@/app/ui/pledges/buttons';
import DonationStatus from '@/app/ui/donors/status';
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import { fetchFilteredPledges } from '@/app/lib/data';
import CampaignStatus from '@/app/ui/campaigns/status';

export default async function InvoicesTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const pledges = await fetchFilteredPledges(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          {/* Mobile view */}
          <div className="md:hidden">
            {pledges?.map((pledge) => (
              <div
                key={pledge.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      
                      <p>
                        <Image
                          src={pledge.image_url || '/customers/default-avatar.png'}
                          alt={`${pledge.donor_name}'s profile picture`}
                          className="mr-4 rounded-full"
                          width={32}
                          height={32}
                        />
                        {pledge.donor_name}</p>
                    </div>
                    <p className="text-sm text-gray-500">{pledge.campaign_name}</p>
                    <p className="text-sm text-gray-500">{formatCurrency(pledge.amount)}</p>
                    <p className="text-sm text-gray-500">{formatDateToLocal(pledge.start_date)}</p>
                    <p className="text-sm text-gray-500">{formatDateToLocal(pledge.end_date)}</p>
                  </div>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div className="flex justify-end gap-2">
                    <UpdatePledges id={pledge.id} />
                    <DeletePledge id={pledge.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop table */}
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">Donor Name</th>
                <th scope="col" className="px-3 py-5 font-medium">Campaign Name</th>
                <th scope="col" className="px-3 py-5 font-medium">Amount</th>
                <th scope="col" className="px-3 py-5 font-medium">Start Date</th>
                <th scope="col" className="px-3 py-5 font-medium">End Date</th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {pledges?.map((pledge) => (
                <tr
                  key={pledge.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none 
                  [&:first-child>td:first-child]:rounded-tl-lg 
                  [&:first-child>td:last-child]:rounded-tr-lg 
                  [&:last-child>td:first-child]:rounded-bl-lg 
                  [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <Image
                        src={pledge.image_url || '/customers/default-avatar.png'}
                        alt={`${pledge.donor_name}'s profile picture`}
                        className="mr-4 rounded-full"
                        width={32}
                        height={32}
                      />
                      {pledge.donor_name}</div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {pledge.campaign_name}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatCurrency(pledge.amount)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDateToLocal(pledge.start_date)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDateToLocal(pledge.end_date)}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdatePledges id={pledge.id} />
                      <DeletePledge id={pledge.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
