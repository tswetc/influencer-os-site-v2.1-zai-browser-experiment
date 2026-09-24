// Fix Pack 13: in-app "What's new" + the app version shown in the footer.
// The newest entry is first; selfcheck asserts it matches APP_VERSION.

export const APP_VERSION = "1.23";

export interface ChangelogEntry {
  version: string;
  date: string;
  ru: string[];
  en: string[];
}

export const CHANGELOG: ChangelogEntry[] = [
  {
    version: "1.23",
    date: "07.2026",
    ru: [
      "\u0421\u0442\u0443\u0434\u0438\u044f \u0440\u0430\u0441\u043f\u0438\u043b\u0435\u043d\u0430 \u043d\u0430 \u043c\u043e\u0434\u0443\u043b\u0438: \u043f\u0440\u0435\u0441\u0435\u0442\u044b \u0438 \u0444\u043e\u0440\u043c\u0430\u0442\u044b \u0432 lib, undo/redo \u2014 \u0445\u0443\u043a, \u0448\u0430\u043f\u043a\u0430, \u0431\u0430\u043d\u043d\u0435\u0440\u044b, \u043f\u0430\u043d\u0435\u043b\u044c \u0438 \u043d\u0430\u0441\u0442\u0440\u043e\u0439\u043a\u0438 \u2014 \u043e\u0442\u0434\u0435\u043b\u044c\u043d\u044b\u0435 \u043a\u043e\u043c\u043f\u043e\u043d\u0435\u043d\u0442\u044b",
      "\u0422\u044f\u0436\u0451\u043b\u044b\u0435 \u0431\u043b\u043e\u043a\u0438 (\u0441\u0430\u043c\u043e\u043f\u0440\u043e\u0432\u0435\u0440\u043a\u0430, \u0440\u0435\u0434\u0430\u043a\u0442\u043e\u0440 \u043a\u0430\u043d\u043e\u043d\u0430) \u043f\u043e\u0434\u0433\u0440\u0443\u0436\u0430\u044e\u0442\u0441\u044f \u043f\u043e \u0437\u0430\u043f\u0440\u043e\u0441\u0443 \u2014 \u0441\u0442\u0443\u0434\u0438\u044f \u0441\u0442\u0430\u0440\u0442\u0443\u0435\u0442 \u0431\u044b\u0441\u0442\u0440\u0435\u0435",
      "\u0411\u044d\u043a\u0430\u043f \u043f\u0435\u0440\u0435\u043d\u043e\u0441\u0438\u0442 \u0438 \u043f\u0440\u0435\u0441\u0435\u0442\u044b; \u0434\u043e\u0431\u0430\u0432\u043b\u0435\u043d\u044b \u0430\u0432\u0442\u043e\u0442\u0435\u0441\u0442\u044b \u0438 CI; \u0441\u043b\u043e\u0432\u0430\u0440\u044c \u0438\u043d\u0442\u0435\u0440\u0444\u0435\u0439\u0441\u0430 \u0442\u0438\u043f\u0438\u0437\u0438\u0440\u043e\u0432\u0430\u043d",
    ],
    en: [
      "The studio is split into modules: presets and formats in lib, undo/redo as a hook, header, banners, bar and settings as components",
      "Heavy blocks (self-check, canon editor) load on demand for a faster start",
      "Backups now carry presets; vitest tests and CI added; the UI dictionary is typed",
    ],
  },
  {
    version: "1.22",
    date: "07.2026",
    ru: [
      "Нижняя панель — один ряд: формат слева, генерация справа, остальное — за кнопкой параметров",
      "Хедер стал чище: язык, тема и подсказки переехали в настройки, там же горячие клавиши",
      "Черновик восстанавливается сам (с отменой), баннеры — по одному, типографика и радиусы сведены к токенам",
    ],
    en: [
      "The action bar is one row: format left, Build right, the rest behind the options button",
      "A cleaner header: language, theme and hints moved into Settings, with the shortcuts list",
      "Drafts restore silently (with undo), banners show one at a time, type & radius scales are tokenized",
    ],
  },
  {
    version: "1.21",
    date: "07.2026",
    ru: [
      "Тур по студии теперь подсвечивает реальные элементы и ничего не блокирует",
      "Отмена и возврат генераций (⌘Z / ⇧⌘Z), клавиши 1–4 переключают видео-движок, ? — все горячие клавиши",
      "Приложение ставится как PWA и открывается офлайн; длинные списки истории и сцен больше не тормозят",
    ],
    en: [
      "The studio tour now spotlights the real UI and never blocks the screen",
      "Undo/redo for generations (⌘Z / ⇧⌘Z), keys 1–4 switch the video engine, ? shows all shortcuts",
      "Installable PWA with an offline shell; long history and scene lists stay fast",
    ],
  },
  {
    version: "1.20",
    date: "07.2026",
    ru: [
      "Лицензия: подпись кэша теперь выдаёт сервер (HMAC) — подделка из консоли больше не работает",
      "Защита проверки лицензии от перебора ключей: лимит запросов по IP",
      "CSP и security-заголовки для всего сайта; предупреждение о хранении ИИ-ключа рядом с полем ввода",
    ],
    en: [
      "License cache is now server-signed (HMAC) — console forgery no longer works",
      "License checks are protected from key brute-forcing: per-IP rate limit",
      "Site-wide CSP and security headers; a storage warning next to the AI key field",
    ],
  },
  {
    version: "1.19",
    date: "07.2026",
    ru: [
      "Витрина пересобрана по реальным съёмкам: 11 проектов, все миниатюры видны сразу — без вкладок, съёмки не смешиваются",
      "Витрина теперь сразу под обложкой; лендинг короче: демо-секция убрана, версии спрятаны в сворачиваемый блок",
      "Смена образа: слайдер до/после рядом с видео переодевания; новое стеклянное гауссово размытие промптов разной плотности",
    ],
    en: [
      "Showcase regrouped by real shoots: 11 projects, every thumbnail visible at once — no tabs, shoots never mix",
      "Showcase now sits right under the hero; shorter landing: the demo section is gone, versions fold away",
      "Outfit swap: a before/after slider next to the swap loop; new multi-density gaussian glass blur for prompts",
    ],
  },
  {
    version: "1.18.1",
    date: "07.2026",
    ru: [
      "Исправлены два битых символа в словарях: метка приёма «Транзит» и транслит буквы «щ»",
      "Самопроверка выросла до 150: новые стражи ловят битую кодировку в словарях автоматически",
    ],
    en: [
      "Fixed two broken characters in the dictionaries: the Transit technique label and the shch transliteration",
      "Self-check grew to 150: new guards catch broken encoding in the dictionaries automatically",
    ],
  },
  {
    version: "1.18",
    date: "07.2026",
    ru: [
      "Витрина пересобрана вокруг главного — создания персонажа с нуля: вкладка «Создание» открывает историю, дальше паспорт, одежда, свет и кампании",
      "Все 29 промо-медиа расставлены по сериям; клик по видео раскрывает весь процесс — ролики и кадры",
      "Живой портрет вернулся в hero",
    ],
    en: [
      "Showcase rebuilt around the core — creating a character from zero: the Create tab opens the story, then passport, outfit, light, and campaigns",
      "All 29 promo assets placed across the series; clicking a video opens the whole process — clips and stills",
      "The live portrait is back in the hero",
    ],
  },
  {
    version: "1.17",
    date: "07.2026",
    ru: [
      "Витрина медиа на лендинге: пять серий (одежда, свет, продукт, стиль, персонаж) с видео-лупами",
      "Лайтбокс: клик по любому кадру открывает всю серию в полном качестве",
      "Hero-видео «замена одежды на скале» и слайдер до/после на той же скале",
    ],
    en: [
      "Landing media showcase: five series (outfit, light, product, style, character) with video loops",
      "Lightbox: click any frame to browse the full series in full quality",
      "Hero video — the cliff outfit swap — plus a before/after slider on the same cliff",
    ],
  },
  {
    version: "1.16.1",
    date: "07.2026",
    ru: [
      "Строгая типизация журнала статистики; проверки типов при сборке снова включены",
      "B-roll: мягкий страж «кадр без людей» — подсказка, если в действии есть человек",
    ],
    en: [
      "Typed the stats journal strictly; build-time type checks re-enabled",
      "B-roll: a soft no-people guard — a hint when the action mentions a person",
    ],
  },
  {
    version: "1.16",
    date: "07.2026",
    ru: [
      "Квиз «код твоей героини» на лендинге + карточка кода (PNG)",
      "Season Sync: сезон и время её города вшиты в свет, гардероб и B-roll",
      "Голос ленты: фотодамп, недоотправленная смс, архив-нумерация 0347.jpg",
      "Series Card: ритм серии одной PNG с эпизодом S1·E№, без промптов",
      "Строка Codex под лентой, страж клише и чеклист маркировки ИИ в экспорте",
      "Редактура вместо блюра: скрытый текст промпта не попадает на страницу",
      "Витринный режим ?demo=1, блок «Что нового» и hero по времени суток",
    ],
    en: [
      "Cluster quiz “your character's code” on the landing + a PNG code card",
      "Season Sync: her city's season and time baked into light, wardrobe and B-roll",
      "Feed voice: photo-dump, unsent sms, archive numbering 0347.jpg",
      "Series Card: the series rhythm as one PNG with an S1·E№ episode, zero prompts",
      "A Codex line under the feed, a cliché guard and an AI-disclosure checklist in exports",
      "Redaction instead of blur: hidden prompt text never reaches the page",
      "Showcase mode ?demo=1, a public what's-new block and a daylight hero",
    ],
  },
  {
    version: "1.15",
    date: "07.2026",
    ru: [
      "Лендинг: промпт в демо защищён — читаемый тизер, хвост в блюре",
      "Hero: живая сборка промпта, автопереключение 5 движков, спидометр силы",
      "Грид 9 кадров с проявлением и живой видео-портрет персонажа",
      "Слайдер «до/после» и полароид-стиль галереи (включаются медиафайлами)",
    ],
    en: [
      "Landing: the demo prompt is protected — readable teaser, blurred tail",
      "Hero: live prompt assembly, auto-cycling 5 engines, a strength gauge",
      "9-frame reveal grid and a live video portrait of the character",
      "Before/after slider and polaroid-style gallery (enabled by media files)",
    ],
  },
  {
    version: "1.14",
    date: "07.2026",
    ru: [
      "Prompt Doctor: конкретные, зависящие от движка подсказки, что добавить в сцену",
      "Живое демо на лендинге: показ силы промпта и кнопка «Копировать»",
      "Блок для партнёров (аффилиатов) на лендинге — по env-флагу",
      "Канал обновлений канона: чтение удалённого манифеста со списком «Что нового»",
    ],
    en: [
      "Prompt Doctor: concrete, engine-aware hints on what to add to the scene",
      "Live landing demo: prompt strength readout and a Copy button",
      "Affiliate block on the landing — behind an env flag",
      "Canon update channel: reads a remote manifest with a what's-new list",
    ],
  },
  {
    version: "1.13",
    date: "07.2026",
    ru: [
      "Разовый персонаж — временный паспорт без записи в библиотеку",
      "Панель «Реализм и анти-детект» с советами под выбранный движок",
      "Индикатор силы промпта и список «что усилить»",
      "Журнал попаданий: отметки «сработал / не принят» и статистика по движкам",
      "Экспорт шот-листа (.md) для съёмки и ленты",
      "Напоминание о резервной копии и раздел «Что нового»",
      "Горячие клавиши: ⌘/Ctrl+Enter — генерация, C — копия промпта",
    ],
    en: [
      "One-off character — a temporary passport that never touches the library",
      "Engine-aware “Realism & anti-detection” panel",
      "Prompt strength meter with a “what to strengthen” list",
      "Hit journal: worked / rejected marks and per-engine stats",
      "Shot list export (.md) for shoots and feeds",
      "Backup reminder and a “What's new” section",
      "Hotkeys: ⌘/Ctrl+Enter — generate, C — copy the prompt",
    ],
  },
  {
    version: "1.12",
    date: "07.2026",
    ru: [
      "Пакеты сцен, миры A/B/C, техники и слои-модификаторы",
      "Канон модели: B-roll, подписи и реквизит становятся «её»",
      "Планировщик ленты, мультишот Kling, кэш Vision, версии паспорта",
    ],
    en: [
      "Scene packs, worlds A/B/C, techniques and modifier layers",
      "Model canon: B-roll, captions and props become hers",
      "Feed planner, Kling multi-shot, Vision cache, passport versions",
    ],
  },
];

