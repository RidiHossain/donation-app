import Image from 'next/image';
import Link from 'next/link';
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import { fetchFilteredPayments } from '@/app/lib/data';

export default async function PaymentsTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const payments = await fetchFilteredPayments(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          {/* Mobile View */}
          <div className="md:hidden">
            {payments?.map((payment) => (
              <div
                key={payment.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center gap-2">
                      <Image
                        src={payment.donor_image_url || '/customers/default-avatar.png'}
                        alt={`${payment.donor_name}'s profile`}
                        width={28}
                        height={28}
                        className="rounded-full"
                      />
                      <p>{payment.donor_name}</p>
                    </div>
                    <p className="text-sm text-gray-500">{payment.donor_email}</p>
                    <p className="text-sm text-gray-500">Campaign: {payment.campaign_name}</p>
                  </div>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">{formatCurrency(payment.amount)}</p>
                    <p>{formatDateToLocal(payment.date)}</p>
                  </div>
                  <div>
                    <Link
  href={payment.receipt_url || '/mock-receipt.pdf'}
  target="_blank"
  rel="noopener noreferrer"
  className="text-blue-600 hover:underline"
>
  View
</Link>
                    
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop View */}
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Donor
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Email
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Campaign
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Amount
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Date
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">View</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {payments?.map((payment) => (
                <tr
                  key={payment.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <Image
                        src={payment.donor_image_url || '/customers/default-avatar.png'}
                        className="rounded-full"
                        width={28}
                        height={28}
                        alt={`${payment.donor_name}'s profile`}
                      />
                      <p>{payment.donor_name}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">{payment.donor_email}</td>
                  <td className="whitespace-nowrap px-3 py-3">{payment.campaign_name}</td>
                  <td className="whitespace-nowrap px-3 py-3">{formatCurrency(payment.amount)}</td>
                  <td className="whitespace-nowrap px-3 py-3">{formatDateToLocal(payment.date)}</td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <Link
  href={payment.receipt_url || '/mock-receipt.pdf'}
  target="_blank"
  rel="noopener noreferrer"
  className="text-blue-600 hover:underline"
>
  View
</Link>

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
