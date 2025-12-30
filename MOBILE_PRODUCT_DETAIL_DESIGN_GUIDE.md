# FoodCare-CLE 모바일 상품 상세 페이지 - 디자인 시스템 가이드

## 1. 페이지 개요
- **페이지명**: 초기1 (4~5개월) 이유식 상세 주문 페이지
- **타입**: 모바일 커머스 (MO 웹)
- **주요 기능**: 정기식단 상품 조회 및 주문
- **뷰포트**: 375px (모바일 기준)

---

## 2. 레이아웃 구조

### 2.1 전체 페이지 구성 (Top to Bottom)
```
┌─────────────────────────────────┐
│ 상단 헤더 (Header)               │  High: 56px
├─────────────────────────────────┤
│ 네비게이션 (카테고리)            │  High: 70px
├─────────────────────────────────┤
│ 상품 이미지 & 기본정보           │  High: 300px
├─────────────────────────────────┤
│ 상품 상세정보 섹션              │  High: Auto
│ - 상품 설명                      │
│ - 식단표 / POINT / 먹이는 법     │
├─────────────────────────────────┤
│ 탭 메뉴                         │  High: 50px
│ (정기식단 정보 / 후기)          │
├─────────────────────────────────┤
│ 배송정보 (Step 1)               │  High: Auto
├─────────────────────────────────┤
│ 주문정보 (Step 2)               │  High: Auto
├─────────────────────────────────┤
│ 후기 리스트                     │  High: Auto
├─────────────────────────────────┤
│ 하단 주문 버튼                  │  High: 100px
└─────────────────────────────────┘
```

### 2.2 주요 섹션별 높이
| 섹션 | 높이 | 설명 |
|------|------|------|
| Header | 56px | 제목, 검색, 장바구니 아이콘 |
| Product Image | 150px | 상품 이미지 영역 |
| Product Info | 180px | 상품명, 용량, 가격 |
| Tab Menu | 50px | 정기식단 정보 / 후기 탭 |
| Shipping Info | 250px | Step1 배송방식 선택 |
| Order Info | 400px | Step2 주문정보 입력 |
| Reviews | 500px+ | 리뷰 목록 (스크롤 가능) |
| CTA Button | 80px | 다음단계 / 장바구니 / 바로구매 |

---

## 3. 색상 팔레트 (Color Palette)

### 3.1 Primary Colors
| 색상명 | HEX | RGB | 용도 |
|--------|-----|-----|------|
| Primary Green | `#2ED573` | rgb(46, 213, 115) | CTA 버튼, 강조 요소 |
| Dark Gray | `#111111` | rgb(17, 17, 17) | 기본 텍스트 |
| Light Gray | `#F5F5F5` | rgb(245, 245, 245) | 배경, 분리선 |
| White | `#FFFFFF` | rgb(255, 255, 255) | 기본 배경 |

### 3.2 Semantic Colors
| 색상명 | HEX | 용도 |
|--------|-----|------|
| Success | `#2ED573` | 확인, 주문 완료 |
| Info | `#4A90E2` | 정보, 힌트 |
| Warning | `#F5A623` | 주의, 알림 |
| Error | `#D32F2F` | 오류, 불가 상태 |

### 3.3 Neutral Colors
| 색상명 | HEX | 용도 |
|--------|-----|------|
| Text Primary | `#111111` | 본문, 제목 |
| Text Secondary | `#666666` | 부제목, 설명 |
| Text Tertiary | `#999999` | 힌트, 보조 텍스트 |
| Border | `#EEEEEE` | 구분선 |
| Background | `#F9F9F9` | 섹션 배경 |

---

## 4. 타이포그래피 (Typography)

### 4.1 주요 텍스트 스타일
```css
/* 페이지 제목 */
.product-title {
  font-size: 28px;
  font-weight: 700;
  line-height: 1.4;
  color: #111111;
  letter-spacing: -0.5px;
}

/* 섹션 제목 */
.section-title {
  font-size: 18px;
  font-weight: 600;
  line-height: 1.4;
  color: #111111;
  margin-bottom: 12px;
}

/* 본문 */
.body-text {
  font-size: 14px;
  font-weight: 400;
  line-height: 1.6;
  color: #333333;
}

/* 강조 텍스트 */
.highlight-text {
  font-size: 14px;
  font-weight: 600;
  color: #2ED573;
}

/* 캡션 */
.caption-text {
  font-size: 12px;
  font-weight: 400;
  line-height: 1.5;
  color: #666666;
}
```

### 4.2 글꼴 스택
```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', sans-serif;
```

### 4.3 텍스트 크기 스케일
| 사용처 | 크기 | 무게 | 행높이 |
|--------|------|------|--------|
| H1 (페이지 제목) | 28px | 700 | 1.4 |
| H2 (섹션 제목) | 18px | 600 | 1.4 |
| H3 (서브 제목) | 16px | 600 | 1.4 |
| Body | 14px | 400 | 1.6 |
| Small | 12px | 400 | 1.5 |
| Tiny | 11px | 400 | 1.4 |

---

## 5. 컴포넌트 가이드

### 5.1 버튼 (Button)
```css
/* Primary Button (CTA) */
.btn-primary {
  background-color: #2ED573;
  color: #FFFFFF;
  font-size: 16px;
  font-weight: 600;
  padding: 14px 16px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.btn-primary:hover {
  background-color: #25B35E;
}

.btn-primary:active {
  background-color: #1E8A4A;
}

/* Secondary Button */
.btn-secondary {
  background-color: #F5F5F5;
  color: #111111;
  font-size: 14px;
  font-weight: 500;
  padding: 12px 14px;
  border-radius: 6px;
  border: 1px solid #EEEEEE;
  cursor: pointer;
}

/* Small Button */
.btn-small {
  font-size: 13px;
  padding: 8px 12px;
  border-radius: 4px;
}
```

### 5.2 입력 필드 (Input)
```css
.input-field {
  width: 100%;
  padding: 12px 14px;
  font-size: 14px;
  border: 1px solid #EEEEEE;
  border-radius: 6px;
  background-color: #FFFFFF;
  color: #111111;
  transition: border-color 0.2s ease;
}

.input-field:focus {
  outline: none;
  border-color: #2ED573;
  box-shadow: 0 0 0 3px rgba(46, 213, 115, 0.1);
}

.input-field:disabled {
  background-color: #F5F5F5;
  color: #999999;
  cursor: not-allowed;
}
```

### 5.3 라디오 버튼 / 체크박스
```css
.radio-group,
.checkbox-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.radio-item,
.checkbox-item {
  display: flex;
  align-items: center;
  padding: 12px;
  border: 1px solid #EEEEEE;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.radio-item:hover,
.checkbox-item:hover {
  background-color: #F9F9F9;
}

.radio-item.active,
.checkbox-item.active {
  background-color: #F0F9F3;
  border-color: #2ED573;
}

.radio-item input,
.checkbox-item input {
  margin-right: 10px;
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: #2ED573;
}
```

### 5.4 탭 메뉴
```css
.tab-menu {
  display: flex;
  border-bottom: 2px solid #EEEEEE;
  gap: 0;
}

.tab-item {
  flex: 1;
  padding: 14px 0;
  text-align: center;
  font-size: 14px;
  font-weight: 500;
  color: #666666;
  border-bottom: 3px solid transparent;
  cursor: pointer;
  transition: all 0.2s ease;
}

.tab-item.active {
  color: #111111;
  border-bottom-color: #2ED573;
  font-weight: 600;
}
```

### 5.5 카드 (Card)
```css
.card {
  background-color: #FFFFFF;
  border: 1px solid #EEEEEE;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.card.highlighted {
  background-color: #F0F9F3;
  border-color: #2ED573;
}
```

---

## 6. 간격 시스템 (Spacing Scale)
```css
/* Spacing Scale */
4px    - xs (미세한 간격)
8px    - sm (작은 간격)
12px   - md (기본 간격)
16px   - lg (큰 간격)
20px   - xl (더 큰 간격)
24px   - 2xl (매우 큰 간격)
32px   - 3xl (극대 간격)
```

### 6.1 마진/패딩 기준
| 요소 | 마진/패딩 |
|------|-----------|
| 섹션 간 거리 | 20-24px |
| 카드 내부 패딩 | 16px |
| 버튼 내부 패딩 | 12-14px |
| 리스트 아이템 간격 | 8-12px |
| 텍스트 간격 | 4-8px |

---

## 7. 이미지 가이드

### 7.1 상품 이미지
- **크기**: 375px × 300px (정사각형 또는 직사각형)
- **포맷**: WebP, JPG
- **용량**: 100KB 이하 (모바일 최적화)
- **알트 텍스트**: 상품명 명시

### 7.2 아이콘
- **크기**: 24px × 24px (기본), 16px × 16px (작은)
- **스타일**: 선형 또는 채운 형태
- **색상**: 상황에 따라 다름 (#111111, #2ED573, #999999)

### 7.3 이미지 최적화
```css
img {
  max-width: 100%;
  height: auto;
  object-fit: cover;
}
```

---

## 8. 상호작용 가이드

### 8.1 호버 상태
```css
/* 버튼 호버 */
button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
}

/* 카드 호버 */
.card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}
```

### 8.2 활성화 상태
```css
/* 버튼 활성화 */
button:active {
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
}

/* 폼 입력 활성화 */
input:focus {
  border-color: #2ED573;
  box-shadow: 0 0 0 3px rgba(46, 213, 115, 0.1);
}
```

### 8.3 비활성화 상태
```css
button:disabled {
  background-color: #F0F0F0;
  color: #CCCCCC;
  cursor: not-allowed;
}

input:disabled {
  background-color: #F5F5F5;
  color: #AAAAAA;
  cursor: not-allowed;
}
```

---

## 9. 반응형 디자인 (Responsive)

### 9.1 뷰포트 기준점
```css
/* Mobile (기본) */
@media (max-width: 480px) {
  /* 375px 기준 */
}

/* Tablet */
@media (min-width: 768px) {
  /* 768px 이상 */
}

/* Desktop */
@media (min-width: 1024px) {
  /* 1024px 이상 */
}
```

### 9.2 모바일 최적화
- **최소 터치 크기**: 44px × 44px
- **최소 간격**: 8px 이상
- **최대 줄길이**: 375px 이하
- **스크롤 방향**: 주로 수직 (vertical)

---

## 10. 다크 모드 (Optional)
```css
/* 다크 모드 색상 */
@media (prefers-color-scheme: dark) {
  :root {
    --text-primary: #E0E0E0;
    --text-secondary: #B0B0B0;
    --background: #1A1A1A;
    --surface: #2D2D2D;
  }
}
```

---

## 11. 접근성 가이드 (A11y)

### 11.1 색상 대비
- 텍스트 vs 배경: 최소 4.5:1 비율
- UI 컴포넌트: 최소 3:1 비율

### 11.2 포커스 상태
```css
button:focus {
  outline: 2px solid #2ED573;
  outline-offset: 2px;
}
```

### 11.3 텍스트 대체 (Alt Text)
```html
<!-- 이미지 -->
<img src="product.jpg" alt="초기1 이유식 상품 이미지">

<!-- 아이콘 -->
<button aria-label="장바구니 추가">🛒</button>
```

---

## 12. 성능 최적화

### 12.1 로딩 상태
```css
.loading {
  opacity: 0.6;
  pointer-events: none;
}

.loading::after {
  content: '';
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
```

### 12.2 애니메이션
- 트랜지션: 0.2s ~ 0.3s (자연스러운 느낌)
- easing: ease, ease-in-out
- GPU 가속: transform, opacity 사용

---

## 13. 상태별 UI

### 13.1 로그인 전
- 배송정보 입력 불가
- "로그인 하기" 버튼 노출
- 모든 필드 비활성화

### 13.2 로그인 후
- 배송정보 입력 가능
- 주문정보 입력 활성화
- 모든 CTA 버튼 활성화

### 13.3 형성 중
- 배송방식 선택
- 식단 시작일 선택
- 세트 수량 선택

### 13.4 주문 완료
- "주문 완료" 상태 표시
- 주문번호 노출
- 추가 구매 권유

---

## 14. 모바일 UX 패턴

### 14.1 Bottom Sheet (하단 시트)
- 배송방식 선택 시 화면 하단에서 팝업
- 스와이프로 닫기 가능
- 배경 흐리게 처리

### 14.2 Sticky Header
```css
.sticky-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: #FFFFFF;
  border-bottom: 1px solid #EEEEEE;
}
```

### 14.3 Sticky CTA Button
```css
.sticky-cta {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 99;
  padding: 12px;
  background-color: #FFFFFF;
  border-top: 1px solid #EEEEEE;
}
```

---

## 15. 마이크로 인터랙션

### 15.1 버튼 클릭 피드백
- 탭 → 배경색 변경
- 애니메이션 지속시간: 200ms
- 토스트 메시지: 확인/오류 표시

### 15.2 폼 검증
- 실시간 검증 (입력 중)
- 에러 메시지 인라인 표시
- 검증 성공 시 초록색 체크마크

### 15.3 로딩 인디케이터
- 스켈레톤 로딩 (콘텐츠 자리 표시)
- 또는 프로그레시브 로딩 (점진적 표시)

---

## 정리: 빠른 참조

### 주요 색상
- Primary: `#2ED573` (Green)
- Text: `#111111` (Dark)
- Border: `#EEEEEE` (Light Gray)

### 주요 크기
- 제목: 28px / 18px / 16px
- 본문: 14px
- 기본 패딩: 16px
- 버튼 높이: 44-48px

### 주요 반경
- 버튼: 8px
- 카드: 8px
- 입력필드: 6px

### 주요 그림자
- Light: `0 1px 3px rgba(0,0,0,0.05)`
- Medium: `0 4px 8px rgba(0,0,0,0.1)`
- Strong: `0 4px 12px rgba(0,0,0,0.15)`
