import { CheckIcon, ClockIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default function DonationStatus({
  status,
  paymentDate,
}: {
  status: string;
  paymentDate: string;
}) {
  const today = new Date();
  const dueDate = new Date(paymentDate);
  const isPastDue = dueDate < today;

  const statusClass = clsx(
    'inline-flex items-center rounded-full px-2 py-1 text-xs',
    {
      'bg-red-100 text-red-700': status === 'Due' && isPastDue,
      'bg-green-100 text-green-700': status === 'Due' && !isPastDue,
      'bg-green-500 text-white': status === 'Paid',
    },
  );

  return (
    <span className={statusClass}>
      {status === 'Due' ? (
        <>
          Due
          <ClockIcon
            className={clsx('ml-1 w-4', {
              'text-red-600': isPastDue,
              'text-green-600': !isPastDue,
            })}
          />
        </>
      ) : null}
      {status === 'Paid' ? (
        <>
          Paid
          <CheckIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
    </span>
  );
}
