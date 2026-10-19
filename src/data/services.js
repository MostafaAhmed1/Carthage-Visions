/**
 * ============================================================================
 *  SERVICES & SUPPORT — PLACEHOLDER CONTENT
 *  ----------------------------------------------------------------------------
 *  One-line benefits, no statistics and no guarantees.
 *  Response times in `supportPlans` are PLACEHOLDERS (see `responsePlaceholder`)
 *  and must be confirmed by the owner before launch.
 * ============================================================================
 */

export const services = [
  {
    slug: 'site-survey',
    icon: 'survey',
    name: { ar: 'معاينة الموقع', en: 'Site survey' },
    benefit: {
      ar: 'نرى المكان قبل أن نبيعك أي جهاز.',
      en: 'We look at the place before we sell you anything.',
    },
    body: {
      ar: 'نزور الموقع، نمشي فيه معك، ونراجع الزوايا والكهرباء والتمديد. تخرج من الزيارة بعرض مكتوب واضح، دون التزام.',
      en: 'We visit, walk the space with you, and check angles, power and cable runs. You leave the visit with a clear written quote and no obligation.',
    },
    cta: { ar: 'احجز معاينة مجانية', en: 'Book a free survey' },
    link: '/site-survey',
  },
  {
    slug: 'installation',
    icon: 'install',
    name: { ar: 'التركيب', en: 'Installation' },
    benefit: {
      ar: 'تركيب مرتّب، وتطبيق مضبوط قبل أن نغادر.',
      en: 'Neat installation, and the app working before we leave.',
    },
    body: {
      ar: 'نثبّت الكاميرات ونخفي الكوابل قدر الإمكان، ثم نضبط التطبيق على هاتفك ونشرح التسجيل والتنبيهات.',
      en: 'We mount the cameras, hide the cabling where possible, then set the app up on your phone and explain recording and alerts.',
    },
    cta: { ar: 'اسأل عن التركيب', en: 'Ask about installation' },
  },
  {
    slug: 'maintenance',
    icon: 'maintenance',
    name: { ar: 'الصيانة والعقود السنوية', en: 'Maintenance & annual plans' },
    benefit: {
      ar: 'نظام يُفحَص قبل أن يتوقّف.',
      en: 'A system checked before it stops.',
    },
    body: {
      ar: 'زيارات دورية لتنظيف العدسات وفحص الأقراص والتمديدات، وأولوية في الاستجابة لعملاء العقود.',
      en: 'Scheduled visits to clean lenses and check drives and cabling, with priority response for clients on a plan.',
    },
    cta: { ar: 'اعرف عن الصيانة', en: 'See maintenance options' },
    link: '/support',
  },
  {
    slug: 'remote-viewing',
    icon: 'phone',
    name: { ar: 'المشاهدة عن بُعد والتطبيق', en: 'Remote viewing & app setup' },
    benefit: {
      ar: 'الكاميرات في جيبك، بلا إعدادات معقّدة.',
      en: 'Your cameras in your pocket, without complicated settings.',
    },
    body: {
      ar: 'نضبط التطبيق على هاتفك وهواتف الأسرة أو الفريق، ونشرح كيف تراجع التسجيل وترسل مقطعاً عند الحاجة.',
      en: 'We set the app up on your phone and those of your family or team, and show you how to review footage and send us a clip when needed.',
    },
    cta: { ar: 'اطلب ضبط التطبيق', en: 'Ask for app setup' },
  },
  {
    slug: 'upgrades',
    icon: 'upgrade',
    name: { ar: 'تطوير الأنظمة القائمة', en: 'System upgrades' },
    benefit: {
      ar: 'نُحسّن ما لديك قبل أن نستبدله.',
      en: 'We improve what you have before replacing it.',
    },
    body: {
      ar: 'نراجع نظامك الحالي: قد تكفي كاميرا إضافية أو قرص أكبر. وإن كان الجهاز قديماً نقول ذلك بصراحة.',
      en: 'We review your existing system: an extra camera or a larger drive may be all that is needed. If the recorder is past it, we say so plainly.',
    },
    cta: { ar: 'راجع نظامك معنا', en: 'Review my system' },
  },
  {
    slug: 'repair',
    icon: 'repair',
    name: { ar: 'الإصلاح', en: 'Repair' },
    benefit: {
      ar: 'عادةً مشكلة صغيرة — نبدأ بالتشخيص.',
      en: 'Usually something small — we start with diagnosis.',
    },
    body: {
      ar: 'كاميرا لا تعمل أو تسجيل متقطّع؟ أرسل صورة للشاشة أو مقطعاً قصيراً على واتساب، ونحاول التشخيص قبل الزيارة.',
      en: 'A camera not working or footage stopping? Send a photo of the screen or a short clip on WhatsApp and we will try to diagnose it before coming over.',
    },
    cta: { ar: 'أبلغ عن مشكلة', en: 'Report a problem' },
  },
]

/**
 * SUPPORT PLANS — visits and response times are placeholders.
 * Every `responsePlaceholder: true` row must be confirmed before launch.
 */
export const supportPlans = [
  {
    slug: 'essential',
    name: { ar: 'أساسي', en: 'Essential' },
    summary: { ar: 'فحص سنوي وزيارة واحدة.', en: 'One annual visit and a check-up.' },
    visits: { ar: 'زيارة واحدة في السنة', en: 'One visit per year' },
    response: { ar: 'خلال يومين عمل', en: 'Within two working days' },
    responsePlaceholder: true,
    includes: [
      { ar: 'تنظيف العدسات وفحص الزوايا', en: 'Lens cleaning and angle check' },
      { ar: 'فحص القرص والتمديدات', en: 'Drive and cabling check' },
      { ar: 'تقرير قصير بعد الزيارة', en: 'A short report after the visit' },
    ],
    price: null,
    recommended: false,
  },
  {
    slug: 'care',
    name: { ar: 'رعاية', en: 'Care' },
    summary: { ar: 'زيارتان وأولوية في الرد.', en: 'Two visits and priority response.' },
    visits: { ar: 'زيارتان في السنة', en: 'Two visits per year' },
    response: { ar: 'خلال يوم عمل', en: 'Within one working day' },
    responsePlaceholder: true,
    includes: [
      { ar: 'كل ما في الباقة الأساسية', en: 'Everything in Essential' },
      { ar: 'أولوية في جدول الزيارات', en: 'Priority in the visit schedule' },
      { ar: 'فحص التنبيهات على هاتفك', en: 'Alerts checked on your phone' },
      { ar: 'مساعدة عن بُعد على واتساب', en: 'Remote help over WhatsApp' },
    ],
    price: { ar: 'حسب حجم النظام', en: 'By system size' },
    recommended: true,
  },
  {
    slug: 'business',
    name: { ar: 'أعمال', en: 'Business' },
    summary: { ar: 'للمحلات والمستودعات التي لا تتوقف.', en: 'For shops and stores that cannot stop.' },
    visits: { ar: 'أربع زيارات في السنة', en: 'Four visits per year' },
    response: { ar: 'خلال ساعات العمل', en: 'Within working hours' },
    responsePlaceholder: true,
    includes: [
      { ar: 'كل ما في باقة الرعاية', en: 'Everything in Care' },
      { ar: 'فحص دوري لأجهزة التسجيل', en: 'Scheduled recorder checks' },
      { ar: 'مستخدمون متعددون للتطبيق', en: 'Multiple app users' },
      { ar: 'أولوية عند الأعطال', en: 'Priority when something fails' },
    ],
    price: { ar: 'عرض خاص', en: 'Custom quote' },
    recommended: false,
  },
]

export const getService = (slug) => services.find((s) => s.slug === slug) ?? null

export default services
