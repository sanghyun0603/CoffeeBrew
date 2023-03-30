import tw from 'tailwind-styled-components';
import { useState } from 'react';
import bean from '../../assets/bean.png';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import Chart from './Chart/apexchart';

// 최상단 좌측
const BeanTop1 = tw.div`flex justify-center ml-8 mr-8 mb-10 animate-fade-in-down`;
const BeanImg1 = tw.img`object-cover mt-10 drop-shadow-xl`;
const HeartImgLike = tw.div`flex justify-center mt-2`;

// 최상단 우측 설명
const BeanDesc = tw.div`flex ml-12 border-4 border-brownBorder w-592 mt-10 `;
const BeanImgBox = tw.div`w-360`;
const DescLeft = tw.div`w-1/2 `;
const BeanName = tw.div`w-1/2 text-left mt-6 ml-6 mb-3.5 text-3xl`;
const BeanCountry = tw.div`text-left ml-6 text-2xl`;
const BeanChart = tw.div`mt-5 mx-auto`;
const DescRight = tw.div`w-1/2 my-6 mr-6 ml-1 bg-slate-300`;
const Description = tw.div`h-80 mx-auto mt-4 overflow-y-auto`;

const BeanInfo = () => {
  const [isLike, setIsLike] = useState(false);
  const handleLike = () => {
    setIsLike(!isLike);
  };
  return (
    <BeanTop1 id="Top">
      <BeanImgBox>
        <BeanImg1 src={bean} alt="img" />
        <HeartImgLike>
          {isLike ? (
            <AiFillHeart
              size={50}
              onClick={handleLike}
              style={{ color: 'red' }}
            />
          ) : (
            <AiOutlineHeart
              size={50}
              onClick={handleLike}
              style={{ color: 'gray' }}
            />
          )}
        </HeartImgLike>
      </BeanImgBox>
      {/* 최상단 우측(정보, 차트) */}
      <BeanDesc>
        <DescLeft>
          <BeanName> 케냐 AA </BeanName>
          <BeanCountry> 원산지 : 케냐</BeanCountry>

          <BeanChart>
            <Chart />
            {/* <RadarChartExample /> */}
          </BeanChart>
        </DescLeft>
        <DescRight>
          <Description>
            감미로운 향과 과일의 단맛, 쌉쌀한 맛의 조화 감미로운 향과 과일의
            단맛, 쌉쌀한 맛의 조화 감미로운 향과 과일의 단맛, 쌉쌀한 맛의 조화
            감미로운 향과 과일의 단맛, 쌉쌀한 맛의 조화 감미로운 향과 과일의
            단맛, 쌉쌀한 맛의 조화 감미로운 향과 과일의 단맛, 쌉쌀한 맛의 조화
            감미로운 향과 과일의 단맛, 쌉쌀한 맛의 조화 감미로운 향과 과일의
            단맛, 쌉쌀한 맛의 조화 감미로운 향과 과일의 단맛, 쌉쌀한 맛의 조화 -
          </Description>
        </DescRight>
      </BeanDesc>
    </BeanTop1>
  );
};

export default BeanInfo;
