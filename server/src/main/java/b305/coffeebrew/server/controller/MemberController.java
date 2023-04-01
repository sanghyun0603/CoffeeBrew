package b305.coffeebrew.server.controller;

import b305.coffeebrew.server.config.security.auth.PrincipalDetails;
import b305.coffeebrew.server.config.utils.Msg;
import b305.coffeebrew.server.config.utils.ResponseDTO;
import b305.coffeebrew.server.dto.likelist.LikelistResDTO;
import b305.coffeebrew.server.dto.member.SignModReqDTO;
import b305.coffeebrew.server.dto.member.mod;
import b305.coffeebrew.server.exception.ErrorCode;
import b305.coffeebrew.server.service.LikelistService;
import b305.coffeebrew.server.service.MemberService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RestController
@RequestMapping(value = "/member")
@RequiredArgsConstructor
@Api(value = "회원 관련 API", tags = {"Member"})
public class MemberController {

    private static final String METHOD_NAME = MemberController.class.getName();

    private final MemberService memberService;
    private final LikelistService likelistService;

    /**
     * 회원 정보 수정
     */
    @PostMapping("/updateInfo")
    @ApiOperation(value="회원 정보 수정", notes = "닉네임, 프로필 이미지를 입력된 값으로 변경한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 500, message = "서버 오류"),
    })
    public ResponseEntity<ResponseDTO> update(@RequestBody @Validated(mod.class) SignModReqDTO signModReqDTO, @AuthenticationPrincipal PrincipalDetails principalDetails) {
        return ResponseEntity.ok().body(ResponseDTO.of(HttpStatus.OK, Msg.SUCCESS_MEMBER_MOD, memberService.update(signModReqDTO, principalDetails.getMember().getIdx())));
    }
    /**
     * 회원 프로필 조회
     */
    @GetMapping("/profile")
    @ApiOperation(value="회원 프로필 조회", notes = "회원 닉네임, 프로필 이미지 조회")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 500, message = "서버 오류"),
    })
    public ResponseEntity<ResponseDTO> readProfile(@AuthenticationPrincipal PrincipalDetails principalDetails) {
        return ResponseEntity.ok().body(ResponseDTO.of(HttpStatus.OK, Msg.SUCCESS_MEMBER_PROFILE, memberService.readProfile(principalDetails.getMember().getIdx())));
    }

    /**
     * 회원 탈퇴
     */
    @DeleteMapping()
    @ApiOperation(value="회원 탈퇴", notes = "회원 탈퇴를 진행")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 500, message = "서버 오류"),
    })
    public ResponseEntity<ResponseDTO> delete(@AuthenticationPrincipal PrincipalDetails principalDetails) {
        return ResponseEntity.ok().body(ResponseDTO.of(HttpStatus.OK, Msg.SUCCESS_MEMBER_DELETE, memberService.deleteMember(principalDetails.getMember().getIdx())));
    }

    @GetMapping("/like/toggle/{itemType}/{itemId}")
    public ResponseEntity<ResponseDTO> toggleLikelist(@PathVariable String itemType, @PathVariable Long itemId,
                                                         @AuthenticationPrincipal PrincipalDetails principalDetails) {
        return ResponseEntity.ok().body(ResponseDTO.of(HttpStatus.OK, Msg.SUCCESS_LIKE_TOGGLE, likelistService.toggleLikelist(itemType, itemId, principalDetails.getMember().getIdx())));
    }

    @GetMapping("/like/mylist")
    public ResponseEntity<ResponseDTO> getLikelist(@RequestParam String itemType, @RequestParam(defaultValue = "false") boolean expired, @AuthenticationPrincipal PrincipalDetails principalDetails) {
        return ResponseEntity.ok(ResponseDTO.of(HttpStatus.OK, Msg.SUCCESS_LIKE_MYLIST, likelistService.getLikelist(itemType, principalDetails.getMember().getIdx()).stream().map(LikelistResDTO::of).collect(Collectors.toList())));
    }

    /**
     * 사용자 리뷰 목록 조회
     */
    @ApiOperation(value="사용자 리뷰 목록 조회", notes = "작성한 리뷰 목록을 조회")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 500, message = "서버 오류"),
    })
    @GetMapping("/review")
    public ResponseEntity<ResponseDTO> readMyPageReview(@AuthenticationPrincipal PrincipalDetails principalDetails,  @PageableDefault(size = 4, page = 1) Pageable pageable) {
        return ResponseEntity.ok().body(ResponseDTO.of(HttpStatus.OK, Msg.SUCCESS_MEMBER_REVIEW, memberService.readReview(principalDetails.getMember().getIdx(), pageable)));
    }


    /**
     * 사용자 선호 원두 또는 캡슐 조회li
     */
    @ApiOperation(value="사용자 리뷰 목록 조회", notes = "좋아요한 원두 조회")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 500, message = "서버 오류"),
    })
    @GetMapping("/like/{itemType}")
    public ResponseEntity<ResponseDTO> readMyPageLike(@PathVariable String itemType, @AuthenticationPrincipal PrincipalDetails principalDetails,  @PageableDefault(size = 9, page = 1) Pageable pageable) {
        return ResponseEntity.ok().body(ResponseDTO.of(HttpStatus.OK, Msg.SUCCESS_MEMBER_LIKE, memberService.readMyPageLike(principalDetails.getMember().getIdx(), itemType, pageable)));
    }
}
