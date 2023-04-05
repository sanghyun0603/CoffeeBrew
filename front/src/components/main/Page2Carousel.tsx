import { useState, useEffect } from 'react';
import { mainAPI } from '../../api/api';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import tw from 'tailwind-styled-components';
import Carousel from 'react-material-ui-carousel';
import CoffeeCard from '../CoffeeCard';

type CoffeeItem = {
  nameKo?: string;
  nameEn?: string | null;
  summary?: string | null;
  thumbnail?: string | null;
  userGrade?: number;
  description?: string | null;
  origin?: string;
  region?: string;
  rank?: string | null;
  processing?: string | null;
  decaffeination?: boolean | null;
  balance?: number | null;
  flavor?: number;
  acidity?: number;
  sweetness?: number;
  bitterness?: number;
  body?: number;
  coffeeingNote?: string | null;
  roastingPoint?: string | null;
};

interface propsData {
  [index: number]: CoffeeItem;
}

const Page2Carousel = () => {
  const reudxData = useSelector((state: RootState) => state);
  const userage = reudxData.memberInfo?.ageRange;
  console.log(userage);
  const [beanMain, setbeanMain] = useState([
    {
      nameKo: '인도네시아 수마트라 G1 웻헐드 (중배전)',
      nameEn: '인도네시아 수마트라 G1 웻헐드 (중배전)',
      summary: '아이템 요약 영역 입니다!!!',
      thumbnail: 'default_bean.png',
      userGrade: 0,
      description: '상세 내용 입니다!!!',
      origin: '인도네시아',
      region: '수마트라',
      rank: 'G1',
      processing: '웻헐드',
      decaffeination: false,
      balance: 5,
      flavor: 7,
      acidity: 4,
      sweetness: 6,
      bitterness: 8,
      body: 8,
      coffeeingNote: '오크나무, 견과류, 밀크초코',
      roastingPoint: '중배전',
    },
    {
      nameKo: '과테말라 우에우에테낭고 SHB 워시드 디카페인 (강배전)',
      nameEn: '과테말라 우에우에테낭고 SHB 워시드 디카페인 (강배전)',
      summary: '아이템 o 영역 입니다!!!',
      thumbnail: 'default_bean.png',
      userGrade: 0,
      description: '상세 내용 입니다!!!',
      origin: '과테말라',
      region: '우에우에테낭고',
      rank: 'SHB',
      processing: '워시드',
      decaffeination: false,
      balance: 5,
      flavor: 6,
      acidity: 5,
      sweetness: 7,
      bitterness: 7,
      body: 7,
      coffeeingNote: '블랙커런트, 땅콩, 갈색설탕',
      roastingPoint: '강배전',
    },
    {
      nameKo: '베트남 베트남 G1 워시드 (중배전)',
      nameEn: '베트남 베트남 G1 워시드 (중배전)',
      summary: '아이템 요약 영역 입니다!!!',
      thumbnail: 'default_bean.png',
      userGrade: 0,
      description: '상세 내용 입니다!!!',
      origin: '베트남',
      region: '베트남',
      rank: 'G1',
      processing: '워시드',
      decaffeination: false,
      balance: 5,
      flavor: 6,
      acidity: 2,
      sweetness: 6,
      bitterness: 6,
      body: 6,
      coffeeingNote: '아몬드, 토스트, 보리',
      roastingPoint: '중배전',
      linkDTO: [],
    },
    {
      nameKo: '인도 치크마갈루르 AA 워시드 (중배전)',
      nameEn: '인도 치크마갈루르 AA 워시드 (중배전)',
      summary: '아이템 요약 영역 입니다!!!',
      thumbnail: 'default_bean.png',
      userGrade: 0,
      description: '상세 내용 입니다!!!',
      origin: '인도',
      region: '치크마갈루르',
      rank: 'AA',
      processing: '워시드',
      decaffeination: false,
      balance: 5,
      flavor: 6,
      acidity: 4,
      sweetness: 6,
      bitterness: 6,
      body: 7,
      coffeeingNote: '스카치캔디, 밀크초코, 마카다미아',
      roastingPoint: '중배전',
      linkDTO: [],
    },
  ]);
  const [ageMain, setAgeMain] = useState([
    {
      origin: '',
      region: '',
      rank: '',
      processing: '',
      balance: 0,
      flavor: 0,
      acidity: 0,
      sweetness: 0,
      bitterness: 0,
      body: 0,
      coffeeingNote: '',
      roastingPoint: '',
    },
  ]);
  const [capcull, setCapcull] = useState();
  const [ageCapcull, setAgeCapcull] = useState();
  const [beanRe, setBeanRe] = useState([
    {
      nameKo: '인도네시아 수마트라 G1 웻헐드 (중배전)',
      nameEn: '인도네시아 수마트라 G1 웻헐드 (중배전)',
      summary: '아이템 요약 영역 입니다!!!',
      thumbnail: 'default_bean.png',
      userGrade: 0,
      description: '상세 내용 입니다!!!',
      origin: '인도네시아',
      region: '수마트라',
      rank: 'G1',
      processing: '웻헐드',
      decaffeination: false,
      balance: 5,
      flavor: 7,
      acidity: 4,
      sweetness: 6,
      bitterness: 8,
      body: 8,
      coffeeingNote: '오크나무, 견과류, 밀크초코',
      roastingPoint: '중배전',
    },
    {
      nameKo: '과테말라 우에우에테낭고 SHB 워시드 디카페인 (강배전)',
      nameEn: '과테말라 우에우에테낭고 SHB 워시드 디카페인 (강배전)',
      summary: '아이템 o 영역 입니다!!!',
      thumbnail: 'default_bean.png',
      userGrade: 0,
      description: '상세 내용 입니다!!!',
      origin: '과테말라',
      region: '우에우에테낭고',
      rank: 'SHB',
      processing: '워시드',
      decaffeination: false,
      balance: 5,
      flavor: 6,
      acidity: 5,
      sweetness: 7,
      bitterness: 7,
      body: 7,
      coffeeingNote: '블랙커런트, 땅콩, 갈색설탕',
      roastingPoint: '강배전',
    },
    {
      nameKo: '베트남 베트남 G1 워시드 (중배전)',
      nameEn: '베트남 베트남 G1 워시드 (중배전)',
      summary: '아이템 요약 영역 입니다!!!',
      thumbnail: 'default_bean.png',
      userGrade: 0,
      description: '상세 내용 입니다!!!',
      origin: '베트남',
      region: '베트남',
      rank: 'G1',
      processing: '워시드',
      decaffeination: false,
      balance: 5,
      flavor: 6,
      acidity: 2,
      sweetness: 6,
      bitterness: 6,
      body: 6,
      coffeeingNote: '아몬드, 토스트, 보리',
      roastingPoint: '중배전',
      linkDTO: [],
    },
    {
      nameKo: '인도 치크마갈루르 AA 워시드 (중배전)',
      nameEn: '인도 치크마갈루르 AA 워시드 (중배전)',
      summary: '아이템 요약 영역 입니다!!!',
      thumbnail: 'default_bean.png',
      userGrade: 0,
      description: '상세 내용 입니다!!!',
      origin: '인도',
      region: '치크마갈루르',
      rank: 'AA',
      processing: '워시드',
      decaffeination: false,
      balance: 5,
      flavor: 6,
      acidity: 4,
      sweetness: 6,
      bitterness: 6,
      body: 7,
      coffeeingNote: '스카치캔디, 밀크초코, 마카다미아',
      roastingPoint: '중배전',
      linkDTO: [],
    },
  ]);
  const [capcullRe, setCapcullRe] = useState([
    {
      nameKo: '인도네시아 수마트라 G1 웻헐드 (중배전)',
      nameEn: '인도네시아 수마트라 G1 웻헐드 (중배전)',
      summary: '아이템 요약 영역 입니다!!!',
      thumbnail: 'default_bean.png',
      userGrade: 0,
      description: '상세 내용 입니다!!!',
      origin: '인도네시아',
      region: '수마트라',
      rank: 'G1',
      processing: '웻헐드',
      decaffeination: false,
      balance: 5,
      flavor: 7,
      acidity: 4,
      sweetness: 6,
      bitterness: 8,
      body: 8,
      coffeeingNote: '오크나무, 견과류, 밀크초코',
      roastingPoint: '중배전',
    },
    {
      nameKo: '과테말라 우에우에테낭고 SHB 워시드 디카페인 (강배전)',
      nameEn: '과테말라 우에우에테낭고 SHB 워시드 디카페인 (강배전)',
      summary: '아이템 o 영역 입니다!!!',
      thumbnail: 'default_bean.png',
      userGrade: 0,
      description: '상세 내용 입니다!!!',
      origin: '과테말라',
      region: '우에우에테낭고',
      rank: 'SHB',
      processing: '워시드',
      decaffeination: false,
      balance: 5,
      flavor: 6,
      acidity: 5,
      sweetness: 7,
      bitterness: 7,
      body: 7,
      coffeeingNote: '블랙커런트, 땅콩, 갈색설탕',
      roastingPoint: '강배전',
    },
    {
      nameKo: '베트남 베트남 G1 워시드 (중배전)',
      nameEn: '베트남 베트남 G1 워시드 (중배전)',
      summary: '아이템 요약 영역 입니다!!!',
      thumbnail: 'default_bean.png',
      userGrade: 0,
      description: '상세 내용 입니다!!!',
      origin: '베트남',
      region: '베트남',
      rank: 'G1',
      processing: '워시드',
      decaffeination: false,
      balance: 5,
      flavor: 6,
      acidity: 2,
      sweetness: 6,
      bitterness: 6,
      body: 6,
      coffeeingNote: '아몬드, 토스트, 보리',
      roastingPoint: '중배전',
      linkDTO: [],
    },
    {
      nameKo: '인도 치크마갈루르 AA 워시드 (중배전)',
      nameEn: '인도 치크마갈루르 AA 워시드 (중배전)',
      summary: '아이템 요약 영역 입니다!!!',
      thumbnail: 'default_bean.png',
      userGrade: 0,
      description: '상세 내용 입니다!!!',
      origin: '인도',
      region: '치크마갈루르',
      rank: 'AA',
      processing: '워시드',
      decaffeination: false,
      balance: 5,
      flavor: 6,
      acidity: 4,
      sweetness: 6,
      bitterness: 6,
      body: 7,
      coffeeingNote: '스카치캔디, 밀크초코, 마카다미아',
      roastingPoint: '중배전',
      linkDTO: [],
    },
  ]);

  const cutArr = (arr: []) => {
    return arr.slice(0, 4);
  };

  useEffect(() => {
    const getData = async (age: any) => {
      await mainAPI
        .getAgeRecom(age)
        .then((request) => {
          const data = request.data;
          console.log(data);
          setAgeMain(data);
        })
        .catch((e) => console.log(e));
    };
    getData(userage);
  }, []);

  useEffect(() => {});
  return (
    <Carousel>
      <BigDiv>
        <InDiv>
          {beanMain.map((data: propsData, i) => {
            return <CoffeeCard key={i} rec={'bean'} propsdata={data} />;
          })}
        </InDiv>
        <InDiv>
          {capcullRe.map((data: propsData, i) => {
            return <CoffeeCard key={i} rec={'capcull'} propsdata={data} />;
          })}
        </InDiv>
      </BigDiv>
      <BigDiv>
        <InDiv>
          {ageMain.map((data: propsData, i) => {
            return <CoffeeCard key={i} rec={'bean'} propsdata={data} />;
          })}
        </InDiv>
        <InDiv>
          {capcullRe.map((data: propsData, i) => {
            return <CoffeeCard key={i} rec={'capcull'} propsdata={data} />;
          })}
        </InDiv>
      </BigDiv>
    </Carousel>
  );
};

export default Page2Carousel;

const BigDiv = tw.div`flex flex-col justify-center items-center`;
const InDiv = tw.div`h-5/6 w-2/3 flex justify-center items-center`;

// [
//   {
//     origin: '',
//     region: '',
//     rank: '',
//     processing: '',
//     balance: 0,
//     flavor: 0,
//     acidity: 0,
//     sweetness: 0,
//     bitterness: 0,
//     body: 0,
//     coffeeingNote: '',
//     roastingPoint: '',
//   },
// ]
