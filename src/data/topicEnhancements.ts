import { poi } from './poi';

const palace = poi.mapsUrl;
const searchMap = (name: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${name}, Phnom Penh, Cambodia`)}`;

export const topicPhotos: Record<string, { src: string; alt: Record<string, string> }[]> = {
  'throne-hall': [
    { src: '/gallery/royal-palace-of-cambodia-17.jpg', alt: { en: 'Royal Palace Throne Hall facade and central spire', zh: '金边王宫王座大厅正面及中央塔尖', km: 'ផ្នែកខាងមុខ និងកំពូលព្រះទីនាំង' } },
    { src: '/gallery/royal-palace-of-cambodia-21.jpg', alt: { en: 'Throne Hall from the palace garden', zh: '从王宫花园看王座大厅', km: 'ព្រះទីនាំងពីសួនច្បារ' } },
  ],
  'moonlight-pavilion': [
    { src: '/gallery/moonlight-pavilion-phnom-penh.jpg', alt: { en: 'Moonlight Pavilion at the Royal Palace', zh: '金边王宫月光亭实景', km: 'ព្រះទីនាំងច័ន្ទឆាយានៅព្រះបរមរាជវាំង' } },
  ],
  'royal-palace-history': [
    { src: '/gallery/royal-palace-of-cambodia-20.jpg', alt: { en: 'Traditional Khmer royal architecture', zh: '传统高棉王室建筑屋顶', km: 'ស្ថាបត្យកម្មខ្មែរក្នុងព្រះបរមរាជវាំង' } },
    { src: '/gallery/royal-palace-of-cambodia-23.jpg', alt: { en: 'Royal stupas in palace grounds', zh: '王宫内的佛塔群', km: 'ចេតិយក្នុងព្រះបរមរាជវាំង' } },
  ],
  'palace-walking-route': [
    { src: '/gallery/royal-palace-of-cambodia-9.jpg', alt: { en: 'Visitor orientation map inside the palace', zh: '王宫内的参观导览图', km: 'ផែនទីទស្សនាក្នុងព្រះបរមរាជវាំង' } },
    { src: '/gallery/royal-palace-of-cambodia-7.jpg', alt: { en: 'Covered walkway in the palace', zh: '王宫的有顶回廊', km: 'ផ្លូវដើរមានដំបូលក្នុងព្រះបរមរាជវាំង' } },
    { src: '/gallery/royal-palace-of-cambodia-24.jpg', alt: { en: 'Reamker murals in the Silver Pagoda precinct', zh: '银阁寺区域的雷姆克壁画', km: 'គំនូររ៉េមកែរក្នុងបរិវេណវត្តព្រះកែវមរកត' } },
  ],
  'royal-palace-photography': [
    { src: '/gallery/royal-palace-of-cambodia-3.jpg', alt: { en: 'Frontal symmetrical view of palace architecture', zh: '王宫建筑正面构图', km: 'ទិដ្ឋភាពសមមាត្រនៃស្ថាបត្យកម្មព្រះបរមរាជវាំង' } },
    { src: '/gallery/royal-palace-of-cambodia-10.jpg', alt: { en: 'Palace roofline and garden viewpoint', zh: '王宫屋顶与花园取景角度', km: 'មុំថតដំបូល និងសួនច្បារព្រះបរមរាជវាំង' } },
  ],
};

export const topicMaps: Record<string, string> = {
  'throne-hall': searchMap('Throne Hall Royal Palace'),
  'moonlight-pavilion': searchMap('Moonlight Pavilion Royal Palace'),
  'royal-palace-history': palace,
  'palace-walking-route': searchMap('Royal Palace Phnom Penh visitor entrance'),
  'royal-palace-photography': searchMap('Royal Palace Phnom Penh'),
};

type Locale = 'en' | 'zh' | 'km';
const localized: Record<Locale, { managerTitle: string; manager: string; heritage: string; managerNote: string; highlights: string; visit: string; photo: string; transport: string; nearby: string; map: string; location: string; note: string; overview: string; features: string; visitors: string; timing: string }> = {
  en: {
    managerTitle: 'About the Royal Palace and its administration',
    manager: 'The Royal Palace is a royal residence and ceremonial complex associated with Cambodia’s monarchy. The Ministry of the Royal Palace is the government institution responsible for royal-palace affairs; the site is not a municipal park.',
    heritage: 'Established after the royal capital moved from Oudong to Phnom Penh in the nineteenth century, the riverside complex combines state ceremonial architecture, gardens and Buddhist sacred spaces. It remains living heritage, not just a historic attraction.',
    managerNote: 'Visitor access is determined by the palace authorities and can change for royal ceremonies. Confirm permitted areas and conditions on arrival.',
    highlights: 'Architectural and cultural highlights', visit: 'Suggested walking sequence', photo: 'Photography viewpoints', transport: 'Getting here', nearby: 'Explore the palace and nearby', map: 'View this landmark on Google Maps', location: 'Specific location', note: 'Please confirm opening hours and entry conditions on site.', overview: 'What to look for', features: 'Distinctive features', visitors: 'Visitor guidance', timing: 'Suggested visit duration',
  },
  zh: {
    managerTitle: '关于金边王宫及其管理主体',
    manager: '金边王宫是柬埔寨王室的居所及典礼建筑群。柬埔寨王宫事务部（Ministry of the Royal Palace）是负责王宫相关事务的政府机构；这里并非由金边市政府管理的普通公园。',
    heritage: '19世纪王都从乌栋迁至金边后，湄公河—洞里萨河附近的王宫建筑群逐步形成，融合王室典礼建筑、庭院景观与佛教宗教空间。这里至今仍是持续使用的文化遗产。',
    managerNote: '游客开放区域由王宫管理方面安排，举行王室典礼时可能临时调整。到访时请依现场公告核实。',
    highlights: '建筑与文化特色', visit: '建议步行路线', photo: '摄影机位', transport: '交通方式', nearby: '王宫及周边游览', map: '在 Google 地图查看此地点', location: '具体地点', note: '开放时间和入场安排请现场核实。', overview: '观察重点', features: '独特看点', visitors: '游览须知', timing: '建议停留时间',
  },
  km: {
    managerTitle: 'អំពីព្រះបរមរាជវាំង និងស្ថាប័នគ្រប់គ្រង',
    manager: 'ព្រះបរមរាជវាំងជាព្រះរាជដំណាក់ និងទីតាំងព្រះរាជពិធីរបស់កម្ពុជា។ ក្រសួងព្រះបរមរាជវាំងជាស្ថាប័នរដ្ឋដែលទទួលបន្ទុកកិច្ចការព្រះបរមរាជវាំង។ ទីនេះមិនមែនជាសួនសាធារណៈក្រោមការគ្រប់គ្រងសាលារាជធានីទេ។',
    heritage: 'ក្រោយការផ្លាស់រាជធានីពីឧដុង្គមកភ្នំពេញក្នុងសតវត្សទី១៩ សំណង់តាមមាត់ទន្លេនេះបានអភិវឌ្ឍជាបន្តបន្ទាប់ ដោយរួមបញ្ចូលព្រះទីនាំង សួនច្បារ និងទីសក្ការៈព្រះពុទ្ធសាសនា។ វាជាបេតិកភណ្ឌដែលនៅមានការប្រើប្រាស់។',
    managerNote: 'អាជ្ញាធរព្រះបរមរាជវាំងកំណត់តំបន់បើកសម្រាប់ភ្ញៀវ ហើយអាចប្ដូរពេលមានព្រះរាជពិធី។ សូមពិនិត្យនៅទីតាំង។',
    highlights: 'ស្ថាបត្យកម្ម និងវប្បធម៌', visit: 'ផ្លូវដើរណែនាំ', photo: 'មុំថតរូប', transport: 'របៀបទៅដល់', nearby: 'ទស្សនាព្រះបរមរាជវាំង និងជុំវិញ', map: 'មើលទីតាំងនេះក្នុង Google Maps', location: 'ទីតាំងជាក់លាក់', note: 'សូមបញ្ជាក់ម៉ោងបើក និងការចូលទស្សនានៅទីតាំង។', overview: 'អ្វីគួរសង្កេត', features: 'ចំណុចពិសេស', visitors: 'ការណែនាំសម្រាប់ភ្ញៀវ', timing: 'រយៈពេលទស្សនាណែនាំ',
  },
};

export function topicUi(lang: string) { return localized[(lang in localized ? lang : 'en') as Locale]; }

const extra: Record<string, Record<Locale, { features: string; route: string[]; photo: string; duration: string; transport: string }>> = {
  'throne-hall': {
    en: { features: 'The raised ceremonial platform, multi-tiered roofs and tall central spire make this the visual centre of the royal courtyard. Compare the front elevation with the roofline of neighbouring halls.', route: ['Enter by the visitor gate and check the current permitted route.', 'Approach the Throne Hall courtyard without crossing barriers.', 'Look back toward the gardens for a wider architectural perspective.', 'Continue toward the Silver Pagoda precinct if it is open.'], photo: 'Use the central courtyard axis for a symmetrical facade; a slightly oblique angle reveals the depth of the roof tiers.', duration: '15–25 minutes for permitted exterior areas.', transport: 'Enter the Royal Palace visitor circuit from Sothearos Boulevard; the hall is within the secure palace grounds.' },
    zh: { features: '典礼平台、层层叠起的屋顶与高耸中央塔尖构成王宫庭院的视觉中心。可比较正立面与邻近殿宇的屋脊线条。', route: ['从游客入口进入，先确认当日开放动线。', '沿允许路线接近王座大厅庭院，不跨越围栏。', '回望花园，观察建筑整体比例。', '若开放，再继续前往银阁寺区域。'], photo: '在庭院轴线上拍摄对称正面；稍微侧移可表现屋顶的层次与纵深。', duration: '开放外部区域约15–25分钟。', transport: '从索特罗斯大道（Sothearos Boulevard）的王宫游客入口进入，王座大厅位于宫内管理区域。' },
    km: { features: 'វេទិកាព្រះរាជពិធី ដំបូលជាន់ៗ និងកំពូលខ្ពស់ធ្វើឱ្យព្រះទីនាំងក្លាយជាចំណុចសំខាន់ក្នុងទីធ្លា។ សង្កេតផ្នែកខាងមុខ និងដំបូលសំណង់ជិតខាង។', route: ['ចូលតាមច្រកភ្ញៀវ ហើយពិនិត្យផ្លូវអនុញ្ញាត។', 'ដើរទៅទីធ្លាព្រះទីនាំងដោយមិនឆ្លងរបាំង។', 'មើលពីសួនច្បារដើម្បីឃើញទម្រង់សំណង់ទាំងមូល។', 'បន្តទៅវត្តព្រះកែវមរកត ប្រសិនបើបើក។'], photo: 'ថតពីអ័ក្សកណ្ដាលទីធ្លា ឬមុំចំហៀងបន្តិចដើម្បីឃើញជាន់ដំបូល។', duration: 'ប្រហែល ១៥–២៥ នាទីសម្រាប់តំបន់ខាងក្រៅ។', transport: 'ចូលតាមច្រកភ្ញៀវនៅមហាវិថីព្រះសុធារស។ ព្រះទីនាំងស្ថិតក្នុងបរិវេណព្រះបរមរាជវាំង។' },
  },
  'moonlight-pavilion': {
    en: { features: 'The open-fronted pavilion faces the public side of the palace boundary and is linked to traditional royal dance performances. Observe its raised stage-like composition and roof details.', route: ['Begin outside the palace boundary near Sothearos Boulevard.', 'Find an unobstructed public view of the pavilion facade.', 'Observe the roofline and how the pavilion relates to the surrounding walls.', 'If visiting the palace itself, continue to the designated visitor entrance.'], photo: 'Choose a public viewpoint that includes the full roof and open frontage. Avoid stopping in moving traffic.', duration: '10–20 minutes for an exterior stop.', transport: 'The pavilion is near the eastern palace boundary facing the public area; do not confuse exterior viewpoints with the palace admission gate.' },
    zh: { features: '这座面向王宫外围的开放式亭阁与传统宫廷舞蹈演出有关。值得观察其如舞台般的空间、敞开的正面与屋顶装饰。', route: ['先到索特罗斯大道附近的王宫围墙外。', '选择不妨碍通行的公共观景位置。', '观察亭阁屋顶与王宫围墙之间的关系。', '如需进入王宫，再前往正式游客入口。'], photo: '从公共区域取景，尽量纳入完整屋顶和开放式立面；不要为摄影停留在车道上。', duration: '外部观赏约10–20分钟。', transport: '月光亭靠近王宫东侧外围，外观观赏位置与王宫正式购票入口不是同一地点。' },
    km: { features: 'ព្រះទីនាំងបើកមុខទៅតំបន់សាធារណៈ និងពាក់ព័ន្ធនឹងរបាំព្រះរាជទ្រព្យ។ សង្កេតទម្រង់ដូចឆាក និងលម្អដំបូល។', route: ['ចាប់ផ្ដើមពីតំបន់សាធារណៈជិតមហាវិថីព្រះសុធារស។', 'ជ្រើសរើសកន្លែងដែលអាចមើលឃើញមុខព្រះទីនាំងច្បាស់។', 'សង្កេតដំបូល និងជញ្ជាំងជុំវិញ។', 'បើចង់ចូលវាំង សូមទៅច្រកភ្ញៀវផ្លូវការ។'], photo: 'ថតពីតំបន់សាធារណៈដោយបញ្ចូលដំបូល និងផ្នែកខាងមុខទាំងមូល មិនឈរនៅលើផ្លូវចរាចរណ៍។', duration: 'ប្រហែល ១០–២០ នាទីពីខាងក្រៅ។', transport: 'ព្រះទីនាំងនៅជិតព្រំខាងកើតនៃវាំង។ កន្លែងមើលពីក្រៅមិនមែនច្រកចូលទិញសំបុត្រទេ។' },
  },
  'royal-palace-history': {
    en: { features: 'The nineteenth-century palace ensemble incorporates traditional Khmer roof forms and ceremonial courtyards. The Silver Pagoda and royal stupas add Buddhist and dynastic layers to the site.', route: ['Orient yourself at the palace visitor map.', 'Study the Throne Hall and the axis of its courtyard.', 'Move to the Silver Pagoda precinct when open.', 'Compare the stupas, cloister murals and later restoration details.'], photo: 'Pair a wide shot of rooflines with close observations of stupas and mural details, only where photography is permitted.', duration: '45–75 minutes for a history-focused circuit.', transport: 'The heritage complex stands on Sothearos Boulevard in central Phnom Penh, near the National Museum.' },
    zh: { features: '19世纪以来的王宫建筑群保留传统高棉屋顶与典礼庭院格局，银阁寺、王室佛塔又为这里增添佛教及王朝历史层次。', route: ['先看游客导览图，了解建筑分布。', '观察王座大厅与庭院中轴。', '开放时进入银阁寺区域。', '比较佛塔、壁画与不同年代的修复细节。'], photo: '可结合建筑屋顶全景、佛塔及允许拍摄的壁画细节，表现历史层次。', duration: '历史主题游览约45–75分钟。', transport: '王宫位于金边市中心索特罗斯大道，靠近柬埔寨国家博物馆。' },
    km: { features: 'សំណង់ចាប់ពីសតវត្សទី១៩ មានដំបូលបែបខ្មែរ និងទីធ្លាព្រះរាជពិធី។ វត្តព្រះកែវមរកត និងចេតិយបន្ថែមប្រវត្តិសាស្ត្រព្រះពុទ្ធសាសនា។', route: ['មើលផែនទីភ្ញៀវជាមុន។', 'សង្កេតព្រះទីនាំង និងទីធ្លាកណ្ដាល។', 'ទៅវត្តព្រះកែវមរកតនៅពេលបើក។', 'ប្រៀបធៀបចេតិយ គំនូរជញ្ជាំង និងស្នាដៃជួសជុល។'], photo: 'ថតទិដ្ឋភាពដំបូលទូលាយ និងលម្អចេតិយនៅកន្លែងដែលអនុញ្ញាត។', duration: 'ប្រហែល ៤៥–៧៥ នាទីសម្រាប់ប្រវត្តិសាស្ត្រ។', transport: 'ព្រះបរមរាជវាំងស្ថិតលើមហាវិថីព្រះសុធារស ជិតសារមន្ទីរជាតិ។' },
  },
  'palace-walking-route': {
    en: { features: 'The visitor circuit brings together ceremonial halls, landscaped courts and the Silver Pagoda precinct. The order is a planning aid rather than a guaranteed one-way route.', route: ['Check the ticket window, dress code and current visitor entrance.', 'Spend 15–25 minutes viewing the Throne Hall and garden.', 'Allocate 25–35 minutes for the Silver Pagoda precinct and murals.', 'Allow a final 10–20 minutes for exhibits, shade and departure.'], photo: 'For a varied set, photograph the hall exterior, garden paths and any mural sections clearly marked as photographable.', duration: 'About 60–90 minutes, depending on access and pace.', transport: 'Use the official visitor entrance on Sothearos Boulevard. Nearby central Phnom Penh destinations can be reached by walking or local transport.' },
    zh: { features: '游客动线可串联典礼建筑、花园庭院和银阁寺区域。以下顺序用于行前规划，并不代表官方单向线路。', route: ['先核实票务窗口、着装规范与当日游客入口。', '在王座大厅及庭院停留15–25分钟。', '为银阁寺及壁画区域安排25–35分钟。', '最后预留10–20分钟参观开放展区、休息和离园。'], photo: '可分别拍摄大厅外观、庭院小径与允许摄影的壁画局部，使照片具有变化。', duration: '约60–90分钟，视开放情况与个人步速调整。', transport: '以索特罗斯大道的官方游客入口为起点；附近市中心景点可步行或搭乘当地交通工具前往。' },
    km: { features: 'ផ្លូវទស្សនាអាចភ្ជាប់ព្រះទីនាំង ទីធ្លាសួនច្បារ និងវត្តព្រះកែវមរកត។ លំដាប់នេះជាជំនួយរៀបចំ មិនមែនផ្លូវផ្លូវការថេរទេ។', route: ['ពិនិត្យសំបុត្រ សម្លៀកបំពាក់ និងច្រកចូល។', 'ទុកពេល ១៥–២៥ នាទីមើលព្រះទីនាំង និងសួន។', 'ទុកពេល ២៥–៣៥ នាទីសម្រាប់វត្តព្រះកែវមរកត និងគំនូរ។', 'ទុកពេល ១០–២០ នាទីចុងក្រោយសម្រាប់សម្រាក និងចេញ។'], photo: 'ថតរូបព្រះទីនាំង សួន និងគំនូរដែលអនុញ្ញាត ដើម្បីបានទិដ្ឋភាពចម្រុះ។', duration: 'ប្រហែល ៦០–៩០ នាទី អាស្រ័យលើការបើក និងល្បឿនដើរ។', transport: 'ចាប់ផ្ដើមពីច្រកភ្ញៀវផ្លូវការលើមហាវិថីព្រះសុធារស។' },
  },
  'royal-palace-photography': {
    en: { features: 'Layered Khmer roofs, gilded gables, gardens and courtyard symmetry offer distinct compositions. Photography rules vary across exterior and interior spaces.', route: ['Check camera restrictions at the entrance.', 'Start with a wide exterior frame of the Throne Hall.', 'Move to a permitted garden angle for depth and foreground.', 'Capture architectural details outdoors, respecting barriers and visitors.'], photo: 'Look for clear foregrounds, a level horizon and soft side lighting. Do not photograph sacred interiors unless explicitly allowed.', duration: '30–60 minutes for a slow outdoor photo walk.', transport: 'Start at the palace visitor entrance; any public exterior viewpoint should be reached on designated pedestrian routes.' },
    zh: { features: '层叠高棉屋顶、金色山墙、花园与庭院对称构图各具特色；室外和室内的摄影规定可能不同。', route: ['入场先查看摄影限制。', '从王座大厅正面拍摄宽幅建筑全景。', '在允许的花园位置加入树木或步道作前景。', '继续拍摄室外建筑细节，不跨越围栏、不妨碍他人。'], photo: '留意整洁前景、水平线与柔和侧光；宗教建筑内部未经明确允许不要拍摄。', duration: '慢速室外摄影约30–60分钟。', transport: '从王宫游客入口开始，前往外围公共机位应遵循行人通道。' },
    km: { features: 'ដំបូលខ្មែរជាន់ៗ លម្អពណ៌មាស សួន និងទីធ្លាសមមាត្រផ្ដល់មុំថតខុសៗគ្នា។ ច្បាប់ថតរូបខាងក្រៅ និងខាងក្នុងអាចខុសគ្នា។', route: ['ពិនិត្យច្បាប់ថតរូបនៅច្រកចូល។', 'ចាប់ផ្ដើមពីទិដ្ឋភាពទូលាយមុខព្រះទីនាំង។', 'រកមុំសួនដែលអនុញ្ញាតដើម្បីបានផ្ទៃមុខរូប។', 'ថតលម្អខាងក្រៅដោយមិនឆ្លងរបាំង ឬរំខានអ្នកដទៃ។'], photo: 'រកផ្ទៃមុខស្អាត និងពន្លឺពីចំហៀង។ កុំថតខាងក្នុងទីសក្ការៈ បើគ្មានការអនុញ្ញាតច្បាស់។', duration: 'ប្រហែល ៣០–៦០ នាទីសម្រាប់ដើរថតខាងក្រៅ។', transport: 'ចាប់ផ្ដើមពីច្រកភ្ញៀវ ហើយប្រើផ្លូវអ្នកថ្មើរជើងសម្រាប់មុំថតខាងក្រៅ។' },
  },
};

export function topicDetails(lang: string, slug: string) { return extra[slug]?.[(lang in localized ? lang : 'en') as Locale]; }
