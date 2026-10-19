/**
 * ============================================================================
 *  SECURITY GUIDES — blog content
 *  ----------------------------------------------------------------------------
 *  Practical, non-technical advice for Oman. No statistics, no certifications
 *  and no legal claims: these are opinions based on how systems are installed.
 *
 *  • date      ISO date shown to readers (placeholders — set real publish dates)
 *  • cover     a media key from src/config/media.js (scene:* or product:*)
 *  • sections  each block is one heading plus paragraphs and an optional list
 *  • takeaway  one sentence repeated in the closing card
 *
 *  Reading time is derived from the text in src/lib/readingTime.js.
 * ============================================================================
 */

export const placeholderArticles = true

export const blogCategories = [
  { slug: 'homes', name: { en: 'Homes & villas', ar: 'المنازل والفِلل' } },
  { slug: 'business', name: { en: 'Shops & offices', ar: 'المحلات والمكاتب' } },
  { slug: 'planning', name: { en: 'Planning', ar: 'التخطيط' } },
  { slug: 'technology', name: { en: 'How it works', ar: 'كيف يعمل' } },
]

export const posts = [
  {
    slug: 'choosing-cameras-for-a-villa',
    category: 'homes',
    date: '2026-09-18',
    cover: 'scene:villa-garden',
    title: {
      en: 'Choosing cameras for a villa without overbuying',
      ar: 'كيف تختار كاميرات فيلّتك دون أن تدفع أكثر من اللازم',
    },
    excerpt: {
      en: 'Most villas need fewer cameras than they are sold. A short guide to the four points that actually matter: gate, door, courtyard and the dark corner nobody remembers.',
      ar: 'معظم الفِلل تحتاج كاميرات أقل مما يُعرض عليها. دليل قصير إلى أربع نقاط تهم فعلاً: البوابة، الباب، الحوش، والزاوية المظلمة التي ينساها الجميع.',
    },
    sections: [
      {
        heading: {
          en: 'Start from the moments you want to see, not the walls',
          ar: 'ابدأ من اللحظات التي تريد رؤيتها، لا من الجدران',
        },
        body: [
          {
            en: 'A camera list written room by room always grows. A camera list written around moments stays small: someone at the gate, a car pulling in, the door at night, the back yard when the house is empty. Most families can name five or six of those moments in under a minute — and those are the cameras worth paying for.',
            ar: 'قائمة كاميرات تُكتب غرفةً غرفةً تكبر دائماً. أما القائمة التي تُكتب حول المواقف فتبقى صغيرة: شخصٌ عند البوابة، سيارة تدخل، الباب ليلاً، الحوش الخلفي حين يكون البيت فارغاً. معظم الأسر تذكر خمسة أو ستة مواقف في أقل من دقيقة — وهذه هي الكاميرات التي تستحق الثمن.',
          },
          {
            en: 'Everything else can wait. A system designed this way costs less, records for longer because fewer channels are busy, and every camera on the screen has a reason to be there.',
            ar: 'وكل ما عدا ذلك يمكن أن ينتظر. النظام المصمّم بهذه الطريقة أقل تكلفة، ويحتفظ بالتسجيل مدة أطول لأن القنوات المشغولة أقل، ولكل كاميرا على الشاشة سببٌ لوجودها.',
          },
        ],
      },
      {
        heading: {
          en: 'The four places that earn their keep',
          ar: 'الأماكن الأربعة التي تستحق كلفتها',
        },
        body: [
          {
            en: 'After years of similar villas, the same four positions come up again and again. They are not glamorous, but they answer the calls people actually make.',
            ar: 'بعد فيلل كثيرة متشابهة، تتكرّر المواضع الأربعة نفسها. ليست مبهرة، لكنها تجيب عن الأسئلة التي يطرحها الناس فعلاً.',
          },
        ],
        list: [
          {
            en: 'The gate, looking out at the road — so you can see who is arriving before you open.',
            ar: 'البوابة، باتجاه الشارع — لترى من يصل قبل أن تفتح.',
          },
          {
            en: 'The main door, close enough to read a face at night.',
            ar: 'الباب الرئيسي، قريباً بما يكفي لتمييز الوجه ليلاً.',
          },
          {
            en: 'The courtyard or majlis approach, where guests and deliveries pass.',
            ar: 'الحوش أو مدخل المجلس، حيث يمرّ الضيوف والتوصيلات.',
          },
          {
            en: 'One wide view of the back or the service door — the side nobody watches.',
            ar: 'منظر واسع للخلف أو لباب الخدمة — الجهة التي لا يراقبها أحد.',
          },
        ],
      },
      {
        heading: {
          en: 'Where the money actually goes',
          ar: 'أين تذهب التكلفة فعلاً',
        },
        body: [
          {
            en: 'Cameras are the visible part and rarely the largest cost. Cabling, the recorder, the drive and the hours spent pulling cable through a finished villa usually decide the quote. This is why a cheap camera with a careless installation ends up costing more than a good camera installed properly.',
            ar: 'الكاميرات هي الجزء الظاهر، ونادراً ما تكون التكلفة الأكبر. التمديدات وجهاز التسجيل والقرص وساعات سحب الكابلات داخل فيلا مكتملة هي ما يحدّد العرض عادة. لهذا تنتهي الكاميرا الرخيصة بتركيب متعجّل إلى تكلفة أعلى من كاميرا جيدة مركّبة بإتقان.',
          },
          {
            en: 'Ask for the quote to show cameras, recorder, storage and installation separately. If a number is missing, ask why.',
            ar: 'اطلب أن يُظهر العرض الكاميرات وجهاز التسجيل والتخزين والتركيب كلٌّ على حدة. وإن غاب بند، فاسأل عن سببه.',
          },
        ],
      },
      {
        heading: {
          en: 'What we would skip',
          ar: 'ما نفضّل الاستغناء عنه',
        },
        body: [
          {
            en: 'Decorative cameras pointed at nothing, a monitor in every room, and recording at the highest quality on every channel for a month. Each one feels like more security and quietly buys you less of it.',
            ar: 'كاميرات للزينة موجّهة إلى لا شيء، وشاشة في كل غرفة، وتسجيل بأعلى جودة على كل قناة لشهر كامل. كل واحد منها يبدو أماناً إضافياً، وهو في الحقيقة يشتري لك أماناً أقل.',
          },
        ],
      },
    ],
    takeaway: {
      en: 'Four or five well-placed cameras protect a villa better than ten placed for symmetry.',
      ar: 'أربع أو خمس كاميرات في مواضع مدروسة تحمي الفيلا أفضل من عشر كاميرات موزّعة للشكل.',
    },
  },

  {
    slug: 'night-vision-explained',
    category: 'technology',
    date: '2026-09-02',
    cover: 'scene:farm',
    title: {
      en: 'Night vision, explained without the brochure',
      ar: 'الرؤية الليلية، بلا كلام الدعاية',
    },
    excerpt: {
      en: 'Infrared, colour at night, and why a bright light can ruin the picture. What the spec sheet means when it says “30 metres”.',
      ar: 'الأشعة تحت الحمراء، والألوان ليلاً، ولماذا يُفسد الضوء الساطع الصورة. وماذا تعني عبارة «30 متراً» في ورقة المواصفات.',
    },
    sections: [
      {
        heading: {
          en: 'Two kinds of night picture',
          ar: 'نوعان من الصورة الليلية',
        },
        body: [
          {
            en: 'Most cameras switch to infrared when the light drops. The picture becomes black and white, and an invisible ring of LEDs lights the scene up to a certain distance. It is reliable and it is what most villas, farms and yards use.',
            ar: 'معظم الكاميرات تنتقل إلى الأشعة تحت الحمراء حين يخفت الضوء. تصبح الصورة أبيض وأسود، وتضيء حلقة من الأشعة غير المرئية المشهد حتى مسافة معيّنة. هذه الطريقة موثوقة، وهي ما تستخدمه معظم الفلل والمزارع والأسوار.',
          },
          {
            en: 'The other kind keeps colour at night, using a very sensitive sensor. It reads better on a screen, but it needs some light to work with — a street lamp, a porch light, a security light. In true darkness it falls back to infrared anyway.',
            ar: 'النوع الآخر يحتفظ بالألوان ليلاً عبر حسّاس عالي الحساسية. يبدو أجمل على الشاشة، لكنه يحتاج ضوءاً يعمل عليه — عمود إنارة، ضوء مدخل، كشّاف. وفي الظلام الحقيقي يعود إلى الأشعة تحت الحمراء على أي حال.',
          },
        ],
      },
      {
        heading: {
          en: 'What “30 metres” really means',
          ar: 'ماذا تعني «30 متراً» حقاً',
        },
        body: [
          {
            en: 'The distance on the box is measured in a test room, on a flat surface, with nothing in the way. In a real courtyard the useful distance is often half of that, and the edges of the frame are dimmer than the centre.',
            ar: 'المسافة المكتوبة على العلبة تُقاس في غرفة اختبار، على سطح مستوٍ، بلا عوائق. في حوش حقيقي تكون المسافة المفيدة نصفها غالباً، وتكون أطراف الصورة أضعف إضاءة من وسطها.',
          },
          {
            en: 'If you need to recognise a face at a gate 20 metres away, the honest answer is usually a camera closer to the gate, not a stronger light on the wall.',
            ar: 'إن كنت تحتاج تمييز وجه على بوابة تبعد عشرين متراً، فالجواب الصادق عادةً كاميرا أقرب إلى البوابة، لا ضوء أقوى على الجدار.',
          },
        ],
      },
      {
        heading: {
          en: 'The mistakes we see most',
          ar: 'الأخطاء الأكثر شيوعاً',
        },
        body: [],
        list: [
          {
            en: 'A camera facing a wall lamp: the lamp wins and the rest of the frame turns black.',
            ar: 'كاميرا تواجه مصباحاً: يفوز المصباح ويصبح باقي الإطار أسود.',
          },
          {
            en: 'A camera under a tree: leaves move all night and trigger alerts that nobody reads.',
            ar: 'كاميرا تحت شجرة: تتحرك الأوراق طوال الليل وتطلق تنبيهات لا يقرؤها أحد.',
          },
          {
            en: 'A camera too high: a lovely wide view where every face is a small dot.',
            ar: 'كاميرا عالية جداً: منظر واسع جميل، لكن كل وجه نقطة صغيرة.',
          },
          {
            en: 'A dome aimed through glass: at night the infrared reflects straight back into the lens.',
            ar: 'كاميرا قبّة خلف زجاج: ليلاً تنعكس الأشعة مباشرة إلى العدسة.',
          },
        ],
      },
      {
        heading: {
          en: 'A simple test before you choose',
          ar: 'اختبار بسيط قبل أن تختار',
        },
        body: [
          {
            en: 'At night, stand where the camera will go and look at the scene with your own eyes. If you cannot tell a person from a post at that distance, the camera will not either. Then ask for a sample recording from a similar place — not a photo of the camera.',
            ar: 'ليلاً، قف حيث ستُركّب الكاميرا وانظر إلى المشهد بعينيك. إن لم تستطع التمييز بين إنسان وعمود على تلك المسافة، فلن تفعل الكاميرا ذلك. ثم اطلب تسجيلاً تجريبياً من مكان مشابه — لا صورةً للكاميرا.',
          },
        ],
      },
    ],
    takeaway: {
      en: 'Position and light decide the night picture more than the model number does.',
      ar: 'الموضع والإضاءة يحدّدان صورة الليل أكثر من رقم الموديل.',
    },
  },

  {
    slug: 'how-many-cameras-do-you-need',
    category: 'planning',
    date: '2026-08-21',
    cover: 'scene:construction',
    title: {
      en: 'How many cameras do you actually need?',
      ar: 'كم كاميرا تحتاج فعلاً؟',
    },
    excerpt: {
      en: 'A short, honest method: count entries, count blind sides, and stop. Plus how storage and channel count quietly set the ceiling.',
      ar: 'طريقة قصيرة وصادقة: عدّ المداخل، عدّ الجهات المكشوفة، ثم توقّف. ومعها كيف يحدّد التخزين وعدد القنوات السقف بهدوء.',
    },
    sections: [
      {
        heading: {
          en: 'Count entries first',
          ar: 'ابدأ بعدّ المداخل',
        },
        body: [
          {
            en: 'Every place has a small number of ways in: a gate, a door, a back door, a service entrance, sometimes a shutter. One camera per entry, placed to see the face of whoever comes through, is the base of every sensible system.',
            ar: 'لكل مكان عددٌ صغير من المداخل: بوابة، باب، باب خلفي، مدخل خدمة، وأحياناً مصراع. كاميرا واحدة لكل مدخل، موضوعة لترى وجه من يدخل، هي أساس كل نظام منطقي.',
          },
        ],
      },
      {
        heading: {
          en: 'Then the blind sides',
          ar: 'ثم الجهات المكشوفة',
        },
        body: [
          {
            en: 'Walk the perimeter once and note where the wall is low, where a car can park unseen, and where you would not want to walk at night. Those are the second group. Most villas stop at four to eight cameras; shops usually need the till, the door and the stockroom before anything else.',
            ar: 'اطُف حول السور مرة واحدة وسجّل أين ينخفض الجدار، وأين يمكن أن تقف سيارة بعيداً عن الأنظار، وأين لا تحب أن تمشي ليلاً. هذه هي المجموعة الثانية. معظم الفلل تتوقف عند أربع إلى ثماني كاميرات؛ أما المحلات فتحتاج الصندوق والباب والمخزن قبل أي شيء آخر.',
          },
        ],
      },
      {
        heading: {
          en: 'The quiet ceiling: channels and storage',
          ar: 'السقف الخفي: القنوات والتخزين',
        },
        body: [
          {
            en: 'Recorders come in fixed channel counts — four, eight, sixteen. Buying a five-camera system on a four-channel recorder means replacing the recorder later. The same is true of storage: more cameras and more days of recording need a larger drive, and it is cheaper to size that once.',
            ar: 'تأتي أجهزة التسجيل بعدد قنوات ثابت — أربع، ثمانٍ، ست عشرة. شراء نظام بخمس كاميرات على جهاز بأربع قنوات يعني استبدال الجهاز لاحقاً. الأمر نفسه في التخزين: كاميرات أكثر وأيام تسجيل أكثر تحتاج قرصاً أكبر، وأرخص أن تُحسب مرة واحدة.',
          },
          {
            en: 'Ask how many days of recording you will actually get. Two weeks is comfortable for a home; a shop may want a month.',
            ar: 'اسأل كم يوماً من التسجيل ستحصل عليه فعلاً. أسبوعان مريحان للمنزل؛ وقد يحتاج المحل شهراً.',
          },
        ],
      },
      {
        heading: {
          en: 'Leave one channel free',
          ar: 'اترك قناة واحدة فارغة',
        },
        body: [
          {
            en: 'A free channel costs almost nothing now and saves an entire recorder later. It also leaves room for the camera you will want after the first month — there is almost always one.',
            ar: 'القناة الفارغة لا تكلف شيئاً تقريباً الآن، وتوفّر جهاز تسجيل كامل لاحقاً. وتترك مكاناً للكاميرا التي سترغب بها بعد الشهر الأول — وهناك واحدة دائماً.',
          },
        ],
      },
    ],
    takeaway: {
      en: 'One camera per entry, one per blind side, and one spare channel. Most places stop there.',
      ar: 'كاميرا لكل مدخل، وكاميرا لكل جهة مكشوفة، وقناة احتياطية. معظم الأماكن تتوقف هنا.',
    },
  },

  {
    slug: 'protecting-your-shop',
    category: 'business',
    date: '2026-08-04',
    cover: 'scene:shopfront',
    title: {
      en: 'Protecting a shop: till, door, stockroom',
      ar: 'حماية المحل: الصندوق والباب والمخزن',
    },
    excerpt: {
      en: 'Retail has three questions that matter — who is at the till, who came in, and what left the back. A camera for each, placed properly, is usually enough.',
      ar: 'للمحل ثلاثة أسئلة تهم: من عند الصندوق، من دخل، وماذا خرج من الخلف. كاميرا لكل سؤال، في موضع صحيح، تكفي عادة.',
    },
    sections: [
      {
        heading: {
          en: 'The till camera is not about mistrust',
          ar: 'كاميرا الصندوق ليست مسألة انعدام ثقة',
        },
        body: [
          {
            en: 'A camera over the till settles disagreements about change, discounts and returns in seconds. Placed slightly behind and above the counter, it sees both the customer and the screen without being in anyone’s face.',
            ar: 'كاميرا فوق الصندوق تحسم خلافات الباقي والخصومات والإرجاع في ثوانٍ. موضوعة خلف الكاونتر وأعلى قليلاً، ترى العميل والشاشة معاً دون أن تكون في وجه أحد.',
          },
        ],
      },
      {
        heading: {
          en: 'The door camera should see faces, not heads',
          ar: 'كاميرا الباب يجب أن ترى الوجوه، لا رؤوس الرؤوس',
        },
        body: [
          {
            en: 'A camera mounted high above the entrance mostly records the top of people’s heads. Lower, at an angle toward the door, it records faces. This is the single most common retail installation mistake we are asked to correct.',
            ar: 'الكاميرا المثبّتة عالياً فوق المدخل تسجّل غالباً أعلى رؤوس الناس. أخفض، بزاوية نحو الباب، تسجّل الوجوه. هذا أكثر خطأ تركيب نراه في المحلات ويُطلب منّا تصحيحه.',
          },
        ],
      },
      {
        heading: {
          en: 'The stockroom is where the quiet losses happen',
          ar: 'المخزن حيث تحدث الخسائر الهادئة',
        },
        body: [
          {
            en: 'Shortages rarely look like theft at first — a box moved, a delivery signed twice. One camera covering the stockroom door from inside answers most of those questions without watching anyone all day.',
            ar: 'النقص نادراً ما يبدو سرقة في البداية — صندوق نُقل، توصيل وُقّع مرتين. كاميرا واحدة تغطي باب المخزن من الداخل تجيب عن معظم هذه الأسئلة دون مراقبة أحد طوال اليوم.',
          },
        ],
      },
      {
        heading: {
          en: 'Keep it simple for staff',
          ar: 'اجعلها بسيطة للفريق',
        },
        body: [
          {
            en: 'If reviewing yesterday means three passwords and a laptop, nobody will do it. A phone app with one account for the owner, and alerts that only fire when the shop is closed, is worth more than an extra camera.',
            ar: 'إن كان استعراض الأمس يحتاج ثلاث كلمات مرور وحاسوباً، فلن يفعله أحد. تطبيق على الهاتف بحساب واحد للمالك، وتنبيهات لا تعمل إلا حين يكون المحل مغلقاً، أنفع من كاميرا إضافية.',
          },
        ],
      },
    ],
    takeaway: {
      en: 'Till, door, stockroom — three cameras placed well beat eight placed for coverage.',
      ar: 'الصندوق، الباب، المخزن — ثلاث كاميرات في مواضع جيدة أفضل من ثمانٍ موزّعة للتغطية.',
    },
  },

  {
    slug: 'remote-viewing-safely',
    category: 'technology',
    date: '2026-07-15',
    cover: 'scene:office',
    title: {
      en: 'Watching your cameras from your phone, safely',
      ar: 'مشاهدة كاميراتك من هاتفك، بأمان',
    },
    excerpt: {
      en: 'Remote viewing is the feature people use most and secure least. Five quiet settings that keep the cameras yours.',
      ar: 'المشاهدة عن بُعد أكثر ما يُستخدم وأقل ما يُؤمَّن. خمسة إعدادات هادئة تُبقي الكاميرات ملكك.',
    },
    sections: [
      {
        heading: {
          en: 'Change the default password before anything else',
          ar: 'غيّر كلمة المرور الافتراضية قبل أي شيء',
        },
        body: [
          {
            en: 'Recorders and cameras leave the factory with the same login on every unit. If the device is reachable from outside, that login is the front door. A long password, unique to that device, is the single highest-value minute of setup.',
            ar: 'تخرج أجهزة التسجيل والكاميرات من المصنع بالدخول نفسه على كل وحدة. وإن كان الجهاز متاحاً من الخارج، فهذا الدخول هو الباب الأمامي. كلمة مرور طويلة خاصة بذلك الجهاز هي أنفع دقيقة إعداد.',
          },
        ],
      },
      {
        heading: {
          en: 'Prefer the app over opening ports',
          ar: 'فضّل التطبيق على فتح المنافذ',
        },
        body: [
          {
            en: 'Older setups exposed the recorder directly to the internet so it could be viewed anywhere. Modern apps connect through the manufacturer’s service instead, which keeps the recorder closed. If someone proposes port forwarding for a home or shop, ask what it buys you.',
            ar: 'الأنظمة الأقدم كانت تكشف جهاز التسجيل مباشرة على الإنترنت ليُشاهد من أي مكان. التطبيقات الحديثة تتصل عبر خدمة الشركة المصنّعة، فتبقي الجهاز مغلقاً. وإن اقترح أحدٌ فتح منفذ لمنزل أو محل، فاسأل عمّا يقدّمه لك.',
          },
          {
            en: 'A separate account for each family member or staff member means you can remove one without changing everyone else’s.',
            ar: 'حساب منفصل لكل فرد في الأسرة أو الفريق يعني إمكانية إزالة حساب واحد دون تغيير حسابات الباقين.',
          },
        ],
      },
      {
        heading: {
          en: 'Keep the recorder off the guest network',
          ar: 'أبعد جهاز التسجيل عن شبكة الضيوف',
        },
        body: [
          {
            en: 'Cameras and the recorder belong on their own network or a separate VLAN, not on the Wi-Fi guests use. This is not exotic: most modern routers offer a guest network, and that small separation is enough for a home.',
            ar: 'تستحق الكاميرات وجهاز التسجيل شبكة خاصة أو شبكة معزولة، لا شبكة الواي فاي التي يستخدمها الضيوف. الأمر ليس معقّداً: معظم الراوترات الحديثة توفّر شبكة ضيوف، وهذا الفصل الصغير يكفي للمنزل.',
          },
        ],
      },
      {
        heading: {
          en: 'Decide what you actually want to be told',
          ar: 'حدّد ما تريد أن يُخبرك به النظام',
        },
        body: [
          {
            en: 'Alerts for every movement will be muted within a week. Pick two or three windows that matter — after closing, while travelling, at night — and let the rest record quietly. A system you still listen to in month three is doing its job.',
            ar: 'التنبيهات لكل حركة ستُكتَم خلال أسبوع. اختر نافذتين أو ثلاثاً تهمّان — بعد الإغلاق، أثناء السفر، ليلاً — ودع الباقي يسجّل بهدوء. النظام الذي ما زلت تصغي إليه في الشهر الثالث هو الذي يؤدي عمله.',
          },
        ],
      },
    ],
    takeaway: {
      en: 'A strong unique password, the official app, a separate network, and fewer alerts.',
      ar: 'كلمة مرور قوية خاصة، والتطبيق الرسمي، وشبكة منفصلة، وتنبيهات أقل.',
    },
  },
]

export const getPost = (slug) => posts.find((post) => post.slug === slug) ?? null

export const postsByCategory = (category) =>
  category && category !== 'all' ? posts.filter((post) => post.category === category) : posts

export const categoryName = (slug, lang = 'ar') =>
  blogCategories.find((category) => category.slug === slug)?.name[lang] ?? slug

export function relatedPosts(slug, limit = 3) {
  const current = getPost(slug)
  if (!current) return posts.slice(0, limit)
  const sameCategory = posts.filter((p) => p.slug !== slug && p.category === current.category)
  const others = posts.filter((p) => p.slug !== slug && p.category !== current.category)
  return [...sameCategory, ...others].slice(0, limit)
}

export default posts
