import dynamic from 'next/dynamic';

const ClientHome = dynamic(() => import('@/app/client-home'), { ssr: false });

export default function Home() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">DemHack v2</h1>
      <ClientHome />
    </div>
  );
}
