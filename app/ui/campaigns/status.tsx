import { ArrowPathIcon, CheckIcon, ClockIcon, PauseIcon } from '@heroicons/react/24/outline';
import { BoltIcon, CheckCircleIcon } from '@heroicons/react/24/solid'
import clsx from 'clsx';

export default function CampaignStatus({ status }: { status: string }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-xs',
        {
          'bg-gray-100 text-gray-500': status === 'in_future',
          'bg-blue-500 text-white': status === 'completed',
          'bg-green-500 text-white': status === 'running',
          'bg-purple-500 text-white': status === 'paused',
        },
      )}
    >
      {status === 'running' ? (
        <>
          Running
          <BoltIcon className="ml-1 w-4 text-white-500" />
        </>
      ) : null}
      {status === 'completed' ? (
        <>
          Completed
          <CheckCircleIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
      {status === 'in_future' ? (
        <>
          Coming
          <ClockIcon className="ml-1 w-4 text-grey" />
        </>
      ) : null}
      {status === 'paused' ? (
        <>
          Paused
          <PauseIcon className="ml-1 w-4 text-grey" />
        </>
      ) : null}
    </span>
  );
}
