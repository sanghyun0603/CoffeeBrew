package b305.coffeebrew.server.service;

import b305.coffeebrew.server.config.utils.RedisUtil;
import b305.coffeebrew.server.controller.MemberController;
import b305.coffeebrew.server.dto.member.ProfileResDTO;
import b305.coffeebrew.server.dto.member.SignModReqDTO;
import b305.coffeebrew.server.entity.Likelist;
import b305.coffeebrew.server.entity.Member;
import b305.coffeebrew.server.exception.ErrorCode;
import b305.coffeebrew.server.exception.MemberNotFoundException;
import b305.coffeebrew.server.repository.LikelistRepository;
import b305.coffeebrew.server.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class MemberService {

    private static final String METHOD_NAME = MemberController.class.getName();

    private final MemberRepository memberRepository;
    private final RedisUtil redisUtil;
    @Value("${spring.security.oauth2.client.registration.kakao.admin-key}")
    private String admin_key;

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
     * 회원 정보 수정(연령대와 성별 수정)
     * survey param1(성별), param2(연령대) 값을 사용
     */
    @Transactional
    public String updateAgeAndGender(String ageRange, String gender, long idx) throws RuntimeException {

        Member member = memberRepository.findById(idx).orElseThrow(() -> new MemberNotFoundException(ErrorCode.MEMBER_NOT_FOUND));

        member.updateAgeAndGender(ageRange, gender);
        memberRepository.updateMemberAgeAndGender(ageRange, gender, idx);

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
    public Long deleteMember(long memberIdx) throws RuntimeException {
        String reqURL = "https://kapi.kakao.com/v1/user/unlink";
        Optional<Member> member = memberRepository.findByMemberIdxAndExpiredFalse(memberIdx);
        if (member.isPresent()) {
            // expired가 false인 회원이 존재하는 경우
            member.get().setExpired(true);
            memberRepository.save(member.get());
            redisUtil.deleteData(member.get().getMemberEmail());
            RestTemplate restTemplate = new RestTemplate();
            HttpHeaders headers = new HttpHeaders();
            headers.set("Authorization", "KakaoAK " + admin_key);
            HttpEntity<String> entity = new HttpEntity<>(headers);
            ResponseEntity<String> response = restTemplate.exchange(reqURL, HttpMethod.POST, entity, String.class);
            int responseCode = response.getStatusCodeValue();
            System.out.println("responseCode : " + responseCode);
            return memberIdx;
        } else {
            // expired가 false인 회원이 존재하지 않는 경우
            throw new MemberNotFoundException(ErrorCode.MEMBER_NOT_FOUND);
        }
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