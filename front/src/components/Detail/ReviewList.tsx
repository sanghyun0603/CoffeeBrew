import tw from 'tailwind-styled-components';
import { useState } from 'react';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import bean from '../../assets/bean.png';
import ratingfull from '../../assets/ratingfull.png';
import ratinghalf from '../../assets/ratinghalf.png';
import ratingempty from '../../assets/ratingempty.png';
// 최신순, 추천순
const ReviewFilter = tw.div`flex flex-row mb-4 justify-end mr-14`;
const FilterOn = tw.div`w-20 h-10 rounded-full border-2 text-xl text-center leading-9  bg-black text-white ml-4`;
const FilterOff = tw.div`w-20 h-10 rounded-full border-2 bg-gray-300 text-xl  text-black leading-9 ml-4 cursor-pointer hover:bg-slate-500`;
const CreateReview = tw.button`w-32 h-10 bg-nameColor text-white rounded-full mr-auto text-xl`;

const ReviewList = tw.div`w-1000 mx-auto`;
const ReviewDelete = tw.div`w-16 h-9 bg-brownBorder text-white leading-9 rounded-t-lg ml-14 cursor-pointer hover:bg-slate-500`;
const ReviewItem = tw.div`flex w-1000 border-y-4 border-brownBorder`;
const ReviewName = tw.div`text-xl  mt-12 mb-4`;
const ReviewImg = tw.img`w-60 h-60 rounded-full mb-4 mx-auto`;

// 리뷰내 평가도 (2줄)
const ReviewStandard = tw.div`justify-center mx-auto mt-6`;
const ReviewStandardTop = tw.div`w-720 text-2xl mb-2 flex justify-center`;
const ReviewStandardBottom = tw.div`w-720 text-2xl mt-2 mb-2 flex justify-center`;
const Score = tw.img`w-8`;
// 리뷰내용
const ReviewArticle = tw.div`w-720 border-t-4 border-gray-500 `;
const ReviewTitle = tw.div`text-left text-2xl text-gray-600 ml-4 mt-4 mb-auto mr-auto`;
const ReviewContent = tw.div`text-left ml-4 mt-2 h-fit mb-4`;
const ReviewCreated = tw.p`text-sm ml-10`;
const MoreBtn = tw.button`w-40 h-10 bg-black text-white rounded-full mt-10 mb-4 cursor-pointer hover:bg-slate-500`;

const Review = () => {
  // 리뷰 최신/추천 순 조회버튼
  const [isActive, setIsActive] = useState(true);
  const activeBtn = () => {
    setIsActive(!isActive);
  };

  const [reviewLike, setReviewLike] = useState(false);
  const handleReviewLike = () => {
    setReviewLike(!reviewLike);
  };
  return (
    <div>
      <ReviewFilter>
        <CreateReview> 리뷰 등록</CreateReview>
        {isActive ? (
          <FilterOn>최신순</FilterOn>
        ) : (
          <FilterOff onClick={activeBtn}>최신순</FilterOff>
        )}
        {isActive ? (
          <FilterOff onClick={activeBtn}>추천순</FilterOff>
        ) : (
          <FilterOn>추천순</FilterOn>
        )}
      </ReviewFilter>
      <ReviewList>
        <ReviewDelete>삭제</ReviewDelete>
        <ReviewItem>
          <ReviewName>
            {reviewLike ? (
              <AiFillHeart
                size={30}
                onClick={handleReviewLike}
                style={{ color: 'red', margin: 'auto' }}
              />
            ) : (
              <AiOutlineHeart
                size={30}
                onClick={handleReviewLike}
                style={{ color: 'gray', margin: 'auto' }}
              />
            )}
            <ReviewImg src={bean} />
            원두이름원두이름원두이름원두이름원두이름원두이름
          </ReviewName>
          <ReviewStandard>
            <ReviewStandardTop>
              <p>향</p>
              <Score src={ratingfull} />
              <Score src={ratingfull} />
              <Score src={ratingfull} />
              <Score src={ratingfull} />
              <Score src={ratingfull} />
              <p>산미</p>
              <Score src={ratingfull} />
              <Score src={ratingfull} />
              <Score src={ratingfull} />
              <Score src={ratingfull} />
              <Score src={ratingfull} />
              <p>후미</p>
              <Score src={ratingfull} />
              <Score src={ratingfull} />
              <Score src={ratingfull} />
              <Score src={ratinghalf} />
              <Score src={ratingempty} />
            </ReviewStandardTop>
            <ReviewStandardBottom>
              <p>바디감</p>
              <Score src={ratingfull} />
              <Score src={ratingfull} />
              <Score src={ratingfull} />
              <Score src={ratingfull} />
              <Score src={ratingfull} />
              <p>단맛</p>
              <Score src={ratingfull} />
              <Score src={ratingfull} />
              <Score src={ratingfull} />
              <Score src={ratingfull} />
              <Score src={ratingfull} />
            </ReviewStandardBottom>
            <ReviewArticle>
              <ReviewTitle>
                리뷰제목리뷰제목
                <ReviewCreated> 2023-03-23 </ReviewCreated>
              </ReviewTitle>
              <ReviewContent>
                리뷰내용 감미로운 향과 과일의 단맛, 쌉쌀한 맛의 조화 감미로운
                향과 과일의 단맛, 쌉쌀한 맛의 조화 감미로운 향과 과일의 단맛,
                쌉쌀한 맛의 조화 감미로운 향과 과일의 단맛, 쌉쌀한 맛의 조화
                감미로운 향과 과일의 단맛, 쌉쌀한 맛의 조화 감미로운 향과 과일의
                단맛, 쌉쌀한 맛의 조화 감미로운 향과 과일의 단맛, 쌉쌀한 맛의
                조화 감미로운 향과 과일의 단맛, 쌉쌀한 맛의 조화 단맛, 쌉쌀한
                맛의 조화 감미로운 향과 과일의 단맛, 쌉쌀한 맛의 조화 감미로운
                향과 과일의 단맛, 쌉쌀한 맛의 조화 감미로운 향과 과일의 단맛,
                단맛, 쌉쌀한 맛의 조화 감미로운 향과 과일의 단맛, 쌉쌀한 맛의
                조화 감미로운 향과 과일의 단맛, 쌉쌀한 맛의 조화 감미로운 향과
                과일의 단맛,감미로운 향과 과일의 단맛, 쌉쌀한 맛의 조화 감미로운
                향과
              </ReviewContent>
            </ReviewArticle>
          </ReviewStandard>
        </ReviewItem>
        <MoreBtn>리뷰 더보기 ▼</MoreBtn>
      </ReviewList>
    </div>
  );
};

export default Review;
