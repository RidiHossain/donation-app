import { lusitana } from '@/app/ui/fonts';

export default function DonorProfilePage({ params }: { params: { id: string } }) {
  return (
    <main className="p-6">
      <h1 className={`${lusitana.className} text-2xl`}>
        Donor Profile
      </h1>
      <p className="mt-4 text-lg text-gray-700">
        Donor ID: {params.id}
      </p>
    </main>
  );
}
