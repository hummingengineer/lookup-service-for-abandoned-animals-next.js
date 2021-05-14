import dynamic from 'next/dynamic';
import { useState, useCallback } from 'react';

// const Album = dynamic(() => import('../../common/client/components/Album'));
const Pagination = dynamic(() => import('../../common/client/components/Pagination'));
const Fab = dynamic(() => import('../../common/client/components/Fab'));

export default function Search() {
  const [form, setForm] = useState({
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

  const handleForm = useCallback((event, name, value) => {
    if (name === 'pageNo') setForm({ ...form, [name]: value + '' });
    else setForm({ ...form, [name]: value + '' });
  }, []);

  const totalCount = '100';

  return (
    <>
      {/* <Album /> */}
      <Pagination
        page={parseInt(form.pageNo)}
        totalPage={Math.ceil(parseInt(totalCount) / parseInt(form.numOfRows))}
        handleForm={handleForm}
      />
      <Fab />
    </>
  );
}
