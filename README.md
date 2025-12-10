# VWO A/B Test: 식단표 탭 추가 Variant

## 📋 실험 개요

### 가설
**첫 구매 고객이 상세페이지에 진입했을때 식단 메뉴를 상세페이지에서 확인할 수 있도록 시각적으로 클레 식단표를 제공하면 다음단계 전환율이 48→55%로 개선될 것이다**

### 실험 정보
- **웹사이트**: https://www.foodcare-cle.com
- **실험 지면**: 모바일 웹 상품상세페이지
- **대상 URL**: https://www.foodcare-cle.com/shop/mealPlan/E/103
- **목표**: CTA(다음단계 버튼) 클릭율 개선
- **타겟**: 모바일 웹 환경만

---

## 🎯 Variant 설명

### 변경 내용

#### Control (원본)
- 탭 구조: "정기식단 정보" | "정기식단 후기"
- 식단표는 다음 페이지에서만 확인 가능

#### Variant (변형)
- 탭 구조: "정기식단 정보" | "정기식단 후기" | **"식단표"** (신규 추가)
- 식단표 탭 클릭 시 현재 페이지에서 바로 식단표 확인 가능
- 요일별 식단 메뉴 미리보기 제공

### 작동 방식

1. **페이지 로드 시**: "식단표" 탭 버튼이 자동으로 추가됨
2. **식단표 탭 클릭 시**:
   - AJAX로 다음 페이지에서 식단표 데이터를 가져옴
   - 로딩 인디케이터 표시
   - 식단표 데이터를 탭 컨텐츠에 표시
3. **식단표 표시**: 요일별 메뉴, 알러지 정보, 식재료 정보 등 제공

---

## 🚀 VWO 세팅 방법

### 1. VWO Campaign 생성

1. VWO 대시보드 로그인
2. "Create" → "A/B Test" 선택
3. Test Name: "식단표 탭 추가 - 상품상세페이지"

### 2. 타겟 설정

```
URL: https://www.foodcare-cle.com/shop/mealPlan/E/103
Device: Mobile Only
```

**VWO Targeting 설정:**
```javascript
// URL 타겟팅
_vis_opt_url = /shop\/mealPlan\/E\/103/;

// 모바일만 타겟팅
_vis_opt_match = function() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};
```

### 3. Variant 코드 추가

**VWO Code Editor에 다음 코드 복사:**

#### 방법 1: 개선된 버전 사용 (권장)

`vwo-meal-plan-tab-improved.js` 파일의 전체 내용을 VWO Code Editor에 붙여넣기

```javascript
// vwo-meal-plan-tab-improved.js 파일 내용 전체 복사
(function() {
  'use strict';
  // ... (파일 전체 내용)
})();
```

#### 방법 2: CSS 추가 (선택사항)

VWO의 "Custom CSS" 섹션에 다음 추가:

```css
/* 식단표 탭 스타일 개선 */
.vwo-meal-schedule-tab {
  position: relative;
}

.vwo-meal-schedule-tab::after {
  content: 'NEW';
  position: absolute;
  top: -5px;
  right: -5px;
  background: #e74c3c;
  color: white;
  font-size: 10px;
  padding: 2px 5px;
  border-radius: 3px;
  font-weight: bold;
}

/* 로딩 애니메이션 */
@keyframes vwo-spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* 식단표 컨텐츠 스타일 */
.vwo-meal-schedule-content {
  animation: vwo-fadeIn 0.3s ease-in;
}

@keyframes vwo-fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
```

### 4. Goal 설정

**Primary Goal: CTA 클릭**

```javascript
// VWO Goal: 다음단계 버튼 클릭
_vis_opt_goal = function() {
  var nextButton = document.querySelector('.devNextStepButton');
  if (nextButton) {
    nextButton.addEventListener('click', function() {
      // VWO Goal 트리거
      if (typeof _vis_opt_goal !== 'undefined') {
        _vis_opt_goal_conversion(/* Goal ID */);
      }
    });
  }
};
```

**Secondary Goal: 식단표 조회** (선택사항)

- VWO에서 Custom Event "meal_schedule_viewed" 설정
- 식단표 탭 클릭 시 자동으로 이벤트 전송

---

## 📊 트래킹 이벤트

### 자동 트래킹 이벤트

코드에 이미 포함된 이벤트:

1. **meal_schedule_viewed**: 식단표 탭 클릭 시
2. **Google Analytics**: view_meal_schedule 이벤트 (GA 설치된 경우)

### 커스텀 이벤트 추가

VWO Dashboard에서:
1. "Goals" → "Track Custom Event"
2. Event Name: `meal_schedule_viewed`
3. 이벤트는 코드에서 자동으로 전송됨

---

## 🔧 커스터마이징

### CONFIG 설정 변경

`vwo-meal-plan-tab-improved.js` 파일 상단의 CONFIG 객체를 수정:

```javascript
var CONFIG = {
  // 다음 페이지 URL 변경
  nextPageUrl: 'https://www.foodcare-cle.com/shop/mealPlan/E/103/next',

  // 탭 이름 변경
  tabName: '식단표',

  // 디버그 모드 (프로덕션에서는 false로 설정)
  debug: false
};
```

### 탭 순서 변경

탭을 맨 앞에 추가하려면:

```javascript
// 기존 코드 (맨 뒤에 추가)
tabNav.appendChild(mealScheduleTab);

// 변경 (맨 앞에 추가)
tabNav.insertBefore(mealScheduleTab, tabNav.firstChild);
```

### 스타일 변경

폴백 컨텐츠 스타일 변경:

```javascript
function showFallbackContent(contentArea) {
  contentArea.innerHTML = `
    <div style="padding: 20px;">
      <!-- 원하는 HTML 스타일 변경 -->
    </div>
  `;
}
```

---

## 🐛 트러블슈팅

### 문제 1: 탭이 추가되지 않음

**원인**: 페이지 로딩 타이밍 문제

**해결**:
```javascript
// CONFIG.debug를 true로 설정하고 콘솔 확인
var CONFIG = {
  debug: true
};

// 브라우저 콘솔에서 다음 확인:
// - "[VWO 식단표] 초기화 시작" 메시지가 있는지
// - 에러 메시지 확인
```

### 문제 2: 식단표 데이터가 로드되지 않음

**원인**: AJAX 요청 실패 또는 HTML 구조 변경

**해결**:
1. 브라우저 콘솔에서 에러 확인
2. 폴백 컨텐츠가 표시되는지 확인
3. 필요시 `CONFIG.nextPageUrl` 수정

### 문제 3: 기존 탭 이벤트와 충돌

**원인**: 기존 JavaScript와 이벤트 리스너 충돌

**해결**:
```javascript
// setupTabClickEvents 함수에서
tab.addEventListener('click', function(e) {
  e.preventDefault();
  e.stopPropagation();
  // ...
}, true); // useCapture = true로 설정
```

### 문제 4: 모바일에서만 작동해야 하는데 데스크톱에서도 작동함

**확인**:
```javascript
function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
         || window.innerWidth <= 768;
}
```

---

## 📈 성공 지표

### Primary Metric
- **CTA 클릭율**: 48% → 55% (목표)

### Secondary Metrics
- 식단표 탭 조회율
- 페이지 체류 시간
- 이탈률

### 통계적 유의성
- Confidence Level: 95%
- Minimum Sample Size: 1,000 visitors per variation
- Test Duration: 2-4 weeks (트래픽에 따라 조정)

---

## 📝 체크리스트

실험 시작 전 확인사항:

- [ ] VWO 캠페인 생성 완료
- [ ] 타겟 URL 설정 완료 (모바일만)
- [ ] Variant 코드 추가 완료
- [ ] Goal 설정 완료
- [ ] QA 테스트 완료 (모바일 기기에서)
- [ ] 디버그 모드 OFF (CONFIG.debug = false)
- [ ] 트래픽 할당 설정 (예: 50/50)
- [ ] 캠페인 활성화

---

## 🔍 QA 테스트 방법

### 1. VWO Preview 모드 사용

1. VWO 대시보드에서 "Preview" 클릭
2. 모바일 기기 또는 브라우저 개발자 도구의 모바일 모드 사용
3. 다음 확인:
   - ✅ "식단표" 탭이 정상적으로 표시되는가?
   - ✅ 탭 클릭 시 컨텐츠가 전환되는가?
   - ✅ 식단표 데이터가 로드되는가?
   - ✅ 로딩 인디케이터가 표시되는가?
   - ✅ 다음단계 버튼이 정상 작동하는가?

### 2. 브라우저 개발자 도구 확인

```javascript
// 콘솔에서 다음 명령어 실행:

// 1. 탭이 추가되었는지 확인
document.querySelector('.vwo-meal-schedule-tab')

// 2. 컨텐츠가 추가되었는지 확인
document.querySelector('.vwo-meal-schedule-content')

// 3. VWO 이벤트 확인
// Network 탭에서 VWO 관련 요청 확인
```

### 3. 크로스 브라우저 테스트

- [ ] Chrome (Android)
- [ ] Safari (iOS)
- [ ] Samsung Internet
- [ ] Firefox Mobile

---

## 📞 Support

문제가 발생하거나 질문이 있으시면:

1. 브라우저 콘솔 로그 확인
2. VWO 대시보드의 "Issues" 섹션 확인
3. 개발자에게 문의 (콘솔 로그 캡처와 함께)

---

## 📄 파일 구조

```
CRO-experiment/
├── README.md                           # 이 파일
├── vwo-meal-plan-tab-variant.js        # 기본 버전
├── vwo-meal-plan-tab-improved.js       # 개선 버전 (권장)
└── SETUP_GUIDE.md                      # 상세 세팅 가이드
```

---

## 🎓 추가 학습 자료

- [VWO Documentation](https://help.vwo.com/)
- [VWO Code Editor Guide](https://help.vwo.com/hc/en-us/articles/360020670134)
- [A/B Testing Best Practices](https://vwo.com/ab-testing/)

---

**Version**: 1.0.0
**Last Updated**: 2025-12-10
**Author**: Claude (AI Assistant)
