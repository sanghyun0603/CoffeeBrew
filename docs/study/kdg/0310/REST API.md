# REST API

## REST란?

REST(Representational State Transfer)는 www와 같은 웹시스템을 위한 소프트웨어 아키텍쳐의 일종으로 엄격한 의미로 REST 는 네트워크 아키텍처 원리의 모음을 의미한다.

**네트워크 아키텍처 원리** : 자원을 정의하고 자원에 대한 주소를 지정하는 방법 전반

## REST 구성 요소

HTTP URL 을 통해서 자원(Resource)을 명시하고 HTTP Method(GET, POST, PUT, DELETE)를 통해 해당 자원(URL)에 대한 CRUD를 적용하는 것을 말한다.

1. 자원(Resource) : HTTP URL
2. 자원에 대한 행위 : HTTP Method
3. 자원에 대한 표현 : Representation

⇒ **자원(URI)**, **행위(HTTP Method)**, **표현(Representations)**로 구성

## ****REST 아키텍처에 적용되는 6가지 제한 조건****

- **인터페이스 일관성** : 
일관적인 인터페이스로 분리되어야 한다.
- [**무상태(Stateless)**](https://en.wikipedia.org/wiki/Stateless_server) : 
각 요청 간 클라이언트의 콘텍스트가 서버에 저장되어서는 안 된다.
- [**캐시 처리 가능(Cacheable)**](https://ko.wikipedia.org/wiki/%EC%9B%B9_%EC%BA%90%EC%8B%9C) : 
WWW에서와 같이 클라이언트는 서버 응답을 캐싱할 수 있어야 한다.
잘 관리된 캐싱은 클라이언트 - 서버 간 상호작용을 제거하여 scalability와 성능을 향상시킨다.
- [**계층화(Layered System)**](https://en.wikipedia.org/wiki/Layered_system) : 
클라이언트는 일반적으로 대상 서버에 직접 연결되었는지, 또는 중간 서버를 통해 연결되었는지를 알 수 없다. 중간 서버는 [로드 밸런싱](https://ko.wikipedia.org/wiki/%EB%A1%9C%EB%93%9C_%EB%B0%B8%EB%9F%B0%EC%8B%B1) 기능이나 [공유 캐시](https://ko.wikipedia.org/w/index.php?title=%EA%B3%B5%EC%9C%A0_%EC%BA%90%EC%8B%9C&action=edit&redlink=1) 기능을 제공함으로써 시스템 규모 확장성을 향상시키는 데 유용하다.
- [**Code on demand (optional)**](https://en.wikipedia.org/wiki/Client-side_scripting) : 
자바 애플릿이나 자바스크립트의 제공을 통해 서버가 클라이언트가 실행시킬 수 있는 로직을 전송하여 기능을 확장할 수 있다.
- [**클라이언트/서버 구조**](https://en.wikipedia.org/wiki/Client%E2%80%93server) : 
아키텍처를 단순화시키고 작은 단위로 분리(decouple)할 수 있다.
따라서 클라이언트 - 서버의 각 파트가 독립적으로 개선시킬 수 있다.

## REST ****인터페이스의 원칙에 대한 가이드****

- **자원의 식별** : 
요청 내에 기술된 개별 자원을 식별할 수 있어야 한다. 대표적인 사례로 웹 기반의 REST 시스템에서의 [URI](https://ko.wikipedia.org/wiki/URI)의 사용을 예로 들 수 있다. 자원은 클라이언트가 받는 문서와는 개념적으로 분리되어 있다. 예를 들어, 서버는 데이터베이스 내부의 자료를 직접 전송하는 대신, 데이터베이스 레코드를 HTML, XML이나 JSON 등의 형식으로 전송한다.
- **메시지를 통한 리소스의 조작** : 
클라이언트가 어떤 자원을 지칭하는 메시지와 특정 메타데이터만 가지고 있다면 이것으로 서버 상의 해당 자원을 변경·삭제할 수 있는 충분한 정보를 가지고 있는 것이다.
- **자기서술적 메시지** : 
각 메시지는 자신을 어떻게 처리해야 하는지에 대한 충분한 정보를 포함해야 한다. 예를 들어 MIME type과 같은 인터넷 미디어 타입을 전달한다면, 그 메시지에는 어떤 파서를 이용해야 하는지에 대한 정보도 포함해야 한다. 미디어 타입만 가지고도, 클라이언트는 어떻게 그 내용을 처리해야할 지 알 수 있어야 한다. 메시지를 이해하기 위해 그 내용까지 살펴봐야 한다면, 그 메시지는 자기서술적이 아니다. 예를 들어, 단순히 "application/xml"이라는 미디어 타입은, 실제 내용을 다운로드 받지 않으면 그 메시지만 가지고는 무엇을 해야할지에 대해 충분히 알려주지 못한다.
- **애플리케이션의 상태에 대한 엔진으로서 하이퍼미디어** : 
클라이언트가 관련된 리소스에 접근하기를 원한다면, 리턴되는 지시자에서 구별될 수 있어야 한다. 충분한 콘텍스트 속에서의 URI를 제공해주는 하이퍼텍스트 링크의 예를 들 수 있다.

## **REST API 설계방법**

완전히 정해진 양식이 있는 것이 아니기 때문에 조금씩 다른 부분이 있어 관련 포스트 링크로 대체

[RESTful API 설계 가이드](https://sanghaklee.tistory.com/57)

[REST API Response Body 형식에 대한 경험적 구조 · Story's G Blog](http://blog.storyg.co/rest-api-response-body-best-pratics)

[REST API에서의 HTTP 상태 코드, 상태 메시지 (응답 코드, 응답 메시지)](https://jaeseongdev.github.io/development/2021/04/22/REST_API에서의_HTTP_상태코드_상태메시지.md/)

[REST API URI 규칙](https://velog.io/@pjh612/REST-API-URI-규칙)

[7 Rules for REST API URI Design - DZone](https://dzone.com/articles/7-rules-for-rest-api-uri-design-1)

### 🔗reference

- [Wikipedia - REST](https://ko.wikipedia.org/wiki/REST)