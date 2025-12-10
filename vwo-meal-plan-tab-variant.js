/**
 * VWO A/B Test - 식단표 탭 추가 Variant
 * 목표: 상품상세페이지에 "식단표" 탭을 추가하여 CTA 클릭율 개선
 * 대상: 모바일 웹 (https://www.foodcare-cle.com/shop/mealPlan/E/103)
 */

(function() {
  'use strict';

  // ============================================
  // 1. 식단표 탭 버튼 추가
  // ============================================
  function addMealPlanTab() {
    // 탭 네비게이션 영역 찾기
    var tabNav = document.querySelector('.fb__common-tab');
    if (!tabNav) {
      console.error('[VWO] 탭 네비게이션을 찾을 수 없습니다.');
      return false;
    }

    // 이미 식단표 탭이 추가되어 있는지 확인
    if (document.querySelector('.js__tab--meal-schedule')) {
      return true;
    }

    // 식단표 탭 버튼 생성
    var mealScheduleTab = document.createElement('span');
    mealScheduleTab.className = 'fb__common-tab__section js__tab js__tab--meal-schedule';
    mealScheduleTab.innerHTML = '<span class="fb__common-tab__text">식단표</span>';

    // 두 번째 탭(정기식단 후기) 뒤에 추가
    var secondTab = tabNav.querySelectorAll('.js__tab')[1];
    if (secondTab && secondTab.nextSibling) {
      tabNav.insertBefore(mealScheduleTab, secondTab.nextSibling);
    } else {
      tabNav.appendChild(mealScheduleTab);
    }

    return true;
  }

  // ============================================
  // 2. 식단표 컨텐츠 영역 추가
  // ============================================
  function addMealScheduleContent() {
    var tabWrapper = document.querySelector('.meal-plan__tab-wrapper');
    if (!tabWrapper) {
      console.error('[VWO] 탭 래퍼를 찾을 수 없습니다.');
      return false;
    }

    // 이미 식단표 컨텐츠가 추가되어 있는지 확인
    if (document.querySelector('.js__tab__content--meal-schedule')) {
      return true;
    }

    // 식단표 컨텐츠 영역 생성
    var mealScheduleContent = document.createElement('div');
    mealScheduleContent.className = 'meal-plan__tab-content js__tab__content js__tab__content--meal-schedule';
    mealScheduleContent.innerHTML = '<div class="meal-schedule-loading" style="text-align: center; padding: 40px 0;">식단표를 불러오는 중...</div>';

    // 마지막 탭 컨텐츠 뒤에 추가
    tabWrapper.appendChild(mealScheduleContent);

    // 식단표 데이터 로드
    loadMealScheduleData();

    return true;
  }

  // ============================================
  // 3. 식단표 데이터 로드
  // ============================================
  function loadMealScheduleData() {
    var contentArea = document.querySelector('.js__tab__content--meal-schedule');
    if (!contentArea) return;

    // 기존 페이지의 식단표 데이터 찾기 시도
    // (현재 페이지에 식단표 데이터가 없을 수 있으므로 AJAX로 가져와야 할 수 있음)

    // 임시로 iframe으로 다음 페이지 로드 시도
    var iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = window.location.href; // 같은 페이지 (실제로는 다음 단계 페이지 URL 필요)

    iframe.onload = function() {
      try {
        var iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
        var mealScheduleData = iframeDoc.querySelector('#module-dailyMenu');

        if (mealScheduleData) {
          // 식단표 HTML 복사
          contentArea.innerHTML = mealScheduleData.outerHTML;

          // CSS도 함께 로드
          var mealScheduleCSS = iframeDoc.querySelector('link[href*="dailyMenu.css"]');
          if (mealScheduleCSS && !document.querySelector('link[href*="dailyMenu.css"]')) {
            document.head.appendChild(mealScheduleCSS.cloneNode(true));
          }

          // JavaScript도 함께 로드
          var mealScheduleJS = iframeDoc.querySelector('script[src*="dailyMenu.js"]');
          if (mealScheduleJS && !document.querySelector('script[src*="dailyMenu.js"]')) {
            var script = document.createElement('script');
            script.src = mealScheduleJS.src;
            document.body.appendChild(script);
          }
        } else {
          // 식단표 데이터를 찾을 수 없으면 기본 메시지 표시
          contentArea.innerHTML = createDefaultMealSchedule();
        }
      } catch (e) {
        console.error('[VWO] 식단표 데이터 로드 실패:', e);
        // CORS 에러 등으로 iframe 접근 불가 시 기본 컨텐츠 표시
        contentArea.innerHTML = createDefaultMealSchedule();
      } finally {
        // iframe 제거
        document.body.removeChild(iframe);
      }
    };

    iframe.onerror = function() {
      contentArea.innerHTML = createDefaultMealSchedule();
      document.body.removeChild(iframe);
    };

    document.body.appendChild(iframe);
  }

  // ============================================
  // 4. 기본 식단표 HTML 생성 (폴백)
  // ============================================
  function createDefaultMealSchedule() {
    return `
      <div class="sector-cont" style="padding: 20px;">
        <div class="sub-head-group">
          <h4 class="sub-head">요일별 식단 메뉴</h4>
        </div>
        <p class="notification" style="margin: 10px 0; font-size: 13px; color: #666;">
          식재료 수급 및 식품 적절성 평가에 따라 일부 메뉴 변경 될 수 있습니다.
        </p>
        <p class="notification" style="margin: 10px 0; font-size: 13px; color: #666;">
          · 1일 2세트 신청시 요일에 따른 다른 메뉴가 배송됩니다.<br>
          · 1일 3세트 이상부터는 메뉴가 중복됩니다.
        </p>
        <div style="text-align: center; padding: 40px 20px; background: #f5f5f5; border-radius: 8px; margin-top: 20px;">
          <p style="font-size: 14px; color: #333; margin-bottom: 15px;">
            식단표 확인을 위해서는 다음 단계로 이동해주세요
          </p>
          <button class="btn-default btn-dark" onclick="document.querySelector('.devNextStepButton').click()"
                  style="padding: 12px 30px; background: #2ecc71; color: white; border: none; border-radius: 4px; font-size: 15px; cursor: pointer;">
            다음단계로 이동
          </button>
        </div>
      </div>
    `;
  }

  // ============================================
  // 5. 탭 클릭 이벤트 처리
  // ============================================
  function setupTabClickEvents() {
    var allTabs = document.querySelectorAll('.js__tab');
    var allContents = document.querySelectorAll('.js__tab__content');

    allTabs.forEach(function(tab, index) {
      tab.addEventListener('click', function() {
        // 모든 탭과 컨텐츠에서 active 클래스 제거
        allTabs.forEach(function(t) {
          t.classList.remove('active');
        });
        allContents.forEach(function(c) {
          c.classList.remove('active');
        });

        // 클릭한 탭과 해당 컨텐츠에 active 클래스 추가
        tab.classList.add('active');
        if (allContents[index]) {
          allContents[index].classList.add('active');
        }

        // VWO 이벤트 트래킹 (선택사항)
        if (tab.classList.contains('js__tab--meal-schedule')) {
          // 식단표 탭 클릭 시
          if (typeof window._vis_opt_queue !== 'undefined') {
            window._vis_opt_queue = window._vis_opt_queue || [];
            window._vis_opt_queue.push(function() {
              _vis_opt_goal_conversion(/* Goal ID */);
            });
          }
        }
      });
    });
  }

  // ============================================
  // 6. 초기화 함수
  // ============================================
  function init() {
    // 모바일 웹인지 확인
    var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (!isMobile) {
      console.log('[VWO] 모바일 환경이 아니므로 변경을 적용하지 않습니다.');
      return;
    }

    // 탭 영역이 로드될 때까지 대기
    var checkInterval = setInterval(function() {
      var tabNav = document.querySelector('.fb__common-tab');
      if (tabNav) {
        clearInterval(checkInterval);

        // 1. 식단표 탭 추가
        if (addMealPlanTab()) {
          console.log('[VWO] 식단표 탭 버튼 추가 완료');
        }

        // 2. 식단표 컨텐츠 추가
        if (addMealScheduleContent()) {
          console.log('[VWO] 식단표 컨텐츠 영역 추가 완료');
        }

        // 3. 탭 클릭 이벤트 설정
        setupTabClickEvents();
        console.log('[VWO] 탭 클릭 이벤트 설정 완료');
      }
    }, 100);

    // 10초 후에도 탭이 없으면 중단
    setTimeout(function() {
      clearInterval(checkInterval);
    }, 10000);
  }

  // DOM 로드 완료 후 실행
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
