/**
 * ============================================================================
 *  SOLUTIONS — PLACEHOLDER CONTENT
 *  ----------------------------------------------------------------------------
 *  Written for five kinds of places. Statements are deliberately modest: no
 *  statistics, no guarantees about crime prevention. Replace with your own
 *  experience before launch.
 *
 *  Fields
 *  • slug      URL: /solutions/<slug>
 *  • image     namespaced media key (see getImage in src/config/media.js)
 *  • risks     3 short, concrete risk statements (not fear marketing)
 *  • setup     the recommended kit, stated plainly
 *  • package   a slug from src/data/packages.js (or null)
 *  • project   a slug from src/data/projects.js (or null)
 * ============================================================================
 */

export const solutions = [
  {
    slug: 'homes-villas',
    name: { ar: 'المنازل والفِلل', en: 'Homes & villas' },
    short: { ar: 'البيت ومداخله', en: 'The house and its entrances' },
    lede: {
      ar: 'تغطية هادئة لمداخل الفيلّا والحديقة والمجلس، بلا كاميرات في وجه الضيوف.',
      en: 'Quiet coverage of the villa’s entrances, garden and majlis — without a lens in your guests’ faces.',
    },
    image: 'scene:villa-garden',
    imageAlt: {
      ar: 'حديقة فيلّا ومسبح عند الغروب مع كاميرا صغيرة على الجدار.',
      en: 'A villa garden and pool at twilight with a small wall-mounted camera.',
    },
    intro: {
      ar: 'الفيلّا مكانٌ خاص، والكاميرا الجيدة هي التي تُطمئن ولا تُلاحَظ. نبدأ من البوابة والمدخل، ثم نضيف ما يهمّ فعلاً: الفناء، الحوش، وباب الخدمة.',
      en: 'A villa is a private place, and a good camera is one that reassures without being noticed. We start at the gate and the main door, then add what actually matters: the courtyard, the yard and the service entrance.',
    },
    risks: {
      ar: [
        'بابٌ يُترك مفتوحاً دون أن يعرف أحد متى.',
        'زائر غير متوقع عند البوابة وأنت خارج البيت.',
        'منطقة خلفية أو حوش بلا تغطية.',
      ],
      en: [
        'A door left open with no one sure when.',
        'An unexpected visitor at the gate while you are out.',
        'A rear yard or store with no coverage at all.',
      ],
    },
    setup: {
      cameras: {
        ar: '4–8 كاميرات: البوابة، المدخل، الفناء، والحوش.',
        en: '4–8 cameras: gate, main door, courtyard, rear yard.',
      },
      storage: {
        ar: 'تسجيل 20–30 يوماً على جهاز واحد.',
        en: '20–30 days of recording on one recorder.',
      },
      viewing: {
        ar: 'تطبيق على هاتفين، وتنبيه عند الحركة بعد منتصف الليل.',
        en: 'The app on two phones, with movement alerts after midnight.',
      },
      extras: {
        ar: 'إنتركم للبوابة إن كان المدخل بعيداً عن المجلس.',
        en: 'A gate intercom if the entrance is far from the majlis.',
      },
    },
    package: 'villa-essential',
    project: 'villa-al-khoud',
  },
  {
    slug: 'shops-retail',
    name: { ar: 'المحلات والتجزئة', en: 'Shops & retail' },
    short: { ar: 'الصندوق والمدخل', en: 'The till and the door' },
    lede: {
      ar: 'صندوق البيع والمدخل والمخزون، بوضوح يكفي عند الحاجة فقط.',
      en: 'The till, the entrance and the stock — clear enough when you need it, quiet the rest of the time.',
    },
    image: 'scene:shopfront',
    imageAlt: {
      ar: 'واجهة محل صغير مضاءة في المساء مع كاميرا فوق الباب.',
      en: 'A small illuminated shopfront in the evening with a camera above the door.',
    },
    intro: {
      ar: 'المحل يعمل ساعات طويلة، والنظام الجيد يجب أن يخدم الموظفين قبل أن يراقبهم. نضع الكاميرا على الصندوق والباب أولاً، ثم على المخزون.',
      en: 'A shop works long hours, and a good system should serve the staff before it watches them. We cover the till and the door first, then the stock room.',
    },
    risks: {
      ar: [
        'خلاف على عملية بيع أو مبلغ في نهاية اليوم.',
        'دخول بعد الإغلاق دون تنبيه.',
        'مخزون يتحرك دون سجل واضح.',
      ],
      en: [
        'A disagreement over a sale or a drawer at closing.',
        'An entry after hours with no alert.',
        'Stock moving without a clear record.',
      ],
    },
    setup: {
      cameras: {
        ar: '4–8 كاميرات: الصندوق، المدخل، الممر، المخزون.',
        en: '4–8 cameras: till, entrance, aisle, stock room.',
      },
      storage: {
        ar: 'تسجيل 30 يوماً، وتُطوَّل بتكلفة بسيطة.',
        en: '30 days of recording, extendable at a small cost.',
      },
      viewing: {
        ar: 'شاشة عند الكاشير وتطبيق للمالك.',
        en: 'A screen at the counter and the app for the owner.',
      },
      extras: {
        ar: 'تنبيه حركة بعد ساعات الإغلاق.',
        en: 'Movement alerts after closing hours.',
      },
    },
    package: 'shop-secure',
    project: 'shop-barka',
  },
  {
    slug: 'offices',
    name: { ar: 'المكاتب', en: 'Offices' },
    short: { ar: 'الاستقبال والمداخل', en: 'Reception and access' },
    lede: {
      ar: 'استقبال واضح، وأبواب معروفة، وسجل بسيط لمن دخل ومتى.',
      en: 'A clear reception, known doors, and a simple record of who came in and when.',
    },
    image: 'scene:office',
    imageAlt: {
      ar: 'مكتب هادئ بإضاءة دافئة ونافذة تطل على مساء أزرق.',
      en: 'A calm office with warm light and a window onto a blue evening.',
    },
    intro: {
      ar: 'المكتب لا يحتاج كثيراً من الكاميرات، بل يحتاج التوزيع الصحيح. الاستقبال والمدخل وباب الأرشيف تكفي غالباً، مع تحكم بالدخول إن كان الفريق أكبر.',
      en: 'An office rarely needs many cameras; it needs the right ones. Reception, the main door and the archive door are usually enough, with access control once the team grows.',
    },
    risks: {
      ar: [
        'زائر يدخل دون تسجيل عند الاستقبال.',
        'أرشيف أو غرفة معدات بلا رقابة.',
        'خلاف حول موعد وصول أو تسليم.',
      ],
      en: [
        'A visitor walking past reception unrecorded.',
        'An archive or equipment room with no oversight.',
        'A disagreement about when something arrived.',
      ],
    },
    setup: {
      cameras: {
        ar: '3–6 كاميرات: الاستقبال، المدخل، الممر، الأرشيف.',
        en: '3–6 cameras: reception, entrance, corridor, archive.',
      },
      storage: {
        ar: 'تسجيل 30 يوماً على جهاز واحد.',
        en: '30 days of recording on one recorder.',
      },
      viewing: {
        ar: 'مشاهدة من الحاسب أو الهاتف للمدير.',
        en: 'Viewing on the manager’s computer or phone.',
      },
      extras: {
        ar: 'تحكم بالدخول بطاقة أو رمز لباب الموظفين.',
        en: 'Card or code access on the staff door.',
      },
    },
    package: null,
    project: 'shop-al-khuwair',
  },
  {
    slug: 'farms-rural',
    name: { ar: 'المزارع والمواقع الريفية', en: 'Farms & rural sites' },
    short: { ar: 'مساحات واسعة', en: 'Open ground' },
    lede: {
      ar: 'مزرعة واسعة تحتاج زوايا ذكية، لا عدداً كبيراً من الكاميرات.',
      en: 'A wide farm needs intelligent angles, not a large number of cameras.',
    },
    image: 'scene:farm',
    imageAlt: {
      ar: 'مزرعة نخيل عُمانية عند الغروب مع بوابة وجدار بلون الرمل.',
      en: 'An Omani date farm at sunset with a gate and a sand-coloured wall.',
    },
    intro: {
      ar: 'في المزرعة، الكهرباء والمسافة هما التحدي الحقيقي. نختار مواقع قريبة من مصادر الطاقة، ونستخدم كاميرا دوّارة واحدة تغطّي مساحة واسعة بدل أربع ثابتة.',
      en: 'On a farm, power and distance are the real constraints. We choose positions close to power and use one moving camera to cover a wide area instead of four fixed ones.',
    },
    risks: {
      ar: ['بوابة رئيسية بعيدة عن البيت.', 'معدات أو مضخات في العراء.', 'زيارات غير معروفة أثناء غيابك.'],
      en: [
        'A main gate far from the house.',
        'Equipment or pumps in the open.',
        'Unknown visits while you are away.',
      ],
    },
    setup: {
      cameras: {
        ar: '4–8 كاميرات، منها كاميرا PTZ واحدة للبوابة.',
        en: '4–8 cameras, including one PTZ for the gate.',
      },
      storage: {
        ar: 'تسجيل 30–45 يوماً حسب عدد الكاميرات.',
        en: '30–45 days, depending on camera count.',
      },
      viewing: {
        ar: 'تطبيق على الهاتف مع تنبيهات محدودة ومقصودة.',
        en: 'The app, with few and deliberate alerts.',
      },
      extras: {
        ar: 'حساس حركة على المدخل الخلفي، وكهرباء احتياطية إن لزم.',
        en: 'A motion sensor on the rear entrance, and backup power if needed.',
      },
    },
    package: 'premium-estate',
    project: 'farm-sohar',
  },
  {
    slug: 'warehouses-sites',
    name: { ar: 'المستودعات ومواقع البناء', en: 'Warehouses & construction' },
    short: { ar: 'ليل ونهار', en: 'Night and day' },
    lede: {
      ar: 'بوابات وساحات ومعدات، مع نظام يعمل حتى حين تنقطع الكهرباء.',
      en: 'Gates, yards and equipment — with a system that keeps working when the power does not.',
    },
    image: 'scene:warehouse',
    imageAlt: {
      ar: 'مستودع وساحة تحميل عند الغسق مع أعمدة إضاءة.',
      en: 'A warehouse and loading yard at dusk with floodlight poles.',
    },
    intro: {
      ar: 'المواقع الكبيرة تتغيّر باستمرار: حاويات تتحرك، ومعدات تصل. نضع الكاميرات على نقاط العبور — البوابة والساحة — لا على كل متر.',
      en: 'Large sites change constantly: containers move, equipment arrives. We place cameras on the crossing points — the gate and the yard — not on every metre.',
    },
    risks: {
      ar: ['حركة ليلية في الساحة دون سجل.', 'معدات تخرج دون إذن واضح.', 'انقطاع كهرباء يُطفئ النظام بأكمله.'],
      en: [
        'Night movement in the yard with no record.',
        'Equipment leaving without a clear approval.',
        'A power cut that takes the whole system down.',
      ],
    },
    setup: {
      cameras: {
        ar: '8–16 كاميرا: البوابة، الساحة، المدخل، صالة التحميل.',
        en: '8–16 cameras: gate, yard, entrance, loading bay.',
      },
      storage: {
        ar: 'تسجيل 30–45 يوماً على جهاز 16 قناة.',
        en: '30–45 days on a 16-channel recorder.',
      },
      viewing: {
        ar: 'مشاهدة من المكتب أو الهاتف، مع مستخدمين متعددين.',
        en: 'Viewing from the office or phone, with multiple users.',
      },
      extras: {
        ar: 'تغذية احتياطية UPS، وحساسات على أبواب المستودع.',
        en: 'UPS backup power, and sensors on the store doors.',
      },
    },
    package: null,
    project: 'warehouse-suhar',
  },
]

export const getSolution = (slug) => solutions.find((s) => s.slug === slug) ?? null

export default solutions
