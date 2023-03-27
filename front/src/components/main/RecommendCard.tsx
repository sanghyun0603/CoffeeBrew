import tw from 'tailwind-styled-components';

const RecommendCard = () => {
  const cardcolor = 'blue';
  return (
    <OuterCard>
      <TopCard style={{ backgroundColor: cardcolor }}>
        <TopContent>top</TopContent>
      </TopCard>
      <UnderCard>
        <CardTitle>under</CardTitle>
        <CardText>text</CardText>
      </UnderCard>
    </OuterCard>
  );
};

export default RecommendCard;

const OuterCard = tw.div`h-1/2 w-1/6 bg-slate-400 rounded-xl`;
const TopCard = tw.div`h-2/3 flex items-center justify-center rounded-t-xl`;
const TopContent = tw.div``;
const UnderCard = tw.div`h-1/3 flex flex-col items-center justify-center bg-orange-200 rounded-xl`;
const CardTitle = tw.div`text-3xl`;
const CardText = tw.div`text-xl`;
