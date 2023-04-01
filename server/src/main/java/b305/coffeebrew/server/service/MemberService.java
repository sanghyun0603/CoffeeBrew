package b305.coffeebrew.server.service;

import b305.coffeebrew.server.config.security.handler.DecodeEncodeHandler;
import b305.coffeebrew.server.controller.MemberController;
import b305.coffeebrew.server.dto.member.ProfileResDTO;
import b305.coffeebrew.server.dto.member.SignModReqDTO;
import b305.coffeebrew.server.entity.Likelist;
import b305.coffeebrew.server.entity.Member;
import b305.coffeebrew.server.entity.Review;
import b305.coffeebrew.server.exception.ErrorCode;
import b305.coffeebrew.server.exception.MemberNotFoundException;
import b305.coffeebrew.server.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Pageable;
@Slf4j
@Service
@RequiredArgsConstructor
public class MemberService {

    private static final String METHOD_NAME = MemberController.class.getName();

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    private final DecodeEncodeHandler decodeEncodeHandler;
    private final MemberRepository memberRepository;
    private final ReviewRepository reviewRepository;
    private final LikelistRepository likelistRepository;

    /**
     * 회원 정보 수정
     */
    @Transactional
    public String update(SignModReqDTO signModReqDTO, long idx) throws RuntimeException {

        Member member = memberRepository.findById(idx).orElseThrow(() -> new MemberNotFoundException(ErrorCode.MEMBER_NOT_FOUND));

        String profileImg = signModReqDTO.getProfileImg();
        String nickname = signModReqDTO.getNickname();

        member.update(signModReqDTO);
        memberRepository.updateMember(profileImg, nickname, idx);

        return member.getMemberEmail();
    }

    /**
     * 회원 프로필 조회
     */
    @Transactional
    public ProfileResDTO readProfile(long idx) {

        List<Member> MyInfoList = memberRepository.findMyProfile(idx);
        return MyInfoList.stream().map(member -> ProfileResDTO.builder().build().of(member)).collect(Collectors.toList()).get(0);
    }

    /**
     * 회원 탈퇴
     */
    @Transactional
    public Long deleteMember(long memberIdx) throws RuntimeException{
        Member member = memberRepository.findById(memberIdx).orElseThrow(() -> new MemberNotFoundException(ErrorCode.MEMBER_NOT_FOUND));
        // 사옹자 expired로 변경
        member.setExpired(true);
        memberRepository.save(member);
        return member.getIdx();
    }

    /**
     * 사용자 리뷰 목록 조회
     */
    @Transactional
    public Page<Review> readReview(long memberIdx, Pageable pageable) throws RuntimeException{
        Member member = memberRepository.findById(memberIdx).orElseThrow(() -> new MemberNotFoundException(ErrorCode.MEMBER_NOT_FOUND));
        Page<Review> reviewPage = reviewRepository.findByMemberIdx(member, pageable);
        return reviewPage;
    }

    /**
     * 사용자 리뷰 목록 조회
     */
    @Transactional
    public Page<Review> readLikeCapsule(long memberIdx, Pageable pageable) throws RuntimeException{
        Member member = memberRepository.findById(memberIdx).orElseThrow(() -> new MemberNotFoundException(ErrorCode.MEMBER_NOT_FOUND));
        Page<Review> reviewPage = reviewRepository.findByMemberIdx(member, pageable);
        return reviewPage;
    }

    /**
     * 사용자 선호 원두 또는 캡슐 조회
     */
    @Transactional
    public Page<Likelist> readMyPageLike(long memberIdx, String itemType, Pageable pageable) throws RuntimeException{
        Member member = memberRepository.findById(memberIdx).orElseThrow(() -> new MemberNotFoundException(ErrorCode.MEMBER_NOT_FOUND));
        Page<Likelist> likeList = likelistRepository.findByMemberIdxAndItemType(member, itemType, pageable);
        log.info("likeList = {}", likeList);
        return likeList;
    }

//    @Transactional
//    public MemPageResDTO readMyPage(Long idx) {
//        log.info(METHOD_NAME + "- readMyPage");
//
//        Optional<Coin> optionalCoin = coinRepository.findById(idx);
//        if (!optionalCoin.isPresent()) {
//            throw new MyPageHistoryException(ErrorCode.MYPAGE_HISTORY_ERROR);
//        }
//
//        Integer myCoin = optionalCoin.get().getCoin();
//        List<MemPageDealDTO> reqList = dealRepository.findAllMyReqHistory(idx);
//        List<MemPageDealDTO> resList = dealRepository.findAllMyResHistory(idx);
//
//        return MemPageResDTO.builder()
//                .coin(myCoin)
//                .memPageDealDTOReqList(reqList != null ? reqList : Collections.emptyList())
//                .memPageDealDTOResList(resList != null ? resList : Collections.emptyList())
//                .build();
//    }
}