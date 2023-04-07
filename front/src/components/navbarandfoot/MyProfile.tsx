import tw from 'tailwind-styled-components';
import highlands from '../../assets/ethiopiahighlands.webp';
import ProfileDropDown from './ProfileDropDown';
import { useState, useRef, useEffect } from 'react';
import { loginAPI } from '../../api/api';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

interface isClickType {
  isClick: boolean;
  setIsClick: React.Dispatch<React.SetStateAction<boolean>>;
}

const MyProfile = ({ isClick, setIsClick }: isClickType) => {
  const reduxData = useSelector((state: RootState) => state);
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsClick(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);
  return (
    <div className="hover:text-mainColorBrown" ref={ref}>
      <div
        className="h-42 w-42 rounded-percent overflow-hidden"
        onClick={() => {
          setIsClick(!isClick);
        }}
      >
        <img
          src={
            reduxData.memberInfo == null
              ? highlands
              : reduxData.memberInfo.profileImg || ''
          }
          alt="no_img"
          className="w-full h-full object-cover"
        />
      </div>
      {isClick && (
        <ProfileDropDown setIsClick={setIsClick}>
          <div
            className="mb-3 hover:text-mainColorOrange active:relative active:top-0.5"
            onClick={(e) => {
              navigate('/mypage');
              setIsClick(false);
            }}
          >
            마이페이지
          </div>
          <div
            className="pb-4 hover:text-mainColorOrange active:relative active:top-0.5"
            onClick={(e) => {
              loginAPI
                .logout()
                .then((request) => {
                  window.localStorage.clear();
                  window.location.replace('/');
                  setIsClick(false);
                })
                .catch((e) => {
                  console.log(e);
                  setIsClick(false);
                });
            }}
          >
            로그아웃
          </div>
        </ProfileDropDown>
      )}
    </div>
  );
};

export default MyProfile;
