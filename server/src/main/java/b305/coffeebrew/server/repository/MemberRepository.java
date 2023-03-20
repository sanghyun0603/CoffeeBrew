package b305.coffeebrew.server.repository;

import b305.coffeebrew.server.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MemberRepository extends JpaRepository<Member, Long> {
    Member findByMemberEmail(String memberEmail);

    @Query("SELECT m FROM Member m WHERE m.idx = :idx")
    List<Member> findMyProfile(@Param("idx") long idx);

    boolean existsByMemberEmail(String memberEmail);

    @Query("update Member m set m.profileImg = :profileImg, m.nickname = :nickname where m.idx= :idx")
    @Modifying(clearAutomatically = true)
    int updateMember(@Param("profileImg") String profileImg, @Param("nickname") String nickname, @Param("idx") long idx);

    @Query("select m.idx from Member m where m.memberEmail like :memberEmail")
    Long findIdxByMemberId(String memberEmail);
}
