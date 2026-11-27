(() => {
  "use strict";

  const STORAGE_VISITED = "kids-space-visited";
  const STORAGE_INTRO = "kids-space-intro-v1";
  const TOTAL = 12;

  const BODIES = {
    galaxy: {
      id: "galaxy",
      name: "우리은하",
      kicker: "우리가 사는 별의 마을",
      accent: "#7B5CDE",
      facts: [
        "우리가 사는 태양계는 아주 큰 별의 마을, 우리은하 안에 있어요.",
        "우리은하는 소용돌이처럼 생긴 별의 무리예요.",
        "별이 수천억 개나 있어요. 셀 수 없을 만큼 많아요.",
        "우리 태양은 그 많은 별 중의 하나예요."
      ],
      fun: "밤에 하늘에서 흐릿한 띠처럼 보이는 은하수가 바로 우리은하를 옆에서 보는 모습이에요. 우리 태양계는 한가운데가 아니라, 살짝 가장자리 쪽에 있어요.",
      tempLabel: "크기",
      temp: "끝에서 끝까지, 빛으로도 약 10만 년이 걸려요.",
      travel: "너무 커서 우주선으로는 다 돌아볼 수 없어요. 그래도 우리는 이미 그 안에 살고 있어요!"
    },
    sun: {
      id: "sun",
      name: "태양",
      kicker: "우리 별",
      accent: "#F0B429",
      facts: [
        "태양은 행성이 아니에요. 스스로 빛을 내는 별이에요.",
        "지구가 100만 개 이상 들어갈 만큼 아주 커요.",
        "태양 덕분에 낮이 되고, 따뜻해지고, 식물이 자라요.",
        "태양 빛이 지구까지 오는 데 약 8분이 걸려요."
      ],
      fun: "태양 한가운데는 표면보다 훨씬 더 뜨거워요. 너무 뜨거워서 태양 위에는 내릴 수 없어요.",
      tempLabel: "온도",
      temp: "🔥🔥🔥 아주 아주 뜨거워요. 표면만 해도 약 5,500도예요.",
      travel: "가까이 가는 데도 탐사선으로 몇 년이 걸려요. 표면에는 갈 수 없어요."
    },
    mercury: {
      id: "mercury",
      name: "수성",
      kicker: "태양에서 가장 가까운 행성",
      accent: "#B8A99A",
      facts: [
        "태양에서 가장 가까운 행성이에요.",
        "지구보다 훨씬 작고, 달보다 조금 커요.",
        "낮에는 아주 덥고, 밤에는 아주 추워요.",
        "공기가 거의 없어서 하늘이 항상 깜깜해요."
      ],
      fun: "수성에서 하루는 무척 길어요. 지구로 치면 거의 여섯 달이나 돼요.",
      tempLabel: "온도",
      temp: "🔥❄️ 낮에는 뜨겁고 밤에는 추워요.",
      travel: "로켓으로 가려면 몇 년이 걸릴 수 있어요."
    },
    venus: {
      id: "venus",
      name: "금성",
      kicker: "가장 뜨거운 행성",
      accent: "#E0B15C",
      facts: [
        "태양계에서 가장 뜨거운 행성이에요.",
        "두꺼운 구름이 온 세상을 덮고 있어요.",
        "지구와 크기가 비슷해서 지구의 쌍둥이처럼 불려요.",
        "금성에서는 해가 서쪽에서 떠요."
      ],
      fun: "금성에서 하루는 1년보다 더 길어요.",
      tempLabel: "온도",
      temp: "🔥🔥🔥 제일 뜨거워요. 납도 녹을 만큼 덥대요.",
      travel: "로켓으로 약 4~5개월이 걸려요. 하지만 너무 뜨거워서 오래 있을 수는 없어요."
    },
    earth: {
      id: "earth",
      name: "지구",
      kicker: "우리 집",
      accent: "#4D8FE3",
      facts: [
        "바로 우리가 살고 있는 행성이에요.",
        "푸른 바다와 흰 구름이 있어서 우주에서 파랗게 보여요.",
        "숨을 쉴 수 있는 공기가 있어요.",
        "태양 주위를 한 바퀴 도는 데 365일이 걸려요. 그게 바로 1년이에요."
      ],
      fun: "지금까지 사람이 사는 걸 아는 행성은 지구가 유일해요. 그리고 달이 하나 있어요.",
      tempLabel: "온도",
      temp: "🌿 춥지도 너무 덥지도 않아서, 살기에 딱 좋아요.",
      travel: "우리는 이미 지구에 있어요!"
    },
    moon: {
      id: "moon",
      name: "달",
      kicker: "지구의 친구",
      accent: "#C5C7CE",
      facts: [
        "달은 행성처럼 보이지만, 지구 주위를 도는 지구의 위성이에요.",
        "스스로 빛을 내지 않고, 태양 빛을 받아 반짝여요.",
        "중력이 약해서 높이 점프하면 지구보다 훨씬 높이 올라가요.",
        "사람 로켓이 달에 가는 데는 약 3일이 걸렸어요."
      ],
      fun: "달에는 공기가 거의 없어서, 하늘이 항상 검고 별이 보여요.",
      tempLabel: "온도",
      temp: "🔥❄️ 낮에는 덥고 밤에는 추워요.",
      travel: "로켓으로 약 3일이 걸려요."
    },
    mars: {
      id: "mars",
      name: "화성",
      kicker: "붉은 행성",
      accent: "#E07A5F",
      facts: [
        "땅의 색깔 때문에 빨갛게 보여요. 붉은 행성이라고 불러요.",
        "지구보다 작아요.",
        "작은 달이 두 개 있어요.",
        "화성에서 1년은 지구로 치면 거의 2년이에요."
      ],
      fun: "옛날에 물이 흘렀던 흔적이 있어요. 그래서 과학자들이 열심히 탐험하고 있어요.",
      tempLabel: "온도",
      temp: "🥶 꽤 추워요.",
      travel: "로켓으로 약 7~8개월이 걸려요."
    },
    jupiter: {
      id: "jupiter",
      name: "목성",
      kicker: "가장 큰 행성",
      accent: "#E0A45A",
      facts: [
        "태양계에서 가장 큰 행성이에요.",
        "지구가 1,300개나 들어갈 만큼 커요.",
        "땅이 없는 가스 행성이에요. 커다란 공기로 되어 있어요.",
        "큰 빨간 점은 아주 오래된 커다란 폭풍이에요."
      ],
      fun: "달이 90개가 넘어요. 그중에는 수성보다 큰 달도 있어요.",
      tempLabel: "온도",
      temp: "🥶 구름 위는 아주 추워요.",
      travel: "로켓으로 가려면 몇 년이 걸려요."
    },
    saturn: {
      id: "saturn",
      name: "토성",
      kicker: "고리의 행성",
      accent: "#E8D4A0",
      facts: [
        "아름다운 고리가 있어요. 고리는 얼음과 돌 조각으로 되어 있어요.",
        "목성 다음으로 큰 행성이에요.",
        "아주 가벼워서, 커다란 물에 넣으면 뜰 수 있어요.",
        "달이 아주 아주 많아요."
      ],
      fun: "가장 큰 달 타이탄에는 비와 강이 있어요. 물은 아니고 특별한 액체예요.",
      tempLabel: "온도",
      temp: "🥶 아주 추워요.",
      travel: "로켓으로 약 6~7년이 걸려요."
    },
    uranus: {
      id: "uranus",
      name: "천왕성",
      kicker: "옆으로 도는 행성",
      accent: "#7FDBDA",
      facts: [
        "청록색으로 보이는 얼음 행성이에요.",
        "다른 행성들과 달리 옆으로 누워서 굴러가듯 돌아요.",
        "고리가 있지만 토성처럼 잘 보이지는 않아요.",
        "태양 주위를 한 바퀴 도는 데 지구로 84년이 걸려요."
      ],
      fun: "천왕성은 태양계에서 가장 추운 곳 중 하나예요.",
      tempLabel: "온도",
      temp: "🥶🥶 아주 아주 추워요.",
      travel: "로켓으로 약 8~9년이 걸려요."
    },
    neptune: {
      id: "neptune",
      name: "해왕성",
      kicker: "가장 먼 행성",
      accent: "#4169E1",
      facts: [
        "태양에서 가장 먼 행성이에요.",
        "깊고 푸른 파란색이에요.",
        "태양계에서 가장 빠른 바람이 불어요.",
        "1년은 지구로 치면 165년이나 돼요."
      ],
      fun: "아직 사람이 만든 탐사선이 해왕성 주위를 오래 돈 적은 없어요. 스쳐 지나간 적은 있어요.",
      tempLabel: "온도",
      temp: "🥶🥶 아주 아주 추워요.",
      travel: "로켓으로 약 12년이 걸려요."
    },
    pluto: {
      id: "pluto",
      name: "명왕성",
      kicker: "먼 곳의 작은 친구",
      accent: "#D4A574",
      facts: [
        "예전에는 아홉 번째 행성이었지만, 지금은 왜소행성이라고 불러요. 작은 행성 친구예요.",
        "달보다도 작아요.",
        "하트 모양처럼 보이는 밝은 땅이 있어요.",
        "태양 주위를 한 바퀴 도는 데 248년이 걸려요."
      ],
      fun: "명왕성에는 카론이라는 큰 친구가 있어요. 둘이 서로를 돌아요.",
      tempLabel: "온도",
      temp: "🥶🥶🥶 엄청 추워요.",
      travel: "로켓으로 약 9~10년이 걸렸어요."
    }
  };

  const PLACED = [
    { id: "mercury", size: "clamp(52px, 7.2vmin, 68px)", glow: "rgba(200,180,160,0.45)" },
    { id: "venus", size: "clamp(58px, 8vmin, 76px)", glow: "rgba(230,190,90,0.45)" },
    { id: "earth", size: "clamp(60px, 8.4vmin, 80px)", glow: "rgba(80,150,255,0.5)", hasMoon: true },
    { id: "mars", size: "clamp(54px, 7.4vmin, 70px)", glow: "rgba(224,90,60,0.5)" },
    { id: "jupiter", size: "clamp(80px, 12.5vmin, 118px)", glow: "rgba(224,160,80,0.45)" },
    { id: "saturn", size: "clamp(70px, 10.5vmin, 100px)", glow: "rgba(232,210,150,0.45)" },
    { id: "uranus", size: "clamp(58px, 8.2vmin, 80px)", glow: "rgba(127,219,218,0.45)" },
    { id: "neptune", size: "clamp(56px, 8vmin, 78px)", glow: "rgba(65,105,225,0.5)" },
    { id: "pluto", size: "clamp(48px, 6.2vmin, 58px)", glow: "rgba(212,165,116,0.4)" }
  ];

  const ORBIT_DECO = `
    <svg class="orbit-deco" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      <g class="port">
        <ellipse cx="50" cy="29" rx="24" ry="16"/>
        <ellipse cx="50" cy="29" rx="40" ry="24"/>
        <ellipse cx="50" cy="48" rx="48" ry="36"/>
        <ellipse cx="50" cy="52" rx="46" ry="44"/>
      </g>
      <g class="land">
        <ellipse cx="11" cy="52" rx="18" ry="28"/>
        <ellipse cx="18" cy="52" rx="28" ry="38"/>
        <ellipse cx="32" cy="52" rx="42" ry="42"/>
        <ellipse cx="48" cy="52" rx="56" ry="44"/>
      </g>
    </svg>`;

  const STAMP_ORDER = ["galaxy", "sun", "mercury", "venus", "earth", "moon", "mars", "jupiter", "saturn", "uranus", "neptune", "pluto"];

  const QUIZ = [
    { q: "어떤 행성이 제일 클까요?", choices: ["목성", "지구", "화성"], answer: 0 },
    { q: "우리가 살고 있는 행성은 어디일까요?", choices: ["화성", "지구", "금성"], answer: 1 },
    { q: "예쁜 고리를 가진 행성은 어디일까요?", choices: ["수성", "토성", "명왕성"], answer: 1 },
    { q: "빨갛게 보이는 행성은 어디일까요?", choices: ["화성", "해왕성", "태양"], answer: 0 },
    { q: "태양에서 가장 가까운 행성은 어디일까요?", choices: ["해왕성", "목성", "수성"], answer: 2 },
    { q: "옆으로 누워서 도는 행성은 어디일까요?", choices: ["천왕성", "지구", "달"], answer: 0 },
    { q: "태양계에서 가장 뜨거운 행성은 어디일까요?", choices: ["수성", "금성", "화성"], answer: 1 },
    { q: "달은 누구 주위를 돌까요?", choices: ["태양", "목성", "지구"], answer: 2 },
    { q: "스스로 빛을 내는 것은 무엇일까요?", choices: ["태양", "달", "지구"], answer: 0 },
    { q: "태양에서 가장 먼 행성은 어디일까요?", choices: ["금성", "해왕성", "화성"], answer: 1 },
    { q: "우리 태양계는 어디에 속해 있을까요?", choices: ["우리은하", "목성", "달"], answer: 0 },
    { q: "지구가 1,300개나 들어갈 만큼 큰 행성은?", choices: ["토성", "달", "목성"], answer: 2 }
  ];

  const $ = (id) => document.getElementById(id);

  let visited = loadVisited();
  let openId = null;
  let quizSet = [];
  let quizIndex = 0;
  let quizScore = 0;
  let quizLocked = false;

  function loadVisited() {
    try {
      const raw = JSON.parse(localStorage.getItem(STORAGE_VISITED) || "[]");
      return new Set(Array.isArray(raw) ? raw.filter((id) => BODIES[id]) : []);
    } catch {
      return new Set();
    }
  }

  function saveVisited() {
    localStorage.setItem(STORAGE_VISITED, JSON.stringify([...visited]));
  }

  function art(id, suffix) {
    const x = suffix ? "-" + suffix : "";
    const svg = {
      galaxy: `<svg viewBox="0 0 100 100" aria-hidden="true">
        <defs>
          <radialGradient id="g-core${x}" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#FFF6D0"/>
            <stop offset="35%" stop-color="#F0C56A"/>
            <stop offset="100%" stop-color="#C47A2A" stop-opacity="0"/>
          </radialGradient>
        </defs>
        <ellipse cx="50" cy="50" rx="46" ry="18" fill="none" stroke="#C9B0FF" stroke-width="5" opacity=".55" transform="rotate(-25 50 50)"/>
        <ellipse cx="50" cy="50" rx="36" ry="13" fill="none" stroke="#9B7EDE" stroke-width="6" opacity=".7" transform="rotate(-25 50 50)"/>
        <ellipse cx="50" cy="50" rx="24" ry="8" fill="none" stroke="#E2D4FF" stroke-width="4" opacity=".8" transform="rotate(-25 50 50)"/>
        <circle cx="50" cy="50" r="10" fill="url(#g-core${x})"/>
        <circle cx="78" cy="38" r="2" fill="#fff"/><circle cx="22" cy="60" r="1.6" fill="#fff"/>
        <circle cx="70" cy="62" r="1.4" fill="#FFE9A0"/><circle cx="33" cy="36" r="1.5" fill="#fff"/>
      </svg>`,
      sun: `<svg viewBox="0 0 100 100" aria-hidden="true">
        <defs>
          <radialGradient id="sun-g${x}" cx="35%" cy="32%" r="65%">
            <stop offset="0%" stop-color="#FFF6C8"/>
            <stop offset="40%" stop-color="#FFE14A"/>
            <stop offset="80%" stop-color="#FFB300"/>
            <stop offset="100%" stop-color="#FF8A00"/>
          </radialGradient>
        </defs>
        <g fill="none" stroke="#FFD56A" stroke-width="3.2" stroke-linecap="round" opacity=".85">
          <path d="M50 6v10M50 84v10M6 50h10M84 50h10M18 18l7 7M75 75l7 7M18 82l7-7M75 25l7-7"/>
        </g>
        <circle cx="50" cy="50" r="32" fill="url(#sun-g${x})"/>
        <circle cx="38" cy="42" r="6" fill="#FFFBE8" opacity=".45"/>
      </svg>`,
      mercury: `<svg viewBox="0 0 100 100" aria-hidden="true">
        <defs><radialGradient id="me-g${x}" cx="34%" cy="32%" r="70%">
          <stop offset="0%" stop-color="#E8DED2"/><stop offset="100%" stop-color="#8A7B6C"/>
        </radialGradient></defs>
        <circle cx="50" cy="50" r="42" fill="url(#me-g${x})"/>
        <circle cx="36" cy="40" r="7" fill="#7A6C60" opacity=".45"/>
        <circle cx="62" cy="34" r="4" fill="#6E6156" opacity=".4"/>
        <circle cx="58" cy="62" r="9" fill="#7A6C60" opacity=".35"/>
        <circle cx="32" cy="64" r="5" fill="#6E6156" opacity=".4"/>
      </svg>`,
      venus: `<svg viewBox="0 0 100 100" aria-hidden="true">
        <defs><radialGradient id="ve-g${x}" cx="34%" cy="30%" r="70%">
          <stop offset="0%" stop-color="#FFF1C2"/><stop offset="55%" stop-color="#E8C07A"/><stop offset="100%" stop-color="#C9953A"/>
        </radialGradient></defs>
        <circle cx="50" cy="50" r="42" fill="url(#ve-g${x})"/>
        <path d="M18 42c16-10 30-8 64 2 0 0-18 10-34 8S26 50 18 42z" fill="#F4D9A0" opacity=".55"/>
        <path d="M22 62c18 8 40 6 58-4" fill="none" stroke="#D9A85A" stroke-width="5" opacity=".35" stroke-linecap="round"/>
      </svg>`,
      earth: `<svg viewBox="0 0 100 100" aria-hidden="true">
        <defs>
          <radialGradient id="ea-g${x}" cx="36%" cy="32%" r="70%">
            <stop offset="0%" stop-color="#9FE8FF"/><stop offset="50%" stop-color="#3D8DE0"/><stop offset="100%" stop-color="#1A4F9C"/>
          </radialGradient>
        </defs>
        <circle cx="50" cy="50" r="42" fill="url(#ea-g${x})"/>
        <path fill="#4BB36A" d="M28 46c14-10 24-8 36 4 8 8 18 6 22-4 2 16-4 28-16 34-18 10-34 2-44-10-6-8-6-16 2-24z"/>
        <path fill="#57C278" d="M30 66c14 8 30 6 40-8 2 16-10 28-24 30-16 2-24-8-16-22z"/>
        <ellipse cx="36" cy="34" rx="12" ry="5" fill="#F4FBFF" opacity=".7"/>
        <ellipse cx="68" cy="58" rx="8" ry="3.5" fill="#F4FBFF" opacity=".35"/>
      </svg>`,
      moon: `<svg viewBox="0 0 100 100" aria-hidden="true">
        <defs><radialGradient id="mo-g${x}" cx="34%" cy="32%" r="70%">
          <stop offset="0%" stop-color="#F4F2EA"/><stop offset="100%" stop-color="#9A9BA4"/>
        </radialGradient></defs>
        <circle cx="50" cy="50" r="42" fill="url(#mo-g${x})"/>
        <circle cx="36" cy="40" r="10" fill="#8E8F98" opacity=".4"/>
        <circle cx="62" cy="34" r="6" fill="#7E8088" opacity=".35"/>
        <circle cx="58" cy="64" r="12" fill="#8E8F98" opacity=".3"/>
        <circle cx="30" cy="66" r="5" fill="#7E8088" opacity=".35"/>
      </svg>`,
      mars: `<svg viewBox="0 0 100 100" aria-hidden="true">
        <defs><radialGradient id="ma-g${x}" cx="34%" cy="30%" r="70%">
          <stop offset="0%" stop-color="#FFB196"/><stop offset="55%" stop-color="#D65A3A"/><stop offset="100%" stop-color="#9A2E1E"/>
        </radialGradient></defs>
        <circle cx="50" cy="50" r="42" fill="url(#ma-g${x})"/>
        <ellipse cx="50" cy="16" rx="16" ry="7" fill="#F6F3EA" opacity=".8"/>
        <path d="M28 50c10-8 20-4 28 4 8 6 16 2 20-6" fill="none" stroke="#9A2E1E" stroke-width="4" opacity=".35"/>
        <circle cx="40" cy="58" r="6" fill="#9A2E1E" opacity=".3"/>
      </svg>`,
      jupiter: `<svg viewBox="0 0 100 100" aria-hidden="true">
        <defs>
          <clipPath id="ju-c${x}"><circle cx="50" cy="50" r="44"/></clipPath>
          <radialGradient id="ju-g${x}" cx="34%" cy="30%" r="70%">
            <stop offset="0%" stop-color="#F8E0B0"/><stop offset="100%" stop-color="#C47A2A"/>
          </radialGradient>
        </defs>
        <circle cx="50" cy="50" r="44" fill="url(#ju-g${x})"/>
        <g clip-path="url(#ju-c${x})">
          <rect y="18" width="100" height="8" fill="#E8C07A" opacity=".7"/>
          <rect y="30" width="100" height="10" fill="#D4964A" opacity=".55"/>
          <rect y="46" width="100" height="7" fill="#F0D9A0"/>
          <rect y="58" width="100" height="11" fill="#C47A2A" opacity=".5"/>
          <rect y="74" width="100" height="8" fill="#E8C07A" opacity=".6"/>
          <ellipse cx="70" cy="60" rx="10" ry="7" fill="#C4482A"/>
        </g>
      </svg>`,
      saturn: `<svg viewBox="0 0 160 100" aria-hidden="true">
        <defs>
          <radialGradient id="sa-g${x}" cx="34%" cy="32%" r="70%">
            <stop offset="0%" stop-color="#FFF3C8"/><stop offset="100%" stop-color="#D4B46A"/>
          </radialGradient>
        </defs>
        <ellipse cx="80" cy="50" rx="76" ry="22" fill="none" stroke="#E8D4A0" stroke-width="8" opacity=".85"/>
        <ellipse cx="80" cy="50" rx="76" ry="22" fill="none" stroke="#C4A46A" stroke-width="2.5" opacity=".7"/>
        <circle cx="80" cy="50" r="32" fill="url(#sa-g${x})"/>
        <path d="M20 56c16 12 104 12 120 0" fill="none" stroke="#E8D4A0" stroke-width="8" stroke-linecap="round"/>
        <path d="M20 56c16 12 104 12 120 0" fill="none" stroke="#C4A46A" stroke-width="2"/>
        <rect x="54" y="40" width="52" height="5" fill="#E8D4A0" opacity=".4"/>
      </svg>`,
      uranus: `<svg viewBox="0 0 120 100" aria-hidden="true">
        <defs><radialGradient id="ur-g${x}" cx="36%" cy="32%" r="70%">
          <stop offset="0%" stop-color="#D7FFFB"/><stop offset="100%" stop-color="#4FB8B8"/>
        </radialGradient></defs>
        <g transform="rotate(-18 60 50)">
          <ellipse cx="60" cy="50" rx="16" ry="46" fill="none" stroke="#B8F0EE" stroke-width="5" opacity=".75"/>
        </g>
        <circle cx="60" cy="50" r="30" fill="url(#ur-g${x})"/>
        <g transform="rotate(-18 60 50)">
          <path d="M60 4 A16,46 0 0 1 60 96" fill="none" stroke="#B8F0EE" stroke-width="5" opacity=".95" stroke-linecap="round"/>
        </g>
      </svg>`,
      neptune: `<svg viewBox="0 0 100 100" aria-hidden="true">
        <defs><radialGradient id="ne-g${x}" cx="34%" cy="30%" r="70%">
          <stop offset="0%" stop-color="#9EC4FF"/><stop offset="55%" stop-color="#3A62D8"/><stop offset="100%" stop-color="#1A2F8C"/>
        </radialGradient></defs>
        <circle cx="50" cy="50" r="42" fill="url(#ne-g${x})"/>
        <path d="M20 46c18-12 40-8 60 6" fill="none" stroke="#7FA8FF" stroke-width="5" opacity=".5" stroke-linecap="round"/>
        <path d="M22 62c16 8 38 6 56-8" fill="none" stroke="#2A4CB0" stroke-width="4" opacity=".4" stroke-linecap="round"/>
        <ellipse cx="64" cy="40" rx="6" ry="4" fill="#9EC4FF" opacity=".35"/>
      </svg>`,
      pluto: `<svg viewBox="0 0 100 100" aria-hidden="true">
        <defs><radialGradient id="pl-g${x}" cx="34%" cy="32%" r="70%">
          <stop offset="0%" stop-color="#F0D8BC"/><stop offset="100%" stop-color="#A87850"/>
        </radialGradient></defs>
        <circle cx="50" cy="50" r="42" fill="url(#pl-g${x})"/>
        <path fill="#F4E4C8" d="M42 40c6-8 16-8 20 0 6 4 14 2 14 10 0 10-8 16-18 16-12 0-22-6-20-16 0-4 2-8 4-10z"/>
      </svg>`
    };
    return svg[id] || "";
  }

  function buildStars() {
    const root = $("stars");
    const frag = document.createDocumentFragment();
    for (let i = 0; i < 110; i++) {
      const s = document.createElement("span");
      s.className = "star" + (i % 9 === 0 ? " gold" : "");
      s.style.left = Math.random() * 100 + "%";
      s.style.top = Math.random() * 100 + "%";
      s.style.setProperty("--s", (Math.random() * 2.4 + 1).toFixed(1) + "px");
      s.style.setProperty("--t", (Math.random() * 3 + 2).toFixed(1) + "s");
      s.style.setProperty("--d", (Math.random() * 4).toFixed(1) + "s");
      frag.appendChild(s);
    }
    root.appendChild(frag);
  }

  function bodyButton(id, extra = {}) {
    const b = BODIES[id];
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "body";
    btn.dataset.id = id;
    btn.setAttribute("aria-label", b.name);
    if (extra.sizeVar) btn.style.setProperty("--size", extra.sizeVar);
    if (extra.glow) btn.style.setProperty("--glow", extra.glow);
    btn.innerHTML = `<span class="planet-art" aria-hidden="true">${art(id, "sys-" + id)}</span><span class="planet-name">${b.name}</span><span class="visited-mark"${visited.has(id) ? "" : " hidden"}>✓</span>`;
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      openCard(id);
    });
    return btn;
  }

  function buildSystem() {
    const system = $("system");
    system.innerHTML = ORBIT_DECO;

    PLACED.forEach((o) => {
      if (o.hasMoon) {
        const cluster = document.createElement("div");
        cluster.className = "cluster";
        cluster.style.setProperty("--size", o.size);
        const earth = bodyButton("earth", { sizeVar: o.size, glow: o.glow });
        const moonOrbit = document.createElement("div");
        moonOrbit.className = "moon-orbit";
        moonOrbit.appendChild(bodyButton("moon"));
        cluster.appendChild(earth);
        cluster.appendChild(moonOrbit);
        system.appendChild(cluster);
      } else {
        system.appendChild(bodyButton(o.id, { sizeVar: o.size, glow: o.glow }));
      }
    });

    const sunWrap = document.createElement("div");
    sunWrap.className = "sun-wrap";
    const glow = document.createElement("div");
    glow.className = "sun-glow";
    sunWrap.appendChild(glow);
    sunWrap.appendChild(bodyButton("sun", { glow: "rgba(255,180,40,0.7)" }));
    system.appendChild(sunWrap);

    $("galaxy-art").innerHTML = art("galaxy", "nav");
    updateVisitedMarks();
  }

  function updateVisitedMarks() {
    document.querySelectorAll(".body, .galaxy-btn").forEach((el) => {
      const mark = el.querySelector(".visited-mark");
      if (!mark) return;
      mark.hidden = !visited.has(el.dataset.id);
    });
    $("stamp-count").textContent = `${visited.size}/${TOTAL}`;
  }

  function openCard(id) {
    const b = BODIES[id];
    if (!b) return;
    stopSpeak();
    const first = !visited.has(id);
    if (first) {
      visited.add(id);
      saveVisited();
      updateVisitedMarks();
    }
    openId = id;
    $("hint").hidden = true;
    const card = $("card");
    card.dataset.id = id;
    card.style.setProperty("--accent-ink", b.accent);
    $("card-art").innerHTML = art(id, "card");
    $("card-kicker").textContent = b.kicker;
    $("card-title").textContent = b.name;
    const stamp = $("new-stamp");
    stamp.classList.toggle("show", first);
    $("card-facts").innerHTML = b.facts
      .map((t, i) => `<li data-n="${i + 1}">${escapeHtml(t)}</li>`)
      .join("");
    $("card-fun").innerHTML = `<strong>알고 봤니?</strong>${escapeHtml(b.fun)}`;
    $("card-meta").innerHTML = `
      <div class="meta-item"><span class="label">${escapeHtml(b.tempLabel)}</span>${escapeHtml(b.temp)}</div>
      <div class="meta-item"><span class="label">가려면</span>${escapeHtml(b.travel)}</div>`;
    $("btn-speak").textContent = "🔊 읽어 줘";
    $("btn-speak").classList.remove("playing");
    showOverlay("card-overlay");
    $("btn-close").focus();
  }

  function closeCard() {
    stopSpeak();
    openId = null;
    hideOverlay("card-overlay");
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function speechText(b) {
    const clean = (t) => t.replace(/[🔥❄️🌿🏅🌟🔊]/g, "").replace(/\s+/g, " ").trim();
    return [
      `${b.name}. ${b.kicker}.`,
      ...b.facts,
      `알고 봤니? ${b.fun}`,
      `${b.tempLabel}: ${clean(b.temp)}`,
      `가려면, ${b.travel}`
    ].join(" ");
  }

  function stopSpeak() {
    if (window.speechSynthesis) speechSynthesis.cancel();
    const btn = $("btn-speak");
    if (btn) {
      btn.textContent = "🔊 읽어 줘";
      btn.classList.remove("playing");
    }
  }

  function toggleSpeak() {
    const b = BODIES[openId];
    if (!b) return;
    if (!window.speechSynthesis) {
      $("btn-speak").textContent = "이 기기는 읽기를 못 해요";
      return;
    }
    if (speechSynthesis.speaking) {
      stopSpeak();
      return;
    }
    const u = new SpeechSynthesisUtterance(speechText(b));
    u.lang = "ko-KR";
    u.rate = 0.92;
    u.pitch = 1.05;
    const voices = speechSynthesis.getVoices();
    const ko = voices.find((v) => v.lang === "ko-KR") || voices.find((v) => v.lang.startsWith("ko"));
    if (ko) u.voice = ko;
    u.onend = () => stopSpeak();
    u.onerror = () => stopSpeak();
    $("btn-speak").textContent = "⏹ 그만 듣기";
    $("btn-speak").classList.add("playing");
    speechSynthesis.speak(u);
  }

  function showOverlay(id) {
    document.body.classList.add("paused");
    $(id).hidden = false;
  }
  function hideOverlay(id) {
    $(id).hidden = true;
    const anyOpen = !["card-overlay", "album-overlay", "quiz-overlay", "intro-overlay"]
      .every((k) => $(k).hidden);
    if (!anyOpen) document.body.classList.remove("paused");
  }

  function openAlbum() {
    stopSpeak();
    $("album-sub").textContent = `${visited.size}곳을 탐험했어요. 빈 도장을 눌러 가 볼 수도 있어요.`;
    const grid = $("stamp-grid");
    grid.innerHTML = "";
    STAMP_ORDER.forEach((id) => {
      const got = visited.has(id);
      const cell = document.createElement("button");
      cell.type = "button";
      cell.className = "stamp-cell" + (got ? " got" : " locked");
      cell.innerHTML = `<span class="planet-art">${art(id, "stamp-" + id)}</span><span class="nm">${got ? BODIES[id].name : "?"}</span>`;
      cell.addEventListener("click", () => {
        hideOverlay("album-overlay");
        openCard(id);
      });
      grid.appendChild(cell);
    });
    $("complete-banner").classList.toggle("show", visited.size === TOTAL);
    showOverlay("album-overlay");
  }

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function startQuiz() {
    stopSpeak();
    quizSet = shuffle(QUIZ).slice(0, 5);
    quizIndex = 0;
    quizScore = 0;
    $("quiz-play").hidden = false;
    $("quiz-end").hidden = true;
    $("btn-quiz-next").hidden = true;
    $("btn-quiz-retry").hidden = true;
    renderQuiz();
    showOverlay("quiz-overlay");
  }

  function renderQuiz() {
    const item = quizSet[quizIndex];
    quizLocked = false;
    $("quiz-fb").textContent = "";
    $("btn-quiz-next").hidden = true;
    $("quiz-q").textContent = item.q;
    const prog = $("quiz-progress");
    prog.innerHTML = quizSet
      .map((_, i) => `<span class="${i === quizIndex ? "on" : ""}"></span>`)
      .join("");
    const box = $("quiz-choices");
    box.innerHTML = "";
    item.choices.forEach((c, i) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "choice";
      btn.textContent = c;
      btn.addEventListener("click", () => pickChoice(i, btn));
      box.appendChild(btn);
    });
  }

  function pickChoice(i, btn) {
    if (quizLocked) return;
    quizLocked = true;
    const item = quizSet[quizIndex];
    const buttons = [...$("quiz-choices").children];
    buttons[item.answer].classList.add("correct");
    if (i === item.answer) {
      quizScore += 1;
      $("quiz-fb").textContent = "참 잘했어요!";
      $("quiz-fb").style.color = "#0A7A4A";
    } else {
      btn.classList.add("wrong");
      $("quiz-fb").textContent = "아쉽지만, 정답은 " + item.choices[item.answer] + "예요.";
      $("quiz-fb").style.color = "#9A2A2A";
    }
    $("quiz-progress").children[quizIndex].className = i === item.answer ? "ok" : "on";
    $("btn-quiz-next").hidden = false;
    $("btn-quiz-next").textContent = quizIndex === quizSet.length - 1 ? "결과 보기" : "다음";
  }

  function nextQuiz() {
    if (quizIndex >= quizSet.length - 1) {
      endQuiz();
      return;
    }
    quizIndex += 1;
    renderQuiz();
  }

  function endQuiz() {
    $("quiz-play").hidden = true;
    $("quiz-end").hidden = false;
    $("btn-quiz-next").hidden = true;
    $("btn-quiz-retry").hidden = false;
    $("quiz-score").textContent = `${quizScore} / ${quizSet.length}`;
    const msg =
      quizScore === quizSet.length
        ? "와, 전부 맞혔어요! 진짜 우주 탐험가예요."
        : quizScore >= 3
          ? "잘했어요! 행성을 한 번 더 눌러 보면 더 잘하게 될 거예요."
          : "괜찮아요. 행성을 다시 눌러 보고 한 번 더 해 볼까요?";
    $("quiz-end-msg").textContent = msg;
  }

  function bindUI() {
    $("btn-galaxy").addEventListener("click", () => openCard("galaxy"));
    $("btn-stamps").addEventListener("click", openAlbum);
    $("btn-quiz").addEventListener("click", startQuiz);
    $("btn-close").addEventListener("click", closeCard);
    $("btn-speak").addEventListener("click", toggleSpeak);
    $("btn-album-close").addEventListener("click", () => hideOverlay("album-overlay"));
    $("btn-quiz-close").addEventListener("click", () => hideOverlay("quiz-overlay"));
    $("btn-quiz-next").addEventListener("click", nextQuiz);
    $("btn-quiz-retry").addEventListener("click", startQuiz);
    $("btn-intro").addEventListener("click", () => {
      localStorage.setItem(STORAGE_INTRO, "1");
      hideOverlay("intro-overlay");
    });

    $("card-overlay").addEventListener("click", (e) => {
      if (e.target === $("card-overlay")) closeCard();
    });
    $("album-overlay").addEventListener("click", (e) => {
      if (e.target === $("album-overlay")) hideOverlay("album-overlay");
    });
    $("quiz-overlay").addEventListener("click", (e) => {
      if (e.target === $("quiz-overlay")) hideOverlay("quiz-overlay");
    });

    document.addEventListener("keydown", (e) => {
      if (e.key !== "Escape") return;
      if (!$("card-overlay").hidden) closeCard();
      else if (!$("album-overlay").hidden) hideOverlay("album-overlay");
      else if (!$("quiz-overlay").hidden) hideOverlay("quiz-overlay");
    });

    if (window.speechSynthesis) {
      speechSynthesis.getVoices();
      speechSynthesis.addEventListener("voiceschanged", () => speechSynthesis.getVoices());
    }
  }

  function showIntroIfNeeded() {
    $("intro-art").innerHTML = art("sun", "intro");
    if (!localStorage.getItem(STORAGE_INTRO)) {
      showOverlay("intro-overlay");
    }
  }

  function registerSW() {
    if (!("serviceWorker" in navigator)) return;
    if (!/^https?:$/.test(location.protocol)) return;
    navigator.serviceWorker.register("./sw.js", { scope: "./" }).catch(() => {});
  }

  function init() {
    buildStars();
    buildSystem();
    bindUI();
    updateVisitedMarks();
    showIntroIfNeeded();
    registerSW();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
