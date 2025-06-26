'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

type Donor = { id: string; name: string };
type Campaign = { id: string; name: string };

export default function AddPaymentForm() {
  const router = useRouter();

  const [donors, setDonors] = useState<Donor[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  const [donorId, setDonorId] = useState('');
  const [campaignId, setCampaignId] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const [donorsRes, campaignsRes] = await Promise.all([
          fetch('/api/donors'),
          fetch('/api/campaigns'),
        ]);
        const donorsData = await donorsRes.json();
        const campaignsData = await campaignsRes.json();

        setDonors(donorsData);
        setCampaigns(campaignsData);
      } catch {
        alert('Failed to load donors or campaigns');
      }
    }
    fetchData();
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!donorId || !campaignId || !amount || !date || !file) {
      alert('Please fill all fields and upload a receipt.');
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append('donor_id', donorId);
    formData.append('campaign_id', campaignId);
    formData.append('amount', amount);
    formData.append('date', date);
    formData.append('receipt', file);

    try {
      const res = await fetch('/seed/createPayment', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const error = await res.json();
        alert('Error: ' + (error.message || 'Failed to add payment.'));
        setLoading(false);
        return;
      }

      alert('🎉 Payment added successfully!');
      router.push('/dashboard/payments');
    } catch {
      alert('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto mt-10 space-y-6 p-6 rounded-md bg-white shadow" noValidate>
      <h2 className="text-2xl font-bold text-gray-800">Add New Payment</h2>

      <label>
        Donor
        <select
          value={donorId}
          onChange={(e) => setDonorId(e.target.value)}
          className="w-full border px-3 py-2 rounded-md mt-1"
          required
        >
          <option value="" disabled>
            Select Donor
          </option>
          {donors.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name}
            </option>
          ))}
        </select>
      </label>

      <label>
        Campaign
        <select
          value={campaignId}
          onChange={(e) => setCampaignId(e.target.value)}
          className="w-full border px-3 py-2 rounded-md mt-1"
          required
        >
          <option value="" disabled>
            Select Campaign
          </option>
          {campaigns.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </label>

      <label>
        Amount
        <input
          type="number"
          step="0.01"
          min="0"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
          className="w-full border px-3 py-2 rounded-md mt-1"
          required
        />
      </label>

      <label>
        Payment Date
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full border px-3 py-2 rounded-md mt-1"
          required
        />
      </label>

      <label>
        Upload Receipt (PDF/Image)
        <input
          type="file"
          accept=".pdf,image/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="w-full mt-1"
          required
        />
      </label>

      <button
        type="submit"
        disabled={loading}
        className={`w-full bg-blue-600 text-white py-2 px-4 rounded-md ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {loading ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
}
