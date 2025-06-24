'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function CreateDonor() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name')?.toString().trim() || '',
      phone: formData.get('phone')?.toString().trim() || '',
      email: formData.get('email')?.toString().trim() || '',
      address: formData.get('address')?.toString().trim() || '',
    };

    if (!data.name || !data.phone || !data.email || !data.address) {
      alert('Please fill in all required fields.');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/seed/createDonor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      // Make sure to check res.ok first
      if (!res.ok) {
        const error = await res.json();
        alert('Error: ' + (error.error || 'Something went wrong.'));
        setLoading(false);
        return;
      }

      // Optional: parse to trigger catch on malformed response
      const result = await res.json();
      console.log(result.message);

      alert('🎉 Donor added successfully!');
      router.push('/dashboard/donors'); // 👈 Your redirect
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
      <h2 className="text-2xl font-bold text-gray-800">Create New Donor</h2>

      <input name="name" placeholder="Name" required className="w-full border px-3 py-2 rounded-md" />
      <input name="phone" placeholder="Phone" required className="w-full border px-3 py-2 rounded-md" />
      <input name="email" type="email" placeholder="Email" required className="w-full border px-3 py-2 rounded-md" />
      <input name="address" placeholder="Address" required className="w-full border px-3 py-2 rounded-md" />

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
