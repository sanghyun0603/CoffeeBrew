import tw from 'tailwind-styled-components';
import { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import bean from '../../assets/tempImg/bean.png';
import { detailAPI } from '../../api/api';
import acidityImg from '../../assets/detailImg/acidityBean.svg';
import bitterImg from '../../assets/detailImg/bitterBean.svg';
import sweetImg from '../../assets/detailImg/sweetBean.svg';
import flavorImg from '../../assets/detailImg/flavorBean.svg';
import bodyImg from '../../assets/detailImg/bodyBean.svg';

interface recomType {
  flavor: number;
  acidity: number;
  sweetness: number;
  bitterness: number;
  body: number;
  balance: number;
  usergrade: number;
  coffeeingNote: string;
  decaffeination: boolean;
  description: string;
  linkDTO: null;
  nameEn: string;
  nameKo: string;
  origin: string;
  processing: string;
  rank: string;
  region: string;
  roastingPoint: string;
  summary: string;
  thumbnail: string;
}

const RecommendBean = (): JSX.Element => {
  const { beanId } = useParams() as { beanId: string };
  const [cardImg, setCardImg] = useState<string[]>([]);
  const [recommendBeanList, setRecommendBeanList] = useState<
    recomType[] | null
  >(null);

  useEffect(() => {
    const recomBean = async () => {
      await detailAPI
        .recommendBean(Number(beanId))
        .then((request) => {
          console.log(request.data);
          setRecommendBeanList(request.data.value);
        })
        .catch((e) => console.log(e));
    };
    //
    // const updateCardImg = async () => {
    //   try {
    //     await recomBean();
    //     const cards: string[] = [];
    //     recommendBeanList?.map((data, i) => {
    //       const acidity = data?.acidity;
    //       const bitter = data?.bitterness;
    //       const body = data?.body;
    //       const flavor = data?.flavor;
    //       const sweetness = data?.sweetness;
    //       const values: any[] = [acidity, bitter, body, flavor, sweetness];
    //       const maxIndex: number = values.indexOf(Math.max(...values));
    //       const maxVar = Object.keys({
    //         acidity,
    //         bitter,
    //         body,
    //         flavor,
    //         sweetness,
    //       })[maxIndex];
    //       console.log(maxVar);
    //       console.log(cardImg);
    //       if (maxVar === 'acidity') {
    //         if (i === 0) {
    //           cards.push(acidityImg);
    //         } else {
    //           cards.push(acidityImg);
    //         }
    //       } else if (maxVar === 'bitter') {
    //         if (i === 0) {
    //           cards.push(bitterImg);
    //         } else {
    //           cards.push(bitterImg);
    //         }
    //       } else if (maxVar === 'body') {
    //         if (i === 0) {
    //           cards.push(bodyImg);
    //         } else {
    //           cards.push(bodyImg);
    //         }
    //       } else if (maxVar === 'flavor') {
    //         if (i === 0) {
    //           cards.push(flavorImg);
    //         } else {
    //           cards.push(flavorImg);
    //         }
    //       } else if (maxVar === 'sweetness') {
    //         if (i === 0) {
    //           cards.push(sweetImg);
    //         } else {
    //           cards.push(sweetImg);
    //         }
    //       }
    //     });
    //     setCardImg(cards);
    //   } catch (error) {
    //     console.log(error);
    //     setCardImg([]);
    //   }
    // };
    // updateCardImg();
    recomBean();
    console.log('ddd');
  }, []);
  const BackColor: string[] = [
    '#FFAA01',
    '#D4AA70',
    '#E8D2A0',
    '#F6842B',
    '#D3BD94',
  ];

  return (
    <ListDiv>
      <RecomList>
        {recommendBeanList
          ? recommendBeanList?.map((data, i) => {
              const acidity = data?.acidity;
              const bitter = data?.bitterness;
              const body = data?.body;
              const flavor = data?.flavor;
              const sweetness = data?.sweetness;
              const values: any[] = [acidity, bitter, body, flavor, sweetness];
              const maxIndex: number = values.indexOf(Math.max(...values));
              const maxVar = Object.keys({
                acidity,
                bitter,
                body,
                flavor,
                sweetness,
              })[maxIndex];
              console.log(maxVar);
              setCardImg(() => {
                const ne = ['1'];
                let addImg = [];
                if (maxVar === 'acidity') {
                  addImg.push(acidityImg);
                } else if (maxVar === 'bitter') {
                  addImg.push(bitterImg);
                } else if (maxVar === 'body') {
                  addImg.push(bodyImg);
                } else if (maxVar === 'flavor') {
                  addImg.push(flavorImg);
                } else if (maxVar === 'sweetness') {
                  addImg.push(sweetImg);
                }
                return [...cardImg, addImg[0]];
              });

              console.log('test' + i);

              return (
                <RecomItemT1 style={{ backgroundColor: BackColor[i] }}>
                  <RecomItemImg src={cardImg[i]} />
                  <RecomItemB>
                    <RecomItemName>{data.nameKo}</RecomItemName>
                    <RecomInfo>
                      <div>{data.summary}</div>
                    </RecomInfo>
                  </RecomItemB>
                </RecomItemT1>
              );
            })
          : null}
      </RecomList>
    </ListDiv>
  );
};

export default RecommendBean;
const ListDiv = tw.div` text-center`;

const RecomList = tw.div` flex ml-10 mb-4 `;
const RecomItemT = tw.div`w-44 h-320 justify-center rounded-t-2xl my-12 drop-shadow-xl hover:scale-105 hover:drop-shadow-2xl duration-300 ml-2 mr-2 `;
const RecomItemT1 = tw(RecomItemT)`bg-brownBorder rounded-b-2xl`;
const RecomItemImg = tw.img`w-20 h-32  mx-auto mt-4  `;

const RecomItemB = tw.div`w-44 h-44  justify-center  bg-navColor mt-10 rounded-b-2xl hover:drop-shadow-2xl overflow-y-auto`;
const RecomItemName = tw.div`text-productTextBrown pt-4 font-bold break-words mx-4 text-base `;
const RecomInfo = tw.div`h-24 text-nameColor overflow-y-auto mx-4`;
