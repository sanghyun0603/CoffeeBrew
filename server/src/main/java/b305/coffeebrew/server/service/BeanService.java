package b305.coffeebrew.server.service;

import b305.coffeebrew.server.config.utils.LinkDTO;
import b305.coffeebrew.server.config.utils.NaverShoppingItemDTO;
import b305.coffeebrew.server.config.utils.NaverShoppingResDTO;
import b305.coffeebrew.server.dto.bean.BeanDetailPageResDTO;
import b305.coffeebrew.server.dto.bean.BeanResDTO;
import b305.coffeebrew.server.entity.Bean;
import b305.coffeebrew.server.entity.BeanDetail;
import b305.coffeebrew.server.entity.BeanScore;
import b305.coffeebrew.server.exception.BeanNotFoundException;
import b305.coffeebrew.server.exception.ErrorCode;
import b305.coffeebrew.server.repository.BeanDetailRepository;
import b305.coffeebrew.server.repository.BeanRepository;
import b305.coffeebrew.server.repository.BeanScoreRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class BeanService {

    private static final String METHOD_NAME = BeanService.class.getName();

    private final BeanRepository beanRepository;
    private final BeanDetailRepository beanDetailRepository;
    private final BeanScoreRepository beanScoreRepository;
    private final RestTemplate restTemplate;

    @Transactional
    public BeanDetailPageResDTO getBeanDetail(Long beanId) {
        log.info(METHOD_NAME + "- getBeanDetail");

        Bean bean = beanRepository.findByIdx(beanId);
        BeanDetail beanDetail = beanDetailRepository.findByBeanIdx(bean);
        BeanScore beanScore = beanScoreRepository.findByBeanIdx(bean);

        if (bean == null || beanDetail == null || beanScore == null) {
            throw new BeanNotFoundException(ErrorCode.BEAN_NOT_FOUND);
        }

        String nameKo = bean.getNameKo();
        String nameEn = bean.getNameEn();
        String summary = bean.getSummary();
        String thumbnail = bean.getThumbnail();
        int userGrade = bean.getUserGrade();

        String description = beanDetail.getDescription();
        String origin = beanDetail.getOrigin();
        String region = beanDetail.getRegion();
        String rank = beanDetail.getRank();
        String processing = beanDetail.getProcessing();
        boolean decaffeination = beanDetail.isDecaffeination();

        int balance = beanScore.getBalance();
        int flavor = beanScore.getFlavor();
        int acidity = beanScore.getAcidity();
        int sweetness = beanScore.getSweetness();
        int bitterness = beanScore.getBitterness();
        int body = beanScore.getBody();
        String coffeeingNote = beanScore.getCoffeeingNote();
        String roastingPoint = beanScore.getRoastingPoint();

        Set<LinkDTO> linkDTOSet = searchNaverShopping(nameKo);

        return BeanDetailPageResDTO.builder()
                .nameKo(nameKo)
                .nameEn(nameEn)
                .summary(summary)
                .thumbnail(thumbnail)
                .userGrade(userGrade)
                .description(description)
                .origin(origin)
                .region(region)
                .rank(rank)
                .processing(processing)
                .decaffeination(decaffeination)
                .balance(balance)
                .flavor(flavor)
                .acidity(acidity)
                .sweetness(sweetness)
                .bitterness(bitterness)
                .body(body)
                .coffeeingNote(coffeeingNote)
                .roastingPoint(roastingPoint)
                .build();
    }

    public Page<BeanResDTO> searchBeans(List<String> keywords, Pageable pageable) {
        if (CollectionUtils.isEmpty(keywords)) {
            return beanRepository.findAll(pageable).map(BeanResDTO::of);
        } else {
            Set<Bean> result = new TreeSet<>(Comparator.comparing(Bean::getNameKo).thenComparing(Bean::getNameEn).thenComparing(Bean::getSummary));
            for (String keyword : keywords) {
                String processedKeyword = "%" + keyword.toLowerCase() + "%";
                result.addAll(beanRepository.findBeansByKeyword(processedKeyword, pageable).getContent());
            }
            return new PageImpl<>(new ArrayList<>(result.stream().limit(pageable.getPageSize()).collect(Collectors.toList()))).map(BeanResDTO::of);
        }
    }

    public Set<LinkDTO> searchNaverShopping(String query) {
        HttpHeaders headers = new HttpHeaders();
        String CLIENT_ID = "SsSyWwIzBCwnFjnX1QyQ";
        String CLIENT_SECRET = "VjB3My35vW";
        headers.add("X-Naver-Client-Id", CLIENT_ID);
        headers.add("X-Naver-Client-Secret", CLIENT_SECRET);

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("query", query);

        HttpEntity<?> requestEntity = new HttpEntity<>(headers);

        ResponseEntity<NaverShoppingResDTO> response = restTemplate.exchange(
                "https://openapi.naver.com/v1/search/shop.json?query={query}",
                HttpMethod.GET,
                requestEntity,
                NaverShoppingResDTO.class,
                params
        );

        NaverShoppingResDTO naverShoppingResponse = response.getBody();

        if (naverShoppingResponse == null || naverShoppingResponse.getItems().isEmpty()) {
            return new HashSet<>();
        }

        Set<LinkDTO> result = new LinkedHashSet<>();

        for (NaverShoppingItemDTO item : naverShoppingResponse.getItems()) {
            String mallName = item.getMallName();
            String link = item.getLink();
            String image = item.getImage();
            result.add(LinkDTO.of(mallName, link, image));
        }

        return result;
    }
}