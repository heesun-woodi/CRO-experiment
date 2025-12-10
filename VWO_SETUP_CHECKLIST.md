# VWO Code Editor 세팅 체크리스트

## ✅ 빠른 답변

**Q: 코드를 그대로 복사만 하면 되나요?**
**A: 네! 99% 그대로 복사하면 됩니다.**

하지만 시작하기 전에 2가지만 확인하세요:
1. `debug: false`로 설정되어 있는지 (17번째 줄)
2. 모바일에서만 작동하게 하려면 VWO 타겟팅 설정

---

## 📋 Step-by-Step 가이드

### Step 1: 코드 복사 준비

1. **`vwo-meal-plan-tab-improved.js` 파일 열기**

2. **17번째 줄 확인** (CONFIG 섹션):
   ```javascript
   var CONFIG = {
     nextPageUrl: window.location.href,
     tabName: '식단표',
     debug: false  // ⭐ 이게 false인지 확인!
   };
   ```

3. **debug 설정 변경 (필요시)**:
   - **테스트 중**: `debug: true` ← 콘솔에 로그가 많이 나옴
   - **실제 운영**: `debug: false` ← 깔끔하게 작동

---

### Step 2: VWO에 코드 붙여넣기

#### 2-1. VWO Code Editor 열기
```
VWO Dashboard
→ Testing
→ 생성한 A/B Test 클릭
→ Variations
→ "Variation 1" 클릭
→ "Code" 탭 클릭
```

#### 2-2. JavaScript 영역에 붙여넣기

**중요: "JS" 탭에만 붙여넣으세요!**

```
┌─────────────────────────────────┐
│ JS  │  CSS  │  Settings         │ ← "JS" 탭 클릭
├─────────────────────────────────┤
│                                 │
│  여기에 전체 코드 붙여넣기      │
│  (Ctrl+V)                       │
│                                 │
│  /**                            │
│   * VWO A/B Test - ...          │
│   */                            │
│  (function() {                  │
│    'use strict';                │
│    ...                          │
│  })();                          │
│                                 │
└─────────────────────────────────┘
```

**붙여넣기 방법:**
1. `vwo-meal-plan-tab-improved.js` 파일 열기
2. 전체 선택 (Ctrl+A)
3. 복사 (Ctrl+C)
4. VWO Code Editor "JS" 탭에 붙여넣기 (Ctrl+V)
5. **"Save" 버튼 클릭** ⭐ (저장 잊지 마세요!)

#### 2-3. CSS 영역 (선택사항)

CSS는 선택사항이지만, 추가하면 더 예쁩니다:

```css
/* VWO의 "CSS" 탭에 붙여넣기 */

/* 식단표 탭에 NEW 뱃지 추가 (선택사항) */
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

/* 부드러운 페이드인 효과 */
.vwo-meal-schedule-content {
  animation: vwo-fadeIn 0.3s ease-in;
}

@keyframes vwo-fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
```

---

### Step 3: VWO Preview로 확인

#### 3-1. Preview 모드 시작

```
VWO Editor 우측 상단
→ "Preview" 버튼 클릭
```

그러면 이런 화면이 나타납니다:
```
┌──────────────────────────────────────┐
│  Preview URL이 생성되었습니다         │
│  https://vwo.link/xxxxxxxxxx         │
│                                      │
│  [Copy Link]  [Open in New Tab]     │
└──────────────────────────────────────┘
```

#### 3-2. 모바일로 Preview 확인하기

**방법 1: PC에서 모바일 시뮬레이션**

1. Preview URL을 PC Chrome에서 열기
2. F12 (개발자 도구 열기)
3. **Ctrl+Shift+M** (모바일 모드 전환)
4. 상단에서 디바이스 선택:
   ```
   [iPhone 12 Pro ▼]  [375 x 812]
   ```
5. 페이지 새로고침 (F5)

**방법 2: 실제 모바일 기기**

1. Preview URL 복사
2. 모바일로 문자/카톡으로 전송
3. 모바일에서 링크 클릭
4. 페이지 확인

#### 3-3. Preview에서 확인할 것들

**✅ 체크리스트:**

```
□ "식단표" 탭이 보이나요?
□ 탭이 "정기식단 후기" 다음에 있나요?
□ "식단표" 탭을 클릭하면 컨텐츠가 전환되나요?
□ 로딩 인디케이터가 보이나요?
□ 다른 탭들도 정상 작동하나요?
□ "다음단계" 버튼이 정상 작동하나요?
```

**🔍 브라우저 콘솔도 확인:**

F12 → Console 탭에서:

```javascript
// debug: true로 설정했다면 이런 로그가 보여야 함
[VWO 식단표] 초기화 시작
[VWO 식단표] 식단표 탭 버튼 추가 완료
[VWO 식단표] 식단표 컨텐츠 영역 추가 완료
[VWO 식단표] 탭 클릭 이벤트 설정 완료
[VWO 식단표] 초기화 완료
```

에러가 있으면 빨간색으로 표시됩니다!

---

## 🐛 Preview가 안 보일 때

### 문제 1: "식단표 탭이 안 보여요"

**확인사항:**
```javascript
// 브라우저 콘솔에서 실행:
document.querySelector('.vwo-meal-schedule-tab')
```

**결과:**
- `null` → 탭이 추가되지 않음
  - ✅ 모바일 모드인지 확인 (Ctrl+Shift+M)
  - ✅ 페이지를 새로고침 해보세요
  - ✅ VWO Preview URL이 맞는지 확인

- `<span class="...">` → 탭은 있는데 안 보임
  - ✅ CSS 문제일 수 있음
  - ✅ 개발자 도구로 요소 검사

### 문제 2: "데스크톱에서도 보여요"

**원인:** VWO 타겟팅 설정이 안 됨

**해결:**
```
VWO Editor
→ "Who should see this test?"
→ "Add Condition"
→ Device Type → is → Mobile Phone
→ Save
```

그러면 코드의 `isMobile()` 체크와 VWO 타겟팅 두 번 필터링!

### 문제 3: "에러가 나요"

**가장 흔한 에러들:**

**에러 1:**
```
Uncaught SyntaxError: Unexpected token
```
**해결:** 코드를 완전히 복사했는지 확인. 처음부터 끝까지 전체를 복사해야 함.

**에러 2:**
```
Cannot read property 'appendChild' of null
```
**해결:** 페이지 URL이 맞는지 확인. 탭 영역이 있는 페이지여야 함.

**에러 3:**
```
Failed to fetch
```
**해결:** 정상입니다! AJAX 실패 시 폴백 컨텐츠가 표시됩니다.

---

## 💡 디버깅 팁

### Tip 1: Debug 모드 켜기

코드 17번째 줄을 이렇게 변경:
```javascript
debug: true  // false에서 true로 변경
```

그러면 콘솔에 자세한 로그가 나옵니다!

### Tip 2: 특정 함수만 실행해보기

브라우저 콘솔에서:
```javascript
// 탭이 추가되었는지 확인
document.querySelectorAll('.js__tab').length
// 3이면 성공 (원래 2개 + 식단표 1개)

// 식단표 탭만 확인
document.querySelector('.vwo-meal-schedule-tab')

// 콘텐츠 확인
document.querySelector('.vwo-meal-schedule-content')
```

### Tip 3: 강제로 모바일 모드 적용

코드에서 모바일 체크를 비활성화하려면:
```javascript
// 60번째 줄 근처:
function isMobile() {
  return true;  // 항상 true 반환 (테스트용)
}
```

⚠️ **주의:** 테스트 후 반드시 원래대로 되돌려야 함!

---

## 📸 예상 결과 스크린샷

### Before (Control):
```
┌──────────────────────────────┐
│ 정기식단 정보 │ 정기식단 후기  │
└──────────────────────────────┘
```

### After (Variant with 식단표):
```
┌──────────────────────────────────────────┐
│ 정기식단 정보 │ 정기식단 후기 │ 식단표 │
└──────────────────────────────────────────┘
```

클릭하면:
```
┌──────────────────────────────────────────┐
│ 정기식단 정보 │ 정기식단 후기 │ [식단표] │ ← 활성화
└──────────────────────────────────────────┘
┌──────────────────────────────────────────┐
│                                          │
│  📅 요일별 식단 메뉴                     │
│                                          │
│  🍱 한우흑미죽                           │
│  🥕 고구마수수죽                         │
│  🥬 한우무죽                             │
│  ...                                     │
│                                          │
└──────────────────────────────────────────┘
```

---

## ✅ 최종 체크리스트

### VWO 세팅 전:
- [ ] `debug: false` 확인 (실제 운영용)
- [ ] 코드 전체 복사 준비
- [ ] VWO 계정 로그인

### VWO 세팅:
- [ ] Code Editor "JS" 탭에 코드 붙여넣기
- [ ] Save 버튼 클릭
- [ ] (선택) CSS 탭에 스타일 추가
- [ ] Device Targeting: Mobile Phone만 설정

### Preview 확인:
- [ ] Preview URL 생성
- [ ] 모바일 모드로 확인 (Ctrl+Shift+M)
- [ ] "식단표" 탭 확인
- [ ] 탭 클릭해서 전환 확인
- [ ] 다른 탭들도 정상 작동 확인
- [ ] "다음단계" 버튼 작동 확인
- [ ] 브라우저 콘솔에서 에러 없는지 확인

### 실제 테스트 시작:
- [ ] debug: false로 변경 (다시 한번 확인!)
- [ ] Traffic Allocation: 50/50
- [ ] Goal 설정 완료
- [ ] "Start" 버튼 클릭!

---

## 🎯 간단 요약

**Q: 수정해야 하나요?**
**A: 아니요! 그대로 복사만 하면 됩니다.**

**단, 확인할 것:**
1. `debug: false`인지 확인 (17번째 줄)
2. VWO에서 "Save" 버튼 클릭
3. Preview로 모바일 모드에서 확인

**Preview 확인 방법:**
1. VWO "Preview" 버튼 클릭
2. PC에서: F12 → Ctrl+Shift+M (모바일 모드)
3. 페이지 새로고침
4. "식단표" 탭 확인!

---

**궁금한 점이 있으면 언제든 물어보세요!** 🚀
