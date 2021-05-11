import dynamic from 'next/dynamic';

const Content = dynamic<{}>(() =>
  import('../common/client/components/Content').then((mod) => mod.Dashboard)
);

export default function Home() {
  return <Content />;
}
