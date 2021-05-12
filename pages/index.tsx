import dynamic from 'next/dynamic';

const Dashboard = dynamic(() => import('../common/client/components/Dashboard'));

export default function Home() {
  return <Dashboard />;
}
