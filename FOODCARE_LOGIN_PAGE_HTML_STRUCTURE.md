# 푸드케어 클레 - 로그인 페이지 HTML 구조 분석 문서

## 📋 목차
1. [전체 페이지 구조](#전체-페이지-구조)
2. [섹션별 상세 구조](#섹션별-상세-구조)
3. [로그인 폼 상세](#로그인-폼-상세)
4. [컴포넌트 마크업 패턴](#컴포넌트-마크업-패턴)
5. [클래싱 규칙](#클래싱-규칙)
6. [추천 마크업 개선 방안](#추천-마크업-개선-방안)
7. [HTML 구조 체크리스트](#html-구조-체크리스트)

---

## 전체 페이지 구조
```
<html>
├── <head>
│   ├── 메타 태그
│   ├── 스타일시트
│   └── 기타 리소스
│
└── <body>
    ├── <nav> - 상단 헤더 네비게이션
    ├── <article> - 메인 로그인 영역
    │   └── <form> - 로그인 폼
    ├── <nav> - 하단 바텀 네비게이션
    ├── <footer> - 푸터 (레이어 팝업 포함)
    ├── 소셜 미디어 링크들
    └── 채팅 위젯, reCAPTCHA 등
```

---

## 섹션별 상세 구조

### 1️⃣ 상단 헤더 (Header Banner)
```html
<banner>
  <!-- 뒤로가기 버튼 -->
  <button type="button">
    <generic>뒤로가기</generic>
  </button>

  <!-- 페이지 제목 -->
  <generic>로그인</generic>

  <!-- 검색 아이콘 버튼 -->
  <button type="button">
    <generic>search</generic>
  </button>

  <!-- 장바구니 링크 -->
  <link href="/shop/cart">
    <generic>cart</generic>
  </link>

  <!-- 메뉴 토글 버튼 -->
  <button type="button">
    <!-- 메뉴 토글 아이콘 -->
  </button>

  <!-- 검색창 (숨김/표시 가능) -->
  <textbox type="search" placeholder="">
  <button type="button">
    <generic>search</generic>
  </button>

  <!-- 최근 검색어 섹션 -->
  <generic>최근 검색어</generic>
  <generic>최근 검색어가 없습니다.</generic>

  <!-- 추천 검색어 -->
  <generic>추천 검색어</generic>
  <list>
    <listitem>
      <link href="/shop/search/?searchText=한우솥밥">
        한우솥밥
      </link>
    </listitem>
    <listitem>
      <link href="/shop/search/?searchText=오메가3">
        오메가3
      </link>
    </listitem>
    <!-- ... 더 많은 추천 검색어 ... -->
  </list>
</banner>
```

**역할:**
- 로그인 페이지 제목 표시
- 뒤로가기 네비게이션
- 검색 기능 제공
- 장바구니 접근

---

### 2️⃣ 메인 로그인 영역 (Main Article)
```html
<article>
  <region>
    <!-- 페이지 제목 -->
    <heading>로그인 페이지</heading>

    <!-- 로그인 폼 -->
    <form>
      <!-- 폼 내용 (다음 섹션에서 상세) -->
    </form>

    <!-- 회원가입 링크 -->
    <link href="/member/joinMain">회원가입</link>

    <!-- 아이디/비밀번호 찾기 -->
    <link href="/member/searchId">아이디/비밀번호 찾기</link>

    <!-- 간편 로그인 섹션 -->
    <generic>간편 로그인하기</generic>

    <!-- 카카오 로그인 -->
    <link href="https://kauth.kakao.com/oauth/authorize?...">
      카카오 로그인
    </link>

    <!-- 네이버 로그인 -->
    <link href="https://nid.naver.com/oauth2.0/authorize?...">
      네이버 로그인
    </link>

    <!-- 비회원 주문조회 -->
    <link href="/member/login/nonmember">
      비회원 주문조회
    </link>
  </region>
</article>
```

**주요 특징:**
- `<article>` + `<region>` 조합으로 의미론적 구조 제공
- 로그인, 간편 로그인, 회원가입 등 관련 링크 그룹화

---

### 3️⃣ 로그인 폼 (Form)
```html
<form>
  <!-- 히든 필드들 -->
  <textbox type="hidden" value="0">
  <textbox type="hidden" value="/">

  <!-- 아이디 입력 -->
  <textbox
    type="text"
    placeholder="아이디"
  >

  <!-- 비밀번호 입력 -->
  <textbox
    type="password"
    placeholder="비밀번호"
  >

  <!-- reCAPTCHA 위젯 -->
  <presentation>reCAPTCHA</presentation>
  <textbox>

  <!-- 휴대폰 인증 섹션 -->
  <combobox>
    <!-- 통신사 선택: 010, 011, 016, 017, 018, 019 -->
    <generic>010</generic>
    <generic>011</generic>
    <!-- ... -->
  </combobox>

  <!-- 휴대폰 번호 입력 -->
  <textbox type="number" placeholder="휴대폰번호">
  <textbox type="number" placeholder="휴대폰번호">

  <!-- 인증번호 발송 버튼 -->
  <button type="button">인증번호 발송</button>

  <!-- 인증번호 입력 및 인증 -->
  <label>
    <textbox
      type="text"
      placeholder="인증번호"
    >
  </label>
  <button type="button">인증</button>

  <!-- 아이디 저장 체크박스 -->
  <label>
    <checkbox type="checkbox">
    <generic>아이디 저장</generic>
  </label>

  <!-- 로그인 버튼 -->
  <button type="submit">로그인</button>

  <!-- 히든 필드 -->
  <textbox type="hidden">
</form>
```

**폼 필드 상세:**

| 필드명 | 타입 | 플레이스홀더 | 필수 | 설명 |
|--------|------|------------|------|------|
| - | hidden | "0" | - | 초기값 |
| - | hidden | "/" | - | 페이지 경로 |
| 아이디 | text | "아이디" | ✅ | 사용자 아이디 |
| 비밀번호 | password | "비밀번호" | ✅ | 사용자 비밀번호 |
| - | presentation | - | - | reCAPTCHA 검증 |
| 통신사 | combobox | "010" | - | 휴대폰 통신사 선택 |
| 휴대폰번호 | number | "휴대폰번호" | - | 휴대폰 번호 (앞자리) |
| 휴대폰번호 | number | "휴대폰번호" | - | 휴대폰 번호 (뒷자리) |
| 인증번호 | text | "인증번호" | - | SMS 인증 번호 |
| 아이디 저장 | checkbox | - | - | 아이디 저장 옵션 |

---

## 로그인 폼 상세

### 폼 레이아웃 플로우
```
┌─────────────────────────────────────┐
│         로그인 페이지                │
├─────────────────────────────────────┤
│                                     │
│  [아이디 입력란]                    │
│  [비밀번호 입력란]                  │
│                                     │
│  [reCAPTCHA]                        │
│                                     │
│  [통신사 선택▼] [휴대폰번호입력]    │
│  [인증번호 발송 버튼]               │
│                                     │
│  [인증번호 입력] [인증 버튼]        │
│                                     │
│  ☐ 아이디 저장                      │
│                                     │
│  [로그인 버튼 (초록색)]             │
│                                     │
├─────────────────────────────────────┤
│  [회원가입]  [아이디/비밀번호 찾기] │
├─────────────────────────────────────┤
│     간편 로그인하기                  │
│                                     │
│  [카카오 로그인]  [네이버 로그인]   │
│                                     │
│  [비회원 주문조회]                  │
│                                     │
└─────────────────────────────────────┘
```

### 버튼 구성

**폼 내부 버튼:**

| 버튼 | 타입 | 클래스 | 역할 |
|------|------|--------|------|
| 인증번호 발송 | button | - | SMS 인증번호 발송 |
| 인증 | button | - | 인증번호 검증 |
| 로그인 | **submit** | - | 폼 제출 |

**외부 링크 버튼:**

| 링크 | href | 역할 |
|------|------|------|
| 회원가입 | `/member/joinMain` | 회원가입 페이지 이동 |
| 아이디/비밀번호 찾기 | `/member/searchId` | 아이디/비밀번호 찾기 페이지 |
| 카카오 로그인 | `https://kauth.kakao.com/...` | OAuth 카카오 로그인 |
| 네이버 로그인 | `https://nid.naver.com/...` | OAuth 네이버 로그인 |
| 비회원 주문조회 | `/member/login/nonmember` | 비회원 주문 조회 |

---

## 컴포넌트 마크업 패턴

### 1. 입력 필드 패턴
```html
<!-- 기본 텍스트 입력 -->
<textbox
  type="text"
  placeholder="아이디"
>

<!-- 비밀번호 입력 -->
<textbox
  type="password"
  placeholder="비밀번호"
>

<!-- 숫자 입력 -->
<textbox
  type="number"
  placeholder="휴대폰번호"
>

<!-- 검색 입력 -->
<textbox
  type="search"
  placeholder=""
>
```

### 2. 라벨-입력 조합
```html
<!-- 라벨과 함께 -->
<label>
  <textbox
    type="text"
    placeholder="인증번호"
  >
</label>

<!-- 체크박스와 함께 -->
<label>
  <checkbox type="checkbox">
  <generic>아이디 저장</generic>
</label>
```

### 3. 콤보박스 (선택 드롭다운)
```html
<combobox>
  <generic>010</generic>
  <generic>011</generic>
  <generic>016</generic>
  <generic>017</generic>
  <generic>018</generic>
  <generic>019</generic>
</combobox>
```

### 4. 버튼 패턴
```html
<!-- 일반 버튼 -->
<button type="button">
  버튼 텍스트
</button>

<!-- 제출 버튼 -->
<button type="submit">
  로그인
</button>

<!-- 아이콘 버튼 -->
<button type="button">
  <generic>search</generic>
</button>
```

### 5. 링크 패턴
```html
<!-- 기본 링크 -->
<link href="/member/joinMain">
  회원가입
</link>

<!-- OAuth 링크 (외부) -->
<link href="https://kauth.kakao.com/oauth/authorize?...">
  카카오 로그인
</link>

<!-- 전화번호 링크 -->
<link href="tel:1577-7003">
  1577-7003
</link>
```

---

## 하단 네비게이션 (Bottom Navigation)
```html
<navigation>
  <!-- 전체메뉴 링크 -->
  <link href="#navigation">전체메뉴</link>

  <!-- 홈 링크 -->
  <link href="/">홈</link>

  <!-- 식단주문 버튼 -->
  <button type="button">식단주문</button>

  <!-- 스케줄관리 링크 -->
  <link href="/mypage/manageSchedule">스케줄관리</link>

  <!-- 마이페이지 링크 -->
  <link href="/mypage/">마이페이지</link>
</navigation>
```

**특징:**
- 모바일 환경에서 고정 위치 바텀 네비게이션
- 5개 주요 메뉴 포함
- 현재 페이지는 "식단주문" 또는 다른 메뉴로 표시 가능

---

## 푸터 (Footer)
```html
<footer>
  <!-- 식단주문 레이어 팝업 -->
  <region>
    <textbox type="hidden" value="1">
    <heading>정기식단 주문 layer</heading>
    <button type="button">레이어 닫기버튼</button>

    <!-- 식단 유형 탭 -->
    <banner>
      <generic>식단주문</generic>
    </banner>

    <!-- 식단 유형 리스트 -->
    <list>
      <listitem>이유식</listitem>
      <listitem>영양식</listitem>
      <listitem>키즈식</listitem>
    </list>

    <!-- 이유식 상품 목록 -->
    <list>
      <listitem>
        <link href="/shop/mealPlan/E/101">
          <image alt="준비기">
          <generic>준비기</generic>
          <generic>4개월</generic>
        </link>
      </listitem>
      <!-- ... 더 많은 상품 ... -->
    </list>

    <!-- 영양식 상품 목록 -->
    <list>
      <listitem>
        <link href="/shop/mealPlan/U/201">
          <image alt="영양밥">
          <generic>영양밥</generic>
          <generic>15개월~</generic>
        </link>
      </listitem>
      <!-- ... 더 많은 상품 ... -->
    </list>

    <!-- BEST 상품 배지 -->
    <image alt="best">
    <image alt="best">
    <image alt="best">

    <!-- BEST 상품 리스트 -->
    <list>
      <listitem>
        <link href="/shop/goodsView/0000011204">
          <image alt="한우솥밥 3종">
          <generic>한우솥밥 3종</generic>
        </link>
      </listitem>
      <!-- ... 더 많은 BEST 상품 ... -->
    </list>

    <!-- BEST 섹션의 별도 링크들 -->
    <link href="https://www.foodcare-cle.com/shop/goodsView/0000010945">
      <generic>BEST 힘쑥세트</generic>
      <image alt="BEST 힘쑥세트">
    </link>
    <!-- ... 더 많은 링크 ... -->
  </region>

  <!-- 회사 정보 섹션 -->
  <generic>
    <generic>
      <generic>클레 FOODCARE</generic>
    </generic>
    <generic>(주)푸드케어</generic>
    <generic>대표자 : 송주영</generic>
    <generic>사업장소재지</generic>
    <generic>F1. 경기도 부천시 오정구 석천로453번길 92-18 로에스푸드밸리</generic>
    <generic>F2. 경기도 부천시 오정구 석천로398번길 4 로에스푸드밸리</generic>
    <generic>사업자등록번호 : 130-86-48124</generic>
    <link href="//www.ftc.go.kr/bizCommPop.do?wrkr_no=130-86-48124">
      사업자 정보확인
    </link>
    <generic>통신판매업신고 : 제2010-경기부천-379호</generic>
    <generic>개인정보관리책임 : 하성미</generic>
    <generic>이메일 : foodcare@foodcare-cle.com</generic>
  </generic>

  <!-- 약관 및 정책 링크 -->
  <list>
    <listitem>
      <link href="#">이용약관</link>
    </listitem>
    <listitem>
      <link href="#">개인정보처리방침</link>
    </listitem>
    <listitem>
      <link href="#">제휴문의</link>
    </listitem>
    <listitem>
      <link href="/contents/introduceCle">회사소개</link>
    </listitem>
  </list>

  <!-- 고객 정보 -->
  <generic>
    대표번호
    <link href="tel:1577-7003">1577-7003</link>
  </generic>
  <generic>평일 09:00 ~ 17:00 (점심 13:00~14:00) 공휴일, 일요일 휴무</generic>

  <!-- 고객 서비스 링크 -->
  <link href="/customer">고객센터</link>
  <link href="/customer/faq">자주 묻는 질문</link>
  <link href="/customer/qna">1:1 문의</link>

  <!-- SNS 링크 -->
  <list>
    <listitem>
      <link href="http://blog.naver.com/nature_food">
        <image alt="naver_blog">
      </link>
    </listitem>
    <listitem>
      <link href="https://www.instagram.com/foodcare_cle/">
        <image alt="instagram">
      </link>
    </listitem>
    <listitem>
      <button type="button">카카오톡 채널추가</button>
    </listitem>
    <listitem>
      <link href="#">
        <image alt="escrow">
      </link>
    </listitem>
  </list>

  <!-- 저작권 -->
  <generic>Copyright 2022 CLE FOODCARE. All Rights Reserved.</generic>
</footer>
```

---

## 클래싱 규칙

### 현재 사이트의 클래싱 규칙 분석

사이트에서는 **BEM 방식과 유사한 패턴**을 사용하고 있습니다:

#### 1. 네비게이션 클래싱
```css
/* 네비게이션 요소 */
.navi                      /* 네비게이션 블록 */
.navi__btn                 /* 네비게이션 버튼 (엘리먼트) */
.navi__btn--close          /* 닫기 버튼 수정자 */
.navi__option              /* 네비게이션 옵션 리스트 */
```

#### 2. 헤더 관련 클래싱
```css
.header-input-search       /* 헤더 검색 입력 */
.devAutoComplete           /* 자동 완성 (dev 관련) */
.js__headerSearch__input   /* JavaScript 훅 (js__ 접두사) */
.ui-autocomplete-input     /* UI 자동 완성 */
```

#### 3. 유틸리티 클래싱
```css
.blind                     /* 스크린 리더 전용 텍스트 숨김 */
.menu-close                /* 메뉴 닫기 상태 */
```

---

## 추천 마크업 개선 방안

### 현재 구조 분석

✅ **좋은 점:**
- 의미론적 요소 사용 (`<article>`, `<footer>`, `<nav>`)
- 폼 요소 구조화
- 라벨-입력 조합

⚠️ **개선 가능 점:**
```html
<!-- ❌ 현재: 라벨 없이 placeholder만 사용 -->
<textbox type="text" placeholder="아이디">

<!-- ✅ 권장: 라벨과 함께 사용 -->
<label for="id-input">아이디</label>
<textbox id="id-input" type="text" placeholder="아이디">

<!-- ❌ 현재: 일반 div 또는 generic로 제목 표시 -->
<generic>로그인 페이지</generic>

<!-- ✅ 권장: 적절한 heading 태그 사용 -->
<h1>로그인</h1>
<h2>아이디 저장</h2>
```

---

## HTML 구조 체크리스트

로그인 페이지 구현 시 확인 사항:

- [x] `<article>` + `<region>` 로 메인 콘텐츠 감싸기
- [x] `<form>` 요소로 로그인 폼 구성
- [x] `<label>` 요소로 입력 필드 라벨링
- [x] `type="submit"` 버튼으로 폼 제출
- [x] 콤보박스(select)는 `<combobox>` 사용
- [x] 링크는 `<link>` (또는 `<a>`) 태그로
- [x] 네비게이션은 `<nav>` 태그로
- [x] 푸터는 `<footer>` 태그로
- [x] 헤더는 `<banner>` 태그로
- [x] SNS 링크 포함
- [x] OAuth (카카오, 네이버) 링크 포함
- [x] 고객 서비스 정보 포함

---

## 참고

**페이지 URL:** `https://www.foodcare-cle.com/member/login`
**뷰포트:** 375px (모바일)
**접근성:** 기본 구조 제공, 추가 ARIA 라벨 권장

---

## 추가 자료

### 주요 URL 모음

| 항목 | URL |
|------|-----|
| 회원가입 | `/member/joinMain` |
| 아이디/비밀번호 찾기 | `/member/searchId` |
| 비회원 주문조회 | `/member/login/nonmember` |
| 장바구니 | `/shop/cart` |
| 마이페이지 | `/mypage/` |
| 스케줄관리 | `/mypage/manageSchedule` |
| 고객센터 | `/customer` |
| 자주 묻는 질문 | `/customer/faq` |
| 1:1 문의 | `/customer/qna` |
| 회사소개 | `/contents/introduceCle` |

### 소셜 미디어 링크

| SNS | URL |
|-----|-----|
| 블로그 | `http://blog.naver.com/nature_food` |
| 인스타그램 | `https://www.instagram.com/foodcare_cle/` |
| 카카오톡 채널 | 채널추가 버튼 |
| 에스크로 | # |
| 유튜브 | `https://youtube.com/@user-my8eg1cw4n` |
| 스마트스토어 | `https://smartstore.naver.com/eusik` |

### 연락처 정보

- **대표번호:** 1577-7003
- **영업시간:** 평일 09:00 ~ 17:00 (점심 13:00~14:00)
- **휴무:** 공휴일, 일요일
- **이메일:** foodcare@foodcare-cle.com
- **사업자번호:** 130-86-48124

---

**문서 생성일:** 2025년 1월
**사이트:** https://www.foodcare-cle.com/member/login
**담당자:** CRO 실험 팀
