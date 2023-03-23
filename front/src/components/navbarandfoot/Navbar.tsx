import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, setNavbar, AppDispatch } from '../../store';
import { useOnHoverOutside } from '../../hooks/useOnHoverOutside';

import tw from 'tailwind-styled-components';
import { DropDown } from './DropDown';
import { LoginModal } from '../login/Login';

const Navbar = () => {
  const reduxData = useSelector((state: RootState) => state);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isMenuDropDownOpen, setMenuDropDownOpen] = useState(false);

  useEffect(() => {
    dispatch(setNavbar(location.pathname));
  }, [location, dispatch]);
  const closeHoverMenu = () => {
    setMenuDropDownOpen(false);
  };
  useOnHoverOutside(dropdownRef, closeHoverMenu); //full dropdwon hovering
  return (
    <div
      ref={dropdownRef}
      onMouseOver={() => setMenuDropDownOpen(true)}
      onMouseOut={() => setMenuDropDownOpen(false)} //외부로나갔을때 사라지게
    >
      <NavBa>
        <div className="flex w-1200 mx-auto justify-between ">
          <NDiv
            onClick={() => {
              navigate('/');
              setMenuDropDownOpen(false);
            }}
          >
            <img src={'Coffeebrew.svg'} width={60} height={52} alt="no_img" />
          </NDiv>
          <div className="flex flex-row w-2/3 justify-between">
            <NDiv
              className={`${
                reduxData.navbar.indexOf('intro') !== -1
                  ? 'text-mainColorOrange underline underline-offset-8'
                  : 'text-mainColorBrown'
              }`}
              onClick={() => {
                navigate('/intro');
                setMenuDropDownOpen(false);
              }}
            >
              커피브루 소개
            </NDiv>
            <NDiv
              className={`${
                reduxData.navbar.indexOf('info') !== -1
                  ? 'text-mainColorOrange underline underline-offset-8'
                  : 'text-mainColorBrown'
              }`}
              onClick={() => {
                navigate('/info');
                setMenuDropDownOpen(false);
              }}
            >
              커피 이야기
            </NDiv>
            <NDiv
              className={`${
                reduxData.navbar.indexOf('coffeelist') !== -1
                  ? 'text-mainColorOrange underline underline-offset-8'
                  : 'text-mainColorBrown'
              }`}
              onClick={() => {
                navigate('/coffeelist');
                setMenuDropDownOpen(false);
              }}
            >
              구경하기
            </NDiv>
            <NDiv
              className={`${
                reduxData.navbar.indexOf('survey') !== -1
                  ? 'text-mainColorOrange underline underline-offset-8'
                  : 'text-mainColorBrown'
              }`}
              onClick={() => {
                navigate('/survey');
                setMenuDropDownOpen(false);
              }}
            >
              원두 성향 테스트
            </NDiv>
            <NDiv
              className="text-mainColorBrown"
              onMouseOver={(e) => {
                e.stopPropagation();
                setMenuDropDownOpen(false);
              }}
            >
              <LoginModal />
            </NDiv>
          </div>
        </div>
      </NavBa>
      {isMenuDropDownOpen && (
        <DropDown setMenuDropDownOpen={setMenuDropDownOpen} />
      )}
    </div>
  );
};

const NavBa = tw.div`fixed top-0 h-10vh w-screen flex bg-navColor z-50`;
const NDiv = tw.div` flex justify-center items-center text-base cursor-default hover:text-mainColorOrange font-bold`;

export default Navbar;
