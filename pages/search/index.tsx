import dynamic from 'next/dynamic';
import { useState, useCallback } from 'react';

const Album = dynamic(() => import('../../common/client/components/Album'));
const Fab = dynamic(() => import('../../common/client/components/Fab'));

export default function Search() {
  const [criteria, setCriteria] = useState({
    bgnde: '',
    endde: '',
    upkind: '',
    kind: '',
    sido: '',
    sigungu: '',
    shelter: '',
    state: '',
    pageNo: '1',
    numOfRows: '10',
    neuter_yn: '',
  });

  const handleCriteria = useCallback((event, name, value) => {
    if (name === 'pageNo') setCriteria((prev) => ({ ...prev, [name]: value + '' }));
    else if (name === 'submit') setCriteria((prev) => ({ ...prev, ...value, pageNo: '1' }));
    else setCriteria((prev) => ({ ...prev, [name]: value + '' }));
  }, []);

  return (
    <>
      <Album criteria={criteria} handleCriteria={handleCriteria} />
      <Fab handleCriteria={handleCriteria} />
    </>
  );
}
