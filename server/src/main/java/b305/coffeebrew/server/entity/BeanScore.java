package b305.coffeebrew.server.entity;

import b305.coffeebrew.server.config.utils.BaseAtTime;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

@DynamicInsert
@DynamicUpdate
@Entity
@Table(name = "bean_score")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BeanScore extends BaseAtTime implements Serializable {

    // 식별번호
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idx;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "bean_idx")
    private Bean beanIdx;

    @NotNull
    private int balance; // 밸런스

    @NotNull
    private int flavor; // 맛

    @NotNull
    private int acidity; // 산미

    @NotNull
    private int sweetness; // 단맛

    @NotNull
    private int bitterness; // 쓴맛

    @NotNull
    private int body; // 바디감

    @NotBlank
    @Column(name = "coffeeing_note")
    private String coffeeingNote;

    @NotBlank
    @Column(name = "roasting_point")
    private String roastingPoint;

    @Override
    public void prePersist() {
        super.prePersist();
    }
}