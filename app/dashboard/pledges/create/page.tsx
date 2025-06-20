'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

type Donor = { id: string; name: string };
type Campaign = { id: string; name: string };

export default function CreatePledge() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [donors, setDonors] = useState<Donor[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  // Fetch donors and campaigns on mount
  useEffect(() => {
    async function fetchOptions() {
      const donorRes = await fetch('/api/donors');
      const campaignRes = await fetch('/api/campaigns');
      const donorsData = await donorRes.json();
      const campaignsData = await campaignRes.json();
      setDonors(donorsData);
      setCampaigns(campaignsData);
    }
    fetchOptions();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      donor_id: formData.get('donor_id')?.toString(),
      campaign_id: formData.get('campaign_id')?.toString(),
      amount: Number(formData.get('amount')),
      payment_type: formData.get('payment_type')?.toString(),
      start_date: formData.get('start_date')?.toString(),
      end_date: formData.get('end_date')?.toString(),
    };

    // Basic validation
    if (
      !data.donor_id || !data.campaign_id || !data.amount ||
      !data.payment_type || !data.start_date || !data.end_date
    ) {
      alert('Please fill in all fields.');
      setLoading(false);
      return;
    }

    if (isNaN(data.amount) || data.amount <= 0) {
      alert('Please enter a valid pledge amount.');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/seed/createPledge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const error = await res.json();
        alert('Error: ' + (error.error || 'Something went wrong.'));
        setLoading(false);
        return;
      }

      const result = await res.json();
      console.log(result.message);
      alert('🎉 Pledge created successfully!');
      router.push('/dashboard/pledges');
    } catch (error) {
      console.error(error);
      alert('Network error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto mt-10 space-y-6 p-6 rounded-md bg-white shadow"
      noValidate
    >
      <h2 className="text-2xl font-bold text-gray-800">Create New Pledge</h2>

      <select name="donor_id" required className="w-full border px-3 py-2 rounded-md">
        <option value="">Select Donor</option>
        {donors.map((donor) => (
          <option key={donor.id} value={donor.id}>
            {donor.name}
          </option>
        ))}
      </select>

      <select name="campaign_id" required className="w-full border px-3 py-2 rounded-md">
        <option value="">Select Campaign</option>
        {campaigns.map((campaign) => (
          <option key={campaign.id} value={campaign.id}>
            {campaign.name}
          </option>
        ))}
      </select>

      <input
        name="amount"
        type="number"
        min="1"
        placeholder="Pledge Amount"
        required
        className="w-full border px-3 py-2 rounded-md"
      />

      <select name="payment_type" required className="w-full border px-3 py-2 rounded-md">
        <option value="">Select Payment Type</option>
        <option value="one_time">One-Time</option>
        <option value="monthly">Monthly</option>
      </select>

      <input
        name="start_date"
        type="date"
        required
        className="w-full border px-3 py-2 rounded-md"
      />

      <input
        name="end_date"
        type="date"
        required
        className="w-full border px-3 py-2 rounded-md"
      />

      <button
        type="submit"
        disabled={loading}
        className={`w-full bg-blue-600 text-white py-2 px-4 rounded-md ${
          loading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {loading ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
}
