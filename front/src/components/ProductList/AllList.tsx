import tw from 'tailwind-styled-components';
import { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import CoffeeList from './CoffeeList';
import Paging from './Pagings';
import { listAPI } from '../../api/api';
const AllListBg = tw.div`flex-col bg-background select-none`;

export interface BeanResponseType {
  content: BeanType[];
  pageable: {
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    unpaged: boolean;
  };
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}

export interface BeanType {
  idx: number;
  nameKo: string;
  nameEn: string;
  summary: string;
  thumbnail: string | null;
  userGrade: number | null;
  taste: string;
}

const AllList = () => {
  const [pagination, setPagination] = useState<BeanResponseType | null>(null);
  const [words, setWords] = useState<string[]>(['page=0']);

  useEffect(() => {
    const getLists = async () => {
      await listAPI
        .getBeans(...words)
        .then((request) => {
          setPagination(request.data.value);
        })
        .catch((e) => console.log(e));
    };
    getLists();
  }, []);

  return (
    <AllListBg style={{ minHeight: '1300px' }}>
      <SearchBar
        pagination={pagination}
        setPagination={setPagination}
        setWords={setWords}
        words={words}
      />
      {pagination ? <CoffeeList listDatas={pagination?.content} /> : null}
      {pagination ? (
        <Paging
          pagination={pagination}
          setPagination={setPagination}
          setWords={setWords}
          words={words}
        />
      ) : null}
    </AllListBg>
  );
};

export default AllList;
