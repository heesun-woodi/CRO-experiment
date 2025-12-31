# 푸드케어 클레 (FoodCare CLE) - 디자인 시스템 가이드

CRO 실험을 위한 AI 코딩 에이전트 참조용 디자인 시스템 문서입니다.

---

## 1. 색상 시스템

### 주색상 (Primary)
- **클레 그린**: `#1B8041` (로고, 버튼, 강조 요소)
- **배경 베이지/크림**: `#F5E8DD` (이벤트 배너, 주요 섹션 배경)

### 보조색상 (Secondary)
- **핑크/로즈**: `#E8898D` 또는 `#D8897D` (하트 아이콘, 강조)
- **그레이**: `#CCCCCC`, `#999999` (구분선, 보조 텍스트)
- **딥 그레이**: `#333333` (기본 텍스트)

### 기능색상 (Functional)
- **오렌지**: `#F4A460` (가격, 강조 텍스트)
- **라이트 그레이**: `#F0F0F0` (배경, 구분 영역)
- **화이트**: `#FFFFFF` (주 배경)

### 배지/태그 색상
- **초록 배지**: `#4CAF50` (상품 카테고리 배지)
- **핑크 버튼**: `#E8898D` (찜/장바구니 버튼)

---

## 2. 타이포그래피

### 폰트 패밀리
- **주 폰트**: 한글은 시스템 산스(Noto Sans KR 추정), 영문은 Sans-serif
- **폰트 스택**: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Noto Sans KR, sans-serif`

### 제목 계층 (Heading)
| Level | 크기 | 두께 | 사용처 |
|-------|------|------|--------|
| H1 | 28px-32px | Bold (700) | 페이지 타이틀 ("Talk! Talk! REVIEW 한 스푼") |
| H2 | 20px-24px | Bold (700) | 섹션 제목 ("이유식&영양식 정기식단") |
| H3 | 16px-18px | SemiBold (600) | 상품명, 서브 제목 |
| H4 | 14px-16px | SemiBold (600) | 카테고리명 |

### 본문 (Body)
| 타입 | 크기 | 두께 | 높이 | 사용처 |
|------|------|------|------|--------|
| Body Large | 14px | Regular (400) | 1.5 | 주 설명 텍스트 |
| Body Default | 12px-13px | Regular (400) | 1.4 | 기본 본문, 상품 설명 |
| Body Small | 10px-11px | Regular (400) | 1.3 | 부가 정보, 날짜 |

### 가격 텍스트
- **크기**: 16px-18px
- **두께**: Bold (700)
- **색상**: 오렌지 (`#F4A460`) 또는 다크 그레이

---

## 3. 레이아웃 및 그리드

### 모바일 뷰 (주요 타겟)
- **뷰포트**: 375px x 667px (iPhone 기준)
- **컨테이너 너비**: 375px (전체 화면)
- **좌우 패딩**: 16px-20px
- **그리드**: 12칼럼 또는 자유로운 플렉스 레이아웃

### 간격 시스템 (Spacing)
```
xs: 4px
sm: 8px
md: 12px-16px
lg: 20px-24px
xl: 32px
```

### 상품 카드 레이아웃
- **한 줄 상품 수**: 2개 (모바일), 3개 (태블릿)
- **카드 간격**: 8px-12px
- **카드 내부 패딩**: 12px

---

## 4. 컴포넌트 정의

### 4.1 헤더
```
구성:
- 로고 (좌측, 높이 24px)
- 검색 아이콘 (중앙)
- 장바구니 아이콘 + 뱃지 (우측, 숫자 표시)

높이: 48px
배경: 흰색
경계: 아래 1px 구분선 (라이트 그레이)
```

### 4.2 네비게이션 탭
```
항목: 정기식단 | 클레KIDS | 퓨레·간식 | 이벤트 | 리뷰
스타일: 가로 스크롤 가능
활성 상태: 하단 언더라인 또는 텍스트 색상 변경
텍스트 크기: 12px-13px
```

### 4.3 프로모션 배너
```
배경: 베이지/크림 그래디언트 또는 단색
높이: 200px-280px (이미지 포함)
구성:
- 제목: H1 (오렌지 색상)
- 부제: 12px 본문
- 배경 이미지/일러스트
- CTA 버튼 또는 링크

경계 반지름: 12px-16px (상단)
```

### 4.4 상품 카드
```
너비: (100% - 패딩) / 2 = ~165px
높이: 자동 (이미지 + 정보)
구성:
  - 상품 이미지 (정사각형, 경계반지름 8px)
  - 상품명 (13px, 다크그레이)
  - 부가정보 (10px, 라이트그레이) - 예: "4~5개월이"
  - 가격 정보:
    * 할인가: 16px Bold 오렌지
    * 원가: 12px 취소선 (선택)
    * 할인율: 12px 빨강 (선택)
  - 찜 버튼: 핑크 원형 아이콘

배경: 흰색
경계: 1px 라이트그레이 또는 그림자 (0 1px 4px rgba(0,0,0,0.08))
경계반지름: 8px-12px
```

### 4.5 카테고리 배지 (Pills)
```
텍스트: 10px-12px
배경: 초록 (#4CAF50)
텍스트 색상: 흰색
패딩: 4px 8px
경계반지름: 12px (원형)
디스플레이: 인라인 블록
```

### 4.6 찜/장바구니 버튼 (아이콘)
```
모양: 원형 (지름 36px-40px)
배경: 핑크 (#E8898D) 또는 투명
아이콘: 하트, 쇼핑백 등
테두리: 1px (선택)
위치: 카드 우상단 또는 우하단

호버 상태: 배경색 진하게 또는 스케일 1.1x
```

### 4.7 CTA 버튼 (콜투액션)
```
스타일 1 - 주 버튼 (Primary):
  배경: 클레 그린 (#1B8041)
  텍스트: 흰색, 14px Bold
  패딩: 12px 24px
  경계반지름: 8px-12px
  높이: 44px-48px

스타일 2 - 보조 버튼:
  배경: 투명 또는 라이트그레이
  테두리: 1px 그린
  텍스트: 그린

상태:
  - Normal: 기본
  - Hover: 배경색 진하게 또는 그림자 추가
  - Disabled: 투명도 50%, 커서 not-allowed
```

### 4.8 이미지 캐러셀 (슬라이더)
```
높이: 200px-280px
지시자 (Indicator):
  - 점/원형 지시자 (아래 중앙)
  - 현재 색상: 클레 그린 또는 딥 그레이
  - 비활성: 라이트 그레이
  - 크기: 8px 지름, 간격 8px

네비게이션: 좌우 화살표 또는 손가락 스와이프
```

### 4.9 카운트/뱃지
```
형태: 원형 또는 사각형
크기: 20px x 20px (숫자 포함)
배경: 핑크 또는 빨강
텍스트: 흰색, 11px Bold
위치: 우상단 (상품 카드, 장바구니)
```

### 4.10 텍스트 강조 스타일
```
색상 강조:
  - 주요 문구: 오렌지 (#F4A460) 또는 그린
  - 부가 정보: 라이트그레이
  - 할인율: 빨강

굵기 강조: Bold (700)
밑줄: 제한적 사용
```

---

## 5. 상태 및 인터랙션

### 버튼 상태
```
Default: 기본 색상, 커서 포인터
Hover: 배경색 +10% 진하게, 그림자 추가
Active: 배경색 -10% 진하게
Disabled: 투명도 50%, 커서 not-allowed
Loading: 스피너 또는 플레이스홀더
```

### 폼 요소
```
인풋 필드:
  - 높이: 44px
  - 패딩: 12px 16px
  - 경계: 1px 라이트그레이
  - 경계반지름: 8px
  - 포커스: 경계 색상 변경 (클레 그린), 그림자 추가

라벨:
  - 크기: 12px-13px
  - 색상: 다크그레이
  - 마진: 8px (아래)
```

### 애니메이션
```
전환 시간: 200ms-300ms
이징: ease-in-out

효과:
  - 버튼 호버: 배경색 부드럽게 변경
  - 모달 오픈: 페이드인 + 스케일 1.0
  - 페이지 스크롤: 스무스 스크롤
```

---

## 6. 패턴 및 사용 예

### 6.1 상품 섹션 레이아웃
```html
<section class="product-section">
  <h2>섹션 제목</h2>
  <div class="product-grid">
    <div class="product-card">
      <div class="product-image"></div>
      <div class="product-info">
        <h3>상품명</h3>
        <p class="category-badge">카테고리</p>
        <p class="age-info">4~5개월</p>
        <div class="price-info">
          <span class="discount-rate">7%</span>
          <span class="price">19,500원</span>
        </div>
        <button class="heart-button">♡</button>
      </div>
    </div>
  </div>
</section>
```

### 6.2 헤더 네비게이션
```html
<header class="header">
  <a href="/" class="logo">CLE</a>
  <button class="search-btn">검색</button>
  <a href="/cart" class="cart-btn">
    <span class="cart-badge">5</span>
  </a>
</header>

<nav class="tab-navigation">
  <a href="#" class="nav-item active">정기식단</a>
  <a href="#" class="nav-item">클레KIDS</a>
  <a href="#" class="nav-item">퓨레·간식</a>
  <a href="#" class="nav-item">이벤트</a>
  <a href="#" class="nav-item">리뷰</a>
</nav>
```

### 6.3 프로모션 배너
```html
<section class="promotion-banner">
  <div class="banner-content">
    <p class="banner-date">12.01 ~ 12.31</p>
    <h1 class="banner-title">Talk! Talk! REVIEW 한 스푼</h1>
    <p class="banner-description">리뷰단 납기도 짧았고이 쓸 찾...</p>
  </div>
  <img src="banner-image.png" alt="프로모션" class="banner-image">
</section>
```

---

## 7. 반응형 디자인 (Responsive)

### 브레이크포인트
```
Mobile: 360px - 512px (주 타겟)
Tablet: 512px - 1024px
Desktop: 1024px+
```

### 모바일 특화 요소
- 한 줄 2개 상품 표시
- 네비게이션 텝 좌우 스크롤 가능
- 캐러셀 지시자 하단 중앙 배치
- 모달/팝업: 풀 스크린 또는 바텀시트

---

## 8. 접근성 (A11y) 및 성능

### 색상 대비
- 텍스트 vs 배경: WCAG AA 기준 4.5:1 이상
- 버튼: 충분한 터치 타겟 크기 (최소 44px x 44px)

### 시맨틱 HTML
```html
<nav>, <section>, <article>, <button>, <a> 등 올바른 태그 사용
```

### 이미지 최적화
- 포맷: WebP 또는 최적화된 JPG/PNG
- 크기: 150px 정사각형 상품 이미지 기준 25-40KB
- 반응형: srcset 또는 picture 태그 사용

---

## 9. CRO 실험 변수 적용 가이드

### 예상 변수화 포인트
1. **버튼 색상 변경**: 초록 vs 주황색 CTA
2. **가격 표시**: 원가 표시 유무, 할인율 위치
3. **배지 스타일**: 동그란 vs 사각형 태그
4. **이미지 크기**: 상품 카드 이미지 비율 변경
5. **텍스트 길이**: 상품명 글자 수 제한
6. **버튼 위치**: 카드 내 찜 버튼 위치 (좌 vs 우)
7. **간격**: 카드 간 여백 조정
8. **배경색**: 섹션 배경 색상 변경

### 코드 예시 (Variant 구현)
```javascript
// Variant A (Control)
const buttonColor = '#1B8041';
const priceDisplay = 'inline';

// Variant B (Test)
const buttonColor = '#F4A460';
const priceDisplay = 'stacked';
```

---

## 10. 주요 파일 구조 (HTML/CSS 기준)
```
colors.css (색상 변수)
typography.css (폰트, 크기, 두께)
spacing.css (마진, 패딩, 간격)
components.css (버튼, 배지, 카드 등)
layout.css (그리드, 플렉스 레이아웃)
responsive.css (미디어 쿼리)
animations.css (전환, 애니메이션)
```

---

## 참고사항

이 가이드를 바탕으로 AI 코딩 에이전트는 일관성 있는 CRO 실험 variant를 구현할 수 있습니다. 필요시 추가 상세 정보나 특정 컴포넌트의 CSS 스니펫을 요청하세요!
