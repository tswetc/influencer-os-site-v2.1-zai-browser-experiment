// RU/EN i18n dictionary. Fallback EN. No hardcoded UI strings in components.
// Copy rules: neutral impersonal tone (RU), pro terms kept (промпт,
// референс, негативный промпт, B-roll), typographic arrows/dashes.

import type { Lang } from "./types";

type Entry = { ru: string; en: string };

export const DICT = {
  "app.title": { ru: "Influencer OS", en: "Influencer OS" },
  "app.tagline": {
    ru: "Референс → точный промпт под модель",
    en: "Reference → a precise, model-ready prompt",
  },
  "key.title": { ru: "API-ключ", en: "API key" },
  "key.optional": {
    ru: "Необязательно: без ключа промпт собирается по описанию сцены",
    en: "Optional: without a key, prompts are built from the scene description",
  },
  "key.save": { ru: "Сохранить", en: "Save" },
  "key.clear": { ru: "Очистить", en: "Clear" },
  "key.test": { ru: "Проверить", en: "Test" },
  "key.valid": { ru: "Ключ работает", en: "Key is working" },
  "key.invalid": { ru: "Ключ не принят", en: "Key rejected" },
  "key.warn": {
    ru: "Ключ хранится только в этом браузере и отправляется напрямую выбранному провайдеру. Не вводите его на чужом устройстве и задайте у провайдера лимит расходов — это страховка на случай утечки.",
    en: "The key is stored only in this browser and sent directly to the provider you chose. Don’t enter it on a shared device, and set a spending limit with your provider as a safety net in case it ever leaks.",
  },
  "mode.photo": { ru: "Фото", en: "Photo" },
  "mode.video": { ru: "Видео", en: "Video" },
  "engine.pick": { ru: "Модель", en: "Model" },
  "engine.conveyor": {
    ru: "Motion → Kling · B-roll → Seedance · Диалог → Veo · Доработка → Omni Flash",
    en: "Motion → Kling · B-roll → Seedance · Dialogue → Veo · Refinement → Omni Flash",
  },
  "scene.label": { ru: "Описание сцены", en: "Scene description" },
  "scene.placeholder": { ru: "Например:", en: "For example:" },
  "scene.autotags": { ru: "Авто-теги", en: "Auto-tags" },
  "scene.removeTag": { ru: "Убрать тег", en: "Remove tag" },
  "scene.ambiguity": { ru: "Уточните:", en: "Clarify:" },
  "theme.label": { ru: "Тема", en: "Theme" },
  "theme.light": { ru: "Светлая", en: "Light" },
  "theme.dark": { ru: "Тёмная", en: "Dark" },
  "theme.contrast": { ru: "Контраст", en: "Contrast" },
  "style.title": { ru: "Стиль", en: "Style" },
  "realism.title": { ru: "Реализм", en: "Realism" },
  "capture.title": { ru: "Параметры съёмки", en: "Capture settings" },
  "ref.title": { ru: "Референс", en: "Reference" },
  "ref.analyze": { ru: "Анализировать", en: "Analyze" },
  "ref.drop": { ru: "Перетащите фото сюда", en: "Drop a photo here" },
  "passport.title": { ru: "Паспорт персонажа", en: "Character passport" },
  "anomaly.title": { ru: "Anomaly Lock", en: "Anomaly Lock" },
  "negative.title": { ru: "Негативный промпт", en: "Negative prompt" },
  generate: { ru: "Собрать промпт", en: "Build prompt" },
  variants: { ru: "Варианты", en: "Variants" },
  copy: { ru: "Копировать", en: "Copy" },
  copied: { ru: "Скопировано", en: "Copied" },
  "tokens.estimate": { ru: "≈ токенов", en: "≈ tokens" },
  "history.title": { ru: "История", en: "History" },
  "favorites.title": { ru: "Избранное", en: "Favorites" },
  "presets.title": { ru: "Пресеты", en: "Presets" },
  "backup.export": { ru: "Скачать резервную копию", en: "Download backup" },
  "backup.import": { ru: "Импорт резервной копии", en: "Import backup" },
  "banner.nokey": {
    ru: "Без ключа: анализ фото отключён — ключ добавляется в настройках",
    en: "No key: photo analysis is off — add a key in settings",
  },
  "warn.lowres": {
    ru: "Низкое разрешение — лицо может получиться нечётким",
    en: "Low resolution — the face may come out soft",
  },
  "warn.blur": { ru: "Фото выглядит размытым", en: "The photo looks blurry" },
  "warn.exposure": {
    ru: "Фото слишком тёмное или пересвеченное",
    en: "The photo is too dark or overexposed",
  },
  "warn.noface": {
    ru: "Лицо не распознано — нужен более крупный ракурс",
    en: "No face detected — use a closer photo",
  },
  "footer.disclaimer": {
    ru: "Контент генерируется ИИ. Соблюдайте правила платформ и права третьих лиц.",
    en: "AI-generated content. Follow platform rules and third-party rights.",
  },

  // --- Extended UI strings (beyond the seed) ---
  "key.placeholder": { ru: "API-ключ", en: "API key" },
  "key.provider": { ru: "Провайдер", en: "Provider" },
  "key.testing": { ru: "Проверка…", en: "Testing…" },
  "key.where": { ru: "Где получить ключ", en: "Where to get a key" },
  "engine.fixed": { ru: "Модель для фото", en: "Photo model" },
  "scene.empty": {
    ru: "Опишите сцену, чтобы собрать промпт",
    en: "Describe a scene to build a prompt",
  },
  "capture.cap": { ru: "Камера", en: "Capture" },
  "capture.opt": { ru: "Оптика", en: "Optics" },
  "capture.expo": { ru: "Экспозиция", en: "Exposure" },
  "capture.imperf": { ru: "Несовершенства", en: "Imperfections" },
  "capture.film": { ru: "Плёнка", en: "Film" },
  "ref.slot.face": { ru: "Лицо", en: "Face" },
  "ref.slot.pose": { ru: "Поза/сцена", en: "Pose/scene" },
  "ref.analyzing": { ru: "Анализ…", en: "Analyzing…" },
  "ref.analyzeError": {
    ru: "Vision не ответил — опишите сцену вручную",
    en: "Vision failed — describe the scene manually",
  },
  "ref.retry": { ru: "Повторить", en: "Retry" },
  "ref.needKey": {
    ru: "Для анализа нужен API-ключ",
    en: "An API key is required for analysis",
  },
  "passport.name": { ru: "Имя персонажа", en: "Character name" },
  "passport.identity": { ru: "Описание внешности", en: "Identity detail" },
  "passport.identity.full": { ru: "Полное", en: "Full" },
  "passport.identity.mid": { ru: "Краткое", en: "Brief" },
  "passport.identity.micro": { ru: "По референсу", en: "Reference only" },
  "passport.device": { ru: "Устройство", en: "Device" },
  "passport.faceAdherence": { ru: "Точность лица", en: "Face adherence" },
  "passport.static": { ru: "Статика", en: "Static" },
  "passport.motion": { ru: "Движение", en: "Motion" },
  "passport.save": { ru: "Сохранить в библиотеку", en: "Save to library" },
  "passport.export": { ru: "Экспорт", en: "Export" },
  "passport.import": { ru: "Импорт", en: "Import" },
  "passport.library": { ru: "Библиотека", en: "Library" },
  "passport.none": { ru: "Без персонажа", en: "No character" },
  "passport.saved": { ru: "Сохранено", en: "Saved" },
  "passport.delete": { ru: "Удалить", en: "Delete" },
  "passport.anomaly.freeText": {
    ru: "Свои приметы (текстом)",
    en: "Custom anomalies (free text)",
  },
  "anomaly.moles": { ru: "Родинки", en: "Moles" },
  "anomaly.freckles": { ru: "Веснушки", en: "Freckles" },
  "anomaly.asymmetry": { ru: "Асимметрия", en: "Asymmetry" },
  "anomaly.scar": { ru: "Шрам", en: "Scar" },
  "anomaly.heterochromia": { ru: "Гетерохромия", en: "Heterochromia" },
  "anomaly.uneven_teeth": { ru: "Неровные зубы", en: "Uneven teeth" },
  "anomaly.skin_texture": { ru: "Текстура кожи", en: "Skin texture" },
  "negative.hint": {
    ru: "Только для Kling и Veo. Можно редактировать.",
    en: "Kling and Veo only. Editable.",
  },
  "tip.title": { ru: "Совет по реализму", en: "Realism tip" },
  "tip.body": {
    ru: "Реализм задаётся позитивом (поры, шум сенсора), а не негативом: вместо «убрать пластик» — «настоящая кожа».",
    en: "Realism is added positively (pores, sensor noise), not with negatives: ask for 'real skin' instead of 'no plastic'.",
  },
  "output.title": { ru: "Результат", en: "Output" },
  "output.negative": {
    ru: "Негативный промпт (копируется отдельно)",
    en: "Negative prompt (copied separately)",
  },
  "output.words": { ru: "слов", en: "words" },
  "compress.label": {
    ru: "Сжать до 80–150 слов",
    en: "Compress to 80–150 words",
  },
  "license.title": {
    ru: "Активация Influencer OS",
    en: "Activate Influencer OS",
  },
  "license.note": {
    ru: "Введите лицензионный ключ из письма Gumroad. Проверка выполняется один раз, все данные остаются в вашем браузере.",
    en: "Enter the license key from your Gumroad receipt. Verified once; all your data stays in this browser.",
  },
  "license.placeholder": { ru: "Лицензионный ключ", en: "License key" },
  "license.activate": { ru: "Активировать", en: "Activate" },
  "license.buy": { ru: "Купить лицензию", en: "Buy a license" },
  "license.refund": {
    ru: "7 дней — возврат без вопросов",
    en: "7-day no-questions refund",
  },
  "license.invalid": {
    ru: "Ключ не найден или отменён",
    en: "Key not found or revoked",
  },
  "license.uses": {
    ru: "Ключ активирован слишком много раз — напишите нам",
    en: "This key was activated too many times — contact us",
  },
  "license.network": {
    ru: "Нет связи с сервером — попробуйте ещё раз",
    en: "Can’t reach the server — try again",
  },
  "license.rate": {
    ru: "Слишком много попыток — подождите несколько минут",
    en: "Too many attempts — wait a few minutes",
  },
  "license.checking": { ru: "Проверка лицензии…", en: "Checking license…" },
  "series.label": { ru: "Серия", en: "Series" },
  "series.off": { ru: "Без серии", en: "No series" },
  "series.title": {
    ru: "Серия для карусели: согласованные кадры одной сцены — общий, средний, крупный, деталь, селфи; ×6 — серия одного приёма",
    en: "Carousel series: coherent shots of one scene — wide, medium, close-up, detail, selfie; ×6 — one-technique series",
  },
  "confirm.title": { ru: "Проверка сцены", en: "Review the scene" },
  "confirm.hint": {
    ru: "Поля с низкой уверенностью подсвечены",
    en: "Low-confidence fields are highlighted",
  },
  "confirm.acceptAll": { ru: "Принять всё", en: "Accept all" },
  "confirm.reset": { ru: "Сбросить", en: "Reset" },
  "confirm.reanalyze": { ru: "Анализ заново", en: "Re-analyze" },
  "confirm.check": { ru: "проверьте", en: "check this" },
  "confirm.confirmed": { ru: "Подтверждено", en: "Confirmed" },
  "field.location": { ru: "Локация", en: "Location" },
  "field.lighting": { ru: "Свет", en: "Lighting" },
  "field.camera": { ru: "Камера", en: "Camera" },
  "field.pose": { ru: "Поза", en: "Pose" },
  "field.outfit": { ru: "Одежда", en: "Outfit" },
  "field.mood": { ru: "Настроение", en: "Mood" },
  "field.action": { ru: "Действие", en: "Action" },
  "field.cameraMove": { ru: "Движение камеры", en: "Camera move" },
  "field.dialogue": { ru: "Реплика", en: "Dialogue" },
  "field.sfx": { ru: "SFX", en: "SFX" },
  "field.ambience": { ru: "Фоновый звук", en: "Ambience" },
  "field.intensity": { ru: "Интенсивность движения", en: "Motion intensity" },
  "motion.title": { ru: "Движение и звук", en: "Motion & audio" },
  "history.empty": { ru: "Пока пусто", en: "Nothing here yet" },
  "history.repeat": { ru: "Повторить", en: "Repeat" },
  "history.deleteAll": { ru: "Очистить", en: "Clear" },
  "restore.last": {
    ru: "Вернуть последний промпт",
    en: "Restore last prompt",
  },
  "restore.dismiss": { ru: "Скрыть", en: "Dismiss" },
  "preset.save": { ru: "Сохранить пресет", en: "Save preset" },
  "preset.name": { ru: "Название пресета", en: "Preset name" },
  "preset.apply": { ru: "Применить", en: "Apply" },
  "onb.skip": { ru: "Пропустить", en: "Skip" },
  "onb.next": { ru: "Далее", en: "Next" },
  "onb.done": { ru: "Начать", en: "Start" },
  "onb.step1.title": { ru: "API-ключ (по желанию)", en: "API key (optional)" },
  "onb.step1.body": {
    ru: "Ключ включает Vision-анализ и ассистента. Подходят Anthropic, OpenAI, Gemini, OpenRouter (есть бесплатные модели) и любой OpenAI-совместимый сервис. Без ключа всё работает вручную.",
    en: "A key enables Vision analysis and the assistant. Anthropic, OpenAI, Gemini, OpenRouter (free models available) and any OpenAI-compatible service are supported. Everything works manually without one.",
  },
  "onb.step2.title": { ru: "Создание персонажа", en: "Create a character" },
  "onb.step2.body": {
    ru: "Загрузите ~5 ракурсов: фронт, 3/4 слева и справа, профиль, поза — одно лицо во всех генерациях.",
    en: "Upload ~5 angles: front, 3/4 left and right, profile, pose — one face across every generation.",
  },
  "onb.step3.title": { ru: "Референс", en: "Load a reference" },
  "onb.step3.body": {
    ru: "Перетащите фото сцены или позы. С ключом — авто-анализ, без ключа — описание словами.",
    en: "Drop a scene or pose photo. With a key — auto analysis, without — describe it in words.",
  },
  "onb.step4.title": { ru: "Первый промпт", en: "Your first prompt" },
  "onb.step4.body": {
    ru: "Подтвердите сцену → Собрать промпт → Копировать. Промпт всегда на английском, точно под выбранную модель.",
    en: "Confirm the scene → Build prompt → Copy. Prompts are always in English, tuned to the selected model.",
  },
  "storage.warning": {
    ru: "Хранилище почти заполнено — скачайте резервную копию или удалите данные",
    en: "Storage is almost full — download a backup or delete some data",
  },
  "import.merge": { ru: "Объединить", en: "Merge" },
  "import.replace": { ru: "Заменить", en: "Replace" },
  "import.invalid": { ru: "Файл не распознан", en: "File not recognized" },
  "upload.badType": {
    ru: "Поддерживаются JPEG, PNG, WebP, HEIC",
    en: "Supported formats: JPEG, PNG, WebP, HEIC",
  },
  "engine.broll": { ru: "B-roll (без людей)", en: "B-roll (no people)" },
  "hint.brollPeople": {
    ru: "B-roll — кадр без людей: убери человека из действия.",
    en: "B-roll is a no-people shot: remove the person from the action.",
  },
  "tip.synthid": {
    ru: "Важно: Nano Banana Pro и Omni Flash встраивают невидимый водяной знак SynthID в каждый кадр. Убрать его нельзя — это часть модели.",
    en: "Note: Nano Banana Pro and Omni Flash embed an invisible SynthID watermark in every frame. It cannot be removed — it is part of the model.",
  },
  "import.title": {
    ru: "Резервная копия: объединить или заменить?",
    en: "Import backup: merge or replace?",
  },
  "import.cancel": { ru: "Отмена", en: "Cancel" },
  "output.underMin": {
    ru: "Промпт короче минимума для модели — добавьте деталей в сцену",
    en: "Below the model's word minimum — add more scene detail",
  },

  // --- Fix Pack 3: scene templates + self-check ---
  "scene.example": { ru: "Пример", en: "Example" },
  "more.title": { ru: "Дополнительно", en: "More options" },
  "more.subtitle": {
    ru: "Стиль, референс, персонаж, движение, негативный промпт",
    en: "Style, reference, character, motion, negative prompt",
  },
  "settings.title": { ru: "Настройки", en: "Settings" },
  "settings.open": { ru: "Настройки", en: "Settings" },
  "settings.close": { ru: "Закрыть", en: "Close" },
  "settings.appearance": { ru: "Оформление", en: "Appearance" },
  "settings.language": { ru: "Язык", en: "Language" },
  "common.on": { ru: "Вкл", en: "On" },
  "common.off": { ru: "Выкл", en: "Off" },
  "build.options": { ru: "Параметры генерации", en: "Build options" },
  "draft.restored": { ru: "Черновик восстановлен", en: "Draft restored" },
  "draft.undo": { ru: "Отменить", en: "Undo" },

  // --- Fix Pack 5: any LLM + assistant ---
  "key.custom": { ru: "Свой", en: "Custom" },
  "key.model": { ru: "Модель", en: "Model" },
  "key.modelHint": {
    ru: "Модели с пометкой :free — бесплатные",
    en: "Models tagged :free are free",
  },
  "key.endpoint": {
    ru: "Адрес API (OpenAI-совместимый)",
    en: "API endpoint (OpenAI-compatible)",
  },
  "key.textOnly": {
    ru: "Ключ работает, но модель не видит фото — Vision-анализ недоступен",
    en: "Key works, but the model can't see images — Vision analysis unavailable",
  },
  "scene.enhance": { ru: "Улучшить", en: "Enhance" },
  "scene.enhancing": { ru: "Улучшаю…", en: "Enhancing…" },
  "scene.unknown": { ru: "Не распознано", en: "Not recognized" },
  "scene.translate": { ru: "Перевести в теги", en: "Translate to tags" },
  "scene.translating": { ru: "Перевожу…", en: "Translating…" },
  "critic.run": { ru: "Проверка ИИ", en: "AI review" },
  "critic.busy": { ru: "Проверяю…", en: "Reviewing…" },
  "chat.title": { ru: "Ассистент", en: "Assistant" },
  "chat.subtitle": {
    ru: "Обсудить сцену или поправить готовый промпт",
    en: "Discuss the scene or tweak the finished prompt",
  },
  "chat.empty": {
    ru: "Напишите, что поменять в сцене или в готовом промпте — ассистент предложит правку, вы её подтверждаете",
    en: "Describe what to change in the scene or the finished prompt — the assistant suggests an edit, you confirm it",
  },
  "chat.placeholder": {
    ru: "Например: сделайте свет мягче",
    en: "e.g. make the lighting softer",
  },
  "chat.send": { ru: "Отправить", en: "Send" },
  "chat.thinking": { ru: "Думаю…", en: "Thinking…" },
  "chat.applyScene": { ru: "Применить сцену", en: "Apply scene" },
  "chat.applyPrompt": { ru: "Применить правку", en: "Apply edit" },
  "chat.suggestion": { ru: "Предложение готово", en: "Suggestion ready" },
  "chat.photo": { ru: "Приложить фото", en: "Attach photo" },
  "chat.photoAttached": {
    ru: "Фото будет приложено к сообщению",
    en: "The photo will be attached to the message",
  },
  "chat.warn": {
    ru: "Правка убирает канонический блок:",
    en: "The edit removes a canonical block:",
  },
  "err.auth": { ru: "Неверный ключ", en: "Invalid key" },
  "err.credits": { ru: "Закончились кредиты", en: "Out of credits" },
  "err.ratelimit": {
    ru: "Лимит запросов — подождите минуту",
    en: "Rate limited — wait a minute",
  },
  "err.notfound": {
    ru: "Модель не найдена — проверьте название",
    en: "Model not found — check the name",
  },
  "err.novision": {
    ru: "Модель не поддерживает изображения",
    en: "The model doesn't support images",
  },
  "err.network": { ru: "Ошибка сети", en: "Network error" },
  "err.empty": { ru: "Пустой ответ модели", en: "Empty model response" },
  "err.http": { ru: "Ошибка сервиса", en: "Service error" },
  "selfcheck.title": { ru: "Диагностика", en: "Diagnostics" },
  "selfcheck.hint": {
    ru: "Проверяет целостность сборки промптов и ключевых правил.",
    en: "Checks prompt-builder integrity and core rules.",
  },
  "selfcheck.run": { ru: "Запустить диагностику", en: "Run diagnostics" },
  "selfcheck.pass": { ru: "Диагностика пройдена", en: "Diagnostics passed" },
  "selfcheck.fail": { ru: "Не пройдено:", en: "Failed:" },
  "demo.note": {
    ru: "Нет персонажа? Загрузите демо-персонажа June и посмотрите, как всё работает.",
    en: "No character yet? Load the demo character June and see how everything works.",
  },
  "demo.try": { ru: "Попробовать с примером", en: "Try with an example" },

  // --- Fix Pack 9: scene library, packs, video hub, frames, export -----------
  "lib.title": { ru: "Библиотека сцен", en: "Scene library" },
  "lib.subtitle": {
    ru: "Паки сцен и сохранённые сцены",
    en: "Scene packs and saved scenes",
  },
  "lib.save": { ru: "Сохранить сцену", en: "Save scene" },
  "lib.packs": { ru: "Паки сцен", en: "Scene packs" },
  "lib.saved.title": { ru: "Мои сцены", en: "My scenes" },
  "lib.search": { ru: "Поиск по сценам", en: "Search scenes" },
  "lib.empty": {
    ru: "Пока нет сохранённых сцен",
    en: "No saved scenes yet",
  },
  "lib.delete": { ru: "Удалить сцену", en: "Delete scene" },
  "lib.tech": { ru: "Приёмы пака", en: "Pack techniques" },
  "hub.cta": {
    ru: "→ Видео из этого кадра",
    en: "→ Video from this frame",
  },
  "hub.title": { ru: "Куда дальше?", en: "Where next?" },
  "hub.subtitle": {
    ru: "Кадр из Nano станет основой видео",
    en: "The Nano frame becomes the base of the video",
  },
  "hub.kling": {
    ru: "Kling 3.0 — движение по референсу",
    en: "Kling 3.0 — motion from a reference",
  },
  "hub.veo": {
    ru: "Veo — сцена с диалогом",
    en: "Veo — a scene with dialogue",
  },
  "hub.seedance": {
    ru: "Seedance — короткий динамичный клип",
    en: "Seedance — a short dynamic clip",
  },
  "hub.cancel": { ru: "Отмена", en: "Cancel" },
  "hub.dismiss": { ru: "Скрыть", en: "Dismiss" },
  "hub.kling.title": {
    ru: "Kling Motion Control — чек-лист",
    en: "Kling Motion Control — checklist",
  },
  "hub.kling.s1": {
    ru: "Кадр-основа — фото из Nano",
    en: "Base frame — the Nano photo",
  },
  "hub.kling.s2": {
    ru: "Референс движения — видео 3–30 сек",
    en: "Motion reference — a 3–30 sec video",
  },
  "hub.kling.s3": {
    ru: "Ориентация — переключатель: финал следует за фото или за видео-референсом",
    en: "Orientation — a switch: the result follows the photo or the reference video",
  },
  "hub.kling.s4": {
    ru: "Привяжите лицо: 1–4 фото идентичности",
    en: "Bind the face: 1–4 identity photos",
  },
  "hub.kling.s5": {
    ru: "Промпт описывает сцену и фон, НЕ движение",
    en: "The prompt describes the scene and background, NOT the motion",
  },
  "hub.kling.warn": {
    ru: "Сложное движение = короче результат: модель оставляет валидные сегменты от 3 сек, кредиты не возвращаются",
    en: "Complex motion = shorter output: the model keeps valid segments of 3+ sec, credits are not refunded",
  },
  "hub.veo.hint": {
    ru: "Совет: задайте первый и последний кадр ниже — Veo интерполирует между ними",
    en: "Tip: set the first and last frames below — Veo interpolates between them",
  },
  "hub.seedance.hint": {
    ru: "Совет: Seedance любит короткие промпты (50–70 слов) и простое движение",
    en: "Tip: Seedance likes short prompts (50–70 words) and simple motion",
  },
  "frames.title": {
    ru: "Первый и последний кадр (Veo)",
    en: "First and last frame (Veo)",
  },
  "frames.first": { ru: "Первый кадр", en: "First frame" },
  "frames.last": { ru: "Последний кадр", en: "Last frame" },
  "frames.add": { ru: "Добавить кадр", en: "Add frame" },
  "frames.remove": { ru: "Убрать кадр", en: "Remove frame" },
  "frames.hint": {
    ru: "Veo интерполирует между кадрами. Первый кадр — фото из Nano",
    en: "Veo interpolates between the frames. First frame — the Nano photo",
  },
  "conflict.location": {
    ru: "Конфликт локации",
    en: "Location conflict",
  },
  "conflict.locationHint": {
    ru: "Текст сцены главнее фото-референса. Из фото:",
    en: "Scene text outranks the photo reference. From the photo:",
  },
  "export.title": { ru: "Экспорт пакета", en: "Export package" },
  "export.copyAll": { ru: "Копировать всё", en: "Copy all" },
  "export.copied": { ru: "Скопировано", en: "Copied" },
  "export.txt": { ru: "Скачать .txt", en: "Download .txt" },
  "export.json": { ru: "Скачать .json", en: "Download .json" },

  // --- Fix Pack 10: product slot, passport versions, multishot, vision cache ---
  "ref.product.title": { ru: "Товар", en: "Product" },
  "ref.product.add": { ru: "Добавить фото товара", en: "Add a product photo" },
  "ref.product.remove": { ru: "Убрать товар", en: "Remove product" },
  "ref.product.pending": {
    ru: "Нажмите «Анализ», чтобы получить описание товара",
    en: "Tap Analyze to get the product description",
  },
  "ref.product.hint": {
    ru: "Товар описывается отдельно и попадает в промпт. На лицо и локацию он не влияет.",
    en: "The product is described separately and goes into the prompt. It never affects the face or the location.",
  },
  "ref.cacheHit": {
    ru: "Часть фото взята из кэша анализа — без запроса к API",
    en: "Some photos came from the analysis cache — no API call",
  },
  "passport.versions": { ru: "Версии паспорта", en: "Passport versions" },
  "passport.versions.restore": { ru: "Восстановить", en: "Restore" },
  "passport.versions.hint": {
    ru: "Снимок создаётся при каждом сохранении в библиотеку. Хранятся последние 10.",
    en: "A snapshot is taken on every save to the library. The last 10 are kept.",
  },
  // Fix Pack 11.2: formats, mix, fine-tuning, roles, hints.
  "fmt.label": { ru: "Формат", en: "Format" },
  "fmt.single": { ru: "Кадр", en: "Frame" },
  "fmt.series": { ru: "Серия", en: "Series" },
  "fmt.shoot": { ru: "Съёмка", en: "Shoot" },
  "fmt.feed": { ru: "Лента", en: "Feed" },
  "fmt.size": { ru: "Размер", en: "Size" },
  "mix.label": { ru: "Микс", en: "Mix" },
  "mix.hint": {
    ru: "1–3 пака; чужой мир — с пометкой",
    en: "1–3 packs; a foreign world gets flagged",
  },
  "mix.flag": {
    ru: "⚠ Микс миров: реальные профили так не живут — лента помечена",
    en: "⚠ Mixed worlds: real profiles don't live like this — the feed is flagged",
  },
  "gear.title": { ru: "Тонкая настройка", en: "Fine-tuning" },
  "gear.continuity": {
    ru: "Континуити: одно место, один день",
    en: "Continuity: one place, one day",
  },
  "gear.captions": { ru: "Подписи", en: "Captions" },
  "gear.codex": { ru: "Codex", en: "Codex" },
  "gear.strict": { ru: "Строго", en: "Strict" },
  "gear.live": { ru: "Живо", en: "Live" },
  "gear.mods": { ru: "Модификаторы", en: "Modifiers" },
  "hints.label": { ru: "Подсказки", en: "Hints" },
  "hints.dismiss": { ru: "Понятно", en: "Got it" },
  "role.hero": { ru: "hero", en: "hero" },
  "role.detail": { ru: "деталь", en: "detail" },
  "role.cutaway": { ru: "B-roll", en: "B-roll" },
  "role.off": { ru: "OFF", en: "OFF" },
  "feed.reroll": { ru: "Пересобрать", en: "Re-roll" },
  "feed.day": { ru: "день", en: "day" },
  // Fix Pack 11.3: canon editor strings.
  "canon.title": { ru: "Канон", en: "Canon" },
  "canon.tagline": {
    ru: "Шесть блоков, которые закрепляют её мир, голос, предметы, B-roll и привычки. Всё необязательно.",
    en: "Six blocks that anchor her world, voice, objects, B-roll and habits. Everything is optional.",
  },
  "canon.active": { ru: "активен", en: "active" },
  "canon.generate": { ru: "Сгенерировать канон", en: "Generate canon" },
  "canon.regenerate": { ru: "Пересгенерировать", en: "Re-generate" },
  "canon.generating": { ru: "Генерирую…", en: "Generating…" },
  "canon.clear": { ru: "Очистить", en: "Clear" },
  "canon.needKey": {
    ru: "Добавьте API-ключ в настройках, чтобы сгенерировать канон.",
    en: "Add an API key in settings to generate the canon.",
  },
  "canon.error": {
    ru: "Не удалось сгенерировать — попробуйте ещё раз.",
    en: "Generation failed — try again.",
  },
  "canon.filled": {
    ru: "✓ Канон активен: её голос, предметы и привычки получают приоритет при сборке.",
    en: "✓ Canon active: her voice, objects and habits are prioritized during generation.",
  },
  "canon.who": { ru: "Кто она", en: "Who she is" },
  "canon.who.hint": {
    ru: "1–2 коротких фразы: архетип + вайб → MOOD каждого промпта",
    en: "1–2 short phrases: archetype + vibe → MOOD of every prompt",
  },
  "canon.place": { ru: "Её место", en: "Her place" },
  "canon.place.hint": {
    ru: "Город + тип жилья; 2–3 интерьерные фразы на английском, по одной в строке → локации для B-roll",
    en: "City + type of home; 2–3 interior phrases in English, one per line → B-roll locations",
  },
  "canon.objects": { ru: "Её предметы", en: "Her objects" },
  "canon.objects.hint": {
    ru: "5–7 личных вещей по-английски, конкретно и с характером → повторяющиеся личные предметы персонажа в кадре",
    en: "5–7 personal objects in English, concrete and distinctive → recurring personal objects in frame",
  },
  "canon.world": {
    ru: "Домашний мир и любимые паки",
    en: "Home world & favorite packs",
  },
  "canon.world.hint": {
    ru: "Мир задаёт базовую библиотеку; выбранные паки получают приоритет (до 3).",
    en: "The world sets the base library; selected packs get priority (up to 3).",
  },
  "canon.voice": { ru: "Голос", en: "Voice" },
  "canon.voice.style": {
    ru: "Стиль подписей (одна строка)",
    en: "Caption style (one line)",
  },
  "canon.voice.words": {
    ru: "Её слова и фразы (по одному в строке)",
    en: "Her words and phrases (one per line)",
  },
  "canon.voice.hint": {
    ru: "Задаёт подписи для hero/detail; B-roll и OFF остаются без изменений.",
    en: "Sets captions for hero/detail; B-roll and OFF stay unchanged.",
  },
  "canon.habits": { ru: "Телесные привычки", en: "Body habits" },
  "canon.habits.hint": {
    ru: "2–3 привычки в кадре по-английски — повторяющиеся позы и жесты персонажа.",
    en: "2–3 in-frame habits in English — recurring poses and gestures for the character.",
  },
  "canon.nudge": {
    ru: "Хотите, чтобы B-roll и подписи стали частью её собственного мира — сгенерируйте канон в паспорте.",
    en: "Want B-roll and captions to feel like part of her own world — generate the canon in the passport.",
  },
  "canon.nudge.dismiss": { ru: "Понятно", en: "Got it" },
  "ms.label": { ru: "Мультишот", en: "Multi-shot" },
  "ms.off": { ru: "Выкл", en: "Off" },
  "ms.hint": {
    ru: "До 6 шотов по 3 с в одном промпте Kling — единая сцена и персонаж",
    en: "Up to 6 shots of 3 s in one Kling prompt — one scene, one character",
  },
  "ms.warn": {
    ru: "6 шотов × 3 с = 18 с: Kling может обрезать хвост до ~15 с, кредиты за обрезанное не возвращаются",
    en: "6 shots × 3 s = 18 s: Kling may trim the tail to ~15 s, credits for trimmed footage are not refunded",
  },
  // --- Fix Pack 13 ---
  "oneoff.start": { ru: "Разовый персонаж", en: "One-off character" },
  "oneoff.active": {
    ru: "Разовый персонаж: не сохраняется в библиотеку",
    en: "One-off character: not saved to the library",
  },
  "oneoff.clear": { ru: "Очистить", en: "Clear" },
  "oneoff.discard": {
    ru: "Разовый персонаж не сохранён и будет потерян. Продолжить?",
    en: "The one-off character is not saved and will be lost. Continue?",
  },
  "anti.title": {
    ru: "Контроль реализма",
    en: "Realism control",
  },
  "strength.label": { ru: "Готовность промпта", en: "Prompt readiness" },
  "strength.gaps": { ru: "Что добавить", en: "What to add" },
  "strength.gap.location": {
    ru: "локация не задана — опишите место съёмки",
    en: "no location — describe where the shot happens",
  },
  "strength.gap.lighting": {
    ru: "свет не задан — укажите источник и характер света",
    en: "no lighting — name the light source and its character",
  },
  "strength.gap.pose": {
    ru: "поза не задана — что делает персонаж в кадре",
    en: "no pose — what the character is doing in frame",
  },
  "strength.gap.outfit": {
    ru: "одежда не задана — опишите образ",
    en: "no outfit — describe the look",
  },
  "strength.gap.capture": {
    ru: "съёмка не настроена — выберите камеру или плёнку в Capture",
    en: "capture not set — pick a camera or film in Capture",
  },
  "strength.gap.realism": {
    ru: "мало реализм-тегов — добавьте минимум два",
    en: "few realism tags — add at least two",
  },
  "strength.gap.motion": {
    ru: "движение не задано — опишите действие для видео",
    en: "no motion — describe the action for video",
  },
  "strength.gap.identity": {
    ru: "внешность пуста — заполните описание или добавьте референсы",
    en: "identity is empty — fill the description or add reference photos",
  },
  "strength.gap.anomaly": {
    ru: "Anomaly Lock пуст — добавьте родинки/асимметрию для узнаваемости",
    en: "Anomaly Lock is empty — add moles/asymmetry for consistency",
  },
  "strength.gap.character": {
    ru: "персонаж не подключён — без паспорта лицо будет плыть между кадрами",
    en: "no character attached — without a passport the face drifts between frames",
  },
  "journal.hit": { ru: "Сработал", en: "Worked" },
  "journal.miss": { ru: "Не принят", en: "Rejected" },
  "journal.stats": { ru: "Журнал попаданий", en: "Hit journal" },
  "journal.rate": { ru: "попаданий", en: "hit rate" },
  "journal.rated": { ru: "оценено", en: "rated" },
  "export.shotlist": { ru: "Шот-лист (.md)", en: "Shot list (.md)" },
  "whatsnew.title": { ru: "Что нового", en: "What's new" },
  "backup.due": {
    ru: "Давно не было резервной копии — данные живут только в этом браузере. Скачайте экспорт ниже.",
    en: "No recent backup — data lives only in this browser. Download the export below.",
  },
  "hotkeys.hint": {
    ru: "⌘/Ctrl+Enter — сгенерировать · C — копировать промпт · ? — все горячие клавиши",
    en: "⌘/Ctrl+Enter — generate · C — copy the prompt · ? — all shortcuts",
  },

  // --- Fix Pack 21: undo/redo + hotkey sheet ---
  "undo.label": { ru: "Отменить генерацию (⌘Z)", en: "Undo generation (⌘Z)" },
  "redo.label": { ru: "Вернуть отменённое (⇧⌘Z)", en: "Redo (⇧⌘Z)" },
  "hk.title": { ru: "Горячие клавиши", en: "Keyboard shortcuts" },
  "hk.generate": { ru: "Сгенерировать промпт", en: "Generate the prompt" },
  "hk.copy": { ru: "Скопировать первый промпт", en: "Copy the first prompt" },
  "hk.engines": {
    ru: "Переключить видео-модель",
    en: "Switch the video model",
  },
  "hk.undo": {
    ru: "Отменить последнюю генерацию",
    en: "Undo the last generation",
  },
  "hk.redo": {
    ru: "Вернуть отменённую генерацию",
    en: "Redo the undone generation",
  },
  "hk.sheet": {
    ru: "Показать / скрыть эту подсказку",
    en: "Show / hide this sheet",
  },
  "doctor.title": {
    ru: "Prompt Doctor — что улучшить",
    en: "Prompt Doctor — what to improve",
  },
  "doctor.sev.fix": { ru: "Исправить", en: "Fix" },
  "doctor.sev.tip": { ru: "Совет", en: "Tip" },
  "doctor.character": {
    ru: "Создайте паспорт персонажа — это главный якорь лица.",
    en: "Create a character passport — the main anchor for the face.",
  },
  "doctor.identity": {
    ru: "Заполните описание внешности или добавьте референс-фото.",
    en: "Fill in the appearance description or add a reference photo.",
  },
  "doctor.anomaly": {
    ru: "Добавьте Anomaly Lock: шрам, родинки, асимметрию — против «пластикового» лица.",
    en: "Add an Anomaly Lock: a scar, moles, asymmetry — against the plastic AI face.",
  },
  "doctor.location": {
    ru: "Опишите место точнее — конкретная локация задаёт кадр.",
    en: "Describe the location more precisely — it anchors the frame.",
  },
  "doctor.lighting": {
    ru: "Укажите свет: направление, жёсткость, источник.",
    en: "Specify the light: direction, hardness, source.",
  },
  "doctor.pose": {
    ru: "Добавьте позу или действие — иначе кадр общий и статичный.",
    en: "Add a pose or action — otherwise the frame stays generic.",
  },
  "doctor.outfit": {
    ru: "Опишите одежду — ткань и посадка повышают реализм.",
    en: "Describe the outfit — fabric and fit lift realism.",
  },
  "doctor.capture": {
    ru: "Выберите устройство/оптику съёмки или зерно плёнки.",
    en: "Pick a capture device / optics or film grain.",
  },
  "doctor.realism": {
    ru: "Добавьте хотя бы два маркера реализма (кожа, свет, несовершенства).",
    en: "Add at least two realism markers (skin, light, imperfections).",
  },
  "doctor.motion": {
    ru: "Для видео опишите действие — что именно происходит в кадре.",
    en: "For video, describe the action — what actually happens in frame.",
  },
  "doctor.camera": {
    ru: "Задайте движение камеры (статично, наезд, ручная).",
    en: "Set a camera move (static, push-in, handheld).",
  },
  "doctor.short": {
    ru: "Промпт короткий — добавьте деталей, чтобы модель не додумывала.",
    en: "The prompt is short — add detail so the model doesn't improvise.",
  },
  "canonupd.title": { ru: "Обновления канона", en: "Canon updates" },
  "canonupd.check": { ru: "Проверить", en: "Check" },
  "canonupd.loading": { ru: "Проверяем…", en: "Checking…" },
  "canonupd.error": {
    ru: "Не удалось загрузить манифест обновлений.",
    en: "Couldn't load the update manifest.",
  },
  "canonupd.new": { ru: "Новое", en: "New" },
  "canonupd.markseen": { ru: "Отметить прочитанным", en: "Mark as seen" },
} satisfies Record<string, Entry>;

/**
 * Every known dictionary key (FP23) - gives t() autocomplete while still
 * allowing dynamically built ids like `fmt.` + format.
 */
export type I18nKey = keyof typeof DICT;

export function t(key: I18nKey | (string & {}), lang: Lang): string {
  const e = (DICT as Record<string, Entry>)[key];
  if (!e) return key;
  return e[lang] || e.en;
}

export function detectLang(): Lang {
  if (typeof navigator === "undefined") return "en";
  return navigator.language?.toLowerCase().startsWith("ru") ? "ru" : "en";
}
