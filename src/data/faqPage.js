/**
 * ============================================================================
 *  FAQ — categorised questions for /faq
 *  ----------------------------------------------------------------------------
 *  Plain answers. Prices, response times and warranty length are deliberately
 *  left as "confirm with us" rather than invented.
 * ============================================================================
 */

export const faqCategories = [
  { slug: 'choosing', label: { en: 'Choosing a system', ar: 'اختيار النظام' } },
  { slug: 'installation', label: { en: 'Installation', ar: 'التركيب' } },
  { slug: 'using', label: { en: 'Using it', ar: 'الاستخدام' } },
  { slug: 'support', label: { en: 'Support & warranty', ar: 'الدعم والضمان' } },
]

export const faqItems = [
  {
    category: 'choosing',
    q: {
      en: 'How many cameras do I need?',
      ar: 'كم كاميرا أحتاج؟',
    },
    a: {
      en: 'Count the ways into the place first — gate, main door, back door, service door — then add the sides you cannot see from inside. Most villas land between four and eight; most shops need the till, the door and the stockroom before anything else.',
      ar: 'ابدأ بعدّ المداخل — البوابة، الباب الرئيسي، الباب الخلفي، باب الخدمة — ثم أضف الجهات التي لا تراها من الداخل. معظم الفلل بين أربع وثماني كاميرات؛ ومعظم المحلات تحتاج الصندوق والباب والمخزن قبل أي شيء آخر.',
    },
  },
  {
    category: 'choosing',
    q: {
      en: 'Do I need a site visit before getting a price?',
      ar: 'هل أحتاج زيارة قبل الحصول على سعر؟',
    },
    a: {
      en: 'For anything beyond a single camera, yes. A short visit tells us the cabling route, the power and the light — the three things that decide the cost. It is free and carries no obligation.',
      ar: 'لأي عمل يتجاوز كاميرا واحدة، نعم. الزيارة القصيرة تُظهر مسار الكابلات والكهرباء والإضاءة — وهي ثلاثة أشياء تحدّد التكلفة. الزيارة مجانية وبلا التزام.',
    },
  },
  {
    category: 'choosing',
    q: {
      en: 'Wireless or wired?',
      ar: 'لاسلكي أم سلكي؟',
    },
    a: {
      en: 'Wired is more reliable and does not depend on Wi-Fi, but needs a route for the cable. Wireless suits finished buildings where cabling is impossible or ugly. Many homes end up with a mix: wired where we can, wireless where we cannot.',
      ar: 'السلكي أكثر اعتمادية ولا يعتمد على الواي فاي، لكنه يحتاج مساراً للكابل. اللاسلكي يناسب المباني المكتملة حيث يكون التمديد مستحيلاً أو قبيحاً. كثير من المنازل تنتهي بمزيج: سلكي حيث يمكن، ولاسلكي حيث لا يمكن.',
    },
  },
  {
    category: 'choosing',
    q: {
      en: 'Can I add cameras to a system I already have?',
      ar: 'هل يمكن إضافة كاميرات إلى نظام لديّ؟',
    },
    a: {
      en: 'Often, yes — if the recorder has a free channel and the cameras are compatible. Send us a photo of the recorder label and we will tell you honestly whether it is worth extending or replacing.',
      ar: 'غالباً نعم — إن كان في جهاز التسجيل قناة فارغة وكانت الكاميرات متوافقة. أرسل لنا صورة لملصق الجهاز وسنخبرك بصدق إن كان التوسيع مجدياً أم الاستبدال أفضل.',
    },
  },

  {
    category: 'installation',
    q: {
      en: 'How long does an installation take?',
      ar: 'كم يستغرق التركيب؟',
    },
    a: {
      en: 'A four-camera villa is usually one working day. Larger sites, or buildings where cables must cross finished walls, take longer — we give you a realistic window before starting, not after.',
      ar: 'فيلا بأربع كاميرات تستغرق عادة يوم عمل واحد. المواقع الأكبر، أو المباني التي تعبر فيها الكابلات جدراناً مكتملة، تحتاج وقتاً أطول — نعطيك تقديراً واقعياً قبل البدء، لا بعده.',
    },
  },
  {
    category: 'installation',
    q: {
      en: 'Will the installation damage my walls?',
      ar: 'هل يؤذي التركيب الجدران؟',
    },
    a: {
      en: 'Cabling always means a few holes. We plan the route first to keep them few, hide the cable where possible, and seal every hole behind us. Where a wall should not be touched, we will say so and suggest another route.',
      ar: 'التمديدات تعني دائماً بعض الفتحات. نخطّط المسار أولاً لتقليلها، ونخفي الكابل حيث يمكن، ونسدّ كل فتحة بعد العمل. وإن كان جدار لا يجب المساس به، سنقول ذلك ونقترح مساراً آخر.',
    },
  },
  {
    category: 'installation',
    q: {
      en: 'Do you install outside Barka?',
      ar: 'هل تركّبون خارج بركاء؟',
    },
    a: {
      en: 'Yes — Al Batinah and Muscat are routine. For sites further away, send the location on WhatsApp and we will confirm travel and timing before committing.',
      ar: 'نعم — جنوب الباطنة ومسقط بشكل معتاد. للمواقع الأبعد، أرسل الموقع على واتساب وسنؤكد التنقّل والمواعيد قبل الالتزام.',
    },
  },
  {
    category: 'installation',
    q: {
      en: 'Do I need to be home during the work?',
      ar: 'هل يجب أن أكون في المنزل أثناء العمل؟',
    },
    a: {
      en: 'It helps at the start, to agree where cameras go, and at the end, to check the phone app with us. In between, you are free — though we may message with a question.',
      ar: 'يفيد وجودك في البداية للاتفاق على مواضع الكاميرات، وفي النهاية لتجربة التطبيق معنا. بين ذلك أنت حرّ — وقد نراسلك لسؤال.',
    },
  },

  {
    category: 'using',
    q: {
      en: 'Can I watch the cameras from my phone?',
      ar: 'هل أشاهد الكاميرات من هاتفي؟',
    },
    a: {
      en: 'Yes, through the manufacturer app, from anywhere with internet. We set the account up with you before leaving and show you how to view, replay and share access with one other person.',
      ar: 'نعم، عبر تطبيق الشركة المصنّعة، من أي مكان فيه إنترنت. نُعدّ الحساب معك قبل المغادرة ونشرح كيف تشاهد وتستعرض التسجيل وتشارك الوصول مع شخص آخر.',
    },
  },
  {
    category: 'using',
    q: {
      en: 'How many days of recording will I have?',
      ar: 'كم يوماً من التسجيل سأحصل عليه؟',
    },
    a: {
      en: 'It depends on the number of cameras, their resolution and the drive size. We size the drive to a target — usually two weeks at home and a month for a shop — and tell you the number in the quote.',
      ar: 'يعتمد على عدد الكاميرات ودقتها وحجم القرص. نحدّد حجم القرص وفق هدف — عادةً أسبوعان للمنزل وشهر للمحل — ونذكر الرقم في العرض.',
    },
  },
  {
    category: 'using',
    q: {
      en: 'Will the cameras work during a power cut?',
      ar: 'هل تعمل الكاميرات عند انقطاع الكهرباء؟',
    },
    a: {
      en: 'Not by default. A small backup unit can keep the recorder and cameras running for a while — worth having on a farm, a warehouse or a shop with stock. Ask for it explicitly; it is not always included.',
      ar: 'ليس افتراضياً. وحدة تغذية احتياطية صغيرة يمكنها إبقاء الجهاز والكاميرات تعمل مدة — وهي مفيدة في مزرعة أو مستودع أو محل فيه بضاعة. اطلبها صراحةً؛ فهي ليست مشمولة دائماً.',
    },
  },
  {
    category: 'using',
    q: {
      en: 'What happens to the footage — who can see it?',
      ar: 'ماذا يحدث للتسجيلات — من يراها؟',
    },
    a: {
      en: 'It stays on your recorder and your app account. We do not keep a copy, and we only view it if you ask us to while fixing something. Keep the recorder password to yourself and change it if a phone is lost.',
      ar: 'تبقى على جهاز التسجيل وحسابك في التطبيق. لا نحتفظ بنسخة، ولا نطّلع عليها إلا إن طلبت ذلك أثناء إصلاح. احتفظ بكلمة مرور الجهاز لنفسك وغيّرها إن فُقد هاتف.',
    },
  },

  {
    category: 'support',
    q: {
      en: 'What does the warranty cover?',
      ar: 'ماذا يشمل الضمان؟',
    },
    a: {
      en: 'Manufacturer faults in the equipment, and our own workmanship on the installation. Physical damage, power surges and water getting in where it should not are not covered. The exact term is written on your invoice — ask us to explain it before you sign.',
      ar: 'عيوب المصنّع في الأجهزة، وجودة عملنا في التركيب. لا يشمل التلف المادي ولا ارتفاع الجهد ولا دخول الماء حيث لا يجب. المدة الدقيقة مكتوبة في فاتورتك — اطلب منّا شرحها قبل التوقيع.',
    },
  },
  {
    category: 'support',
    q: {
      en: 'Something stopped working. What do I do first?',
      ar: 'توقف شيء عن العمل. ما أول خطوة؟',
    },
    a: {
      en: 'Send us a photo of the recorder front panel and the app screen on WhatsApp. Most issues are a full drive, a loose power plug or a router that restarted — all visible in a photo and often fixed in minutes.',
      ar: 'أرسل لنا صورة لواجهة جهاز التسجيل وشاشة التطبيق على واتساب. معظم المشاكل قرص ممتلئ أو قابس كهرباء مرتخٍ أو راوتر أُعيد تشغيله — كلها تظهر في صورة وتُحلّ غالباً في دقائق.',
    },
  },
  {
    category: 'support',
    q: {
      en: 'Do you offer maintenance after the warranty?',
      ar: 'هل تقدّمون صيانة بعد الضمان؟',
    },
    a: {
      en: 'Yes. There are annual plans with one, two or four visits, plus a priority response — the details are on the support page. Single visits are also possible if you prefer to call only when needed.',
      ar: 'نعم. هناك خطط سنوية بزيارة أو زيارتين أو أربع، مع أولوية في الاستجابة — التفاصيل في صفحة الدعم. ويمكن أيضاً الزيارة المنفردة إن كنت تفضّل الاتصال عند الحاجة فقط.',
    },
  },
  {
    category: 'support',
    q: {
      en: 'Can you take over a system installed by someone else?',
      ar: 'هل تتولّون نظاماً ركّبه غيركم؟',
    },
    a: {
      en: 'Usually. We start with a look at the recorder and the cabling and tell you what is reusable. If the honest answer is that the existing equipment is fine, we will only fix what is wrong.',
      ar: 'غالباً. نبدأ بالنظر إلى جهاز التسجيل والتمديدات ونخبرك بما يمكن الاستفادة منه. وإن كانت الإجابة الصادقة أن الأجهزة الحالية جيدة، فسنصلح فقط ما فيه خلل.',
    },
  },
]

export const faqByCategory = (slug) =>
  slug && slug !== 'all' ? faqItems.filter((item) => item.category === slug) : faqItems

export default faqItems
