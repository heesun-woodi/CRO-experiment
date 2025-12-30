# FoodCare-CLE 모바일 상품 상세 페이지 - Frontend 코딩 가이드

## 1. 개발 환경

### 1.1 기술 스택
- **마크업**: HTML5
- **스타일**: CSS3 / Sass/SCSS
- **스크립트**: JavaScript (Vanilla JS 또는 jQuery)
- **템플릿엔진**: 없음 (Mako 또는 유사 서버사이드 템플릿)
- **번들러**: Webpack / Parcel (또는 없음 - 직접 로드)
- **CSS 전처리기**: SCSS (권장)

### 1.2 브라우저 지원
- Chrome/Edge 최신 2버전
- Safari iOS 12+
- Samsung Internet 최신
- 모바일 우선 (Mobile First)

### 1.3 개발 환경 설정
```bash
# 권장 개발 환경
Node.js v16+
npm v8+ 또는 yarn

# 로컬 테스트 서버
python -m http.server 8000
# 또는
npx http-server
```

---

## 2. HTML 구조 및 선택자

### 2.1 주요 HTML 요소 선택자

#### 상단 헤더 영역
```html
<!-- 전체 헤더 -->
<header class="header js__header">
  <!-- 검색 아이콘 -->
  <button class="search js__header-search"></button>

  <!-- 장바구니 아이콘 -->
  <a class="js__header-cart" href="/shop/cart"></a>

  <!-- 뒤로가기 버튼 -->
  <button class="back js__header-back"></button>
</header>

<!-- CSS 선택자 -->
.header                    /* 전체 헤더 */
.js__header               /* JS 훅 (조작 가능) */
.search                   /* 검색 버튼 */
.js__header-search       /* 검색 JS 훅 */
```

#### 제품 정보 섹션
```html
<article class="product-detail">
  <!-- 제품 제목 -->
  <h1 class="product-title">초기1</h1>

  <!-- 연령층 -->
  <p class="product-age">(4~5개월)</p>

  <!-- 제품 이미지 -->
  <img class="product-image" src="image.jpg" alt="상품명">

  <!-- 제품 설명 -->
  <p class="product-description">
    쌀과 곡류 또는 채소 한 가지로 만든 10배죽으로...
  </p>

  <!-- 용량 정보 -->
  <span class="product-volume">(1병: 150g)</span>
</article>

/* CSS 선택자 */
article.product-detail          /* 전체 제품 섹션 */
.product-title                  /* 제목 h1 */
.product-age                    /* 연령층 */
.product-image                  /* 상품 이미지 */
.product-description            /* 설명 텍스트 */
.product-volume                 /* 용량 정보 */
```

#### 탭 메뉴
```html
<nav class="tab-menu js__tab-menu">
  <button class="tab-item active js__tab" data-tab="info">
    정기식단 정보
  </button>
  <button class="tab-item js__tab" data-tab="reviews">
    정기식단 후기
    <span class="review-count">653</span>
  </button>
</nav>

/* CSS 선택자 */
.tab-menu                  /* 탭 메뉴 전체 */
.js__tab-menu             /* JS 훅 */
.tab-item                 /* 탭 아이템 */
.tab-item.active          /* 활성 탭 */
.js__tab                  /* JS 훅 */
.review-count             /* 리뷰 카운트 */
```

#### 배송 정보 (Step 1)
```html
<section class="shipping-section js__shipping-section">
  <h2 class="section-title">Step1. 배송정보</h2>

  <!-- 배송방식 선택 -->
  <div class="shipping-methods">
    <label class="shipping-option">
      <input type="radio" name="shipping" value="cle" checked>
      <span class="option-label">클레배송</span>
    </label>

    <label class="shipping-option">
      <input type="radio" name="shipping" value="normal">
      <span class="option-label">일반배송</span>
    </label>
  </div>
</section>

/* CSS 선택자 */
.shipping-section              /* 전체 배송 섹션 */
.js__shipping-section         /* JS 훅 */
.shipping-methods             /* 배송방식 컨테이너 */
.shipping-option              /* 라디오 옵션 아이템 */
input[name="shipping"]        /* 배송방식 라디오 */
.option-label                 /* 옵션 레이블 */
```

#### 주문 정보 (Step 2)
```html
<section class="order-section js__order-section">
  <h2 class="section-title">Step2. 주문정보</h2>

  <!-- 식단 시작일 선택 -->
  <div class="form-group">
    <label class="form-label">식단 시작일</label>
    <select class="form-select js__start-date" name="startDate">
      <option value="2026-01-02">2026.01.02 (금)</option>
      <option value="2026-01-03">2026.01.03 (토)</option>
    </select>
  </div>

  <!-- 주문 세트 수량 -->
  <div class="quantity-group">
    <label class="quantity-option">
      <input type="radio" name="quantity" value="14" checked>
      <span class="quantity-label">14세트 (2주)</span>
      <span class="quantity-price">64,400원</span>
    </label>
  </div>
</section>

/* CSS 선택자 */
.order-section                 /* 전체 주문 섹션 */
.form-group                   /* 폼 그룹 */
.form-label                   /* 폼 라벨 */
.form-select                  /* 셀렉트 박스 */
.js__start-date              /* JS 훅 - 시작일 */
.quantity-group              /* 수량 그룹 */
.quantity-option             /* 수량 옵션 */
input[name="quantity"]       /* 수량 라디오 */
.quantity-price              /* 가격 표시 */
```

#### 리뷰 섹션
```html
<section class="reviews-section js__reviews-section">
  <h2 class="section-title">정기식단 후기</h2>

  <!-- 리뷰 아이템 -->
  <div class="review-item">
    <div class="review-header">
      <span class="reviewer-name">jof***</span>
      <span class="review-date">2025.12.29</span>
      <span class="review-rating">5.0</span>
    </div>

    <p class="review-text">클레 초기 이유식은...</p>
  </div>
</section>

/* CSS 선택자 */
.reviews-section               /* 리뷰 섹션 전체 */
.review-item                  /* 개별 리뷰 */
.review-header               /* 리뷰 헤더 */
.reviewer-name               /* 리뷰어 이름 */
.review-date                 /* 리뷰 날짜 */
.review-rating               /* 별점 */
.review-text                 /* 리뷰 내용 */
```

#### 가격 & CTA 버튼
```html
<footer class="order-footer js__order-footer">
  <!-- 가격 -->
  <div class="price-summary">
    <span class="price-label">주문금액</span>
    <span class="price-value js__total-price">64,400</span>
    <span class="price-unit">원</span>
  </div>

  <!-- 버튼 그룹 -->
  <div class="button-group">
    <button class="btn btn-next js__btn-next">
      다음단계
      <span class="btn-subtitle">(캘린더/메뉴 확인)</span>
    </button>

    <button class="btn btn-cart js__btn-cart">장바구니</button>

    <button class="btn btn-buy js__btn-buy">바로구매</button>
  </div>
</footer>

/* CSS 선택자 */
.order-footer                 /* 푸터 영역 */
.price-summary               /* 가격 요약 */
.price-value                 /* 가격 값 */
.js__total-price            /* JS 훅 - 가격 업데이트 */
.button-group               /* 버튼 그룹 */
.btn                        /* 기본 버튼 */
.btn-next                   /* 다음 단계 버튼 */
.js__btn-next              /* JS 훅 */
.btn-cart                   /* 장바구니 버튼 */
.js__btn-cart              /* JS 훅 */
.btn-buy                    /* 바로구매 버튼 */
.js__btn-buy               /* JS 훅 */
```

---

### 2.2 주요 CSS 클래스 패턴

#### 상태 클래스
```css
/* 활성화 상태 */
.is-active
.is-selected
.is-checked

/* 비활성화 상태 */
.is-disabled
.is-inactive

/* 로딩 상태 */
.is-loading
.is-fetching

/* 오류 상태 */
.is-error
.has-error

/* 성공 상태 */
.is-success
.is-completed

/* 숨김 상태 */
.is-hidden
.is-collapsed
.is-hidden-mobile

/* 표시 상태 */
.is-visible
.is-expanded
.is-shown
```

#### BEM (Block Element Modifier) 패턴
```css
/* Block (주요 컴포넌트) */
.product-card

/* Element (컴포넌트의 부분) */
.product-card__header
.product-card__image
.product-card__title
.product-card__price

/* Modifier (상태/변형) */
.product-card--featured
.product-card--disabled
.product-card--compact
```

---

## 3. CSS 작성 가이드

### 3.1 기본 스타일 구조
```scss
// 1. Reset/Normalize
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

// 2. 변수 정의
$color-primary: #2ED573;
$color-text: #111111;
$color-border: #EEEEEE;
$spacing-unit: 4px;

// 3. Utility Classes (자주 사용)
.mt-4  { margin-top: 4px; }
.mt-8  { margin-top: 8px; }
.mt-16 { margin-top: 16px; }

// 4. 컴포넌트 스타일
.btn { /* 버튼 스타일 */ }
.card { /* 카드 스타일 */ }

// 5. 페이지/레이아웃 스타일
.header { /* 헤더 스타일 */ }
.main { /* 메인 콘텐츠 */ }
.footer { /* 푸터 스타일 */ }
```

### 3.2 Flexbox 레이아웃
```css
/* 중앙 정렬 (많이 사용) */
.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 세로 나열 */
.flex-column {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* 가로 나열 */
.flex-row {
  display: flex;
  flex-direction: row;
  gap: 12px;
}

/* 사이에 공간 */
.flex-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
```

### 3.3 Grid 레이아웃
```css
/* 2열 그리드 */
.grid-2 {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

/* 반응형 그리드 */
.grid-auto {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 12px;
}
```

### 3.4 자주 사용하는 패턴
```css
/* 텍스트 자르기 (1줄) */
.truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 텍스트 자르기 (여러 줄) */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* 절대 위치 중앙 정렬 */
.absolute-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

/* 가로 스크롤 가능 */
.overflow-x {
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
}

/* 아이콘 크기 */
.icon-16 { width: 16px; height: 16px; }
.icon-24 { width: 24px; height: 24px; }
.icon-32 { width: 32px; height: 32px; }
```

---

## 4. JavaScript 작성 가이드

### 4.1 모듈 구조
```javascript
// 1. 즉시 실행 함수 패턴 (IIFE)
(function() {
  'use strict';

  // 변수
  const selectors = {
    productTitle: '.product-title',
    tabMenu: '.js__tab-menu',
    orderSection: '.js__order-section',
    totalPrice: '.js__total-price',
  };

  // 초기화
  function init() {
    bindEvents();
    updateUI();
  }

  // 이벤트 바인딩
  function bindEvents() {
    document.querySelectorAll('.js__tab').forEach(tab => {
      tab.addEventListener('click', handleTabClick);
    });
  }

  // 이벤트 핸들러
  function handleTabClick(event) {
    const tabName = event.target.dataset.tab;
    switchTab(tabName);
  }

  // 유틸리티 함수
  function switchTab(tabName) {
    // 탭 전환 로직
  }

  function updateUI() {
    // UI 업데이트 로직
  }

  // 페이지 로드 시 초기화
