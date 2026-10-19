/**
 * ============================================================================
 *  PROJECTS / CASE STUDIES — PLACEHOLDER CONTENT
 *  ----------------------------------------------------------------------------
 *  These are illustrative examples written for layout review: the clients,
 *  addresses and outcomes are placeholders, not real jobs. Replace each block
 *  with real work (and only real details) before launch.
 *
 *  • type      one of: villa | shop | farm | warehouse (drives the filters)
 *  • images    namespaced media keys — first image is the card image
 *  • problem / solution / result are one short paragraph each
 * ============================================================================
 */

export const placeholderProjects = true

export const projectTypes = [
  { value: 'villa', label: { ar: 'الفِلل', en: 'Villas' } },
  { value: 'shop', label: { ar: 'المحلات', en: 'Shops' } },
  { value: 'farm', label: { ar: 'المزارع', en: 'Farms' } },
  { value: 'warehouse', label: { ar: 'المستودعات', en: 'Warehouses' } },
]

export const projects = [
  {
    slug: 'villa-al-khoud',
    type: 'villa',
    title: { ar: 'فيلّا عائلية', en: 'A family villa' },
    city: { ar: 'الخوض، مسقط', en: 'Al Khoud, Muscat' },
    cameras: 6,
    year: 2025,
    images: ['scene:villa-garden', 'scene:construction'],
    problem: {
      ar: 'البوابة والمدخل الرئيسي في اتجاهين مختلفين، ولا تغطية للفناء الخلفي. الأسرة أرادت أن ترى البوابة من الهاتف قبل أن تفتح.',
      en: 'The gate and the main door faced different ways, and the rear courtyard had no coverage. The family wanted to see the gate on their phones before opening it.',
    },
    solution: {
      ar: 'ست كاميرات: اثنتان على البوابة والمدخل، واثنتان للفناء والمجلس، وواحدة للحوش، وواحدة لباب الخدمة. أضفنا إنتركم للبوابة وجهاز تسجيل بثماني قنوات.',
      en: 'Six cameras: two on the gate and main door, two for the courtyard and majlis, one for the rear yard and one for the service door. We added a gate intercom and an eight-channel recorder.',
    },
    result: {
      ar: 'تفتح الأسرة البوابة من الهاتف وتتكلّم مع الزائر قبل أن تتحرّك. آخر كاميرا في الحوش تحتاج إضاءة صغيرة، أضفناها في الزيارة الثانية.',
      en: 'The family now opens the gate from their phones and speaks to visitors before moving. The rear camera needed a little extra light, which we added on a second visit.',
    },
    package: 'villa-essential',
    solutionSlug: 'homes-villas',
  },
  {
    slug: 'villa-al-mawaleh',
    type: 'villa',
    title: { ar: 'فيلّا بحديقة', en: 'A villa with a garden' },
    city: { ar: 'الموالح، مسقط', en: 'Al Mawaleh, Muscat' },
    cameras: 5,
    year: 2025,
    images: ['scene:villa-garden', 'scene:construction'],
    problem: {
      ar: 'نظام قديم بكاميرتين فقط، وتسجيل يتوقّف كل أسبوعين لأن القرص ممتلئ.',
      en: 'An old system with only two cameras, and recording that stopped every fortnight because the drive was full.',
    },
    solution: {
      ar: 'أبقينا الكاميرتين العاملتين، وأضفنا ثلاثاً للحديقة والمداخل، ووسّعنا التخزين إلى قرصين مع مراجعة إعدادات التسجيل.',
      en: 'We kept the two working cameras, added three for the garden and entrances, and expanded storage to two drives with a review of the recording settings.',
    },
    result: {
      ar: 'التسجيل الآن مستمر لثلاثين يوماً، وأصبحت مراجعة الحديقة ممكنة دون المرور على البيت.',
      en: 'Recording now runs for thirty days, and the garden can be checked without walking the house.',
    },
    package: null,
    solutionSlug: 'homes-villas',
  },
  {
    slug: 'shop-barka',
    type: 'shop',
    title: { ar: 'متجر أزياء', en: 'A clothing boutique' },
    city: { ar: 'بركاء', en: 'Barka' },
    cameras: 6,
    year: 2025,
    images: ['scene:shopfront', 'scene:construction'],
    problem: {
      ar: 'خلافات نادرة لكنها متكرّرة حول صناديق البيع، وصاحب المحل لا يستطيع الحضور كل يوم.',
      en: 'Rare but recurring disagreements over the tills, and an owner who cannot be there every day.',
    },
    solution: {
      ar: 'أربع كاميرات على الصندوق والممر والمخزون، وشاشة عند الكاشير، وتطبيق للمالك مع تنبيه بعد الإغلاق.',
      en: 'Four cameras on the till, aisle, stock room and entrance, a screen at the counter, and the app for the owner with after-closing alerts.',
    },
    result: {
      ar: 'يراجع المالك خمس دقائق من التسجيل من هاتفه عند أي خلاف، بدل أن يقطع يومه للوصول إلى المحل.',
      en: 'The owner checks five minutes of footage from his phone during any dispute, instead of losing a day to drive to the shop.',
    },
    package: 'shop-secure',
    solutionSlug: 'shops-retail',
  },
  {
    slug: 'shop-al-khuwair',
    type: 'shop',
    title: { ar: 'مقهى صغير', en: 'A small café' },
    city: { ar: 'الخوير، مسقط', en: 'Al Khuwair, Muscat' },
    cameras: 4,
    year: 2024,
    images: ['scene:shopfront', 'scene:construction'],
    problem: {
      ar: 'مدخل خلفي يُستخدم للتوصيل، ولا سجل لمن يدخل منه.',
      en: 'A rear entrance used for deliveries, with no record of who came through it.',
    },
    solution: {
      ar: 'كاميرا على الباب الخلفي وأخرى على منطقة التوصيل، مع ضبط زاوية الكاميرا الأمامية لتشمل الطاولات القريبة من الباب.',
      en: 'One camera on the back door and one on the delivery area, and the front camera re-angled to include the tables nearest the door.',
    },
    result: {
      ar: 'أصبح لكل تسليم سجل واضح، دون إضافة كاميرات في وجه الزبائن.',
      en: 'Every delivery now has a clear record, without putting extra cameras in front of customers.',
    },
    package: null,
    solutionSlug: 'shops-retail',
  },
  {
    slug: 'farm-sohar',
    type: 'farm',
    title: { ar: 'مزرعة نخيل', en: 'A date farm' },
    city: { ar: 'صحار', en: 'Sohar' },
    cameras: 7,
    year: 2025,
    images: ['scene:farm', 'scene:construction'],
    problem: {
      ar: 'مسافة كبيرة بين البوابة والبيت، ومصدر كهرباء واحد. الزيارات تحدث أثناء غياب الأسرة.',
      en: 'A long distance between the gate and the house, and a single power source. Visits happened while the family was away.',
    },
    solution: {
      ar: 'كاميرا PTZ واحدة للبوابة، وأربع ثابتة على المضخات والممر، وكاميرتان على المخزن. مددنا الكهرباء من نقطتين قريبتين بدل خط واحد طويل.',
      en: 'One PTZ for the gate, four fixed cameras on the pumps and the track, and two on the store. We drew power from two closer points instead of one long run.',
    },
    result: {
      ar: 'تغطية للبوابة حتى 50 متراً، وتنبيهات قليلة لأن الحساسات مضبوطة على نقاط العبور فقط.',
      en: 'Gate coverage out to 50 metres, and few alerts because the sensors are tuned only to the crossing points.',
    },
    package: 'premium-estate',
    solutionSlug: 'farms-rural',
  },
  {
    slug: 'farm-nizwa',
    type: 'farm',
    title: { ar: 'مزرعة ومحطة تعبئة', en: 'A farm and packing shed' },
    city: { ar: 'نزوى', en: 'Nizwa' },
    cameras: 6,
    year: 2024,
    images: ['scene:warehouse', 'scene:construction'],
    problem: {
      ar: 'المحطة تعمل ليلاً في موسم الحصاد، ولم تكن هناك أي كاميرا على منصة التحميل.',
      en: 'The shed worked nights during harvest, and there was no camera on the loading platform at all.',
    },
    solution: {
      ar: 'ثلاث كاميرات على منصة التحميل والمدخل، واثنتان للمخزن، وواحدة للبوابة. وسّعنا التخزين ليغطي 45 يوماً من الحصاد.',
      en: 'Three cameras on the loading platform and entrance, two for the store and one for the gate. We expanded storage to cover 45 days of harvest.',
    },
    result: {
      ar: 'يمكن مراجعة أي ليلة حصاد سابقة عند الحاجة، دون الاعتماد على ذاكرة أحد.',
      en: 'Any past harvest night can be reviewed when needed, without relying on anyone’s memory.',
    },
    package: null,
    solutionSlug: 'farms-rural',
  },
  {
    slug: 'warehouse-suhar',
    type: 'warehouse',
    title: { ar: 'مستودع وساحة', en: 'A warehouse and yard' },
    city: { ar: 'صحار', en: 'Sohar' },
    cameras: 12,
    year: 2025,
    images: ['scene:warehouse', 'scene:construction'],
    problem: {
      ar: 'حركة شاحنات على مدار الساعة، وانقطاع كهرباء متكرّر يوقف التسجيل لأيام دون أن يلاحظه أحد.',
      en: 'Trucks moving around the clock, and frequent power cuts that stopped recording for days without anyone noticing.',
    },
    solution: {
      ar: 'اثنتا عشرة كاميرا على البوابة والساحة وصالة التحميل، مع جهاز 16 قناة وتغذية احتياطية UPS وحساسات على أبواب المخزن.',
      en: 'Twelve cameras across the gate, yard and loading bay, with a 16-channel recorder, UPS backup power and sensors on the store doors.',
    },
    result: {
      ar: 'التسجيل لا ينقطع عند انقطاع الكهرباء، وأصبح لكل شاحنة وقت دخول وخروج واضح.',
      en: 'Recording no longer stops when the power does, and every truck now has a clear entry and exit time.',
    },
    package: null,
    solutionSlug: 'warehouses-sites',
  },
  {
    slug: 'site-barka',
    type: 'warehouse',
    title: { ar: 'موقع بناء', en: 'A construction site' },
    city: { ar: 'بركاء', en: 'Barka' },
    cameras: 8,
    year: 2024,
    images: ['scene:construction', 'scene:warehouse'],
    problem: {
      ar: 'موقع مفتوح لعدة أشهر، ومعدات تبقى فيه بعد انتهاء العمل اليومي.',
      en: 'An open site running for several months, with equipment left there after the working day ended.',
    },
    solution: {
      ar: 'كاميرات على البوابة والمخزن المؤقت ومحيط السور، ونظام يمكن تفكيكه ونقله إلى المبنى عند اكتماله.',
      en: 'Cameras on the gate, the temporary store and the perimeter, in a system that can be dismantled and moved into the building once finished.',
    },
    result: {
      ar: 'بقيت الكاميرات جزءاً من النظام النهائي بعد انتهاء البناء، ووفّر ذلك شراء نظام ثانٍ.',
      en: 'The cameras stayed as part of the final system after construction, which saved buying a second one.',
    },
    package: null,
    solutionSlug: 'warehouses-sites',
  },
]

export const getProject = (slug) => projects.find((p) => p.slug === slug) ?? null

export const projectsByType = (type) => (type === 'all' ? projects : projects.filter((p) => p.type === type))

export const projectsBySolution = (solutionSlug) => projects.filter((p) => p.solutionSlug === solutionSlug)

export default projects
