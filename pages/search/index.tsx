import dynamic from 'next/dynamic';

const Album = dynamic(() => import('../../common/client/components/Album'));
const Pagination = dynamic(() => import('../../common/client/components/Pagination'));
const Fab = dynamic(() => import('../../common/client/components/Fab'));

export default function Home() {
  return (
    <>
      <Album />
      <Pagination />
      <Fab />
    </>
  );
}
