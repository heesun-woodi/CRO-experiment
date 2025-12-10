# VWO 없이 QA 테스트하는 방법

VWO에 세팅하기 전에 코드가 제대로 작동하는지 미리 테스트할 수 있는 방법들입니다.

---

## 🚀 방법 1: 브라우저 콘솔 (가장 빠름)

### 장점
- 가장 빠르고 간단함
- 설치 불필요
- 즉시 테스트 가능

### 단계

1. **모바일로 테스트 페이지 접속**
   ```
   https://www.foodcare-cle.com/shop/mealPlan/E/103
   ```

2. **브라우저 개발자 도구 열기**
   - PC: F12 키 누르기
   - Mac: Cmd + Option + I
   - 모바일 시뮬레이션: Ctrl + Shift + M (또는 Cmd + Shift + M)

3. **"Console" 탭 클릭**

4. **코드 전체 복사 & 붙여넣기**
   - `vwo-meal-plan-tab-improved.js` 파일 열기
   - 전체 내용 복사 (Ctrl+A, Ctrl+C)
   - 콘솔에 붙여넣기 (Ctrl+V)
   - Enter 키 누르기

5. **확인**
   - "식단표" 탭이 추가되었는지 확인
   - 탭 클릭해보기
   - 콘솔에 "[VWO 식단표]" 로그 메시지 확인

### 스크린샷
```
┌─────────────────────────────────────┐
│ Console                          ▼  │
├─────────────────────────────────────┤
│ > (전체 코드 붙여넣기)               │
│ [VWO 식단표] 초기화 시작            │
│ [VWO 식단표] 식단표 탭 버튼 추가 완료│
│ [VWO 식단표] 식단표 컨텐츠 영역 추가│
│ [VWO 식단표] 탭 클릭 이벤트 설정 완료│
└─────────────────────────────────────┘
```

---

## 🔖 방법 2: 북마클릿 (Bookmarklet) - 추천!

### 장점
- 한 번 설정하면 계속 사용 가능
- 클릭 한 번으로 테스트
- 모바일에서도 사용 가능

### 설정 방법

#### 1단계: 북마클릿 코드 생성

아래 코드를 복사하세요:

```javascript
javascript:(function(){var script=document.createElement('script');script.textContent=`아래 코드 전체`;document.body.appendChild(script);})();
```

#### 2단계: 북마크 생성

**PC 브라우저:**
1. 북마크바에서 우클릭 → "페이지 추가" (또는 "북마크 추가")
2. 이름: `VWO 식단표 테스트`
3. URL: 위의 북마클릿 코드 전체 복사해서 붙여넣기
4. 저장

**모바일 브라우저 (Chrome):**
1. 현재 페이지를 북마크에 추가
2. 북마크 편집
3. URL을 북마클릿 코드로 변경
4. 저장

#### 3단계: 사용

1. 테스트 페이지 접속
2. 북마크바에서 "VWO 식단표 테스트" 클릭
3. 식단표 탭이 자동으로 추가됨!

---

## 🛠️ 방법 3: Chrome DevTools Snippets (재사용 가능)

### 장점
- 코드를 저장해두고 반복 사용 가능
- 수정이 쉬움
- 다른 페이지에서도 사용 가능

### 설정 방법

1. **개발자 도구 열기** (F12)

2. **Sources 탭 → Snippets**
   - 좌측에서 "Sources" 탭 클릭
   - 좌측 패널에서 ">>" 클릭 → "Snippets" 선택
   - (안 보이면 좌측 상단의 ">>" 아이콘 클릭)

3. **New snippet 생성**
   - "+ New snippet" 클릭
   - 이름: `vwo-meal-plan-tab-test`

4. **코드 붙여넣기**
   - `vwo-meal-plan-tab-improved.js` 내용 전체 복사
   - Snippets 편집기에 붙여넣기
   - Ctrl+S로 저장

5. **실행**
   - 테스트 페이지 접속
   - Snippets에서 `vwo-meal-plan-tab-test` 우클릭
   - "Run" 클릭 (또는 Ctrl+Enter)

6. **확인**
   - 식단표 탭이 추가되었는지 확인

### 스크린샷 경로
```
Developer Tools
└── Sources 탭
    └── >> 메뉴
        └── Snippets
            └── + New snippet
```

---

## 📱 방법 4: 모바일 실기기 테스트 (Chrome Remote Debugging)

### 장점
- 실제 모바일 기기에서 테스트
- 가장 정확한 테스트
- 터치 이벤트 확인 가능

### 설정 방법

#### 1단계: Android 기기 설정

1. **개발자 옵션 활성화**
   - 설정 → 휴대전화 정보 → 빌드 번호 7번 탭
   - "개발자 옵션" 활성화됨

2. **USB 디버깅 활성화**
   - 설정 → 개발자 옵션 → USB 디버깅 켜기

3. **USB로 PC 연결**

#### 2단계: PC Chrome에서 연결

1. **Chrome에서 접속**
   ```
   chrome://inspect/#devices
   ```

2. **기기 확인**
   - 연결된 Android 기기가 보임
   - "Allow USB debugging" 팝업이 뜨면 허용

3. **페이지 열기**
   - 모바일 Chrome에서 테스트 페이지 접속
   - PC Chrome의 chrome://inspect에서 해당 페이지 "inspect" 클릭

4. **코드 실행**
   - DevTools의 Console 탭에서 코드 붙여넣기
   - 또는 Snippets 사용

5. **실제 기기에서 확인**
   - 모바일 화면에서 식단표 탭 확인
   - 실제 터치로 테스트

---

## 🦊 방법 5: 브라우저 확장 프로그램 (Tampermonkey)

### 장점
- 자동으로 코드 실행
- 페이지 로드 시마다 자동 적용
- 다양한 조건 설정 가능

### 설정 방법

#### 1단계: Tampermonkey 설치

- **Chrome**: [Chrome Web Store에서 설치](https://chrome.google.com/webstore/detail/tampermonkey/)
- **Firefox**: [Firefox Add-ons에서 설치](https://addons.mozilla.org/firefox/addon/tampermonkey/)

#### 2단계: 새 스크립트 생성

1. Tampermonkey 아이콘 클릭
2. "Create a new script" 클릭
3. 아래 템플릿 사용:

```javascript
// ==UserScript==
// @name         VWO 식단표 탭 테스트
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  상품상세페이지에 식단표 탭 추가
// @author       You
// @match        https://www.foodcare-cle.com/shop/mealPlan/E/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';

    // 여기에 vwo-meal-plan-tab-improved.js 코드 전체 붙여넣기
    // (function() { ... })(); 부분을 제외하고 안의 내용만 복사

})();
```

4. Ctrl+S로 저장

#### 3단계: 사용

1. 테스트 페이지 접속
2. 자동으로 식단표 탭이 추가됨!
3. Tampermonkey 아이콘에서 활성화/비활성화 가능

---

## 🎨 방법 6: 로컬 HTML 파일로 테스트

### 장점
- 완전히 독립적인 환경
- 코드 수정이 쉬움
- 버전 관리 가능

### 설정 방법

아래 HTML 파일을 생성하세요:

```html
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>VWO 식단표 탭 테스트</title>
</head>
<body>
    <h1>VWO 식단표 탭 QA 테스트</h1>

    <div style="max-width: 400px; margin: 20px auto; border: 1px solid #ccc; padding: 20px;">
        <h3>테스트 방법:</h3>
        <ol>
            <li>아래 iframe에서 페이지가 로드될 때까지 대기</li>
            <li>"코드 실행" 버튼 클릭</li>
            <li>iframe 내에서 식단표 탭 확인</li>
        </ol>

        <button id="runCode" style="padding: 10px 20px; background: #2ecc71; color: white; border: none; border-radius: 5px; cursor: pointer; margin: 10px 0;">
            코드 실행
        </button>

        <button id="reload" style="padding: 10px 20px; background: #3498db; color: white; border: none; border-radius: 5px; cursor: pointer;">
            새로고침
        </button>
    </div>

    <!-- iframe으로 실제 페이지 로드 -->
    <iframe
        id="testFrame"
        src="https://www.foodcare-cle.com/shop/mealPlan/E/103"
        style="width: 100%; height: 800px; border: 2px solid #333;">
    </iframe>

    <script>
        document.getElementById('runCode').addEventListener('click', function() {
            var iframe = document.getElementById('testFrame');
            var iframeWindow = iframe.contentWindow;

            // 코드 실행
            iframeWindow.eval(`
                // 여기에 vwo-meal-plan-tab-improved.js 코드 붙여넣기
                (function() {
                    'use strict';
                    // ... 전체 코드 ...
                })();
            `);

            alert('코드가 실행되었습니다! iframe 내에서 식단표 탭을 확인하세요.');
        });

        document.getElementById('reload').addEventListener('click', function() {
            document.getElementById('testFrame').src = document.getElementById('testFrame').src;
        });
    </script>
</body>
</html>
```

파일을 `vwo-test.html`로 저장하고 브라우저에서 열기

---

## 📋 추천 QA 프로세스

### 단계별 추천 방법

1. **초기 개발 단계**:
   - 👉 **방법 1 (브라우저 콘솔)** - 빠른 테스트
   - 👉 **방법 3 (Snippets)** - 수정하면서 테스트

2. **반복 테스트**:
   - 👉 **방법 2 (북마클릿)** - 클릭 한 번으로 테스트
   - 👉 **방법 5 (Tampermonkey)** - 자동 실행

3. **최종 확인**:
   - 👉 **방법 4 (모바일 실기기)** - 실제 환경 테스트
   - 👉 **VWO Preview** - 실제와 동일한 환경

---

## 🎯 각 방법별 비교표

| 방법 | 난이도 | 소요시간 | 재사용성 | 모바일 | 추천도 |
|------|--------|----------|----------|--------|--------|
| 브라우저 콘솔 | ⭐ | 1분 | ⭐ | ⭐⭐ | ⭐⭐⭐⭐ |
| 북마클릿 | ⭐⭐ | 5분 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Snippets | ⭐⭐ | 3분 | ⭐⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐⭐ |
| 모바일 디버깅 | ⭐⭐⭐ | 10분 | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Tampermonkey | ⭐⭐⭐ | 5분 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ |
| 로컬 HTML | ⭐⭐⭐⭐ | 10분 | ⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐ |

---

## ✅ QA 체크리스트 (어떤 방법을 사용하든 확인할 것)

### 기본 확인
- [ ] "식단표" 탭이 보이는가?
- [ ] 탭이 "정기식단 후기" 다음에 위치하는가?
- [ ] 모바일 화면에서만 보이는가? (데스크톱에서는 안 보여야 함)

### 기능 확인
- [ ] "정기식단 정보" 탭 클릭 → 컨텐츠 전환?
- [ ] "정기식단 후기" 탭 클릭 → 컨텐츠 전환?
- [ ] "식단표" 탭 클릭 → 로딩 표시?
- [ ] 식단표 컨텐츠가 표시되는가?

### 버튼 확인
- [ ] "다음단계" 버튼이 정상 작동하는가?
- [ ] 식단표의 "다음단계로 이동" 버튼이 작동하는가?

### 콘솔 확인
- [ ] 에러 메시지가 없는가?
- [ ] "[VWO 식단표]" 로그가 정상적으로 출력되는가?

### 스타일 확인
- [ ] 탭 스타일이 기존 탭과 일치하는가?
- [ ] 모바일 화면에서 레이아웃이 깨지지 않는가?
- [ ] 로딩 인디케이터가 보기 좋은가?

---

## 🐛 문제 해결

### "식단표 탭이 안 보여요"

1. **콘솔 확인**
   ```javascript
   // 콘솔에서 실행
   document.querySelector('.vwo-meal-schedule-tab')
   ```
   - null이 나오면 → 탭이 추가되지 않음
   - 요소가 나오면 → CSS 문제일 수 있음

2. **디버그 모드 켜기**
   - 코드에서 `CONFIG.debug = true`로 변경
   - 콘솔 로그 확인

### "코드가 실행되지 않아요"

1. **페이지가 완전히 로드되었는지 확인**
   ```javascript
   // 콘솔에서 확인
   document.readyState
   // "complete"가 나와야 함
   ```

2. **수동으로 다시 실행**
   ```javascript
   // 콘솔에서 실행
   location.reload()
   // 그리고 페이지 로드 후 코드 다시 실행
   ```

### "모바일에서 테스트하고 싶어요"

- **방법 2 (북마클릿)** 추천!
- 또는 **방법 4 (Chrome Remote Debugging)** 사용

---

## 💡 프로 팁

### 1. 빠른 반복 테스트
```javascript
// 코드 수정 → 저장 후
// 브라우저에서:
location.reload();
// 그리고 Snippets에서 코드 실행 (Ctrl+Enter)
```

### 2. 특정 기능만 테스트
```javascript
// 콘솔에서 직접 함수 호출
addMealScheduleTab();
addMealScheduleContent();
```

### 3. 스타일 수정 즉시 확인
```javascript
// 콘솔에서 CSS 추가
var style = document.createElement('style');
style.textContent = '.vwo-meal-schedule-tab { background: red !important; }';
document.head.appendChild(style);
```

---

**가장 추천하는 조합:**

1. **개발 중**: 방법 1 (콘솔) + 방법 3 (Snippets)
2. **반복 테스트**: 방법 2 (북마클릿)
3. **최종 확인**: 방법 4 (모바일 실기기) + VWO Preview

Happy Testing! 🚀
