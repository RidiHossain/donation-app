'use client';

import { useState } from 'react';

export default function CreateDonor() {
  const [paymentPlan, setPaymentPlan] = useState('onetime');

  const handlePaymentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPaymentPlan(e.target.value);
  };

  return (
    <form className="max-w-xl mx-auto mt-10 space-y-6 p-6 rounded-md bg-white shadow">
      <h2 className="text-2xl font-bold text-gray-800">Create New Donor</h2>

      <div>
        <label className="block mb-1 font-medium text-gray-700">Name</label>
        <input
          type="text"
          name="name"
          className="w-full border px-3 py-2 rounded-md"
          placeholder="Donor name"
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-medium text-gray-700">Phone</label>
        <input
          type="tel"
          name="phone"
          className="w-full border px-3 py-2 rounded-md"
          placeholder="Phone number"
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-medium text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          className="w-full border px-3 py-2 rounded-md"
          placeholder="Email address"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium text-gray-700">Address</label>
        <input
          type="text"
          name="address"
          className="w-full border px-3 py-2 rounded-md"
          placeholder="Address"
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-medium text-gray-700">Payment Plan</label>
        <select
          name="paymentPlan"
          className="w-full border px-3 py-2 rounded-md"
          value={paymentPlan}
          onChange={handlePaymentChange}
        >
          <option value="onetime">One-time</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>

      {paymentPlan === 'monthly' ? (
        <>
          <div>
            <label className="block mb-1 font-medium text-gray-700">Number of Months</label>
            <input
              type="number"
              name="months"
              className="w-full border px-3 py-2 rounded-md"
              placeholder="e.g., 6"
              min={1}
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Monthly Amount ($)</label>
            <input
              type="number"
              name="monthlyAmount"
              className="w-full border px-3 py-2 rounded-md"
              placeholder="e.g., 50"
              min={1}
              required
            />
          </div>
        </>
      ) : (
        <div>
          <label className="block mb-1 font-medium text-gray-700">One-time Amount ($)</label>
          <input
            type="number"
            name="oneTimeAmount"
            className="w-full border px-3 py-2 rounded-md"
            placeholder="e.g., 100"
            min={1}
            required
          />
        </div>
      )}

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md"
      >
        Submit
      </button>
    </form>
  );
}
