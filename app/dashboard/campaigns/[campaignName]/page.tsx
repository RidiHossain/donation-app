import { fetchCampaignSummary, fetchCampaignSpecificDonors } from '@/app/lib/data';
import { formatCurrency } from '@/app/lib/utils';
import { notFound } from 'next/navigation';
import { Card } from '@/app/ui/dashboard/cards';
import { lusitana } from '@/app/ui/fonts';
import CampaignDonorsTable from '@/app/ui/campaigns/CampaignDonorsTable';

type PageProps = {
  params: Promise<{ campaignName: string }>;
};

export default async function Page({ params }: PageProps) {
  // Await the params Promise before using
  const resolvedParams = await params;
  const decodedName = decodeURIComponent(resolvedParams.campaignName);

  let summary;
  try {
    summary = await fetchCampaignSummary(decodedName);
  } catch (error) {
    return notFound(); // Shows 404 if campaign not found
  }

  const donors = await fetchCampaignSpecificDonors(decodedName);

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        {summary.campaign_name}
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card title="Amount to Raise" value={formatCurrency(summary.amount_to_raise)} type="toRaise" />
        <Card title="Pledged" value={formatCurrency(summary.total_pledged)} type="invoices" />
        <Card title="Raised" value={formatCurrency(summary.total_raised)} type="collected" />
        <Card title="Total Donors" value={summary.donor_count} type="customers" />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <CampaignDonorsTable donors={donors} />
      </div>

      <div className="pt-6">
        <a href="/dashboard/campaigns" className="text-blue-600 hover:underline text-sm">
          ← Back to Campaigns
        </a>
      </div>
    </main>
  );
}
