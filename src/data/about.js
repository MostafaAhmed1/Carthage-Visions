/**
 * ============================================================================
 *  ABOUT — story, values, team, timeline
 *  ----------------------------------------------------------------------------
 *  The story is written as a draft the owner should correct. Names, dates and
 *  team photos are deliberately marked as placeholders instead of invented.
 * ============================================================================
 */

export const story = {
  opening: {
    en: 'Carthage Visions began with a simple irritation: camera systems were being sold like appliances, and installed like afterthoughts. A box arrives, four cameras go up, and nobody asks what the household actually needs to see.',
    ar: 'بدأت قرطاج فيجن من ضيقٍ بسيط: كانت أنظمة الكاميرات تُباع كأجهزة منزلية، وتُركّب كفكرة لاحقة. يصل صندوق، وتُثبَّت أربع كاميرات، ولا يسأل أحد عمّا يحتاج أهل البيت فعلاً إلى رؤيته.',
  },
  second: {
    en: 'We work in Barka and across Al Batinah and Muscat, mostly on villas, shops and farms. The approach has not changed: visit first, look properly, explain the options in plain language, and fit what is needed — not what fills a quote.',
    ar: 'نعمل من بركاء وعبر جنوب الباطنة ومسقط، ومعظم عملنا في الفلل والمحلات والمزارع. والطريقة لم تتغيّر: نزور أولاً، ننظر جيداً، نشرح الخيارات بلغة واضحة، ونركّب ما هو مطلوب — لا ما يملأ عرض السعر.',
  },
  third: {
    en: 'Most of our work still arrives the same way it did on the first day: someone we installed for told a neighbour. We would rather keep that than grow faster.',
    ar: 'معظم عملنا لا يزال يأتي كما أتى في اليوم الأول: شخصٌ ركّبنا له أخبر جاره. نفضّل الحفاظ على ذلك على أن نكبر أسرع.',
  },
}

export const values = [
  {
    key: 'trust',
    title: { en: 'Trust, slowly', ar: 'الثقة، على مهل' },
    body: {
      en: 'We do not ask for a decision on the first visit. We explain, write the quote down, and leave you to think. The cameras will still be there next week.',
      ar: 'لا نطلب قراراً في الزيارة الأولى. نشرح، ونكتب العرض، ونترك لك وقتاً للتفكير. الكاميرات ستكون هناك الأسبوع القادم.',
    },
  },
  {
    key: 'advice',
    title: { en: 'Honest advice', ar: 'نصيحة صادقة' },
    body: {
      en: 'Sometimes the answer is fewer cameras, or none at all. If a cheaper system does the job, we will say so — and we will tell you what it cannot do.',
      ar: 'أحياناً يكون الجواب كاميرات أقل، أو لا كاميرات. إن كان نظام أرخص يؤدي الغرض سنقول ذلك — وسنقول أيضاً ما لا يستطيعه.',
    },
  },
  {
    key: 'install',
    title: { en: 'Clean installation', ar: 'تركيب نظيف' },
    body: {
      en: 'Cables hidden, holes sealed, nothing hanging loose on a wall. The installation should be invisible a month later, not something you notice every day.',
      ar: 'كابلات مخفيّة، وفتحات مسدودة، ولا شيء معلّق في الجدار. يجب أن يصبح التركيب غير مرئي بعد شهر، لا شيئاً تلاحظه كل يوم.',
    },
  },
  {
    key: 'care',
    title: { en: 'After-sales care', ar: 'رعاية بعد التركيب' },
    body: {
      en: 'The system matters on the day something stops working. You keep our number, and a visit is a visit — not a new project.',
      ar: 'النظام يظهر قيمته يوم يتوقف شيء عن العمل. تحتفظ برقمنا، والزيارة تبقى زيارة — لا مشروعاً جديداً.',
    },
  },
]

/**
 * Team members intentionally carry no names: inventing people would be worse
 * than leaving a marked gap. Add `name` and `photo` (a media key) per member.
 */
export const team = [
  {
    role: { en: 'Founder & lead installer', ar: 'المؤسس وقائد التركيب' },
    note: {
      en: 'Visits, designs and the final check on every installation.',
      ar: 'الزيارات والتصميم والمراجعة الأخيرة لكل تركيب.',
    },
  },
  {
    role: { en: 'Installation technician', ar: 'فني تركيب' },
    note: {
      en: 'Cabling, mounting, recorders and the unglamorous parts that decide reliability.',
      ar: 'التمديدات والتثبيت وأجهزة التسجيل والتفاصيل غير اللامعة التي تحدّد الاعتمادية.',
    },
  },
  {
    role: { en: 'Office & after-sales', ar: 'المكتب وما بعد البيع' },
    note: {
      en: 'Messages, appointments, quotes and following up until a problem is closed.',
      ar: 'الرسائل والمواعيد وعروض السعر والمتابعة حتى يُغلق أي إشكال.',
    },
  },
]

export const timeline = [
  {
    step: '01',
    title: { en: 'Before the shop', ar: 'قبل المحل' },
    body: {
      en: 'Installation work for other people, and a growing list of favours for family and neighbours.',
      ar: 'أعمال تركيب لدى جهات أخرى، وقائمة تتزايد من الطلبات للأهل والجيران.',
    },
  },
  {
    step: '02',
    title: { en: 'The first villas', ar: 'أول الفلل' },
    body: {
      en: 'Word of mouth in Barka: gates, courtyards and the first small shop systems.',
      ar: 'الكلام الطيّب في بركاء: بوابات وأحواش وأول أنظمة لمحلات صغيرة.',
    },
  },
  {
    step: '03',
    title: { en: 'A place to meet', ar: 'مكان للقاء' },
    body: {
      en: 'A small base where customers can see a recorder, hold a camera and ask questions before buying.',
      ar: 'قاعدة صغيرة يرى فيها العميل جهاز تسجيل، ويمسك كاميرا، ويسأل قبل الشراء.',
    },
  },
  {
    step: '04',
    title: { en: 'Today', ar: 'اليوم' },
    body: {
      en: 'Villas, shops, farms and sites across Al Batinah and Muscat — still mostly by recommendation.',
      ar: 'فلل ومحلات ومزارع ومواقع في جنوب الباطنة ومسقط — ولا يزال معظمها بالترشيح.',
    },
  },
]

/** The photo strip reuses existing scene images rather than new stock. */
export const strip = ['scene:villa-garden', 'scene:shopfront', 'scene:office', 'scene:warehouse']
