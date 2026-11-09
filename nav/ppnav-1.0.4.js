/* 페인트팜 이프 길잡이 1.0.4 (2026-11-09: 우리 학교 미래 앨범 추가)
   창 폭 1432 이상: 오른쪽 목차. 그 아래: 헤더 밑 칩 바 + 왼쪽 목록 버튼.
   제품 6개·/if 허브: 아래쪽에 제품 전환 격자. 콘텐츠 상세: 같은 제품 콘텐츠 목록.
   실패하면 아무것도 그리지 않고 페이지는 그대로 둔다.
   아직 배포 전이라 이 파일을 고친다. 배포한 뒤에는 ppnav-1.0.5.js 를 새로 만들어 공통 코드의 주소만 바꾼다.
   data-route: 시안(file://) 전용 속성. 실제 페이지에서는 없다. */
(function () {
  "use strict";
  if (document.getElementById("ppnav-css")) return;

  var me = document.currentScript;
  var MOCK_ROUTE = me ? me.getAttribute("data-route") : null;

  /* 콘텐츠 표 시작
     새 콘텐츠 페이지가 생기면 해당 묶음의 items 에 한 줄만 추가한다: ["/주소", "목록 이름"]
     - 순서는 /if 허브 LINEUP 순서. 묶음이 바뀌면 허브를 기준으로 맞춘다(본문 링크 순서는 보지 않는다).
     - 이름은 허브 표기를 쓴다. 목차 글자 영역이 84px 이라 두 줄 안에 들어가게 쓰고, 말줄임은 쓰지 않는다.
     - 'AI' 단어를 넣지 않는다.
     표에 깜빡한 /if-* 페이지도 깨지지 않는다: 브레드크럼 또는 '#series' 링크로 소속을 찾아 맨 위 링크만 맞추고,
     아래쪽은 제품 전환 격자를 보여 준다. */
  var GROUPS = [
    { product: "/if-c", name: "이프C", items: [
      ["/if-digital-guestbook", "디지털 방명록"],
      ["/if-unified-guestbook", "통합 방명록"],
      ["/if-paint-q", "Paint-Q"],
      ["/if-pq-magic-sketch", "매직 스케치 × 미래 직무"],
      ["/if-pq-magic-invention", "매직 스케치 × 미래 발명품"],
      ["/if-future-city", "내가 쓰는 미래도시"],
      ["/if-school-album", "우리 학교 미래 앨범"],
      ["/if-arrow-escape", "화살표 탈출"],
      ["/if-train-bridge", "기차길 다리 만들기"],
      ["/if-air-hockey", "디지털 에어하키"]
    ] },
    /* 사이트 구조가 이프C > 디지털 방명록 > 연출이다 */
    { product: "/if-c", name: "이프C", head: "서명 연출", parent: ["/if-digital-guestbook", "디지털 방명록"], items: [
      ["/if-gb-grid", "5×3 그리드 + 포토존"],
      ["/if-gb-bubble", "말풍선 서명"],
      ["/if-gb-track", "영상 + 서명 Track"],
      ["/if-gb-floor", "떠다니는 서명"],
      ["/if-gb-floar", "초장축 LED 서명"],
      ["/if-gb-letter", "편지 봉투 서명"],
      ["/if-gb-lucky-draw", "서명 럭키드로우"]
    ] },
    { product: "/if-f", name: "이프F", items: [
      ["/if-digital-flower", "디지털 꽃길"],
      ["/if-digital-pond", "디지털 연못"],
      ["/if-floor-piano", "플로어 피아노"],
      ["/if-math-game", "수학 바닥게임"],
      ["/if-city-quiz", "세계도시 퀴즈"],
      ["/if-healthy-eating", "건강한 식습관"],
      ["/if-trickart-quiz", "트릭아트 퀴즈"],
      ["/if-cholesterol", "콜레스테롤 교육"],
      ["/if-heritage-sweep", "쓸어서 지키는 세계유산"],
      ["/if-coloring-step", "컬러링 스텝 챌린지"],
      ["/if-balloon-pang", "풍선팡"],
      ["/if-icon-crush", "진격의 발바닥"],
      ["/if-family-energy", "에너지 충전"],
      ["/if-liquid-tiles", "감각 액체 타일"],
      ["/if-flip-battle", "뒤집기 한판"]
    ] },
    { product: "/if-h", name: "이프H", items: [
      ["/if-digital-hiking", "디지털 하이킹"],
      ["/if-catch-10sec", "10초를 잡아라"],
      ["/if-digital-throw", "디지털 돌팔매질"],
      ["/if-number-stairs", "무량대수 계단"],
      ["/if-weight-match", "무게를 맞춰라"]
    ] },
    { product: "/if-d", name: "이프D", items: [
      ["/if-digital-globe", "디지털 지구본"],
      ["/if-interactive-globe", "인터랙티브 지구본"],
      ["/if-sphere-mapping", "종목 · 브랜드 매핑"],
      ["/if-antipode", "여기서 땅을 파면"],
      ["/if-map-distortion", "지도의 왜곡을 찾아라"],
      ["/if-moon-face", "달의 얼굴 맞추기"],
      ["/if-eclipse", "한낮의 어둠"]
    ] },
    { product: "/if-ufo", name: "이프UFO", items: [
      ["/if-gamphilago-93", "감필라고 93"],
      ["/if-gravity-war", "중력전쟁"],
      ["/if-race-mission", "레이스 미션"],
      ["/if-rhythm-battle", "리듬 대결"]
    ] },
    { product: "/if-ch", name: "이프CH", items: [
      ["/if-memory-game", "메모리게임"],
      ["/if-puzzle-slide", "피스앤슬라이드"],
      ["/if-reaction-test", "반응속도 테스트"],
      ["/if-timing-game", "타이밍 게임"],
      ["/if-lucky-roulette", "행운의 룰렛"],
      ["/if-future-me", "10년 후 나의 모습"]
    ] }
  ];
  /* 콘텐츠 표 끝 */

  /* 콘텐츠 페이지 섹션 라벨. 아는 id·제목만 목차에 넣고, 모르는 제목은 뺀다(자동 라벨은 잘림이 많았다).
     라벨은 6자 이내. 전수 표는 widgets/ppnav_labels.md. */
  var SEC_IDS = {
    intro: "소개", how: "작동 방식", features: "특징", performance: "송출 연출", fits: "활용", cases: "현장 사례",
    series: "올릴 이프", contact: "문의", whatsnew: "달라진 점", funcs: "기능", wall: "메시지 벽", ops: "운영 포인트",
    pqmodes: "운용 모드", pqmood: "행사 무드", pqcustom: "커스텀", pqfits: "활용", pqcases: "현장 사례",
    games: "게임 장르", gs: "진행 사례"
  };
  var SEC_TITLES = [
    [/어떤 (콘텐츠|게임|콘셉트)인가요/, "소개"],
    [/내 속도에 맞춰|10\.00초|공을 던져|수의 크기를|저울 위에|반구면 위에서|관람객이 직접|반구형 돔이 곧|줄 서서 기다렸다|방해꾼을 피해|장애물을 피해|음악과 리듬으로|뒤집어 짝을|밀고 맞추는|눌러!|단순해서 누구나/, "소개"],
    [/^(5×3 그리드|말풍선 서명|영상 \+ 서명|Floor|Floar|Letter|Lucky Draw)/, "연출 소개"],
    [/이렇게 진행됩니다|이렇게 즐깁니다|덮이고, 쓸고/, "진행 방식"],
    [/어떻게 구성했나|세 가지 요소의 결합|이렇게 갖춥니다/, "구성"],
    [/어떻게 작동하나/, "작동 방식"],
    [/실제 화면은/, "실제 화면"],
    [/반응 방식|밟으면 이렇게 움직입니다/, "반응 방식"],
    [/게임 플레이/, "게임 방식"],
    [/콘텐츠가 만드는 경험/, "경험"],
    [/특징$/, "특징"],
    [/무엇이 다른가/, "차별점"],
    [/왜 이 콘셉트/, "장점"],
    [/커스터마이징 포인트|유연하게 커스텀|행사에 맞춰 바꾼/, "커스텀"],
    [/운영 포인트|현장에서 조절합니다|현장에서 편합니다|현장 운영|행사 중에도 관리합니다/, "운영 포인트"],
    [/이럴 때 잘 맞습니다|언제 Track이/, "활용"],
    [/다른 행사에서는/, "다른 행사"],
    [/닿은 현장/, "현장 사례"],
    [/진행된 행사|한남대 직무|여성발명왕|대전 북페어|고창 AI 디지털 페스타/, "진행 사례"],
    [/이스포츠대회/, "대회 사례"],
    [/영상으로 보는/, "영상"],
    [/다른 연출/, "다른 연출"],
    [/어떤 이프에 올릴까요|콘텐츠가 실리는 이프/, "올릴 이프"],
    [/커스텀해 드립니다|서명 연출을 골라드립니다/, "문의"],
    [/제품 사양/, "사양"],
    [/자주 묻는 질문/, "FAQ"],
    [/같은 바닥, 다른 이야기/, "다른 버전"],
    [/6종 어류/, "어류 연출"],
    [/2가지 맵/, "맵 구성"],
    [/안동의 세계유산/, "세계유산"],
    [/몇 초에 채우느냐/, "기록 규칙"],
    [/난이도를 맞춥니다|학년에 맞춰/, "난이도"],
    [/경품이 갈립니다/, "경품"],
    [/두 가지 모드|탐색하거나, 겨루거나/, "모드"],
    [/무엇을 밟느냐|아이콘마다 점수/, "점수"],
    [/기록이 남습니다|순위가 남습니다/, "기록"],
    [/같이 맞히면 합체/, "협동"],
    [/칸마다 색과 점성/, "칸 구성"],
    [/잔잔한 배경음/, "배경음"],
    [/학습판도 있습니다/, "학습판"],
    [/두 개의 선/, "학습 포인트"],
    [/같은 돔으로 이어/, "시리즈"],
    [/구체라면 무엇이든/, "활용 범위"],
    [/준비한 수량만큼/, "당첨 방식"],
    [/결과마다 연출이/, "결과 연출"],
    [/아케이드 버튼을/, "버튼 연결"],
    [/한 번 더 꾸밉니다/, "꾸미기"],
    [/바로 참여합니다/, "참여 방식"],
    [/우주에서 본 달|지구 중심을 지나는 선|실제 크기를 겹쳐|올려다본 하늘|칸마다 이어져/, "소개"],
    [/다섯 가지 달|같은 하늘|실제로 더 큰 쪽|세 가지 색|판이 커질수록/, "화면"],
    [/절반이 밝습니다|반대편을 찾는 법|넓이를 버립니다|5\.1° 기울어/, "핵심 개념"]
  ];

  var RAIL_MIN = 1432;      /* 라벨 폭 104 + 여백 8 + 본문 간격 8. clientWidth 로 판정 */
  var MIN_SECTIONS = 3;     /* 제품·허브에만 적용. 콘텐츠 페이지는 섹션이 적어도 목록이 있으니 그린다 */
  var GAP = 20;             /* 착지 위치: 고정 헤더 + 칩 바 + 20 */
  var BAR_H = 45;

  /* 순서는 /if 허브 LINEUP 순서 */
  var PRODUCTS = [
    ["/if-c", "이프C"], ["/if-f", "이프F"], ["/if-h", "이프H"],
    ["/if-d", "이프D"], ["/if-ufo", "이프UFO"], ["/if-ch", "이프CH"]
  ];
  var HUB = "/if";

  /* 제품·허브 라벨 표. 첫 값: 섹션 id 또는 h2 글자 정규식.
     정규식 행의 셋째 값은 섹션에 붙일 id (id 없는 섹션이라 해시 이동에 필요). */
  var CONTACT = ["contact", "문의"], FAQ = ["faq", "FAQ"], SPEC = ["spec", "사양"], CONTENTS = ["ifcontents", "콘텐츠"];
  var PROCESS = ["process", "진행 과정"];
  var PAGES = {
    "/if": { secs: [
      [/행사는 끝나면/, "왜 필요한가", "pp-why"], [/이프가 다른 세 가지/, "차별점", "pp-diff"],
      [/목적에 맞는 인터랙션/, "목적별 선택", "pp-build"], ["lineup", "라인업"],
      [/이프가 닿은 현장/, "현장 사례", "pp-refs"], [/문의부터 철수까지/, "진행 과정", "pp-process"],
      [/자주 묻는 질문/, "FAQ", "pp-faq"], [/차별화된 기획/, "문의", "pp-contact"]
    ] },
    "/if-c": { secs: [["modes", "서명 연출"], CONTENTS, ["why", "차별점"], ["refs", "현장 사례"], SPEC, PROCESS, FAQ, CONTACT] },
    "/if-f": { secs: [["fun", "특징"], ["contents", "기본·커스텀"], ["how", "설치 과정"], ["cases", "현장 사례"], CONTENTS, SPEC, FAQ, CONTACT] },
    "/if-h": { secs: [["pillars", "차별점"], ["modes", "즐기는 법"], ["cases", "현장 사례"], CONTENTS, SPEC, FAQ, CONTACT] },
    "/if-d": { secs: [["why", "차별점"], ["usecase", "활용"], ["refs", "현장 사례"], CONTENTS, SPEC, FAQ, CONTACT] },
    "/if-ufo": { secs: [["why", "차별점"], ["refs", "현장 사례"], CONTENTS, SPEC, PROCESS, FAQ, CONTACT] },
    "/if-ch": { secs: [["why", "차별점"], ["refs", "현장 사례"], CONTENTS, ["look", "외관"], SPEC, PROCESS, FAQ, CONTACT] }
  };

  var reduced = false, cleanup = [];

  function routeNow() { return MOCK_ROUTE || (location.pathname.replace(/\/+$/, "") || "/"); }
  function urlOf(route, hash) { return (MOCK_ROUTE ? route.slice(1) + ".html" : route) + (hash || ""); }
  function nameOf(route) {
    for (var i = 0; i < PRODUCTS.length; i++) if (PRODUCTS[i][0] === route) return PRODUCTS[i][1];
    return "";
  }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }

  function groupOf(route) {
    for (var i = 0; i < GROUPS.length; i++) {
      for (var j = 0; j < GROUPS[i].items.length; j++) if (GROUPS[i].items[j][0] === route) return GROUPS[i];
    }
    return null;
  }
  /* 표에 없는 콘텐츠 페이지의 소속: 브레드크럼, 없으면 '이 콘텐츠가 실리는 이프' 링크 */
  function findOwner() {
    var list = document.querySelectorAll('[data-widget-type="code"] .crumb a, [data-widget-type="code"] #series a');
    for (var i = 0; i < list.length; i++) {
      var m = (list[i].getAttribute("href") || "").match(/(?:^|\/)(if-[\w-]+?)(?:\.html)?(?:[?#].*)?$/);
      if (m && nameOf("/" + m[1])) return "/" + m[1];
    }
    return null;
  }

  function sections() {
    var all = [], list = document.querySelectorAll('[data-widget-type="code"] section');
    for (var i = 0; i < list.length; i++) {
      var s = list[i];
      if (!s.offsetParent || (s.parentElement && s.parentElement.closest("section"))) continue;
      var h = s.querySelector("h2");
      if (h && h.offsetParent) all.push({ sec: s, h2: h, text: (h.innerText || h.textContent || "").replace(/\s+/g, " ").trim() });
    }
    return all;
  }
  function headOf(h2) { return h2.closest(".sec-head, .head") || h2; }

  /* 콘텐츠 페이지: 화면 순서대로, 아는 id·제목만. 같은 라벨은 처음 것만 쓴다. */
  function collectAuto() {
    var out = [], seen = {};
    sections().forEach(function (a, i) {
      var label = Object.prototype.hasOwnProperty.call(SEC_IDS, a.sec.id) ? SEC_IDS[a.sec.id] : null;
      for (var j = 0; j < SEC_TITLES.length && !label; j++) if (SEC_TITLES[j][0].test(a.text)) label = SEC_TITLES[j][1];
      if (!label || seen[label]) return;
      seen[label] = 1;
      if (!a.sec.id) a.sec.id = "pp-s" + i;
      out.push({ sec: a.sec, head: headOf(a.h2), label: label, id: a.sec.id });
    });
    return out;
  }

  function collect(spec) {
    var all = sections();
    var out = [];
    spec.forEach(function (row) {
      var hit = null;
      for (var j = 0; j < all.length && !hit; j++) {
        var a = all[j];
        if (typeof row[0] === "string" ? a.sec.id === row[0] : row[0].test(a.text)) hit = a;
      }
      if (!hit) return;
      if (!hit.sec.id) hit.sec.id = row[2];
      out.push({ sec: hit.sec, head: headOf(hit.h2), label: row[1], id: hit.sec.id });
    });
    return out;
  }

  /* 칩 바 위치와 착지 계산에 쓰는 '스크롤 후 고정 헤더 높이'. 실측이 없으면 폭별 실측 표를 쓴다. */
  function fixedHeader() {
    var c = document.querySelectorAll(".new_fixed_header, .scroll-to-fixed-fixed"), best = 0;
    for (var i = 0; i < c.length; i++) {
      var r = c[i].getBoundingClientRect(), s = getComputedStyle(c[i]);
      if (s.position === "fixed" && Math.abs(r.top) < 2 && r.height > 20 && +s.opacity > 0 && s.visibility !== "hidden") best = Math.max(best, r.bottom);
    }
    if (best) return best;
    var w = document.documentElement.clientWidth;
    return w >= 1025 ? 60 : w >= 992 ? 51.1 : w >= 767 ? 55.8 : 65.4;
  }
  function headerNow() {
    var w = document.getElementById("doz_header_wrap");
    return Math.max(w ? w.getBoundingClientRect().bottom : 0, fixedHeader());
  }

  function rgbOf(c) {
    var m = (c || "").match(/[\d.]+/g);
    return m && m.length >= 3 ? { r: +m[0], g: +m[1], b: +m[2], a: m.length > 3 ? +m[3] : 1 } : null;
  }
  function lum(c) {
    var a = [c.r, c.g, c.b].map(function (v) { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); });
    return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
  }
  function contrast(a, b) { var x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); }

  function theme() {
    var root = document.querySelector(".ifpg, .ifhub, .ppm3");
    if (!root) throw new Error("no root");
    var cs = getComputedStyle(root), bg = rgbOf(cs.backgroundColor);
    if (!bg || bg.a < 0.5) bg = { r: 255, g: 255, b: 255, a: 1 };
    var dark = lum(bg) < 0.2;
    var surface = "rgba(" + bg.r + "," + bg.g + "," + bg.b + "," + (dark ? 0.9 : 0.96) + ")";
    var on = dark ? "#F4F1EA" : "#141414", text = dark ? "rgba(244,241,234,.72)" : "rgba(20,20,20,.68)";
    var kick = root.querySelector(".eyebrow, .kick, .tag"), accent = kick ? rgbOf(getComputedStyle(kick).color) : null;
    var acc = accent && contrast(accent, bg) >= 2 ? "rgb(" + accent.r + "," + accent.g + "," + accent.b + ")" : on;
    return {
      surface: surface, solid: "rgb(" + bg.r + "," + bg.g + "," + bg.b + ")", on: on, text: text, accent: acc,
      line: dark ? "rgba(244,241,234,.16)" : "rgba(20,20,20,.12)",
      tint: dark ? "rgba(244,241,234,.1)" : "rgba(20,20,20,.06)",
      shadow: dark ? "0 6px 24px rgba(0,0,0,.34)" : "0 6px 24px rgba(0,0,0,.12)"
    };
  }

  function css(t) {
    return "" +
      ".ifpg p,.ifpg li,.ifpg h1,.ifpg h2,.ifpg h3,.ifpg h4,.ppm3 p,.ppm3 li,.ppm3 h1,.ppm3 h2,.ppm3 h3,.ppm3 h4,.ppm3 .cb,.ifhub p,.ifhub li,.ifhub h1,.ifhub h2,.ifhub h3,.ifhub h4{word-break:keep-all;overflow-wrap:break-word}" +
      ".ppnav{--ppn-s:" + t.surface + ";--ppn-b:" + t.solid + ";--ppn-l:" + t.line + ";--ppn-t:" + t.text + ";--ppn-o:" + t.on + ";--ppn-a:" + t.accent + ";--ppn-c:" + t.tint + ";--ppn-sh:" + t.shadow + ";" +
      "box-sizing:border-box;position:fixed;font-family:'Pretendard Variable',Pretendard,-apple-system,'Apple SD Gothic Neo','Malgun Gothic',sans-serif;letter-spacing:-.01em;line-height:1.2;opacity:0;pointer-events:none;transition:opacity .2s ease}" +
      ".ppnav.ppnav-show,.ppnav-chips:focus-within{opacity:1}" +
      ".ppnav-chips.ppnav-show,.ppnav-chips:focus-within{pointer-events:auto}" +
      ".ppnav[hidden],.ppnav [hidden]{display:none!important}" +
      ".ppnav *{box-sizing:border-box}" +
      ".ppnav ol,.ppnav ul{list-style:none;margin:0;padding:0}.ppnav li{margin:0;padding:0}" +
      ".ppnav a,.ppnav button{display:flex;align-items:center;color:var(--ppn-t);text-decoration:none;white-space:nowrap;font:inherit;font-weight:500;letter-spacing:inherit;-webkit-tap-highlight-color:transparent;transition:color .12s ease,background-color .12s ease}" +
      ".ppnav a:hover,.ppnav button:hover{color:var(--ppn-o);text-decoration:none}" +
      ".ppnav a[aria-current]{color:var(--ppn-o);font-weight:700}" +
      ".ppnav a:focus-visible,.ppnav button:focus-visible{outline:2px solid var(--ppn-a)!important;outline-offset:-2px!important}" +
      /* 오른쪽 목차: 위 고정 헤더와 아래 채널톡 버튼 사이 띠 안에서 가운데 */
      ".ppnav-rail{z-index:900;top:72px;bottom:151px;right:8px;width:104px;display:flex;align-items:center;pointer-events:none}" +
      ".ppnav-panel{pointer-events:auto;width:100%;max-height:100%;display:flex;flex-direction:column;background:var(--ppn-s);-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);border:1px solid var(--ppn-l);border-radius:12px;box-shadow:var(--ppn-sh);overflow:hidden}" +
      ".ppnav-panel .ppnav-up{flex:none;min-height:34px;padding:0 10px;font-size:12px;font-weight:700;color:var(--ppn-o);white-space:normal;word-break:keep-all;border-bottom:1px solid var(--ppn-l)}" +
      ".ppnav-panel .ppnav-strip{position:relative;flex:0 1 auto;min-height:0;overflow-y:auto;scrollbar-width:none;padding:4px 0}" +
      ".ppnav-panel .ppnav-strip::-webkit-scrollbar{display:none}" +
      ".ppnav-panel .ppnav-strip a{min-height:30px;padding:0 8px;font-size:13px;border-left:2px solid transparent}" +
      ".ppnav-panel .ppnav-strip a[aria-current]{border-left-color:var(--ppn-a)}" +
      ".ppnav-panel .ppnav-grid{flex:none;display:grid;grid-template-columns:1fr 1fr;gap:2px;padding:4px;border-top:1px solid var(--ppn-l)}" +
      ".ppnav-panel .ppnav-grid a{justify-content:center;min-height:26px;border-radius:6px;font-size:11.5px;letter-spacing:-.03em}" +
      ".ppnav-panel .ppnav-grid a:hover{background:var(--ppn-c)}" +
      ".ppnav-panel .ppnav-grid a[aria-current]{background:var(--ppn-c);box-shadow:inset 0 0 0 1px var(--ppn-a)}" +
      ".ppnav-panel .ppnav-top,.ppnav-panel .ppnav-other{flex:none;min-height:30px;padding:0 10px;font-size:12px;border-top:1px solid var(--ppn-l)}" +
      /* 같은 제품 콘텐츠 목록: 이 영역만 안에서 스크롤한다. 맨 위 링크와 섹션 목록은 줄어들지 않는다. */
      ".ppnav-panel.ppnav-has-sib .ppnav-strip{flex:none}" +
      ".ppnav-panel .ppnav-sib{flex:0 1 auto;min-height:0;display:flex;flex-direction:column;border-top:1px solid var(--ppn-l)}" +
      ".ppnav-panel .ppnav-sibhead{flex:none;padding:8px 10px 4px;font-size:11.5px;font-weight:700;color:var(--ppn-o);word-break:keep-all}" +
      ".ppnav-panel .ppnav-sibscroll{position:relative;flex:0 1 auto;min-height:0;overflow-y:auto;overscroll-behavior:contain;scrollbar-width:none;padding-bottom:4px}" +
      ".ppnav-panel .ppnav-sibscroll::-webkit-scrollbar{display:none}" +
      ".ppnav-panel .ppnav-sibscroll a{min-height:28px;padding:5px 8px;font-size:12.5px;line-height:1.2;white-space:normal;word-break:keep-all;border-left:2px solid transparent}" +
      ".ppnav-panel .ppnav-sibscroll a:hover{background:var(--ppn-c)}" +
      ".ppnav-panel .ppnav-sibscroll a[aria-current]{border-left-color:var(--ppn-a);background:var(--ppn-c)}" +
      /* 더 있는 쪽을 흐리게 해서 스크롤 영역임을 알린다 */
      ".ppnav-fade{--ppn-ft:0px;--ppn-fb:0px;-webkit-mask-image:linear-gradient(to bottom,transparent,#000 var(--ppn-ft),#000 calc(100% - var(--ppn-fb)),transparent);mask-image:linear-gradient(to bottom,transparent,#000 var(--ppn-ft),#000 calc(100% - var(--ppn-fb)),transparent)}" +
      ".ppnav-fade.ppnav-less{--ppn-ft:16px}.ppnav-fade.ppnav-more{--ppn-fb:28px}" +
      "@media (max-height:760px){.ppnav-panel .ppnav-strip a{min-height:26px}.ppnav-panel .ppnav-up{min-height:30px}.ppnav-panel .ppnav-top,.ppnav-panel .ppnav-other{min-height:26px}.ppnav-panel .ppnav-grid a{min-height:24px}.ppnav-panel .ppnav-sibhead{padding-top:6px;padding-bottom:3px}.ppnav-panel .ppnav-sibscroll a{min-height:26px;padding-top:4px;padding-bottom:4px}.ppnav-panel .ppnav-fade.ppnav-less{--ppn-ft:10px}.ppnav-panel .ppnav-fade.ppnav-more{--ppn-fb:18px}}" +
      /* 아주 낮은 창: 섹션 목록과 콘텐츠 목록이 나눠 줄어든다 */
      "@media (max-height:640px){.ppnav-panel.ppnav-has-sib .ppnav-strip{flex:0 1 auto;min-height:52px}.ppnav-panel .ppnav-sib{min-height:80px}}" +
      /* 칩 바 */
      ".ppnav-chips{z-index:998;left:0;right:0;top:0;height:" + BAR_H + "px;display:flex;align-items:stretch;background:var(--ppn-s);-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);border-bottom:1px solid var(--ppn-l)}" +
      ".ppnav-menu{flex:none;position:relative;display:flex;border-right:1px solid var(--ppn-l)}" +
      ".ppnav-btn{height:100%;min-width:44px;padding:0 12px;gap:5px;background:none;border:0;border-radius:0;box-shadow:none;margin:0;cursor:pointer;font-size:13px;font-weight:700!important;color:var(--ppn-o)!important}" +
      ".ppnav-btn i{display:block;font-style:normal;font-size:10px;line-height:1;transition:transform .12s ease}" +
      ".ppnav-btn[aria-expanded=true] i{transform:rotate(180deg)}" +
      ".ppnav-list{position:absolute;top:100%;left:0;margin-top:1px;min-width:188px;display:flex;flex-direction:column;background:var(--ppn-b);border:1px solid var(--ppn-l);border-left:0;border-radius:0 0 12px 0;box-shadow:var(--ppn-sh);overflow:hidden}" +
      ".ppnav-list.ppnav-has-sib{width:236px;max-width:calc(100vw - 32px)}" +
      ".ppnav-lscroll{position:relative;flex:0 1 auto;min-height:0;overflow-y:auto;overscroll-behavior:contain;-webkit-overflow-scrolling:touch;padding:4px 0}" +
      ".ppnav-lfoot{flex:none;padding:4px 0!important;border-top:1px solid var(--ppn-l)}" +
      ".ppnav-list a{min-height:46px;padding:6px 16px;font-size:14px;white-space:normal;word-break:keep-all;border-left:2px solid transparent}" +
      ".ppnav-list a:hover{background:var(--ppn-c)}" +
      ".ppnav-list a[aria-current]{border-left-color:var(--ppn-a);background:var(--ppn-c)}" +
      ".ppnav-list .ppnav-sep{border-bottom:1px solid var(--ppn-l);margin-bottom:4px;padding-bottom:4px}" +
      ".ppnav-chips .ppnav-strip{position:relative;flex:1;min-width:0;overflow-x:auto;scrollbar-width:none;-webkit-overflow-scrolling:touch}" +
      ".ppnav-chips .ppnav-strip::-webkit-scrollbar{display:none}" +
      ".ppnav-chips .ppnav-strip{--ppn-fl:0px;--ppn-fr:0px;-webkit-mask-image:linear-gradient(to right,transparent,#000 var(--ppn-fl),#000 calc(100% - var(--ppn-fr)),transparent);mask-image:linear-gradient(to right,transparent,#000 var(--ppn-fl),#000 calc(100% - var(--ppn-fr)),transparent)}" +
      ".ppnav-chips .ppnav-strip.ppnav-less{--ppn-fl:20px}.ppnav-chips .ppnav-strip.ppnav-more{--ppn-fr:28px}" +
      ".ppnav-chips ol{display:flex;align-items:stretch;height:100%;width:max-content;margin:0 auto}" +
      ".ppnav-chips ol a{height:100%;min-width:44px;justify-content:center;padding:0 12px;font-size:13px;border-bottom:2px solid transparent}" +
      ".ppnav-chips ol a[aria-current]{border-bottom-color:var(--ppn-a)}" +
      "@media (prefers-reduced-motion:reduce){.ppnav,.ppnav a,.ppnav button,.ppnav-btn i{transition:none}}" +
      "@media print{.ppnav{display:none!important}}";
  }

  /* 스크롤 후 고정 헤더 로고는 링크가 아니다. 제자리 헤더 로고와 같은 주소로 덮개 링크를 얹는다. */
  function linkFixedLogo() {
    var box = document.querySelector('._new_fixed_header [data-widget-type="inline_image"] .img_container');
    var src = document.querySelector("._new_org_header a img");
    if (!box || box.closest("a") || !src) return;
    var from = src.closest("a"), a = document.createElement("a");
    a.className = "ppnav-logo";
    a.href = from.getAttribute("href") || "/";
    if (from.getAttribute("target")) { a.target = from.getAttribute("target"); a.rel = "noopener"; }
    a.setAttribute("aria-label", "페인트팜 홈");
    a.style.cssText = "position:absolute;left:0;top:0;right:0;bottom:0;z-index:5;display:block";
    if (getComputedStyle(box).position === "static") box.style.position = "relative";
    box.appendChild(a);
    cleanup.push(function () { a.remove(); });
  }

  function init() {
    var route = routeNow(), page = PAGES[route] || null, group = page ? null : groupOf(route);
    var owner = group ? group.product : null;
    if (!page && !group) {
      /* 표에 없는 페이지: 소속 제품을 찾을 수 있는 콘텐츠만 그린다 */
      if (route.indexOf("/if-") !== 0) return;
      owner = findOwner();
      if (!owner) return;
    }
    var items = page ? collect(page.secs) : collectAuto();
    if (page && items.length < MIN_SECTIONS) return;

    var doc = document.documentElement;
    var t = theme();
    var st = document.createElement("style");
    st.id = "ppnav-css";
    st.textContent = css(t);
    document.head.appendChild(st);
    cleanup.push(function () { st.remove(); });

    var currentProduct = owner || (nameOf(route) ? route : null);
    var ownerName = owner ? nameOf(owner) : "";
    var ownerUrl = owner ? urlOf(owner, "#ifcontents") : "";
    var lineupUrl = urlOf(HUB, "#lineup");
    var head = group ? (group.head || ownerName + " 콘텐츠") : "";
    var upHtml = "";
    if (group && group.parent) upHtml = '<a class="ppnav-up" href="' + urlOf(group.parent[0]) + '" aria-label="' + esc(group.parent[1]) + ' 페이지로">‹ ' + esc(group.parent[1]) + "</a>";
    else if (owner) upHtml = '<a class="ppnav-up" href="' + ownerUrl + '" aria-label="' + esc(ownerName) + ' 콘텐츠 목록으로">‹ ' + esc(ownerName) + "</a>";
    else if (route !== HUB) upHtml = '<a class="ppnav-up" href="' + lineupUrl + '" aria-label="이프 시리즈 전체 보기">‹ 이프 시리즈</a>';

    var secLinks = items.map(function (it) { return '<li><a href="#' + esc(it.id) + '" data-id="' + esc(it.id) + '">' + esc(it.label) + "</a></li>"; }).join("");
    var gridLinks = group ? "" : PRODUCTS.map(function (p) {
      var cur = p[0] === currentProduct;
      return '<li><a href="' + urlOf(p[0]) + '"' + (cur ? ' aria-current="' + (owner ? "true" : "page") + '"' : "") + (p[0] === route ? " data-self" : "") + ">" + esc(p[1]) + "</a></li>";
    }).join("");
    var sibLinks = group ? group.items.map(function (r) {
      var self = r[0] === route;
      return '<li><a href="' + urlOf(r[0]) + '"' + (self ? ' aria-current="page" data-self' : "") + ">" + esc(r[1]) + "</a></li>";
    }).join("") : "";

    /* 오른쪽 목차 */
    var rail = document.createElement("nav");
    rail.className = "ppnav ppnav-rail";
    rail.setAttribute("aria-label", "이프 길잡이");
    rail.innerHTML = '<div class="ppnav-panel' + (group ? " ppnav-has-sib" : "") + '">' + upHtml +
      (items.length ? '<div class="ppnav-strip"><ol>' + secLinks + "</ol></div>" : "") +
      (group
        ? '<div class="ppnav-sib"><div class="ppnav-sibhead" id="ppnav-sibhead">' + esc(head) + "</div>" +
          '<div class="ppnav-sibscroll ppnav-fade"><ul aria-labelledby="ppnav-sibhead">' + sibLinks + "</ul></div></div>" +
          '<a class="ppnav-other" href="' + lineupUrl + '">다른 이프 보기</a>'
        : '<ul class="ppnav-grid" aria-label="이프 제품">' + gridLinks + "</ul>") +
      '<a class="ppnav-top" href="#" data-top>↑ 맨 위로</a></div>';

    /* 칩 바 */
    var bar = document.createElement("nav");
    bar.className = "ppnav ppnav-chips";
    bar.setAttribute("aria-label", "이프 길잡이");
    var listHtml;
    if (group) {
      listHtml = '<div class="ppnav-lscroll ppnav-fade"><ul aria-label="' + esc(head) + '">' + sibLinks + "</ul></div>" +
        '<ul class="ppnav-lfoot">' +
        (group.parent ? '<li><a href="' + urlOf(group.parent[0]) + '">' + esc(group.parent[1]) + " 보기</a></li>" : "") +
        '<li><a href="' + ownerUrl + '">' + esc(ownerName) + " 보기</a></li>" +
        '<li><a href="' + lineupUrl + '">다른 이프 보기</a></li></ul>';
    } else {
      var listTop = "";
      if (owner) listTop += '<li><a href="' + ownerUrl + '">‹ ' + esc(ownerName) + " 콘텐츠 목록</a></li>";
      listTop += '<li class="ppnav-sep"><a href="' + lineupUrl + '"' + (route === HUB ? ' data-id="lineup"' : "") + ">전체 보기</a></li>";
      listHtml = '<div class="ppnav-lscroll"><ul>' + listTop + gridLinks + "</ul></div>";
    }
    bar.innerHTML = '<div class="ppnav-menu">' +
      '<button type="button" class="ppnav-btn" aria-expanded="false" aria-controls="ppnav-list">' + esc(group ? head : "이프 시리즈") + '<i aria-hidden="true">▾</i></button>' +
      '<div class="ppnav-list' + (group ? " ppnav-has-sib" : "") + '" id="ppnav-list" hidden>' + listHtml + "</div></div>" +
      '<div class="ppnav-strip"><ol><li><a href="#" data-top>↑ 위로</a></li>' + secLinks + "</ol></div>";

    document.body.insertBefore(bar, document.body.firstChild);
    document.body.insertBefore(rail, document.body.firstChild);
    cleanup.push(function () { rail.remove(); bar.remove(); });
    linkFixedLogo();

    var btn = bar.querySelector(".ppnav-btn"), list = bar.querySelector(".ppnav-list");
    /* 브레드크럼이 헤더 바로 밑에 있는 페이지: 칩 바가 가리지 않게 브레드크럼이 지나간 뒤에 보인다 */
    var crumb = document.querySelector('[data-widget-type="code"] .crumb');
    var railStrip = rail.querySelector(".ppnav-strip"), barStrip = bar.querySelector(".ppnav-strip");
    var sibScroll = rail.querySelector(".ppnav-sibscroll"), listScroll = bar.querySelector(".ppnav-lscroll");
    var links = rail.querySelectorAll("a[data-id]"), chipLinks = barStrip.querySelectorAll("a[data-id]");
    var isRail = true, barH = 0, activeId = null, ticking = false, lastZ = 1, jumpSeq = 0;

    function closeList(focusBack) {
      if (list.hidden) return;
      list.hidden = true;
      btn.setAttribute("aria-expanded", "false");
      if (focusBack) btn.focus();
    }
    function zoomOf() { return parseFloat(getComputedStyle(document.body).zoom) || 1; }

    function applyForm() {
      isRail = doc.clientWidth >= RAIL_MIN;
      rail.hidden = !isRail;
      bar.hidden = isRail;
      barH = isRail ? 0 : BAR_H;
      if (isRail) closeList(false);
    }
    function measure() {
      var z = zoomOf();
      lastZ = z;
      /* 767~1024 의 body zoom .85 를 칩 바 안에서 되돌려 44px 터치 높이를 지킨다. */
      bar.style.zoom = z === 1 ? "" : String(1 / z);
      var m = (fixedHeader() + barH + GAP) / z;
      items.forEach(function (it) { it.head.style.scrollMarginTop = m + "px"; });
    }
    /* .reveal 이 올라오는 중이면 transform 만큼 빼고 재야 착지가 밀리지 않는다 */
    function layoutTop(el) {
      var top = el.getBoundingClientRect().top, m = (getComputedStyle(el).transform || "").match(/^matrix\((.+)\)$/);
      if (m) top -= (parseFloat(m[1].split(",")[5]) || 0) * lastZ;
      return top;
    }
    function targetY(it) { return Math.max(0, layoutTop(it.head) + scrollY - (fixedHeader() + barH + GAP)); }

    function moreHint() {
      barStrip.classList.toggle("ppnav-more", barStrip.scrollWidth - barStrip.clientWidth - barStrip.scrollLeft > 4);
      barStrip.classList.toggle("ppnav-less", barStrip.scrollLeft > 4);
    }
    function fadeHint(el) {
      if (!el || !el.classList.contains("ppnav-fade")) return;
      el.classList.toggle("ppnav-more", el.scrollHeight - el.clientHeight - el.scrollTop > 4);
      el.classList.toggle("ppnav-less", el.scrollTop > 4);
    }
    /* 현재 콘텐츠가 목록 가운데 오게 한다 */
    function showCurrent(el) {
      if (!el) return;
      var a = el.querySelector("a[aria-current]");
      if (a) el.scrollTop = a.offsetTop - (el.clientHeight - a.offsetHeight) / 2;
      fadeHint(el);
    }
    function setActive(id) {
      if (id === activeId) return;
      activeId = id;
      function mark(nodes, strip, keep) {
        for (var i = 0; i < nodes.length; i++) {
          if (nodes[i].getAttribute("data-id") === id) {
            nodes[i].setAttribute("aria-current", "location");
            keep(nodes[i], strip);
          } else nodes[i].removeAttribute("aria-current");
        }
      }
      mark(links, railStrip, function (a, s) {
        if (!isRail || !s) return;
        if (a.offsetTop < s.scrollTop) s.scrollTop = a.offsetTop - 4;
        else if (a.offsetTop + a.offsetHeight > s.scrollTop + s.clientHeight) s.scrollTop = a.offsetTop + a.offsetHeight - s.clientHeight + 4;
      });
      mark(chipLinks, barStrip, function (a, s) {
        if (isRail) return;
        var x = a.parentNode.offsetLeft - (s.clientWidth - a.offsetWidth) / 2;
        s.scrollTo({ left: Math.max(0, x), behavior: reduced ? "auto" : "smooth" });
      });
    }
    /* 목차를 누른 항목은 짧은 섹션이어도, 그 자리에 머무는 동안 현재 항목으로 둔다 */
    var pinned = null;
    function update() {
      ticking = false;
      var y = scrollY, vh = innerHeight, top = isRail ? fixedHeader() : headerNow();
      if (!isRail) {
        bar.style.top = top + "px";
        var show = !crumb || crumb.getBoundingClientRect().bottom <= top;
        if (show !== bar.classList.contains("ppnav-show")) {
          bar.classList.toggle("ppnav-show", show);
          if (!show) closeList(false);
        }
      }
      if (!items.length) return;
      if (pinned && Math.abs(y - targetY(pinned)) <= 8) { setActive(pinned.id); return; }
      var probe = top + barH + (vh - top - barH) * 0.3, cur = null;
      for (var i = 0; i < items.length; i++) if (items[i].sec.getBoundingClientRect().top <= probe) cur = items[i].id;
      if (cur) {
        var last = items[items.length - 1];
        if (cur === last.id && last.sec.getBoundingClientRect().bottom < probe) cur = null;
      }
      if (y + vh >= doc.scrollHeight - 2 && items[items.length - 1].sec.getBoundingClientRect().bottom > vh * 0.5) cur = items[items.length - 1].id;
      setActive(cur);
    }
    function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(update); } }

    function scrollToY(y, smooth) {
      window.scrollTo({ top: y, behavior: smooth && !reduced ? "smooth" : "instant" });
    }
    function jump(it, opts) {
      opts = opts || {};
      var y = targetY(it), dy = y - scrollY, vh = innerHeight;
      if (reduced || opts.instant) scrollToY(y, false);
      else {
        if (Math.abs(dy) > vh * 2) scrollToY(y - (dy > 0 ? 1 : -1) * vh * 0.8, false);
        scrollToY(y, true);
      }
      /* 지연 로딩으로 위치가 밀리면 다시 맞춘다. 사용자가 그새 움직이거나 다른 곳을 누르면 그만둔다. */
      var mine = ++jumpSeq, tries = 0;
      (function fix() {
        setTimeout(function () {
          if (mine !== jumpSeq) return;
          var want = targetY(it);
          if (Math.abs(want - scrollY) > 4 && tries++ < 3) { scrollToY(want, false); fix(); }
          else if (tries === 0) { if (Math.abs(want - scrollY) > 4) fix(); }
        }, tries === 0 ? 900 : 400);
      })();
      if (opts.focus) {
        it.head.setAttribute("tabindex", "-1");
        it.head.style.outline = "none";
        it.head.focus({ preventScroll: true });
      }
    }
    function toTop() {
      jumpSeq++;
      pinned = null;
      window.scrollTo({ top: 0, behavior: reduced ? "instant" : "smooth" });
    }
    function cancelJump() { jumpSeq++; pinned = null; }

    function onNavClick(e) {
      var a = e.target.closest && e.target.closest("a");
      if (!a) return;
      if (a.hasAttribute("data-top") || a.hasAttribute("data-self")) {
        e.preventDefault();
        closeList(false);
        toTop();
        return;
      }
      var id = a.getAttribute("data-id");
      if (!id) { closeList(false); return; }
      var it = items.filter(function (x) { return x.id === id; })[0];
      if (!it) return;
      e.preventDefault();
      closeList(false);
      try { history.replaceState(null, "", "#" + id); } catch (err) { /* file:// 등 */ }
      jump(it, { focus: e.detail === 0 });
      pinned = it;
      setActive(id);
    }
    rail.addEventListener("click", onNavClick);
    bar.addEventListener("click", onNavClick);
    /* 본문의 '#섹션' 링크도 같은 위치에 내려앉게 한다. 그대로 두면 칩 바가 섹션 머리를 가린다. */
    document.addEventListener("click", function (e) {
      var a = e.target.closest && e.target.closest('a[href^="#"]');
      if (!a || a.closest(".ppnav")) return;
      var id = a.getAttribute("href").slice(1);
      var it = items.filter(function (x) { return x.id === id; })[0];
      if (!it) return;
      e.preventDefault();
      jump(it, { focus: e.detail === 0 });
      pinned = it;
      setActive(id);
    });
    btn.addEventListener("click", function () {
      var open = list.hidden;
      list.hidden = !open;
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      if (open) {
        /* 목록이 화면 아래로 넘치지 않게 하고, 넘치면 안에서 스크롤한다 */
        list.style.maxHeight = Math.max(180, innerHeight - list.getBoundingClientRect().top - 48) + "px";
        showCurrent(listScroll);
      }
    });
    document.addEventListener("pointerdown", function (e) {
      if (!list.hidden && !(e.target.closest && e.target.closest(".ppnav-menu"))) closeList(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !list.hidden) closeList(true);
    });
    barStrip.addEventListener("scroll", moreHint, { passive: true });
    [sibScroll, listScroll].forEach(function (el) {
      if (el) el.addEventListener("scroll", function () { fadeHint(el); }, { passive: true });
    });

    function relayout() { applyForm(); measure(); moreHint(); if (isRail) showCurrent(sibScroll); onScroll(); }
    relayout();
    update();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { if (isRail) showCurrent(sibScroll); });
    rail.classList.add("ppnav-show");
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", relayout);
    window.addEventListener("wheel", cancelJump, { passive: true });
    window.addEventListener("touchmove", cancelJump, { passive: true });

    if (location.hash.length > 1) {
      var hit = items.filter(function (x) { return "#" + x.id === location.hash; })[0];
      if (hit) setTimeout(function () { jump(hit, { instant: true }); }, 400);
    }
  }

  function start() {
    try {
      reduced = !!(window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches);
      init();
    } catch (e) {
      try { cleanup.forEach(function (f) { f(); }); } catch (e2) { /* 그대로 둔다 */ }
    }
  }
  if (document.readyState === "complete") start();
  else window.addEventListener("load", start);
})();
