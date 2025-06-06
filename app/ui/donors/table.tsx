import Image from 'next/image';
import { UpdateInvoice, DeleteInvoice } from '@/app/ui/invoices/buttons';
import DonationStatus from '@/app/ui/donors/status';
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import { fetchFilteredDonors } from '@/app/lib/data';

export default async function InvoicesTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const donors = await fetchFilteredDonors(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {donors?.map((donor) => (
              <div
                key={donor.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">   
                      <p>{donor.name}</p>
                    </div>
                    <p className="text-sm text-gray-500">{donor.phone}</p>
                  </div>
                  <DonationStatus status={donor.status} paymentDate={donor.payment_date} />
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">
                      {formatCurrency(donor.payment_amount)}
                    </p>
                    <p>{formatDateToLocal(donor.payment_date)}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateInvoice id={donor.id} />
                    <DeleteInvoice id={donor.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Name
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Phone
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Address
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Payment Plan
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Payment date
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Amount
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Status
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {donors?.map((donor) => (
                <tr
                  key={donor.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      {donor.name}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {donor.phone}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {donor.address}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {donor.payment_plan}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDateToLocal(donor.payment_date)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatCurrency(donor.payment_amount)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                     <DonationStatus status={donor.status} paymentDate={donor.payment_date} />
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateInvoice id={donor.id} />
                      <DeleteInvoice id={donor.id} />
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
