# VWO Preview 문제 해결 가이드

## 🔍 현재 상황 분석

**문제점:**
1. ❌ 식단표 탭이 잘못된 위치에 있음
2. ❌ 식단표 탭에 컨텐츠가 없음

**가능한 원인:**
1. 탭 네비게이션을 잘못 찾았을 가능성
2. 페이지 구조가 예상과 다를 수 있음
3. 코드가 다른 요소에 적용되었을 수 있음

---

## 🛠️ 즉시 디버깅 방법

### Step 1: 브라우저 콘솔 확인

VWO Preview 페이지에서:

1. **F12 키 누르기** (개발자 도구 열기)

2. **Console 탭 클릭**

3. **다음 명령어들을 하나씩 실행해보세요:**

```javascript
// 1. 탭 네비게이션 확인
document.querySelector('.fb__common-tab')
// null이 나오면 → 탭을 못 찾은 것!
// 요소가 나오면 → 탭을 찾은 것

// 2. 현재 탭 개수 확인
document.querySelectorAll('.js__tab').length
// 2가 나와야 정상 (정기식단 정보 + 정기식단 후기)
// 3이 나오면 → 식단표 탭이 추가된 것

// 3. 식단표 탭 확인
document.querySelector('.vwo-meal-schedule-tab')
// null이면 → 식단표 탭이 추가되지 않은 것
// 요소가 나오면 → 추가되었지만 위치가 잘못된 것

// 4. 전체 탭 구조 확인
console.log('탭들:', document.querySelectorAll('.fb__common-tab'));
console.log('탭 래퍼:', document.querySelector('.meal-plan__tab-wrapper'));
```

**결과를 알려주세요!**

---

## 🎯 예상 원인별 해결책

### 원인 1: 페이지에 탭이 여러 개 있음

**증상:**
- 식단표 탭이 엉뚱한 위치에 추가됨

**해결:**
```javascript
// 코드 수정이 필요합니다
// vwo-meal-plan-tab-improved.js 파일에서

// 기존 코드 (71번째 줄 근처):
function addMealScheduleTab() {
  var tabNav = document.querySelector('.fb__common-tab');
  // ...
}

// 수정된 코드:
function addMealScheduleTab() {
  // 더 구체적으로 찾기
  var mealPlanSection = document.querySelector('.devMealPlanTab');
  if (!mealPlanSection) {
    log('식단 플랜 섹션을 찾을 수 없습니다.', 'error');
    return false;
  }

  var tabNav = mealPlanSection.querySelector('.fb__common-tab');
  if (!tabNav) {
    log('탭 네비게이션을 찾을 수 없습니다.', 'error');
    return false;
  }

  // 나머지 코드는 동일
}
```

---

### 원인 2: 페이지 구조가 다름

**확인 방법:**

콘솔에서:
```javascript
// 실제 HTML 구조 확인
document.querySelector('.devMealPlanTab')
```

**결과가 null이면:**
→ 페이지 구조가 예상과 다릅니다!

**해결:**
실제 페이지의 HTML 구조를 확인해야 합니다.

---

### 원인 3: 모바일 감지 실패

**확인:**
```javascript
// 콘솔에서 실행
/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
// 또는
window.innerWidth
```

**false가 나오거나 width가 768보다 크면:**
→ 데스크톱으로 인식되어 코드가 실행 안 됨!

**해결:**
1. Ctrl+Shift+M (모바일 모드)
2. 상단에서 디바이스 선택 (iPhone 12 Pro 등)
3. 페이지 새로고침

---

## 🔧 빠른 임시 수정 (테스트용)

VWO Code Editor에서 다음 코드로 교체해보세요:

```javascript
/**
 * VWO A/B Test - 식단표 탭 추가 (디버그 버전)
 */
(function() {
  'use strict';

  // 디버그 모드 강제 활성화
  var CONFIG = {
    nextPageUrl: window.location.href,
    tabName: '식단표',
    debug: true  // 디버그 켜기!
  };

  function log(message, type) {
    console.log('[VWO 식단표 DEBUG]', message, type || '');
  }

  function init() {
    log('=== 디버깅 시작 ===');

    // 1. 페이지 구조 확인
    log('1. devMealPlanTab 찾기...');
    var mealPlanSection = document.querySelector('.devMealPlanTab');
    log('devMealPlanTab:', mealPlanSection);

    if (!mealPlanSection) {
      log('❌ .devMealPlanTab을 찾을 수 없습니다!', 'error');
      log('전체 페이지에서 .fb__common-tab 찾기...');
      var allTabs = document.querySelectorAll('.fb__common-tab');
      log('찾은 .fb__common-tab 개수:', allTabs.length);
      allTabs.forEach(function(tab, i) {
        log('탭 #' + i + ':', tab);
      });
      return;
    }

    log('✓ devMealPlanTab 찾음!');

    // 2. 탭 네비게이션 찾기
    log('2. fb__common-tab 찾기...');
    var tabNav = mealPlanSection.querySelector('.fb__common-tab');
    log('fb__common-tab:', tabNav);

    if (!tabNav) {
      log('❌ 탭 네비게이션을 찾을 수 없습니다!', 'error');
      return;
    }

    log('✓ 탭 네비게이션 찾음!');

    // 3. 기존 탭 확인
    log('3. 기존 탭 확인...');
    var existingTabs = tabNav.querySelectorAll('.js__tab');
    log('기존 탭 개수:', existingTabs.length);
    existingTabs.forEach(function(tab, i) {
      log('탭 #' + i + ':', tab.textContent.trim());
    });

    // 4. 식단표 탭 추가
    log('4. 식단표 탭 추가 시도...');
    var mealScheduleTab = document.createElement('span');
    mealScheduleTab.className = 'fb__common-tab__section js__tab vwo-meal-schedule-tab';
    mealScheduleTab.innerHTML = '<span class="fb__common-tab__text">🍱 식단표 (TEST)</span>';

    tabNav.appendChild(mealScheduleTab);
    log('✓ 식단표 탭 추가 완료!');

    // 5. 확인
    log('5. 최종 확인...');
    var finalTabs = tabNav.querySelectorAll('.js__tab');
    log('최종 탭 개수:', finalTabs.length);

    log('=== 디버깅 완료 ===');
  }

  // 실행
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
```

**이 코드의 특징:**
- ✅ 디버그 모드 활성화
- ✅ 모든 단계를 콘솔에 출력
- ✅ 어디서 문제가 생기는지 정확히 확인 가능
- ✅ 식단표 탭에 "🍱 식단표 (TEST)" 표시 (눈에 잘 보임)

---

## 📋 체크리스트

**지금 바로 확인해주세요:**

1. [ ] VWO Preview 페이지에서 F12 눌러서 콘솔 열기
2. [ ] 위의 디버그 명령어들 실행
3. [ ] 결과 확인 (null인지, 요소가 나오는지)
4. [ ] 콘솔에 에러 메시지가 있는지 확인
5. [ ] 모바일 모드인지 확인 (Ctrl+Shift+M)

**그리고 알려주세요:**
- 콘솔에 어떤 메시지가 나오나요?
- `document.querySelector('.fb__common-tab')` 결과는?
- `document.querySelectorAll('.js__tab').length` 결과는?
- 에러 메시지가 있나요?

---

## 🎯 다음 단계

결과를 알려주시면:
1. 정확한 문제 원인 파악
2. 맞춤 해결책 제공
3. 수정된 코드 작성

**지금은 위의 디버그 코드를 VWO에 넣고 콘솔을 확인해보세요!** 🔍
