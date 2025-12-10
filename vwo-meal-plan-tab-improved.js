/**
 * VWO A/B Test - 식단표 탭 추가 Variant (개선 버전)
 * 목표: 상품상세페이지에 "식단표" 탭을 추가하여 CTA 클릭율 개선
 * 대상: 모바일 웹 (https://www.foodcare-cle.com/shop/mealPlan/E/103)
 *
 * 작동 방식:
 * 1. "정기식단 정보", "정기식단 후기" 옆에 "식단표" 탭 추가
 * 2. 식단표 클릭 시 AJAX로 다음 페이지에서 식단표 데이터 로드
 * 3. 로드된 식단표를 탭 컨텐츠로 표시
 */

(function() {
  'use strict';

  // ============================================
  // 설정
  // ============================================
  var CONFIG = {
    // 다음 페이지 URL (현재 페이지와 동일하지만 실제로는 다음 단계 URL)
    // 실제 구현 시: 다음 단계 페이지 URL로 변경 필요
    nextPageUrl: window.location.href,

    // 탭 이름
    tabName: '식단표',

    // 디버그 모드
    debug: true
  };

  // ============================================
  // 유틸리티 함수
  // ============================================
  function log(message, data) {
    if (CONFIG.debug) {
      console.log('[VWO 식단표]', message, data || '');
    }
  }

  function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
           || window.innerWidth <= 768;
  }

  // ============================================
  // 1. 식단표 탭 버튼 추가
  // ============================================
  function addMealScheduleTab() {
    var tabNav = document.querySelector('.fb__common-tab');
    if (!tabNav) {
      log('탭 네비게이션을 찾을 수 없습니다.');
      return false;
    }

    // 이미 추가되었는지 확인
    if (document.querySelector('.vwo-meal-schedule-tab')) {
      log('식단표 탭이 이미 존재합니다.');
      return true;
    }

    // 식단표 탭 버튼 생성
    var mealScheduleTab = document.createElement('span');
    mealScheduleTab.className = 'fb__common-tab__section js__tab vwo-meal-schedule-tab';
    mealScheduleTab.setAttribute('data-tab-index', '2');
    mealScheduleTab.innerHTML = '<span class="fb__common-tab__text">' + CONFIG.tabName + '</span>';

    // 탭 추가
    tabNav.appendChild(mealScheduleTab);

    log('식단표 탭 버튼 추가 완료');
    return true;
  }

  // ============================================
  // 2. 식단표 컨텐츠 영역 추가
  // ============================================
  function addMealScheduleContent() {
    var tabWrapper = document.querySelector('.meal-plan__tab-wrapper');
    if (!tabWrapper) {
      log('탭 래퍼를 찾을 수 없습니다.');
      return false;
    }

    // 이미 추가되었는지 확인
    if (document.querySelector('.vwo-meal-schedule-content')) {
      log('식단표 컨텐츠가 이미 존재합니다.');
      return true;
    }

    // 식단표 컨텐츠 영역 생성
    var mealScheduleContent = document.createElement('div');
    mealScheduleContent.className = 'meal-plan__tab-content js__tab__content vwo-meal-schedule-content';
    mealScheduleContent.setAttribute('data-content-index', '2');
    mealScheduleContent.innerHTML = `
      <div class="vwo-loading-state" style="text-align: center; padding: 60px 20px;">
        <div style="display: inline-block; width: 40px; height: 40px; border: 4px solid #f3f3f3; border-top: 4px solid #2ecc71; border-radius: 50%; animation: vwo-spin 1s linear infinite;"></div>
        <p style="margin-top: 20px; font-size: 14px; color: #666;">식단표를 불러오는 중...</p>
      </div>
      <style>
        @keyframes vwo-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      </style>
    `;

    // 마지막에 추가
    tabWrapper.appendChild(mealScheduleContent);

    log('식단표 컨텐츠 영역 추가 완료');
    return true;
  }

  // ============================================
  // 3. 식단표 데이터 로드
  // ============================================
  function loadMealScheduleData() {
    var contentArea = document.querySelector('.vwo-meal-schedule-content');
    if (!contentArea) {
      log('컨텐츠 영역을 찾을 수 없습니다.');
      return;
    }

    // 이미 로드되었는지 확인
    if (contentArea.getAttribute('data-loaded') === 'true') {
      log('식단표 데이터가 이미 로드되었습니다.');
      return;
    }

    log('식단표 데이터 로드 시작...');

    // AJAX로 다음 페이지 HTML 가져오기
    fetch(CONFIG.nextPageUrl, {
      method: 'GET',
      credentials: 'same-origin'
    })
    .then(function(response) {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.text();
    })
    .then(function(html) {
      // HTML 파싱
      var parser = new DOMParser();
      var doc = parser.parseFromString(html, 'text/html');

      // 식단표 데이터 추출
      var mealScheduleModule = doc.querySelector('#module-dailyMenu');

      if (mealScheduleModule) {
        // 식단표 HTML 삽입
        contentArea.innerHTML = mealScheduleModule.outerHTML;
        contentArea.setAttribute('data-loaded', 'true');

        // CSS 로드 (필요시)
        loadMealScheduleCSS();

        // JavaScript 재초기화 (필요시)
        reinitializeMealScheduleScripts();

        log('식단표 데이터 로드 완료');
      } else {
        // 식단표를 찾을 수 없으면 폴백
        log('식단표 데이터를 찾을 수 없습니다. 폴백 표시');
        showFallbackContent(contentArea);
      }
    })
    .catch(function(error) {
      log('식단표 로드 실패:', error);
      showFallbackContent(contentArea);
    });
  }

  // ============================================
  // 4. 폴백 컨텐츠 표시
  // ============================================
  function showFallbackContent(contentArea) {
    contentArea.innerHTML = `
      <div class="sector-cont" style="padding: 20px;">
        <div class="sub-head-group" style="margin-bottom: 15px;">
          <h4 class="sub-head" style="font-size: 16px; font-weight: bold; color: #333;">요일별 식단 메뉴</h4>
        </div>

        <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 15px;">
          <p style="margin: 0 0 8px 0; font-size: 13px; color: #666; line-height: 1.5;">
            <strong style="color: #e74c3c;">식재료 수급 및 식품 적절성 평가</strong>에 따라 일부 메뉴 변경 될 수 있습니다.
          </p>
          <p style="margin: 0; font-size: 13px; color: #666; line-height: 1.5;">
            · 1일 2세트 신청시 요일에 따른 다른 메뉴가 배송됩니다.<br>
            · 1일 3세트 이상부터는 메뉴가 중복됩니다.
          </p>
        </div>

        <div style="text-align: center; padding: 40px 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
          <div style="margin-bottom: 20px;">
            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
          </div>
          <p style="font-size: 15px; color: white; margin-bottom: 20px; line-height: 1.6;">
            <strong>전체 식단표</strong>를 확인하시려면<br>
            다음 단계로 이동해주세요
          </p>
          <button onclick="document.querySelector('.devNextStepButton').click()"
                  style="padding: 14px 35px; background: white; color: #667eea; border: none; border-radius: 25px; font-size: 15px; font-weight: bold; cursor: pointer; box-shadow: 0 4px 10px rgba(0,0,0,0.15); transition: all 0.3s;">
            다음단계 바로가기 →
          </button>
        </div>
      </div>
    `;
    contentArea.setAttribute('data-loaded', 'true');
  }

  // ============================================
  // 5. CSS 로드
  // ============================================
  function loadMealScheduleCSS() {
    var cssUrl = '/assets/mobile_templet/mobile_enterprise/_widget/mealPlan/dailyMenu/dailyMenu.css';

    // 이미 로드되었는지 확인
    if (document.querySelector('link[href="' + cssUrl + '"]')) {
      return;
    }

    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = cssUrl;
    document.head.appendChild(link);

    log('식단표 CSS 로드 완료');
  }

  // ============================================
  // 6. JavaScript 재초기화
  // ============================================
  function reinitializeMealScheduleScripts() {
    // 식단표 관련 JavaScript가 있다면 여기서 재초기화
    // 예: 알러지 체크박스, 메뉴 상세보기 등

    log('식단표 스크립트 재초기화');
  }

  // ============================================
  // 7. 탭 클릭 이벤트 처리
  // ============================================
  function setupTabClickEvents() {
    var allTabs = document.querySelectorAll('.js__tab');
    var allContents = document.querySelectorAll('.js__tab__content');

    allTabs.forEach(function(tab, index) {
      // 기존 이벤트 리스너 제거 방지를 위해 새 리스너 추가
      tab.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();

        log('탭 클릭:', index);

        // 모든 탭과 컨텐츠에서 active 클래스 제거
        allTabs.forEach(function(t) {
          t.classList.remove('active');
        });
        allContents.forEach(function(c) {
          c.classList.remove('active');
        });

        // 클릭한 탭과 해당 컨텐츠에 active 클래스 추가
        tab.classList.add('active');

        var targetContent = allContents[index];
        if (targetContent) {
          targetContent.classList.add('active');

          // 식단표 탭 클릭 시 데이터 로드
          if (tab.classList.contains('vwo-meal-schedule-tab')) {
            loadMealScheduleData();

            // VWO 이벤트 트래킹
            trackMealScheduleView();
          }
        }
      }, true); // useCapture = true로 설정하여 기존 이벤트보다 먼저 실행
    });

    log('탭 클릭 이벤트 설정 완료');
  }

  // ============================================
  // 8. VWO 이벤트 트래킹
  // ============================================
  function trackMealScheduleView() {
    try {
      // VWO 커스텀 이벤트 트래킹
      if (typeof window.VWO !== 'undefined' && window.VWO.event) {
        window.VWO.event('meal_schedule_viewed');
        log('VWO 이벤트 전송: meal_schedule_viewed');
      }

      // Google Analytics 이벤트 (있는 경우)
      if (typeof gtag !== 'undefined') {
        gtag('event', 'view_meal_schedule', {
          'event_category': 'engagement',
          'event_label': 'meal_plan_tab'
        });
      }
    } catch (e) {
      log('이벤트 트래킹 실패:', e);
    }
  }

  // ============================================
  // 9. 초기화
  // ============================================
  function init() {
    log('초기화 시작');

    // 모바일 체크
    if (!isMobile()) {
      log('모바일 환경이 아니므로 실행하지 않습니다.');
      return;
    }

    // 탭 영역이 로드될 때까지 대기
    var attemptCount = 0;
    var maxAttempts = 50; // 5초 (100ms * 50)

    var checkInterval = setInterval(function() {
      attemptCount++;

      var tabNav = document.querySelector('.fb__common-tab');
      var tabWrapper = document.querySelector('.meal-plan__tab-wrapper');

      if (tabNav && tabWrapper) {
        clearInterval(checkInterval);

        // 1. 탭 추가
        if (addMealScheduleTab()) {
          // 2. 컨텐츠 추가
          if (addMealScheduleContent()) {
            // 3. 이벤트 설정
            // 기존 탭 이벤트를 덮어쓰기 위해 약간의 지연
            setTimeout(function() {
              setupTabClickEvents();
              log('초기화 완료');
            }, 100);
          }
        }
      } else if (attemptCount >= maxAttempts) {
        clearInterval(checkInterval);
        log('탭 영역을 찾을 수 없어 초기화를 중단합니다.');
      }
    }, 100);
  }

  // ============================================
  // 10. 실행
  // ============================================
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  log('VWO 식단표 탭 스크립트 로드 완료');

})();
