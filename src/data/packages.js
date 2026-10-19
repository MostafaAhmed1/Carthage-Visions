/**
 * ============================================================================
 *  PACKAGES — PLACEHOLDER PRICING
 *  ----------------------------------------------------------------------------
 *  Indicative bundles so the page can be reviewed. Prices are "from" figures
 *  and MUST be confirmed by the owner before launch. The survey still decides
 *  the final quote. Edit freely: add, remove or reorder tiers here.
 * ============================================================================
 */

// Flip to false once the prices below are confirmed (enables indexing).
export const placeholderPackages = true

export const packages = [
  {
    slug: 'villa-essential',
    name: { ar: 'فيلّا أساسي', en: 'Villa Essential' },
    kicker: { ar: 'لبيت واحد', en: 'For a single home' },
    summary: {
      ar: 'التغطية التي تحتاجها فيلّا صغيرة: البوابة والمدخل والصالة.',
      en: 'The coverage a small villa actually needs: gate, entrance and living room.',
    },
    cameras: 4,
    storage: { ar: '1 تيرابايت · ~20 يوماً', en: '1 TB · ~20 days' },
    installation: { ar: 'يوم واحد', en: 'One day' },
    warranty: { ar: 'سنة واحدة على التركيب', en: 'One year on installation' },
    includes: [
      { ar: '4 كاميرات خارجية/داخلية', en: '4 indoor/outdoor cameras' },
      { ar: 'جهاز تسجيل 8 قنوات', en: '8-channel recorder' },
      { ar: 'ضبط التطبيق على هاتفين', en: 'App set up on two phones' },
      { ar: 'تمديد ومواد التركيب', en: 'Cabling and installation materials' },
    ],
    priceFrom: 240,
    recommended: false,
  },
  {
    slug: 'shop-secure',
    name: { ar: 'محل آمن', en: 'Shop Secure' },
    kicker: { ar: 'لمحل يعمل كل يوم', en: 'For a working shop' },
    summary: {
      ar: 'صندوق البيع، الأبواب والمخزون — مصمّم ليوم عمل كامل.',
      en: 'Till, doors and stock — designed around a full working day.',
    },
    cameras: 6,
    storage: { ar: '2 تيرابايت · 30 يوماً', en: '2 TB · 30 days' },
    installation: { ar: 'يوم إلى يومين', en: 'One to two days' },
    warranty: { ar: 'سنة على التركيب والأجهزة', en: 'One year on installation and hardware' },
    includes: [
      { ar: '6 كاميرات مع تركيز على الصناديق', en: '6 cameras focused on tills' },
      { ar: 'جهاز تسجيل 8 قنوات + قرص 2 تيرابايت', en: '8-channel recorder + 2 TB drive' },
      { ar: 'تنبيهات حركة بعد الإغلاق', en: 'After-hours motion alerts' },
      { ar: 'تدريب الموظفين على التطبيق', en: 'Staff walkthrough of the app' },
    ],
    priceFrom: 340,
    recommended: true,
  },
  {
    slug: 'premium-estate',
    name: { ar: 'منزل متميّز', en: 'Premium Estate' },
    kicker: { ar: 'مساحات واسعة', en: 'Larger grounds' },
    summary: {
      ar: 'لفيلّا كبيرة أو مزرعة: تغطية كاملة مع كاميرا دوّارة واحدة.',
      en: 'For a large villa or farm: full coverage plus one moving camera.',
    },
    cameras: 12,
    storage: { ar: '6 تيرابايت · 45 يوماً', en: '6 TB · 45 days' },
    installation: { ar: 'يومان إلى ثلاثة', en: 'Two to three days' },
    warranty: { ar: 'سنتان على التركيب', en: 'Two years on installation' },
    includes: [
      { ar: '11 كاميرا ثابتة + كاميرا PTZ', en: '11 fixed cameras + 1 PTZ' },
      { ar: 'جهاز تسجيل 16 قناة + قرصان', en: '16-channel recorder + two drives' },
      { ar: 'حساسات إنذار للأبواب الخارجية', en: 'Alarm sensors on outer doors' },
      { ar: 'زيارة صيانة بعد ستة أشهر', en: 'Maintenance visit after six months' },
    ],
    priceFrom: 690,
    recommended: false,
  },
]

export default packages
