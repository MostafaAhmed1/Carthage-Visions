/**
 * ============================================================================
 *  LEGAL TEXT — PLACEHOLDER, TO BE REVIEWED
 *  ----------------------------------------------------------------------------
 *  This is a plain-language draft written to match how the site actually
 *  behaves. It is NOT legal advice and must be reviewed by the owner or a
 *  qualified adviser before launch, particularly the points marked TODO.
 *
 *  `reviewRequired: true` keeps /privacy and /terms out of search results
 *  until that review happens.
 * ============================================================================
 */

export const reviewRequired = true

/** Shown under the page title on both legal pages. */
export const updated = { en: '[TODO: last updated date]', ar: '[TODO: تاريخ آخر تحديث]' }

export const privacySections = [
  {
    title: { en: 'What this page covers', ar: 'ماذا تشمل هذه الصفحة' },
    body: {
      en: 'How Carthage Visions handles information when you browse this site, call us or message us on WhatsApp. It describes what happens in practice today; it is not a promise about anything the site does not do.',
      ar: 'كيف تتعامل قرطاج فيجن مع المعلومات عند تصفّحك هذا الموقع أو اتصالك بنا أو مراسلتنا على واتساب. تصف ما يحدث فعلاً اليوم؛ وليست وعداً بشأن أمر لا يفعله الموقع.',
    },
  },
  {
    title: { en: 'What the site collects', ar: 'ما يجمعه الموقع' },
    body: {
      en: 'The site has no contact forms and no account area, so it does not ask you for a name, an address or an email. If analytics is enabled, it records page views and anonymous interaction events such as “WhatsApp clicked”, without storing message contents. Your language choice is kept in your own browser storage so the site opens in the same language next time.',
      ar: 'لا يوجد في الموقع نماذج تواصل ولا حسابات، لذلك لا يطلب منك اسماً ولا عنواناً ولا بريداً. وإذا كانت أدوات التحليل مفعّلة، فإنها تسجّل مشاهدات الصفحات وأحداثاً تفاعلية مجهولة مثل «النقر على واتساب»، دون تخزين محتوى الرسائل. ويُحفظ اختيار اللغة في متصفحك وحده ليفتح الموقع باللغة نفسها في المرة القادمة.',
    },
  },
  {
    title: { en: 'Cookies and analytics', ar: 'ملفات تعريف الارتباط والتحليل' },
    body: {
      en: 'We use one small browser entry for your language, and analytics only if you accept it in the consent banner. Declining means no analytics script is loaded. There is no advertising or cross-site tracking on this site.',
      ar: 'نستخدم مُدخلاً صغيراً في المتصفح لاختيار اللغة، وأدوات التحليل فقط إن قبلتها في شريط الموافقة. الرفض يعني عدم تحميل أي سكربت تحليل. ولا يوجد إعلان ولا تتبّع عبر المواقع في هذا الموقع.',
    },
  },
  {
    title: { en: 'Calls and WhatsApp messages', ar: 'المكالمات ورسائل واتساب' },
    body: {
      en: 'When you tap a call or WhatsApp button, the conversation happens in your phone app and on WhatsApp’s own service, under its privacy terms. We see your number and whatever you send us, and we use it only to answer your question and arrange a visit or installation.',
      ar: 'عند الضغط على زر اتصال أو واتساب، يجري التواصل في تطبيق هاتفك وعلى خدمة واتساب نفسها، وفق شروط الخصوصية الخاصة بها. نرى رقمك وما ترسله إلينا، ونستخدمه فقط للرد على سؤالك وترتيب زيارة أو تركيب.',
    },
  },
  {
    title: { en: 'Camera footage from installed systems', ar: 'تسجيلات الكاميرات في الأنظمة المركّبة' },
    body: {
      en: 'Recordings from a system we install belong to the customer and stay on their recorder and their app account. We do not keep copies. If you ask us to look at footage while solving a problem, we see only what you choose to share.',
      ar: 'التسجيلات في أي نظام نركّبه تخصّ العميل وتبقى على جهاز تسجيله وحسابه في التطبيق. لا نحتفظ بنسخ. وإن طلبت منّا الاطلاع على تسجيل أثناء حل مشكلة، فنرى فقط ما تختار مشاركته.',
    },
  },
  {
    title: { en: 'How long we keep things', ar: 'مدة الاحتفاظ' },
    body: {
      en: 'Messages and call records stay in our phone for as long as needed to serve you, and are deleted when they are no longer useful. Analytics data is kept according to the analytics provider’s own retention setting. [TODO: confirm the retention period you want to state.]',
      ar: 'تبقى الرسائل وسجلات الاتصال في هاتفنا للمدة اللازمة لخدمتك، وتُحذف حين لا تعود مفيدة. أما بيانات التحليل فتبقى وفق إعداد الاحتفاظ في أداة التحليل نفسها. [TODO: تأكيد مدة الاحتفاظ التي تريد ذكرها.]',
    },
  },
  {
    title: { en: 'Your choices', ar: 'خياراتك' },
    body: {
      en: 'You can decline analytics in the banner, ask us to delete a conversation, or ask what we hold about you by calling or messaging the number on the contact page. We will answer and act on it.',
      ar: 'يمكنك رفض التحليل من الشريط، أو أن تطلب منّا حذف محادثة، أو أن تسأل عمّا نحتفظ به عنك بالاتصال أو المراسلة على الرقم في صفحة التواصل. سنجيب وننفّذ.',
    },
  },
  {
    title: {
      en: 'Oman personal data requirements — to be reviewed',
      ar: 'متطلبات حماية البيانات في عُمان — للمراجعة',
    },
    body: {
      en: 'Oman has personal data protection rules, and the way they apply to a small installation business — including how consent is recorded, how a request for deletion is handled and whether a privacy contact must be named — should be confirmed with the owner or a legal adviser. [TODO: review against Oman’s personal data protection law before launch.]',
      ar: 'لدى سلطنة عُمان قواعد لحماية البيانات الشخصية، وطريقة تطبيقها على منشأة تركيب صغيرة — بما في ذلك كيفية توثيق الموافقة، وكيفية التعامل مع طلب الحذف، وما إذا كان يجب تسمية مسؤول للخصوصية — تحتاج إلى تأكيد من المالك أو مستشار قانوني. [TODO: المراجعة وفق قانون حماية البيانات الشخصية في عُمان قبل الإطلاق.]',
    },
  },
  {
    title: { en: 'Contact', ar: 'التواصل' },
    body: {
      en: 'Questions about this page: call or message the number shown on the contact page, or write to the email address there. [TODO: confirm the email address before launch.]',
      ar: 'أسئلة حول هذه الصفحة: اتصل أو راسل الرقم الظاهر في صفحة التواصل، أو اكتب إلى البريد الإلكتروني المذكور فيها. [TODO: تأكيد البريد الإلكتروني قبل الإطلاق.]',
    },
  },
]

export const termsSections = [
  {
    title: { en: 'What this page is', ar: 'ما هذه الصفحة' },
    body: {
      en: 'A short, plain-language draft of the terms under which Carthage Visions provides site visits, quotes, installation and after-sales support. It is a placeholder written for this website and needs review before launch. [TODO: legal review.]',
      ar: 'مسوّدة قصيرة بلغة واضحة للشروط التي تقدّم بموجبها قرطاج فيجن الزيارات وعروض السعر والتركيب والدعم بعد البيع. وهي نص مؤقت كُتب لهذا الموقع ويحتاج مراجعة قبل الإطلاق. [TODO: مراجعة قانونية.]',
    },
  },
  {
    title: { en: 'Site visits and quotes', ar: 'الزيارات وعروض السعر' },
    body: {
      en: 'A site visit is free and carries no obligation. A quote is valid for the period written on it; if the site changes — walls finished, power moved, scope added — the number may change with it. The quote is the agreement, not the conversation before it.',
      ar: 'الزيارة مجانية وبلا التزام. عرض السعر صالح للمدة المكتوبة فيه؛ وإن تغيّر الموقع — اكتملت الجدران، نُقلت الكهرباء، أُضيف عمل — فقد يتغيّر الرقم معه. العرض هو الاتفاق، لا الحديث الذي سبقه.',
    },
  },
  {
    title: { en: 'Installation', ar: 'التركيب' },
    body: {
      en: 'We agree the positions, the cable routes and the working days before starting. Access to power and to the rooms involved is the customer’s responsibility. Where a wall, a ceiling or a finish must not be touched, tell us before the work begins.',
      ar: 'نتفق على المواضع ومسارات الكابلات وأيام العمل قبل البدء. تأمين الكهرباء والوصول إلى الغرف المعنية مسؤولية العميل. وإن كان جدار أو سقف أو تشطيب لا يجب المساس به، فأخبرنا قبل بدء العمل.',
    },
  },
  {
    title: { en: 'Warranty', ar: 'الضمان' },
    body: {
      en: 'Equipment carries its manufacturer warranty, and our installation work is covered for the term written on the invoice. Damage from accidents, water, power surges or work by others is not covered. [TODO: confirm warranty length and what exactly it includes.]',
      ar: 'تحمل الأجهزة ضمان المصنّع، ويشمل ضماننا أعمال التركيب للمدة المكتوبة في الفاتورة. لا يشمل التلف الناتج عن الحوادث أو الماء أو ارتفاع الجهد أو أعمال يقوم بها غيرنا. [TODO: تأكيد مدة الضمان وما يشمله بدقة.]',
    },
  },
  {
    title: { en: 'Payment', ar: 'الدفع' },
    body: {
      en: 'Payment terms, accepted methods and any deposit are stated on the quote and invoice. Ask before the work starts if anything is unclear. [TODO: confirm payment terms and whether a deposit is required.]',
      ar: 'تُذكر شروط الدفع والطرق المقبولة وأي دفعة مقدّمة في عرض السعر والفاتورة. اسأل قبل بدء العمل إن كان هناك ما هو غير واضح. [TODO: تأكيد شروط الدفع ووجود دفعة مقدّمة.]',
    },
  },
  {
    title: { en: 'Using the site', ar: 'استخدام الموقع' },
    body: {
      en: 'Product names, brands and images may belong to their owners and are shown for identification. Prices on the site are starting points (“from”), not final prices, and may change. Nothing on the site is an offer that binds us to a particular price.',
      ar: 'قد تكون أسماء المنتجات والعلامات والصور مملوكة لأصحابها وتُعرض للتعرّف فقط. الأسعار في الموقع نقاط بداية («تبدأ من») وليست أسعاراً نهائية وقد تتغيّر. ولا شيء في الموقع يُعدّ عرضاً يُلزمنا بسعر محدّد.',
    },
  },
  {
    title: { en: 'Liability and law', ar: 'المسؤولية والقانون' },
    body: {
      en: 'We aim to describe systems honestly, but a camera system reduces risk rather than removing it, and we do not guarantee that any event will be recorded. The applicable law and the place where disputes are heard must be confirmed. [TODO: confirm governing law and jurisdiction — likely Oman.]',
      ar: 'نهدف إلى وصف الأنظمة بصدق، لكن نظام الكاميرات يقلّل الخطر ولا يزيله، ولا نضمن تسجيل أي حدث. ويجب تأكيد القانون الواجب التطبيق والمكان الذي تُنظر فيه النزاعات. [TODO: تأكيد القانون والمحكمة المختصة — عُمان غالباً.]',
    },
  },
  {
    title: { en: 'Changes', ar: 'التعديلات' },
    body: {
      en: 'If these terms change, the new text replaces this one on the same page. The date at the top tells you when it last changed. [TODO: insert a real date when confirmed.]',
      ar: 'إن تغيّرت هذه الشروط، يحلّ النص الجديد محل هذا النص في الصفحة نفسها. ويخبرك التاريخ في الأعلى بآخر تحديث. [TODO: إدراج تاريخ فعلي عند التأكيد.]',
    },
  },
]
