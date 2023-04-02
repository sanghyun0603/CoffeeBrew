package b305.coffeebrew.server.repository;

import b305.coffeebrew.server.entity.Member;
import b305.coffeebrew.server.entity.Review;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {

	List<Review> findByItemTypeAndItemIdx(String itemType, Long itemIdx);

	Page<Review> findByMemberIdx(Member member, Pageable pageable);
}
