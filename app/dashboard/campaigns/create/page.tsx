'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function CreateCampaign() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name')?.toString().trim() || '',
      amount_to_raise: Number(formData.get('amount_to_raise')),
      status: formData.get('status')?.toString().trim() || '',
    };

    if (!data.name || !data.amount_to_raise || !data.status) {
      alert('Please fill in all required fields.');
      setLoading(false);
      return;
    }

    if (isNaN(data.amount_to_raise) || data.amount_to_raise <= 0) {
      alert('Please enter a valid amount to raise.');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/seed/createCampaign', {
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
      alert('🎉 Campaign created successfully!');
      router.push('/dashboard/campaigns');
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
      <h2 className="text-2xl font-bold text-gray-800">Create New Campaign</h2>

      <input
        name="name"
        placeholder="Campaign Name"
        required
        className="w-full border px-3 py-2 rounded-md"
      />

      <input
        name="amount_to_raise"
        type="number"
        min="1"
        placeholder="Amount to Raise"
        required
        className="w-full border px-3 py-2 rounded-md"
      />

      <select
        name="status"
        required
        className="w-full border px-3 py-2 rounded-md"
      >
        <option value="">Select Status</option>
        <option value="running">Running</option>
        <option value="completed">Completed</option>
        <option value="paused">Paused</option>
        <option value="in_future">In Future</option>
      </select>

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
