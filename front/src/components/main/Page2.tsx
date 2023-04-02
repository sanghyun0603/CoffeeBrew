import Page2Carousel from './Page2Carousel';
import tw from 'tailwind-styled-components';

const Page2 = () => {
  return (
    <Inner>
      <CarouselDiv>
        <Page2Carousel />
      </CarouselDiv>
      {/* <RecommendCard /> */}
    </Inner>
  );
};

export default Page2;

const Inner = tw.div`h-screen flex justify-center items-center bg-mainBg2 bg-cover`;
const CarouselDiv = tw.div`w-full`;
