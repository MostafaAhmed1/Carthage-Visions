/**
 * ============================================================================
 *  CATALOG DATA — PLACEHOLDER CONTENT
 *  ----------------------------------------------------------------------------
 *  Every product, price and specification below is illustrative placeholder
 *  copy written for layout purposes. Replace with your real catalogue before
 *  launch. No certifications or brand partnerships are claimed anywhere.
 *
 *  HOW TO EDIT
 *  -----------
 *  • Each product is one object. Copy a block, change `slug` (URL), `category`
 *    (must match a slug in `categories`) and the bilingual fields.
 *  • `images` uses keys from src/config/media.js (product photography).
 *  • `specs` renders as clean rows; keep 4–6 rows per product.
 *  • `priceFrom: null` shows "request a price" instead of "from OMR X".
 *  • `featured: true` puts the product on the home page (max 4 recommended).
 *  • Order inside a category follows this file, so drag blocks to reorder.
 * ============================================================================
 */

// Flip to false once the catalogue below is your real stock (enables indexing).
export const placeholderCatalog = true

export const categories = [
  {
    slug: 'cctv',
    name: { ar: 'كاميرات المراقبة', en: 'CCTV cameras' },
    short: { ar: 'داخلية وخارجية', en: 'Indoor & outdoor' },
    blurb: {
      ar: 'كاميرات ثابتة للبيت والمحل، بزوايا مدروسة وصورة واضحة ليلاً.',
      en: 'Fixed cameras for homes and shops, with considered angles and clear night image.',
    },
    image: 'product:dome',
  },
  {
    slug: 'ip-ptz',
    name: { ar: 'كاميرات IP و PTZ', en: 'IP & PTZ cameras' },
    short: { ar: 'شبكية ومتحركة', en: 'Network & moving' },
    blurb: {
      ar: 'كاميرات شبكية عالية الدقة، وبعضها يدور ويقرّب بلمسة واحدة.',
      en: 'High-resolution network cameras — some pan, tilt and zoom with a single tap.',
    },
    image: 'product:ptz',
  },
  {
    slug: 'nvr-dvr',
    name: { ar: 'أجهزة التسجيل', en: 'NVR & DVR recorders' },
    short: { ar: 'NVR و DVR', en: 'NVR & DVR' },
    blurb: {
      ar: 'قلب النظام: جهاز يسجّل كل كاميرا ويحفظ شهراً كاملاً.',
      en: 'The heart of the system: one recorder that keeps a full month of footage.',
    },
    image: 'product:nvr',
  },
  {
    slug: 'access-control',
    name: { ar: 'التحكم بالدخول', en: 'Access control' },
    short: { ar: 'أبواب وبوابات', en: 'Doors & gates' },
    blurb: {
      ar: 'من يدخل، ومتى، وبأي باب — دون مفاتيح ضائعة.',
      en: 'Who came in, when, and through which door — without lost keys.',
    },
    image: 'product:access',
  },
  {
    slug: 'alarms',
    name: { ar: 'الإنذار والحساسات', en: 'Alarms & sensors' },
    short: { ar: 'تنبيه مبكر', en: 'Early warning' },
    blurb: {
      ar: 'حساسات هادئة تتنبّه قبل أن ترى، وتنبّهك حين يهمّ الأمر.',
      en: 'Quiet sensors that notice before you do, and only alert you when it matters.',
    },
    image: 'product:alarm',
  },
  {
    slug: 'intercom',
    name: { ar: 'الإنتركم والبوابات', en: 'Intercom & entry' },
    short: { ar: 'صوت وصورة', en: 'Video & audio' },
    blurb: {
      ar: 'رى من على الباب وتكلّم معه من هاتفك، أينما كنت.',
      en: 'See and speak to whoever is at the gate, from wherever you are.',
    },
    image: 'product:intercom',
  },
  {
    slug: 'accessories',
    name: { ar: 'الملحقات', en: 'Accessories' },
    short: { ar: 'تخزين وتمديدات', en: 'Storage & cabling' },
    blurb: {
      ar: 'أقراص تسجيل وكوابل ومحولات — التفاصيل التي تُبقي النظام يعمل.',
      en: 'Recording drives, cable and power — the details that keep a system running.',
    },
    image: 'product:hdd',
  },
]

const incl = (items) => items.map(([en, ar]) => ({ en, ar }))

export const products = [
  /* ---------------------------------------------------------------- CCTV --- */
  {
    slug: 'dome-indoor-4mp',
    category: 'cctv',
    name: { ar: 'كاميرا قبّة داخلية 4 ميجابكسل', en: 'Indoor dome camera 4 MP' },
    summary: {
      ar: 'للمجالس والممرات — غير بارزة وواسعة الزاوية.',
      en: 'For majlis and corridors — discreet, wide and calm.',
    },
    description: {
      ar: 'قبّة بيضاء صغيرة تُثبَّت في السقف ولا تلفت النظر. تغطّي زاوية واسعة بصورة واضحة نهاراً، وتُظهر تفاصيل الممر ليلاً.',
      en: 'A small white dome that sits flush to the ceiling without drawing attention. A wide field of view by day, and enough detail to read a corridor at night.',
    },
    images: ['product:dome', 'scene:business'],
    specs: [
      {
        label: { ar: 'الدقة', en: 'Resolution' },
        value: { ar: '4 ميجابكسل · 2560×1440', en: '4 MP · 2560×1440' },
      },
      {
        label: { ar: 'الرؤية الليلية', en: 'Night vision' },
        value: { ar: 'حتى 20 م · بالأشعة', en: 'Up to 20 m · infrared' },
      },
      {
        label: { ar: 'العدسة', en: 'Lens' },
        value: { ar: '2.8 ملم · زاوية 105°', en: '2.8 mm · 105° view' },
      },
      { label: { ar: 'التثبيت', en: 'Mounting' }, value: { ar: 'سقفي · داخلي', en: 'Ceiling · indoor' } },
      { label: { ar: 'التسجيل', en: 'Recording' }, value: { ar: 'مع جهاز NVR/DVR', en: 'Via NVR/DVR' } },
    ],
    bestFor: {
      ar: ['مجلس أو صالة', 'ممر داخلي', 'استقبال محل صغير'],
      en: ['Majlis or living room', 'Indoor corridor', 'Small shop reception'],
    },
    included: incl([
      ['Camera, bracket and fixings', 'الكاميرا والحامل وأدوات التثبيت'],
      ['Cabling to the recorder', 'التمديد حتى جهاز التسجيل'],
      ['Phone app setup before handover', 'ضبط تطبيق الهاتف قبل التسليم'],
    ]),
    priceFrom: 45,
    featured: true,
  },
  {
    slug: 'bullet-outdoor-5mp',
    category: 'cctv',
    name: { ar: 'كاميرا بولت خارجية 5 ميجابكسل', en: 'Outdoor bullet camera 5 MP' },
    summary: {
      ar: 'للواجهات والبوابات — صورة ملوّنة حتى في الظلام.',
      en: 'For facades and gates — colour image even after dark.',
    },
    description: {
      ar: 'مصمّمة للخارج: هيكل مقاوم للغبار والرشّ، وعدسة تُظهر لوحة السيارة عند البوابة. تبقى الألوان واضحة بعد منتصف الليل.',
      en: 'Built for the outside: a body sealed against dust and rain, and a lens that reads a plate at the gate. Colours stay true well after midnight.',
    },
    images: ['product:bullet', 'scene:villa'],
    specs: [
      {
        label: { ar: 'الدقة', en: 'Resolution' },
        value: { ar: '5 ميجابكسل · 2880×1620', en: '5 MP · 2880×1620' },
      },
      {
        label: { ar: 'الرؤية الليلية', en: 'Night vision' },
        value: { ar: 'حتى 40 م · ملوّنة', en: 'Up to 40 m · colour' },
      },
      {
        label: { ar: 'مقاومة الطقس', en: 'Weather rating' },
        value: { ar: 'IP66 · للخارج', en: 'IP66 · outdoor' },
      },
      { label: { ar: 'العدسة', en: 'Lens' }, value: { ar: '4 ملم · زاوية 90°', en: '4 mm · 90° view' } },
      {
        label: { ar: 'الاستخدام', en: 'Use case' },
        value: { ar: 'واجهة، بوابة، ساحة', en: 'Facade, gate, yard' },
      },
    ],
    bestFor: {
      ar: ['واجهة فيلّا', 'مدخل بوابة', 'ساحة صغيرة'],
      en: ['Villa facade', 'Gate entrance', 'Small yard'],
    },
    included: incl([
      ['Camera, bracket and fixings', 'الكاميرا والحامل وأدوات التثبيت'],
      ['Outdoor cabling and sealing', 'تمديد خارجي وعزل الوصلات'],
      ['Phone app setup before handover', 'ضبط تطبيق الهاتف قبل التسليم'],
    ]),
    priceFrom: 58,
    featured: true,
  },
  {
    slug: 'turret-4mp',
    category: 'cctv',
    name: { ar: 'كاميرا تيرت 4 ميجابكسل', en: 'Turret camera 4 MP' },
    summary: {
      ar: 'ضوء أحمر غير مزعج، ورؤية ليلية أنقى.',
      en: 'A softer red glow, and cleaner night footage.',
    },
    description: {
      ar: 'شكل التيرت يعطي إضاءة ليلية أنقى وزاوية أوسع من البولت التقليدي. مناسبة للمداخل والحدائق حيث لا تريد ضوءاً مباشراً في العين.',
      en: 'The turret shape gives cleaner night light and a wider angle than a traditional bullet. Suited to entrances and gardens where direct glare would be unwelcome.',
    },
    images: ['product:turret', 'scene:home'],
    specs: [
      {
        label: { ar: 'الدقة', en: 'Resolution' },
        value: { ar: '4 ميجابكسل · 2560×1440', en: '4 MP · 2560×1440' },
      },
      {
        label: { ar: 'الرؤية الليلية', en: 'Night vision' },
        value: { ar: 'حتى 30 م · ملوّنة', en: 'Up to 30 m · colour' },
      },
      {
        label: { ar: 'مقاومة الطقس', en: 'Weather rating' },
        value: { ar: 'IP67 · للخارج', en: 'IP67 · outdoor' },
      },
      {
        label: { ar: 'العدسة', en: 'Lens' },
        value: { ar: '2.8 ملم · زاوية 110°', en: '2.8 mm · 110° view' },
      },
      {
        label: { ar: 'التثبيت', en: 'Mounting' },
        value: { ar: 'جداري · داخلي وخارجي', en: 'Wall · indoor & outdoor' },
      },
    ],
    bestFor: {
      ar: ['حديقة أو فناء', 'مدخل جانبي', 'مزرعة صغيرة'],
      en: ['Garden or courtyard', 'Side entrance', 'Small farm'],
    },
    included: incl([
      ['Camera, bracket and fixings', 'الكاميرا والحامل وأدوات التثبيت'],
      ['Cabling to the recorder', 'التمديد حتى جهاز التسجيل'],
      ['Night image checked after dusk', 'فحص صورة الليل بعد المغيب'],
    ]),
    priceFrom: 54,
  },

  /* -------------------------------------------------------------- IP/PTZ --- */
  {
    slug: 'ptz-speed-dome-4mp',
    category: 'ip-ptz',
    name: { ar: 'كاميرا PTZ دوّارة 4 ميجابكسل', en: 'PTZ speed dome 4 MP' },
    summary: {
      ar: 'تدور 360° وتقرّب عن بُعد — لمساحات واسعة.',
      en: 'Full 360° pan and remote zoom — for generous ground.',
    },
    description: {
      ar: 'كاميرا واحدة تغطّي ساحة كاملة: تدور وتقرّب من التطبيق، وتعود تلقائياً إلى موقعها. الخيار العملية للمزارع والمواقف.',
      en: 'One camera for a whole yard: pan and zoom from the app, with an automatic return to its home position. The practical choice for farms and parking areas.',
    },
    images: ['product:ptz', 'scene:site'],
    specs: [
      {
        label: { ar: 'الدقة', en: 'Resolution' },
        value: { ar: '4 ميجابكسل · 2560×1440', en: '4 MP · 2560×1440' },
      },
      { label: { ar: 'التقريب', en: 'Zoom' }, value: { ar: 'بصري ×4', en: '4× optical' } },
      {
        label: { ar: 'الدوران', en: 'Movement' },
        value: { ar: '360° أفقي · 90° رأسي', en: '360° pan · 90° tilt' },
      },
      { label: { ar: 'الرؤية الليلية', en: 'Night vision' }, value: { ar: 'حتى 50 م', en: 'Up to 50 m' } },
      {
        label: { ar: 'مقاومة الطقس', en: 'Weather rating' },
        value: { ar: 'IP66 · للخارج', en: 'IP66 · outdoor' },
      },
    ],
    bestFor: {
      ar: ['مزرعة أو ساحة', 'موقف سيارات', 'موقع عمل'],
      en: ['Farm or yard', 'Parking area', 'Work site'],
    },
    included: incl([
      ['Camera, wall bracket and fixings', 'الكاميرا والحامل الجداري وأدوات التثبيت'],
      ['Preset positions configured for you', 'ضبط مواقع الدوران المسبقة'],
      ['App walkthrough before handover', 'شرح التطبيق قبل التسليم'],
    ]),
    priceFrom: 165,
    featured: true,
  },
  {
    slug: 'ip-dome-8mp',
    category: 'ip-ptz',
    name: { ar: 'كاميرا IP قبّة 8 ميجابكسل', en: 'IP dome camera 8 MP' },
    summary: {
      ar: 'وضوح عالٍ يقرأ اللوحات والوجوه.',
      en: 'High clarity that reads plates and faces.',
    },
    description: {
      ar: 'دقة 8 ميجابكسل على شبكة واحدة، مع إمكانية تسجيل مستقل داخل الكاميرا. مناسبة حين تحتاج تفصيلاً لا مجرد صورة عامة.',
      en: '8 MP over a single network cable, with optional on-board recording. For when you need detail, not just an overview.',
    },
    images: ['product:dome', 'scene:retail'],
    specs: [
      {
        label: { ar: 'الدقة', en: 'Resolution' },
        value: { ar: '8 ميجابكسل · 3840×2160', en: '8 MP · 3840×2160' },
      },
      { label: { ar: 'الاتصال', en: 'Connection' }, value: { ar: 'شبكة PoE', en: 'PoE network' } },
      { label: { ar: 'الرؤية الليلية', en: 'Night vision' }, value: { ar: 'حتى 30 م', en: 'Up to 30 m' } },
      {
        label: { ar: 'التخزين', en: 'Storage' },
        value: { ar: 'بطاقة داخلية أو NVR', en: 'On-board card or NVR' },
      },
      {
        label: { ar: 'العدسة', en: 'Lens' },
        value: { ar: '2.8 ملم · زاوية 102°', en: '2.8 mm · 102° view' },
      },
    ],
    bestFor: {
      ar: ['محل أو مكتب', 'مدخل رئيسي', 'صندوق بيع'],
      en: ['Shop or office', 'Main entrance', 'Point of sale'],
    },
    included: incl([
      ['Camera, bracket and fixings', 'الكاميرا والحامل وأدوات التثبيت'],
      ['Network switch configuration', 'ضبط مُبدّل الشبكة'],
      ['Storage sized to your retention', 'تحديد سعة التخزين حسب المدة المطلوبة'],
    ]),
    priceFrom: 92,
  },

  /* ------------------------------------------------------------ NVR/DVR --- */
  {
    slug: 'nvr-8-channel',
    category: 'nvr-dvr',
    name: { ar: 'جهاز تسجيل شبكي 8 قنوات', en: 'Network recorder, 8 channels' },
    summary: {
      ar: 'يشغّل ثماني كاميرات ويحفظ ثلاثين يوماً.',
      en: 'Runs eight cameras and keeps thirty days.',
    },
    description: {
      ar: 'الجهاز الذي يجمع كل الكاميرات في مكان واحد. هادئ بلا مروحة مزعجة، ويُدار من التطبيق أو من الشاشة.',
      en: 'The piece that brings every camera together. Quiet in operation, managed from the app or the screen beside it.',
    },
    images: ['product:nvr'],
    specs: [
      { label: { ar: 'القنوات', en: 'Channels' }, value: { ar: '8 قنوات IP', en: '8 IP channels' } },
      {
        label: { ar: 'التخزين', en: 'Storage' },
        value: { ar: 'قرص واحد حتى 8 تيرابايت', en: 'One drive, up to 8 TB' },
      },
      { label: { ar: 'مدة التسجيل', en: 'Retention' }, value: { ar: 'حتى 30 يوماً', en: 'Up to 30 days' } },
      {
        label: { ar: 'الاتصال', en: 'Connectivity' },
        value: { ar: 'شبكة · تطبيق الهاتف', en: 'Network · phone app' },
      },
      { label: { ar: 'الصوت', en: 'Audio' }, value: { ar: 'قناة واحدة', en: 'One channel' } },
    ],
    bestFor: {
      ar: ['منزل أو شقة', 'محل صغير', 'مكتب'],
      en: ['Home or apartment', 'Small shop', 'Office'],
    },
    included: incl([
      ['Recorder, power supply and mounting', 'الجهاز ومصدر الطاقة والتثبيت'],
      ['Drive installed and formatted', 'تركيب القرص وتهيئته'],
      ['App pairing and backup test', 'ربط التطبيق وفحص النسخ الاحتياطي'],
    ]),
    priceFrom: 85,
    featured: true,
  },
  {
    slug: 'dvr-16-channel',
    category: 'nvr-dvr',
    name: { ar: 'جهاز تسجيل 16 قناة', en: 'Recorder, 16 channels' },
    summary: {
      ar: 'للمحلات والمواقع التي تكبر.',
      en: 'For shops and sites that keep growing.',
    },
    description: {
      ar: 'ست عشرة قناة تتّسع لنظام كامل اليوم ولباقي توسعة الغد. يقبل الكاميرات القديمة عند الترقية تدريجياً.',
      en: 'Sixteen channels that hold a full system today and tomorrow’s addition. Accepts existing cameras when you upgrade gradually.',
    },
    images: ['product:nvr', 'scene:site'],
    specs: [
      { label: { ar: 'القنوات', en: 'Channels' }, value: { ar: '16 قناة', en: '16 channels' } },
      {
        label: { ar: 'التخزين', en: 'Storage' },
        value: { ar: 'قرصان حتى 16 تيرابايت', en: 'Two drives, up to 16 TB' },
      },
      { label: { ar: 'مدة التسجيل', en: 'Retention' }, value: { ar: 'حتى 45 يوماً', en: 'Up to 45 days' } },
      {
        label: { ar: 'الاتصال', en: 'Connectivity' },
        value: { ar: 'شبكة · تطبيق الهاتف', en: 'Network · phone app' },
      },
      {
        label: { ar: 'التهيئة', en: 'Setup' },
        value: { ar: 'مختلطة قديم وجديد', en: 'Mixed old and new cameras' },
      },
    ],
    bestFor: {
      ar: ['محل بفرعين', 'مستودع', 'مبنى إداري صغير'],
      en: ['Two-branch shop', 'Warehouse', 'Small office building'],
    },
    included: incl([
      ['Recorder, power supply and mounting', 'الجهاز ومصدر الطاقة والتثبيت'],
      ['Drives installed and formatted', 'تركيب الأقراص وتهيئتها'],
      ['Channel map written for your team', 'مخطط القنوات لفريقك'],
    ]),
    priceFrom: 130,
  },

  /* -------------------------------------------------------- Access control -- */
  {
    slug: 'smart-lock-touch',
    category: 'access-control',
    name: { ar: 'قفل ذكي بشاشة لمس', en: 'Smart lock with touch keypad' },
    summary: {
      ar: 'رمز أو بصمة أو تطبيق — بلا مفاتيح.',
      en: 'Code, fingerprint or app — no keys.',
    },
    description: {
      ar: 'قفل أنيق للباب الرئيسي: افتح بالرمز أو البصمة أو من هاتفك، وامنح رمزاً مؤقتاً للعامل أو الضيف.',
      en: 'A calm lock for the main door: open by code, fingerprint or phone, and issue a temporary code for a helper or a guest.',
    },
    images: ['product:smartlock'],
    specs: [
      {
        label: { ar: 'طرق الفتح', en: 'Entry methods' },
        value: { ar: 'رمز · بصمة · تطبيق · مفتاح', en: 'Code · fingerprint · app · key' },
      },
      { label: { ar: 'البطارية', en: 'Battery' }, value: { ar: 'حتى 10 أشهر', en: 'Up to 10 months' } },
      {
        label: { ar: 'الأبواب', en: 'Door type' },
        value: { ar: 'خشب أو حديد · سماكة 40–90 ملم', en: 'Wood or steel · 40–90 mm' },
      },
      { label: { ar: 'السجل', en: 'History' }, value: { ar: 'آخر 500 عملية فتح', en: 'Last 500 entries' } },
      { label: { ar: 'التنبيه', en: 'Alerts' }, value: { ar: 'عند الفتح والقفل', en: 'On lock and unlock' } },
    ],
    bestFor: {
      ar: ['باب فيلّا رئيسي', 'مكتب إداري', 'شقة للإيجار'],
      en: ['Villa main door', 'Office', 'Rental apartment'],
    },
    included: incl([
      ['Lock, fixings and alignment', 'القفل وأدوات التثبيت والضبط'],
      ['Fitting to your existing door', 'التركيب على الباب الحالي'],
      ['Family codes or fingerprints enrolled', 'تسجيل رموز أو بصمات الأسرة'],
    ]),
    priceFrom: 120,
  },
  {
    slug: 'access-keypad-standalone',
    category: 'access-control',
    name: { ar: 'لوحة دخول مستقلة', en: 'Standalone access keypad' },
    summary: {
      ar: 'باب واحد، تحكّم واضح بمن يدخل.',
      en: 'One door, clear control over who enters.',
    },
    description: {
      ar: 'لوحة معدنية للأبواب الفرعية أو باب المخزن. تعمل دون جهاز حاسب، وتُدار من الكارت أو الرمز.',
      en: 'A metal keypad for side doors and store rooms. Works without a computer, managed by card or code.',
    },
    images: ['product:access'],
    specs: [
      { label: { ar: 'المستخدمون', en: 'Users' }, value: { ar: 'حتى 500', en: 'Up to 500' } },
      { label: { ar: 'الوسيط', en: 'Credentials' }, value: { ar: 'كارت · رمز', en: 'Card · code' } },
      {
        label: { ar: 'التركيب', en: 'Mounting' },
        value: { ar: 'جداري · داخلي وخارجي', en: 'Wall · indoor & outdoor' },
      },
      { label: { ar: 'الطاقة', en: 'Power' }, value: { ar: '12 فولت', en: '12 V' } },
      {
        label: { ar: 'الفتح', en: 'Release' },
        value: { ar: 'قفل كهربائي أو بوابة', en: 'Electric lock or gate' },
      },
    ],
    bestFor: {
      ar: ['باب المخزن', 'باب جانبي', 'بوابة موظفين'],
      en: ['Store room door', 'Side entrance', 'Staff gate'],
    },
    included: incl([
      ['Keypad, power supply and fixings', 'اللوحة ومصدر الطاقة وأدوات التثبيت'],
      ['Wiring to the electric lock', 'التوصيل بالقفل الكهربائي'],
      ['Card and code setup', 'برمجة الكروت والرموز'],
    ]),
    priceFrom: 75,
  },

  /* ---------------------------------------------------------------- Alarms -- */
  {
    slug: 'alarm-panel-kit',
    category: 'alarms',
    name: { ar: 'لوحة إنذار مع حساسات', en: 'Alarm panel with sensors' },
    summary: {
      ar: 'تنبيه فوري على هاتفك عند أي حركة.',
      en: 'An immediate alert on your phone when something moves.',
    },
    description: {
      ar: 'لوحة إنذار صغيرة مع حساسات أبواب وحركة. تعمل بصمت، وترسل تنبيهاً على هاتفك حين يتجاوز شيءٌ مكانه.',
      en: 'A small alarm panel with door and motion sensors. It stays silent, and reaches your phone only when something crosses a line.',
    },
    images: ['product:alarm'],
    specs: [
      { label: { ar: 'المناطق', en: 'Zones' }, value: { ar: '8 مناطق', en: '8 zones' } },
      { label: { ar: 'الحساسات', en: 'Sensors' }, value: { ar: '2 باب · 2 حركة', en: '2 door · 2 motion' } },
      {
        label: { ar: 'التنبيه', en: 'Alerts' },
        value: { ar: 'تطبيق · اتصال اختياري', en: 'App · optional call' },
      },
      {
        label: { ar: 'الطاقة', en: 'Power' },
        value: { ar: 'بطارية احتياطية 12 ساعة', en: '12 h backup battery' },
      },
      {
        label: { ar: 'التحكم', en: 'Control' },
        value: { ar: 'لوحة · تطبيق · ريموت', en: 'Keypad · app · remote' },
      },
    ],
    bestFor: {
      ar: ['منزل في غياب', 'محل بعد الإغلاق', 'مستودع'],
      en: ['Home while away', 'Shop after closing', 'Warehouse'],
    },
    included: incl([
      ['Panel, keypad and sensors', 'اللوحة والكيبورد والحساسات'],
      ['Mounting and cabling', 'التثبيت والتمديد'],
      ['Zones named and tested with you', 'تسمية المناطق واختبارها معك'],
    ]),
    priceFrom: 110,
  },
  {
    slug: 'motion-sensor-outdoor',
    category: 'alarms',
    name: { ar: 'حساس حركة خارجي', en: 'Outdoor motion sensor' },
    summary: {
      ar: 'يميّز الإنسان عن الريح والظل.',
      en: 'Tells a person from wind and shadow.',
    },
    description: {
      ar: 'حساس يُضاف إلى النظام ليرى الحركة في الفناء قبل أن تصل إلى الكاميرا. مصمّم ليقلّل الإنذارات الكاذبة.',
      en: 'An addition to the system that notices movement in the yard before it reaches the camera. Tuned to keep false alerts few.',
    },
    images: ['product:motion'],
    specs: [
      { label: { ar: 'المدى', en: 'Range' }, value: { ar: 'حتى 12 م', en: 'Up to 12 m' } },
      { label: { ar: 'الزاوية', en: 'Field' }, value: { ar: '110°', en: '110°' } },
      {
        label: { ar: 'مقاومة الطقس', en: 'Weather rating' },
        value: { ar: 'IP65 · للخارج', en: 'IP65 · outdoor' },
      },
      { label: { ar: 'البطارية', en: 'Battery' }, value: { ar: 'حتى 2 سنة', en: 'Up to 2 years' } },
      { label: { ar: 'التركيب', en: 'Mounting' }, value: { ar: 'جداري أو زاوية', en: 'Wall or corner' } },
    ],
    bestFor: {
      ar: ['فناء أو حوش', 'مدخل خلفي', 'ممر جانبي'],
      en: ['Courtyard', 'Rear entrance', 'Side passage'],
    },
    included: incl([
      ['Sensor, bracket and battery', 'الحساس والحامل والبطارية'],
      ['Pairing to your alarm panel', 'الربط بلوحة الإنذار'],
      ['Sensitivity walk test', 'فحص الحساسية في المكان'],
    ]),
    priceFrom: 25,
  },

  /* ------------------------------------------------------------- Intercom --- */
  {
    slug: 'video-intercom-villa',
    category: 'intercom',
    name: { ar: 'إنتركم مصوّر للبوابة', en: 'Video intercom for the gate' },
    summary: {
      ar: 'رى وتكلّم من هاتفك قبل أن تفتح.',
      en: 'See and speak from your phone before you open.',
    },
    description: {
      ar: 'لوحة عند البوابة وشاشة داخل البيت، مع إمكانية الرد من الهاتف إن كنت خارجاً. مناسبة للفِلل ذات المدخل المستقل.',
      en: 'A panel at the gate, a screen inside, and the option to answer from your phone when you are out. Made for villas with their own entrance.',
    },
    images: ['product:intercom', 'scene:home'],
    specs: [
      { label: { ar: 'الشاشة', en: 'Screen' }, value: { ar: '7 بوصة داخلية', en: '7-inch indoor' } },
      {
        label: { ar: 'الكاميرا', en: 'Camera' },
        value: { ar: 'زاوية 120° · ليلية', en: '120° · night vision' },
      },
      {
        label: { ar: 'الهاتف', en: 'Phone' },
        value: { ar: 'رد وصورة من التطبيق', en: 'Answer and view in app' },
      },
      {
        label: { ar: 'الفتح', en: 'Release' },
        value: { ar: 'قفل البوابة أو القفل الكهربائي', en: 'Gate or electric lock' },
      },
      {
        label: { ar: 'التمديد', en: 'Wiring' },
        value: { ar: 'سلكان · حتى 50 م', en: 'Two-wire · up to 50 m' },
      },
    ],
    bestFor: {
      ar: ['فيلّا ببوابة', 'مكتب باستقبال', 'شقة بمدخل مشترك'],
      en: ['Villa with a gate', 'Office reception', 'Apartment entry'],
    },
    included: incl([
      ['Outdoor panel and indoor screen', 'لوحة خارجية وشاشة داخلية'],
      ['Wiring and lock connection', 'التمديد والتوصيل بالقفل'],
      ['Contact names set for your family', 'تسمية أزرار الاتصال لأفراد الأسرة'],
    ]),
    priceFrom: 145,
  },

  {
    slug: 'intercom-wireless',
    category: 'intercom',
    name: { ar: 'إنتركم لاسلكي للأبواب', en: 'Wireless door intercom' },
    summary: {
      ar: 'بلا تمديد — للشقق والأبواب التي يصعب فتحها.',
      en: 'No cabling — for apartments and difficult doors.',
    },
    description: {
      ar: 'لوحة خارجية تعمل بالبطارية وشاشة داخلية تُركَّب دون تمديد. مناسبة للشقق والمباني القديمة التي لا تريد فتح جدرانها.',
      en: 'A battery panel outside and a screen inside, with no cable between them. Suited to apartments and older buildings you would rather not open up.',
    },
    images: ['product:intercom'],
    specs: [
      { label: { ar: 'الشاشة', en: 'Screen' }, value: { ar: '4.3 بوصة داخلية', en: '4.3-inch indoor' } },
      { label: { ar: 'المدى', en: 'Range' }, value: { ar: 'حتى 100 م', en: 'Up to 100 m' } },
      {
        label: { ar: 'الطاقة', en: 'Power' },
        value: { ar: 'بطارية · حتى 8 أشهر', en: 'Battery · up to 8 months' },
      },
      {
        label: { ar: 'الفتح', en: 'Release' },
        value: { ar: 'قفل كهربائي اختياري', en: 'Optional electric lock' },
      },
      {
        label: { ar: 'التثبيت', en: 'Mounting' },
        value: { ar: 'لاصق أو براغي · بلا تمديد', en: 'Adhesive or screws · no wiring' },
      },
    ],
    bestFor: {
      ar: ['شقة بمدخل مشترك', 'باب قديم بلا تمديد', 'استوديو للإيجار'],
      en: ['Apartment entry', 'Older door without wiring', 'Rental studio'],
    },
    included: incl([
      ['Outdoor panel and indoor screen', 'لوحة خارجية وشاشة داخلية'],
      ['Batteries and fixings', 'البطاريات وأدوات التثبيت'],
      ['Pairing and range check', 'الربط وفحص المدى في المكان'],
    ]),
    priceFrom: 95,
  },

  /* ---------------------------------------------------------- Accessories --- */
  {
    slug: 'surveillance-hdd-4tb',
    category: 'accessories',
    name: { ar: 'قرص تسجيل 4 تيرابايت', en: 'Surveillance drive 4 TB' },
    summary: {
      ar: 'مصمّم للكتابة المستمرة، لا للاستخدام العادي.',
      en: 'Built for constant writing, not everyday use.',
    },
    description: {
      ar: 'قرص مخصّص لأنظمة المراقبة، يتحمّل التسجيل على مدار الساعة. أربعة تيرابايت تكفي شهراً لعدد معتاد من الكاميرات.',
      en: 'A drive specified for surveillance, built to record around the clock. Four terabytes covers roughly a month for a typical camera count.',
    },
    images: ['product:hdd'],
    specs: [
      { label: { ar: 'السعة', en: 'Capacity' }, value: { ar: '4 تيرابايت', en: '4 TB' } },
      { label: { ar: 'الاستخدام', en: 'Design' }, value: { ar: 'تسجيل مستمر 24/7', en: '24/7 continuous' } },
      { label: { ar: 'الضمان', en: 'Warranty' }, value: { ar: 'حسب المُصنّع', en: 'Manufacturer' } },
      { label: { ar: 'التوافق', en: 'Fits' }, value: { ar: 'معظم أجهزة NVR/DVR', en: 'Most NVR/DVR units' } },
    ],
    bestFor: {
      ar: ['زيادة مدة التسجيل', 'توسعة نظام قائم'],
      en: ['Longer retention', 'Expanding an existing system'],
    },
    included: incl([
      ['Drive installed and formatted', 'تركيب القرص وتهيئته'],
      ['Old footage copied where possible', 'نقل التسجيلات القديمة إن أمكن'],
      ['Retention checked with you', 'مراجعة مدة التسجيل معك'],
    ]),
    priceFrom: 48,
  },
  {
    slug: 'installation-cable-kit',
    category: 'accessories',
    name: { ar: 'طقم كوابل وتمديدات', en: 'Cable and installation kit' },
    summary: {
      ar: 'التمديد الصحيح يمنع نصف الأعطال.',
      en: 'Correct cabling prevents half of all faults.',
    },
    description: {
      ar: 'كوابل ومحولات وموصلات معزولة للخارج، بمقاسات تُختار حسب المسافة الفعلية في موقعك.',
      en: 'Cable, power and sealed connectors sized to the real distance at your site.',
    },
    images: ['product:cable'],
    specs: [
      { label: { ar: 'الكابل', en: 'Cable' }, value: { ar: 'نحاس · 100 م', en: 'Copper · 100 m' } },
      { label: { ar: 'الموصلات', en: 'Connectors' }, value: { ar: 'معزولة للخارج', en: 'Outdoor sealed' } },
      {
        label: { ar: 'الطاقة', en: 'Power' },
        value: { ar: 'محول لكل 4 كاميرات', en: 'One supply per 4 cameras' },
      },
      {
        label: { ar: 'التركيب', en: 'Installation' },
        value: { ar: 'مخفي في الجدران أو مجرى', en: 'Hidden in wall or conduit' },
      },
    ],
    bestFor: {
      ar: ['تركيب جديد', 'إعادة تمديد نظام قائم'],
      en: ['New installation', 'Re-cabling an existing system'],
    },
    included: incl([
      ['Cable, connectors and power supplies', 'الكابل والموصلات ومصادر الطاقة'],
      ['Neat routing and cable marking', 'تمديد مرتّب وترقيم الكوابل'],
      ['Continuity test on every line', 'فحص كل خط قبل التسليم'],
    ]),
    priceFrom: null,
  },
]

export const productsByCategory = (category) => products.filter((p) => p.category === category)

export const getCategory = (slug) => categories.find((c) => c.slug === slug) ?? null

export const getProduct = (category, slug) =>
  products.find((p) => p.category === category && p.slug === slug) ?? null

export const getProductBySlug = (slug) => products.find((p) => p.slug === slug) ?? null

export const featuredProducts = () => products.filter((p) => p.featured)

export const relatedProducts = (product, limit = 3) =>
  products
    .filter((p) => p.slug !== product.slug)
    .sort((a, b) => Number(b.category === product.category) - Number(a.category === product.category))
    .slice(0, limit)

export const countByCategory = (slug) => productsByCategory(slug).length

export default products
