(() => {
"use strict";
// ==========================================
// CẤU HÌNH 12 CHỦ ĐỀ CHÍNH & MA TRẬN KỸ NĂNG C1-C6
// ==========================================
const TOPICS_CONFIG = [
    { id: 1, title: "1. Ngôi nhà chữ Việt", desc: "Bảng chữ cái Việt Nam và quy ước viết hoa đầu câu, tên người, địa danh", icon: "🏠", color: "pink" },
    { id: 2, title: "2. Hiệp sĩ âm đầu", desc: "ch/tr, s/x, l/n, r/d/gi và quy tắc c/k, g/gh, ng/ngh", icon: "⚔️", color: "rose" },
    { id: 3, title: "3. Vương quốc vần & dấu", desc: "Âm cuối dễ lẫn, vần phức hợp và dấu hỏi/ngã", icon: "🔮", color: "purple" },
    { id: 4, title: "4. Kho báu từ vựng", desc: "Vốn từ và nghĩa từ theo các chủ điểm gần gũi", icon: "💰", color: "amber" },
    { id: 5, title: "5. Khu vườn từ loại", desc: "Từ chỉ sự vật, hoạt động/trạng thái và đặc điểm", icon: "🌳", color: "emerald" },
    { id: 6, title: "6. Kỹ sư ghép câu", desc: "Dấu câu, tạo câu và sắp xếp đoạn ngắn hợp lí", icon: "🖊️", color: "cyan" },
    { id: 7, title: "7. Thế giới câu hay", desc: "Câu giới thiệu, câu nêu hoạt động và câu nêu đặc điểm", icon: "💬", color: "indigo" },
    { id: 8, title: "8. Đại sứ giao tiếp", desc: "Lời nói/lời đáp, tin nhắn, thư ngắn, bưu thiếp và bảng biểu", icon: "🤝", color: "sky" },
    { id: 9, title: "9. Nhà thông thái nhỏ", desc: "Đọc hiểu thơ, truyện, văn bản thông tin và suy luận", icon: "📖", color: "fuchsia" },
    { id: 10, title: "10. Trí tuệ Trạng Nguyên", desc: "Câu đố, suy luận bằng lời và trò chơi ngôn ngữ tăng hứng thú", icon: "🧩", color: "yellow" },
    { id: 11, title: "11. Đố vui bé ngoan", desc: "300 câu đố thơ lục bát qua 5 thế giới; mục 6 là Câu đố tổng hợp", icon: "📜", color: "violet" },
    { id: 12, title: "12. Truyện dân gian & cổ tích", desc: "240 truyện Việt Nam & thế giới", icon: "📚", color: "fuchsia", isStoryLibrary: true }
];

const SUBTOPIC_PALETTES = [
    { card: "bg-pink-50/80 hover:bg-pink-100 border-pink-300 text-pink-800", num: "text-pink-600", badge: "bg-white text-pink-600 border-pink-200" },
    { card: "bg-emerald-50/80 hover:bg-emerald-100 border-emerald-300 text-emerald-800", num: "text-emerald-600", badge: "bg-white text-emerald-600 border-emerald-200" },
    { card: "bg-purple-50/80 hover:bg-purple-100 border-purple-300 text-purple-800", num: "text-purple-600", badge: "bg-white text-purple-600 border-purple-200" },
    { card: "bg-amber-50/80 hover:bg-amber-100 border-amber-300 text-amber-800", num: "text-amber-600", badge: "bg-white text-amber-600 border-amber-200" },
    { card: "bg-sky-50/80 hover:bg-sky-100 border-sky-300 text-sky-800", num: "text-sky-600", badge: "bg-white text-sky-600 border-sky-200" },
    { card: "bg-rose-50/80 hover:bg-rose-100 border-rose-300 text-rose-800", num: "text-rose-600", badge: "bg-white text-rose-600 border-rose-200" }
];

const TOPIC_TO_SKILL = {
    1:'C1', 2:'C1', 3:'C1', 4:'C2', 5:'C3', 6:'C4',
    7:'C4', 8:'C2', 9:'C5', 10:'C6', 11:'C6', 12:'C5'
};

const examFileMap = {
    hocky1: { file: 'de_thi_tieng_viet_2.json', sheet: 'LichSuBaiThi_HK1', label: 'Học kỳ 1', color: 'pink' },
    hocky2: { file: 'de_thi_tieng_viet_2.json', sheet: 'LichSuBaiThi_HK2', label: 'Học kỳ 2', color: 'purple' },
    hsg:    { file: 'de_thi_tieng_viet_2.json', sheet: 'LichSuBaiThi_HSG', label: 'Học sinh giỏi', color: 'amber' }
};

const SKILL_TAXONOMY = {
    C1: { code: 'C1', sheetCol: 'TV_C1_Dung', totalCol: 'TV_C1_Tong', name: 'Chính tả & Âm - Vần', advice: 'Ôn theo ba tầng: chữ/viết hoa → âm đầu → vần, âm cuối và dấu thanh.' },
    C2: { code: 'C2', sheetCol: 'TV_C2_Dung', totalCol: 'TV_C2_Tong', name: 'Từ vựng & Giao tiếp / Nói - nghe', advice: 'Mở rộng vốn từ theo chủ điểm và luyện lời nói, lời đáp, tin nhắn, thư/bưu thiếp, bảng biểu đơn giản.' },
    C3: { code: 'C3', sheetCol: 'TV_C3_Dung', totalCol: 'TV_C3_Tong', name: 'Từ chỉ sự vật - hoạt động - đặc điểm', advice: 'Luyện nhận diện và sử dụng từ chỉ sự vật, hoạt động/trạng thái và đặc điểm theo ngôn ngữ lớp 2.' },
    C4: { code: 'C4', sheetCol: 'TV_C4_Dung', totalCol: 'TV_C4_Tong', name: 'Câu, Dấu câu & Tạo lập văn bản ngắn', advice: 'Luyện dấu câu, câu giới thiệu/câu nêu hoạt động/câu nêu đặc điểm và sắp xếp câu thành đoạn ngắn.' },
    C5: { code: 'C5', sheetCol: 'TV_C5_Dung', totalCol: 'TV_C5_Tong', name: 'Đọc hiểu & Phản hồi văn bản', advice: 'Luyện tìm chi tiết, hiểu nội dung, trình tự, nghĩa từ trong ngữ cảnh và suy luận đơn giản từ văn bản.' },
    C6: { code: 'C6', sheetCol: 'TV_C6_Dung', totalCol: 'TV_C6_Tong', name: 'Tư duy ngôn ngữ', advice: 'Câu đố, từ lạc nhóm, đố chữ và suy luận bằng manh mối ngôn ngữ giúp phát triển tư duy.' }
};

const GREETINGS_STUDENT = [
    "Chào {name}, cô Thỏ Ngọc chúc con có một buổi học thật vui và đạt điểm mười nhé!",
    "Chào mừng {name} đã quay trở lại! Hôm nay chúng mình cùng tự tin bứt phá nhé!",
    "Cô Thỏ Ngọc chào {name}, chúc bé yêu học giỏi, chăm ngoan và giành thật nhiều sao!",
    "Chào con yêu {name}, hãy cùng cô Thỏ Ngọc khám phá những bài học kì diệu hôm nay nhé!",
    "Chào mừng {name} đến với buổi học! Chúc con làm bài thật xuất sắc và tràn ngập niềm vui!"
];

const GREETINGS_GUEST = [
    "Chào bé yêu, cô Thỏ Ngọc chúc con có một buổi học thử thật vui và bổ ích!",
    "Chào mừng bé đến với lớp học Tiếng Việt của cô Thỏ Ngọc! Chúc bé học thật giỏi nhé!",
    "Cô Thỏ Ngọc chào bé yêu! Chúng mình cùng nhau khám phá những bài học kì diệu nào!",
    "Chào thiên thần nhỏ! Hãy cùng cô Thỏ Ngọc chinh phục các câu hỏi thật xuất sắc nhé!",
    "Chào mừng con đến với Đấu trường học tập! Chúc con học thật vui và say mê nhé!"
];

// DỮ LIỆU BẢNG CHỮ CÁI TƯƠNG TÁC (1.1, 1.2, 1.3, 1.4)
const ALPHABET_29_DETAILS = [
    { u:'A', l:'a', hw:'A', sound:'a', name:'Chữ A', group:'nguyen_am_don', examples:[{w:'Quả na', emo:'🍈', tag:'Danh từ', sent:'Quả na mở mắt đón xuân'},{w:'Con cá', emo:'🐟', tag:'Danh từ', sent:'Con cá bơi lội tung tăng'},{w:'Cái ca', emo:'🥛', tag:'Đồ vật', sent:'Cái ca nước uống của bé'}] },
    { u:'Ă', l:'ă', hw:'Ă', sound:'á', name:'Chữ Á', group:'nguyen_am_don', examples:[{w:'Mặt trăng', emo:'🌙', tag:'Thiên nhiên', sent:'Mặt trăng khuyết sáng ngời'},{w:'Khăn mặt', emo:'🧣', tag:'Đồ vật', sent:'Bé rửa mặt bằng khăn sạch'},{w:'Búp măng', emo:'🎋', tag:'Cây cối', sent:'Búp măng non mọc thẳng'}] },
    { u:'Â', l:'â', hw:'Â', sound:'ớ', name:'Chữ Ớ', group:'nguyen_am_don', examples:[{w:'Cây nấm', emo:'🍄', tag:'Cây cối', sent:'Cây nấm rơm nhỏ bé'},{w:'Cái ấm', emo:'🫖', tag:'Đồ vật', sent:'Cái ấm pha trà nóng'},{w:'Gấu trúc', emo:'🐼', tag:'Động vật', sent:'Gấu trúc thích ăn lá trúc'}] },
    { u:'B', l:'b', hw:'B', sound:'bờ', name:'Chữ Bờ', group:'phu_am', examples:[{w:'Con bò', emo:'🐄', tag:'Động vật', sent:'Con bò gặm cỏ trên đồi'},{w:'Quả bóng', emo:'⚽', tag:'Đồ chơi', sent:'Quả bóng tròn lăn trên sân'},{w:'Búp bê', emo:'🧸', tag:'Đồ chơi', sent:'Búp bê của bé rất xinh'}] },
    { u:'C', l:'c', hw:'C', sound:'cờ', name:'Chữ Cờ', group:'phu_am', examples:[{w:'Con cò', emo:'🦩', tag:'Loài chim', sent:'Con cò bay lả bay la'},{w:'Quả cam', emo:'🍊', tag:'Trái cây', sent:'Quả cam nhiều vitamin C'},{w:'Lá cờ', emo:'🚩', tag:'Đồ vật', sent:'Lá cờ đỏ sao vàng'}] },
    { u:'CH', l:'ch', hw:'Ch', sound:'chờ', name:'Chữ Chờ', group:'phu_am_ghep', examples:[{w:'Chú chó', emo:'🐶', tag:'Động vật', sent:'Chú chó trông nhà rất ngoan'},{w:'Cái chổi', emo:'🧹', tag:'Đồ vật', sent:'Cái chổi quét nhà sạch tinh'},{w:'Chùm khế', emo:'⭐', tag:'Trái cây', sent:'Chùm khế ngọt trĩu cành'}] },
    { u:'D', l:'d', hw:'D', sound:'dờ', name:'Chữ Dờ', group:'phu_am', examples:[{w:'Con dê', emo:'🐐', tag:'Động vật', sent:'Con dê kêu be be'},{w:'Quả dừa', emo:'🥥', tag:'Trái cây', sent:'Quả dừa ngọt mát trưa hè'},{w:'Quả dâu', emo:'🍓', tag:'Trái cây', sent:'Quả dâu tây đỏ mọng'}] },
    { u:'Đ', l:'đ', hw:'Đ', sound:'đờ', name:'Chữ Đờ', group:'phu_am', examples:[{w:'Đu đủ', emo:'🥭', tag:'Trái cây', sent:'Quả đu đủ chín vàng'},{w:'Đồng hồ', emo:'⏰', tag:'Đồ vật', sent:'Đồng hồ tích tắc đếm giờ'},{w:'Đoàn tàu', emo:'🚂', tag:'Phương tiện', sent:'Đoàn tàu chạy xình xịch'}] },
    { u:'E', l:'e', hw:'E', sound:'e', name:'Chữ E', group:'nguyen_am_don', examples:[{w:'Con ve', emo:'🦗', tag:'Côn trùng', sent:'Tiếng ve kêu râm ran hè về'},{w:'Chiếc xe', emo:'🚗', tag:'Phương tiện', sent:'Xe ô tô chạy bon bon'},{w:'Que kem', emo:'🍦', tag:'Món ăn', sent:'Que kem mát lạnh ngọt bùi'}] },
    { u:'Ê', l:'ê', hw:'Ê', sound:'ê', name:'Chữ Ê', group:'nguyen_am_don', examples:[{w:'Con bê', emo:'🐮', tag:'Động vật', sent:'Chú bê con lon ton theo mẹ'},{w:'Quả lê', emo:'🍐', tag:'Trái cây', sent:'Quả lê giòn ngọt mát'},{w:'Cái ghế', emo:'🪑', tag:'Đồ vật', sent:'Cái ghế gỗ của em ngồi học'}] },
    { u:'G', l:'g', hw:'G', sound:'gờ', name:'Chữ Gờ', group:'phu_am', examples:[{w:'Con gà', emo:'🐔', tag:'Vật nuôi', sent:'Con gà trống gáy ò ó o'},{w:'Quả gấc', emo:'🍈', tag:'Trái cây', sent:'Quả gấc đỏ dùng nấu xôi'},{w:'Cái gối', emo:'🛌', tag:'Đồ dùng', sent:'Cái gối êm ái bé nằm ngủ'}] },
    { u:'GH', l:'gh', hw:'Gh', sound:'ghờ', name:'Chữ Ghờ', group:'phu_am_ghep', examples:[{w:'Ghế gỗ', emo:'🪑', tag:'Đồ vật', sent:'Cái ghế gỗ chắc chắn'},{w:'Ghép hình', emo:'🧩', tag:'Trò chơi', sent:'Bé thích chơi ghép hình'},{w:'Ghi nhớ', emo:'📝', tag:'Học tập', sent:'Bé ghi nhớ lời cô dạy'}] },
    { u:'GI', l:'gi', hw:'Gi', sound:'giờ', name:'Chữ Giờ', group:'phu_am_ghep', examples:[{w:'Cây gió', emo:'🌳', tag:'Thực vật', sent:'Cây gió thổi vi vu'},{w:'Giỏ quà', emo:'🎁', tag:'Đồ vật', sent:'Giỏ quà Tết xinh xắn'},{w:'Giọt nước', emo:'💧', tag:'Thiên nhiên', sent:'Giọt nước trong veo'}] },
    { u:'H', l:'h', hw:'H', sound:'hờ', name:'Chữ Hờ', group:'phu_am', examples:[{w:'Bông hoa', emo:'🌸', tag:'Thực vật', sent:'Bông hoa hồng nở rực rỡ'},{w:'Con hổ', emo:'🐯', tag:'Động vật hoang dã', sent:'Chúa sơn lâm con hổ dũng mãnh'},{w:'Chú hươu', emo:'🦌', tag:'Động vật', sent:'Chú hươu sao hiền lành'}] },
    { u:'I', l:'i', hw:'I', sound:'i', name:'Chữ I ngắn', group:'nguyen_am_don', examples:[{w:'Hòn bi', emo:'🔮', tag:'Đồ chơi', sent:'Hòn bi ve tròn xoe lấp lánh'},{w:'Quả bí', emo:'🎃', tag:'Rau củ', sent:'Quả bí đỏ nấu canh rất ngọt'},{w:'Cây kim', emo:'🪡', tag:'Đồ dùng', sent:'Cây kim khâu quần áo'}] },
    { u:'K', l:'k', hw:'K', sound:'ca', name:'Chữ Ca', group:'phu_am', examples:[{w:'Cái kéo', emo:'✂️', tag:'Đồ dùng', sent:'Cái kéo cắt giấy thủ công'},{w:'Cái kính', emo:'👓', tag:'Đồ dùng', sent:'Cặp kính mắt tròn xoe'},{w:'Kì lân', emo:'🦄', tag:'Con vật', sent:'Chú kì lân bảy sắc diệu kì'}] },
    { u:'KH', l:'kh', hw:'Kh', sound:'khờ', name:'Chữ Khờ', group:'phu_am_ghep', examples:[{w:'Cái khiên', emo:'🛡️', tag:'Đồ vật', sent:'Cái khiên bảo vệ'},{w:'Cây khế', emo:'⭐', tag:'Cây cối', sent:'Cây khế ngọt trĩu quả'},{w:'Con khỉ', emo:'🐵', tag:'Động vật', sent:'Con khỉ leo trèo nhanh'}] },
    { u:'L', l:'l', hw:'L', sound:'lờ', name:'Chữ Lờ cao', group:'phu_am', examples:[{w:'Chiếc lá', emo:'🍃', tag:'Thực vật', sent:'Chiếc lá xanh đung đưa trong gió'},{w:'Hoa lan', emo:'💐', tag:'Loài hoa', sent:'Hoa phong lan thơm ngát'},{w:'Con lợn', emo:'🐷', tag:'Vật nuôi', sent:'Chú lợn con ủn ỉn ăn no'}] },
    { u:'M', l:'m', hw:'M', sound:'mờ', name:'Chữ Mờ', group:'phu_am', examples:[{w:'Con mèo', emo:'🐱', tag:'Vật nuôi', sent:'Con mèo mướp bắt chuột tài'},{w:'Quả mít', emo:'🍈', tag:'Trái cây', sent:'Quả mít chín thơm lừng cả nhà'},{w:'Cái mũ', emo:'👒', tag:'Trang phục', sent:'Cái mũ rộng vành che nắng'}] },
    { u:'N', l:'n', hw:'N', sound:'nờ', name:'Chữ Nờ thấp', group:'phu_am', examples:[{w:'Cái nơ', emo:'🎀', tag:'Phụ kiện', sent:'Cái nơ hồng bé cài trên tóc'},{w:'Quả na', emo:'🍈', tag:'Trái cây', sent:'Quả na chín ngọt ngào'},{w:'Nụ hoa', emo:'🌷', tag:'Thực vật', sent:'Nụ hoa hồng hé nở ban mai'}] },
    { u:'NG', l:'ng', hw:'Ng', sound:'ngờ', name:'Chữ Ngờ đơn', group:'phu_am_ghep', examples:[{w:'Ngôi nhà', emo:'🏡', tag:'Kiến trúc', sent:'Ngôi nhà ấm cúng'},{w:'Ngọn lửa', emo:'🔥', tag:'Thiên nhiên', sent:'Ngọn lửa bập bùng'},{w:'Con ngựa', emo:'🐴', tag:'Động vật', sent:'Con ngựa phi nước đại'}] },
    { u:'NGH', l:'ngh', hw:'Ngh', sound:'ngờ', name:'Chữ Ngờ kép', group:'phu_am_ghep', examples:[{w:'Nghỉ ngơi', emo:'🛋️', tag:'Hoạt động', sent:'Bé nghỉ ngơi buổi trưa'},{w:'Suy nghĩ', emo:'🤔', tag:'Tư duy', sent:'Bé suy nghĩ tìm đáp án'},{w:'Con nghé', emo:'🐃', tag:'Động vật', sent:'Con nghé con theo mẹ'}] },
    { u:'NH', l:'nh', hw:'Nh', sound:'nhờ', name:'Chữ Nhờ', group:'phu_am_ghep', examples:[{w:'Nhà sàn', emo:'🏠', tag:'Kiến trúc', sent:'Nhà sàn bản làng'},{w:'Quả nhãn', emo:'🍈', tag:'Trái cây', sent:'Quả nhãn ngọt lịm'},{w:'Con nhện', emo:'🕷️', tag:'Côn trùng', sent:'Con nhện chăng tơ'}] },
    { u:'O', l:'o', hw:'O', sound:'o', name:'Chữ O tròn', group:'nguyen_am_don', examples:[{w:'Con ong', emo:'🐝', tag:'Côn trùng', sent:'Con ong chăm chỉ hút mật hoa'},{w:'Con bò', emo:'🐄', tag:'Vật nuôi', sent:'Con bò sữa hiền lành ăn cỏ'},{w:'Con thỏ', emo:'🐰', tag:'Động vật', sent:'Chú thỏ trắng có đôi tai dài'}] },
    { u:'Ô', l:'ô', hw:'Ô', sound:'ô', name:'Chữ Ô đội mũ', group:'nguyen_am_don', examples:[{w:'Cái ô', emo:'☂️', tag:'Đồ dùng', sent:'Chiếc ô xinh che mưa che nắng'},{w:'Cái xô', emo:'🪣', tag:'Đồ dùng', sent:'Cái xô nhựa xách nước tưới cây'},{w:'Bắp ngô', emo:'🌽', tag:'Nông sản', sent:'Bắp ngô vàng ngọt bùi thơm'}] },
    { u:'Ơ', l:'ơ', hw:'Ơ', sound:'ơ', name:'Chữ Ơ có râu', group:'nguyen_am_don', examples:[{w:'Quả mơ', emo:'🍑', tag:'Trái cây', sent:'Quả mơ chín ngâm đường uống mát'},{w:'Lá cờ', emo:'🚩', tag:'Biểu tượng', sent:'Lá cờ đỏ thắm phấp phới bay'},{w:'Cái nơ', emo:'🎀', tag:'Phụ kiện', sent:'Cái nơ xinh xắn của em'}] },
    { u:'P', l:'p', hw:'P', sound:'pờ', name:'Chữ Pờ', group:'phu_am', examples:[{w:'Đèn pin', emo:'🔦', tag:'Đồ vật', sent:'Cây đèn pin chiếu sáng trong đêm'},{w:'Bát phở', emo:'🍜', tag:'Món ăn', sent:'Bát phở bò nóng hổi thơm ngon'},{w:'Hoa phượng', emo:'🌺', tag:'Loài hoa', sent:'Hoa phượng nở đỏ rực sân trường'}] },
    { u:'PH', l:'ph', hw:'Ph', sound:'phờ', name:'Chữ Phờ', group:'phu_am_ghep', examples:[{w:'Phố cổ', emo:'🏮', tag:'Địa danh', sent:'Phố cổ rực rỡ đèn lồng'},{w:'Phút giây', emo:'⏱️', tag:'Thời gian', sent:'Phút giây vui vẻ bên bạn'},{w:'Phở bò', emo:'🍜', tag:'Món ăn', sent:'Bát phở bò thơm ngon'}] },
    { u:'Q', l:'q', hw:'Q', sound:'quy', name:'Chữ Quy', group:'phu_am', examples:[{w:'Quả quýt', emo:'🍊', tag:'Trái cây', sent:'Quả quýt mọng nước chua ngọt'},{w:'Hộp quà', emo:'🎁', tag:'Đồ vật', sent:'Hộp quà sinh nhật thắt nơ xinh'},{w:'Cái quạt', emo:'🪭', tag:'Đồ dùng', sent:'Cái quạt nan xua tan cơn nóng'}] },
    { u:'QU', l:'qu', hw:'Qu', sound:'quờ', name:'Chữ Quờ', group:'phu_am_ghep', examples:[{w:'Quả quất', emo:'🍊', tag:'Trái cây', sent:'Cây quất trĩu quả vàng'},{w:'Quyển vở', emo:'📓', tag:'Học tập', sent:'Quyển vở sạch chữ đẹp'},{w:'Quân kì', emo:'🚩', tag:'Biểu tượng', sent:'Lá quân kì tung bay'}] },
    { u:'R', l:'r', hw:'R', sound:'rờ', name:'Chữ Rờ rung', group:'phu_am', examples:[{w:'Con rùa', emo:'🐢', tag:'Bò sát', sent:'Con rùa bò chậm mang mai cứng'},{w:'Rừng cây', emo:'🌲', tag:'Thiên nhiên', sent:'Rừng cây xanh mát bao la'},{w:'Con rắn', emo:'🐍', tag:'Động vật hoang dã', sent:'Con rắn lục bò trên cành cây'}] },
    { u:'S', l:'s', hw:'S', sound:'sờ', name:'Chữ Sờ cong', group:'phu_am', examples:[{w:'Ngôi sao', emo:'⭐', tag:'Vũ trụ', sent:'Ngôi sao lấp lánh trên trời đêm'},{w:'Hoa sen', emo:'🪷', tag:'Loài hoa', sent:'Hoa sen thanh tao tỏa ngát hương'},{w:'Sư tử', emo:'🦁', tag:'Chúa sơn lâm', sent:'Sư tử dũng mãnh bảo vệ rừng xanh'}] },
    { u:'T', l:'t', hw:'T', sound:'tờ', name:'Chữ Tờ', group:'phu_am', examples:[{w:'Quả táo', emo:'🍎', tag:'Trái cây', sent:'Quả táo đỏ ngọt lành thơm ngon'},{w:'Con tôm', emo:'🦐', tag:'Thủy sản', sent:'Con tôm búng càng tanh tách'},{w:'Thước kẻ', emo:'📏', tag:'Học tập', sent:'Cây thước kẻ thẳng tắp trong cặp'}] },
    { u:'TH', l:'th', hw:'Th', sound:'thờ', name:'Chữ Thờ', group:'phu_am_ghep', examples:[{w:'Thuyền nan', emo:'⛵', tag:'Phương tiện', sent:'Thuyền nan trôi trên sông'},{w:'Thầy giáo', emo:'👨‍🏫', tag:'Nghề nghiệp', sent:'Thầy giáo tận tụy'},{w:'Thước kẻ', emo:'📏', tag:'Đồ dùng', sent:'Cây thước kẻ thẳng'}] },
    { u:'TR', l:'tr', hw:'Tr', sound:'trờ', name:'Chữ Trờ', group:'phu_am_ghep', examples:[{w:'Trường học', emo:'🏫', tag:'Kiến trúc', sent:'Trường học thân yêu'},{w:'Trăng sáng', emo:'🌙', tag:'Thiên nhiên', sent:'Trăng sáng rọi qua cây'},{w:'Trái cây', emo:'🍎', tag:'Thực phẩm', sent:'Trái cây tươi ngon'}] },
    { u:'U', l:'u', hw:'U', sound:'u', name:'Chữ U', group:'nguyen_am_don', examples:[{w:'Con cú', emo:'🦉', tag:'Loài chim', sent:'Chú cú mèo thức ban đêm'},{w:'Mũ len', emo:'🧢', tag:'Trang phục', sent:'Mũ len giữ ấm mùa đông'},{w:'Quả đu đủ', emo:'🥭', tag:'Trái cây', sent:'Quả đu đủ ngọt mát bổ dưỡng'}] },
    { u:'Ư', l:'ư', hw:'Ư', sound:'ư', name:'Chữ Ư có râu', group:'nguyen_am_don', examples:[{w:'Sư tử', emo:'🦁', tag:'Động vật', sent:'Sư tử có chiếc bờm to lớn'},{w:'Lá thư', emo:'✉️', tag:'Đồ dùng', sent:'Bé viết lá thư thăm ông bà'},{w:'Quả dưa', emo:'🍉', tag:'Trái cây', sent:'Quả dưa hấu giải nhiệt ngày hè'}] },
    { u:'V', l:'v', hw:'V', sound:'vờ', name:'Chữ Vờ', group:'phu_am', examples:[{w:'Con voi', emo:'🐘', tag:'Động vật', sent:'Chú voi có chiếc vòi dài ngoằng'},{w:'Con vịt', emo:'🦆', tag:'Gia cầm', sent:'Con vịt bầu kêu cạp cạp bơi ao'},{w:'Quyển vở', emo:'📓', tag:'Học tập', sent:'Quyển vở sạch chữ đẹp của bé'}] },
    { u:'X', l:'x', hw:'X', sound:'xờ', name:'Chữ Xờ nhẹ', group:'phu_am', examples:[{w:'Chiếc xe', emo:'🚗', tag:'Phương tiện', sent:'Chiếc xe đạp nhỏ em tự đi'},{w:'Mùa xuân', emo:'🌸', tag:'Mùa màng', sent:'Mùa xuân trăm hoa đua nở rực rỡ'},{w:'Cái xẻng', emo:'🪴', tag:'Dụng cụ', sent:'Cái xẻng nhỏ bé xúc đất trồng cây'}] },
    { u:'Y', l:'y', hw:'Y', sound:'y dài', name:'Chữ Y dài', group:'nguyen_am_don', examples:[{w:'Y tá', emo:'👩‍⚕️', tag:'Nghề nghiệp', sent:'Cô y tá chăm sóc người bệnh ân cần'},{w:'Chim yến', emo:'🕊️', tag:'Loài chim', sent:'Chim yến làm tổ trên vách đá'},{w:'Cái yếm', emo:'🎽', tag:'Trang phục', sent:'Cái yếm ăn xinh xắn của em bé'}] }
];

// ==========================================
// ĐỊNH DANH MÁY CHỦ APPS SCRIPT & BIẾN TOÀN CỤC
// ==========================================
const APPS_SCRIPT_URL = ''; // Backend TV2 độc lập không dùng trong module Lớp 2.
const CLASS2_TV_DATA_ROOT = 'assets/data/vietnamese/';
const SHARED_IMAGE_CATALOG_FILE_TV2 = 'assets/data/shared_image_catalog.json';
let tvModuleCtx_ = null;
let tvModuleRoot_ = null;
let tvModuleMounted_ = false;
let tvModuleDestroyed_ = false;
let tvModuleAudioPrimed_ = false;
let tvModuleLastTab_ = '';
const TV_MODULE_STYLE_ID_ = 'class2-vietnamese-standalone-style';
const TV_MODULE_RUNTIME_ID_ = 'class2-vietnamese-runtime';
let sharedImageCatalogCacheTV2_ = null;
let sharedImageByBasenameTV2_ = new Map();
let combinedFairyLibraryCacheTV2_ = null;
let tvOfficialAssessmentBackendNoticeShown_ = false;
let allTopicsDataCache = null;
let allQuestionsFlatCache = null;
// Bật/tắt đọc câu hỏi TỰ ĐỘNG khi vào câu mới — nút "Nghe câu hỏi" thủ công vẫn luôn hoạt động
// dù tắt tính năng này (đây chỉ tắt phần tự động phát, không tắt hẳn tính năng nghe).
let autoSpeechEnabled = localStorage.getItem('class2_tv2_autoSpeechEnabled') !== 'false'; // Cấu hình TTS riêng của module Tiếng Việt 2.
const examsCache = {};

let currentUser = null;
let starGreenCount = 0;
let starRedCount = 0;
let activeTopicId = null;
let currentTopicKey = '';
let currentTopicName = '';
let activeExamContext = null;
let activeRoadmapContext = null;
let activeQuestionsList = [];
let practiceCycleRawPool = [];
let pendingTopicQuiz = null;
let currentQIndex = 0;
let score = 0;
let userAnswers = {};
let wrongAttemptsByQ = {};
let quizWrongAnswers = [];
let quizAnsweredLog = [];
let quizStartTime = null;
let quizTimerInterval = null;
let quizRemainingSeconds = 40 * 60;
let inMiniGameFlow = false;
let inBaiHocFlow = false;

// ==========================================
// ADAPTIVE LEARNING ENGINE (nhẹ, chạy ngầm)
// - Không đổi giao diện học của bé.
// - Hồ sơ năng lực được đồng bộ theo session token lên Google Sheets.
// - Frontend chỉ giữ trạng thái tạm trong RAM; quyền tài khoản vẫn do backend xác thực.
// ==========================================
const ADAPTIVE_RECENT_LIMIT = 80;
const ADAPTIVE_BATCH_SIZE = 5;
const adaptiveLearningState = {
    loaded: false,
    loading: false,
    profile: { v: 1, skills: {}, recent: [] },
    pending: [],
    flushTimer: null
};
const topic4ReadingSupportState_ = {};


// Chỉ riêng Chuyên đề 2 và 3 ở chế độ Khám phá: trả lời đúng sẽ tự chuyển câu tiếp theo.
let topic23AutoAdvanceTimer = null;

function clearTopic23AutoAdvance_() {
    if (topic23AutoAdvanceTimer) {
        clearTimeout(topic23AutoAdvanceTimer);
        topic23AutoAdvanceTimer = null;
    }
}

function scheduleTopic23AutoAdvance_() {
    if (activeExamContext || activeRoadmapContext) return;
    if (![2, 3].includes(Number(activeTopicId))) return;

    const answeredIndex = currentQIndex;
    clearTopic23AutoAdvance_();
    topic23AutoAdvanceTimer = setTimeout(() => {
        topic23AutoAdvanceTimer = null;
        // Nếu bé đã tự chuyển câu trước khi hết thời gian chờ thì không nhảy thêm lần nữa.
        if (currentQIndex !== answeredIndex) return;
        if (![2, 3].includes(Number(activeTopicId))) return;
        if (userAnswers[currentQIndex] === undefined) return;
        nextQuestion();
    }, 900);
}

let audioCtx = null;
const banMaiAudio = new Audio();
banMaiAudio.referrerPolicy = 'no-referrer';

let histLineChartInstance = null;
let histBarChartInstance = null;

// ==========================================
// HỆ THỐNG THÔNG BÁO TRONG APP
// Thay toàn bộ alert()/confirm() mặc định của trình duyệt bằng dialog/toast đồng bộ giao diện.
// ==========================================
let appDialogResolver_ = null;
let appDialogKeyHandler_ = null;

function ensureAppFeedbackUI_() {
    if (!document.getElementById('app-dialog-modal')) {
        const modal = document.createElement('div');
        modal.id = 'app-dialog-modal';
        modal.className = 'hidden app-dialog-backdrop';
        modal.innerHTML = `
            <div class="app-dialog-card" role="dialog" aria-modal="true" aria-labelledby="app-dialog-title">
                <div class="app-dialog-body">
                    <div id="app-dialog-icon-wrap" class="app-dialog-icon-wrap"><span id="app-dialog-icon">🐰</span></div>
                    <h3 id="app-dialog-title" class="app-dialog-title">Thông báo</h3>
                    <p id="app-dialog-message" class="app-dialog-message"></p>
                </div>
                <div class="app-dialog-actions">
                    <button id="app-dialog-cancel" type="button" class="app-dialog-btn app-dialog-btn-cancel">Đóng</button>
                    <button id="app-dialog-ok" type="button" class="app-dialog-btn app-dialog-btn-ok">OK</button>
                </div>
            </div>`;
        document.body.appendChild(modal);
    }
    if (!document.getElementById('app-toast-container')) {
        const host = document.createElement('div');
        host.id = 'app-toast-container';
        host.className = 'app-toast-container';
        document.body.appendChild(host);
    }
}

function getAppFeedbackTheme_(type = 'info') {
    const themes = {
        success: { icon:'🌟', title:'Tuyệt vời!', accent:'#10b981', soft:'#ecfdf5', border:'#a7f3d0' },
        warning: { icon:'💡', title:'Bé chú ý nhé', accent:'#f59e0b', soft:'#fffbeb', border:'#fde68a' },
        error:   { icon:'🌧️', title:'Có chút trục trặc', accent:'#f43f5e', soft:'#fff1f2', border:'#fecdd3' },
        confirm: { icon:'🐰', title:'Cô hỏi bé một chút', accent:'#8b5cf6', soft:'#f5f3ff', border:'#ddd6fe' },
        info:    { icon:'🐰', title:'Cô Thỏ Ngọc nhắn bé', accent:'#ec4899', soft:'#fdf2f8', border:'#fbcfe8' }
    };
    return themes[type] || themes.info;
}

function closeAppDialog_(result = true) {
    const modal = document.getElementById('app-dialog-modal');
    if (modal) modal.classList.add('hidden');
    if (appDialogKeyHandler_) {
        document.removeEventListener('keydown', appDialogKeyHandler_);
        appDialogKeyHandler_ = null;
    }
    const resolve = appDialogResolver_;
    appDialogResolver_ = null;
    if (resolve) resolve(result);
}

function showAppDialog(message, options = {}) {
    ensureAppFeedbackUI_();
    if (appDialogResolver_) closeAppDialog_(false);

    const type = options.type || 'info';
    const theme = getAppFeedbackTheme_(type);
    const modal = document.getElementById('app-dialog-modal');
    const card = modal?.querySelector('.app-dialog-card');
    const iconWrap = document.getElementById('app-dialog-icon-wrap');
    const icon = document.getElementById('app-dialog-icon');
    const title = document.getElementById('app-dialog-title');
    const msg = document.getElementById('app-dialog-message');
    const ok = document.getElementById('app-dialog-ok');
    const cancel = document.getElementById('app-dialog-cancel');
    if (!modal || !card || !iconWrap || !icon || !title || !msg || !ok || !cancel) return Promise.resolve(true);

    icon.textContent = options.icon || theme.icon;
    title.textContent = options.title || theme.title;
    msg.textContent = String(message || '');
    iconWrap.style.background = theme.soft;
    iconWrap.style.borderColor = theme.border;
    title.style.color = theme.accent;
    card.style.borderColor = theme.border;
    ok.style.background = `linear-gradient(135deg, ${theme.accent}, #a855f7)`;
    ok.textContent = options.okText || 'OK';
    cancel.textContent = options.cancelText || 'Đóng';
    cancel.classList.toggle('hidden', !options.confirm);

    modal.classList.remove('hidden');
    requestAnimationFrame(() => ok.focus());

    return new Promise(resolve => {
        appDialogResolver_ = resolve;
        ok.onclick = () => closeAppDialog_(true);
        cancel.onclick = () => closeAppDialog_(false);
        appDialogKeyHandler_ = (e) => {
            if (e.key === 'Escape') closeAppDialog_(options.confirm ? false : true);
            if (e.key === 'Enter' && !e.shiftKey) closeAppDialog_(true);
        };
        document.addEventListener('keydown', appDialogKeyHandler_);
    });
}

function showAppConfirm(message, options = {}) {
    return showAppDialog(message, {
        ...options,
        type: 'confirm',
        confirm: true,
        okText: options.okText || 'Đồng ý',
        cancelText: options.cancelText || 'Chưa nhé'
    });
}

function showAppToast(message, type = 'info', duration = 1900) {
    ensureAppFeedbackUI_();
    const host = document.getElementById('app-toast-container');
    if (!host) return;
    const theme = getAppFeedbackTheme_(type);
    const toast = document.createElement('div');
    toast.className = 'app-toast-item';
    toast.style.borderColor = theme.border;
    toast.style.background = theme.soft;
    toast.innerHTML = `<span class="app-toast-icon">${theme.icon}</span><span class="app-toast-text"></span>`;
    toast.querySelector('.app-toast-text').textContent = String(message || '');
    host.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add('is-visible'));
    window.setTimeout(() => {
        toast.classList.remove('is-visible');
        window.setTimeout(() => toast.remove(), 220);
    }, Math.max(900, Number(duration) || 1900));
}



// ==========================================
// ACCOUNT / PREMIUM ENGINE v2
// VaiTro: admin | student
// LoaiTaiKhoan: regular | trial | vip
// ==========================================
const PREMIUM_TOPIC_IDS = new Set([]);
let accountManagerAccounts = [];
let accountManagerSort = { key: 'maHS', dir: 1 };
let adminNewRegistrationCount = 0;
let adminNotificationTimer = null;

function isAdminUser() {
    return !!currentUser && !currentUser.isGuest && String(currentUser.vaiTro || currentUser.role || '').toLowerCase() === 'admin';
}

function getAccountType() { if (!tvModuleCtx_?.user) return 'guest'; if (String(tvModuleCtx_?.user?.role||'')==='admin') return 'admin'; return String(tvModuleCtx_?.accessType||'regular').toLowerCase(); }

function hasPremiumAccess() { if (isAdminUser()) return true; return ['trial','vip'].includes(String(tvModuleCtx_?.accessType || 'regular').toLowerCase()); }

function getPremiumAccessState() {
    const type = getAccountType();
    return { allowed: hasPremiumAccess(), reason: type };
}

function ensurePremiumAccessModal() {
    let modal = document.getElementById('modal-premium-access');
    if (modal) return modal;
    modal = document.createElement('div');
    modal.id = 'modal-premium-access';
    modal.className = 'hidden fixed inset-0 z-[130] bg-slate-900/55 backdrop-blur-sm flex items-center justify-center p-3';
    modal.innerHTML = `
      <div class="w-full max-w-md bg-white rounded-[28px] border-2 border-pink-200 shadow-2xl p-5 md:p-6 text-center">
        <div class="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center text-3xl mb-3">🔒</div>
        <h3 id="premium-popup-title" class="text-lg md:text-xl font-black text-purple-700 mb-2">Nội dung Premium</h3>
        <p id="premium-popup-message" class="text-sm font-bold text-gray-600 leading-relaxed whitespace-pre-line"></p>
        <div id="premium-popup-actions" class="mt-5 space-y-2"></div>
      </div>`;
    document.body.appendChild(modal);
    return modal;
}

function closePremiumAccessPopup() {
    document.getElementById('modal-premium-access')?.classList.add('hidden');
}

function showPremiumAccessPopup(featureName = 'chức năng này', accessState = getPremiumAccessState()) {
    const modal = ensurePremiumAccessModal();
    const title = document.getElementById('premium-popup-title');
    const message = document.getElementById('premium-popup-message');
    const actions = document.getElementById('premium-popup-actions');
    if (accessState.reason === 'guest') {
        title.textContent = 'Khu vực dành cho Trial / VIP ✨';
        message.textContent = `Đây là ${featureName} dành cho tài khoản Trial hoặc VIP.\n\nCon có thể Sign in nếu đã có tài khoản hoặc Sign up để đăng ký nhé!\n\nCác chuyên đề cơ bản vẫn học miễn phí bình thường.`;
        actions.innerHTML = `
          <div class="grid grid-cols-2 gap-2">
            <button onclick="closePremiumAccessPopup(); openAuthScreen('login')" class="py-2.5 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-black text-sm pastel-btn">Sign in</button>
            <button onclick="closePremiumAccessPopup(); openAuthScreen('register')" class="py-2.5 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-black text-sm pastel-btn">Sign up</button>
          </div>
          <button onclick="closePremiumAccessPopup()" class="w-full py-3 text-base font-black text-gray-500 hover:text-gray-700">Để sau nhé</button>`;
    } else {
        title.textContent = 'Tài khoản Regular chưa mở khu vực này ⭐';
        message.textContent = `Tài khoản hiện tại của con là Regular.\n\n${featureName} yêu cầu tài khoản Trial hoặc VIP. Các chuyên đề cơ bản vẫn học miễn phí bình thường.`;
        actions.innerHTML = `<button onclick="closePremiumAccessPopup()" class="w-full py-3 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-black text-sm pastel-btn">Đã hiểu</button><button onclick="closePremiumAccessPopup()" class="w-full py-3 text-base font-black text-gray-500 hover:text-gray-700">Để sau nhé</button>`;
    }
    modal.classList.remove('hidden');
}

function requirePremiumAccess(featureName) {
    if (hasPremiumAccess()) return true;
    if (typeof tvModuleCtx_?.requestPremiumAccess === 'function') {
        tvModuleCtx_.requestPremiumAccess(featureName);
    } else {
        showPremiumAccessPopup(featureName);
    }
    return false;
}

function updatePremiumUI() {
    const locked = !hasPremiumAccess();
    ['btn-bai-hoc-lock','btn-progress-lock','minigame-lock-icon','bai-hoc-lock-icon','roadmap-lock-icon','review-lock-icon','exam-lock-icon'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.toggle('hidden', !locked);
    });
}


function openAuthScreen(tab = 'login') { tvModuleCtx_?.openAuth?.(tab === 'register' ? 'register' : 'login'); }

function closeAuthScreen() {}

function getSessionToken() { return tvModuleCtx_?.isAuthenticated ? 'CLASS2_SHARED_SESSION' : ''; }

function storeSessionToken() { /* Shared Class 2 shell owns the session token. */ }

function clearStoredSession() { /* Shared Class 2 shell owns session lifecycle. */ }

function getAdminAuthPayload() {
    return { sessionToken: getSessionToken() };
}

function formatAccountDate(value) {
    if (!value) return '--';
    const d = new Date(value);
    if (!isNaN(d.getTime())) return d.toLocaleDateString('vi-VN');
    return String(value);
}

function renderAdminRegistrationBadge() {
    const badge = document.getElementById('admin-new-registration-badge');
    if (!badge) return;
    const count = Math.max(0, Number(adminNewRegistrationCount) || 0);
    badge.textContent = count > 99 ? '99+' : String(count);
    badge.classList.toggle('hidden', count <= 0);
}

async function refreshAdminRegistrationBadge() {
    if (!isAdminUser()) return;
    try {
        const res = await callAppsScript('getNewRegistrationsCount', getAdminAuthPayload());
        if (!res.ok) throw new Error(res.error || 'Không lấy được số đăng ký mới');
        adminNewRegistrationCount = Number(res.count) || 0;
        renderAdminRegistrationBadge();
    } catch (e) {
        // Badge là thông tin phụ, không làm gián đoạn ứng dụng nếu máy chủ tạm thời lỗi.
    }
}

function startAdminNotificationPolling() {
    clearInterval(adminNotificationTimer);
    adminNotificationTimer = null;
    if (!isAdminUser()) return;
    refreshAdminRegistrationBadge();
    adminNotificationTimer = setInterval(refreshAdminRegistrationBadge, 15000);
}

// Admin polling/listeners của app độc lập không dùng trong module Lớp 2.

async function markAdminRegistrationsSeen() {
    if (!isAdminUser() || adminNewRegistrationCount <= 0) return;
    try {
        const res = await callAppsScript('markRegistrationsSeen', getAdminAuthPayload());
        if (res.ok) {
            adminNewRegistrationCount = 0;
            renderAdminRegistrationBadge();
        }
    } catch (e) {
        // Không chặn màn quản lý nếu thao tác đánh dấu đã xem thất bại.
    }
}

function ensureAccountManagerModal() {
    let modal = document.getElementById('modal-account-manager');
    if (modal) return modal;
    modal = document.createElement('div');
    modal.id = 'modal-account-manager';
    modal.className = 'hidden fixed inset-0 z-[120] bg-slate-900/55 backdrop-blur-sm flex items-center justify-center p-2 md:p-3';
    modal.innerHTML = `
      <div class="w-full max-w-6xl max-h-[94vh] bg-white rounded-[28px] border-2 border-pink-200 shadow-2xl overflow-hidden flex flex-col">
        <div class="px-4 md:px-5 py-3 bg-gradient-to-r from-pink-50 via-purple-50 to-pink-50 border-b border-pink-100 flex items-center justify-between gap-3">
          <div>
            <div class="flex flex-wrap items-center gap-2 text-purple-700 font-black text-lg md:text-xl"><span>👥</span><span>Quản lý tài khoản</span><span id="account-manager-total" class="px-2.5 py-1 rounded-full bg-white border border-purple-200 text-purple-600 text-xs font-black shadow-sm">0 tài khoản</span></div>
            <div class="text-xs text-gray-500 font-bold mt-0.5">Regular miễn phí · Trial Premium 1 tháng · VIP Premium 1 năm</div>
          </div>
          <button onclick="closeAccountManager()" class="w-9 h-9 rounded-full bg-white border border-pink-200 text-pink-500 hover:bg-pink-100"><i class="fa-solid fa-xmark"></i></button>
        </div>
        <div class="p-3 md:p-4 border-b border-pink-100 flex flex-col sm:flex-row gap-2 items-stretch sm:items-center">
          <div class="relative flex-1"><i class="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-pink-400"></i><input id="account-search" oninput="renderAccountManagerRows()" placeholder="Tìm ID, họ tên, lớp, loại tài khoản..." class="w-full pl-9 pr-3 py-2.5 rounded-xl border-2 border-pink-200 focus:border-pink-400 outline-none text-sm font-bold"></div>
          <button onclick="loadAccountManager()" class="px-4 py-2.5 rounded-xl bg-purple-50 text-purple-700 border border-purple-200 font-black text-sm pastel-btn"><i class="fa-solid fa-rotate mr-1"></i>Làm mới</button>
        </div>
        <div class="overflow-auto flex-1">
          <table class="w-full min-w-[820px] text-sm md:text-[15px]">
            <thead class="sticky top-0 bg-pink-50 text-slate-700 font-black border-b border-pink-200">
              <tr>
                <th onclick="sortAccountManager('maHS')" class="px-3 py-3 text-left cursor-pointer">Mã HS ↕</th>
                <th onclick="sortAccountManager('hoTen')" class="px-3 py-3 text-left cursor-pointer">Họ tên ↕</th>
                <th onclick="sortAccountManager('lop')" class="px-3 py-3 text-center cursor-pointer">Lớp ↕</th>
                <th onclick="sortAccountManager('loaiTaiKhoan')" class="px-3 py-3 text-center cursor-pointer">Loại tài khoản ↕</th>
                <th onclick="sortAccountManager('hanDungThu')" class="px-3 py-3 text-center cursor-pointer">Hạn dùng thử ↕</th>
                <th onclick="sortAccountManager('hanVIP')" class="px-3 py-3 text-center cursor-pointer">Hạn VIP ↕</th>
              </tr>
            </thead>
            <tbody id="account-manager-body" class="divide-y divide-pink-100 font-bold text-slate-700"></tbody>
          </table>
        </div>
        <div class="px-4 py-3 bg-slate-50 border-t border-slate-100 text-xs md:text-sm font-bold text-gray-500">Regular: miễn phí &nbsp;·&nbsp; Trial: Premium 1 tháng &nbsp;·&nbsp; VIP: Premium 1 năm</div>
      </div>`;
    document.body.appendChild(modal);
    return modal;
}

async function openAccountManager() {
    if (!isAdminUser()) return;
    ensureAccountManagerModal().classList.remove('hidden');
    await loadAccountManager();
    await markAdminRegistrationsSeen();
}
function closeAccountManager() { document.getElementById('modal-account-manager')?.classList.add('hidden'); }

async function loadAccountManager() {
    if (!isAdminUser()) return;
    const body = document.getElementById('account-manager-body');
    if (body) body.innerHTML = `<tr><td colspan="6" class="py-8 text-center text-gray-400"><i class="fa-solid fa-spinner fa-spin mr-2"></i>Đang tải...</td></tr>`;
    try {
        const res = await callAppsScript('listAccounts', getAdminAuthPayload());
        if (!res.ok) throw new Error(res.error || 'Không tải được tài khoản');
        accountManagerAccounts = res.accounts || [];
        document.getElementById('account-manager-total').textContent = `${res.totalCount ?? accountManagerAccounts.length} tài khoản`;
        renderAccountManagerRows();
    } catch (e) { if (body) body.innerHTML = `<tr><td colspan="6" class="py-8 text-center text-rose-500">${escapeHtml(e.message)}</td></tr>`; }
}

function sortAccountManager(key) {
    if (accountManagerSort.key === key) accountManagerSort.dir *= -1;
    else accountManagerSort = { key, dir: 1 };
    renderAccountManagerRows();
}

function accountTierBadge(type) {
    const t = String(type || 'regular').toLowerCase();
    if (t === 'vip') return 'text-purple-700 bg-purple-50 border-purple-200';
    if (t === 'trial') return 'text-amber-700 bg-amber-50 border-amber-200';
    return 'text-slate-600 bg-slate-50 border-slate-200';
}

function renderAccountManagerRows() {
    const body = document.getElementById('account-manager-body');
    if (!body) return;
    const q = String(document.getElementById('account-search')?.value || '').trim().toLowerCase();
    const { key, dir } = accountManagerSort;
    let rows = accountManagerAccounts.filter(a => !q || [a.maHS,a.hoTen,a.lop,a.loaiTaiKhoan].some(v => String(v||'').toLowerCase().includes(q)));
    rows = rows.slice().sort((a,b) => String(a[key]||'').localeCompare(String(b[key]||''), 'vi', {numeric:true}) * dir);
    if (!rows.length) { body.innerHTML = '<tr><td colspan="6" class="py-8 text-center text-gray-400">Không có tài khoản phù hợp</td></tr>'; return; }
    body.innerHTML = rows.map(a => `
      <tr class="hover:bg-pink-50/40">
        <td class="px-3 py-3 font-black text-pink-700">${escapeHtml(a.maHS)}</td>
        <td class="px-3 py-3">${escapeHtml(a.hoTen)}</td>
        <td class="px-3 py-3 text-center">${escapeHtml(a.lop)}</td>
        <td class="px-3 py-3 text-center"><select onchange="changeAccountType('${String(a.maHS).replace(/'/g,"\\'")}', this.value)" class="px-2.5 py-2 rounded-xl border font-black ${accountTierBadge(a.loaiTaiKhoan)}"><option value="regular" ${a.loaiTaiKhoan==='regular'?'selected':''}>Regular</option><option value="trial" ${a.loaiTaiKhoan==='trial'?'selected':''}>Trial</option><option value="vip" ${a.loaiTaiKhoan==='vip'?'selected':''}>VIP</option></select></td>
        <td class="px-3 py-3 text-center">${escapeHtml(formatAccountDate(a.hanDungThu))}</td>
        <td class="px-3 py-3 text-center">${escapeHtml(formatAccountDate(a.hanVIP))}</td>
      </tr>`).join('');
}

async function changeAccountType(maHS, type) {
    try {
        const res = await callAppsScript('updateAccountType', { ...getAdminAuthPayload(), targetMaHS: maHS, accountType: type });
        if (!res.ok) throw new Error(res.error || 'Không cập nhật được');
        await loadAccountManager();
    } catch(e) { await showAppDialog(e.message, { type:'error', title:'Không thể cập nhật tài khoản' }); await loadAccountManager(); }
}


// ==========================================
// HÀM TIỆN ÍCH DỮ LIỆU
// ==========================================
function getStudentFirstName() {
    if (!currentUser || currentUser.isGuest || !currentUser.hoTen) return "Bé";
    const parts = currentUser.hoTen.trim().split(/\s+/);
    return parts[parts.length - 1] || "Bé";
}

function normalizeQuestion(q) {
    if (!q) return null;
    return {
        question_id: q.id ?? q.question_id ?? 0,
        sub_id: String(q.sub_id ?? q.subId ?? q.sub_code ?? '').trim(),
        sub_topic: String(q.sub ?? q.sub_topic ?? 'Câu hỏi chung').trim(),
        week: q.week ?? q.w ?? null,
        tags: Array.isArray(q.tags) ? q.tags.slice() : [],
        tokens: Array.isArray(q.tokens) ? q.tokens.slice() : [],
        question_text: q.q ?? q.question_text ?? '',
        options: Array.isArray(q.o) ? q.o : (Array.isArray(q.options) ? q.options : []),
        answer: q.a ?? q.answer ?? '',
        hint: q.h ?? q.hint ?? '',
        image_url: resolveCatalogImageSrcTV2_(q) || '',
        emoji: q.emoji ?? q.icon ?? '',
        audio_text: q.aud ?? q.audio_text ?? '',
        reading_title: q.r_title ?? q.reading_title ?? '',
        reading_passage: q.r_passage ?? q.reading_passage ?? q.passage_text ?? '',
        skill_tag: q.skill_tag ?? q.competency ?? q.tag ?? '',
        competency: q.competency ?? q.skill_tag ?? q.tag ?? '',
        sub_code: q.sub_code ?? '',
        difficulty: q.difficulty ?? 'medium',
        semester: q.semester ?? null,
        scope: q.scope ?? '',
        question_type: q.question_type ?? 'multiple_choice',
        learning_target: q.learning_target ?? '',
        exam_id: q.exam_id ?? null,
        diem: Number(q.diem ?? q.points ?? q.score ?? 0.5),
        explanation: q.explanation ?? q.h ?? 'Không có giải thích chi tiết.'
    };
}

function normalizeTopic(t) {
    if (!t) return null;
    const rawQuestions = t.qs || t.questions || [];
    return {
        topic_id: Number(t.id ?? t.topic_id),
        topic_name: t.name ?? t.topic_name ?? '',
        description: t.desc ?? t.description ?? '',
        lecture_title: t.l_title ?? t.lecture_title ?? '',
        lecture_content: t.l_content ?? t.lecture_content ?? '',
        lecture_audio_text: t.l_audio ?? t.lecture_audio_text ?? '',
        questions: rawQuestions.map(normalizeQuestion).filter(Boolean),
        poems: Array.isArray(t.poems) ? t.poems : [],
        stories: Array.isArray(t.stories) ? t.stories : [],
        copyright_note: t.copyright_note ?? '',
        data_file: t.data_file ?? '',
        data_files: (t.data_files && typeof t.data_files === 'object') ? { ...t.data_files } : {},
        vietnam_data_file: t.vietnam_data_file ?? t.data_files?.vietnam ?? '',
        world_data_file: t.world_data_file ?? t.data_files?.world ?? '',
        story_count: Number(t.story_count ?? 0),
        vietnam_count: Number(t.vietnam_count ?? 0),
        world_count: Number(t.world_count ?? 0)
    };
}

function shuffleArray(arr) {
    if (!arr) return [];
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function buildTrickyChoices(correctAnswer, sameGroupPool, allPool, count = 3) {
    let same = [...new Set(sameGroupPool.filter(x => x !== correctAnswer))];
    same = shuffleArray(same);
    let picks = same.slice(0, count);
    if (picks.length < count) {
        let rest = [...new Set(allPool.filter(x => x !== correctAnswer && !picks.includes(x)))];
        rest = shuffleArray(rest);
        picks = picks.concat(rest.slice(0, count - picks.length));
    }
    return shuffleArray([correctAnswer, ...picks]);
}

function capitalizeFirstLetter(val) {
    if (!val) return '';
    const s = String(val).trim();
    return s.charAt(0).toUpperCase() + s.slice(1);
}

function beautifySubtopicName(name) {
    if (!name) return '';
    let s = name.trim();
    if (/đa giác quan/i.test(s)) return 'Trải nghiệm đa giác quan';
    if (/trái nghĩa.*đồng nghĩa/i.test(s) || /đồng nghĩa.*trái nghĩa/i.test(s)) return 'Trái nghĩa - đồng nghĩa';
    if (s.length > 25 && s.includes('(')) {
        s = s.replace(/\s*\([^)]*\)/g, '').trim();
    }
    return s;
}

const TOPICS_DATA_FILES = [
    `${CLASS2_TV_DATA_ROOT}kham_pha_tieng_viet_2_part1.json`,
    `${CLASS2_TV_DATA_ROOT}kham_pha_tieng_viet_2_part2.json`
];
const ON_TAP_DATA_FILE_TV2 = `${CLASS2_TV_DATA_ROOT}on_tap_tieng_viet_2.json`;

// Ôn tập là chuyên mục độc lập, không bị gộp hay ghi đè Khám phá Mục 11.
let reviewTopicTV2Cache_ = null;
async function fetchReviewTopicTV2_() {
    if (reviewTopicTV2Cache_) return reviewTopicTV2Cache_;
    const res = await fetch(ON_TAP_DATA_FILE_TV2, { cache:'no-store' });
    if (!res.ok) throw new Error('Không thể tải dữ liệu Ôn tập');
    const review = await res.json();
    const reviewQuestions = (review.sections || []).flatMap(sec => sec.qs || sec.questions || []);
    if (!reviewQuestions.length) throw new Error('Chưa có dữ liệu ôn tập học kỳ');
    reviewTopicTV2Cache_ = normalizeTopic({
        id:13, name:'Ôn tập tổng hợp', desc:review.desc || 'Ôn tập học kỳ',
        l_title:review.l_title || 'Ôn tập học kỳ',
        l_content:review.l_content || '', l_audio:review.l_audio || '',
        qs:reviewQuestions
    });
    return reviewTopicTV2Cache_;
}

async function fetchAllTopicsData() {
    if (allTopicsDataCache) return allTopicsDataCache;
    await loadSharedImageCatalogTV2_();
    const [p1,p2] = await Promise.all(TOPICS_DATA_FILES.map(async file => {
        const res = await fetch(file, { cache:'no-store' });
        if (!res.ok) throw new Error(`Không thể tải file dữ liệu ${file}`);
        return res.json();
    }));
    const rawTopics = [...(p1.topics || []), ...(p2.topics || [])];
    allTopicsDataCache = rawTopics.map(normalizeTopic).filter(Boolean);
    allQuestionsFlatCache = allTopicsDataCache.flatMap(t =>
        (t.questions || []).map(q => ({...q, source_topic_id:t.topic_id}))
    );
    return allTopicsDataCache;
}

async function fetchAllQuestionsFlat() {
    if (allQuestionsFlatCache) return allQuestionsFlatCache;
    await fetchAllTopicsData();
    return allQuestionsFlatCache || [];
}

async function loadExamDataFile(file) {
    if (examsCache[file]) return examsCache[file];
    await loadSharedImageCatalogTV2_();
    const res = await fetch(`${CLASS2_TV_DATA_ROOT}${file}`, {cache:'no-store'});
    if (!res.ok) throw new Error('Không thể tải file đề thi');
    const data = await res.json();
    if (data && Array.isArray(data.exams)) data.exams=data.exams.map(ex=>({...ex,questions:(ex.qs||ex.questions||[]).map(normalizeQuestion).filter(Boolean)}));
    examsCache[file]=data; return data;
}

// ==========================================
// RENDER GIAO DIỆN TRANG CHỦ & ĐẤU TRƯỜNG
// ==========================================
async function renderDashboardGrid() {
    const container = document.getElementById('view-dashboard-grid');
    if (!container) return;
    let topicsData = [];
    try { topicsData = await fetchAllTopicsData(); } catch (e) {}

    let html = '';
    TOPICS_CONFIG.filter(t => Number(t.id) <= 12).forEach(t => {
        const topicObj = topicsData.find(item => Number(item.topic_id) === Number(t.id));
        const totalCount = topicObj && topicObj.questions ? topicObj.questions.length : 0;
        const mediaCount = Number(t.id) === 12 ? Number(topicObj?.story_count || 80) : 0;
        const countLabel = Number(t.id) === 12
            ? (mediaCount > 0 ? `${mediaCount} truyện` : 'Truyện cổ tích')
            : (totalCount > 0 ? `${totalCount} câu` : t.desc);
        const iconHtml = t.isCustomTextIcon
            ? `<div class="tv2-explore-icon tv2-explore-icon--text w-8 h-8 bg-rose-100 rounded-xl flex items-center justify-center text-[11px] font-black text-rose-600 shadow-inner group-hover:scale-110 transition-transform shrink-0 tracking-tight">S/X</div>`
            : `<div class="tv2-explore-icon w-8 h-8 bg-${t.color}-100 rounded-xl flex items-center justify-center text-sm font-extrabold text-${t.color}-600 shadow-inner group-hover:scale-110 transition-transform shrink-0">${t.icon}</div>`;
        const locked = PREMIUM_TOPIC_IDS.has(Number(t.id)) && !hasPremiumAccess();
        html += `
            <div onclick="openTopic(${t.id}, '${t.title}', '${t.icon}')" class="tv2-explore-card relative pastel-card p-3 flex flex-col justify-between cursor-pointer hover:border-${t.color}-400 transition-all group min-h-[92px]">
                ${locked ? '<span class="absolute top-2 right-2 text-gray-400 text-xs">🔒</span>' : ''}
                <div class="tv2-explore-head flex items-center gap-3">
                    ${iconHtml}
                    <h3 class="tv2-explore-title font-extrabold text-${t.color}-700 text-sm md:text-base leading-tight">${t.title}</h3>
                </div>
                <div class="tv2-explore-foot flex justify-between items-center mt-1.5 pt-1 border-t border-pink-100 text-[11px] font-bold text-gray-500">
                    <span class="tv2-explore-desc">${t.desc}</span>
                    <span class="tv2-explore-count bg-${t.color}-50 text-${t.color}-600 px-2 py-0.5 rounded-full">${countLabel}</span>
                </div>
            </div>`;
    });
    container.classList.add('nature-ambient-host');
    container.innerHTML = `${renderNatureAmbientLayer_(true)}${html}`;
}

async function startRandomExam(categoryKey) {
    if (!requirePremiumAccess('Đề thi')) return;
    setAppShellRootMode_(false);
    stopSpeaking();
    const catKeywords = {
        hocky1: ['học kỳ 1', 'hk1'],
        hocky2: ['học kỳ 2', 'hk2'],
        hsg: ['giỏi', 'hsg']
    }[categoryKey] || [];

    showLoadingOverlay("Đang chuẩn bị đề thi...");
    try {
        const examData = await loadExamDataFile('de_thi_tieng_viet_2.json');
        hideLoadingOverlay();

        const pool = (examData && Array.isArray(examData.exams)) ? examData.exams : [];
        let candidates = pool.filter(e => catKeywords.some(k => (e.exam_category || '').toLowerCase().includes(k)));
        if (!candidates.length) candidates = pool;
        if (!candidates.length) return showAppDialog('Đang cập nhật thêm đề thi cho mục này, bé quay lại sau nhé!', { type:'info', title:'Đề thi đang được cập nhật' });

        const exam = candidates[Math.floor(Math.random() * candidates.length)];
        const examIndex = pool.indexOf(exam);
        const examNumber = candidates.indexOf(exam) + 1;
        const examLabel = examFileMap[categoryKey]?.label || 'Đề thi';
        const examTitle = exam.exam_name || exam.exam_title || exam.title || `${examLabel} - Đề số ${examIndex + 1}`;

        activeExamContext = {
            categoryKey,
            examIndex,
            examNumber,
            examTitle,
            examId: exam.exam_id ?? null,
            examCode: exam.exam_code ?? '',
            scope: exam.scope ?? '',
            semester: exam.semester ?? null,
            timeLimitMinutes: Number(exam.time_limit_minutes || 40),
            assessedCompetencies: Array.isArray(exam.assessed_competencies) ? exam.assessed_competencies.slice() : [],
            notAssessedCompetencies: Array.isArray(exam.not_assessed_competencies) ? exam.not_assessed_competencies.slice() : [],
            assessmentPolicy: exam.assessment_policy || {},
            assessmentMode: exam.assessment_mode || (categoryKey === 'hsg' ? 'score_only' : 'competency'),
            competencyReporting: categoryKey !== 'hsg' && exam.competency_reporting !== false
        };
        activeRoadmapContext = null;
        pendingTopicQuiz = null;

        const questions = Array.isArray(exam.questions) && exam.questions.length ? exam.questions : [];
        if (!questions.length) return showAppDialog('Đề thi này chưa có câu hỏi, bé chọn đề khác nhé!', { type:'warning' });

        updateNavTabs("12. Đấu trường đề thi", "🏆", examTitle);
        startTopicQuiz(0, examTitle, questions, null);
    } catch (err) {
        hideLoadingOverlay();
        await showAppDialog(`Không thể tải đề thi: ${err.message}`, { type:'error' });
    }
}

function startExamCountdown() {
    const minutes = Number(activeExamContext?.timeLimitMinutes || 40);
    quizRemainingSeconds = Math.max(1, minutes) * 60;
    updateExamTimerDisplay();
    clearInterval(quizTimerInterval);
    quizTimerInterval = setInterval(() => {
        quizRemainingSeconds--;
        updateExamTimerDisplay();
        if (quizRemainingSeconds <= 0) {
            clearInterval(quizTimerInterval);
            showAppDialog('Đã hết giờ làm bài! Bài thi sẽ được nộp lại nhé bé.', { type:'warning', title:'Hết giờ làm bài', okText:'Xem kết quả' }).then(() => showResultScreen());
        }
    }, 1000);
}

function updateExamTimerDisplay() {
    const el = document.getElementById('quiz-timer-display');
    if (!el) return;
    const m = Math.floor(Math.max(0, quizRemainingSeconds) / 60);
    const s = Math.max(0, quizRemainingSeconds) % 60;
    el.textContent = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

function openExamHub() {
    setAppShellRootMode_(true);
    setMainTabActive_('exams');
    stopSpeaking();
    activeExamContext = null;
    activeRoadmapContext = null;
    activeTopicId = null;
    pendingTopicQuiz = null;
    updateNavTabs("12. Đấu trường đề thi", "🏆", null);
    switchAppView('view-exam-hub');
    showLoadingOverlay("Đang tải kho đề thi...");
    renderExamHubGrid().finally(() => hideLoadingOverlay());
}

async function renderExamHubGrid() {
    const container = document.getElementById('exam-categories-grid');
    if (!container) return;

    let examData = null;
    try { examData = await loadExamDataFile('de_thi_tieng_viet_2.json'); } catch (e) {}

    const getCountForCat = (catName) => {
        if (!examData || !examData.exams) return 3;
        return examData.exams.filter(e => (e.exam_category || '').toLowerCase().includes(catName)).length || 3;
    };

    const countHK1 = getCountForCat('học kỳ 1') || getCountForCat('hk1');
    const countHK2 = getCountForCat('học kỳ 2') || getCountForCat('hk2');
    const countHSG = getCountForCat('giỏi') || getCountForCat('hsg');

    let html = `
        <div class="bg-pink-50/70 p-5 rounded-3xl border-2 border-pink-200 flex flex-col justify-between items-center text-center group min-h-[250px] pastel-card">
            <div>
                <div class="text-4xl mb-1.5 group-hover:scale-110 transition-transform">🌸</div>
                <h3 class="font-extrabold text-pink-600 text-lg mb-1">Học kỳ 1</h3>
                <p class="text-xs text-gray-500 font-bold mb-2">Kiểm tra kiến thức HK1</p>
                <span class="inline-block bg-pink-100 text-pink-700 px-3 py-0.5 rounded-full text-xs font-black mb-3">${countHK1} đề thi chuẩn</span>
            </div>
            <div class="w-full space-y-2">
                <button onclick="startRandomExam('hocky1')" class="w-full py-2.5 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-extrabold rounded-xl text-xs pastel-btn shadow-sm">
                    🚀 Vào thi thử
                </button>
                <button onclick="openHistoryModal('LichSuBaiThi_HK1')" class="w-full py-2 bg-white text-pink-700 border border-pink-300 font-extrabold rounded-xl text-xs pastel-btn hover:bg-pink-50">
                    📊 Xem lịch sử thi
                </button>
            </div>
        </div>

        <div class="bg-purple-50/70 p-5 rounded-3xl border-2 border-purple-200 flex flex-col justify-between items-center text-center group min-h-[250px] pastel-card">
            <div>
                <div class="text-4xl mb-1.5 group-hover:scale-110 transition-transform">⭐</div>
                <h3 class="font-extrabold text-purple-600 text-lg mb-1">Học kỳ 2</h3>
                <p class="text-xs text-gray-500 font-bold mb-2">Kiểm tra kiến thức HK2</p>
                <span class="inline-block bg-purple-100 text-purple-700 px-3 py-0.5 rounded-full text-xs font-black mb-3">${countHK2} đề thi chuẩn</span>
            </div>
            <div class="w-full space-y-2">
                <button onclick="startRandomExam('hocky2')" class="w-full py-2.5 bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-extrabold rounded-xl text-xs pastel-btn shadow-sm">
                    🚀 Vào thi thử
                </button>
                <button onclick="openHistoryModal('LichSuBaiThi_HK2')" class="w-full py-2 bg-white text-purple-700 border border-purple-300 font-extrabold rounded-xl text-xs pastel-btn hover:bg-purple-50">
                    📊 Xem lịch sử thi
                </button>
            </div>
        </div>

        <div class="bg-amber-50/70 p-5 rounded-3xl border-2 border-amber-200 flex flex-col justify-between items-center text-center group min-h-[250px] pastel-card">
            <div>
                <div class="text-4xl mb-1.5 group-hover:scale-110 transition-transform">🏆</div>
                <h3 class="font-extrabold text-amber-600 text-lg mb-1">Học sinh giỏi</h3>
                <p class="text-xs text-gray-500 font-bold mb-2">Thử thách nâng cao IQ</p>
                <span class="inline-block bg-amber-100 text-amber-700 px-3 py-0.5 rounded-full text-xs font-black mb-3">${countHSG} đề thi tuyển chọn</span>
            </div>
            <div class="w-full space-y-2">
                <button onclick="startRandomExam('hsg')" class="w-full py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-extrabold rounded-xl text-xs pastel-btn shadow-sm">
                    🚀 Vào thi thử
                </button>
                <button onclick="openHistoryModal('LichSuBaiThi_HSG')" class="w-full py-2 bg-white text-amber-700 border border-amber-300 font-extrabold rounded-xl text-xs pastel-btn hover:bg-amber-50">
                    📊 Xem lịch sử thi
                </button>
            </div>
        </div>
    `;
    container.innerHTML = html;
}

// ==========================================
// ĐIỀU HƯỚNG VIEW & BREADCRUMB
// ==========================================
function ensureHeaderLevel5Tab_() {
    const tabs = document.getElementById('header-learning-tabs');
    if (!tabs || document.getElementById('header-level5-tab')) return;

    const tab5 = document.createElement('div');
    tab5.id = 'header-level5-tab';
    tab5.className = 'hidden items-center space-x-1';
    tab5.innerHTML = `
        <span class="text-pink-300 font-bold text-xs">/</span>
        <div class="h-10 px-2.5 bg-sky-50 border border-sky-200 text-sky-700 font-extrabold rounded-xl text-xs md:text-sm truncate shadow-inner flex items-center">
            <span id="header-level5-title" class="truncate">Mục sâu</span>
        </div>`;
    tabs.appendChild(tab5);
}

function ensureCompactHeaderBreadcrumbTabs_() {
    ensureHeaderLevel5Tab_();
    if (document.getElementById('tv2-compact-header-breadcrumb-style')) return;

    const style = document.createElement('style');
    style.id = 'tv2-compact-header-breadcrumb-style';
    style.textContent = `
        /* TV2: breadcrumb tren banner phu.
           Desktop uu tien hien thi DAY DU ten tab theo noi dung thuc te.
           Moi tab tu co gian theo text, gioi han toi da 440px; neu tong qua dai
           thi ca hang breadcrumb cuon ngang thay vi ep moi tab ve 132/158px. */
        #header-learning-tabs {
            width: 100% !important;
            min-width: 0 !important;
            max-width: none !important;
            flex: 1 1 auto !important;
            overflow-x: auto !important;
            overflow-y: hidden !important;
            scrollbar-width: none !important;
        }
        #header-learning-tabs::-webkit-scrollbar { display: none !important; }

        #header-level2-tab,
        #header-level3-tab,
        #header-level4-tab,
        #header-level5-tab {
            width: auto !important;
            min-width: 0 !important;
            max-width: none !important;
            flex: 0 0 auto !important;
            overflow: visible !important;
        }

        #header-level2-tab > button,
        #header-level3-tab > div,
        #header-level4-tab > div,
        #header-level5-tab > div {
            width: auto !important;
            min-width: 0 !important;
            max-width: 440px !important;
            flex: 0 0 auto !important;
            justify-content: flex-start !important;
            overflow: visible !important;
            padding-left: 18px !important;
            padding-right: 18px !important;
        }

        #header-level2-title,
        #header-level3-title,
        #header-level4-title,
        #header-level5-title {
            display: block !important;
            width: auto !important;
            min-width: 0 !important;
            max-width: 400px !important;
            overflow: hidden !important;
            text-overflow: ellipsis !important;
            white-space: nowrap !important;
            font-size: 16px !important;
        }

        #header-level3-tab > span,
        #header-level4-tab > span,
        #header-level5-tab > span {
            flex: 0 0 auto !important;
        }

        /* Mobile van gioi han tab de khong chiem het chieu ngang. */
        @media (max-width: 767px) {
            #header-learning-tabs {
                max-width: 100% !important;
                flex: 1 1 auto !important;
                overflow-x: auto !important;
                overflow-y: hidden !important;
            }
            #header-level2-tab,
            #header-level3-tab,
            #header-level4-tab,
            #header-level5-tab {
                width: 112px !important;
                min-width: 112px !important;
                max-width: 112px !important;
                flex: 0 0 112px !important;
                overflow: hidden !important;
            }
            #header-level2-tab > button,
            #header-level3-tab > div,
            #header-level4-tab > div,
            #header-level5-tab > div {
                width: 100% !important;
                max-width: 100% !important;
                padding-left: 9px !important;
                padding-right: 9px !important;
                overflow: hidden !important;
            }
            #header-level2-title,
            #header-level3-title,
            #header-level4-title,
            #header-level5-title {
                max-width: 100% !important;
                font-size: 16px !important;
                overflow: hidden !important;
                text-overflow: ellipsis !important;
                white-space: nowrap !important;
            }
        }
    `;
    document.head.appendChild(style);
}

function updateNavTabs(level2Title, level2Icon, level3Title, level4Title, level5Title, level6Title) {
    // Hàng 6 tab chuyên đề phía dưới đã thể hiện rõ tab chính đang hoạt động.
    // Vì vậy breadcrumb trên header không lặp lại Khám phá / Bài học / Bài tập /
    // Ôn tập / Đề thi / Mini games. Bốn ô sau Home chỉ dành cho cấp nội dung sâu hơn.
    const mainTabBreadcrumbAliases = {
        discover: ['khám phá'],
        lessons: ['bài học'],
        exercises: ['bài tập'],
        review: ['ôn tập'],
        exams: ['đề thi'],
        games: ['mini game', 'mini games', 'trò chơi']
    };
    const normalizeBreadcrumbLabel = (value) => String(value || '').trim().toLowerCase();
    const aliases = mainTabBreadcrumbAliases[currentMainTab] || [];
    if (level2Title && aliases.includes(normalizeBreadcrumbLabel(level2Title))) {
        level2Title = level3Title || null;
        level2Icon = level2Icon || '🌸';
        level3Title = level4Title || null;
        level4Title = level5Title || null;
        level5Title = level6Title || null;
    }

    ensureCompactHeaderBreadcrumbTabs_();
    const tab2 = document.getElementById('header-level2-tab');
    const tab3 = document.getElementById('header-level3-tab');
    const tab4 = document.getElementById('header-level4-tab');
    const tab5 = document.getElementById('header-level5-tab');
    const homeBtn = document.getElementById('btn-header-home');

    // Mỗi lần dựng breadcrumb mới phải xóa handler của màn trước.
    // Đặc biệt sau khi rời Mục 12, level 2 từng được gán openThoNhacMenu();
    // nếu không reset thì nhãn đã đổi nhưng cú click vẫn quay về kho truyện.
    setBreadcrumbAction_(2, () => returnToTopicLecture(), 'Quay lại mục hiện tại');
    setBreadcrumbAction_(3, null);
    setBreadcrumbAction_(4, null);
    setBreadcrumbAction_(5, null);

    if (level2Title) {
        document.getElementById('header-level2-title').textContent = level2Title;
        document.getElementById('header-level2-icon').textContent = level2Icon || '🌸';
        tab2.classList.remove('hidden');
        tab2.classList.add('flex');
        homeBtn.classList.add('opacity-80', 'hover:opacity-100');
    } else {
        tab2.classList.add('hidden');
        tab2.classList.remove('flex');
        homeBtn.classList.remove('opacity-80');
    }

    if (level3Title) {
        document.getElementById('header-level3-title').textContent = level3Title;
        tab3.classList.remove('hidden');
        tab3.classList.add('flex');

        // Trong cây Khám phá: Khám phá → Chuyên mục → Mục nhỏ.
        // Chuyên mục (level 3, ví dụ "4. Tập đọc") phải bấm được để
        // quay lại màn giới thiệu / danh sách cấp độ của chính chuyên mục đó.
        const level3Box = tab3.querySelector('div');
        if (level3Box && currentMainTab === 'discover' && activeTopicId) {
            level3Box.setAttribute('role', 'button');
            level3Box.setAttribute('tabindex', '0');
            level3Box.setAttribute('title', 'Quay lại chuyên mục');
            level3Box.classList.add('cursor-pointer', 'hover:bg-purple-100', 'transition-colors');
            level3Box.onclick = returnToCurrentDiscoverTopic_;
            level3Box.onkeydown = (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    returnToCurrentDiscoverTopic_();
                }
            };
        } else if (level3Box) {
            level3Box.removeAttribute('role');
            level3Box.removeAttribute('tabindex');
            level3Box.removeAttribute('title');
            level3Box.classList.remove('cursor-pointer', 'hover:bg-purple-100', 'transition-colors');
            level3Box.onclick = null;
            level3Box.onkeydown = null;
        }
    } else {
        const level3Box = tab3.querySelector('div');
        if (level3Box) {
            level3Box.removeAttribute('role');
            level3Box.removeAttribute('tabindex');
            level3Box.removeAttribute('title');
            level3Box.classList.remove('cursor-pointer', 'hover:bg-purple-100', 'transition-colors');
            level3Box.onclick = null;
            level3Box.onkeydown = null;
        }
        tab3.classList.add('hidden');
        tab3.classList.remove('flex');
    }

    if (level4Title && tab4) {
        document.getElementById('header-level4-title').textContent = level4Title;
        tab4.classList.remove('hidden');
        tab4.classList.add('flex');
    } else if (tab4) {
        tab4.classList.add('hidden');
        tab4.classList.remove('flex');
    }

    if (level5Title && tab5) {
        document.getElementById('header-level5-title').textContent = level5Title;
        tab5.classList.remove('hidden');
        tab5.classList.add('flex');
    } else if (tab5) {
        tab5.classList.add('hidden');
        tab5.classList.remove('flex');
    }
}

function updateDiscoverBreadcrumb_(topicTitle = null, topicIcon = '🌸', subTitle = null, leafTitle = null, deepTitle = null) {
    // Breadcrumb nam tren banner phu. Tab chinh da hien o header nen khong lap lai.
    if (currentMainTab === 'review') {
        updateNavTabs('Ôn tập', '🧠', topicTitle || null, subTitle || null, leafTitle || null, deepTitle || null);
        return;
    }
    updateNavTabs('Khám phá', '🧭', topicTitle || null, subTitle || null, leafTitle || null, deepTitle || null);
}

function setBreadcrumbAction_(level, handler, tooltip = '') {
    const tab = document.getElementById(`header-level${level}-tab`);
    if (!tab) return;
    const target = level === 2 ? tab.querySelector('button') : tab.querySelector('div');
    if (!target) return;

    // Xóa handler cũ để breadcrumb không nhảy lùi sai cấp.
    target.onclick = null;
    target.onkeydown = null;
    target.classList.remove('cursor-pointer', 'hover:bg-purple-100', 'hover:bg-amber-100', 'hover:brightness-95', 'transition-colors');
    target.removeAttribute('role');
    target.removeAttribute('tabindex');
    target.removeAttribute('title');

    if (typeof handler !== 'function') return;
    target.setAttribute('role', 'button');
    target.setAttribute('tabindex', '0');
    if (tooltip) target.setAttribute('title', tooltip);
    target.classList.add('cursor-pointer', 'hover:brightness-95', 'transition-colors');
    target.onclick = (e) => {
        e?.preventDefault?.();
        handler();
    };
    target.onkeydown = (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handler();
        }
    };
}

function setFairyBreadcrumbActions_(libraryKey = null, categoryId = null, storyId = null) {
    // Cây truyện sau Home:
    // 2 = Mục 12, 3 = Kho Việt Nam/Thế giới, 4 = Chủ đề/series, 5 = Truyện.
    setBreadcrumbAction_(2, () => openThoNhacMenu(), 'Về Mục 12 - Kho truyện');

    if (libraryKey) {
        setBreadcrumbAction_(3, () => openFairyLibrary_(libraryKey), 'Về kho truyện này');
    } else {
        setBreadcrumbAction_(3, null);
    }

    if (libraryKey && categoryId) {
        setBreadcrumbAction_(4, () => {
            activeFairyLibraryKey_ = libraryKey;
            openFairyCategory_(categoryId);
        }, 'Về chủ đề / series này');
    } else {
        setBreadcrumbAction_(4, null);
    }

    // Tab thứ 4 sau Home là truyện hiện tại. Không cần lùi cấp khi bấm vào chính nó.
    if (storyId) {
        setBreadcrumbAction_(5, () => {
            if (String(activeStoryId_ || '') !== String(storyId)) openThoNhacStory_(storyId);
        }, 'Truyện hiện tại');
    } else {
        setBreadcrumbAction_(5, null);
    }
}

function returnToCurrentDiscoverTopic_() {
    stopSpeaking();
    clearInterval(quizTimerInterval);

    const topicId = Number(activeTopicId || pendingTopicQuiz?.topicNum || 0);
    if (!topicId) {
        goHome();
        return;
    }

    // Truyện cổ tích có màn chuyên biệt riêng; các chủ đề 1-11 đọc từ JSON Khám phá TV2.
    if (topicId === 12) {
        openThoNhacMenu();
        return;
    }
    if (topicId === 13) {
        openSemesterReviewMenu();
        return;
    }

    const cfg = TOPICS_CONFIG.find(t => Number(t.id) === topicId);
    const topicName = pendingTopicQuiz?.topicName || cfg?.title || `Chủ đề ${topicId}`;
    const icon = cfg?.icon || '🌸';
    openTopic(topicId, topicName, icon);
}

// ==========================================
// HỆ THỐNG XÁC THỰC TÀI KHOẢN & LỜI CHÀO ĐÓN
// ==========================================
function switchAuthTab(tab) {
    const isLogin = tab === 'login';
    document.getElementById('form-login').classList.toggle('hidden', !isLogin);
    document.getElementById('form-register').classList.toggle('hidden', isLogin);
    document.getElementById('tab-btn-login').className = `py-2.5 rounded-xl font-extrabold text-sm pastel-btn ${isLogin ? 'bg-white text-pink-600 shadow-sm' : 'text-gray-400'}`;
    document.getElementById('tab-btn-register').className = `py-2.5 rounded-xl font-extrabold text-sm pastel-btn ${!isLogin ? 'bg-white text-pink-600 shadow-sm' : 'text-gray-400'}`;
    hideAuthError();
}

function updateMaHSPreview() {
    const lop = document.getElementById('reg-lop').value.trim().toUpperCase();
    const stt = document.getElementById('reg-stt').value.trim();
    document.getElementById('mahs-preview').textContent = (lop && stt) ? `${lop}-${stt.padStart(2, '0')}` : '--';
}

function showAuthError(msg) {
    const el = document.getElementById('auth-error-msg');
    if (!el) return;
    el.textContent = msg;
    el.classList.remove('hidden');
}
function hideAuthError() { 
    const el = document.getElementById('auth-error-msg');
    if (el) el.classList.add('hidden'); 
}

async function callAppsScript(action, payload = {}, options = {}) {
    if (!tvModuleCtx_ || typeof tvModuleCtx_.apiRequest !== 'function') throw new Error('CLASS2_SHARED_BACKEND_UNAVAILABLE');
    const p = payload || {};
    if (action === 'getLearningProfile') {
        const data = await tvModuleCtx_.apiRequest('learningProfileGet', {subjectId:'tv'}, options);
        return {ok:true, ...data};
    }
    if (action === 'saveLearningBatch') {
        const data = await tvModuleCtx_.apiRequest('learningProfileSaveBatch', {subjectId:'tv', events:Array.isArray(p.events)?p.events:[]}, options);
        return {ok:true, ...data};
    }
    if (action === 'getHistory') {
        const sheet=String(p.sheetName||'');
        if (sheet.includes('HSG')) return {ok:true,data:[],history:[]};
        const kind=sheet.includes('BaiThi')?'baithi':'baitap';
        const semester=sheet.includes('HK2')?'hk2':'hk1';
        const data=await tvModuleCtx_.apiRequest('assessmentHistoryGet',{subjectId:'tv',kind,semester},options);
        return {ok:true, data:data.history||[], history:data.history||[]};
    }
    // Standalone account/admin actions are intentionally not routed from a subject module.
    if (['login','register','restoreSession','logout','listAccounts','updateAccountType','getNewRegistrationsCount','markRegistrationsSeen','saveExamResult','saveWeeklyProgress'].includes(action)) {
        throw new Error('CLASS2_USE_SHARED_SHELL');
    }
    const err = new Error('CLASS2_SUBJECT_ACTION_NOT_SUPPORTED');
    err.code = 'CLASS2_SUBJECT_ACTION_NOT_SUPPORTED';
    throw err;
}

function resetAdaptiveLearningState_() {
    if (adaptiveLearningState.flushTimer) clearTimeout(adaptiveLearningState.flushTimer);
    adaptiveLearningState.loaded = false;
    adaptiveLearningState.loading = false;
    adaptiveLearningState.profile = { v: 1, skills: {}, recent: [] };
    adaptiveLearningState.pending = [];
    adaptiveLearningState.flushTimer = null;
    Object.keys(topic4ReadingSupportState_).forEach(k => delete topic4ReadingSupportState_[k]);
}

function adaptiveQuestionId_(q, topicId = null) {
    const rawId = q?.question_id ?? q?.id;
    if (rawId !== undefined && rawId !== null && String(rawId) !== '' && Number(rawId) !== 0) return String(rawId);
    const t = Number(q?.source_topic_id || topicId || activeTopicId || 0);
    const text = String(q?.question_text || q?.answer || '').trim();
    let h = 2166136261;
    for (let i = 0; i < text.length; i++) { h ^= text.charCodeAt(i); h = Math.imul(h, 16777619); }
    return `${t}-${(h >>> 0).toString(36)}`;
}

function adaptiveLevel_(q) {
    const tags = Array.isArray(q?.tags) ? q.tags.map(x => String(x).toLowerCase()) : [];
    // Tập đọc Topic 4 có 8 cấp độ; các topic cũ vẫn hoạt động như trước vì chỉ trả về cấp có tag thực tế.
    for (let n = 1; n <= 8; n++) {
        if (tags.includes(`level${n}`) || tags.includes(`tap_doc_cap${n}`) || tags.includes(`cap${n}_tap_doc`)) return n;
    }
    const m = String(q?.sub_topic || '').match(/cấp\s*(\d+)/i);
    return m ? Math.max(1, Math.min(8, Number(m[1]) || 1)) : 0;
}

function adaptiveSkillKey_(q, topicId = null) {
    const t = Number(q?.source_topic_id || topicId || activeTopicId || 0);
    const lv = adaptiveLevel_(q);
    const suffix = lv ? `.level${lv}` : '';
    const map = {
        1: 'alphabet', 2: 'tone', 3: 'phonics', 4: 'reading',
        5: 'fill_missing', 6: 'spelling', 7: 'vocabulary', 8: 'word_class',
        9: 'sentence_order', 10: 'reading_comprehension', 11: 'riddle_poetry', 12: 'language_enjoyment', 13: 'review'
    };
    if (!t) {
        const skillMap = { C1:'phonics', C2:'spelling', C3:'vocabulary', C4:'sentence_order', C5:'reading_comprehension', C6:'logic' };
        const raw = String(q?.skill_tag || '').toUpperCase();
        const m = raw.match(/C[1-6]/);
        if (m && skillMap[m[0]]) return skillMap[m[0]];
    }
    return `${map[t] || `topic${t}`}${suffix}`;
}

function adaptiveErrorType_(q, selectedOpt, topicId = null) {
    const t = Number(q?.source_topic_id || topicId || activeTopicId || 0);
    const lv = adaptiveLevel_(q);
    if (t === 1) return 'letter_recognition';
    if (t === 2) return 'tone_error';
    if (t === 3) return 'phonics_error';
    if (t === 5) return 'missing_part_error';
    if (t === 6) return 'spelling_error';
    if (t === 7) return 'word_meaning_error';
    if (t === 8) return 'word_class_error';
    if (t === 9) return 'word_order_error';
    if (t === 10) return lv >= 4 ? 'inference_error' : (lv === 3 ? 'main_idea_error' : 'detail_error');
    if (t === 11) return 'logic_error';
    return 'general_error';
}

function adaptivePracticeSupportKey_(q, topicId = null) {
    return `${adaptiveSkillKey_(q, topicId)}::${adaptiveQuestionId_(q, topicId)}`;
}

function adaptiveDefaultSkill_() {
    return { a:0, c:0, w:0, m:50, st:0, p:0, ind:0, indm:50, last:0, due:0 };
}

function adaptiveApplyLocalEvent_(evt) {
    const profile = adaptiveLearningState.profile || (adaptiveLearningState.profile = { v:1, skills:{}, recent:[] });
    if (!profile.skills) profile.skills = {};
    if (!Array.isArray(profile.recent)) profile.recent = [];
    const key = evt.s;
    const sk = { ...adaptiveDefaultSkill_(), ...(profile.skills[key] || {}) };
    const now = Number(evt.t) || Date.now();
    const support = Math.max(0, Number(evt.u) || 0);
    if (evt.o === 'c' || evt.o === 'w') {
        sk.a += 1;
        if (evt.o === 'c') {
            sk.c += 1;
            sk.st = Math.max(0, Number(sk.st) || 0) + 1;
            const gain = support > 0 ? 3 : 6;
            sk.m = Math.min(100, Math.max(0, Math.round((Number(sk.m) || 50) + gain)));
            const days = sk.st >= 4 ? 14 : (sk.st === 3 ? 7 : (sk.st === 2 ? 3 : 1));
            sk.due = now + days * 86400000;
        } else {
            sk.w += 1;
            sk.st = 0;
            sk.m = Math.min(100, Math.max(0, Math.round((Number(sk.m) || 50) - 10)));
            sk.due = now + 4 * 3600000;
        }
    } else if (evt.o === 'p') {
        sk.p += 1;
        if (support === 0) sk.ind += 1;
        sk.indm = Math.round(((sk.ind + 1) / (sk.p + 2)) * 100);
        sk.due = now + (support > 0 ? 1 : 3) * 86400000;
    }
    sk.last = now;
    profile.skills[key] = sk;
    profile.recent.push(evt);
    if (profile.recent.length > ADAPTIVE_RECENT_LIMIT) profile.recent = profile.recent.slice(-ADAPTIVE_RECENT_LIMIT);
}

async function loadLearningProfile_() {
    if (!currentUser || currentUser.isGuest || currentUser.sessionPending || !getSessionToken()) return;
    if (adaptiveLearningState.loading) return;
    adaptiveLearningState.loading = true;
    try {
        const res = await callAppsScript('getLearningProfile', { maHS: currentUser.maHS, sessionToken: getSessionToken() });
        if (res?.ok) {
            const p = res.profile && typeof res.profile === 'object' ? res.profile : { v:1, skills:{}, recent:[] };
            if (!p.skills || typeof p.skills !== 'object') p.skills = {};
            if (!Array.isArray(p.recent)) p.recent = [];
            adaptiveLearningState.profile = p;
            adaptiveLearningState.loaded = true;
        }
    } catch (e) {
        // Hồ sơ học tập là lớp bổ sung. Mạng lỗi không được làm gián đoạn việc học hoặc đăng xuất.
    } finally {
        adaptiveLearningState.loading = false;
    }
}

function queueLearningEvent_(q, outcome, options = {}) {
    if (!q || !currentUser || currentUser.isGuest || currentUser.sessionPending || !getSessionToken()) return;
    const topicId = Number(q.source_topic_id || options.topicId || activeTopicId || 0);
    const evt = {
        t: Date.now(),
        q: adaptiveQuestionId_(q, topicId),
        s: adaptiveSkillKey_(q, topicId),
        o: outcome === 'wrong' ? 'w' : (outcome === 'practice' ? 'p' : 'c'),
        e: String(options.errorType || ''),
        u: Math.max(0, Math.min(3, Number(options.supportUsed) || 0)),
        l: adaptiveLevel_(q),
        tp: topicId
    };
    adaptiveApplyLocalEvent_(evt);
    adaptiveLearningState.pending.push(evt);
    if (adaptiveLearningState.pending.length > 30) adaptiveLearningState.pending = adaptiveLearningState.pending.slice(-30);
    if (adaptiveLearningState.pending.length >= ADAPTIVE_BATCH_SIZE) {
        flushLearningEvents_();
    } else {
        if (adaptiveLearningState.flushTimer) clearTimeout(adaptiveLearningState.flushTimer);
        adaptiveLearningState.flushTimer = setTimeout(() => flushLearningEvents_(), 6500);
    }
}

async function flushLearningEvents_(force = false) {
    if (adaptiveLearningState.flushTimer) { clearTimeout(adaptiveLearningState.flushTimer); adaptiveLearningState.flushTimer = null; }
    if (!currentUser || currentUser.isGuest || currentUser.sessionPending || !getSessionToken()) return;
    if (!adaptiveLearningState.pending.length) return;
    const count = force ? adaptiveLearningState.pending.length : Math.min(12, adaptiveLearningState.pending.length);
    const batch = adaptiveLearningState.pending.slice(0, count);
    try {
        const res = await callAppsScript('saveLearningBatch', {
            maHS: currentUser.maHS,
            sessionToken: getSessionToken(),
            events: batch
        });
        if (res?.ok) adaptiveLearningState.pending.splice(0, batch.length);
    } catch (e) {
        // Giữ lại batch trong RAM để thử lại ở tương tác sau; không làm gián đoạn bài học.
    }
    if (adaptiveLearningState.pending.length && !force) {
        adaptiveLearningState.flushTimer = setTimeout(() => flushLearningEvents_(), 9000);
    }
}

function adaptiveLatestByQuestion_() {
    const map = new Map();
    const recent = adaptiveLearningState.profile?.recent || [];
    recent.forEach(evt => { if (evt?.q) map.set(String(evt.q), evt); });
    return map;
}

function buildAdaptiveQuestionOrder_(pool, topicNum) {
    const source = Array.isArray(pool) ? pool.slice() : [];
    // Mục 9 (Đọc hiểu): giữ 5 câu của cùng một bài đọc đi liền nhau.
    // Chỉ đổi thứ tự trình bày, không thay câu hỏi, đáp án, chấm điểm hay adaptive profile.
    if (Number(topicNum) === 9 && source.some(q => q?.reading_title && q?.reading_passage)) {
        const groupsByReading = new Map();
        const withoutReading = [];
        source.forEach(q => {
            const readingKey = String(q?.reading_title || '').trim();
            if (!readingKey || !q?.reading_passage) {
                withoutReading.push(q);
                return;
            }
            if (!groupsByReading.has(readingKey)) groupsByReading.set(readingKey, []);
            groupsByReading.get(readingKey).push(q);
        });
        return [...groupsByReading.values()].flatMap(group =>
            group.sort((a, b) => Number(a.question_id || 0) - Number(b.question_id || 0))
        ).concat(withoutReading);
    }
    if (source.length < 3 || !currentUser || currentUser.isGuest || currentUser.sessionPending || !adaptiveLearningState.loaded) return shuffleArray(source);
    const latest = adaptiveLatestByQuestion_();
    const skills = adaptiveLearningState.profile?.skills || {};
    const now = Date.now();
    const buckets = { retry:[], fresh:[], review:[], easy:[] };
    source.forEach(q => {
        const qid = adaptiveQuestionId_(q, topicNum);
        const evt = latest.get(qid);
        const skill = skills[adaptiveSkillKey_(q, topicNum)] || adaptiveDefaultSkill_();
        const row = { q, mastery:Number(skill.m) || 50, r:Math.random() };
        if (evt && (evt.o === 'w' || (evt.o === 'p' && Number(evt.u) > 0))) buckets.retry.push(row);
        else if (!evt) buckets.fresh.push(row);
        else if (Number(skill.due) > 0 && Number(skill.due) <= now) buckets.review.push(row);
        else buckets.easy.push(row);
    });
    Object.values(buckets).forEach(arr => arr.sort((a,b) => (a.mastery - b.mastery) || (a.r - b.r)));
    const pattern = ['fresh','fresh','retry','fresh','review','fresh','easy','retry','review','fresh'];
    const out = [];
    while (out.length < source.length) {
        let moved = false;
        for (const key of pattern) {
            const item = buckets[key].shift();
            if (item) { out.push(item.q); moved = true; }
            if (out.length >= source.length) break;
        }
        if (!moved) {
            for (const key of ['retry','review','fresh','easy']) {
                while (buckets[key].length) out.push(buckets[key].shift().q);
            }
        }
    }
    return out;
}

function recordEvaluationToAdaptive_() {
    if (!currentUser || currentUser.isGuest || (!activeExamContext && !activeRoadmapContext)) return;
    activeQuestionsList.forEach((q, idx) => {
        const selected = userAnswers[idx];
        const ok = selected === q.answer;
        queueLearningEvent_(q, ok ? 'correct' : 'wrong', {
            topicId: q.source_topic_id || activeTopicId,
            errorType: ok ? '' : adaptiveErrorType_(q, selected, q.source_topic_id || activeTopicId)
        });
    });
    flushLearningEvents_();
}

// pagehide standalone removed; module destroy handles cleanup.

async function doLogin() {
    hideAuthError();
    const maHS = (document.getElementById('login-mahs')?.value || '').trim().toUpperCase();
    const maPin = (document.getElementById('login-mapin')?.value || '').trim();
    if (!maHS || !maPin) return showAuthError('Bé nhập đủ mã ID và mã PIN nhé!');
    const btn = document.getElementById('btn-do-login');
    btn.disabled = true; btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-1"></i> Đang đăng nhập...';
    try {
        const result = await callAppsScript('login', { maHS, maPin });
        if (!result.ok) { showAuthError(result.error || 'ID hoặc PIN không đúng!'); return; }
        if (!result.sessionToken) throw new Error('Máy chủ không trả về session token.');
        currentUser = { ...result.student, isGuest: false, sessionPending: false };
        clearStoredSession();
        storeSessionToken(result.sessionToken);
        resetAdaptiveLearningState_();
        loadLearningProfile_();
        document.getElementById('login-mapin').value = '';
        closeAuthScreen();
        enterDashboard();
    } catch (err) { showAuthError('Lỗi kết nối máy chủ: ' + err.message); }
    finally { btn.disabled = false; btn.innerHTML = '<i class="fa-solid fa-right-to-bracket mr-1"></i> Đăng nhập'; }
}

async function doRegister() {
    hideAuthError();
    const hoTen = document.getElementById('reg-hoten').value.trim();
    const ngaySinhRaw = document.getElementById('reg-ngaysinh').value;
    const lop = document.getElementById('reg-lop').value.trim().toUpperCase();
    const soThuTu = document.getElementById('reg-stt').value.trim();
    const maPin = document.getElementById('reg-mapin').value.trim();
    if (!hoTen || !ngaySinhRaw || !lop || !soThuTu || !maPin) return showAuthError('Bé điền đủ tất cả các ô có dấu * nhé!');
    if (!/^\d{6}$/.test(maPin)) return showAuthError('Mã PIN phải gồm đúng 6 chữ số!');
    const [y,m,d] = ngaySinhRaw.split('-');
    const ngaySinh = `${d}-${m}-${y.slice(2)}`;
    const btn = document.getElementById('btn-do-register');
    btn.disabled = true; btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-1"></i> Đang đăng ký...';
    try {
        const result = await callAppsScript('register', { hoTen, ngaySinh, lop, soThuTu, maPin });
        if (!result.ok) { showAuthError(result.error || 'Không đăng ký được.'); return; }
        const actualId = result.student.maHS;
        document.getElementById('login-mahs').value = actualId;
        document.getElementById('login-mapin').value = '';
        document.getElementById('reg-mapin').value = '';
        switchAuthTab('login');
        await showAppDialog(`Đăng ký thành công!\nMã ID của con: ${actualId}\nTài khoản mới là Regular và có thể học nội dung miễn phí ngay.`, { type:'success', title:'Đăng ký thành công', okText:'Đăng nhập ngay' });
    } catch (err) { showAuthError('Lỗi kết nối: ' + err.message); }
    finally { btn.disabled = false; btn.innerHTML = '<i class="fa-solid fa-user-plus mr-1"></i> Đăng ký ngay'; }
}

function makeGuestUser() {
    return { name: 'Khách (Guest)', isGuest: true, tuanHienTai: 1, hoTen: 'Bé Khách', lop: '', maHS: 'KHACH', role: 'guest', vaiTro: 'guest', loaiTaiKhoan: 'guest', sessionPending: false };
}

function makePendingSessionUser() {
    return { name: 'Đang khôi phục phiên', isGuest: false, tuanHienTai: 1, hoTen: 'Đang khôi phục phiên', lop: '', maHS: '', role: 'pending', vaiTro: 'pending', loaiTaiKhoan: 'pending', sessionPending: true };
}

async function tryAutoLogin() {
    const token = getSessionToken();
    if (!token) return 'none';
    try {
        const res = await callAppsScript('restoreSession', { sessionToken: token });
        if (res.ok && res.student) {
            currentUser = { ...res.student, isGuest: false, sessionPending: false };
            resetAdaptiveLearningState_();
            loadLearningProfile_();
            return 'restored';
        }
        // Chỉ xóa token khi chính backend xác nhận token không còn hợp lệ.
        clearStoredSession();
        return 'invalid';
    } catch (e) {
        // Lỗi mạng / Apps Script tạm thời không được phép làm mất phiên.
        return 'network-error';
    }
}

async function retryPendingSessionRestore() {
    if (!getSessionToken() || !currentUser?.sessionPending) return;
    const status = await tryAutoLogin();
    if (status === 'restored') enterDashboard(true);
    else if (status === 'invalid') { currentUser = makeGuestUser(); enterDashboard(true); }
}

async function initializeApp() {
    if (!getSessionToken()) {
        currentUser = makeGuestUser();
        enterDashboard(true);
        closeAuthScreen();
        return;
    }

    // Có token nghĩa là đã có phiên đăng nhập. Trong lúc chưa liên lạc được backend,
    // giữ trạng thái "đang khôi phục" thay vì tự hạ xuống Khách.
    currentUser = makePendingSessionUser();
    enterDashboard(true);

    const status = await tryAutoLogin();
    if (status === 'restored') {
        enterDashboard(true);
    } else if (status === 'invalid') {
        currentUser = makeGuestUser();
        enterDashboard(true);
    } else if (status === 'network-error') {
        currentUser = makePendingSessionUser();
        enterDashboard(true);
    }
    closeAuthScreen();
}

async function logout() {
    try { await flushLearningEvents_(true); } catch (e) {}
    clearInterval(adminNotificationTimer);
    adminNotificationTimer = null;
    adminNewRegistrationCount = 0;
    const token = getSessionToken();
    if (token) {
        try { await callAppsScript('logout', { sessionToken: token }); } catch (e) {}
    }
    // Người dùng đã chủ động bấm Đăng xuất nên xóa token cục bộ dù mạng có lỗi.
    clearStoredSession();
    resetAdaptiveLearningState_();
    currentUser = makeGuestUser();
    enterDashboard(true);
}

function handleGuestMode() { closeAuthScreen(); }

function enterDashboard(isSilent = false) {
    setAppShellRootMode_(true);
    document.getElementById('screen-dashboard').classList.remove('hidden');
    updateUserInfoBox();
    updatePremiumUI();
    startAdminNotificationPolling();
    resetStars();
    renderDashboardGrid();
    if (hasPremiumAccess()) renderExamHubGrid();
    goHome();
    if (!isSilent && currentUser && !currentUser.isGuest) setTimeout(() => {
        const template = GREETINGS_STUDENT[Math.floor(Math.random() * GREETINGS_STUDENT.length)];
        speakVietnamese(template.replace('{name}', currentUser.hoTen), 0.96);
    }, 350);
}

function updateUserInfoBox() {
    const box = document.getElementById('user-info-box');
    if (!box) return;
    if (currentUser?.sessionPending) {
        box.innerHTML = `<div class="flex items-center gap-1.5 text-[11px] font-black text-indigo-600"><i class="fa-solid fa-cloud-arrow-down fa-beat-fade"></i><span>Đang khôi phục phiên...</span></div>`;
    } else if (currentUser && !currentUser.isGuest) {
        const adminBtn = isAdminUser() ? `<button onclick="openAccountManager()" title="Quản lý tài khoản" class="relative h-9 px-3 flex items-center gap-1.5 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-xl border border-purple-200 text-[11px] font-black shadow-sm pastel-btn whitespace-nowrap"><i class="fa-solid fa-users-gear"></i><span class="admin-manage-label">Quản lý</span><span id="admin-new-registration-badge" class="hidden absolute -top-2 -right-2 min-w-[19px] h-[19px] px-1 rounded-full bg-rose-500 text-white text-[10px] leading-[19px] text-center font-black border-2 border-white shadow-md">0</span></button>` : '';
        const tier = isAdminUser() ? 'Admin' : String(currentUser.loaiTaiKhoan || 'regular').toUpperCase();
        box.innerHTML = `<div class="flex items-center gap-1.5"><div class="text-right"><div class="text-pink-600 font-extrabold text-xs md:text-sm leading-tight">${escapeHtml(currentUser.hoTen)}</div><div class="text-gray-500 font-semibold text-[10px]">${escapeHtml(tier)} · ID ${escapeHtml(currentUser.maHS)}</div></div>${adminBtn}<button onclick="logout()" title="Đăng xuất" class="w-8 h-8 flex items-center justify-center bg-rose-100 hover:bg-rose-200 text-rose-500 rounded-xl border border-rose-200 text-xs"><i class="fa-solid fa-right-from-bracket"></i></button></div>`;
    } else {
        box.innerHTML = `<div class="flex items-center gap-1.5"><span class="text-amber-600 font-extrabold text-[11px] mr-0.5">Khách</span><button onclick="openAuthScreen('login')" class="h-9 px-3 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-white text-[11px] font-black shadow-sm pastel-btn">Sign in</button><button onclick="openAuthScreen('register')" class="h-9 px-3 rounded-xl bg-purple-50 text-purple-700 border border-purple-200 text-[11px] font-black shadow-sm pastel-btn">Sign up</button></div>`;
    }
}

function resetStars() {
    starGreenCount = 0; starRedCount = 0;
    const greenEl = document.getElementById('star-green-count'); const redEl = document.getElementById('star-red-count');
    if (greenEl) greenEl.textContent = 0; if (redEl) redEl.textContent = 0;
}

function clickProgressOrExam(type) {
    if (type === 'progress') openRoadmap();
    else if (type === 'exam') openExamHub();
}

// ==========================================
// CHỦ ĐỀ 1: BẢNG CHỮ CÁI TƯƠNG TÁC (1.1 ĐẾN 1.4)
// ==========================================
function openTopic(topicNum, topicName, icon) {
    setAppShellRootMode_(false);
    stopSpeaking();
    activeTopicId = topicNum; activeExamContext = null; activeRoadmapContext = null;
    if (Number(topicNum) !== 12) {
        activeFairyLibraryKey_ = null;
        activeFairyCategoryId_ = null;
        activeStoryId_ = null;
        activeStoryAnswers_ = {};
    }
    updateDiscoverBreadcrumb_(topicName, icon || '🌸', null);

    if (topicNum === 12) {
        openThoNhacMenu();
        return;
    }

    showLoadingOverlay(`Đang tải chủ đề "${topicName}"...`);
    fetchAllTopicsData().then(topics => {
        hideLoadingOverlay();
        const topicObj = topics.find(t => Number(t.topic_id) === Number(topicNum));
        if (!topicObj || !topicObj.questions || !topicObj.questions.length) throw new Error("Chủ đề không có câu hỏi nào");
        showLectureAndSubtopics(topicNum, topicName, topicObj);
    }).catch(err => {
        hideLoadingOverlay();
        showAppDialog(`Không thể tải chủ đề: ${err.message}`, { type:'error' });
    });
}


function openSemesterReviewMenu(keepMainBanner = currentMainTab === 'review') {
    stopSpeaking();
    activeTopicId = 13;
    currentTopicKey = 'semester_review_menu';
    currentTopicName = 'Ôn tập học kỳ';
    if (keepMainBanner) setAppShellRootMode_(true);
    updateNavTabs('Ôn tập', '🧠', 'Ôn tập học kỳ', null);

    showLoadingOverlay('Đang tải kho ôn tập học kỳ...');
    return fetchReviewTopicTV2_().then(topicObj => {
        hideLoadingOverlay();
        if (!topicObj || !Array.isArray(topicObj.questions) || !topicObj.questions.length) {
            throw new Error('Chưa có dữ liệu ôn tập học kỳ');
        }
        showLectureAndSubtopics(13, 'Ôn tập học kỳ', topicObj);
        if (keepMainBanner) setAppShellRootMode_(true);
    }).catch(err => {
        hideLoadingOverlay();
        if (keepMainBanner) setAppShellRootMode_(true);
        showAppDialog(`Không thể tải ôn tập học kỳ: ${err.message}`, { type:'error' });
    });
}

function openLettersSubmenu() {
    setAppShellRootMode_(false);
    stopSpeaking();
    currentTopicKey = 'letters_menu';
    currentTopicName = '1. Bảng chữ cái';
    updateDiscoverBreadcrumb_("1. Bảng chữ cái", "🅰️", null);

    const subtopics = [
        { title: 'Bảng chữ cái', badge: '29 chữ', desc: 'Khám phá 29 chữ cái in hoa, in thường, chữ tập viết và 3 ví dụ trực quan.' },
        { title: '12 Nguyên âm', badge: `${countAlphabetQuizQuestions('nguyen_am_don')} câu`, desc: 'Trò chơi nghe và nhận diện chính xác 12 nguyên âm đơn & đôi.' },
        { title: '17 Phụ âm', badge: `${countAlphabetQuizQuestions('phu_am')} câu`, desc: 'Luyện tập nghe phát âm và tìm đúng 17 phụ âm đơn trong tiếng Việt.' },
        { title: '11 Phụ âm ghép', badge: `${countAlphabetQuizQuestions('phu_am_ghep')} câu`, desc: 'Thử thách nhận diện ch, gh, gi, kh, ng, ngh, nh, ph, qu, th, tr.' }
    ];

    document.getElementById('lecture-title').textContent = "1. Bảng chữ cái tiếng Việt";
    document.getElementById('lecture-content').textContent = "Bé làm quen với 29 chữ cái tiếng Việt, nhận diện chính xác 12 nguyên âm, 17 phụ âm và 11 phụ âm ghép qua các trò chơi nghe âm đoán chữ thật vui nhé!";
    document.getElementById('view-lecture').dataset.audioText = "Chào mừng bé đến với Bảng chữ cái tiếng Việt. Bé hãy chọn một mục bên dưới nhé!";

    let subHtml = '';
    subtopics.forEach((sub, idx) => {
        subHtml += tvChildCardHtml_({
            onclick: `openAlphabetSubmenuItem_(${idx})`,
            title: `${idx + 1}. ${sub.title}`,
            badge: sub.badge,
            description: sub.desc,
            topicNum: 1,
            idx
        });
    });

    setSubtopicGridColumns(subtopics.length);
    document.getElementById('lecture-subtopics-list').innerHTML = subHtml;
    switchAppView('view-lecture');
}

function openAlphabetSubmenuItem_(idx) {
    const i = Number(idx);
    if (i === 0) return renderAlphabetBoard(0);
    if (i === 1) return startAlphabetCategoryQuiz('nguyen_am_don', '12 Nguyên âm');
    if (i === 2) return startAlphabetCategoryQuiz('phu_am', '17 Phụ âm');
    if (i === 3) return startAlphabetCategoryQuiz('phu_am_ghep', '11 Phụ âm ghép');
    return openLettersSubmenu();
}

function renderAlphabetBoard(index = 0) {
    stopSpeaking();
    updateDiscoverBreadcrumb_("1. Bảng chữ cái", "🅰️", "Bảng chữ cái");
    const item = ALPHABET_29_DETAILS[index];

    const row1 = ALPHABET_29_DETAILS.slice(0, 15);
    const row2 = ALPHABET_29_DETAILS.slice(15);

    const renderKeyRow = (arr) => arr.map(l => {
        const idx = ALPHABET_29_DETAILS.indexOf(l);
        const isActive = idx === index;
        const activeCls = isActive ? "bg-rose-500 text-white border-rose-600 shadow-md scale-105" : "bg-white text-gray-700 border-gray-200 hover:border-pink-300";
        return `
          <button class="w-9 h-11 md:w-[48px] md:h-[53px] rounded-xl font-black text-xs md:text-[15px] border-2 transition-all flex flex-col items-center justify-center p-0.5 ${activeCls}" onclick="renderAlphabetBoard(${idx})">
            <span>${l.u}</span>
            <span class="text-[10px] md:text-[11px] opacity-75">${l.l}</span>
          </button>`;
    }).join('');

    const html = `
        <div class="w-full flex flex-col items-center justify-between space-y-2.5">
            <div class="w-full max-w-4xl md:max-w-[62rem] grid grid-cols-1 sm:grid-cols-4 gap-2.5 md:gap-[11px]">
                <div class="p-3 bg-pink-50/70 border-2 border-pink-300 rounded-2xl flex flex-col items-center justify-center shadow-xs text-center">
                    <div class="flex items-baseline space-x-2 mb-1">
                        <span class="text-3xl md:text-[40px] font-black text-rose-600">${item.u}</span>
                        <span class="text-2xl md:text-[33px] font-bold text-pink-500">${item.l}</span>
                        <span class="text-3xl md:text-[33px] font-serif italic text-indigo-600">${item.hw}</span>
                    </div>
                    <span class="text-xs md:text-[13px] font-bold text-purple-700 mb-2">Âm đọc: "${item.sound}"</span>
                    <button onclick="speakVietnamese('${item.sound}')" class="px-3 py-1 md:px-[13px] md:py-[5px] bg-amber-200 hover:bg-amber-300 text-amber-900 rounded-xl text-xs md:text-[13px] font-black pastel-btn shadow-xs flex items-center space-x-1">
                        <i class="fa-solid fa-volume-high"></i><span>Nghe âm</span>
                    </button>
                </div>

                ${item.examples.map(ex => `
                    <div onclick="speakVietnamese('${ex.w}. ${ex.sent}')" class="p-2.5 bg-white hover:bg-pink-50/50 border-2 border-emerald-300 rounded-2xl flex flex-col items-center justify-between text-center cursor-pointer shadow-xs pastel-btn transition-all">
                        <span class="text-2xl md:text-[33px] mb-0.5">${ex.emo}</span>
                        <span class="text-xs md:text-[15px] font-black text-emerald-800">${ex.w}</span>
                        <span class="text-[9px] md:text-[10px] px-2 md:px-[9px] py-0.2 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-full font-bold my-1">${ex.tag}</span>
                        <p class="text-[11px] md:text-[12px] text-gray-600 font-medium italic leading-tight mb-1.5">"${ex.sent}"</p>
                        <button onclick="event.stopPropagation(); speakVietnamese('${ex.w}. ${ex.sent}')" class="px-2.5 md:px-[11px] py-0.5 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-lg text-[10px] md:text-[11px] font-black border border-amber-300">
                            <i class="fa-solid fa-volume-high mr-1"></i>Nghe
                        </button>
                    </div>
                `).join('')}
            </div>

            <div class="w-full max-w-4xl md:max-w-[62rem] bg-white p-2.5 md:p-[11px] rounded-2xl border-2 border-pink-200 shadow-xs flex flex-col items-center space-y-1.5 md:space-y-[7px]">
                <div class="flex flex-wrap justify-center gap-1.5 md:gap-[7px]">${renderKeyRow(row1)}</div>
                <div class="flex flex-wrap justify-center gap-1.5 md:gap-[7px]">${renderKeyRow(row2)}</div>
            </div>
        </div>
    `;

    document.getElementById('question-box').innerHTML = html;
    document.getElementById('quiz-top-bar').classList.add('hidden');
    document.getElementById('quiz-card-header').classList.add('hidden');
    document.getElementById('nav-group-practice').classList.add('hidden');
    document.getElementById('nav-group-exam').classList.add('hidden');

    switchAppView('view-quiz');
    speakVietnamese(`${item.name}, âm đọc là ${item.sound}`);
}

const ALPHABET_QUIZ_TARGET_TOTAL = 30;

function getAlphabetQuizVariantsPerLetter(groupKey) {
    const count = ALPHABET_29_DETAILS.filter(item => item.group === groupKey).length;
    return count ? Math.max(1, Math.ceil(ALPHABET_QUIZ_TARGET_TOTAL / count)) : 1;
}

function countAlphabetQuizQuestions(groupKey) {
    const count = ALPHABET_29_DETAILS.filter(item => item.group === groupKey).length;
    return count * getAlphabetQuizVariantsPerLetter(groupKey);
}

function startAlphabetCategoryQuiz(groupKey, subTitle) {
    stopSpeaking();
    const filtered = ALPHABET_29_DETAILS.filter(item => item.group === groupKey);
    if (!filtered.length) { showAppToast('Đang cập nhật thêm câu hỏi cho phần này bé nhé!', 'info', 2200); return; }

    const variantsPerLetter = getAlphabetQuizVariantsPerLetter(groupKey);

    let questions = [];
    filtered.forEach((item, itemIdx) => {
        const correctStr = `${item.u} ${item.l}`;
        const wrongLetterPool = ALPHABET_29_DETAILS.filter(x => x.u !== item.u).map(x => `${x.u} ${x.l}`);
        const exampleWord = item.examples[0]?.w || '';

        for (let v = 0; v < variantsPerLetter; v++) {
            questions.push({
                question_id: 110000 + (groupKey === 'nguyen_am_don' ? 0 : (groupKey === 'phu_am' ? 10000 : 20000)) + itemIdx * 10 + v,
                sub_topic: subTitle,
                question_text: `Bé hãy lắng nghe âm đọc của cô Thỏ Ngọc rồi chọn chữ cái đúng nhé!`,
                options: buildTrickyChoices(correctStr, wrongLetterPool, wrongLetterPool, 3),
                answer: correctStr,
                audio_text: `Bé hãy tìm chữ ${item.u}, âm đọc là ${item.sound}`,
                skill_tag: 'C1',
                diem: 0.5,
                render_style: 'letter_listen',
                mascot_text: 'Chữ cái nào vừa phát ra âm thanh vậy bé ơi?',
                explanation: `Chữ ${item.u} (${item.l}) có âm đọc là "${item.sound}". Ví dụ: ${exampleWord}.`
            });
        }
    });

    questions = shuffleArray(questions);

    updateDiscoverBreadcrumb_("1. Bảng chữ cái", "🅰️", subTitle);
    startTopicQuiz(1, subTitle, questions, subTitle);
}

function setSubtopicGridColumns(count) {
    const el = document.getElementById('lecture-subtopics-list');
    if (!el) return;
    el.className = count > 6
        ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 w-full max-w-6xl'
        : 'grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 w-full max-w-5xl';
}


// ==========================================
// CHỦ ĐỀ 12: TRUYỆN DÂN GIAN & CỔ TÍCH - 2 JSON RIÊNG
// - 12.1 Việt Nam: 120 truyện, chia theo chủ đề/series.
// - 12.2 Thế giới: 120 truyện, ưu tiên series Grimm, Andersen, A Phàm Đề,
//   Nghìn lẻ một đêm; phần còn lại là ngụ ngôn và các truyện nổi tiếng.
// - Dữ liệu truyện nằm ngoài kho_hoc_tieng_viet_part2.json để module nhẹ và tái sử dụng TV2-TV3.
// - 2 JSON là lõi dùng chung TV2-TV3: nội dung + bộ câu hỏi dùng nguyên bản cho cả 3 app.
// - Tên mascot/TTS do app.js của từng chương trình quyết định.
// ==========================================
/* Child learning cards share the icon/heading/divider/badge language of Explore. */
function tvChildIcon_(topicNum, title, idx = 0) {
    const norm = String(title || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\u0111/g, 'd').toLowerCase();
    const semantic = [
        [/nguyen am/, '\u{1F170}\uFE0F'],
        [/phu am ghep/, '\u{1F9E9}'],
        [/phu am/, '\u{1F5E3}\uFE0F'],
        [/bang chu cai/, '\u{1F524}'],
        [/phuc tap|nang cao/, '\u{1F9E0}'],
        [/thanh co ban|nhan biet thanh/, '\u{1F3BC}'],
        [/phan biet thanh/, '\u{1F3A7}'],
        [/nghe|am thanh/, '\u{1F50A}'],
        [/ghep|van/, '\u{1F9E9}'],
        [/chinh ta|sua loi/, '\u{1FA7A}'],
        [/dien tu|dien chu/, '\u{270D}\uFE0F'],
        [/doc hieu/, '\u{1F4D6}'],
        [/doc|truyen/, '\u{1F4DA}'],
        [/tu vung|tu loai/, '\u{1F33F}'],
        [/cau|sap xep/, '\u{1F9E0}'],
        [/do vui|cau do/, '\u{1F3AF}'],
        [/dong vat|thu vat|con vat/, '\u{1F43B}'],
        [/co tich|than ky/, '\u{1FA84}'],
        [/ngu ngon/, '\u{1F4A1}'],
        [/viet nam/, '\u{1F1FB}\u{1F1F3}'],
        [/the gioi/, '\u{1F30D}'],
        [/gia dinh/, '\u{1F3E1}'],
        [/thien nhien/, '\u{1F33C}'],
        [/hoc ky|on tap/, '\u{1F4DD}'],
        [/ngau nhien|tron/, '\u{1F3B2}']
    ];
    for (const [pattern, icon] of semantic) if (pattern.test(norm)) return icon;
    const byTopic = {
        1: ['🔤', '✍️', '📖', '🏠'],
        2: ['⚔️', '🔤', '👂', '🛡️'],
        3: ['🔮', '🎵', '🧩', '📚'],
        4: ['🌿', '📚', '💡', '🧸'],
        5: ['🌳', '🏃', '🎨', '🧩'],
        6: ['🖊️', '🧩', '📝', '📖'],
        7: ['💬', '🗣️', '📚', '💡'],
        8: ['🤝', '✉️', '💌', '🗣️'],
        9: ['📖', '🔎', '💡', '🧠'],
        10: ['🧩', '🎯', '💡', '🧠'],
        11: ['📚', '📝', '🎲', '🌟'],
        12: ['📖', '📚', '🧚', '🌍']
    };
    const icons = byTopic[Number(topicNum)] || ['\u{1F4D8}', '\u{1F31F}', '\u{1F4A1}', '\u{1F4D7}'];
    return icons[Math.abs(Number(idx) || 0) % icons.length];
}

/* Dòng mô tả thẻ con lớp 2: ưu tiên dữ liệu thật, chỉ dùng tóm tắt có sẵn
   từ TOPICS_CONFIG khi nhóm câu hỏi chưa có mô tả riêng. */
function tvChildCardDescription_(topicNum, title, description) {
    if (String(description || '').trim()) return String(description).trim();
    const label = String(title || '').toLowerCase();
    if (Number(topicNum) === 12) return 'Nghe kể chuyện và luyện đọc hiểu cùng bé.';
    const mainTopic = TOPICS_CONFIG.find(t => Number(t.id) === Number(topicNum));
    return String(mainTopic?.desc || 'Chọn mục để bắt đầu luyện tập.');
}

function tvChildCardHtml_({ onclick, title, badge = '', description = '', icon = '', topicNum = 0, idx = 0, classes = '', hideDescription = false }) {
    // Tai su dung dung cau truc the hoc con trong ta_app(7).js:
    // icon + tieu de, ngan duoi co mo ta + so cau; chi hoat anh icon, the dung yen.
    const tone = ['pink', 'violet', 'sky', 'fuchsia', 'mint', 'peach'][Math.abs(Number(idx) || 0) % 6];
    const selectedIcon = icon || tvChildIcon_(topicNum, title, idx);
    const text = hideDescription ? '' : tvChildCardDescription_(topicNum, title, description);
    return `<button type="button" onclick="${escapeHtml(onclick)}" class="tv2-child-card tv2-learning-card tv2-learning-card--${tone}${classes ? ` ${classes}` : ''}">
      <span class="tv2-learning-top">
        <span class="tv2-learning-icon" aria-hidden="true"><span class="tv2-learning-icon-glyph">${escapeHtml(selectedIcon)}</span></span>
        <span class="tv2-learning-heading"><span class="tv2-learning-title">${escapeHtml(title)}</span></span>
      </span>
      <span class="tv2-learning-bottom">
        ${hideDescription ? '' : `<span class="tv2-learning-details"><span class="tv2-learning-desc-en">${escapeHtml(text)}</span></span>`}
        ${badge !== '' ? `<span class="tv2-learning-badge">${escapeHtml(badge)}</span>` : ''}
      </span>
    </button>`;
}

const STORY_NARRATOR_NAME = 'Cô Thỏ Ngọc';
let activeThoNhacTopic_ = null; // giữ tên biến cũ để tương thích các lời gọi hiện có
let activeFairyConfig_ = null;
const activeFairyLibraries_ = { vietnam: null, world: null };
let activeFairyLibraryKey_ = null;
let activeFairyCategoryId_ = null;
let activeStoryId_ = null;
let activeStoryAnswers_ = {};

const FAIRY_LIBRARY_META_ = {
    vietnam: {
        label: '1. Truyện dân gian & cổ tích Việt Nam',
        shortLabel: 'Việt Nam',
        flag: '🇻🇳',
        color: 'rose',
        fallbackFile: 'truyen_dan_gian_co_tich_viet_nam_120.json',
        fallbackCount: 120
    },
    world: {
        label: '2. Truyện dân gian & cổ tích thế giới',
        shortLabel: 'Thế giới',
        flag: '🌍',
        color: 'purple',
        fallbackFile: 'truyen_dan_gian_co_tich_the_gioi_120.json',
        fallbackCount: 120
    }
};

function setFairyLectureLayout_(mode = 'normal') {
    const view = document.getElementById('view-lecture');
    if (!view) return;
    const mainWrap = view.querySelector(':scope > div:first-child');
    const contentEl = document.getElementById('lecture-content');
    const contentWrap = contentEl?.parentElement || null;
    const listEl = document.getElementById('lecture-subtopics-list');
    const listWrap = listEl?.parentElement || null;

    // TV1 uses a full-width lecture inner wrapper for the story/category grid.
    // TV2 keeps max-w-4xl for ordinary lessons; release it only for story lists.
    const isFairyGrid = mode === 'categories' || mode === 'story-list';
    listEl?.classList.toggle('tv-fairy-card-grid', isFairyGrid);
    mainWrap?.classList.toggle('max-w-4xl', !isFairyGrid);

    if (mode === 'normal') {
        view.style.minHeight = '';
        view.style.paddingTop = '';
        view.style.paddingBottom = '';
        view.style.justifyContent = '';
        if (mainWrap) mainWrap.style.maxWidth = '';
        if (contentEl) {
            contentEl.style.whiteSpace = '';
            contentEl.style.lineHeight = '';
            contentEl.style.margin = '';
            contentEl.style.padding = '';
            contentEl.style.width = '';
        }
        if (contentWrap) {
            contentWrap.style.display = '';
            contentWrap.style.padding = '';
            contentWrap.style.marginBottom = '';
            contentWrap.style.background = '';
            contentWrap.style.border = '';
            contentWrap.style.height = '';
            contentWrap.style.minHeight = '';
            contentWrap.style.alignItems = '';
            contentWrap.style.justifyContent = '';
        }
        if (listWrap) {
            listWrap.style.paddingTop = '';
            listWrap.style.borderTopWidth = '';
        }
        return;
    }

    // Module truyện dùng HTML động bên trong <p id="lecture-content">.
    // Tắt white-space: pre-line để các xuống dòng trong template không tạo khoảng trắng lớn.
    if (contentEl) {
        contentEl.style.whiteSpace = 'normal';
        contentEl.style.lineHeight = 'normal';
        contentEl.style.margin = '0';
        contentEl.style.padding = '0';
        contentEl.style.width = '100%';
    }

    view.style.minHeight = '0px';
    view.style.paddingTop = '4px';
    view.style.paddingBottom = '4px';
    view.style.justifyContent = 'flex-start';
    if (mainWrap) mainWrap.style.maxWidth = '100%';
    if (listWrap) {
        listWrap.style.paddingTop = '2px';
        listWrap.style.borderTopWidth = '0px';
    }

    if (contentWrap) {
        if (mode === 'categories' || mode === 'story-list') {
            contentWrap.style.display = 'none';
        } else {
            contentWrap.style.display = mode === 'home' ? 'flex' : '';
            contentWrap.style.padding = mode === 'story' ? '0px' : (mode === 'home' ? '2px 8px' : '4px 8px');
            contentWrap.style.marginBottom = mode === 'story' ? '2px' : '2px';
            contentWrap.style.minHeight = '0px';
            contentWrap.style.height = mode === 'home' ? (window.innerWidth < 640 ? '104px' : '92px') : '';
            contentWrap.style.alignItems = mode === 'home' ? 'center' : '';
            contentWrap.style.justifyContent = mode === 'home' ? 'center' : '';
            if (mode === 'story') {
                contentWrap.style.background = 'transparent';
                contentWrap.style.border = '0';
            } else {
                contentWrap.style.background = '';
                contentWrap.style.border = '';
            }
        }
    }
}

function setLectureUtilityVisibility_(showSpeak = true, showMix = true) {
    const view = document.getElementById('view-lecture');
    if (!view) return;
    const speakBtn = view.querySelector('button[onclick="speakLecture()"]');
    if (speakBtn) speakBtn.classList.toggle('hidden', !showSpeak);
    const bottomWrap = view.querySelector(':scope > div:last-child');
    if (bottomWrap) bottomWrap.classList.toggle('hidden', !showMix);
    if (showSpeak || showMix) setFairyLectureLayout_('normal');
}

async function getFairyConfig_() {
    if (activeFairyConfig_) return activeFairyConfig_;
    try {
        const topics = await fetchAllTopicsData();
        activeFairyConfig_ = topics.find(t => Number(t.topic_id) === 12) || {};
    } catch (e) {
        activeFairyConfig_ = {};
    }
    return activeFairyConfig_;
}

function fairyDataFile_(libraryKey, cfg = activeFairyConfig_ || {}) {
    if (libraryKey === 'vietnam') {
        return cfg.vietnam_data_file || cfg.data_files?.vietnam || FAIRY_LIBRARY_META_.vietnam.fallbackFile;
    }
    return cfg.world_data_file || cfg.data_files?.world || FAIRY_LIBRARY_META_.world.fallbackFile;
}

async function loadFairyLibrary_(libraryKey) {
    if (!FAIRY_LIBRARY_META_[libraryKey]) throw new Error('Kho truyện không hợp lệ');
    if (activeFairyLibraries_[libraryKey]) return activeFairyLibraries_[libraryKey];
    if (!combinedFairyLibraryCacheTV2_) {
        const res=await fetch(`${CLASS2_TV_DATA_ROOT}truyen_co_tich.json`,{cache:'no-store'});
        if(!res.ok) throw new Error('Không thể tải kho truyện dùng chung');
        combinedFairyLibraryCacheTV2_=await res.json();
    }
    const data=combinedFairyLibraryCacheTV2_[libraryKey];
    if(!data||!Array.isArray(data.categories)||!Array.isArray(data.stories)) throw new Error('Kho truyện không đúng cấu trúc');
    activeFairyLibraries_[libraryKey]=data; return data;
}

function fairyStoryCount_(libraryKey, cfg = activeFairyConfig_ || {}) {
    if (libraryKey === 'vietnam') return Number(cfg.vietnam_count || FAIRY_LIBRARY_META_.vietnam.fallbackCount);
    return Number(cfg.world_count || FAIRY_LIBRARY_META_.world.fallbackCount);
}

function fairyCategoryById_(data, categoryId) {
    return (data?.categories || []).find(c => String(c.id) === String(categoryId)) || null;
}

function fairyStoriesInCategory_(data, categoryId) {
    return (data?.stories || []).filter(s => String(s.category_id) === String(categoryId));
}

function fairyStoryById_(data, storyId) {
    return (data?.stories || []).find(s => String(s.id) === String(storyId)) || null;
}

async function openThoNhacMenu() {
    stopSpeaking();
    activeTopicId = 12;
    activeExamContext = null;
    activeRoadmapContext = null;
    pendingTopicQuiz = null;
    activeFairyLibraryKey_ = null;
    activeFairyCategoryId_ = null;
    activeStoryId_ = null;
    activeStoryAnswers_ = {};

    updateDiscoverBreadcrumb_('12. Truyện dân gian & cổ tích', '📚', null);
    setLectureUtilityVisibility_(false, false);

    showLoadingOverlay('Đang mở thư viện truyện...');
    try {
        const cfg = await getFairyConfig_();
        renderFairyHome_(cfg);
        switchAppView('view-lecture');
    } catch (err) {
        showAppDialog(`Không thể mở thư viện truyện: ${err.message}`, { type: 'error' });
    } finally {
        hideLoadingOverlay();
    }
}

function renderFairyHome_(cfg = {}) {
    setFairyLectureLayout_('home');
    const vnCount = fairyStoryCount_('vietnam', cfg);
    const worldCount = fairyStoryCount_('world', cfg);
    const titleEl = document.getElementById('lecture-title');
    const contentEl = document.getElementById('lecture-content');
    const listEl = document.getElementById('lecture-subtopics-list');

    if (titleEl) titleEl.textContent = '12. Truyện dân gian & cổ tích';
    if (contentEl) {
        contentEl.innerHTML = `
            <div class="max-w-4xl mx-auto text-center leading-tight py-0">
                <div class="font-black text-purple-700 text-xl md:text-2xl">Thư viện kể chuyện của ${STORY_NARRATOR_NAME}</div>
                <div class="text-sm md:text-[15px] text-slate-600 font-extrabold mt-0.5">${vnCount + worldCount} truyện · nghe kể · hiểu chuyện · trả lời 3 câu hỏi</div>
            </div>`;
    }
    const lectureView = document.getElementById('view-lecture');
    if (lectureView) lectureView.dataset.audioText = '';
    if (!listEl) return;

    setSubtopicGridColumns(2);
    listEl.innerHTML = [
        tvChildCardHtml_({
            onclick: "openFairyLibrary_('vietnam')", title: '1. Truy\u1ec7n d\u00e2n gian & c\u1ed5 t\u00edch Vi\u1ec7t Nam',
            badge: `${vnCount} truy\u1ec7n`, description: 'Ch\u1ecdn ch\u1ee7 \u0111\u1ec1 tr\u01b0\u1edbc, r\u1ed3i nghe t\u1eebng c\u00e2u chuy\u1ec7n.',
            icon: '\u{1F1FB}\u{1F1F3}', topicNum: 12, idx: 0
        }),
        tvChildCardHtml_({
            onclick: "openFairyLibrary_('world')", title: '2. Truy\u1ec7n d\u00e2n gian & c\u1ed5 t\u00edch th\u1ebf gi\u1edbi',
            badge: `${worldCount} truy\u1ec7n`, description: '\u01afu ti\u00ean theo series, sau \u0111\u00f3 l\u00e0 c\u00e1c nh\u00f3m truy\u1ec7n n\u1ed5i ti\u1ebfng.',
            icon: '\u{1F30D}', topicNum: 12, idx: 1
        })
    ].join('');
}

async function openFairyLibrary_(libraryKey) {
    setAppShellRootMode_(false);
    stopSpeaking();
    const meta = FAIRY_LIBRARY_META_[libraryKey];
    if (!meta) return;
    activeFairyLibraryKey_ = libraryKey;
    activeFairyCategoryId_ = null;
    activeStoryId_ = null;
    activeStoryAnswers_ = {};

    showLoadingOverlay(`Đang tải kho truyện ${meta.shortLabel}...`);
    try {
        const data = await loadFairyLibrary_(libraryKey);
        renderFairyCategories_(libraryKey, data);
        switchAppView('view-lecture');
    } catch (err) {
        showAppDialog(`Không thể mở kho truyện ${meta.shortLabel}: ${err.message}`, { type: 'error' });
    } finally {
        hideLoadingOverlay();
    }
}

function renderFairyCategories_(libraryKey, data) {
    setLectureUtilityVisibility_(false, false);
    setFairyLectureLayout_('categories');
    const meta = FAIRY_LIBRARY_META_[libraryKey];
    const titleEl = document.getElementById('lecture-title');
    const contentEl = document.getElementById('lecture-content');
    const listEl = document.getElementById('lecture-subtopics-list');
    const total = Number(data?.meta?.total_stories || data?.stories?.length || meta.fallbackCount);

    updateDiscoverBreadcrumb_('12. Truyện dân gian & cổ tích', '📚', meta.label.replace(/^[12]\.\s*/, ''));
    setFairyBreadcrumbActions_(libraryKey, null, null);
    if (titleEl) titleEl.textContent = meta.label;
    if (contentEl) contentEl.innerHTML = '';
    const lectureView = document.getElementById('view-lecture');
    if (lectureView) lectureView.dataset.audioText = '';
    if (!listEl) return;

    const categories = Array.isArray(data?.categories) ? data.categories : [];
    setSubtopicGridColumns(categories.length);
    listEl.classList.add('tv-fairy-card-grid'); // helper reset className; giu class rieng cua Muc 12.
    listEl.innerHTML = categories.map((cat, idx) => {
        const count = Number(cat.story_count || fairyStoriesInCategory_(data, cat.id).length || 0);
        return tvChildCardHtml_({
            onclick: `openFairyCategory_(${JSON.stringify(String(cat.id))})`,
            title: cat.name || 'Ch\u1ee7 \u0111\u1ec1 truy\u1ec7n',
            description: cat.description || '',
            badge: `${count} truy\u1ec7n`,
            topicNum: 12,
            idx
        });
    }).join('') + `
        <button onclick="openThoNhacMenu()" class="sm:col-span-2 lg:col-span-4 py-2 bg-slate-50 border border-slate-200 text-slate-600 rounded-xl text-xs font-black pastel-btn">\u2190 Hai kho truy\u1ec7n</button>`;
}

async function openFairyCategory_(categoryId) {
    setAppShellRootMode_(false);
    stopSpeaking();
    if (!activeFairyLibraryKey_) return openThoNhacMenu();
    const data = await loadFairyLibrary_(activeFairyLibraryKey_);
    const cat = fairyCategoryById_(data, categoryId);
    if (!cat) return;
    activeFairyCategoryId_ = String(categoryId);
    activeStoryId_ = null;
    activeStoryAnswers_ = {};
    renderFairyStoryList_(activeFairyLibraryKey_, data, cat);
}

function renderFairyStoryList_(libraryKey, data, cat) {
    setLectureUtilityVisibility_(false, false);
    setFairyLectureLayout_('story-list');
    const meta = FAIRY_LIBRARY_META_[libraryKey];
    const items = fairyStoriesInCategory_(data, cat.id);
    const titleEl = document.getElementById('lecture-title');
    const contentEl = document.getElementById('lecture-content');
    const listEl = document.getElementById('lecture-subtopics-list');

    updateDiscoverBreadcrumb_('12. Truyện dân gian & cổ tích', '📚', meta.label.replace(/^[12]\.\s*/, ''), cat.name || 'Danh sách truyện');
    setFairyBreadcrumbActions_(libraryKey, cat.id, null);
    if (titleEl) titleEl.textContent = cat.name || 'Danh sách truyện';
    if (contentEl) contentEl.innerHTML = '';
    const lectureView = document.getElementById('view-lecture');
    if (lectureView) lectureView.dataset.audioText = '';
    if (!listEl) return;

    setSubtopicGridColumns(items.length);
    listEl.classList.add('tv-fairy-card-grid'); // helper reset className; giu class rieng cua Muc 12.
    listEl.innerHTML = items.map((story, idx) => tvChildCardHtml_({
        onclick: `openThoNhacStory_(${JSON.stringify(String(story.id))})`,
        title: story.title || 'C\u00e2u chuy\u1ec7n',
        description: story.theme || '',
        badge: `${idx + 1} / ${items.length}`,
        icon: ['\u{1F4D6}', '\u{1F4D5}', '\u{1F4D7}', '\u{1F4D8}'][idx % 4],
        topicNum: 12,
        idx
    })).join('') + `
        <button onclick="openFairyLibrary_('${libraryKey}')" class="sm:col-span-2 lg:col-span-4 py-2 bg-slate-50 border border-slate-200 text-slate-600 rounded-xl text-xs font-black pastel-btn">\u2190 C\u00e1c ch\u1ee7 \u0111\u1ec1 / series</button>`;
}

function splitStoryParagraphs_(content) {
    return String(content || '')
        .split(/\n+/)
        .map(p => p.trim())
        .filter(Boolean);
}

async function openThoNhacStory_(storyId) {
    setAppShellRootMode_(false);
    stopSpeaking();
    // Ghi lại epoch ngay sau khi dừng audio cũ. Nếu người dùng chuyển tab/view
    // trong lúc JSON đang tải, stopSpeaking() ở nơi mới sẽ làm epoch thay đổi.
    const storyOpenEpoch = speechStopEpoch_;
    const requestedLibraryKey = activeFairyLibraryKey_;
    if (!requestedLibraryKey) return openThoNhacMenu();
    const data = await loadFairyLibrary_(requestedLibraryKey);
    if (storyOpenEpoch !== speechStopEpoch_ || requestedLibraryKey !== activeFairyLibraryKey_) return;
    const story = fairyStoryById_(data, storyId);
    if (!story) return;

    activeStoryId_ = String(story.id);
    activeFairyCategoryId_ = String(story.category_id);
    activeStoryAnswers_ = {};

    const cat = fairyCategoryById_(data, story.category_id) || { id: story.category_id, name: 'Danh sách truyện' };
    const groupItems = fairyStoriesInCategory_(data, story.category_id);
    const pos = Math.max(0, groupItems.findIndex(s => String(s.id) === String(story.id)));
    const prevStory = groupItems[pos > 0 ? pos - 1 : groupItems.length - 1] || story;
    const nextStory = groupItems[pos < groupItems.length - 1 ? pos + 1 : 0] || story;
    const meta = FAIRY_LIBRARY_META_[activeFairyLibraryKey_];

    updateDiscoverBreadcrumb_(
        '12. Truyện dân gian & cổ tích',
        '📚',
        meta.label.replace(/^[12]\.\s*/, ''),
        cat.name || meta.shortLabel,
        story.title || 'Câu chuyện'
    );
    setFairyBreadcrumbActions_(activeFairyLibraryKey_, cat.id, story.id);
    setLectureUtilityVisibility_(false, false);
    setFairyLectureLayout_('story');

    const titleEl = document.getElementById('lecture-title');
    const contentEl = document.getElementById('lecture-content');
    const listEl = document.getElementById('lecture-subtopics-list');
    if (titleEl) titleEl.textContent = story.title || 'Câu chuyện';

    const paragraphs = splitStoryParagraphs_(story.content);
    const sourceLine = [story.series, story.source_family, story.country].filter(Boolean).join(' · ');
    if (contentEl) {
        contentEl.innerHTML = `
            <div class="max-w-5xl mx-auto rounded-2xl bg-gradient-to-br from-white via-pink-50/30 to-purple-50/40 border-2 border-purple-100 px-3 md:px-4 py-2.5 shadow-sm text-left">
                <div class="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-2 mb-1.5">
                    <div class="min-w-0">
                        <div class="font-black text-xl md:text-2xl text-purple-800 leading-tight">${escapeHtml(story.title || '')}</div>
                        <div class="mt-0.5 flex flex-wrap gap-1.5 text-[12px] md:text-[13px] font-extrabold">
                            <span class="px-2.5 py-1 rounded-full bg-white border border-purple-100 text-purple-600 leading-none">${escapeHtml(cat.name || '')}</span>
                            ${story.theme ? `<span class="px-2.5 py-1 rounded-full bg-white border border-amber-100 text-amber-700 leading-none">${escapeHtml(story.theme)}</span>` : ''}
                        </div>
                    </div>
                    <button onclick="speakActiveFairyStory_()" class="shrink-0 px-3 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white text-sm md:text-base font-black shadow-sm pastel-btn flex items-center justify-center gap-1.5">
                        <i class="fa-solid fa-volume-high text-base md:text-lg"></i><span class="hidden sm:inline">Nghe ${STORY_NARRATOR_NAME} kể</span><span class="sm:hidden">Nghe kể</span>
                    </button>
                </div>
                <div class="max-h-[56vh] overflow-y-auto pr-1 story-reader-scroll">
                    <div class="text-[16px] md:text-[17px] leading-[1.6] text-slate-800 font-semibold select-text">
                        ${paragraphs.map(p => `<p class="mb-1.5 last:mb-0">${escapeHtml(p)}</p>`).join('')}
                    </div>
                    ${sourceLine ? `<div class="mt-2 pt-1.5 border-t border-purple-100 text-xs md:text-[13px] text-slate-500 font-semibold">${escapeHtml(sourceLine)}</div>` : ''}
                    <div id="story-comprehension-box" class="mt-2">${renderStoryQuestions_(story)}</div>
                </div>
            </div>`;
    }

    const lectureView = document.getElementById('view-lecture');
    if (lectureView) lectureView.dataset.audioText = `${story.title || ''}. ${story.content || ''}`;

    if (listEl) {
        listEl.className = 'grid grid-cols-3 gap-2 w-full max-w-2xl';
        listEl.innerHTML = `
            <button onclick="openThoNhacStory_('${String(prevStory.id).replace(/'/g, "\\'")}')" class="h-[44px] px-3 py-2 bg-gradient-to-r from-white to-purple-50 border-2 border-purple-200 text-purple-700 rounded-xl text-sm md:text-base font-black pastel-btn shadow-sm flex items-center justify-center gap-2 whitespace-nowrap"><span class="text-lg md:text-xl leading-none">←</span><span>Truyện trước</span></button>
            <button onclick="openFairyCategory_('${String(cat.id).replace(/'/g, "\\'")}')" class="h-[44px] px-3 py-2 bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 text-purple-700 rounded-xl text-sm md:text-base font-black pastel-btn shadow-sm flex items-center justify-center whitespace-nowrap"><span>${pos + 1} / ${groupItems.length}</span></button>
            <button onclick="openThoNhacStory_('${String(nextStory.id).replace(/'/g, "\\'")}')" class="h-[44px] px-3 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl text-sm md:text-base font-black pastel-btn shadow-md flex items-center justify-center gap-2 whitespace-nowrap"><span>Truyện sau</span><span class="text-lg md:text-xl leading-none">→</span></button>`;
    }

    // Mở truyện là mascot của app kể ngay; đổi Trước/Sau cũng tự đọc truyện mới.
    // Chỉ tự đọc nếu người dùng vẫn đang ở đúng trang truyện. Nếu đã chuyển tab/view,
    // epoch đã thay đổi và tuyệt đối không được bật audio trở lại.
    const storyLectureView = document.getElementById('view-lecture');
    const stillOnThisStory = storyOpenEpoch === speechStopEpoch_
        && requestedLibraryKey === activeFairyLibraryKey_
        && String(activeStoryId_ || '') === String(story.id)
        && currentMainTab === 'discover'
        && storyLectureView && !storyLectureView.classList.contains('hidden');
    if (stillOnThisStory) speakVietnamese(`${story.title || ''}. ${story.content || ''}`, 0.94);
}

async function speakActiveFairyStory_() {
    if (!activeFairyLibraryKey_ || !activeStoryId_) return;
    // Dừng audio hiện tại trước, đồng thời tạo một mốc yêu cầu đọc mới.
    stopSpeaking();
    const storySpeakEpoch = speechStopEpoch_;
    const requestedLibraryKey = activeFairyLibraryKey_;
    const requestedStoryId = String(activeStoryId_);
    const data = await loadFairyLibrary_(requestedLibraryKey);
    if (storySpeakEpoch !== speechStopEpoch_) return;
    const story = fairyStoryById_(data, requestedStoryId);
    if (!story) return;
    const lectureView = document.getElementById('view-lecture');
    if (requestedLibraryKey !== activeFairyLibraryKey_
        || requestedStoryId !== String(activeStoryId_ || '')
        || currentMainTab !== 'discover'
        || !lectureView || lectureView.classList.contains('hidden')) return;
    speakVietnamese(`${story.title || ''}. ${story.content || ''}`, 0.94);
}

function getStoryQuestions_(story) {
    // Chuẩn dùng chung TV2-TV2-TV3: mỗi truyện chỉ có một bộ questions.
    if (Array.isArray(story?.questions)) return story.questions;
    // Fallback tạm để app vẫn mở được JSON cũ nếu cache chưa cập nhật.
    return Array.isArray(story?.questions_tv2) ? story.questions_tv2 : [];
}

function renderStoryQuestions_(story) {
    const qs = getStoryQuestions_(story);
    if (!qs.length) return '';
    return `
        <div class="pt-2 border-t border-purple-100">
            <div class="font-black text-purple-700 text-base md:text-lg mb-1.5">Bé nghe hiểu · 3 câu</div>
            ${qs.map((q, qi) => `
                <div class="mb-1.5 p-2 rounded-xl bg-white border border-purple-100 shadow-sm">
                    <div class="tv2-story-question font-black text-slate-700 text-sm md:text-base mb-1.5 leading-snug">Câu ${qi + 1}. ${escapeHtml(q.q || '')}</div>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-1">
                        ${(q.o || []).map((opt, oi) => `<button id="story-q-${qi}-o-${oi}" onclick="answerStoryQuestion_(${qi},${oi})" class="story-answer-btn px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-purple-50 text-slate-700 text-sm md:text-[15px] font-bold text-left leading-snug">${escapeHtml(opt)}</button>`).join('')}
                    </div>
                    <div id="story-q-feedback-${qi}" class="hidden mt-1 text-sm font-black"></div>
                </div>`).join('')}
        </div>`;
}

async function answerStoryQuestion_(qi, oi) {
    if (!activeFairyLibraryKey_ || !activeStoryId_) return;
    const data = await loadFairyLibrary_(activeFairyLibraryKey_);
    const story = fairyStoryById_(data, activeStoryId_);
    const q = getStoryQuestions_(story)?.[Number(qi)];
    if (!q || activeStoryAnswers_[qi]) return;

    const opts = Array.isArray(q.o) ? q.o : [];
    const selected = opts[Number(oi)];
    const correct = String(selected) === String(q.a);
    activeStoryAnswers_[qi] = true;

    opts.forEach((opt, idx) => {
        const btn = document.getElementById(`story-q-${qi}-o-${idx}`);
        if (!btn) return;
        btn.disabled = true;
        if (String(opt) === String(q.a)) {
            btn.className = 'story-answer-btn px-2.5 py-1.5 rounded-lg border-2 border-emerald-300 bg-emerald-50 text-emerald-700 text-sm md:text-[15px] font-black text-left leading-snug';
        } else if (idx === Number(oi) && !correct) {
            btn.className = 'story-answer-btn px-2.5 py-1.5 rounded-lg border-2 border-rose-300 bg-rose-50 text-rose-700 text-sm md:text-[15px] font-black text-left leading-snug';
        } else {
            btn.classList.add('opacity-60');
        }
    });

    const fb = document.getElementById(`story-q-feedback-${qi}`);
    if (fb) {
        fb.classList.remove('hidden');
        fb.className = `mt-1 text-sm font-black ${correct ? 'text-emerald-600' : 'text-rose-600'}`;
        fb.textContent = correct ? `⭐ ${q.h || 'Đúng rồi!'}` : `💡 Chưa đúng. Đáp án đúng là: ${q.a}`;
    }
    speakVietnamese(correct ? `Đúng rồi! ${q.h || ''}` : `Chưa đúng. Đáp án đúng là ${q.a}.`, 0.98);
}

// Tương thích các tên hàm cũ để link/breadcrumb cũ không gây lỗi khi người dùng đang ở phiên trước.
function openFairyGroup_(groupName) {
    const key = /việt nam/i.test(String(groupName || '')) ? 'vietnam' : 'world';
    return openFairyLibrary_(key);
}
function openThoNhacSection_(kind) { return openThoNhacMenu(); }
function openThoNhacPoem_(index) { return openThoNhacMenu(); }

function showLectureAndSubtopics(topicNum, topicName, topicObj) {
    setLectureUtilityVisibility_(true, true); // Giữ nguyên màn hình chuẩn khi rời Mục 11.
    const isRiddleTopic = Number(topicNum) === 11;
    const lectureView = document.getElementById('view-lecture');
    const lectureContentWrap = document.getElementById('lecture-content')?.parentElement;
    if (lectureContentWrap) lectureContentWrap.style.display = isRiddleTopic ? 'none' : '';
    if (isRiddleTopic) {
        // Mục 11 có 6 thẻ tự giải thích: không cần lời dẫn, nút nghe dẫn hay nút trộn chung.
        setLectureUtilityVisibility_(false, false);
        if (lectureView) lectureView.style.minHeight = '0px';
    }
    pendingTopicQuiz = { topicNum, topicName, questions: topicObj.questions };
    
    document.getElementById('lecture-title').textContent = topicObj.lecture_title || topicName;
    document.getElementById('lecture-content').textContent = topicObj.lecture_content || topicObj.description || 'Chào mừng bé yêu! Hãy chọn một mục nhỏ bên dưới để bắt đầu luyện tập nhé.';
    document.getElementById('lecture-content').classList.add('whitespace-pre-line');
    document.getElementById('view-lecture').dataset.audioText = topicObj.lecture_audio_text || topicObj.lecture_content || topicObj.description || '';

    const groups = [], groupMap = {};
    topicObj.questions.forEach(q => {
        const k = (q.sub_topic || 'Câu hỏi chung').trim();
        if (!groupMap[k]) { groupMap[k] = []; groups.push(k); }
        groupMap[k].push(q);
    });
    // Đố vui (Mục Khám phá 11): thêm mục ảo "Câu đố tổng hợp" dùng toàn bộ kho câu hỏi,
    // không nhân đôi dữ liệu trong JSON.
    if (Number(topicNum) === 11 && topicObj.questions.length) {
        const randomKey = '__TV11_RANDOM_ALL__';
        groups.push(randomKey);
        groupMap[randomKey] = topicObj.questions;
    }

    pendingTopicQuiz.groups = groups; 
    pendingTopicQuiz.groupMap = groupMap;

    let subHtml = '';
    groups.forEach((subName, idx) => {
        const isMixedRiddlesTV2_ = Number(topicNum) === 11 && subName === '__TV11_RANDOM_ALL__';
        const displayTitle = isMixedRiddlesTV2_ ? 'Câu đố tổng hợp' : beautifySubtopicName(subName);
        const count = groupMap[subName].length;
        subHtml += tvChildCardHtml_({
            onclick: `selectSubtopic(${idx})`,
            title: `${idx + 1}. ${displayTitle}`,
            badge: `${count} ${Number(topicNum) === 4 ? 'lượt' : 'câu'}`,
            topicNum,
            idx,
            hideDescription: isRiddleTopic,
            classes: isRiddleTopic ? 'tv2-m11-subtopic-card' : ''
        });
    });

    setSubtopicGridColumns(groups.length);
    document.getElementById('lecture-subtopics-list').innerHTML = subHtml;

    updateDiscoverBreadcrumb_(topicName, TOPICS_CONFIG.find(t => t.id === topicNum)?.icon || '🌸', null);
    switchAppView('view-lecture');
}

function speakLecture() {
    speakVietnamese(document.getElementById('view-lecture').dataset.audioText || '', 0.96);
}

function selectSubtopic(idx) {
    stopSpeaking();
    if (!pendingTopicQuiz) return;
    setAppShellRootMode_(false);
    const { topicNum, topicName, questions, groups, groupMap } = pendingTopicQuiz;
    if (Number(topicNum) === 13 && !requirePremiumAccess('Ôn tập')) return;
    const subLabel = idx !== null ? groups[idx] : null;
    const pool = idx !== null ? groupMap[subLabel] : questions;
    const isMixedRiddlesTV2_ = Number(topicNum) === 11 && subLabel === '__TV11_RANDOM_ALL__';
    const displaySubLabel = isMixedRiddlesTV2_ ? 'Câu đố tổng hợp' : (subLabel ? beautifySubtopicName(subLabel) : null);
    const finalTitle = displaySubLabel ? `${topicName} - ${displaySubLabel}` : topicName;

    practiceCycleRawPool = [...pool];
    const firstCycleQuestions = isMixedRiddlesTV2_ ? shuffleArray(pool) : buildAdaptiveQuestionOrder_(pool, topicNum);

    updateDiscoverBreadcrumb_(topicName, TOPICS_CONFIG.find(t => t.id === topicNum)?.icon || '🌸', displaySubLabel || 'Tất cả các mục');
    if (Number(topicNum) === 1 && idx !== null && pool.length && pool.every(q => String(q.sub_id) === 'TV_2_M1_1')) {
        tv2Alphabet11Pending_ = {topicNum, title:finalTitle, questions:firstCycleQuestions, subLabel:displaySubLabel};
        showTV2Alphabet11Intro_();
        return;
    }
    tv2Alphabet11Pending_ = null;
    startTopicQuiz(topicNum, finalTitle, firstCycleQuestions, displaySubLabel);
}

// ==========================================
// BÀI HỌC - stub cũ được giữ lại dưới tên legacy để tránh trùng hàm
// Hàm openBaiHocHub thực tế nằm ở module TV2_BH_BT phía cuối file.
// ==========================================
function openBaiHocHubLegacyStub_() {
    stopSpeaking();
    clearInterval(quizTimerInterval);
    inBaiHocFlow = true;
    inMiniGameFlow = false;
    activeExamContext = null;
    activeRoadmapContext = null;
    activeTopicId = null;
    pendingTopicQuiz = null;
    updateNavTabs('Bài học', '📖', null);
    switchAppView('view-bai-hoc-hub');
}

// ==========================================
// LOGIC CHẤM ĐIỂM & ĐIỀU KHIỂN CÂU HỎI
// ==========================================
function startTopicQuiz(topicNum, topicName, questions, subLabel) {
    stopSpeaking();
    clearInterval(quizTimerInterval);
    activeQuestionsList = questions; 
    currentQIndex = 0; 
    score = 0;
    userAnswers = {};
    wrongAttemptsByQ = {};
    quizWrongAnswers = []; 
    quizAnsweredLog = []; 
    quizStartTime = Date.now();

    const topBar = document.getElementById('quiz-top-bar');
    const cardHeader = document.getElementById('quiz-card-header');
    const navPractice = document.getElementById('nav-group-practice');
    const navExam = document.getElementById('nav-group-exam');

    const submitBtn = document.getElementById('btn-submit-quiz');
    if (submitBtn) {
        if (activeRoadmapContext) submitBtn.classList.add('hidden');
        else submitBtn.classList.remove('hidden');
    }

    const roadmapHistoryBtn = document.getElementById('btn-roadmap-history');
    if (roadmapHistoryBtn) {
        if (activeRoadmapContext) { roadmapHistoryBtn.classList.remove('hidden'); roadmapHistoryBtn.classList.add('flex'); }
        else { roadmapHistoryBtn.classList.add('hidden'); roadmapHistoryBtn.classList.remove('flex'); }
    }

    if (activeRoadmapContext || activeExamContext) {
        if (topBar) {
            if (activeExamContext) topBar.classList.remove('hidden');
            else topBar.classList.add('hidden');
        }
        const timerBox = document.getElementById('quiz-timer-container');
        if (activeExamContext) {
            if (timerBox) timerBox.classList.remove('hidden');
            startExamCountdown();
        } else {
            if (timerBox) timerBox.classList.add('hidden');
        }
        if (cardHeader) { cardHeader.classList.remove('hidden'); cardHeader.classList.add('flex'); }
        if (navPractice) navPractice.classList.add('hidden');
        if (navExam) { navExam.classList.remove('hidden'); navExam.classList.add('flex'); }
        initQuizPallet();
    } else {
        if (topBar) topBar.classList.add('hidden');
        if (cardHeader) { cardHeader.classList.add('hidden'); cardHeader.classList.remove('flex'); }
        if (navPractice) { navPractice.classList.remove('hidden'); navPractice.classList.add('flex'); }
        if (navExam) { navExam.classList.add('hidden'); navExam.classList.remove('flex'); }
    }

    switchAppView('view-quiz');
    loadQuestion();
}


// ==========================================
// CHỦ ĐỀ 3: XƯỞNG GHÉP TIẾNG - GIAO DIỆN RIÊNG
// ==========================================
function ensureTopic3FusionStyles() {
    if (document.getElementById('topic3-fusion-style')) return;
    const style = document.createElement('style');
    style.id = 'topic3-fusion-style';
    style.textContent = `
        @keyframes t3PieceInLeft {
            from { transform: translateX(-36px) scale(.92); opacity:.15; }
            to { transform: translateX(0) scale(1); opacity:1; }
        }
        @keyframes t3PieceInRight {
            from { transform: translateX(36px) scale(.92); opacity:.15; }
            to { transform: translateX(0) scale(1); opacity:1; }
        }
        @keyframes t3ResultPop {
            0% { transform: scale(.45); opacity:0; }
            70% { transform: scale(1.12); opacity:1; }
            100% { transform: scale(1); opacity:1; }
        }
        .t3-piece-left { animation:t3PieceInLeft .42s ease both; }
        .t3-piece-right { animation:t3PieceInRight .42s ease both; }
        .t3-result-pop { animation:t3ResultPop .42s ease both; }
    `;
    document.head.appendChild(style);
}

// Mục 3 - khi đánh vần phải đọc ÂM của phụ âm, không đọc tên chữ cái.
// Ví dụ: th -> thờ, tr -> trờ, ch -> chờ; tránh Google TTS đọc thành
// "tê hát", "tê e-rờ", "xê hát" khi gặp chuỗi chữ đứng riêng.
function getTopic3OnsetSpeech_(token) {
    const key = String(token || '').trim().toLowerCase();
    if (!key) return '';

    const onsetSounds = {
        'b':'bờ', 'c':'cờ', 'ch':'chờ', 'd':'dờ', 'đ':'đờ',
        'g':'gờ', 'gh':'gờ', 'gi':'giờ', 'h':'hờ', 'k':'cờ',
        'kh':'khờ', 'l':'lờ', 'm':'mờ', 'n':'nờ', 'ng':'ngờ',
        'ngh':'ngờ', 'nh':'nhờ', 'p':'pờ', 'ph':'phờ', 'q':'cờ',
        'qu':'quờ', 'r':'rờ', 's':'sờ', 't':'tờ', 'th':'thờ',
        'tr':'trờ', 'v':'vờ', 'x':'xờ'
    };

    return onsetSounds[key] || token;
}

function getTopic3FusionMeta(q) {
    const tags = Array.isArray(q?.tags) ? q.tags : [];
    let level = 0;
    if (tags.includes('cap1_ghep_am_nguyen_am')) level = 1;
    else if (tags.includes('cap2_them_thanh')) level = 2;
    else if (tags.includes('cap3_am_dau_van')) level = 3;
    else if (tags.includes('cap4_tieng_hoan_chinh')) level = 4;
    if (!level) return null;

    const text = String(q.question_text || '');
    const quoted = [...text.matchAll(/'([^']+)'/g)].map(m => m[1]);
    const toneMatch = text.match(/thanh\s+(sắc|huyền|hỏi|ngã|nặng|ngang)/i);
    let tone = toneMatch ? toneMatch[1].toLowerCase() : '';
    // Fallback an toàn cho Level 2 và Level 4: suy ra thanh từ đáp án đúng nếu câu chữ thay đổi.
    // Không dùng dấu ngang làm mặc định vì sẽ làm sai nghĩa bài học.
    if (!tone && (level === 2 || level === 4) && q?.answer) {
        const ans = String(q.answer).normalize('NFD');
        if (/\u0301/.test(ans)) tone = 'sắc';
        else if (/\u0300/.test(ans)) tone = 'huyền';
        else if (/\u0309/.test(ans)) tone = 'hỏi';
        else if (/\u0303/.test(ans)) tone = 'ngã';
        else if (/\u0323/.test(ans)) tone = 'nặng';
        else tone = 'ngang';
    }

    const onsetMatch =
        text.match(/âm đầu\s+'([^']+)'/i) ||
        text.match(/ghép với\s+'([^']+)'\s*thì/i) ||
        text.match(/một âm đầu.*?ghép với\s+'([^']+)'/i);

    const vowelMatch = text.match(/nguyên âm\s+'([^']+)'/i);
    const rimeMatch = text.match(/vần\s+'([^']+)'/i);
    const baseMatch = text.match(/tiếng\s+'([^']+)'/i);

    if (level === 1) {
        const onset = onsetMatch?.[1] || quoted[0] || '';
        const vowel = vowelMatch?.[1] || quoted[1] || '';
        return {
            level, label:'Cấp 1 · Ghép âm',
            instruction:'Ghép âm đầu với nguyên âm',
            pieces:[onset, vowel],
            speech:`${getTopic3OnsetSpeech_(onset)}, ghép với ${vowel}, được tiếng gì?`
        };
    }

    if (level === 2) {
        const base = baseMatch?.[1] || quoted[0] || '';
        return {
            level, label:'Cấp 2 · Thêm thanh',
            instruction:'Ghép tiếng trước, rồi thêm thanh',
            pieces:[base, ({
                'sắc':'◌́',
                'huyền':'◌̀',
                'hỏi':'◌̉',
                'ngã':'◌̃',
                'nặng':'◌̣',
                'ngang':'không dấu'
            })[tone] || '?'],
            speech:`Tiếng ${base}, thêm thanh ${tone || ''}, được tiếng gì?`
        };
    }

    if (level === 3) {
        let onset = '';
        let rime = '';

        if (onsetMatch && rimeMatch) {
            onset = onsetMatch[1];
            rime = rimeMatch[1];
        } else if (/Vần\s+'[^']+'.*ghép với\s+'[^']+'/i.test(text)) {
            // Mẫu: "Vần 'ao' đang chờ một âm đầu. Ghép với 'c'..."
            const m = text.match(/Vần\s+'([^']+)'.*ghép với\s+'([^']+)'/i);
            rime = m?.[1] || '';
            onset = m?.[2] || '';
        } else {
            // Các mẫu còn lại được sinh theo thứ tự âm đầu rồi vần.
            onset = quoted[0] || '';
            rime = quoted[1] || '';
        }

        return {
            level, label:'Cấp 3 · Ghép vần',
            instruction:'Ghép âm đầu với vần',
            pieces:[onset, rime],
            speech:`${getTopic3OnsetSpeech_(onset)}, ghép với vần ${rime}, được tiếng gì?`
        };
    }

    let onset = onsetMatch?.[1] || quoted[0] || '';
    let rime = rimeMatch?.[1] || quoted[1] || '';

    return {
        level, label:'Cấp 4 · Tiếng hoàn chỉnh',
        instruction:'Ghép âm đầu + vần + thanh',
        pieces:[onset, rime, tone ? `thanh ${tone}` : 'thanh'],
        speech:`${getTopic3OnsetSpeech_(onset)}, ghép với vần ${rime}, thêm thanh ${tone || ''}, được tiếng gì?`
    };
}

function speakTopic3FusionQuestion() {
    const q = activeQuestionsList[currentQIndex];
    const meta = getTopic3FusionMeta(q);
    if (!meta) return speakCurrentQuestion();
    speakVietnamese(meta.speech, 0.92);
}

function checkTopic3FusionAnswer(selectedOpt) {
    const q = activeQuestionsList[currentQIndex];
    const isCorrect = selectedOpt === q.answer;

    if (isCorrect) {
        const result = document.getElementById('topic3-fusion-result');
        const arrow = document.getElementById('topic3-fusion-arrow');
        if (result) {
            result.textContent = q.answer;
            result.className = 't3-result-pop min-w-[92px] px-5 py-3 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 text-white text-[1.69rem] md:text-[2.03rem] font-black shadow-lg border-2 border-emerald-300';
        }
        if (arrow) arrow.textContent = '→';
    }

    checkAnswer(selectedOpt);
}

function renderTopic3FusionQuestion(q) {
    ensureTopic3FusionStyles();
    const meta = getTopic3FusionMeta(q);
    if (!meta) return false;

    const palette = [
        ['from-pink-100','to-rose-100','border-pink-300','text-rose-700'],
        ['from-sky-100','to-cyan-100','border-sky-300','text-sky-700'],
        ['from-violet-100','to-fuchsia-100','border-violet-300','text-violet-700'],
        ['from-amber-100','to-orange-100','border-amber-300','text-amber-700']
    ];

    const piecesHtml = meta.pieces.map((piece, idx) => {
        const p = palette[idx % palette.length];
        const anim = idx === 0 ? 't3-piece-left' : 't3-piece-right';
        return `
            ${idx > 0 ? `<span class="text-[1.69rem] md:text-[2.03rem] font-black text-pink-400 select-none">+</span>` : ''}
            <div class="${anim} ${meta.level === 2 && idx === 1 ? 'min-w-[150px] md:min-w-[190px] px-7 md:px-9' : 'min-w-[82px] md:min-w-[104px] px-5'} py-2.5 md:py-3 rounded-2xl bg-gradient-to-br ${p[0]} ${p[1]} border-2 ${p[2]} ${p[3]} text-[1.69rem] md:text-[2.03rem] font-black shadow-sm text-center whitespace-nowrap">
                ${escapeHtml(piece)}
            </div>`;
    }).join('');

    const optionsHtml = q.options.map((opt, idx) => `
        <button
            data-opt="${escapeHtml(opt)}"
            onclick="checkTopic3FusionAnswer('${String(opt).replace(/'/g, "\\'")}')"
            class="option-btn min-h-[54px] px-4 py-2 bg-pink-50/40 hover:bg-pink-100/70 border-2 border-pink-200 rounded-2xl font-black text-gray-800 text-center transition-all text-[1.125rem] md:text-[1.35rem] shadow-xs pastel-btn">
            ${escapeHtml(opt)}
        </button>
    `).join('');

    document.getElementById('question-box').innerHTML = `
        <div class="w-full max-w-4xl flex flex-col items-center">
            <!-- Breadcrumb phía trên đã hiển thị cấp độ, nên không lặp lại badge/tiêu đề ở đây. -->
            <div class="w-full rounded-3xl border-2 border-pink-200 bg-gradient-to-br from-white via-pink-50/40 to-purple-50/50 p-3 md:p-4 shadow-sm">
                ${q.image_url ? `<div class="flex justify-center mb-3"><img src="${q.image_url}" alt="Minh họa tiếng ghép" class="w-28 h-28 md:w-36 md:h-36 object-contain rounded-2xl border border-pink-100 bg-white shadow-sm" onerror="this.parentElement.remove()"></div>` : ''}
                <div class="flex flex-wrap items-center justify-center gap-3 md:gap-4">
                    ${piecesHtml}
                    <span id="topic3-fusion-arrow" class="text-[1.69rem] md:text-[2.03rem] font-black text-emerald-500 select-none">→</span>
                    <div id="topic3-fusion-result" class="min-w-[92px] px-5 py-3 rounded-2xl bg-white border-2 border-dashed border-emerald-300 text-emerald-400 text-[1.69rem] md:text-[2.03rem] font-black shadow-inner text-center">?</div>
                </div>

                <div class="flex justify-center mt-2.5">
                    <button onclick="speakTopic3FusionQuestion()" class="px-4 py-2 rounded-2xl bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-700 text-xs md:text-sm font-black pastel-btn shadow-sm">
                        <i class="fa-solid fa-volume-high mr-1.5"></i> Nghe cách ghép
                    </button>
                </div>
            </div>

            <div class="tv2-quiz-question mt-2 text-xs md:text-sm font-black text-pink-600">Bé chọn tiếng được ghép đúng:</div>

            <div class="w-full max-w-3xl grid grid-cols-2 gap-2 mt-1.5">
                ${optionsHtml}
            </div>
        </div>
    `;

    restoreQuestionState(q);
    updateNavButtons();
    updateQuizPalletUI();

    if (autoSpeechEnabled) setTimeout(speakTopic3FusionQuestion, 120);
    return true;
}


// ==========================================
// CHỦ ĐỀ 8: NHÀ THÔNG THÁI SẮP CÂU - GIAO DIỆN XẾP THẺ TỪ
// ==========================================
const topic8ArrangeState = {};

function getTopic8State(q) {
    const key = `${q.question_id}`;
    if (!topic8ArrangeState[key]) {
        const tokens = Array.isArray(q.tokens) && q.tokens.length ? q.tokens.slice() : String(q.answer || '').split(/\s+/).filter(Boolean);
        topic8ArrangeState[key] = { selected: [], pool: tokens.map((text, i) => ({ id: `${key}-${i}`, text })), wrongCount: 0, wrongLogged: false };
    }
    return topic8ArrangeState[key];
}

function topic8SentenceFromSelected(state) {
    return state.selected.map(x => x.text).join(' ').replace(/\s+([,.!?])/g, '$1').trim();
}

function renderTopic8SentenceBuilder(q) {
    const state = getTopic8State(q);
    const completed = userAnswers[currentQIndex] !== undefined;
    const selectedIds = new Set(state.selected.map(x => x.id));
    const available = state.pool.filter(x => !selectedIds.has(x.id));
    const built = topic8SentenceFromSelected(state);

    const topHtml = state.selected.length
        ? state.selected.map((tok, i) => `<button ${completed ? 'disabled' : ''} onclick="topic8ReturnToken(${i})" class="tv2-topic8-token px-3 py-2 md:px-4 md:py-2.5 rounded-2xl border-2 ${completed ? 'bg-emerald-100 border-emerald-400 text-emerald-800' : 'bg-white border-fuchsia-300 text-fuchsia-700 hover:bg-fuchsia-50'} font-black text-sm md:text-base shadow-sm transition-all">${escapeHtml(tok.text)}</button>`).join('')
        : `<span class="text-slate-400 font-bold text-sm md:text-base">Chọn từ bên dưới để ghép câu...</span>`;

    const poolHtml = available.map(tok => `<button ${completed ? 'disabled' : ''} onclick="topic8PickToken('${tok.id.replace(/'/g, "\\'")}')" class="tv2-topic8-token px-3.5 py-2.5 md:px-4 md:py-3 rounded-2xl bg-amber-50 hover:bg-amber-100 border-2 border-amber-300 text-amber-800 font-black text-sm md:text-base shadow-sm transition-all active:scale-95">${escapeHtml(tok.text)}</button>`).join('');

    const statusHtml = completed
        ? `<div class="mt-3 px-4 py-2 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-700 font-black text-sm md:text-base">🎉 Chính xác! ${escapeHtml(q.answer)}</div>`
        : `<div id="topic8-status" class="mt-3 min-h-[28px] text-sm md:text-base font-extrabold text-rose-500"></div>`;

    document.getElementById('question-box').innerHTML = `
        <div class="w-full max-w-4xl flex flex-col items-center px-2">
            <div class="text-4xl md:text-5xl mb-2">🧩</div>
            <h3 class="tv2-quiz-question text-base md:text-lg font-black text-slate-900 text-center">Sắp xếp các từ thành câu hoàn chỉnh</h3>
            <p class="text-xs md:text-sm font-bold text-slate-500 mt-1 text-center">Chạm từ bên dưới để đưa lên. Chạm từ phía trên để đưa xuống.</p>

            <div class="w-full mt-4 rounded-3xl border-2 border-dashed border-fuchsia-300 bg-fuchsia-50/40 p-4 min-h-[92px] flex flex-wrap gap-2 items-center justify-center">
                ${topHtml}
            </div>

            <div class="w-full mt-4 rounded-3xl border-2 border-amber-200 bg-white p-4 flex flex-wrap gap-2.5 items-center justify-center min-h-[96px]">
                ${poolHtml || (completed ? '<span class="text-emerald-600 font-black">Hoàn thành rồi! 🌟</span>' : '')}
            </div>

            <div class="flex flex-wrap items-center justify-center gap-2 mt-3">
                <button onclick="speakVietnamese('${String(q.answer || '').replace(/'/g, "\\'")}')" class="px-4 py-2 rounded-2xl bg-pink-50 border border-pink-200 text-pink-700 font-extrabold text-sm hover:bg-pink-100"><i class="fa-solid fa-volume-high mr-1.5"></i>Nghe câu đúng</button>
                ${!completed ? '<button onclick="topic8ResetCurrent()" class="px-4 py-2 rounded-2xl bg-slate-50 border border-slate-200 text-slate-600 font-extrabold text-sm hover:bg-slate-100"><i class="fa-solid fa-rotate-left mr-1.5"></i>Làm lại</button>' : ''}
            </div>
            ${statusHtml}
        </div>`;

    updateNavButtons();
    updateQuizPalletUI();
}

function topic8PickToken(tokenId) {
    const q = activeQuestionsList[currentQIndex];
    if (!q || userAnswers[currentQIndex] !== undefined) return;
    const state = getTopic8State(q);
    const tok = state.pool.find(x => x.id === tokenId);
    if (!tok || state.selected.some(x => x.id === tokenId)) return;
    state.selected.push(tok);
    topic8EvaluateOrRender(q, state);
}

function topic8ReturnToken(index) {
    const q = activeQuestionsList[currentQIndex];
    if (!q || userAnswers[currentQIndex] !== undefined) return;
    const state = getTopic8State(q);
    state.selected.splice(index, 1);
    renderTopic8SentenceBuilder(q);
}

function topic8ResetCurrent() {
    const q = activeQuestionsList[currentQIndex];
    if (!q || userAnswers[currentQIndex] !== undefined) return;
    const state = getTopic8State(q);
    state.selected = [];
    renderTopic8SentenceBuilder(q);
}

function topic8EvaluateOrRender(q, state) {
    const built = topic8SentenceFromSelected(state);
    if (state.selected.length < state.pool.length) {
        renderTopic8SentenceBuilder(q);
        return;
    }

    if (built === String(q.answer || '').trim()) {
        userAnswers[currentQIndex] = q.answer;
        score += (q.diem ?? 0.5);
        starGreenCount++;
        const greenEl = document.getElementById('star-green-count');
        if (greenEl) greenEl.textContent = starGreenCount;
        playAudio('correct');
        confetti({ particleCount: 55, spread: 70, origin: { y: 0.68 } });
        setTimeout(() => speakVietnamese(`Chính xác! ${q.answer}`), 160);
        queueLearningEvent_(q, 'correct', { topicId: 9, supportUsed: state.wrongCount > 0 ? 1 : 0 });
        renderTopic8SentenceBuilder(q);
        updateQuizPalletUI();
    } else {
        state.wrongCount = (Number(state.wrongCount) || 0) + 1;
        if (!state.wrongLogged) {
            state.wrongLogged = true;
            queueLearningEvent_(q, 'wrong', { topicId: 9, errorType: 'word_order_error' });
        }
        starRedCount++;
        const redEl = document.getElementById('star-red-count');
        if (redEl) redEl.textContent = starRedCount;
        playAudio('wrong');
        renderTopic8SentenceBuilder(q);
        const status = document.getElementById('topic8-status');
        if (status) status.textContent = 'Chưa đúng rồi. Bé chạm vào từ phía trên để đổi lại thứ tự nhé!';
    }
}


// ==========================================
// CHỦ ĐỀ 4: TẬP ĐỌC - TỪ 1 TỪ ĐẾN CÂU DÀI
// Mục tiêu: luyện đọc trơn. Không chấm đúng/sai; bé tự đọc trước,
// chỉ nghe cô đọc khi cần, sau đó đọc lại và chuyển lượt.
// ==========================================
function getTopic4ReadingMeta(q) {
    const tags = Array.isArray(q?.tags) ? q.tags : [];
    let level = 0;
    if (tags.includes('tap_doc_cap1')) level = 1;
    else if (tags.includes('tap_doc_cap2')) level = 2;
    else if (tags.includes('tap_doc_cap3')) level = 3;
    else if (tags.includes('tap_doc_cap4')) level = 4;
    else if (tags.includes('tap_doc_cap5')) level = 5;
    else if (tags.includes('tap_doc_cap6')) level = 6;
    else if (tags.includes('tap_doc_cap7')) level = 7;
    else if (tags.includes('tap_doc_cap8')) level = 8;
    if (!level) return null;
    const cfg = {
        1: { label:'Cấp 1 · Từ đơn dễ', note:'Vần đơn · một nguyên âm đơn, đọc thật chắc', icon:'🌱' },
        2: { label:'Cấp 2 · Từ đơn vừa', note:'Vần dễ quen thuộc · bắt đầu có âm cuối hoặc vần đôi dễ', icon:'🌿' },
        3: { label:'Cấp 3 · Từ đơn khó', note:'Các vần còn lại · đọc chậm phần vần rồi đọc trơn', icon:'🌳' },
        4: { label:'Cấp 4 · Từ đôi dễ', note:'Hai từ rất quen thuộc · nối liền thành nghĩa', icon:'🫶' },
        5: { label:'Cấp 5 · Từ đôi vừa', note:'Hai từ mức vừa · giữ nhịp đều và rõ tiếng', icon:'🌈' },
        6: { label:'Cấp 6 · Từ đôi khó', note:'Cụm 2-3 từ khó hơn · chia nhịp rồi đọc liền', icon:'🧠' },
        7: { label:'Cấp 7 · Câu ngắn', note:'Câu 5-6 từ · đọc liền mạch, rõ từng tiếng', icon:'🚂' },
        8: { label:'Cấp 8 · Câu dài', note:'Câu dài · chú ý dấu câu và ngắt hơi tự nhiên', icon:'⭐' }
    }[level];
    return { level, ...cfg, text:String(q?.question_text || '').trim(), speech:String(q?.audio_text || q?.question_text || '').trim() };
}

function renderNatureAmbientLayer_(dense = false) {
    return `<div class="nature-ambient-layer" aria-hidden="true">
        <span class="nature-cloud nature-cloud-1">☁️</span>
        <span class="nature-cloud nature-cloud-2">☁️</span>
        ${dense ? '<span class="nature-cloud nature-cloud-3">☁️</span>' : ''}
        <span class="nature-bird nature-bird-1">🐦</span>
        <span class="nature-bird nature-bird-2">🐦</span>
        ${dense ? '<span class="nature-bird nature-bird-3">🐦</span>' : ''}
        <span class="nature-leaf nature-leaf-1 nature-leaf-red">🍁</span>
        <span class="nature-leaf nature-leaf-2 nature-leaf-yellow">🍂</span>
        <span class="nature-leaf nature-leaf-3 nature-leaf-red">🍁</span>
        <span class="nature-leaf nature-leaf-4 nature-leaf-yellow">🍂</span>
        <span class="nature-leaf nature-leaf-5 nature-leaf-red">🍁</span>
        <span class="nature-leaf nature-leaf-6 nature-leaf-yellow">🍂</span>
        ${dense ? '<span class="nature-leaf nature-leaf-7 nature-leaf-yellow">🍂</span><span class="nature-leaf nature-leaf-8 nature-leaf-red">🍁</span>' : ''}
        <span class="nature-wind nature-wind-1"></span>
        <span class="nature-wind nature-wind-2"></span>
        ${dense ? '<span class="nature-wind nature-wind-3"></span>' : ''}
    </div>`;
}

function ensureNatureAmbientForView_(viewId, dense = true) {
    const view = typeof viewId === 'string' ? document.getElementById(viewId) : viewId;
    if (!view) return;
    view.classList.add('nature-ambient-host');
    if (!view.querySelector(':scope > .nature-ambient-layer')) {
        view.insertAdjacentHTML('afterbegin', renderNatureAmbientLayer_(dense));
    }
}

function speakTopic4Reading_() {
    const q = activeQuestionsList[currentQIndex];
    const meta = getTopic4ReadingMeta(q);
    if (!meta) return;
    const supportKey = adaptivePracticeSupportKey_(q, 4);
    const st = topic4ReadingSupportState_[supportKey] || (topic4ReadingSupportState_[supportKey] = { hint:false, audio:false });
    st.audio = true;
    speakVietnamese(meta.speech, meta.level >= 7 ? 0.86 : (meta.level >= 4 ? 0.89 : 0.92));
    const status = document.getElementById('topic4-reading-status');
    if (status) status.textContent = 'Cô đọc mẫu xong, con tự đọc lại một lần nữa nhé!';
}

function topic4ReadingDone_() {
    const q = activeQuestionsList[currentQIndex];
    const status = document.getElementById('topic4-reading-status');
    if (status) status.textContent = 'Giỏi lắm! Mình sang lượt tiếp theo nhé.';
    if (userAnswers[currentQIndex] === undefined) {
        // Tập đọc là luyện kỹ năng, không có chấm đúng/sai.
        // Chỉ đánh dấu đã hoàn thành lượt để cho phép chuyển tiếp.
        userAnswers[currentQIndex] = q?.answer || q?.question_text || 'Đã đọc';
        const supportKey = adaptivePracticeSupportKey_(q, 4);
        const st = topic4ReadingSupportState_[supportKey] || { hint:false, audio:false };
        queueLearningEvent_(q, 'practice', { topicId: 4, supportUsed: (st.hint ? 1 : 0) + (st.audio ? 1 : 0) });
        delete topic4ReadingSupportState_[supportKey];
        playAudio('correct');
    }
    setTimeout(() => nextQuestion(), 450);
}

function topic4ReadingHint_() {
    const q = activeQuestionsList[currentQIndex];
    const meta = getTopic4ReadingMeta(q);
    if (!meta) return;
    const target = document.getElementById('topic4-reading-target');
    const hint = document.getElementById('topic4-reading-hint');
    if (!target || !hint) return;
    const supportKey = adaptivePracticeSupportKey_(q, 4);
    const st = topic4ReadingSupportState_[supportKey] || (topic4ReadingSupportState_[supportKey] = { hint:false, audio:false });
    st.hint = true;
    if (meta.level <= 3) {
        const p = getTopic4Level1Parts_(meta.text);
        hint.textContent = `${p.onset || '∅'}  •  ${p.rhyme}  •  thanh ${p.tone ? p.tone.name : 'ngang'}  →  ${meta.text}`;
    } else if (meta.level <= 6) {
        hint.textContent = meta.text.split(/\s+/).join('  •  ');
    } else if (meta.level === 7) {
        const a = meta.text.split(/\s+/);
        const cut = Math.ceil(a.length / 2);
        hint.textContent = `${a.slice(0,cut).join(' ')}  │  ${a.slice(cut).join(' ')}`;
    } else {
        const t = meta.text;
        const comma = t.indexOf(',');
        hint.textContent = comma > 0 ? `${t.slice(0,comma+1)}  │  ${t.slice(comma+1).trim()}` : t;
    }
    hint.classList.remove('hidden');
}

function getTopic4Level1Parts_(text) {
    const raw = String(text || '').trim();
    if (!raw) return { onset:'', rhyme:'', tone:'', full:'' };

    // Bỏ riêng DẤU THANH nhưng giữ dấu cấu tạo nguyên âm (ă, â, ê, ô, ơ, ư).
    const toneMap = {
        '\u0301': { key:'sac', symbol:'◌́', name:'sắc' },
        '\u0300': { key:'huyen', symbol:'◌̀', name:'huyền' },
        '\u0309': { key:'hoi', symbol:'◌̉', name:'hỏi' },
        '\u0303': { key:'nga', symbol:'◌̃', name:'ngã' },
        '\u0323': { key:'nang', symbol:'●', name:'nặng' }
    };
    let tone = null;
    let strippedNfd = '';
    for (const ch of raw.normalize('NFD')) {
        if (toneMap[ch]) {
            if (!tone) tone = toneMap[ch];
            continue;
        }
        strippedNfd += ch;
    }
    const base = strippedNfd.normalize('NFC');

    // Ghép âm đầu theo cụm chữ dài trước, đúng cách bé lớp 1 nhìn mặt chữ.
    const initials = ['ngh','ch','gh','gi','kh','ng','nh','ph','qu','th','tr','b','c','d','đ','g','h','k','l','m','n','p','q','r','s','t','v','x'];
    const lower = base.toLocaleLowerCase('vi-VN');
    const onset = initials.find(x => lower.startsWith(x)) || '';
    const rhyme = onset ? base.slice(onset.length) : base;
    return { onset, rhyme, tone, full:raw };
}

function renderTopic4Level1Target_(text) {
    const p = getTopic4Level1Parts_(text);
    // Ba cấp từ đơn (4.1, 4.2, 4.3) đều đọc MỘT TỪ hoàn chỉnh, dùng 3 ô màu để bé nhìn nhanh
    // cấu tạo của tiếng: âm đầu | vần | dấu thanh. Không dùng dấu + để tránh quay lại kiểu ghép vần.
    const onsetText = p.onset || '—';
    const toneText = p.tone ? p.tone.name : 'ngang';
    return `<div class="flex flex-wrap items-center justify-center gap-3 md:gap-4 leading-none select-none">
        <div class="min-w-[104px] md:min-w-[126px] rounded-2xl border-2 border-pink-200 bg-pink-50/95 px-4 py-3 md:py-4 shadow-sm">
            <div class="text-[10px] md:text-xs font-black uppercase tracking-wide text-pink-400 mb-2">Âm đầu</div>
            <div class="text-[2.15rem] md:text-[2.75rem] font-black text-pink-500">${escapeHtml(onsetText)}</div>
        </div>
        <div class="min-w-[104px] md:min-w-[126px] rounded-2xl border-2 border-violet-200 bg-violet-50/95 px-4 py-3 md:py-4 shadow-sm">
            <div class="text-[10px] md:text-xs font-black uppercase tracking-wide text-violet-400 mb-2">Vần</div>
            <div class="text-[2.15rem] md:text-[2.75rem] font-black text-violet-600">${escapeHtml(p.rhyme)}</div>
        </div>
        <div class="min-w-[104px] md:min-w-[126px] rounded-2xl border-2 border-rose-200 bg-rose-50/95 px-4 py-3 md:py-4 shadow-sm">
            <div class="text-[10px] md:text-xs font-black uppercase tracking-wide text-rose-400 mb-2">Dấu</div>
            <div class="text-xl md:text-2xl font-black text-rose-600 capitalize">${escapeHtml(toneText)}</div>
        </div>
        <span class="mx-1 md:mx-2 text-[2rem] md:text-[2.6rem] text-emerald-500 font-black">→</span>
        <span class="text-[2.8rem] md:text-[3.65rem] font-black text-blue-600 whitespace-nowrap">${escapeHtml(p.full)}</span>
    </div>`;
}


function renderTopic4TwoWordTarget_(text) {
    const words = String(text || '').trim().split(/\s+/).filter(Boolean);
    if (!words.length) return '';
    return `<div class="flex flex-wrap items-center justify-center gap-x-4 md:gap-x-6 gap-y-2 leading-none select-none">${words.map((word, idx) => {
        const color = idx % 2 === 0 ? 'text-violet-600' : 'text-pink-500';
        return `<span class="${color}">${escapeHtml(word)}</span>`;
    }).join('')}</div>`;
}

function renderTopic4ReadingQuestion(q) {
    const meta = getTopic4ReadingMeta(q);
    if (!meta) return false;
    const box = document.getElementById('question-box');
    if (!box) return false;
    const sizeCls = meta.level <= 3 ? 'text-[2.7rem] md:text-[3.65rem]'
        : meta.level <= 5 ? 'text-[2.3rem] md:text-[3.05rem]'
        : meta.level === 6 ? 'text-[2.05rem] md:text-[2.75rem]'
        : meta.level === 7 ? 'text-[1.9rem] md:text-[2.45rem]'
        : 'text-[1.65rem] md:text-[2.15rem]';
    const targetHtml = meta.level <= 3
        ? renderTopic4Level1Target_(meta.text)
        : meta.level <= 6
            ? renderTopic4TwoWordTarget_(meta.text)
            : escapeHtml(meta.text);
    box.innerHTML = `
      <div class="topic4-reading-stage relative w-full max-w-5xl overflow-hidden rounded-[30px] border-2 border-pink-200 bg-gradient-to-b from-sky-50/80 via-white to-amber-50/55 px-4 md:px-8 py-5 md:py-7 text-center shadow-sm">
        <div class="relative z-10">
          <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 border border-purple-200 text-purple-700 font-black text-xs md:text-sm shadow-sm">
            <span>${meta.icon}</span><span>${escapeHtml(meta.label)}</span>
          </div>
          <p class="mt-2 text-xs md:text-sm font-bold text-slate-500">${escapeHtml(meta.note)}</p>
          <div class="mt-5 md:mt-6 rounded-[26px] bg-white/90 border-2 border-pink-100 px-4 md:px-8 py-7 md:py-9 shadow-sm min-h-[150px] flex items-center justify-center">
            <div id="topic4-reading-target" class="${sizeCls} leading-[1.35] font-black text-slate-800 tracking-wide select-none">${targetHtml}</div>
          </div>
          <div id="topic4-reading-hint" class="hidden mt-3 text-base md:text-xl font-black text-indigo-600 bg-indigo-50/85 border border-indigo-100 rounded-2xl px-4 py-2.5"></div>
          <p id="topic4-reading-status" class="mt-3 text-xs md:text-sm font-extrabold text-pink-600">Con tự đọc trước nhé. Chưa chắc thì mới nghe cô đọc mẫu.</p>
          <div class="mt-4 flex flex-wrap items-center justify-center gap-2.5 md:gap-3">
            <button onclick="topic4ReadingHint_()" class="px-4 py-2.5 rounded-2xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-700 font-black text-xs md:text-sm shadow-sm">💡 Gợi ý nhịp đọc</button>
            <button onclick="speakTopic4Reading_()" class="px-4 py-2.5 rounded-2xl bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-700 font-black text-xs md:text-sm shadow-sm">🔊 Cô đọc mẫu</button>
            <button onclick="topic4ReadingDone_()" class="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-pink-500 to-fuchsia-500 text-white font-black text-xs md:text-sm shadow-md">✅ Con đọc xong</button>
          </div>
        </div>
      </div>`;
    updateNavButtons();
    const prevLabel = document.querySelector('#btn-prev-q-prac span');
    const nextLabel = document.getElementById('btn-next-text-prac');
    if (prevLabel) prevLabel.textContent = 'Lượt trước';
    if (nextLabel && currentQIndex < activeQuestionsList.length - 1) nextLabel.textContent = 'Lượt tiếp theo';
    return true;
}

// Muc 1.1 (Kham pha): on lai DU 29 chu cai truoc khi lam 50 cau hoi.
// Phan nay bam SGK TV2 KNTT, tap 1, trang 14: bang chu cai va xep thu tu.
// Khong lay tu ALPHABET_29_DETAILS vi mang do con co 11 cum phu am ghep.
const TV2_ALPHABET_29_ = Object.freeze([
    'a','ă','â','b','c','d','đ','e','ê','g','h','i','k','l','m',
    'n','o','ô','ơ','p','q','r','s','t','u','ư','v','x','y'
]);
let tv2Alphabet11Pending_ = null;

function isTopic1Alphabet11_(q) {
    return !activeExamContext && !activeRoadmapContext
        && Number(activeTopicId) === 1
        && String(q?.sub_id || '') === 'TV_2_M1_1';
}

function renderTV2Alphabet29Grid_() {
    return `<div class="tv2-a11-grid w-full" role="list" aria-label="29 chữ cái tiếng Việt theo đúng thứ tự">
        ${TV2_ALPHABET_29_.map((l, i) => `<div role="listitem" class="bg-white/95 border border-violet-200 rounded-xl min-h-[70px] sm:min-h-[75px] md:min-h-[80px] flex flex-col justify-center items-center shadow-sm" aria-label="Chữ số ${i + 1}: ${l}">
            <span class="tv2-a11-key-upper leading-none font-black text-violet-700">${escapeHtml(l.toUpperCase())}</span>
            <span class="tv2-a11-key-lower leading-none font-extrabold text-pink-600 mt-1">${escapeHtml(l)}</span>
        </div>`).join('')}
    </div>`;
}

function showTV2Alphabet11Intro_() {
    if (!tv2Alphabet11Pending_) return;
    stopSpeaking();
    const board = document.getElementById('question-box');
    if (!board) return;
    ['quiz-top-bar','quiz-card-header','nav-group-practice','nav-group-exam'].forEach(id => {
        document.getElementById(id)?.classList.add('hidden');
    });
    const card = board.closest('.pastel-card');
    if (card) { card.style.minHeight = '0'; card.style.justifyContent = 'flex-start'; }
    board.style.justifyContent = 'flex-start';
    board.style.paddingTop = '0.4rem';
    board.style.paddingBottom = '0.35rem';
    board.style.flex = '0 0 auto';
    board.innerHTML = `<section class="w-full max-w-[56rem] mx-auto flex flex-col items-center gap-3 px-1 sm:px-2">
        <div class="text-center">
            <h2 class="text-xl sm:text-2xl font-black text-violet-700">Ôn lại bảng chữ cái</h2>
            <p class="mt-1 text-sm sm:text-base font-bold text-slate-600">29 chữ cái tiếng Việt · Chữ hoa ở trên, chữ thường ở dưới</p>
        </div>
        ${renderTV2Alphabet29Grid_()}
        <p class="text-center text-sm sm:text-base font-bold text-slate-600">Con hãy đọc từ trái sang phải, từ trên xuống dưới nhé!</p>
        <div class="flex items-center justify-center gap-2 flex-wrap pb-1">
            <button type="button" onclick="startTV2Alphabet11AfterIntro_()" class="px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white text-base sm:text-lg font-black rounded-2xl shadow-md pastel-btn">Con đã nhớ – Bắt đầu luyện tập <i class="fa-solid fa-arrow-right ml-1"></i></button>
        </div>
    </section>`;
    switchAppView('view-quiz');
}

function startTV2Alphabet11AfterIntro_() {
    const next = tv2Alphabet11Pending_;
    if (!next) return;
    tv2Alphabet11Pending_ = null;
    startTopicQuiz(next.topicNum, next.title, next.questions, next.subLabel);
}

function toggleTV2Alphabet11Reference_() {
    const panel = document.getElementById('tv2-alphabet11-reference');
    const btn = document.getElementById('tv2-alphabet11-reference-btn');
    if (!panel || !btn) return;
    const willShow = panel.classList.contains('hidden');
    panel.classList.toggle('hidden', !willShow);
    btn.setAttribute('aria-expanded', String(willShow));
    const label = btn.querySelector('span');
    if (label) label.textContent = willShow ? 'Ẩn bảng chữ cái' : 'Xem lại bảng chữ cái';
}

// Muc 1 (Kham pha): chi doi cach TRINH BAY, khong sua JSON/dap an/cham diem.
// Tinh huong bang chu cai duoc dien dat bang the chu, tranh emoji trang tri va loi dan dai.
function getTopic1QuestionView_(q) {
    const raw = String(q?.question_text || '').trim();
    const stage = (text, label = '') => `<div class="w-full max-w-3xl mx-auto rounded-2xl border border-pink-200 bg-white/85 px-4 py-3 md:py-4 shadow-sm text-center">
        ${label ? `<p class="text-[11px] md:text-xs font-bold text-violet-500 mb-1.5">${escapeHtml(label)}</p>` : ''}
        <div class="text-lg md:text-2xl font-extrabold text-slate-800 leading-relaxed whitespace-pre-line break-words">${escapeHtml(text)}</div>
    </div>`;
    const tile = (text, muted = false) => `<span class="tv2-a11-target-tile inline-flex items-center justify-center rounded-2xl border-2 ${muted ? 'border-dashed border-violet-200 bg-white text-violet-400' : 'border-pink-200 bg-pink-50 text-pink-700'} font-black shadow-sm">${escapeHtml(text)}</span>`;
    const line = (content, prompt, spokenText) => ({
        html: `<div class="w-full flex flex-col items-center gap-2.5 mb-2">
            ${content}
            <h3 class="tv2-quiz-question text-lg md:text-2xl font-black text-slate-900 leading-snug text-center px-2">${escapeHtml(prompt)}</h3>
        </div>`,
        spokenText
    });
    // SGK: doc thu tu 29 chu cai (khong de lo chu dung truoc/sau).
    let m = raw.match(/Theo thứ tự 29 chữ cái, chữ nào đứng ngay (sau|trước) [“"]([^”"]+)[”"]\?/i);
    if (m) {
        const after = m[1].toLowerCase() === 'sau';
        const letter = m[2];
        const content = `<div class="flex items-center justify-center gap-4 py-1" aria-label="Thứ tự bảng chữ cái">
            ${after ? tile(letter) : tile('? ', true)}
            <span class="text-violet-400 text-2xl font-black" aria-hidden="true">→</span>
            ${after ? tile('?', true) : tile(letter)}
        </div>`;
        const prompt = after ? 'Chữ nào đứng ngay sau?' : 'Chữ nào đứng ngay trước?';
        return line(content, prompt, `Trong bảng chữ cái tiếng Việt, chữ nào đứng ngay ${m[1]} chữ ${letter}?`);
    }
    // Chu hoa / chu thuong la hai dang cua cung mot chu cai.
    m = raw.match(/Chữ thường nào ghép đúng với chữ hoa [“"]([^”"]+)[”"]\?/i);
    if (m) {
        return line(`<div class="flex items-center justify-center gap-4 py-1">${tile(m[1])}<span class="text-violet-400 text-2xl font-black" aria-hidden="true">→</span>${tile('?', true)}</div>`,
            'Chọn chữ thường tương ứng.', `Chữ hoa ${m[1]} ứng với chữ thường nào?`);
    }
    // Phan loai nguyen am/phu am: chi trinh bay lai, KHONG coi day la bai trong tam cua SGK.
    m = raw.match(/Chữ [“"]([^”"]+)[”"] thuộc nhóm nào\?/i);
    if (m) return line(`<div class="py-1">${tile(m[1])}</div>`, 'Chữ này thuộc nhóm nào?', `Chữ ${m[1]} thuộc nhóm nào?`);
    // Dap an da la cac day tu hoan chinh: khong nhac lai danh sach sap san de tranh lo dap an.
    if (/Dãy nào được xếp theo thứ tự bảng chữ cái\?/i.test(raw)) {
        const prompt = 'Chọn dãy từ xếp đúng thứ tự bảng chữ cái.';
        return line('', prompt, prompt);
    }
    // Chu dau cau: tach cau dang sai ra khung rieng, tranh loi dan bai van/nhat ki lap lai.
    m = raw.match(/[“"]([^”"]+)[”"]/);
    if (/Cách chép lại nào đúng chữ đầu câu/i.test(raw) && m) {
        const prompt = 'Chọn câu được viết hoa và đặt dấu đúng.';
        return line(stage(m[1], 'Câu cần sửa'), prompt, `${prompt} ${m[1]}`);
    }
    // Hai dong tho: giu nguyen xuong dong, khong tu dong viet hoa truoc khi be tra loi.
    if (/hai dòng thơ/i.test(raw) && m) {
        const prompt = 'Chọn cách viết hoa đúng đầu mỗi dòng thơ.';
        return line(stage(m[1], 'Hai dòng thơ'), prompt, `${prompt} ${m[1]}`);
    }
    // Ten nguoi: ten chua viet hoa hien thanh the de be quan sat.
    if (/tên bạn vào nhãn vở/i.test(raw) && m) {
        const prompt = 'Chọn cách viết đúng tên bạn.';
        return line(stage(m[1], 'Tên chưa viết hoa'), prompt, `${prompt} ${m[1]}`);
    }
    // Ten dia danh: de cau goc truoc khi chon ten viet hoa.
    if (/tên riêng/i.test(raw) && m) {
        const prompt = 'Chọn cách viết đúng tên riêng.';
        return line(stage(m[1], 'Câu cần sửa'), prompt, `${prompt} ${m[1]}`);
    }
    // Du lieu moi khac mau: bo nhan/emoji dau dong va giu nguyen yeu cau chinh.
    const cleaned = raw.replace(/^[^\n]*·\s*/u, '').replace(/^[^\n]*\n/u, '').trim() || raw;
    return line(stage(cleaned), '', cleaned);
}

// Muc 9.1: Trinh bay tho theo kho 4 dong, giu nguyen noi dung va TTS trong JSON.
function renderTopic9PoemStanzas_(lines) {
    const stanzas = [];
    for (let i = 0; i < lines.length; i += 4) {
        stanzas.push(`<span class="tv2-m9-poem-stanza">${escapeHtml(lines.slice(i, i + 4).join('\n'))}</span>`);
    }
    return stanzas.join('');
}

function loadQuestion() {
    stopSpeaking();
    const q = activeQuestionsList[currentQIndex];
    if (!q) return;

    const isEvaluationMode = !!activeExamContext || !!activeRoadmapContext;

    // Topic 2: bỏ minh họa emoji và dồn nội dung lên trên để giảm khoảng trắng.
    // Chỉ áp dụng ở chế độ Khám phá/luyện tập, không ảnh hưởng Bài tập hoặc Đề thi.
    const isTopic1Compact = !isEvaluationMode && Number(activeTopicId) === 1;
    const isTopic2Compact = !isEvaluationMode && Number(activeTopicId) === 2;
    const isTopic3Compact = !isEvaluationMode && Number(activeTopicId) === 3;
    const isTopic4Reading = !isEvaluationMode && Number(activeTopicId) === 4;
    // Muc 7-8: khung tinh huong / cau hoi / dap an rong va de doc hon.
    const isTopic78Wide = !isEvaluationMode && (Number(activeTopicId) === 7 || Number(activeTopicId) === 8);
    // Muc 9: giu van ban ben trai, cau hoi va dap an ben phai (chi Khám phá).
    const isTopic9ReadingLayout = !isEvaluationMode && Number(activeTopicId) === 9 && !!q.reading_passage;
    const isTopic11PoemLayout = !isEvaluationMode && Number(activeTopicId) === 11 && !!q.reading_passage;
    const isSideReadingLayout = isTopic9ReadingLayout || isTopic11PoemLayout;
    const isCompactPractice = isTopic1Compact || isTopic2Compact || isTopic3Compact || isTopic4Reading || isSideReadingLayout;
    const questionBox = document.getElementById('question-box');
    const quizCard = questionBox ? questionBox.closest('.pastel-card') : null;
    const quizBottomNav = document.getElementById('quiz-bottom-nav');
    if (questionBox) {
        questionBox.classList.toggle('tv2-m78-wide', isTopic78Wide);
        questionBox.style.justifyContent = isCompactPractice ? 'flex-start' : 'center';
        questionBox.style.paddingTop = isTopic1Compact ? '0.4rem' : (isTopic2Compact ? '0.75rem' : (isTopic3Compact ? '0.35rem' : ((isTopic4Reading || isSideReadingLayout) ? '0.25rem' : '')));
        questionBox.style.paddingBottom = isCompactPractice ? '0.2rem' : '';
        questionBox.style.flex = isCompactPractice ? '0 0 auto' : '';
    }
    if (quizCard) {
        // Mục 2 và 3: card co theo nội dung để toàn bộ câu hỏi + đáp án + điều hướng
        // nằm gọn trong một khung nhìn, không kéo xuống theo min-height mặc định.
        quizCard.style.minHeight = isCompactPractice ? '0' : '';
        quizCard.style.justifyContent = isCompactPractice ? 'flex-start' : '';
    }
    if (quizBottomNav) {
        quizBottomNav.style.marginTop = isTopic1Compact ? '0.55rem' : (isTopic2Compact ? '0.75rem' : (isTopic3Compact ? '0.35rem' : (isTopic4Reading ? '0.3rem' : '')));
    }

    // Sắp câu (ID nội bộ 9) ở chế độ luyện tập dùng trò chơi xếp thẻ từ riêng.
    // Tiến trình tuần / đề thi vẫn dùng renderer chuẩn để giữ nguyên cơ chế chấm điểm.
    if (!isEvaluationMode && Number(activeTopicId) === 9 && Array.isArray(q.tokens) && q.tokens.length) {
        const stepEl = document.getElementById('practice-step-text');
        if (stepEl) stepEl.textContent = `Câu ${currentQIndex + 1} / ${activeQuestionsList.length}`;
        renderTopic8SentenceBuilder(q);
        return;
    }

    // Topic 4 - Tập đọc dùng renderer riêng: tự đọc -> gợi ý/nghe mẫu -> đọc lại.
    // Đây là luyện đọc, không phải bài trắc nghiệm nên không chấm đúng/sai.
    if (!isEvaluationMode && Number(activeTopicId) === 4 && getTopic4ReadingMeta(q)) {
        const stepEl = document.getElementById('practice-step-text');
        if (stepEl) stepEl.textContent = `Lượt ${currentQIndex + 1} / ${activeQuestionsList.length}`;
        renderTopic4ReadingQuestion(q);
        return;
    }

    // Topic 3 ở chế độ luyện tập dùng renderer tương tác riêng.
    // Tiến trình tuần / đề thi vẫn dùng renderer chuẩn để giữ nguyên cơ chế chấm điểm.
    if (!isEvaluationMode && Number(activeTopicId) === 3 && getTopic3FusionMeta(q)) {
        const stepEl = document.getElementById('practice-step-text');
        if (stepEl) stepEl.textContent = `Câu ${currentQIndex + 1} / ${activeQuestionsList.length}`;
        renderTopic3FusionQuestion(q);
        return;
    }

    if (isEvaluationMode) {
        document.getElementById('q-badge-index').textContent = `CÂU ${currentQIndex + 1} / ${activeQuestionsList.length}`;
        const isRoadmap = !!activeRoadmapContext;
        const skillName = isRoadmap
            ? (q.sub_topic || 'Kiến thức tổng hợp')
            : (SKILL_TAXONOMY[q.skill_tag]?.name || q.sub_topic || 'Kiến thức tổng hợp');
        document.getElementById('q-skill-text').textContent = skillName;

        const scoreBadge = document.getElementById('q-badge-score');
        if (scoreBadge) {
            if (isRoadmap) {
                scoreBadge.classList.add('hidden');
            } else {
                scoreBadge.classList.remove('hidden');
                scoreBadge.textContent = `(${q.diem ?? 0.5} điểm)`;
            }
        }
    } else {
        const stepEl = document.getElementById('practice-step-text');
        if (stepEl) stepEl.textContent = `Câu ${currentQIndex + 1} / ${activeQuestionsList.length}`;
    }

    let mediaHtml = '';
    const isDiscoverImageTV2_ = !isEvaluationMode && Number(activeTopicId) >= 1 && Number(activeTopicId) <= 12;
    if (!isTopic2Compact && q.image_url) {
        const imageSize = isDiscoverImageTV2_ ? 'w-28 h-28 md:w-36 md:h-36' : 'w-14 h-14 md:w-16 md:h-16';
        mediaHtml = `<img src="${q.image_url}" alt="Minh họa cho câu hỏi" class="${imageSize} object-contain mb-1 rounded-2xl border border-pink-100 bg-white/80 shadow-sm" onerror="this.remove()">`;
    }

    const pText = q.reading_passage;
    const pTitle = q.reading_title;
    const passageLines = pText ? pText.split('\n').map(l => l.trim()).filter(Boolean) : [];
    const avgLineLen = passageLines.length ? passageLines.reduce((a, l) => a + l.length, 0) / passageLines.length : 0;
    const isPoemLike = passageLines.length >= 4 && avgLineLen > 0 && avgLineLen < 35;
    // Tho trong Muc 9 hien nguyen mot cot, khong chia doi noi dung.
    const useTwoColumns = isPoemLike && !isSideReadingLayout;
    const isTopic9Poem = isTopic9ReadingLayout && String(q.sub_id || '') === 'TV_2_M9_1';
    const isSidePoem = isTopic9Poem || isTopic11PoemLayout;
    const passageHtml = pText ? `
        <div class="${isSideReadingLayout ? `tv2-m9-reading-pane${isSidePoem ? ' tv2-m9-poem' : ''}${isTopic11PoemLayout ? ' tv2-m11-poem' : ''}` : `w-full max-w-3xl bg-pink-50/70 border-2 border-pink-200 rounded-2xl p-3 mb-1.5 text-left shadow-xs${isTopic78Wide ? ' tv2-m78-situation-pane' : ''}`}">
            ${pTitle ? `<p class="${isSideReadingLayout ? 'tv2-m9-reading-title' : 'font-black text-pink-700 text-sm md:text-base mb-1'}${isTopic78Wide ? ' tv2-m78-situation-title' : ''}">${escapeHtml(pTitle)}</p>` : ''}
            <p class="tv2-quiz-reading-passage text-gray-800 text-sm md:text-base font-bold whitespace-pre-line leading-relaxed ${useTwoColumns ? 'md:columns-2 md:gap-6' : ''}">${isSidePoem ? renderTopic9PoemStanzas_(passageLines) : escapeHtml(pText)}</p>
            ${isTopic11PoemLayout ? `<div class="tv2-m11-poem-listen-wrap">
                <button type="button" onclick="speakTopic11Poem_()" class="tv2-m11-poem-listen-btn px-4 py-2 bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 rounded-2xl text-sm md:text-base font-extrabold inline-flex items-center justify-center gap-2 pastel-btn shadow-xs" aria-label="Nghe cô đọc bài thơ">
                    <i class="fa-solid fa-volume-high" aria-hidden="true"></i><span>Nghe cô đọc</span>
                </button>
            </div>` : ''}
        </div>` : '';

    const practiceSpeakerBtnHtml = !isEvaluationMode ? `
        <div class="flex items-center justify-center mt-1 mb-1">
            <button onclick="speakCurrentQuestion()" class="px-4 py-1.5 bg-pink-50 hover:bg-pink-100 text-pink-700 border border-pink-200 rounded-2xl text-xs md:text-sm font-extrabold flex items-center space-x-1.5 pastel-btn shadow-xs">
                <i class="fa-solid fa-volume-high text-pink-600"></i>
                <span>Nghe câu hỏi</span>
            </button>
        </div>
    ` : '';

    const isLetterListen = q.render_style === 'letter_listen';
    const topic1View = isTopic1Compact && !isLetterListen ? getTopic1QuestionView_(q) : null;
    const isTopic11 = isTopic1Alphabet11_(q);
    const alphabet11ReviewHtml = isTopic11 ? `<div class="w-full max-w-3xl flex flex-col items-center mb-2">
        <button type="button" id="tv2-alphabet11-reference-btn" aria-controls="tv2-alphabet11-reference" aria-expanded="false" onclick="toggleTV2Alphabet11Reference_()" class="px-3 py-1.5 bg-violet-50 hover:bg-violet-100 rounded-full border border-violet-200 text-violet-700 text-sm sm:text-base font-bold pastel-btn"><i class="fa-solid fa-table-cells mr-1"></i><span>Xem lại bảng chữ cái</span></button>
        <div id="tv2-alphabet11-reference" class="hidden w-full mt-2 p-2 rounded-xl bg-violet-50/90 border border-violet-200">${renderTV2Alphabet29Grid_()}</div>
    </div>` : '';

    let html;
    if (isLetterListen) {
        html = `
            ${mediaHtml}
            <div class="w-full max-w-3xl border-2 border-dashed border-pink-200 bg-pink-50/40 rounded-3xl px-4 py-4 md:py-5 flex flex-col items-center text-center mb-3">
                ${isTopic1Compact ? '' : `<div class="text-3xl md:text-4xl mb-1.5 space-x-2">
                    <span>🎧</span><span>👂</span><span>🌸</span>
                </div>`}
                <p class="tv2-quiz-question text-sm md:text-base lg:text-lg font-black text-rose-600 leading-snug">${isTopic1Compact ? 'Nghe âm và chọn chữ cái đúng.' : escapeHtml(q.question_text)}</p>
                ${practiceSpeakerBtnHtml}
            </div>

            <div class="w-full max-w-3xl flex flex-wrap items-center justify-center gap-3 mt-1">
        `;
        q.options.forEach(opt => {
            html += `
                <button data-opt="${escapeHtml(opt)}" onclick="checkAnswer('${opt.replace(/'/g, "\\'")}')" class="option-btn min-w-[140px] px-6 py-3 bg-white hover:bg-emerald-50 border-2 border-emerald-400 rounded-full font-black text-emerald-700 text-base md:text-lg transition-all pastel-btn shadow-xs">
                    ${escapeHtml(opt)}
                </button>`;
        });
        html += `</div>`;
        if (q.mascot_text) {
            html += `
                <div class="mt-4 inline-flex items-center space-x-1.5 bg-pink-50 border border-pink-200 rounded-full px-3.5 py-1.5">
                    <span>🐰</span>
                    <span class="text-xs md:text-sm font-extrabold text-rose-600">${escapeHtml(q.mascot_text)}</span>
                </div>`;
        }
    } else {
        // Khám phá Mục 9/11: thơ/văn trái, câu hỏi và đáp án phải.
        // Các mục khác và Đề thi/Ôn tập giữ renderer của riêng mình.
        html = isSideReadingLayout ? `
        <div class="tv2-m9-layout">
            ${passageHtml}
            <section class="tv2-m9-question-pane" aria-label="Câu hỏi và đáp án">
                <h3 class="tv2-quiz-question tv2-m9-question-title text-slate-900 whitespace-pre-line">${escapeHtml(q.question_text)}</h3>
                ${practiceSpeakerBtnHtml}
                <div class="tv2-m9-answer-grid">
        ` : `
        ${mediaHtml}
        ${passageHtml}
        ${alphabet11ReviewHtml}
        ${topic1View ? topic1View.html : `<div class="flex flex-col items-center justify-center max-w-3xl text-center px-2 mb-0.5${isTopic78Wide ? ' tv2-m78-question-head' : ''}">
            <h3 class="tv2-quiz-question text-sm md:text-base lg:text-lg font-black text-slate-900 leading-snug ${!isEvaluationMode ? 'whitespace-pre-line' : ''}">
                ${escapeHtml(q.question_text)}
            </h3>
        </div>`}
        ${practiceSpeakerBtnHtml}
        
        <div class="w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-2.5 mt-1${isTopic78Wide ? ' tv2-m78-answer-grid' : ''}">
    `;

    q.options.forEach((opt, idx) => {
        const isTopic3EndingLetter = /^TV_2_M3_[123]$/.test(String(q.sub_id || ''));
        // Khám phá Mục 2–3: tôn trọng chữ thường trong JSON khi điền từ vào câu.
        const isTopic23WordChoice = !isEvaluationMode && /^TV_2_M[23]_/.test(String(q.sub_id || ''));
        const formattedOpt = (isTopic11 || isTopic3EndingLetter || isTopic23WordChoice) ? String(opt) : capitalizeFirstLetter(opt);
        const isSingleAlphabetLetter11 = isTopic11 && TV2_ALPHABET_29_.includes(String(opt).toLowerCase());
        const answerTextSize11 = isTopic11 ? (isSingleAlphabetLetter11 ? 'tv2-a11-answer-letter' : 'tv2-a11-answer-word') : '';
        const letter = String.fromCharCode(65 + idx);

        if (activeExamContext) {
            html += `
                <button data-opt="${escapeHtml(opt)}" onclick="checkAnswer('${opt.replace(/'/g, "\\'")}')" class="option-btn w-full p-2.5 md:p-3 bg-white hover:bg-pink-50/50 border border-pink-200 rounded-2xl font-extrabold text-gray-800 text-left transition-all flex items-center justify-between text-sm md:text-base shadow-xs">
                    <div class="flex items-center space-x-2.5">
                        <span class="opt-badge w-7 h-7 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center font-black text-sm shrink-0">${letter}</span>
                        <span class="opt-text">${escapeHtml(formattedOpt)}</span>
                    </div>
                    <span class="option-icon text-pink-500 text-base md:text-lg"></span>
                </button>`;
        } else {
            html += `
                <button data-opt="${escapeHtml(opt)}" onclick="checkAnswer('${opt.replace(/'/g, "\\'")}')" class="option-btn w-full p-3 md:p-3.5 bg-pink-50/40 hover:bg-pink-100/70 border-2 border-pink-200 rounded-2xl font-extrabold text-gray-800 text-left transition-all flex items-center justify-between text-sm md:text-base shadow-xs pastel-btn">
                    <span><strong class="text-pink-600 mr-3 text-base md:text-lg">${letter}.</strong> <span class="${answerTextSize11}">${escapeHtml(formattedOpt)}</span></span>
                    <span class="option-icon text-pink-500 text-base md:text-lg"></span>
                </button>`;
        }
    });
        html += isSideReadingLayout ? `</div></section></div>` : `</div>`;
    }

    document.getElementById('question-box').innerHTML = html;

    restoreQuestionState(q);
    updateNavButtons();
    updateQuizPalletUI();

    if (autoSpeechEnabled) speakCurrentQuestion();
}

function restoreQuestionState(q) {
    const isExam = !!activeExamContext;
    const completedAnswer = userAnswers[currentQIndex];
    const wrongAttempts = wrongAttemptsByQ[currentQIndex] || [];

    if (isExam) {
        document.querySelectorAll('.option-btn').forEach(b => {
            const bOpt = b.getAttribute('data-opt');
            const badge = b.querySelector('.opt-badge');
            const iconSpan = b.querySelector('.option-icon');

            if (completedAnswer !== undefined && bOpt === completedAnswer) {
                b.className = "option-btn w-full p-2.5 md:p-3 bg-pink-50/30 border-2 border-pink-500 rounded-2xl font-extrabold text-gray-900 text-left transition-all flex items-center justify-between text-sm md:text-base shadow-xs";
                if (badge) badge.className = "opt-badge w-7 h-7 rounded-xl bg-pink-500 text-white flex items-center justify-center font-black text-sm shrink-0 shadow-xs";
                if (iconSpan) iconSpan.innerHTML = '<i class="fa-regular fa-circle-check text-pink-600 text-lg"></i>';
            } else {
                b.className = "option-btn w-full p-2.5 md:p-3 bg-white hover:bg-pink-50/50 border border-pink-200 rounded-2xl font-extrabold text-gray-800 text-left transition-all flex items-center justify-between text-sm md:text-base shadow-xs";
                if (badge) badge.className = "opt-badge w-7 h-7 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center font-black text-sm shrink-0";
                if (iconSpan) iconSpan.innerHTML = '';
            }
        });
        return;
    }

    if (!!activeRoadmapContext) {
        if (completedAnswer === undefined) return;
        const isCorrect = completedAnswer === q.answer;
        document.querySelectorAll('.option-btn').forEach(b => {
            b.disabled = true;
            const bOpt = b.getAttribute('data-opt');
            if (bOpt === q.answer) {
                b.classList.remove('bg-pink-50/40', 'border-pink-200');
                b.classList.add('bg-green-100', 'border-green-400', 'text-green-800');
            } else if (!isCorrect && bOpt === completedAnswer) {
                b.classList.remove('bg-pink-50/40', 'border-pink-200');
                b.classList.add('bg-red-200', 'border-red-500', 'text-red-900');
            }
        });
        return;
    }

    if (wrongAttempts.length > 0) {
        document.querySelectorAll('.option-btn').forEach(b => {
            const bOpt = b.getAttribute('data-opt');
            if (wrongAttempts.includes(bOpt)) {
                b.classList.remove('bg-pink-50/40', 'border-pink-200');
                b.classList.add('bg-red-200', 'border-red-500', 'text-red-900');
                b.disabled = true;
            }
        });
    }

    if (completedAnswer !== undefined) {
        document.querySelectorAll('.option-btn').forEach(b => {
            const bOpt = b.getAttribute('data-opt');
            if (bOpt === completedAnswer) {
                b.classList.remove('bg-pink-50/40', 'border-pink-200');
                b.classList.add('bg-green-100', 'border-green-400', 'text-green-800');
                b.disabled = true;
            }
        });
    }
}

function updateNavButtons() {
    const isEvaluationMode = !!activeExamContext || !!activeRoadmapContext;
    const btnPrev = isEvaluationMode ? document.getElementById('btn-prev-q-exam') : document.getElementById('btn-prev-q-prac');
    const nextText = isEvaluationMode ? document.getElementById('btn-next-text-exam') : document.getElementById('btn-next-text-prac');
    const nextIcon = isEvaluationMode ? document.getElementById('btn-next-icon-exam') : document.getElementById('btn-next-icon-prac');

    if (!btnPrev) return;

    if (currentQIndex === 0) {
        btnPrev.disabled = true;
        btnPrev.classList.add('opacity-40', 'cursor-not-allowed');
    } else {
        btnPrev.disabled = false;
        btnPrev.classList.remove('opacity-40', 'cursor-not-allowed');
    }

    if (currentQIndex === activeQuestionsList.length - 1) {
        if (isEvaluationMode) {
            nextText.textContent = "Hoàn thành";
            nextIcon.className = "fa-solid fa-trophy ml-1.5";
        } else {
            nextText.textContent = "Vòng tiếp theo";
            nextIcon.className = "fa-solid fa-rotate-right ml-1.5";
        }
    } else {
        nextText.textContent = "Câu tiếp theo";
        nextIcon.className = "fa-solid fa-chevron-right ml-1.5";
    }
}

function checkAnswer(selectedOpt) {
    const q = activeQuestionsList[currentQIndex];
    const isExam = !!activeExamContext;
    const isRoadmap = !!activeRoadmapContext;

    // RIÊNG ĐỀ THI: YÊN TĨNH TUYỆT ĐỐI, SÁNG VIỀN HỒNG, KHÔNG PHÁT ÂM THANH
    if (isExam) {
        userAnswers[currentQIndex] = selectedOpt;

        document.querySelectorAll('.option-btn').forEach(b => {
            const bOpt = b.getAttribute('data-opt');
            const badge = b.querySelector('.opt-badge');
            const iconSpan = b.querySelector('.option-icon');

            if (bOpt === selectedOpt) {
                b.className = "option-btn w-full p-2.5 md:p-3 bg-pink-50/30 border-2 border-pink-500 rounded-2xl font-extrabold text-gray-900 text-left transition-all flex items-center justify-between text-sm md:text-base shadow-xs";
                if (badge) badge.className = "opt-badge w-7 h-7 rounded-xl bg-pink-500 text-white flex items-center justify-center font-black text-sm shrink-0 shadow-xs";
                if (iconSpan) iconSpan.innerHTML = '<i class="fa-regular fa-circle-check text-pink-600 text-lg"></i>';
            } else {
                b.className = "option-btn w-full p-2.5 md:p-3 bg-white hover:bg-pink-50/50 border border-pink-200 rounded-2xl font-extrabold text-gray-800 text-left transition-all flex items-center justify-between text-sm md:text-base shadow-xs";
                if (badge) badge.className = "opt-badge w-7 h-7 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center font-black text-sm shrink-0";
                if (iconSpan) iconSpan.innerHTML = '';
            }
        });

        updateQuizPalletUI();
        return;
    }

    // RIÊNG TIẾN TRÌNH TUẦN: CHỈ ĐƯỢC CHỌN 1 LẦN DUY NHẤT ĐỂ GHI NHẬN ĐÚNG/SAI CHÍNH XÁC
    if (isRoadmap) {
        if (userAnswers[currentQIndex] !== undefined) return;

        const isCorrect = selectedOpt === q.answer;
        userAnswers[currentQIndex] = selectedOpt;

        if (isCorrect) {
            score += (q.diem ?? 0.5);
            starGreenCount++;
            document.getElementById('star-green-count').textContent = starGreenCount;
        } else {
            starRedCount++;
            document.getElementById('star-red-count').textContent = starRedCount;
        }

        document.querySelectorAll('.option-btn').forEach(b => {
            b.disabled = true;
            const bOpt = b.getAttribute('data-opt');
            if (bOpt === q.answer) {
                b.classList.remove('bg-pink-50/40', 'border-pink-200');
                b.classList.add('bg-green-100', 'border-green-400', 'text-green-800');
            } else if (bOpt === selectedOpt) {
                b.classList.remove('bg-pink-50/40', 'border-pink-200');
                b.classList.add('bg-red-200', 'border-red-500', 'text-red-900');
            }
        });

        if (isCorrect) {
            playAudio('correct');
            confetti({ particleCount: 30, spread: 55, origin: { y: 0.7 } });
            setTimeout(() => speakVietnamese(`${q.answer}`), 180);
        } else {
            playAudio('wrong');
        }

        updateQuizPalletUI();
        return;
    }

    // CHẾ ĐỘ LUYỆN TẬP TỰ DO
    const isCorrect = selectedOpt === q.answer;
    if (userAnswers[currentQIndex] !== undefined) return;

    if (isCorrect) {
        userAnswers[currentQIndex] = selectedOpt;
        score += (q.diem ?? 0.5);
        starGreenCount++;
        document.getElementById('star-green-count').textContent = starGreenCount;

        document.querySelectorAll('.option-btn').forEach(b => {
            b.disabled = true;
            if (b.getAttribute('data-opt') === q.answer) {
                b.classList.remove('bg-pink-50/40', 'border-pink-200');
                b.classList.add('bg-green-100', 'border-green-400', 'text-green-800');
            }
        });

        playAudio('correct');
        confetti({ particleCount: 30, spread: 55, origin: { y: 0.7 } });
        setTimeout(() => speakVietnamese(`${q.answer}`), 180);
        queueLearningEvent_(q, 'correct', {
            topicId: activeTopicId,
            supportUsed: (wrongAttemptsByQ[currentQIndex]?.length || 0) > 0 ? 1 : 0
        });
        scheduleTopic23AutoAdvance_();
    } else {
        if (!wrongAttemptsByQ[currentQIndex]) wrongAttemptsByQ[currentQIndex] = [];
        if (!wrongAttemptsByQ[currentQIndex].includes(selectedOpt)) {
            wrongAttemptsByQ[currentQIndex].push(selectedOpt);
            if (wrongAttemptsByQ[currentQIndex].length === 1) {
                queueLearningEvent_(q, 'wrong', {
                    topicId: activeTopicId,
                    errorType: adaptiveErrorType_(q, selectedOpt, activeTopicId)
                });
            }
            starRedCount++;
            document.getElementById('star-red-count').textContent = starRedCount;
        }

        document.querySelectorAll('.option-btn').forEach(b => {
            if (b.getAttribute('data-opt') === selectedOpt) {
                b.classList.remove('bg-pink-50/40', 'border-pink-200');
                b.classList.add('bg-red-200', 'border-red-500', 'text-red-900');
                b.disabled = true;
            }
        });

        playAudio('wrong');
    }

    updateQuizPalletUI();
}

function prevQuestion() {
    clearTopic23AutoAdvance_();
    stopSpeaking();
    if (currentQIndex > 0) {
        currentQIndex--;
        loadQuestion();
    }
}

async function nextQuestion() {
    clearTopic23AutoAdvance_();
    stopSpeaking();
    const isEvaluationMode = !!activeExamContext || !!activeRoadmapContext;

    if (!isEvaluationMode && userAnswers[currentQIndex] === undefined) {
        showAppToast('Bé hãy tìm đáp án đúng để hoàn thành câu này nhé!', 'warning', 1700);
        return;
    }

    if (currentQIndex < activeQuestionsList.length - 1) {
        currentQIndex++;
        loadQuestion();
    } else {
        if (isEvaluationMode) {
            showResultScreen();
        } else {
            confetti({ particleCount: 75, spread: 75, origin: { y: 0.6 } });
            playAudio('win');
            await showAppDialog(`Bé đã hoàn thành trọn vẹn 1 vòng luyện tập (${activeQuestionsList.length} câu)!\nCô sẽ xáo trộn câu hỏi để bé bước vào vòng tiếp theo nhé!`, { type:'success', title:'Hoàn thành một vòng!', okText:'Luyện tiếp' });

            const basePool = practiceCycleRawPool.length ? practiceCycleRawPool : activeQuestionsList;
            activeQuestionsList = buildAdaptiveQuestionOrder_(basePool, activeTopicId);
            currentQIndex = 0;
            userAnswers = {};
            wrongAttemptsByQ = {};
            loadQuestion();
        }
    }
}

async function triggerSubmitQuizPrompt() {
    const answeredCount = Object.keys(userAnswers).length;
    const total = activeQuestionsList.length;
    const ok = await showAppConfirm(`Bé đã làm ${answeredCount}/${total} câu. Bé có chắc chắn muốn nộp bài thi ngay không?`, {
        title: 'Nộp bài thi?',
        icon: '📝',
        okText: 'Nộp bài',
        cancelText: 'Làm tiếp'
    });
    if (ok) showResultScreen();
}

function showResultScreen() {
    stopSpeaking();
    clearInterval(quizTimerInterval);

    let correctCount = 0;
    score = 0;
    quizAnsweredLog = [];
    quizWrongAnswers = [];

    activeQuestionsList.forEach((q, idx) => {
        const studentAns = userAnswers[idx];
        const isCorrect = studentAns === q.answer;
        if (isCorrect) {
            correctCount++;
            score += (q.diem ?? 0.5);
        } else {
            quizWrongAnswers.push({
                question_id: q.question_id,
                question_number: idx + 1,
                question_text: q.question_text,
                sub_topic: q.sub_topic || 'Chủ đề tổng hợp',
                skill_tag: q.skill_tag || '',
                dap_an_chon: studentAns || 'Chưa trả lời',
                dap_an_dung: q.answer,
                explanation: q.explanation || 'Không có giải thích chi tiết.'
            });
        }
        quizAnsweredLog.push({
            question_id: q.question_id,
            question_text: q.question_text,
            skill_tag: q.skill_tag || '',
            source_topic_id: q.source_topic_id,
            diem: q.diem ?? 0.5,
            isCorrect,
            dap_an_chon: studentAns || '',
            dap_an_dung: q.answer
        });
    });

    switchAppView('view-result');
    const totalQ = activeQuestionsList.length;
    const percent = Math.round((correctCount / totalQ) * 100);

    // Tiến trình tuần: điểm tính riêng theo công thức 10/tổng số câu (không dùng điểm từng câu để tránh lệch)
    const displayScore = activeRoadmapContext
        ? Math.round((correctCount * 10 / totalQ) * 10) / 10
        : score;

    const examBadgeText = activeExamContext ? activeExamContext.examTitle : (activeRoadmapContext ? activeRoadmapContext.chuDe : 'Bài luyện tập chủ đề');
    document.getElementById('report-exam-badge').textContent = examBadgeText;
    document.getElementById('report-student-display').textContent = `Học sinh: ${currentUser?.hoTen || 'Khách'}`;
    const durationStr = quizStartTime ? formatDuration(Date.now() - quizStartTime) : '35 phút';
    document.getElementById('report-meta-display').textContent = `Mã ID: ${currentUser?.maHS || 'KHACH'} | Thời gian: ${durationStr}`;
    document.getElementById('report-total-score-val').textContent = displayScore.toFixed(1);
    document.getElementById('report-correct-ratio-val').textContent = `${correctCount}/${totalQ}`;

    renderReportTopicsBreakdown();

    const nextActionLabel = document.getElementById('report-next-action-label');
    if (nextActionLabel) {
        nextActionLabel.textContent = activeRoadmapContext ? '🔙 Quay lại Bài tập' : '🚀 Làm đề thi tiếp theo';
    }

    const historyBtn = document.getElementById('report-history-btn');
    if (historyBtn) {
        const isHsgScoreOnly = !!activeExamContext && String(activeExamContext.categoryKey || '').toLowerCase() === 'hsg';
        historyBtn.classList.toggle('hidden', isHsgScoreOnly);
        const targetSheet = activeRoadmapContext
            ? 'LichSuTienTrinhTuan'
            : (examFileMap[activeExamContext?.categoryKey]?.sheet || 'LichSuBaiThi_HK1');
        historyBtn.setAttribute('onclick', `openHistoryModal('${targetSheet}')`);
    }

    if (percent >= 80) {
        confetti({ particleCount: 130, spread: 85, origin: { y: 0.6 } });
        playAudio('win');
    }

    if (currentUser && !currentUser.isGuest) {
        if (activeExamContext) saveExamResultToSheet();
        else if (activeRoadmapContext) saveWeeklyProgressToSheet(percent, starCountFromPercent(percent), displayScore);
        const isHsgScoreOnly = !!activeExamContext && String(activeExamContext.categoryKey || '').toLowerCase() === 'hsg';
        if (activeRoadmapContext || (activeExamContext && !isHsgScoreOnly)) recordEvaluationToAdaptive_();
    }
}

function starCountFromPercent(percent) {
    if (percent === 100) return 3;
    if (percent >= 85) return 2;
    if (percent >= 80) return 1;
    return 0;
}

function getExamMinQuestionsPerCompetency_() {
    const n = Number(activeExamContext?.assessmentPolicy?.min_questions_per_competency ?? 2);
    return Number.isFinite(n) && n > 0 ? n : 2;
}

function renderReportTopicsBreakdown() {
    const container = document.getElementById('report-topics-list');
    if (!container) return;

    const isRoadmap = !!activeRoadmapContext;
    const competencyCard = container.parentElement;
    if (activeExamContext && String(activeExamContext.categoryKey || '').toLowerCase() === 'hsg') {
        if (competencyCard) competencyCard.classList.add('hidden');
        container.innerHTML = '';
        return;
    }
    if (competencyCard) competencyCard.classList.remove('hidden');
    const skillKeys = ['C1', 'C2', 'C3', 'C4', 'C5', 'C6'];
    const skillStats = {};
    skillKeys.forEach(k => {
        skillStats[k] = { total: 0, correct: 0, maxScore: 0, earnedScore: 0 };
    });

    activeQuestionsList.forEach((q, idx) => {
        let tag;
        if (isRoadmap) {
            const rawTag = String(q.skill_tag || q.competency || '').toUpperCase();
            const match = rawTag.match(/C([1-6])/);
            tag = match ? `C${match[1]}` : null;
        } else {
            const rawTag = String(q.skill_tag || q.competency || '').toUpperCase();
            const match = rawTag.match(/C([1-6])/);
            tag = match ? `C${match[1]}` : null;
        }
        if (!tag || !skillStats[tag]) return;

        skillStats[tag].total++;
        skillStats[tag].maxScore += Number(q.diem ?? 0.5);
        if (userAnswers[idx] === q.answer) {
            skillStats[tag].correct++;
            skillStats[tag].earnedScore += Number(q.diem ?? 0.5);
        }
    });

    const minQuestions = isRoadmap ? 2 : getExamMinQuestionsPerCompetency_();
    let html = '';

    skillKeys.forEach(k => {
        const data = skillStats[k];
        let status = 'assessed';
        if (data.total === 0) status = 'not_assessed';
        else if (data.total < minQuestions) status = 'insufficient_data';

        if (status !== 'assessed') {
            const label = status === 'not_assessed' ? 'Chưa đánh giá' : 'Chưa đủ dữ liệu';
            const note = status === 'not_assessed'
                ? 'Đề này không có câu hỏi phù hợp để đo năng lực này.'
                : `Mới có ${data.total} câu phù hợp; cần tối thiểu ${minQuestions} câu để kết luận.`;
            html += `
                <div class="bg-slate-50/80 border border-slate-200 rounded-2xl p-3 flex flex-col justify-between space-y-2">
                    <div class="flex items-center justify-between gap-2">
                        <span class="font-black text-slate-700 text-xs sm:text-sm">${SKILL_TAXONOMY[k].name}</span>
                        <span class="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-slate-100 text-slate-600 border border-slate-200">${label}</span>
                    </div>
                    <p class="text-[11px] sm:text-xs font-bold text-slate-500 leading-relaxed">${note}</p>
                    <div class="w-full bg-slate-200/70 rounded-full h-2 overflow-hidden"></div>
                </div>
            `;
            return;
        }

        const pct = isRoadmap
            ? Math.round((data.correct / data.total) * 100)
            : Math.round((data.earnedScore / data.maxScore) * 100);
        const isPassed = pct >= 50;
        const badgeClass = isPassed ? 'bg-amber-100 text-amber-800 border border-amber-200' : 'bg-rose-50 text-rose-700 border border-rose-200';
        const badgeText = isPassed ? 'Đạt yêu cầu' : 'Cần luyện tập thêm';
        const barColor = isPassed ? 'bg-gradient-to-r from-amber-400 to-orange-400' : 'bg-gradient-to-r from-pink-400 to-rose-400';
        const scoreLine = isRoadmap
            ? `<span>Số câu đúng: <strong class="text-pink-600">${data.correct}/${data.total} câu</strong></span>`
            : `<span>Điểm đạt: <strong class="text-pink-600">${data.earnedScore.toFixed(1)} / ${data.maxScore.toFixed(1)}đ</strong> · ${data.total} câu</span>`;

        html += `
            <div class="bg-pink-50/40 border border-pink-100 rounded-2xl p-3 flex flex-col justify-between space-y-2">
                <div class="flex items-center justify-between gap-2">
                    <span class="font-black text-slate-800 text-xs sm:text-sm">${SKILL_TAXONOMY[k].name}</span>
                    <span class="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold ${badgeClass}">${badgeText}</span>
                </div>
                <div class="flex items-center justify-between gap-2 text-xs font-bold text-slate-600">
                    ${scoreLine}
                    <span class="font-math font-black">${pct}%</span>
                </div>
                <div class="w-full bg-pink-100 rounded-full h-2 overflow-hidden">
                    <div class="${barColor} h-full rounded-full transition-all duration-500" style="width: ${pct}%"></div>
                </div>
            </div>
        `;
    });
    container.innerHTML = html;
}

function openReviewWrongModal() {
    const modal = document.getElementById('modal-review-wrong');
    const content = document.getElementById('review-wrong-content');
    if (!modal || !content) return;

    if (!quizWrongAnswers.length) {
        content.innerHTML = `<div class="text-center py-8 text-emerald-600 font-extrabold text-base"><i class="fa-solid fa-circle-check text-3xl mb-2 block"></i>Tuyệt vời! Bé không làm sai câu nào trong bài thi này!</div>`;
    } else {
        let html = '';
        quizWrongAnswers.forEach((item, idx) => {
            html += `
                <div class="bg-rose-50/40 border border-rose-200 rounded-2xl p-3.5 space-y-2">
                    <div class="flex items-center justify-between">
                        <span class="px-2.5 py-0.5 bg-rose-100 text-rose-800 font-black text-xs rounded-lg">CÂU ${item.question_number || (idx + 1)}</span>
                        <span class="text-xs font-bold text-slate-500">${escapeHtml(item.sub_topic || 'Chủ đề tổng hợp')}</span>
                    </div>
                    <p class="font-extrabold text-slate-800 text-sm">${escapeHtml(item.question_text)}</p>
                    <div class="text-xs space-y-1 font-semibold">
                        <p class="text-rose-600"><i class="fa-solid fa-xmark mr-1"></i> Đáp án con chọn: <strong>${escapeHtml(item.dap_an_chon)}</strong></p>
                        <p class="text-emerald-700"><i class="fa-solid fa-check mr-1"></i> Đáp án đúng chuẩn: <strong>${escapeHtml(item.dap_an_dung)}</strong></p>
                    </div>
                    <div class="p-2.5 bg-amber-50/80 border border-amber-200 rounded-xl text-xs text-amber-900 font-semibold flex items-start gap-2">
                        <i class="fa-solid fa-lightbulb text-amber-600 mt-0.5"></i>
                        <span><strong>Lời giải sư phạm:</strong> ${escapeHtml(item.explanation)}</span>
                    </div>
                </div>
            `;
        });
        content.innerHTML = html;
    }
    modal.classList.remove('hidden');
}

function closeReviewWrongModal() {
    document.getElementById('modal-review-wrong').classList.add('hidden');
}

// ==========================================
// LƯU KẾT QUẢ & ĐỒNG BỘ ĐIỂM C1-C6 LÊN GOOGLE SHEETS
// ==========================================
async function saveExamResultToSheet() {
    if (!activeExamContext || !currentUser || currentUser.isGuest) return;
    const categoryKey=String(activeExamContext.categoryKey||'');
    const examCategory=categoryKey==='hocky1'?'hk1':categoryKey==='hocky2'?'hk2':'hsg';
    const assessmentId=String(activeExamContext.examId||''); if(!assessmentId) return;
    try {
        await tvModuleCtx_.apiRequest('assessmentAttemptSubmit',{subjectId:'tv',kind:'baithi',examCategory,assessmentId,attemptId:newTvAssessmentAttemptId_(),answers:assessmentAnswersPayloadTV2_(),durationMs:quizStartTime?Math.max(0,Date.now()-quizStartTime):0});
    } catch(err) { handleTvAssessmentBackendUnavailable_(err); }
}

async function openHistoryModal(sheetName = 'LichSuTienTrinhTuan') {
    if (!currentUser || currentUser.isGuest) {
        openAuthScreen('login'); return;
    }
    if (String(sheetName || '').includes('HSG')) {
        await showAppDialog('Đề Học sinh giỏi chỉ chấm điểm/kết quả và không tạo báo cáo sáu năng lực.', {type:'info', title:'Học sinh giỏi', icon:'🏆'});
        return;
    }

    const modal = document.getElementById('modal-history-progress');
    modal.classList.remove('hidden');

    document.getElementById('hist-info-name').textContent = currentUser.hoTen || '--';
    document.getElementById('hist-info-code').textContent = currentUser.maHS || '--';
    document.getElementById('hist-report-date').textContent = new Date().toLocaleDateString('vi-VN');

    const titleMap = {
        LichSuTienTrinhTuan: "Báo cáo tiến trình Bài tập",
        LichSuBaiThi_HK1: "Báo cáo kết quả đấu trường — Học kỳ 1",
        LichSuBaiThi_HK2: "Báo cáo kết quả đấu trường — Học kỳ 2",
        LichSuBaiThi_HSG: "Báo cáo kết quả đấu trường — Học sinh giỏi"
    };
    document.getElementById('hist-modal-title').textContent = titleMap[sheetName] || "Kết quả tiến trình học tập";

    showLoadingOverlay('Đang trích xuất dữ liệu và vẽ biểu đồ năng lực...');
    try {
        const res = await callAppsScript('getHistory', { maHS: currentUser.maHS, sheetName, sessionToken: getSessionToken() });
        hideLoadingOverlay();
        if (res && res.ok === false) {
            // Token hết hạn/không hợp lệ hoặc không đúng chủ - đóng modal, báo rõ thay vì âm thầm
            // hiện báo cáo trống (dễ gây hiểu lầm là bé chưa học gì).
            closeHistoryModal();
            await showAppDialog(res.error || 'Không thể tải lịch sử - bé đăng nhập lại nhé!', { type:'error' });
            return;
        }
        const rows = (res && res.history) ? res.history : [];
        renderHistoryReport(rows, sheetName);
    } catch (err) {
        hideLoadingOverlay();
        await showAppDialog('Không thể tải lịch sử: ' + err.message, { type:'error' });
    }
}

function closeHistoryModal() {
    document.getElementById('modal-history-progress').classList.add('hidden');
    if (histLineChartInstance) { histLineChartInstance.destroy(); histLineChartInstance = null; }
    if (histBarChartInstance) { histBarChartInstance.destroy(); histBarChartInstance = null; }
}

// ==========================================
// BIỂU ĐỒ THANH NGANG & BẢNG KÈM HÀNG TRUNG BÌNH
// ==========================================
function getSkillCell(row, skillKey) {
    const taxo = SKILL_TAXONOMY[skillKey];
    const correct = Number(row[taxo.sheetCol]);
    const total = Number(row[taxo.totalCol]);
    if (!row[taxo.totalCol] || isNaN(total) || total <= 0) return null;
    return { correct: isNaN(correct) ? 0 : correct, total };
}

function formatDateOnly(value) {
    if (!value) return '--';
    const d = new Date(value);
    if (isNaN(d.getTime())) return String(value).split('T')[0] || String(value);
    return d.toLocaleDateString('vi-VN');
}

function formatDateShort(value) {
    const d = value ? new Date(value) : null;
    if (!d || isNaN(d.getTime())) return '';
    return `${String(d.getDate()).padStart(2, '0')}-${String(d.getMonth() + 1).padStart(2, '0')}`;
}

function renderHistoryReport(rows, sheetName) {
    const isWeekly = sheetName === 'LichSuTienTrinhTuan';
    const labels = rows.map((r, i) => {
        const dm = formatDateShort(r.Timestamp || r.ngayLam);
        const label = isWeekly ? `Tuần ${r.tuan || i + 1}` : (r.deSo ? `Đề ${r.deSo}` : `Tuần ${r.tuan || i + 1}`);
        return dm ? `${dm} ${label}` : label;
    });
    const scores = rows.map(r => Number(r.score || r.tongDiem || ((r.soCauDung / (r.tongCauHoi || 30)) * 10).toFixed(1)));

    const ctxLine = document.getElementById('progressChartCanvas').getContext('2d');
    if (histLineChartInstance) histLineChartInstance.destroy();

    histLineChartInstance = new Chart(ctxLine, {
        type: 'line',
        data: {
            labels: labels.length ? labels : ['Chưa có bài thi'],
            datasets: [{
                label: 'Điểm số (/10)',
                data: scores.length ? scores : [0],
                borderColor: '#e11d48',
                backgroundColor: 'rgba(254, 226, 226, 0.5)',
                borderWidth: 3.5,
                pointBackgroundColor: '#be123c',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 2,
                pointRadius: 6,
                pointHoverRadius: 8,
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    min: 0, max: 10.5,
                    ticks: { stepSize: 2, color: '#000000', font: { family: 'Quicksand', weight: 'bold' } }
                },
                x: {
                    grid: { display: false },
                    ticks: {
                        color: '#000000',
                        font: { family: 'Quicksand', weight: 'bold', size: 11 },
                        maxRotation: 90,
                        minRotation: 90
                    }
                }
            },
            plugins: { legend: { display: false } }
        }
    });

    const skillKeys = ['C1', 'C2', 'C3', 'C4', 'C5', 'C6'];
    const skillAverages = { C1: null, C2: null, C3: null, C4: null, C5: null, C6: null };
    const touchedSkills = [];
    const insufficientSkills = [];

    if (rows.length && isWeekly) {
        // Tiến trình tuần: % = tổng số câu đúng / tổng số câu đã làm THẬT của nhóm kỹ năng đó.
        skillKeys.forEach((k) => {
            let sumCorrect = 0, sumTotal = 0;
            rows.forEach(r => {
                const cell = getSkillCell(r, k);
                if (!cell) return;
                sumCorrect += cell.correct;
                sumTotal += cell.total;
            });
            if (sumTotal > 0) {
                skillAverages[k] = Math.min(100, Math.round((sumCorrect / sumTotal) * 100));
                touchedSkills.push(k);
            }
        });
    } else if (rows.length) {
        const legacyMax = { C1: 1.5, C2: 1.0, C3: 1.5, C4: 2.0, C5: 2.0, C6: 2.0 };
        skillKeys.forEach((k) => {
            const colName = SKILL_TAXONOMY[k].sheetCol;
            let earned = 0, maxScore = 0, questionCount = 0, rowsWithData = 0;

            rows.forEach(r => {
                const raw = r[`diem${k}`] ?? r[colName] ?? r[`diem_${k.toLowerCase()}`] ?? r[k];
                if (raw === undefined || raw === null || raw === '' || raw === '--') return;
                const value = Number(raw);
                if (!Number.isFinite(value)) return;

                const rawMax = r[`${colName}_Max`] ?? r[`${k}_Max`];
                const rawCount = r[`${colName}_Cau`] ?? r[`${k}_Cau`];
                const rowMax = Number(rawMax);
                const rowCount = Number(rawCount);
                earned += value;
                maxScore += Number.isFinite(rowMax) && rowMax > 0 ? rowMax : legacyMax[k];
                questionCount += Number.isFinite(rowCount) && rowCount > 0 ? rowCount : 2;
                rowsWithData++;
            });

            if (!rowsWithData) return; // Chưa đánh giá: giữ null, tuyệt đối không đổi thành 0%.
            if (questionCount < 2 || maxScore <= 0) {
                insufficientSkills.push(k);
                return;
            }
            skillAverages[k] = Math.min(100, Math.round((earned / maxScore) * 100));
            touchedSkills.push(k);
        });
    }

    const ctxBar = document.getElementById('topicRadarChartCanvas').getContext('2d');
    if (histBarChartInstance) histBarChartInstance.destroy();

    histBarChartInstance = new Chart(ctxBar, {
        type: 'bar',
        data: {
            labels: skillKeys.map(k => SKILL_TAXONOMY[k].name),
            datasets: [{
                label: 'Độ thành thạo (%)',
                data: skillKeys.map(k => skillAverages[k] === null ? null : skillAverages[k]),
                backgroundColor: ['#f472b6', '#fb7185', '#f59e0b', '#a855f7', '#ec4899', '#e11d48'],
                borderRadius: 8,
                borderSkipped: false,
                barThickness: 16
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    min: 0,
                    max: 100,
                    ticks: { stepSize: 20, callback: (v) => v + '%', color: '#000000', font: { family: 'Quicksand', weight: 'bold' } },
                    grid: { color: 'rgba(251, 207, 232, 0.3)' }
                },
                y: {
                    grid: { display: false },
                    ticks: { font: { family: 'Quicksand', weight: 'bold', size: 14 }, color: '#000000' }
                }
            },
            plugins: {
                legend: { display: false },
                tooltip: { callbacks: { label: (ctx) => ctx.raw === null ? ' Chưa đánh giá' : ` Độ thành thạo: ${ctx.raw}%` } }
            }
        },
        plugins: [{
            id: 'barValueLabels',
            afterDatasetsDraw(chart) {
                const { ctx } = chart;
                chart.data.datasets[0].data.forEach((val, i) => {
                    const meta = chart.getDatasetMeta(0).data[i];
                    if (!meta) return;
                    ctx.save();
                    ctx.font = 'bold 16px Quicksand, sans-serif';
                    ctx.fillStyle = '#1e293b';
                    ctx.textAlign = 'left';
                    ctx.textBaseline = 'middle';
                    const x = val === null ? chart.scales.x.getPixelForValue(0) + 6 : meta.x + 6;
                    ctx.fillText(val === null ? 'Chưa đánh giá' : `${val}%`, x, meta.y);
                    ctx.restore();
                });
            }
        }]
    });

    renderPedagogicalEvaluation(rows, skillAverages, touchedSkills);
    renderHistoryTable(rows, sheetName);
}

function renderPedagogicalEvaluation(rows, skillAverages, touchedSkills) {
    const box = document.getElementById('pedagogical-evaluation-box');
    if (!box) return;

    const studentName = getStudentFirstName();
    const count = rows.length;
    const avgScore = count ? (rows.reduce((acc, r) => acc + Number(r.score || r.tongDiem || 0), 0) / count) : 0;
    const avgScoreStr = avgScore.toFixed(1);

    // 1. Đánh giá tổng quan — phải khớp thật với điểm số, không khen chung chung bất kể kết quả
    let overviewText;
    if (avgScore >= 8) {
        overviewText = `Kết quả chung của các bài thi ở mức cao; đây là điểm tổng hợp, còn từng năng lực được xem riêng theo những câu thực sự đã đo.`;
    } else if (avgScore >= 6.5) {
        overviewText = `Kết quả chung của các bài thi ở mức khá; từng năng lực vẫn được xem riêng theo dữ liệu câu hỏi tương ứng.`;
    } else if (avgScore >= 5) {
        overviewText = `Kết quả chung đang ở mức đạt; cần xem từng năng lực đã được đo để chọn đúng phần cần ôn.`;
    } else {
        overviewText = `Kết quả chung còn thấp; cần dựa vào các năng lực đã được đo để xác định đúng phần cần ôn, không suy từ điểm tổng sang nhóm chưa được kiểm tra.`;
    }

    // 2 & 3. Thế mạnh / điểm cần khắc phục — CHỈ lấy từ những nhóm bé đã thực sự luyện tập,
    // tuyệt đối không nhận xét về nhóm bé chưa hề động tới (tránh nói sai với thực tế).
    const validSkills = (touchedSkills && touchedSkills.length) ? touchedSkills : [];
    const sortedValid = [...validSkills].sort((a, b) => skillAverages[b] - skillAverages[a]);

    let strengthHtml, weaknessHtml;
    if (sortedValid.length >= 2) {
        const top1 = SKILL_TAXONOMY[sortedValid[0]].name;
        const top2 = SKILL_TAXONOMY[sortedValid[1]].name;
        strengthHtml = `Con đạt độ thành thạo tốt ở các nhóm: <strong>${escapeHtml(top1)}</strong> (${skillAverages[sortedValid[0]]}%) và <strong>${escapeHtml(top2)}</strong> (${skillAverages[sortedValid[1]]}%).`;

        const weak1 = sortedValid[sortedValid.length - 1];
        weaknessHtml = `Con cần luyện thêm ở mảng: <strong>${escapeHtml(SKILL_TAXONOMY[weak1].name)}</strong> (${skillAverages[weak1]}%). ${escapeHtml(SKILL_TAXONOMY[weak1].advice)}`;
    } else if (sortedValid.length === 1) {
        const only1 = sortedValid[0];
        strengthHtml = `Con đạt ${skillAverages[only1]}% ở nhóm <strong>${escapeHtml(SKILL_TAXONOMY[only1].name)}</strong> — mảng duy nhất bé đã luyện tập tới thời điểm này.`;
        weaknessHtml = `Bài kiểm tra mới có đủ dữ liệu ở 1 nhóm năng lực; các nhóm còn lại sẽ chỉ được kết luận khi có đủ câu hỏi phù hợp.`;
    } else {
        strengthHtml = `Chưa có nhóm năng lực nào đủ dữ liệu để kết luận thế mạnh.`;
        weaknessHtml = `Chưa có nhóm năng lực nào đủ dữ liệu để kết luận điểm cần khắc phục.`;
    }

    box.innerHTML = `
        <div class="bg-white/80 p-3 rounded-xl border border-amber-200">
            <span class="text-amber-700 font-extrabold block mb-0.5">🌟 1. Đánh giá tổng quan năng lực & xu hướng tiến bộ:</span>
            <p class="text-gray-700">Học sinh <strong>${escapeHtml(currentUser.hoTen)}</strong> đã hoàn thành <strong>${count} bài kiểm tra</strong> với điểm số trung bình tích lũy đạt <strong class="text-pink-600">${avgScoreStr}/10 điểm</strong>. ${overviewText}</p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div class="bg-emerald-50/70 p-3 rounded-xl border border-emerald-200">
                <span class="text-emerald-700 font-extrabold block mb-0.5">✅ 2. Khen ngợi & thế mạnh nổi trội:</span>
                <p class="text-gray-700">${strengthHtml}</p>
            </div>

            <div class="bg-rose-50/70 p-3 rounded-xl border border-rose-200">
                <span class="text-rose-700 font-extrabold block mb-0.5">⚠️ 3. Điểm cần lưu ý & khắc phục:</span>
                <p class="text-gray-700">${weaknessHtml}</p>
            </div>
        </div>

        <div class="bg-white/80 p-3 rounded-xl border border-purple-200">
            <span class="text-purple-700 font-extrabold block mb-0.5">💡 4. Kế hoạch bồi dưỡng & hướng dẫn phụ huynh:</span>
            <p class="text-gray-700">Ba mẹ nên dành 15 phút mỗi tối cùng con đọc truyện ngụ ngôn, đặt câu hỏi gợi mở và khen ngợi kịp thời để giúp ${studentName} giữ vững ngọn lửa say mê môn Tiếng Việt nhé!</p>
        </div>
    `;
}

function renderHistoryTable(rows, sheetName) {
    const tbody = document.getElementById('hist-table-body');
    if (!tbody) return;

    if (!rows.length) {
        tbody.innerHTML = `<tr><td colspan="11" class="py-4 text-gray-400">Chưa ghi nhận lịch sử bài làm nào</td></tr>`;
        return;
    }

    const isWeekly = sheetName === 'LichSuTienTrinhTuan';
    const skillKeys = ['C1', 'C2', 'C3', 'C4', 'C5', 'C6'];

    const getScoreVal = (r, num, colName) => {
        const val = r[`diemC${num}`] ?? r[colName] ?? r[`diem_c${num}`] ?? r[`C${num}`];
        if (val === undefined || val === null || val === '' || val === '--') return null;
        const n = Number(val);
        return Number.isFinite(n) ? n : null;
    };

    const totalRows = rows.length;
    let sumTongDiem = 0;
    rows.forEach(r => { sumTongDiem += Number(r.tongDiem || r.score || 0); });
    const avgTong = (sumTongDiem / totalRows).toFixed(1);

    let summaryCells = '';
    let bodyRows = '';

    if (isWeekly) {
        // Tổng hợp: % = tổng câu đúng / tổng câu đã làm THẬT của đúng nhóm kỹ năng đó
        const agg = {};
        skillKeys.forEach(k => { agg[k] = { correct: 0, total: 0 }; });
        rows.forEach(r => {
            skillKeys.forEach(k => {
                const cell = getSkillCell(r, k);
                if (!cell) return;
                agg[k].correct += cell.correct;
                agg[k].total += cell.total;
            });
        });
        skillKeys.forEach(k => {
            const a = agg[k];
            summaryCells += `<td class="py-2 px-1">${a.total > 0 ? Math.round((a.correct / a.total) * 100) + '%' : '--'}</td>`;
        });

        rows.forEach((r, idx) => {
            const itemDiem = r.tongDiem || r.score || '--';
            const dateStr = formatDateOnly(r.Timestamp || r.ngayLam);
            const durationStr = r.thoiGianLamBai || '--';

            let skillCells = '';
            skillKeys.forEach(k => {
                const cell = getSkillCell(r, k);
                if (!cell) { skillCells += `<td class="py-2 px-1 text-gray-300">--</td>`; return; }
                const pct = cell.total > 0 ? Math.round((cell.correct / cell.total) * 100) : 0;
                skillCells += `<td class="py-2 px-1">${cell.correct}/${cell.total} <span class="text-gray-400">(${pct}%)</span></td>`;
            });

            bodyRows += `
                <tr class="hover:bg-pink-50/30 transition-colors">
                    <td class="py-2.5 px-2">${idx + 1}</td>
                    <td class="py-2.5 px-2 font-black">Tuần ${r.tuan || (idx + 1)}</td>
                    <td class="py-2.5 px-2 font-black text-rose-600">${itemDiem}</td>
                    ${skillCells}
                    <td class="py-2.5 px-2 text-gray-500">${dateStr}</td>
                    <td class="py-2.5 px-2 text-gray-500">${durationStr}</td>
                </tr>
            `;
        });
    } else {
        skillKeys.forEach((k, i) => {
            const vals = rows.map(r => getScoreVal(r, i + 1, SKILL_TAXONOMY[k].sheetCol)).filter(v => v !== null);
            const avg = vals.length ? (vals.reduce((a,b) => a+b, 0) / vals.length).toFixed(1) : '--';
            summaryCells += `<td class="py-2 px-1">${avg}</td>`;
        });

        rows.forEach((r, idx) => {
            const itemDiem = r.tongDiem || r.score || '--';
            const dateStr = formatDateOnly(r.Timestamp || r.ngayLam);
            const durationStr = r.thoiGianLamBai || '--';

            bodyRows += `
                <tr class="hover:bg-pink-50/30 transition-colors">
                    <td class="py-2.5 px-2">${idx + 1}</td>
                    <td class="py-2.5 px-2 font-black">${r.deSo ? `Đề ${r.deSo}` : `Tuần ${r.tuan || (idx + 1)}`}</td>
                    <td class="py-2.5 px-2 font-black text-rose-600">${itemDiem}</td>
                    <td class="py-2 px-1">${getScoreVal(r, 1, 'C1_NguAm') ?? '--'}</td>
                    <td class="py-2 px-1">${getScoreVal(r, 2, 'C2_ChinhTa') ?? '--'}</td>
                    <td class="py-2 px-1">${getScoreVal(r, 3, 'C3_VonTu') ?? '--'}</td>
                    <td class="py-2 px-1">${getScoreVal(r, 4, 'C4_CuPhap') ?? '--'}</td>
                    <td class="py-2 px-1">${getScoreVal(r, 5, 'C5_DocHieu') ?? '--'}</td>
                    <td class="py-2 px-1">${getScoreVal(r, 6, 'C6_TuDuyIQ') ?? '--'}</td>
                    <td class="py-2.5 px-2 text-gray-500">${dateStr}</td>
                    <td class="py-2.5 px-2 text-gray-500">${durationStr}</td>
                </tr>
            `;
        });
    }

    const html = `
        <tr class="bg-amber-100/90 text-amber-950 font-black border-b-2 border-amber-200">
            <td class="py-2.5 px-2" colspan="2">Điểm trung bình</td>
            <td class="py-2.5 px-2 text-rose-600">${avgTong}</td>
            ${summaryCells}
            <td class="py-2.5 px-2" colspan="2">--</td>
        </tr>
        ${bodyRows}
    `;
    tbody.innerHTML = html;
}

function exportReportToPDF() {
    const area = document.getElementById('printable-report-area');
    if (!area) return;
    showLoadingOverlay('Đang khởi tạo file PDF chuẩn in ấn...');
    
    const opt = {
        margin: [5, 5, 5, 5],
        filename: `Bao_Cao_Tien_Trinh_${currentUser?.maHS || 'HocSinh'}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' },
        pagebreak: { mode: ['css', 'legacy'] }
    };

    html2pdf().set(opt).from(area).save().then(() => {
        hideLoadingOverlay();
    }).catch(err => {
        hideLoadingOverlay();
        window.print();
    });
}

// ==========================================
// ĐỘNG CƠ ÂM THANH: GOOGLE TTS CHỊ BAN MAI
// ==========================================
let speechStopEpoch_ = 0;
let speechChunkTimer_ = null;

function stopSpeaking() {
    // Mỗi lần rời view/tab hoặc chủ động dừng đọc, tăng epoch để vô hiệu hóa
    // toàn bộ chuỗi TTS đang chạy/chờ (đặc biệt truyện dài nhiều đoạn).
    speechStopEpoch_++;
    if (speechChunkTimer_) {
        clearTimeout(speechChunkTimer_);
        speechChunkTimer_ = null;
    }
    try {
        if (banMaiAudio) {
            banMaiAudio.pause();
            banMaiAudio.currentTime = 0;
            banMaiAudio.onended = null;
            banMaiAudio.onerror = null;
        }
    } catch (e) {}
}

function splitVietnameseTtsChunks_(text, maxLen = 120) {
    const src = String(text || '').replace(/\s+/g, ' ').trim();
    if (!src) return [];

    // Tách ưu tiên theo câu. Sau đó nếu một câu vẫn dài thì tách tiếp theo dấu phẩy,
    // chấm phẩy, hai chấm và cuối cùng mới cắt theo khoảng trắng.
    const sentences = src.match(/[^.!?…]+[.!?…]*/g) || [src];
    const out = [];

    const pushPiece = (piece) => {
        let rest = String(piece || '').trim();
        if (!rest) return;
        while (rest.length > maxLen) {
            let cut = -1;
            const window = rest.slice(0, maxLen + 1);
            for (const mark of [',', ';', ':', '–', '—']) {
                const pos = window.lastIndexOf(mark);
                if (pos >= Math.floor(maxLen * 0.55)) cut = Math.max(cut, pos + 1);
            }
            if (cut < Math.floor(maxLen * 0.55)) {
                const pos = window.lastIndexOf(' ');
                cut = pos >= Math.floor(maxLen * 0.55) ? pos : maxLen;
            }
            out.push(rest.slice(0, cut).trim());
            rest = rest.slice(cut).trim();
        }
        if (rest) out.push(rest);
    };

    sentences.forEach(pushPiece);
    return out.filter(Boolean);
}

function speakVietnamese(text, rate = 0.96) {
    if (!text) return;

    stopSpeaking();
    const myEpoch = speechStopEpoch_;

    let cleanText = String(text)
        .replace(/<[^>]*>/g, '')
        .replace(/b-a/g, 'bờ a ba')
        .replace(/c\/k/g, 'cờ hoặc ca')
        .replace(/g\/gh/g, 'gờ đơn hoặc gờ kép')
        .replace(/ng\/ngh/g, 'ngờ đơn hoặc ngờ kép')
        .replace(/\s+/g, ' ')
        .trim();

    if (!cleanText) return;

    // Google Translate TTS không ổn định với câu dài. Luôn chia thành đoạn ngắn,
    // kể cả khi nội dung chỉ có ít dấu câu (truyện cổ tích thường có đoạn rất dài).
    const chunks = splitVietnameseTtsChunks_(cleanText, 120);
    if (!chunks.length) return;

    let index = 0;
    let retry = 0;

    const playNext = () => {
        if (myEpoch !== speechStopEpoch_) return;
        if (index >= chunks.length) {
            banMaiAudio.onended = null;
            banMaiAudio.onerror = null;
            return;
        }

        const chunk = chunks[index];
        const encoded = encodeURIComponent(chunk);
        const src = `https://translate.google.com/translate_tts?ie=UTF-8&tl=vi&client=tw-ob&q=${encoded}`;

        // Watchdog: nếu trình duyệt/network treo một đoạn mà không phát onended/onerror,
        // thử chuyển tiếp để chuỗi truyện không bị đứng vĩnh viễn.
        if (speechChunkTimer_) clearTimeout(speechChunkTimer_);
        speechChunkTimer_ = setTimeout(() => {
            if (myEpoch !== speechStopEpoch_) return;
            try { banMaiAudio.pause(); } catch (e) {}
            index++;
            retry = 0;
            playNext();
        }, 30000);

        banMaiAudio.onended = () => {
            if (speechChunkTimer_) { clearTimeout(speechChunkTimer_); speechChunkTimer_ = null; }
            if (myEpoch !== speechStopEpoch_) return;
            index++;
            retry = 0;
            playNext();
        };

        banMaiAudio.onerror = () => {
            if (speechChunkTimer_) { clearTimeout(speechChunkTimer_); speechChunkTimer_ = null; }
            if (myEpoch !== speechStopEpoch_) return;
            // Retry đúng 1 lần cho mỗi đoạn vì Google TTS đôi lúc lỗi tải tạm thời.
            if (retry < 1) {
                retry++;
                speechChunkTimer_ = setTimeout(playNext, 180);
            } else {
                index++;
                retry = 0;
                speechChunkTimer_ = setTimeout(playNext, 80);
            }
        };

        try {
            banMaiAudio.pause();
            banMaiAudio.src = src;
            banMaiAudio.currentTime = 0;
            banMaiAudio.playbackRate = rate;
            banMaiAudio.load();
            const playPromise = banMaiAudio.play();
            if (playPromise && typeof playPromise.catch === 'function') {
                playPromise.catch(() => {
                    // Một số trình duyệt không phát event error khi play() reject.
                    if (myEpoch !== speechStopEpoch_) return;
                    if (speechChunkTimer_) { clearTimeout(speechChunkTimer_); speechChunkTimer_ = null; }
                    if (retry < 1) {
                        retry++;
                        speechChunkTimer_ = setTimeout(playNext, 180);
                    } else {
                        index++;
                        retry = 0;
                        speechChunkTimer_ = setTimeout(playNext, 80);
                    }
                });
            }
        } catch (e) {
            if (speechChunkTimer_) { clearTimeout(speechChunkTimer_); speechChunkTimer_ = null; }
            index++;
            retry = 0;
            speechChunkTimer_ = setTimeout(playNext, 80);
        }
    };

    playNext();
}

function speakPedagogicalEvaluation() {
    const box = document.getElementById('pedagogical-evaluation-box');
    if (!box) return;
    const textToRead = box.innerText || box.textContent || '';
    speakVietnamese(textToRead, 0.96);
}

// Muc 11: doc rieng bai tho ben trai bang luong Google TTS hien co.
function speakTopic11Poem_() {
    if (activeExamContext || activeRoadmapContext || Number(activeTopicId) !== 11) return;
    const q = activeQuestionsList[currentQIndex];
    if (!q?.reading_passage) return;
    speakVietnamese(q.reading_passage, 0.96);
}

function speakCurrentQuestion() {
    const q = activeQuestionsList[currentQIndex];
    if (!q) return;
    const isTopic1Practice = !activeExamContext && !activeRoadmapContext && Number(activeTopicId) === 1 && q.render_style !== 'letter_listen';
    const textToRead = q.audio_text || q.reading_passage || (isTopic1Practice ? getTopic1QuestionView_(q).spokenText : q.question_text);
    speakVietnamese(textToRead, 0.96);
}

function playAudio(type) {
    try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!audioCtx && AudioContext) audioCtx = new AudioContext();
        if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume();
        if (!audioCtx) return;

        const now = audioCtx.currentTime;

        if (type === 'correct') {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(523.25, now);
            osc.frequency.exponentialRampToValueAtTime(783.99, now + 0.12);
            osc.frequency.exponentialRampToValueAtTime(1046.50, now + 0.25);
            gain.gain.setValueAtTime(0.3, now);
            gain.gain.linearRampToValueAtTime(0.01, now + 0.35);
            osc.start(now);
            osc.stop(now + 0.35);
        } else if (type === 'wrong') {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.type = 'square';
            osc.frequency.setValueAtTime(300, now);
            gain.gain.setValueAtTime(0.001, now);
            gain.gain.linearRampToValueAtTime(0.22, now + 0.01);
            gain.gain.setValueAtTime(0.22, now + 0.09);
            gain.gain.linearRampToValueAtTime(0.001, now + 0.1);
            gain.gain.setValueAtTime(0.001, now + 0.14);
            gain.gain.linearRampToValueAtTime(0.22, now + 0.15);
            gain.gain.setValueAtTime(0.22, now + 0.23);
            gain.gain.linearRampToValueAtTime(0.001, now + 0.24);
            osc.start(now);
            osc.stop(now + 0.25);
        } else if (type === 'win') {
            [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
                setTimeout(() => {
                    const o = audioCtx.createOscillator(), g = audioCtx.createGain();
                    o.connect(g); g.connect(audioCtx.destination);
                    o.frequency.value = freq; g.gain.setValueAtTime(0.2, audioCtx.currentTime);
                    g.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
                    o.start(); o.stop(audioCtx.currentTime + 0.3);
                }, i * 150);
            });
        }
    } catch (e) {}
}

function initQuizPallet() {
    updateQuizPalletUI();
}

function updateQuizPalletUI() {
    const container = document.getElementById('quiz-pallet-container');
    if (!container) return;
    if (!activeQuestionsList || !activeQuestionsList.length) { container.innerHTML = ''; return; }

    const isRoadmap = !!activeRoadmapContext;
    const isExam = !!activeExamContext;
    const total = activeQuestionsList.length;

    if (isExam) {
        container.className = `grid gap-1 max-w-xl mx-2`;
        container.style.gridTemplateColumns = `repeat(${total}, minmax(0, 1fr))`;
    } else {
        container.className = 'grid grid-cols-10 gap-1.5 max-w-xl mx-2';
        container.style.gridTemplateColumns = '';
    }

    const btnSize = isExam ? 'w-6 h-6 md:w-7 md:h-7 text-[10px] md:text-xs' : 'w-8 h-8 text-xs';

    let html = '';
    activeQuestionsList.forEach((q, idx) => {
        const answer = userAnswers[idx];
        const isAnswered = answer !== undefined;
        const isCurrent = idx === currentQIndex;
        let cls = 'bg-white text-pink-400 border-pink-200 hover:bg-pink-50';

        if (isAnswered) {
            if (isRoadmap) {
                const isCorrect = answer === q.answer;
                cls = isCorrect
                    ? 'bg-emerald-400 text-white border-emerald-500 hover:bg-emerald-500'
                    : 'bg-red-200 text-red-800 border-red-400 hover:bg-red-300';
            } else {
                cls = 'bg-pink-400 text-white border-pink-500 hover:bg-pink-500';
            }
        }
        if (isCurrent) cls = 'bg-gradient-to-br from-pink-500 to-purple-500 text-white border-pink-500 shadow-md';
        html += `<button onclick="jumpToQuestion(${idx})" class="${btnSize} shrink-0 rounded-xl border-2 font-black flex items-center justify-center transition-colors duration-150 ${cls}">${idx + 1}</button>`;
    });
    container.innerHTML = html;
}

function jumpToQuestion(idx) {
    stopSpeaking();
    if (idx < 0 || idx >= activeQuestionsList.length) return;
    currentQIndex = idx;
    loadQuestion();
}

function formatDuration(ms) {
    const s = Math.round(ms / 1000);
    return `${Math.floor(s / 60)} phút ${s % 60} giây`;
}

function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

function showLoadingOverlay(msg) {
    let el = document.getElementById('loading-overlay');
    if (!el) {
        el = document.createElement('div');
        el.id = 'loading-overlay';
        el.className = 'fixed inset-0 bg-black/30 flex items-center justify-center z-50';
        el.innerHTML = `<div class="bg-white px-6 py-4 rounded-2xl shadow-xl font-extrabold text-pink-600 flex items-center space-x-3"><i class="fa-solid fa-spinner fa-spin"></i><span id="loading-overlay-text"></span></div>`;
        document.body.appendChild(el);
    }
    document.getElementById('loading-overlay-text').textContent = msg;
    el.classList.remove('hidden');
}
function hideLoadingOverlay() { document.getElementById('loading-overlay')?.classList.add('hidden'); }

function toggleAutoSpeech() {
    autoSpeechEnabled = !autoSpeechEnabled;
    localStorage.setItem('class2_tv2_autoSpeechEnabled', autoSpeechEnabled ? 'true' : 'false');
    if (!autoSpeechEnabled) stopSpeaking();
    updateAutoSpeechButtonUI();
}

function updateAutoSpeechButtonUI() {
    const btn = document.getElementById('btn-toggle-autospeech');
    if (!btn) return;
    const icon = btn.querySelector('i');
    if (autoSpeechEnabled) {
        icon.className = 'fa-solid fa-volume-high';
        btn.title = 'Đang BẬT tự động đọc câu hỏi — bấm để tắt';
        btn.classList.remove('bg-gray-100', 'text-gray-400', 'border-gray-200');
        btn.classList.add('bg-pink-50', 'text-pink-600', 'border-pink-200');
    } else {
        icon.className = 'fa-solid fa-volume-xmark';
        btn.title = 'Đang TẮT tự động đọc câu hỏi — bấm để bật';
        btn.classList.remove('bg-pink-50', 'text-pink-600', 'border-pink-200');
        btn.classList.add('bg-gray-100', 'text-gray-400', 'border-gray-200');
    }
}


// ==========================================
// MINI GAME HUB - TIẾNG VIỆT 1
// 12 game; game 1 hoạt động, 11 game ở trạng thái sắp ra mắt.
// ==========================================
const MINIGAME_TOPIC_PALETTES = SUBTOPIC_PALETTES;

function miniGameHash(text) {
    let h = 2166136261 >>> 0;
    for (let i = 0; i < String(text).length; i++) {
        h ^= String(text).charCodeAt(i);
        h = Math.imul(h, 16777619) >>> 0;
    }
    return h >>> 0;
}

function getMiniGamePaletteOrder(seed = 'tv2-minigame') {
    const order = MINIGAME_TOPIC_PALETTES.map((_, i) => i);
    let state = miniGameHash(seed) || 1;
    for (let i = order.length - 1; i > 0; i--) {
        state = (state * 1664525 + 1013904223) >>> 0;
        const j = state % (i + 1);
        [order[i], order[j]] = [order[j], order[i]];
    }
    return order.map(i => MINIGAME_TOPIC_PALETTES[i]);
}

function ensureMiniGameThemeStyles() {
    if (document.getElementById('tv2-minigame-theme-v1')) return;
    const style = document.createElement('style');
    style.id = 'tv2-minigame-theme-v1';
    style.textContent = `
        #view-game-play > div { max-width: 56rem !important; }
        #game-play-title { font-size: 1.2rem !important; }
        #game-play-container { font-size: 16px; }
        @media (max-width: 640px) {
            #view-game-play > div { max-width: 100% !important; }
            #game-play-title { font-size: 1.05rem !important; }
        }
    `;
    document.head.appendChild(style);
}

const MINIGAME_LIST = [
    { id: 'family-activity', title: '1. Hoạt động gia đình', desc: 'Quan sát tranh - đọc hiểu - suy luận tình huống gia đình', icon: '🏡', ready: true },
    { id: 'why-family', title: '2. Vì sao thế nhỉ?', desc: 'Suy luận nguyên nhân - kết quả - nếu thì - xử lí logic', icon: '🤔', ready: true },
    { id: 'use-it-right', title: '3. Dùng sao cho đúng?', desc: 'Công năng - chất liệu - cách dùng - an toàn với đồ vật quanh nhà', icon: '🧰', ready: true },
    { id: 'say-it-nicely', title: '4. Nói sao cho hay?', desc: 'Chào hỏi - cảm ơn - xin lỗi - nhờ giúp - đáp lời thật phù hợp', icon: '🗣️', ready: true },
    { id: 'traffic-safe', title: '5. Đi sao cho đúng?', desc: 'Chọn hành động đúng luật và an toàn trong từng tình huống giao thông', icon: '🚦', ready: true },
    { id: 'traffic-why', title: '6. Vì sao phải thế?', desc: 'Tìm nguyên nhân - hậu quả phía sau các quy tắc an toàn giao thông', icon: '🧠', ready: true },
    { id: 'traffic-vehicle', title: '7. Chọn phương tiện nào?', desc: 'Cân nhắc quãng đường - số người - mục đích để chọn cách di chuyển phù hợp', icon: '🚌', ready: true },
    { id: 'traffic-handle', title: '8. Xử lý thế nào?', desc: 'Phản xạ với tình huống bất ngờ: nếu - thì - việc nào nên làm trước', icon: '⚡', ready: true },
    { id: 'mall-where', title: '9. Đi đâu – mua gì?', desc: 'Nhận nhiệm vụ - đọc không gian - tìm đúng khu vực trong trung tâm thương mại', icon: '🗺️', ready: true },
    { id: 'mall-choice', title: '10. Chọn sao cho hợp lý?', desc: 'Cân nhắc nhu cầu - công dụng - an toàn - tránh lãng phí khi mua sắm', icon: '🛒', ready: true },
    { id: 'mall-talk', title: '11. Nói sao ở nơi công cộng?', desc: 'Hỏi đường - nhờ giúp - xếp hàng - giao tiếp lịch sự với nhân viên và mọi người', icon: '💬', ready: true },
    { id: 'mall-handle', title: '12. Bé xử lý thế nào?', desc: 'Phản xạ với tình huống bị lạc - sàn ướt - thang cuốn - lối thoát hiểm và an toàn nơi công cộng', icon: '🚨', ready: true }
];

function openMiniGameHub() {
    setAppShellRootMode_(true);
    setMainTabActive_('games');
    inBaiHocFlow = false;
    stopSpeaking();
    inMiniGameFlow = true;
    activeExamContext = null;
    activeRoadmapContext = null;
    activeTopicId = null;
    pendingTopicQuiz = null;
    updateNavTabs('Mini Game', '🎮', null);
    ensureMiniGameThemeStyles();

    const grid = document.getElementById('minigame-grid');
    if (!grid) return;
    const palettes = getMiniGamePaletteOrder('tv2-hub');
    grid.innerHTML = MINIGAME_LIST.map((g, idx) => {
        const style = palettes[idx % palettes.length];
        return `
        <div onclick="openGamePlay('${g.id}')" class="p-3.5 md:p-4 flex flex-col items-center text-center cursor-pointer transition-all group ${style.card} border-2 rounded-[26px] min-h-[132px] justify-between relative shadow-sm pastel-btn">
            <div class="text-4xl group-hover:scale-110 transition-transform mt-1">${g.icon}</div>
            <div class="w-full">
                <h3 class="font-extrabold ${style.num} text-base leading-tight">${g.title}</h3>
                <p class="text-sm text-gray-700 font-bold mt-1 w-full leading-snug">${g.desc}</p>
            </div>
        </div>`;
    }).join('');
    switchAppView('view-minigame-hub');
}

const GAME_SCRIPT_MAP = {
    'family-activity': 'assets/js/vietnamese/games/hoat-dong-gia-dinh.js?v=tv2mg1',
    'why-family': 'assets/js/vietnamese/games/vi-sao-the-nhi.js?v=tv2mg2',
    'use-it-right': 'assets/js/vietnamese/games/dung-sao-cho-dung.js?v=tv2mg3',
    'say-it-nicely': 'assets/js/vietnamese/games/noi-sao-cho-hay.js?v=tv2mg4',
    'traffic-safe': 'assets/js/vietnamese/games/di-sao-cho-dung.js?v=tv2mg5',
    'traffic-why': 'assets/js/vietnamese/games/vi-sao-phai-the.js?v=tv2mg6',
    'traffic-vehicle': 'assets/js/vietnamese/games/chon-phuong-tien-nao.js?v=tv2mg7',
    'traffic-handle': 'assets/js/vietnamese/games/xu-ly-the-nao.js?v=tv2mg8',
    'mall-where': 'assets/js/vietnamese/games/di-dau-mua-gi.js?v=tv2mg9',
    'mall-choice': 'assets/js/vietnamese/games/chon-sao-cho-hop-ly.js?v=tv2mg10',
    'mall-talk': 'assets/js/vietnamese/games/noi-sao-noi-cong-cong.js?v=tv2mg11',
    'mall-handle': 'assets/js/vietnamese/games/be-xu-ly-the-nao.js?v=tv2mg12'
};
const GAME_START_FN_MAP = Object.freeze({
    'family-activity':'startFamilyActivityGame','why-family':'startWhyFamilyGame','use-it-right':'startUseItRightGame','say-it-nicely':'startSayItNicelyGame',
    'traffic-safe':'startTrafficSafeGame','traffic-why':'startTrafficWhyGame','traffic-vehicle':'startTrafficVehicleGame','traffic-handle':'startTrafficHandleGame',
    'mall-where':'startMallWhereGame','mall-choice':'startMallChoiceGame','mall-talk':'startMallTalkGame','mall-handle':'startMallHandleGame'
});
let activeMiniGameIdTV2_ = null;
let miniGameReplayTextTV2_ = '';
let miniGameReplayRateTV2_ = 0.94;
function isMiniGameActive(gameId){
    const el=document.getElementById('view-game-play');
    return !!gameId && activeMiniGameIdTV2_===gameId && inMiniGameFlow && !!el && !el.classList.contains('hidden');
}
function speakMiniGameTextSafe(text,rate=0.94,gameId=''){
    if(!isMiniGameActive(gameId)) return;
    speakVietnamese(text,rate);
}
function setMiniGameQuestionAudio(text,rate=0.94){
    miniGameReplayTextTV2_=String(text||'').replace(/\s+/g,' ').trim();
    miniGameReplayRateTV2_=Number.isFinite(Number(rate))?Number(rate):0.94;
}
function detectMiniGameQuestionTextTV2_(){
    const box=document.getElementById('game-play-container'); if(!box) return '';
    const direct=box.querySelector('[data-minigame-question],#game-question,#game-current-question,#sk-question,#fa-question,.game-question,.mg-question,.question-text');
    const directText=String(direct?.innerText||direct?.textContent||'').replace(/\s+/g,' ').trim();
    return directText||miniGameReplayTextTV2_;
}
function speakMiniGameQuestion(){
    const text=detectMiniGameQuestionTextTV2_(); if(!text) return;
    speakVietnamese(text,miniGameReplayRateTV2_);
}
function ensureMiniGameReplayButtonTV2_(){
    const title=document.getElementById('game-play-title'); const header=title?.parentElement;
    if(!header||document.getElementById('btn-minigame-replay')) return;
    const backBtn=header.querySelector('button'); const btn=document.createElement('button');
    btn.id='btn-minigame-replay'; btn.type='button'; btn.title='Nghe lại câu hỏi'; btn.setAttribute('aria-label','Nghe lại câu hỏi');
    btn.onclick=speakMiniGameQuestion; btn.className='w-9 h-9 md:w-10 md:h-10 rounded-full bg-sky-50 hover:bg-sky-100 text-sky-600 border-2 border-sky-200 shadow-sm pastel-btn shrink-0 flex items-center justify-center';
    btn.innerHTML='<i class="fa-solid fa-volume-high text-sm md:text-base"></i>';
    if(backBtn) header.insertBefore(btn,backBtn); else header.appendChild(btn);
}
function stopActiveMiniGameTV2_(){ activeMiniGameIdTV2_=null; miniGameReplayTextTV2_=''; try{stopSpeaking();}catch(_){} }

const loadedGameScripts = {};

function loadGameScript(src) {
    if (loadedGameScripts[src]) return Promise.resolve();
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => { loadedGameScripts[src] = true; resolve(); };
        script.onerror = () => reject(new Error(`Không tải được file game: ${src}`));
        document.body.appendChild(script);
    });
}

async function openGamePlay(gameId) {
    setAppShellRootMode_(false); stopSpeaking();
    if (!requirePremiumAccess('Mini Game')) return;
    ensureMiniGameThemeStyles(); inMiniGameFlow=true;
    const game=MINIGAME_LIST.find(g=>g.id===gameId); if(!game) return;
    stopActiveMiniGameTV2_();
    const title=document.getElementById('game-play-title'); if(title) title.innerHTML=`<span>${game.icon}</span><span>${game.title}</span>`;
    updateNavTabs('Mini Game','🎮',game.title); switchAppView('view-game-play'); ensureMiniGameReplayButtonTV2_();
    const box=document.getElementById('game-play-container'); if(box) box.innerHTML='<p class="text-center text-gray-400 font-bold py-8"><i class="fa-solid fa-spinner fa-spin mr-1"></i> Đang tải game...</p>';
    try { await loadGameScript(GAME_SCRIPT_MAP[gameId]); }
    catch(e){ if(box) box.innerHTML='<p class="text-center text-rose-500 font-bold py-8">Không tải được game. Bé thử lại nhé!</p>'; return; }
    const fn=window[GAME_START_FN_MAP[gameId]];
    if(typeof fn==='function'){ activeMiniGameIdTV2_=gameId; fn(); }
    else if(box) box.innerHTML='<p class="text-center text-amber-600 font-bold py-8">Game đã tải nhưng chưa tìm thấy hàm khởi động.</p>';
}



// ============================================================
// TV2 APP SHELL 2026: banner chinh o root tab, banner phu + breadcrumb khi vao noi dung.
// Chi dieu khien presentation, khong thay doi nghiep vu/du lieu.
// ============================================================
let appShellRootMode_ = true;
function setAppShellRootMode_(isRoot) {
    appShellRootMode_ = !!isRoot;
    const mainBanner = document.getElementById('app-main-banner');
    const contextBanner = document.getElementById('app-context-banner');
    if (mainBanner) mainBanner.classList.toggle('hidden', !appShellRootMode_);
    if (contextBanner) contextBanner.classList.toggle('hidden', appShellRootMode_);
}

// ============================================================
// TV2 UI V11 - 6 TAB CHINH CO DINH
// Kham pha la Home logic; cac module hien truc tiep ben duoi tab.
// ============================================================
var currentMainTab = 'discover';
function setMainTabActive_(tabName) {
    currentMainTab = tabName || 'discover';
    document.querySelectorAll('.main-module-tab').forEach(btn => {
        const active = btn.dataset.tab === currentMainTab;
        btn.classList.toggle('is-active', active);
        btn.setAttribute('aria-selected', active ? 'true' : 'false');
    });
}
function refreshMainTabLocks_() { updatePremiumUI(); }
function openReviewTab() {
    stopSpeaking();
    clearInterval(quizTimerInterval);
    setMainTabActive_('review');
    inBaiHocFlow = false;
    inMiniGameFlow = false;
    activeExamContext = null;
    activeRoadmapContext = null;
    activeTopicId = 13;
    pendingTopicQuiz = null;
    setAppShellRootMode_(true);
    return openSemesterReviewMenu(true);
}
function openMainTab(tabName) {
    stopSpeaking();
    clearInterval(quizTimerInterval);
    switch (tabName) {
        case 'discover': goHome(); break;
        case 'lessons': openBaiHocHub(1); break;
        case 'exercises': openRoadmap(1); break;
        case 'review': openReviewTab(); break;
        case 'exams': openExamHub(); break;
        case 'games': openMiniGameHub(); break;
        default: goHome();
    }
}
function goHome() {
    tv2Alphabet11Pending_ = null;
    stopActiveMiniGameTV2_();
    setAppShellRootMode_(true);
    inMiniGameFlow = false;
    inBaiHocFlow = false;
    stopSpeaking();
    clearInterval(quizTimerInterval);
    activeExamContext = null;
    activeRoadmapContext = null;
    activeTopicId = null;
    pendingTopicQuiz = null;
    updateNavTabs('Khám phá', '🧭', null);
    setMainTabActive_('discover');
    switchAppView('view-dashboard-grid');
}

// initializeApp() của bản độc lập được thay bằng lifecycle module Lớp 2.

// ============================================================
// TV2 - BÀI HỌC <-> BÀI TẬP THEO ĐÚNG TRỤC SGK
// Bài học: 62 bài, mỗi bài 3 trang. Bài tập: 1-1 theo bài học.
// Bài tập dùng lưới bài SGK; không còn roadmap 24 tuần trong runtime.
// ============================================================
const BAI_HOC_DATA_FILE_TV2 = `${CLASS2_TV_DATA_ROOT}bai_hoc_tieng_viet_2.json`;
const BAI_TAP_HK1_DATA_FILE_TV2 = `${CLASS2_TV_DATA_ROOT}bai_tap_tieng_viet_2_hk1.json`;
const BAI_TAP_HK2_DATA_FILE_TV2 = `${CLASS2_TV_DATA_ROOT}bai_tap_tieng_viet_2_hk2.json`;
let baiTapQuestionPoolBySemesterTV2_ = {1:[],2:[]};
let baiHocDataCacheTV2 = null;
let activeBaiHocContext = { semester: 1, bai: null, lessonId: null, pageNo: 1 };
const TOTAL_BAI_TAP_TV2 = 62;

function escapeJsStringTV2_(s) {
    return String(s ?? '').replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\r?\n/g, ' ');
}

async function loadBaiHocDataTV2_() {
    if (baiHocDataCacheTV2) return baiHocDataCacheTV2;
    await loadSharedImageCatalogTV2_();
    const [lessonRes,hk1Res,hk2Res]=await Promise.all([
        fetch(BAI_HOC_DATA_FILE_TV2,{cache:'no-store'}),fetch(BAI_TAP_HK1_DATA_FILE_TV2,{cache:'no-store'}),fetch(BAI_TAP_HK2_DATA_FILE_TV2,{cache:'no-store'})
    ]);
    if(!lessonRes.ok) throw new Error('Không thể tải dữ liệu Bài học Tiếng Việt 2');
    if(!hk1Res.ok||!hk2Res.ok) throw new Error('Không thể tải dữ liệu Bài tập Tiếng Việt 2');
    const [lessonData,hk1,hk2]=await Promise.all([lessonRes.json(),hk1Res.json(),hk2Res.json()]);
    const poolFor=(src)=>(src?.question_bank?.topics||[]).flatMap(t=>(t.qs||t.questions||[]).map(q=>({...normalizeQuestion(q),source_topic_id:Number(t.id??t.topic_id)}))).filter(Boolean);
    baiTapQuestionPoolBySemesterTV2_={1:poolFor(hk1),2:poolFor(hk2)};
    baiHocDataCacheTV2={...lessonData,bai_tap:[...(hk1.bai_tap||[]),...(hk2.bai_tap||[])],__exerciseSources:{1:hk1,2:hk2}};
    return baiHocDataCacheTV2;
}

function switchAppView(viewId) {
    stopSpeaking();
    if (viewId !== 'view-game-play') stopActiveMiniGameTV2_();
    [
        'view-dashboard-grid', 'view-bai-hoc-hub', 'view-bai-hoc-lesson',
        'view-lecture', 'view-quiz', 'view-roadmap', 'view-minigame-hub',
        'view-game-play', 'view-exam-hub', 'view-result'
    ].forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;
        if (id === viewId) {
            ensureNatureAmbientForView_(el, true);
            el.classList.remove('hidden');
        } else {
            el.classList.add('hidden');
        }
    });
}

function getBaiHocProgressKeyTV2_() {
    const id = currentUser?.maHS || 'KHACH';
    return `class2_tv2_bai_hoc_completed_v1_${String(id).toUpperCase()}`;
}
function getBaiHocCompletedSetTV2_() {
    try {
        const arr = JSON.parse(localStorage.getItem(getBaiHocProgressKeyTV2_()) || '[]');
        return new Set(Array.isArray(arr) ? arr : []);
    } catch (e) { return new Set(); }
}
function saveBaiHocCompletedSetTV2_(setObj) {
    try { localStorage.setItem(getBaiHocProgressKeyTV2_(), JSON.stringify([...setObj])); } catch (e) {}
}

async function openBaiHocHub(semesterNumber = 1) {
    setAppShellRootMode_(true);
    setMainTabActive_('lessons');
    stopSpeaking();
    clearInterval(quizTimerInterval);
    inBaiHocFlow = true;
    inMiniGameFlow = false;
    activeExamContext = null;
    activeRoadmapContext = null;
    activeTopicId = null;
    pendingTopicQuiz = null;
    activeBaiHocContext = { semester: Number(semesterNumber) || 1, bai: null, lessonId: null, pageNo: 1 };
    updateNavTabs('Bài học', '📖', null);
    switchAppView('view-bai-hoc-hub');

    // Không để hub trắng trong lúc chờ dữ liệu / khi có lỗi.
    const grid = document.getElementById('bai-hoc-grid');
    const tabs = document.getElementById('bai-hoc-semester-tabs');
    if (grid) grid.innerHTML = '<div class="col-span-full py-8 text-center font-black text-purple-500">⏳ Đang tải danh sách bài học...</div>';
    if (tabs) tabs.innerHTML = '';

    showLoadingOverlay('Đang mở Bài học Tiếng Việt 2...');
    try {
        const data = await loadBaiHocDataTV2_();
        renderBaiHocHubTV2_(data, activeBaiHocContext.semester);
    } catch (err) {
        console.error('[Bài học TV2] Lỗi mở hub:', err);
        if (grid) {
            grid.innerHTML = `<div class="col-span-full rounded-2xl border-2 border-rose-200 bg-rose-50 p-4 text-center">
                <div class="font-black text-rose-600">⚠️ Chưa tải được dữ liệu Bài học</div>
                <div class="mt-1 text-xs md:text-sm font-bold text-slate-600">${escapeHtml(err.message || String(err))}</div>
                <div class="mt-2 text-[11px] font-bold text-slate-400">Kiểm tra file <b>bai_hoc_tieng_viet_2.json</b> trong <b>assets/data/vietnamese/</b>.</div>
            </div>`;
        }
    } finally { hideLoadingOverlay(); }
}

function renderBaiHocHubTV2_(data, semesterNumber) {
    const tabs = document.getElementById('bai-hoc-semester-tabs');
    const grid = document.getElementById('bai-hoc-grid');
    const subtitle = document.getElementById('bai-hoc-hub-subtitle');
    if (!tabs || !grid) throw new Error('Index chưa có khung Bài học');
    const lessons = (data?.bai_hoc || []).filter(x => Number(x.semester) === Number(semesterNumber));
    tabs.innerHTML = [1,2].map(s => `<button onclick="openBaiHocHub(${s})" class="semester-switch-btn ${Number(s) === Number(semesterNumber) ? 'is-active' : 'is-inactive'}">Học kỳ ${s}</button>`).join('');
    if (subtitle) subtitle.textContent = `Học kỳ ${semesterNumber} · ${lessons.length} bài`;
    const done = getBaiHocCompletedSetTV2_();
    grid.className = 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2';
    grid.innerHTML = lessons.map((l, idx) => {
        const ok = done.has(`${l.lesson_id}_done`);
        const alt = idx % 2 === 0;
        return `<button onclick="openBaiHocByNumberTV2_(${l.bai},1)" class="text-left min-h-[82px] rounded-2xl border-2 ${ok ? 'border-emerald-300 bg-emerald-50/50' : (alt ? 'border-pink-200 bg-gradient-to-br from-white to-pink-50' : 'border-purple-200 bg-gradient-to-br from-white to-purple-50')} px-3 py-2.5 hover:border-fuchsia-400 hover:shadow-md transition-shadow">
            <div class="font-black text-purple-700 text-base">Bài ${l.bai}</div>
            <div class="mt-1 text-[12px] md:text-[13px] leading-5 font-bold text-slate-700 line-clamp-2">${escapeHtml(l.source_title || '')}</div>
        </button>`;
    }).join('');
}

async function openBaiHocByNumberTV2_(bai, pageNo = 1) {
    if (!requirePremiumAccess('Bài học')) return;
    setAppShellRootMode_(false);
    stopSpeaking();
    inBaiHocFlow = true;
    const data = await loadBaiHocDataTV2_();
    const lesson = (data?.bai_hoc || []).find(x => Number(x.bai) === Number(bai));
    if (!lesson) return showAppDialog('Không tìm thấy bài học', { type:'error' });
    const safePage = Math.max(1, Math.min(3, Number(pageNo) || 1));
    activeBaiHocContext = { semester: Number(lesson.semester), bai: Number(bai), lessonId: lesson.lesson_id, pageNo: safePage };
    updateNavTabs('Bài học', '📖', `Bài ${bai}`, lesson.source_title || '');
    switchAppView('view-bai-hoc-lesson');
    renderBaiHocLessonTV2_(lesson, safePage);
}

function renderBaiHocLessonTV2_(lesson, pageNo) {
    const meta = document.getElementById('bai-hoc-lesson-meta');
    const title = document.getElementById('bai-hoc-lesson-title');
    const sections = document.getElementById('bai-hoc-sections');
    const back = document.getElementById('btn-back-bai-hoc-list');
    if (!sections) return;
    if (meta) {
        meta.textContent = `Bài ${lesson.bai} · ${lesson.theme || ''}`;
        meta.className = 'text-base md:text-lg font-extrabold text-purple-600';
    }
    if (title) { title.textContent = ''; title.className = 'hidden'; }
    if (back) back.onclick = () => openBaiHocHub(lesson.semester);
    const page = (lesson.pages || []).find(p => Number(p.page_no) === Number(pageNo)) || lesson.pages?.[0];
    if (!page) return;
    const body = page.page_type === 'questions'
        ? renderBaiHocQuestionsPageTV2_(page)
        : page.page_type === 'summary'
            ? renderBaiHocSummaryPageTV2_(page, lesson)
            : renderBaiHocReadingPageTV2_(page, lesson);
    sections.innerHTML = `${renderBaiHocPageTabsTV2_(lesson, pageNo)}${body}${renderBaiHocBottomNavTV2_(lesson, pageNo)}`;
}

function renderBaiHocPageTabsTV2_(lesson, pageNo) {
    const labels = [['📖','Bài đọc'],['❓','Câu hỏi'],['🌟','Tổng kết']];
    return `<div class="grid grid-cols-3 gap-2 mb-3">${labels.map((x,i) => {
        const p = i + 1, active = Number(pageNo) === p;
        return `<button onclick="openBaiHocByNumberTV2_(${lesson.bai},${p})" class="py-2.5 rounded-xl border ${active ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white border-purple-400 shadow-md' : 'bg-pink-50/60 text-purple-700 border-pink-200 hover:bg-purple-50'} font-black text-sm md:text-base">${x[0]} ${x[1]}</button>`;
    }).join('')}</div>`;
}

function getLessonAudioTextTV2_(page, lesson) {
    const m = page?.material || {};
    if (m.type === 'phonics') return `${lesson.source_title}. ${m.text || ''}. Ví dụ: ${(m.examples || []).join(', ')}.`;
    if (Array.isArray(m.paragraphs)) return m.paragraphs.join(' ');
    if (Array.isArray(m.lines)) return m.lines.filter(Boolean).join(' ');
    return m.text || page?.intro || lesson.source_title || '';
}

function renderBaiHocReadingPageTV2_(p, lesson) {
    const m = p.material || {};
    const audioText = getLessonAudioTextTV2_(p, lesson);
    const imageMeta = catalogMetaByRefTV2_(p) || catalogMetaByRefTV2_(m);
    const imgSrc = String(imageMeta?.src || p.image || m.image || '').trim();
    const imgAlt = String(imageMeta?.alt_vi || imageMeta?.name_vi || 'Tranh minh họa').trim();

    let material = '';
    if (m.type === 'phonics') {
        const targets = (m.targets || []).map(t => `<span class="inline-flex min-w-[58px] justify-center px-3 py-2.5 rounded-2xl bg-gradient-to-br from-pink-100 to-purple-100 border-2 border-pink-200 text-2xl md:text-3xl font-black text-purple-800">${escapeHtml(t)}</span>`).join('');
        const ex = (m.examples || []).map(w => `<button onclick="speakVietnamese('${escapeJsStringTV2_(w)}',0.88)" class="px-3 py-2 rounded-xl bg-white border-2 border-emerald-200 text-emerald-700 font-black text-base shadow-sm hover:bg-emerald-50">🔊 ${escapeHtml(w)}</button>`).join('');
        material = `<div class="text-center"><h3 class="font-black text-[21px] md:text-[24px] text-slate-900 mb-3">${escapeHtml(lesson.source_title || '')}</h3><div class="flex flex-wrap justify-center gap-2.5 mb-3">${targets}</div><p class="text-[16px] md:text-[18px] leading-8 text-slate-700 font-bold">${escapeHtml(m.text || '')}</p><div class="mt-3 flex flex-wrap justify-center gap-2">${ex}</div>${m.note ? `<p class="mt-3 text-xs md:text-sm text-slate-500 font-semibold">${escapeHtml(m.note)}</p>` : ''}</div>`;
    } else if (m.type === 'poem') {
        material = `<div><h3 class="font-black text-[21px] md:text-[24px] text-slate-900 mb-3">${escapeHtml(lesson.source_title || '')}</h3><div class="space-y-1">${(m.lines || []).map(line => line ? `<p class="text-[17px] md:text-[19px] leading-8 text-slate-800 font-bold">${escapeHtml(line)}</p>` : '<div class="h-2"></div>').join('')}</div></div>`;
    } else {
        const paragraphs = m.paragraphs || [m.text || ''];
        material = `<div><h3 class="font-black text-[21px] md:text-[24px] text-slate-900 mb-3">${escapeHtml(lesson.source_title || '')}</h3><div class="space-y-3">${paragraphs.map(x => `<p class="text-[17px] md:text-[18px] leading-8 text-slate-800 font-semibold">${escapeHtml(x)}</p>`).join('')}</div></div>`;
    }

    const words = (p.words || []).map(x => `<button onclick="speakVietnamese('${escapeJsStringTV2_(x.word)}',0.88)" class="px-3 py-2 rounded-xl bg-purple-50 border border-purple-200 text-purple-700 font-black text-sm md:text-base">🔊 ${escapeHtml(x.word)}</button>`).join('');
    const intro = `<div class="flex items-center justify-between gap-3 rounded-2xl bg-gradient-to-r from-pink-50 to-purple-50 border border-pink-200 px-4 py-2.5"><p class="font-black text-slate-700 text-sm md:text-base leading-6">🐰 ${escapeHtml(p.intro || 'Cùng cô học bài nhé!')}</p><button onclick="speakVietnamese('${escapeJsStringTV2_(audioText)}',0.92)" class="px-4 py-2 rounded-xl bg-purple-100 border border-purple-200 text-purple-700 font-black text-sm md:text-base shrink-0">🔊 Cô đọc</button></div>`;
    const imagePanel = imgSrc ? `<div class="flex items-center justify-center"><div class="w-full overflow-hidden rounded-[22px] border-2 border-pink-100 bg-white shadow-sm"><img src="${escapeHtml(imgSrc)}" alt="${escapeHtml(imgAlt)}" class="block w-full h-auto max-h-[520px] object-contain bg-pink-50/20" onerror="this.parentElement.parentElement.style.display='none'"></div></div>` : '';
    const layoutClass = imgSrc ? 'grid grid-cols-1 md:grid-cols-[48%_52%] gap-3 md:gap-4 items-start' : 'grid grid-cols-1';
    return `<div class="space-y-3">${intro}<div class="${layoutClass}">${imagePanel}<section class="rounded-3xl bg-gradient-to-br from-white via-pink-50/35 to-purple-50/35 border-2 border-pink-100 p-4 md:p-5">${material}</section></div>${words ? `<div class="flex flex-wrap gap-2 justify-center">${words}</div>` : ''}</div>`;
}

function renderBaiHocQuestionsPageTV2_(p) {
    const items = (p.items || []).map((x, i) => {
        if (x.type === 'choice') {
            return `<div class="rounded-2xl bg-pink-50/70 border border-pink-100 p-3">
                <div class="tv2-lesson-question font-black text-[15px] md:text-base text-slate-700 mb-2 leading-7">${i+1}. ${escapeHtml(x.prompt)}</div>
                ${(x.options || []).map((op,j) => `<button onclick="this.parentElement.querySelectorAll('button').forEach(b=>b.classList.remove('bg-emerald-100','border-emerald-300','bg-rose-50','border-rose-200')); if(${j}===${Number(x.answer || 0)}){this.classList.add('bg-emerald-100','border-emerald-300')}else{this.classList.add('bg-rose-50','border-rose-200')}" class="tv2-lesson-answer w-full text-left px-3 py-2.5 my-1 rounded-xl bg-white border border-pink-100 font-bold text-[15px] md:text-base leading-7">${String.fromCharCode(65+j)}. ${escapeHtml(op)}</button>`).join('')}
            </div>`;
        }
        const tone = x.type === 'speak' ? 'bg-emerald-50 border-emerald-100' : 'bg-purple-50 border-purple-100';
        return `<div class="rounded-2xl ${tone} border p-3"><div class="tv2-lesson-question font-bold text-[15px] md:text-base text-slate-700 leading-7">${i+1}. ${x.type === 'speak' ? '🎙️' : '💭'} ${escapeHtml(x.prompt || '')}</div></div>`;
    }).join('');
    const ex = (p.extra_examples || []).map(x => `<div class="rounded-xl bg-white border border-purple-100 px-3 py-2 text-[15px] md:text-base font-semibold text-slate-700 leading-7">✨ ${escapeHtml(x)}</div>`).join('');
    return `<div class="space-y-3">
        <section class="rounded-2xl bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 p-3"><div class="font-black text-purple-700 mb-1">🐰 Nhớ lại bài trước nhé</div><p class="font-bold text-slate-700 text-[15px] md:text-base leading-7">${escapeHtml(p.recall || '')}</p></section>
        <section class="space-y-3">${items}</section>
        ${ex ? `<section class="grid gap-2"><div class="font-black text-purple-700 text-[15px] md:text-base">🌈 Gợi ý học</div>${ex}</section>` : ''}
    </div>`;
}

function renderBaiHocSummaryPageTV2_(p, lesson) {
    const pts = (p.key_points || []).map(x => `<li>${escapeHtml(x)}</li>`).join('');
    const words = (p.words || []).map(x => `<span class="inline-flex px-3 py-2 rounded-full bg-pink-50 border border-pink-100 text-pink-700 font-black text-sm md:text-base">${escapeHtml(x.word)}</span>`).join('');
    const conn = (p.connections || []).map(x => `<div class="rounded-xl bg-white border border-purple-100 px-3 py-2 text-[15px] md:text-base font-semibold text-slate-700 leading-7">🔗 ${escapeHtml(x)}</div>`).join('');
    return `<div class="space-y-3">
        <section class="rounded-3xl bg-gradient-to-br from-amber-50 via-pink-50 to-purple-50 border-2 border-amber-200 p-4 md:p-5"><div class="text-[11px] font-black text-amber-600">🌟 TRANG 3 · TỔNG KẾT</div><h3 class="font-black text-xl text-purple-800 mt-1">Con đã học được gì?</h3><ul class="list-disc pl-5 mt-3 space-y-2 text-[15px] md:text-base text-slate-700 font-semibold leading-7">${pts}</ul></section>
        ${words ? `<section class="rounded-2xl bg-white border border-pink-100 p-4"><div class="font-black text-pink-700 mb-2">💬 Từ/tiếng cần nhớ</div><div class="flex flex-wrap gap-2">${words}</div></section>` : ''}
        ${conn ? `<section class="rounded-2xl bg-purple-50/60 border border-purple-100 p-4"><div class="font-black text-purple-700 mb-2">🌈 Liên hệ thêm</div><div class="grid gap-2">${conn}</div></section>` : ''}
        <section class="rounded-2xl bg-emerald-50 border border-emerald-100 p-4"><div class="font-black text-emerald-700">🎙️ Trước khi xong bài</div><p class="text-[15px] md:text-base font-semibold text-slate-700 mt-1 leading-7">${escapeHtml(p.finish_prompt || '')}</p></section>
        <button onclick="markCurrentBaiHocCompleteTV2_(event)" class="w-full py-3 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-black shadow-md hover:brightness-105">✅ Hoàn thành Bài ${lesson.bai}</button>
    </div>`;
}

function renderBaiHocBottomNavTV2_(lesson, pageNo) {
    const prev = Number(pageNo) > 1 ? `<button onclick="openBaiHocByNumberTV2_(${lesson.bai},${Number(pageNo)-1})" class="px-4 py-2.5 rounded-xl bg-white border border-purple-200 text-purple-700 font-black text-sm">← Trang trước</button>` : '<span></span>';
    const next = Number(pageNo) < 3 ? `<button onclick="openBaiHocByNumberTV2_(${lesson.bai},${Number(pageNo)+1})" class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-black text-sm shadow-sm">Trang tiếp →</button>` : `<button onclick="openBaiHocByNumberTV2_(${lesson.bai},1)" class="px-4 py-2.5 rounded-xl bg-purple-50 border border-purple-200 text-purple-700 font-black text-sm">↺ Xem lại bài</button>`;
    return `<div class="flex items-center justify-between gap-3 pt-2">${prev}<div class="text-sm font-black text-slate-400">${pageNo}/3</div>${next}</div>`;
}

function markCurrentBaiHocCompleteTV2_(evt) {
    const id = activeBaiHocContext?.lessonId;
    if (!id) return;
    const setObj = getBaiHocCompletedSetTV2_();
    setObj.add(`${id}_done`);
    saveBaiHocCompletedSetTV2_(setObj);
    const btn = evt?.currentTarget;
    if (btn) {
        btn.textContent = '✅ Đã hoàn thành bài học';
        btn.className = 'w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-black shadow-md';
    }
}

let class2TvExerciseUnlockedIndex_ = 1;
let class2TvExerciseProgressLoaded_ = false;
function getBaiTapUnlockKeyTV2_() { return 'CLASS2_SERVER_PROGRESS_ONLY'; }
function getUnlockedBaiTapTV2_() { return Math.max(1, Number(class2TvExerciseUnlockedIndex_ || 1)); }
function saveUnlockedBaiTapTV2_() { /* Server-authoritative only. Intentionally no client unlock write. */ }
async function refreshClass2TvExerciseProgress_() {
    if (isAdminUser()) { class2TvExerciseUnlockedIndex_ = 999; class2TvExerciseProgressLoaded_ = true; return; }
    if (!tvModuleCtx_?.isAuthenticated) { class2TvExerciseUnlockedIndex_ = 1; class2TvExerciseProgressLoaded_ = true; return; }
    try {
        const result = await tvModuleCtx_.apiRequest('assessmentProgressGet', {subjectId:'tv', kind:'baitap'});
        const progress = result?.progress || result || {};
        class2TvExerciseUnlockedIndex_ = Math.max(1, Number(progress.unlockedIndex || progress.unlockedBai || 1));
    } catch (_) {
        // Backend Lớp 2 hiện chưa công bố verifier/progress chính thức cho TV2. Fail closed.
        class2TvExerciseUnlockedIndex_ = 1;
    }
    class2TvExerciseProgressLoaded_ = true;
}
function getBaiTapRecentKeyTV2_(bai) {
    const id = currentUser?.maHS || 'KHACH';
    return `class2_tv2_bt_recent_v1_${String(id).toUpperCase()}_${bai}`;
}
function getRecentBaiTapIdsTV2_(bai) {
    try {
        const arr = JSON.parse(localStorage.getItem(getBaiTapRecentKeyTV2_(bai)) || '[]');
        return Array.isArray(arr) ? arr.map(String) : [];
    } catch (e) { return []; }
}
function saveRecentBaiTapIdsTV2_(bai, ids) {
    try { localStorage.setItem(getBaiTapRecentKeyTV2_(bai), JSON.stringify((ids || []).slice(-40))); } catch (e) {}
}

async function openRoadmap(semesterNumber = 1) {
    setAppShellRootMode_(true);
    setMainTabActive_('exercises');
    inBaiHocFlow = false;
    inMiniGameFlow = false;
    stopSpeaking();
    updateNavTabs('Bài tập', '✏️', null);
    switchAppView('view-roadmap');
    showLoadingOverlay('Đang mở Bài tập...');
    try {
        await refreshClass2TvExerciseProgress_();
        const data = await loadBaiHocDataTV2_();
        renderBaiTapGridTV2_(data, semesterNumber);
    } catch (err) {
        await showAppDialog(`Không thể mở Bài tập: ${err.message}`, { type:'error' });
    } finally { hideLoadingOverlay(); }
}

function renderBaiTapGridTV2_(data, semesterNumber) {
    const view = document.getElementById('view-roadmap');
    const container = document.getElementById('roadmap-svg-container');
    if (!view || !container) return;
    const h2 = view.querySelector('h2');
    if (h2) h2.innerHTML = '<span>✏️</span><span>Bài tập</span>';
    const p = view.querySelector('h2 + p');
    if (p) p.textContent = '20 câu mỗi bài · đạt từ 80% để mở Bài tập tiếp theo.';
    const tabHost = document.getElementById('roadmap-semester-tabs');
    if (tabHost) tabHost.innerHTML = [1,2].map(s => `<button onclick="openRoadmap(${s})" class="semester-switch-btn ${Number(s)===Number(semesterNumber) ? 'is-active' : 'is-inactive'}">Học kỳ ${s}</button>`).join('');
    const arr = (data?.bai_tap || []).filter(x => Number(x.semester) === Number(semesterNumber));
    const unlocked = getUnlockedBaiTapTV2_();
    container.className = 'w-full bg-gradient-to-br from-pink-50/70 via-white to-purple-50/70 rounded-3xl border-2 border-pink-200 p-3 shadow-sm';
    container.innerHTML = `<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2">${arr.map((bt, idx) => {
        const open = Number(bt.bai) <= unlocked;
        return `<button onclick="${open ? `selectBaiTapTV2_(${bt.bai})` : `showLockedBaiTapTV2_(${bt.bai})`}" class="relative text-left min-h-[92px] rounded-2xl border-2 p-3 ${open ? (idx%2 ? 'bg-purple-50 border-purple-200 hover:border-purple-400' : 'bg-pink-50 border-pink-200 hover:border-pink-400') : 'bg-slate-50 border-slate-200 opacity-60'} hover:shadow-md transition-shadow">
            <div class="flex justify-between gap-2"><span class="font-black ${open ? 'text-purple-700' : 'text-slate-500'}">Bài ${bt.bai}</span><span>${open ? '' : '🔒'}</span></div>
            <div class="text-[12px] md:text-[13px] font-bold text-slate-600 mt-1 line-clamp-2">${escapeHtml(bt.title || '')}</div>
            <div class="text-[10px] mt-1 ${open ? 'text-emerald-600' : 'text-slate-400'} font-black">${open ? '20 câu' : 'Cần ≥80% bài trước'}</div>
        </button>`;
    }).join('')}</div>`;
}

function showLockedBaiTapTV2_(bai) {
    if (!requirePremiumAccess('Bài tập')) return;
    showAppDialog(`Bài tập ${bai} chưa mở. Bé cần đạt từ 80% ở Bài tập trước để mở khóa nhé!`, { type:'warning', title:'Bài tập đang khóa', icon:'🔒' });
}

function questionMatchesFocusTV2_(q, tokens) {
    if (!tokens || !tokens.length) return true;
    const question = String(q.question_text || '').toLowerCase();
    const answer = String(q.answer || '').toLowerCase();
    const hint = String(q.hint || '').toLowerCase();
    const options = (q.options || []).map(x => String(x).toLowerCase());
    return tokens.some(raw => {
        let t = String(raw || '').trim().toLowerCase();
        if (!t) return false;
        if (t.startsWith('dấu ')) t = t.slice(4).trim();
        // Với âm/vần ngắn, ưu tiên dạng được đặt trong dấu nháy trong kho câu hỏi
        // để tránh khớp mù chỉ vì chữ đó xuất hiện bên trong một từ khác.
        if (t.length <= 4) {
            const quoted = question.includes(`'${t}'`) || question.includes(`“${t}”`) || question.includes(`"${t}"`) || hint.includes(`'${t}'`);
            return quoted || answer === t || options.includes(t);
        }
        return question.includes(t) || hint.includes(t) || answer.includes(t) || options.some(x => x.includes(t));
    });
}

function getQuestionsForBaiTapTV2_(bt) {
    if (!bt) return [];
    const semester=Number(bt.semester)===2?2:1;
    const sourcePool=baiTapQuestionPoolBySemesterTV2_[semester]||[];
    const topicIds=(bt.topic_ids||[]).map(Number);
    const subIds=new Set((bt.sub_ids||[]).map(x=>String(x).trim()).filter(Boolean));
    const subNames=new Set((bt.sub_names||[]).map(x=>String(x).trim()).filter(Boolean));
    const focusTokens=(bt.focus_tokens||[]).map(x=>String(x).trim()).filter(Boolean);
    const inTopic=q=>topicIds.includes(Number(q.source_topic_id));
    const bySubId=sourcePool.filter(q=>inTopic(q)&&(!subIds.size||subIds.has(String(q.sub_id||'').trim())));
    const bySubName=sourcePool.filter(q=>inTopic(q)&&(!subNames.size||subNames.has(String(q.sub_topic||'').trim())));
    let semanticPool=bySubId.length>=20?bySubId:bySubName;
    if(semanticPool.length<20) semanticPool=sourcePool.filter(inTopic);
    let scoped=semanticPool.filter(q=>questionMatchesFocusTV2_(q,focusTokens));
    if(scoped.length<20){const used=new Set(scoped.map(q=>String(q.question_id)));scoped=scoped.concat(semanticPool.filter(q=>!used.has(String(q.question_id))));}
    if(scoped.length<20){const used=new Set(scoped.map(q=>String(q.question_id)));scoped=scoped.concat(sourcePool.filter(q=>inTopic(q)&&!used.has(String(q.question_id))));}
    const recent=new Set(getRecentBaiTapIdsTV2_(bt.bai));
    const fresh=shuffleArray(scoped.filter(q=>!recent.has(String(q.question_id))));
    const old=shuffleArray(scoped.filter(q=>recent.has(String(q.question_id))));
    const candidateTarget=Math.max(20,Number(bt.candidate_pool_target||30));
    const picked=fresh.concat(old).slice(0,Math.min(candidateTarget,scoped.length)).slice(0,20);
    saveRecentBaiTapIdsTV2_(bt.bai,picked.map(q=>String(q.question_id)));
    return shuffleArray(picked);
}

async function selectBaiTapTV2_(bai) {
    if (!requirePremiumAccess('Bài tập')) return;
    setAppShellRootMode_(false);
    stopSpeaking();
    showLoadingOverlay(`Đang chuẩn bị Bài tập ${bai}...`);
    try {
        const data = await loadBaiHocDataTV2_();
        const bt = (data?.bai_tap || []).find(x => Number(x.bai) === Number(bai));
        if (!bt) throw new Error('Không tìm thấy Bài tập');
        await refreshClass2TvExerciseProgress_();
        if (Number(bai) > getUnlockedBaiTapTV2_()) { showLockedBaiTapTV2_(bai); return; }
        await fetchAllTopicsData();
        const qs = getQuestionsForBaiTapTV2_(bt);
        if (qs.length < 20) throw new Error(`Kho câu hỏi phù hợp hiện chỉ có ${qs.length}/20 câu`);
        activeRoadmapContext = { week:Number(bai), bai:Number(bai), exerciseId:`TV2_BT${String(Number(bai)).padStart(3,'0')}`, topicId:(bt.topic_ids||[1])[0], chuDe:`Bài tập ${bai} · ${bt.title||''}`, semester:Number(bt.semester) };
        pendingTopicQuiz = null;
        activeExamContext = null;
        updateNavTabs('Bài tập', '✏️', `Bài ${bai}`, bt.title || '');
        startTopicQuiz((bt.topic_ids || [1])[0], activeRoadmapContext.chuDe, qs, null);
    } catch (err) {
        await showAppDialog(`Không thể mở Bài tập: ${err.message}`, { type:'error' });
    } finally { hideLoadingOverlay(); }
}

async function saveWeeklyProgressToSheet(percent, starCount, scoreVal) {
    if (!activeRoadmapContext || !currentUser || currentUser.isGuest) return;
    try {
        await tvModuleCtx_.apiRequest('assessmentAttemptSubmit',{subjectId:'tv',kind:'baitap',semester:Number(activeRoadmapContext.semester)===2?'hk2':'hk1',assessmentId:String(activeRoadmapContext.exerciseId||''),attemptId:newTvAssessmentAttemptId_(),answers:assessmentAnswersPayloadTV2_(),durationMs:quizStartTime?Math.max(0,Date.now()-quizStartTime):0});
        await refreshClass2TvExerciseProgress_();
    } catch(err) { handleTvAssessmentBackendUnavailable_(err); }
}

function handleNextExamFromReport() {
    stopSpeaking();
    if (activeRoadmapContext) {
        const sem = Number(activeRoadmapContext.semester) || (Number(activeRoadmapContext.bai || activeRoadmapContext.week) <= 64 ? 1 : 2);
        activeRoadmapContext = null;
        openRoadmap(sem);
    } else if (activeExamContext) {
        activeExamContext = null;
        openExamHub();
    } else {
        goHome();
    }
}

function returnToTopicLecture() {
    stopSpeaking();
    clearInterval(quizTimerInterval);
    if (currentMainTab === 'review') {
        openReviewTab();
        return;
    }
    if (currentMainTab === 'discover') {
        // Sau khi bỏ tab "Khám phá" khỏi header, ô breadcrumb đầu tiên chính là
        // chuyên mục đang mở. Bấm vào đó phải quay về chuyên mục, không về Home.
        if (activeTopicId) returnToCurrentDiscoverTopic_();
        else goHome();
        return;
    }
    if (inBaiHocFlow) {
        openBaiHocHub(activeBaiHocContext?.semester || 1);
    } else if (activeExamContext) {
        openExamHub();
    } else if (activeRoadmapContext) {
        openRoadmap(activeRoadmapContext?.semester || 1);
    } else if (inMiniGameFlow) {
        openMiniGameHub();
    } else if (activeTopicId === 1) {
        openLettersSubmenu();
    } else if (pendingTopicQuiz) {
        updateDiscoverBreadcrumb_(pendingTopicQuiz.topicName, TOPICS_CONFIG.find(t => t.id === pendingTopicQuiz.topicNum)?.icon || '🌸', null);
        switchAppView('view-lecture');
    }
}


const TV_RUNTIME_HTML_ = "<div class=\"w-full max-w-5xl flex flex-col space-y-1.5 md:space-y-2 p-1 md:p-2\" id=\"screen-dashboard\">\n<header class=\"app-main-header w-full bg-white/95 backdrop-blur-md rounded-2xl shadow-sm border-2 border-pink-200\">\n<button class=\"flex items-center justify-center bg-white border border-pink-300 shadow-sm shrink-0 overflow-hidden p-0 transition-shadow duration-200 hover:border-pink-400 hover:shadow-[0_0_18px_rgba(244,114,182,0.65)]\" id=\"btn-header-home\" onclick=\"goHome()\" title=\"Về trang chủ\">\n<img alt=\"Trang chủ Tiếng Việt 2\" class=\"w-full h-full object-cover\" src=\"logo-home.jpg\"/>\n</button>\n<nav aria-label=\"Điều hướng chính\" id=\"main-module-tabs\">\n<div>\n<button class=\"main-module-tab\" data-tab=\"discover\" id=\"main-tab-discover\" onclick=\"openMainTab('discover')\"><span>🧭</span><span>Khám phá</span></button>\n<button class=\"main-module-tab\" data-tab=\"lessons\" id=\"main-tab-lessons\" onclick=\"openMainTab('lessons')\"><span>📖</span><span>Bài học</span><span class=\"hidden absolute -top-1 -right-1 text-[10px]\" id=\"bai-hoc-lock-icon\">🔒</span></button>\n<button class=\"main-module-tab\" data-tab=\"exercises\" id=\"main-tab-exercises\" onclick=\"openMainTab('exercises')\"><span>✏️</span><span>Bài tập</span><span class=\"hidden absolute -top-1 -right-1 text-[10px]\" id=\"roadmap-lock-icon\">🔒</span></button>\n<button class=\"main-module-tab\" data-tab=\"review\" id=\"main-tab-review\" onclick=\"openMainTab('review')\"><span>🧠</span><span>Ôn tập</span><span class=\"hidden absolute -top-1 -right-1 text-[10px]\" id=\"review-lock-icon\">🔒</span></button>\n<button class=\"main-module-tab\" data-tab=\"exams\" id=\"main-tab-exams\" onclick=\"openMainTab('exams')\"><span>🏆</span><span>Đề thi</span><span class=\"hidden absolute -top-1 -right-1 text-[10px]\" id=\"exam-lock-icon\">🔒</span></button>\n<button class=\"main-module-tab\" data-tab=\"games\" id=\"main-tab-games\" onclick=\"openMainTab('games')\"><span>🎮</span><span>Mini games</span><span class=\"hidden absolute -top-1 -right-1 text-[10px]\" id=\"minigame-lock-icon\">🔒</span></button>\n</div>\n</nav>\n<div class=\"flex items-center\" id=\"header-info-zone\">\n<div class=\"flex flex-col space-y-0.5 bg-pink-50/90 px-1.5 md:px-2.5 py-1 rounded-xl border border-pink-200 shadow-inner\" id=\"header-star-box\">\n<div class=\"flex items-center justify-between space-x-2 font-extrabold\">\n<span class=\"px-1.5 py-0.5 bg-emerald-500 text-white rounded text-[10px] shadow-sm flex items-center justify-center\"><i class=\"fa-solid fa-star md:mr-0.5\"></i><span class=\"hidden md:inline\"> Đúng</span></span>\n<span class=\"text-emerald-600 font-extrabold text-xs\" id=\"star-green-count\">0</span>\n</div>\n<div class=\"flex items-center justify-between space-x-2 font-extrabold\">\n<span class=\"px-1.5 py-0.5 bg-rose-500 text-white rounded text-[10px] shadow-sm flex items-center justify-center\"><i class=\"fa-solid fa-star md:mr-0.5\"></i><span class=\"hidden md:inline\"> Sai</span></span>\n<span class=\"text-rose-600 font-extrabold text-xs\" id=\"star-red-count\">0</span>\n</div>\n</div>\n<div class=\"text-xs font-bold text-gray-600 text-right\" id=\"user-info-box\"></div>\n</div>\n</header>\n<section aria-label=\"Không gian nhận diện và điều hướng\" id=\"app-banner-slot\">\n<div id=\"app-main-banner\">\n<picture>\n<source media=\"(max-width: 767px)\" srcset=\"banner-main-mobile.jpg\"/>\n<img alt=\"Không gian học tập Tiếng Việt 2\" src=\"banner-main.jpg\"/>\n</picture>\n</div>\n<div class=\"hidden\" id=\"app-context-banner\">\n<div class=\"flex items-center min-w-0\" id=\"header-learning-tabs\">\n<div class=\"hidden items-center\" id=\"header-level2-tab\">\n<button class=\"flex items-center space-x-1.5 shrink-0 transition-shadow duration-200\" onclick=\"returnToTopicLecture()\">\n<span id=\"header-level2-icon\">🌸</span><span class=\"truncate\" id=\"header-level2-title\">Chủ đề học</span>\n</button>\n</div>\n<div class=\"hidden items-center space-x-1\" id=\"header-level3-tab\"><span class=\"font-bold\">›</span><div class=\"truncate flex items-center\"><span class=\"truncate\" id=\"header-level3-title\">Mục nhỏ</span></div></div>\n<div class=\"hidden items-center space-x-1\" id=\"header-level4-tab\"><span class=\"font-bold\">›</span><div class=\"truncate flex items-center\"><span class=\"truncate\" id=\"header-level4-title\">Mục sâu</span></div></div>\n</div>\n</div>\n</section>\n<main class=\"w-full\" id=\"app-viewport\">\n<!-- VIEW 1: TRANG CHỦ 12 CHỦ ĐỀ -->\n<div class=\"w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5\" id=\"view-dashboard-grid\"></div>\n<!-- MODULE BAI HOC: HIEN THI TRUC TIEP DANH SACH BAI -->\n<div class=\"w-full hidden pastel-card p-3 md:p-5\" id=\"view-bai-hoc-hub\">\n<div class=\"w-full max-w-6xl mx-auto\">\n<div class=\"grid grid-cols-[auto_1fr_auto] items-center gap-3 mb-3\">\n<div class=\"flex items-center gap-2 justify-self-start\" id=\"bai-hoc-semester-tabs\"></div>\n<div class=\"text-center min-w-0\">\n<h2 class=\"text-lg md:text-xl font-black text-purple-700 flex items-center justify-center gap-2\"><span>📖</span><span>Bài học Tiếng Việt 2</span></h2>\n<p class=\"text-xs md:text-sm text-slate-500 font-bold mt-0.5\" id=\"bai-hoc-hub-subtitle\">Chọn bài và học ngay</p>\n</div>\n<div aria-hidden=\"true\" class=\"w-[180px] hidden md:block\"></div>\n</div>\n<div class=\"grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2\" id=\"bai-hoc-grid\"></div>\n</div>\n</div>\n<div class=\"w-full hidden pastel-card p-3 md:p-5\" id=\"view-bai-hoc-lesson\">\n<div class=\"w-full max-w-4xl mx-auto space-y-3\">\n<div class=\"flex items-start justify-between gap-3\">\n<div class=\"min-w-0\">\n<div class=\"text-sm md:text-base font-extrabold text-purple-600 mb-1\" id=\"bai-hoc-lesson-meta\">📖 Bài học</div>\n<h2 class=\"text-lg md:text-xl font-black text-slate-800\" id=\"bai-hoc-lesson-title\"></h2>\n</div>\n<button class=\"px-3 py-2 bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 rounded-xl text-xs md:text-sm font-extrabold shrink-0\" id=\"btn-back-bai-hoc-list\" onclick=\"openBaiHocHub(activeBaiHocContext?.semester || 1)\">← Danh sách bài</button>\n</div>\n<div class=\"space-y-3\" id=\"bai-hoc-sections\"></div>\n</div>\n</div>\n<!-- VIEW 2: BÀI GIẢNG -->\n<div class=\"w-full hidden pastel-card p-4 md:p-6 flex flex-col justify-between items-center min-h-[480px]\" id=\"view-lecture\">\n<div class=\"w-full max-w-4xl flex flex-col items-center\">\n<h2 class=\"hidden\" id=\"lecture-title\"></h2>\n<div class=\"w-full bg-pink-50/40 p-3.5 md:p-4 rounded-2xl border-2 border-pink-100 mb-3\">\n<p class=\"text-base md:text-lg text-gray-700 leading-relaxed whitespace-pre-line text-center\" id=\"lecture-content\"></p>\n</div>\n<button class=\"w-full max-w-xs py-2 bg-purple-100 hover:bg-purple-200 text-purple-700 font-extrabold rounded-xl text-sm md:text-base pastel-btn flex items-center justify-center space-x-2 border-2 border-purple-200 shadow-sm mb-2.5\" onclick=\"speakLecture()\">\n<i class=\"fa-solid fa-volume-high text-base\"></i><span>Nghe cô đọc</span>\n</button>\n<div class=\"w-full pt-2 border-t border-pink-100 flex flex-col items-center\">\n<div class=\"grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-2xl\" id=\"lecture-subtopics-list\"></div>\n</div>\n</div>\n<div class=\"w-full flex justify-center mt-2.5 pt-1\">\n<button class=\"w-full max-w-xs py-2 bg-gradient-to-r from-purple-400 to-indigo-400 text-white font-extrabold rounded-xl text-xs md:text-sm pastel-btn shadow-md\" onclick=\"selectSubtopic(null)\">\n                            🌟 Học trộn tất cả các mục\n                        </button>\n</div>\n</div>\n<!-- VIEW 3: PHÒNG LÀM BÀI / THI CHUẨN 16:9 -->\n<div class=\"w-full hidden flex flex-col space-y-1.5\" id=\"view-quiz\">\n<!-- TOP BAR CỦA ĐỀ THI (ẨN HOÀN TOÀN TRONG CHẾ ĐỘ LUYỆN TẬP) -->\n<div class=\"w-full bg-white rounded-2xl p-2.5 border-2 border-pink-200 flex flex-wrap items-center justify-between gap-2.5 shadow-xs\" id=\"quiz-top-bar\">\n<div class=\"flex items-center space-x-2\" id=\"quiz-timer-container\">\n<div class=\"w-8 h-8 rounded-xl bg-pink-50 border border-pink-200 flex items-center justify-center text-pink-500 font-bold text-sm\">\n<i class=\"fa-solid fa-stopwatch\"></i>\n</div>\n<div>\n<span class=\"text-xs font-bold text-gray-400 uppercase tracking-wider block\">Thời gian</span>\n<span class=\"text-base font-black text-rose-500 tracking-wider\" id=\"quiz-timer-display\">40:00</span>\n</div>\n</div>\n<button class=\"ml-auto px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-black text-xs md:text-sm flex items-center space-x-1.5 transition-all shadow-sm pastel-btn\" id=\"btn-submit-quiz\" onclick=\"triggerSubmitQuizPrompt()\">\n<i class=\"fa-solid fa-circle-check\"></i>\n<span>Nộp bài thi</span>\n</button>\n</div>\n<!-- THẺ CARD LÀM BÀI CHÍNH -->\n<div class=\"w-full pastel-card p-3.5 md:p-5 flex flex-col justify-between min-h-[480px]\">\n<!-- HEADER TRONG CARD (CHỈ HIỆN KHI THI) -->\n<div class=\"hidden items-center justify-between flex-wrap gap-2 border-b border-pink-100 pb-2\" id=\"quiz-card-header\">\n<div class=\"flex items-center space-x-2\">\n<span class=\"px-2.5 py-1 bg-pink-100 text-pink-800 text-sm font-black rounded-lg\" id=\"q-badge-index\">CÂU 1 / 13</span>\n<span class=\"px-2.5 py-1 bg-pink-50 text-pink-700 border border-pink-200 text-sm font-bold rounded-lg flex items-center space-x-1\" id=\"q-badge-skill\">\n<i class=\"fa-solid fa-tag text-xs\"></i>\n<span id=\"q-skill-text\">Kiến thức cơ bản</span>\n</span>\n<span class=\"px-2 py-1 bg-amber-50 text-amber-700 border border-amber-200 text-sm font-bold rounded-lg\" id=\"q-badge-score\">(0.5 điểm)</span>\n</div>\n<button class=\"hidden px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 rounded-xl text-sm font-extrabold items-center space-x-1.5 transition-shadow duration-200 hover:shadow-[0_0_10px_rgba(99,102,241,0.5)] shadow-xs\" id=\"btn-roadmap-history\" onclick=\"openHistoryModal('LichSuTienTrinhTuan')\">\n<i class=\"fa-solid fa-chart-line\"></i>\n<span>Lịch sử tiến trình tuần</span>\n</button>\n<button class=\"px-3 py-1.5 bg-pink-50 hover:bg-pink-100 text-pink-700 border border-pink-200 rounded-xl text-sm font-extrabold flex items-center space-x-1.5 transition-all pastel-btn shadow-xs\" onclick=\"speakCurrentQuestion()\">\n<i class=\"fa-solid fa-volume-high text-pink-600\"></i>\n<span>Nghe câu hỏi</span>\n</button>\n</div>\n<!-- KHU VỰC CÂU HỎI & ĐÁP ÁN -->\n<div class=\"w-full flex flex-col justify-center items-center flex-1 my-0.5\" id=\"question-box\"></div>\n<!-- ĐIỀU HƯỚNG ĐÁY -->\n<div class=\"w-full pt-1\" id=\"quiz-bottom-nav\">\n<!-- 1. GIAO DIỆN LUYỆN TẬP -->\n<div class=\"flex items-center justify-center gap-3 w-full\" id=\"nav-group-practice\">\n<button class=\"px-5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-extrabold rounded-2xl text-xs md:text-sm pastel-btn border border-gray-200 flex items-center justify-center space-x-1.5 shadow-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed\" id=\"btn-prev-q-prac\" onclick=\"prevQuestion()\">\n<i class=\"fa-solid fa-chevron-left\"></i><span>Câu trước</span>\n</button>\n<div class=\"px-5 py-1.5 bg-pink-50 border border-pink-200 text-pink-700 font-black rounded-full text-xs md:text-sm flex items-center justify-center space-x-1.5 shadow-xs select-none\" id=\"practice-step-indicator\">\n<span id=\"practice-step-text\">Câu 1 / 59</span>\n</div>\n<button class=\"px-6 py-2 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-black rounded-2xl text-xs md:text-sm pastel-btn shadow-md flex items-center justify-center space-x-1.5 transition-all\" id=\"btn-next-q-prac\" onclick=\"nextQuestion()\">\n<span id=\"btn-next-text-prac\">Câu tiếp theo</span>\n<i class=\"fa-solid fa-chevron-right ml-1\" id=\"btn-next-icon-prac\"></i>\n</button>\n</div>\n<!-- 2. GIAO DIỆN ĐỀ THI -->\n<div class=\"hidden items-center justify-between w-full\" id=\"nav-group-exam\">\n<button class=\"px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-extrabold rounded-xl text-xs md:text-sm pastel-btn border border-gray-200 flex items-center justify-center space-x-1.5 shadow-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed\" id=\"btn-prev-q-exam\" onclick=\"prevQuestion()\">\n<i class=\"fa-solid fa-chevron-left\"></i><span>Câu trước</span>\n</button>\n<div class=\"grid grid-cols-10 gap-1.5 max-w-xl mx-2\" id=\"quiz-pallet-container\"></div>\n<button class=\"px-5 py-2 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-black rounded-xl text-xs md:text-sm pastel-btn shadow-md flex items-center justify-center space-x-1.5 transition-all\" id=\"btn-next-q-exam\" onclick=\"nextQuestion()\">\n<span id=\"btn-next-text-exam\">Câu tiếp theo</span>\n<i class=\"fa-solid fa-chevron-right ml-1\" id=\"btn-next-icon-exam\"></i>\n</button>\n</div>\n</div>\n</div>\n</div>\n<!-- VIEW 4: BÀI TẬP (tạm dùng engine tiến trình tuần hiện tại) -->\n<div class=\"w-full hidden pastel-card p-3 md:p-5 flex flex-col justify-start items-center\" id=\"view-roadmap\">\n<div class=\"w-full max-w-6xl flex flex-col items-center\">\n<div class=\"flex flex-col sm:flex-row items-center justify-between w-full px-2 mb-2 gap-2\">\n<div>\n<h2 class=\"text-base md:text-lg font-extrabold text-indigo-600 flex items-center space-x-2\">\n<span>✏️</span><span>Bài tập</span>\n</h2>\n<p class=\"text-[11px] md:text-xs text-gray-500 font-bold\">20 câu mỗi bài · đạt từ 80% để mở Bài tập tiếp theo.</p>\n</div>\n<div class=\"flex items-center gap-3 shrink-0\">\n<div class=\"flex items-center gap-2\" id=\"roadmap-semester-tabs\"></div>\n<button class=\"px-3 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-extrabold rounded-xl border border-indigo-200 text-xs pastel-btn flex items-center space-x-1.5 shadow-sm\" onclick=\"openHistoryModal('LichSuTienTrinhTuan')\">\n<i class=\"fa-solid fa-chart-line text-indigo-600\"></i>\n<span>📊 Lịch sử Bài tập</span>\n</button>\n</div>\n</div>\n<div class=\"w-full flex justify-center items-center overflow-hidden bg-gradient-to-b from-pink-50/30 to-purple-50/30 rounded-2xl border-2 border-pink-100 p-1\" id=\"roadmap-svg-container\"></div>\n</div>\n</div>\n<!-- VIEW: TRUNG TÂM MINI GAME (12 GAME, LƯỚI 3x4) -->\n<div class=\"w-full hidden pastel-card p-3 md:p-5 flex flex-col items-center\" id=\"view-minigame-hub\">\n<div class=\"w-full max-w-5xl\">\n<div class=\"text-center mb-4\">\n<h2 class=\"text-base md:text-lg font-extrabold text-teal-600 flex items-center justify-center space-x-2\">\n<span>🎮</span><span>Trung tâm Mini Game</span>\n</h2>\n<p class=\"text-[11px] md:text-xs text-gray-500 font-bold\">Học mà chơi - chơi mà nhớ cùng Tiếng Việt 2 nhé!</p>\n</div>\n<div class=\"grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3\" id=\"minigame-grid\"></div>\n</div>\n</div>\n<!-- VIEW: MÀN CHƠI GAME -->\n<div class=\"w-full hidden pastel-card p-3 md:p-5 flex flex-col items-center\" id=\"view-game-play\">\n<div class=\"w-full max-w-4xl\">\n<div class=\"flex items-center justify-between mb-3 gap-2\">\n<h2 class=\"text-base md:text-lg font-extrabold text-teal-600 flex items-center gap-2\" id=\"game-play-title\"></h2>\n<button class=\"px-3 py-1.5 bg-gradient-to-r from-fuchsia-500 to-pink-500 hover:from-fuchsia-600 hover:to-pink-600 text-white font-extrabold rounded-xl text-xs md:text-sm shadow-sm pastel-btn shrink-0\" onclick=\"openMiniGameHub()\">\n<i class=\"fa-solid fa-arrow-left\"></i> Chọn game khác\n                            </button>\n</div>\n<div class=\"w-full\" id=\"game-play-container\"></div>\n</div>\n</div>\n<!-- VIEW 5: ĐẤU TRƯỜNG ĐỀ THI (MỤC 12) -->\n<div class=\"w-full hidden pastel-card p-5 md:p-7 flex flex-col justify-between items-center min-h-[480px]\" id=\"view-exam-hub\">\n<div class=\"w-full max-w-5xl\">\n<div class=\"text-center mb-5\">\n<h2 class=\"font-extrabold text-amber-600 text-lg md:text-xl flex items-center justify-center space-x-2\">\n<span>🏆</span><span>Đấu trường đề thi thử</span>\n</h2>\n<p class=\"text-xs md:text-sm text-gray-500 font-bold mt-1\">Thử sức các bộ đề 13 câu - đánh giá đúng năng lực được kiểm tra</p>\n</div>\n<div class=\"grid grid-cols-1 md:grid-cols-3 gap-4\" id=\"exam-categories-grid\"></div>\n</div>\n</div>\n<!-- VIEW 6: MÀN HÌNH KẾT QUẢ & BÁO CÁO -->\n<div class=\"w-full hidden flex flex-col space-y-3\" id=\"view-result\">\n<div class=\"bg-gradient-to-tr from-rose-900 via-pink-950 to-rose-900 rounded-3xl p-4 sm:p-5 text-white shadow-xl relative overflow-hidden\">\n<div class=\"relative z-10 flex flex-col md:flex-row items-center justify-between gap-4\">\n<div class=\"space-y-1 text-center md:text-left\">\n<span class=\"px-3 py-0.5 bg-white/10 backdrop-blur-md rounded-full text-xs font-bold tracking-wider text-pink-200 border border-white/15 inline-block\" id=\"report-exam-badge\">\n                                    Kết quả bài thi\n                                </span>\n<h2 class=\"text-lg sm:text-xl font-black tracking-tight\" id=\"report-student-display\">Học sinh: --</h2>\n<p class=\"text-xs text-pink-200\" id=\"report-meta-display\">Lớp: -- | Mã số: -- | Thời gian: --</p>\n</div>\n<div class=\"flex items-center gap-3\">\n<div class=\"bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-4 py-2 text-center\">\n<span class=\"text-[10px] uppercase tracking-wider text-pink-200 font-bold block mb-0.5\">Tổng điểm</span>\n<div class=\"text-2xl sm:text-3xl font-black font-math text-amber-300\" id=\"report-total-score-val\">0.0</div>\n<span class=\"text-[9px] text-pink-200\">Thang điểm 10</span>\n</div>\n<div class=\"bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-4 py-2 text-center\">\n<span class=\"text-[10px] uppercase tracking-wider text-pink-200 font-bold block mb-0.5\">Độ chính xác</span>\n<div class=\"text-2xl sm:text-3xl font-black font-math text-emerald-300\" id=\"report-correct-ratio-val\">0/13</div>\n<span class=\"text-[9px] text-pink-200\">Câu đúng</span>\n</div>\n</div>\n</div>\n</div>\n<div class=\"bg-white rounded-3xl p-4 sm:p-5 border border-pink-100 soft-shadow-pink space-y-2.5\">\n<h3 class=\"text-sm sm:text-base font-black text-slate-800 tracking-tight flex items-center space-x-2\">\n<i class=\"fa-solid fa-chart-bar text-pink-600\"></i>\n<span>Bóc tách điểm số &amp; đánh giá theo khung năng lực</span>\n</h3>\n<div class=\"grid grid-cols-1 sm:grid-cols-2 gap-2\" id=\"report-topics-list\"></div>\n</div>\n<div class=\"grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-0.5\">\n<button class=\"py-2.5 px-3 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-black text-xs rounded-2xl shadow-xs transition-all flex items-center justify-center space-x-1.5 pastel-btn\" onclick=\"openReviewWrongModal()\">\n<i class=\"fa-solid fa-circle-question text-rose-500\"></i>\n<span>👉 Xem lại các câu làm sai</span>\n</button>\n<button class=\"py-2.5 px-3 bg-pink-50 hover:bg-pink-100 text-pink-700 border border-pink-200 font-black text-xs rounded-2xl shadow-xs transition-all flex items-center justify-center space-x-1.5 pastel-btn\" id=\"report-history-btn\" onclick=\"openHistoryModal('LichSuBaiThi_HK1')\">\n<i class=\"fa-solid fa-chart-line text-pink-600\"></i>\n<span>📊 Lịch sử &amp; biểu đồ tiến trình</span>\n</button>\n<button class=\"py-2.5 px-3 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-black text-xs rounded-2xl shadow-sm transition-all flex items-center justify-center space-x-1.5 pastel-btn\" id=\"report-next-action-btn\" onclick=\"handleNextExamFromReport()\">\n<span id=\"report-next-action-label\">🚀 Làm đề thi tiếp theo</span>\n<i class=\"fa-solid fa-arrow-right\"></i>\n</button>\n</div>\n</div>\n</main>\n</div>\n<div class=\"hidden fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3\" id=\"modal-review-wrong\">\n<div class=\"bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-pink-100 overflow-hidden\">\n<div class=\"p-3.5 border-b border-pink-100 flex items-center justify-between bg-rose-50/50\">\n<div class=\"flex items-center space-x-2 text-rose-800\">\n<i class=\"fa-solid fa-triangle-exclamation text-rose-600\"></i>\n<h3 class=\"font-black text-sm\">Chi tiết các câu trả lời chưa chính xác</h3>\n</div>\n<button class=\"w-7 h-7 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-700\" onclick=\"closeReviewWrongModal()\"><i class=\"fa-solid fa-xmark\"></i></button>\n</div>\n<div class=\"p-4 overflow-y-auto space-y-3 flex-grow text-xs sm:text-sm\" id=\"review-wrong-content\"></div>\n<div class=\"p-3 border-t border-slate-100 flex justify-end bg-slate-50\">\n<button class=\"px-5 py-2 bg-slate-800 text-white font-bold rounded-xl text-xs pastel-btn\" onclick=\"closeReviewWrongModal()\">Đóng lại</button>\n</div>\n</div>\n</div>\n<div class=\"hidden fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4\" id=\"modal-history-progress\">\n<div class=\"bg-white rounded-3xl max-w-5xl w-full max-h-[96vh] flex flex-col shadow-2xl border-2 border-pink-200 overflow-hidden\">\n<div class=\"p-4 sm:p-6 overflow-y-auto space-y-4 flex-grow bg-white\" id=\"printable-report-area\">\n<!-- TRANG 1: THÔNG TIN & BIỂU ĐỒ -->\n<div class=\"space-y-4 page-break-1\">\n<div class=\"p-3.5 sm:p-4 rounded-2xl border border-pink-200 bg-pink-50/70 flex flex-col md:flex-row items-center justify-between gap-3 shadow-xs\">\n<div class=\"flex items-center space-x-3 text-pink-950 flex-1\">\n<div class=\"w-10 h-10 rounded-2xl bg-pink-100 text-pink-600 flex items-center justify-center shadow-xs shrink-0\">\n<i class=\"fa-solid fa-award text-xl\"></i>\n</div>\n<div>\n<h3 class=\"font-black text-base sm:text-lg text-pink-950\" id=\"hist-modal-title\">Kết quả tiến trình học tập</h3>\n<p class=\"text-xs font-bold text-pink-600 whitespace-nowrap\">Chỉ phân tích các năng lực đã có đủ dữ liệu đánh giá</p>\n</div>\n</div>\n<div class=\"bg-white/95 border-2 border-pink-200 px-4 py-2 rounded-2xl shadow-xs text-left shrink-0\">\n<div class=\"text-sm font-black text-slate-900 leading-tight\">\n                                Học sinh: <span class=\"text-pink-600\" id=\"hist-info-name\">--</span>\n</div>\n<div class=\"text-xs font-bold text-slate-600 mt-0.5\">\n                                Mã ID: <span class=\"text-slate-900 font-extrabold\" id=\"hist-info-code\">--</span>\n</div>\n</div>\n<div class=\"flex items-center space-x-2 shrink-0\">\n<div class=\"text-xs font-bold text-slate-700 bg-white/95 px-3 py-2 rounded-xl border border-pink-200 text-center shadow-xs leading-tight\">\n<div>Ngày báo cáo</div>\n<div class=\"font-bold text-rose-600 mt-0.5\" id=\"hist-report-date\">03/09/2026</div>\n</div>\n<button class=\"w-8 h-8 rounded-full bg-white border border-pink-200 flex items-center justify-center text-pink-400 hover:text-rose-600 transition-all shadow-xs no-print\" onclick=\"closeHistoryModal()\">\n<i class=\"fa-solid fa-xmark\"></i>\n</button>\n</div>\n</div>\n<div class=\"flex flex-col md:flex-row gap-4 w-full\">\n<div class=\"w-full md:w-[60%] bg-pink-50/40 border border-pink-100 rounded-2xl p-4 flex flex-col justify-between shadow-xs\">\n<h4 class=\"text-xs sm:text-sm font-black text-slate-800 mb-2 flex items-center space-x-1.5\">\n<i class=\"fa-solid fa-chart-line text-pink-600\"></i>\n<span>Biến thiên tổng điểm các bài thi (/10)</span>\n</h4>\n<div class=\"h-64 w-full relative\">\n<canvas id=\"progressChartCanvas\"></canvas>\n</div>\n</div>\n<div class=\"w-full md:w-[40%] bg-pink-50/40 border border-pink-100 rounded-2xl p-4 flex flex-col justify-between shadow-xs\">\n<h4 class=\"text-xs sm:text-sm font-black text-slate-800 mb-2 flex items-center space-x-1.5\">\n<i class=\"fa-solid fa-chart-bar text-rose-600\"></i>\n<span>Mức đạt của các năng lực đã đánh giá (%)</span>\n</h4>\n<div class=\"h-64 w-full relative\">\n<canvas id=\"topicRadarChartCanvas\"></canvas>\n</div>\n</div>\n</div>\n</div>\n<!-- TRANG 2: NHẬN XÉT SƯ PHẠM CHI TIẾT -->\n<div class=\"space-y-4 page-break-2\">\n<div class=\"bg-gradient-to-br from-amber-50/90 via-orange-50/60 to-rose-50/50 border border-amber-200/80 rounded-2xl p-4 space-y-3 shadow-xs\">\n<div class=\"flex items-center space-x-2.5 border-b border-amber-200/60 pb-1.5\">\n<div class=\"w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shadow-xs shrink-0\">\n<i class=\"fa-solid fa-award\"></i>\n</div>\n<div class=\"flex-1\">\n<h4 class=\"text-base font-black text-amber-950 leading-tight\">Nhận xét sư phạm &amp; kế hoạch bồi dưỡng của giáo viên</h4>\n<p class=\"text-xs font-bold text-amber-700\">Đánh giá các năng lực có đủ dữ liệu &amp; lời khuyên phụ huynh đồng hành</p>\n</div>\n<button class=\"no-print shrink-0 px-3 py-1.5 bg-white hover:bg-amber-100 text-amber-700 border border-amber-300 rounded-2xl text-xs font-extrabold flex items-center space-x-1.5 pastel-btn shadow-xs\" onclick=\"speakPedagogicalEvaluation()\">\n<i class=\"fa-solid fa-volume-high text-amber-600\"></i>\n<span>Nghe cô giáo đọc</span>\n</button>\n</div>\n<div class=\"space-y-2.5 text-xs sm:text-sm text-slate-800 leading-normal font-semibold\" id=\"pedagogical-evaluation-box\"></div>\n</div>\n</div>\n<!-- TRANG 3: BẢNG THỐNG KÊ CHI TIẾT TỪNG BÀI THI -->\n<div class=\"space-y-3 page-break-3\">\n<h4 class=\"text-base font-black text-slate-900 flex items-center space-x-2\">\n<i class=\"fa-solid fa-table text-pink-600\"></i>\n<span>Bảng thống kê điểm số chi tiết từng bài thi</span>\n</h4>\n<div class=\"border border-pink-200 rounded-2xl overflow-hidden shadow-xs bg-white overflow-x-auto\">\n<table class=\"w-full text-center text-xs border-collapse\">\n<thead class=\"bg-pink-100/70 text-pink-950 font-black border-b border-pink-200\">\n<tr class=\"divide-x divide-pink-200\">\n<th class=\"py-2.5 px-2 whitespace-nowrap\">Lần thi</th>\n<th class=\"py-2.5 px-2 whitespace-nowrap\">Đề / Tuần</th>\n<th class=\"py-2.5 px-2 whitespace-nowrap text-rose-600\">Tổng điểm</th>\n<th class=\"py-2 px-1 leading-tight\">C1: Chính tả<br/><span class=\"text-[10px] text-pink-700\">(Âm - Vần)</span></th>\n<th class=\"py-2 px-1 leading-tight\">C2: Từ vựng<br/><span class=\"text-[10px] text-pink-700\">(Giao tiếp)</span></th>\n<th class=\"py-2 px-1 leading-tight\">C3: Từ loại<br/><span class=\"text-[10px] text-pink-700\">(Sự vật/HĐ/ĐĐ)</span></th>\n<th class=\"py-2 px-1 leading-tight\">C4: Câu<br/><span class=\"text-[10px] text-pink-700\">(Dấu câu)</span></th>\n<th class=\"py-2 px-1 leading-tight\">C5: Đọc hiểu<br/><span class=\"text-[10px] text-pink-700\">(Phản hồi)</span></th>\n<th class=\"py-2 px-1 leading-tight\">C6: Tư duy<br/><span class=\"text-[10px] text-pink-700\">(Ngôn ngữ)</span></th>\n<th class=\"py-2.5 px-2 whitespace-nowrap\">Ngày làm</th>\n<th class=\"py-2.5 px-2 whitespace-nowrap\">Thời gian</th>\n</tr>\n</thead>\n<tbody class=\"divide-y divide-pink-100 font-bold text-slate-700\" id=\"hist-table-body\"></tbody>\n</table>\n</div>\n</div>\n</div>\n<div class=\"p-3.5 border-t border-pink-100 flex items-center justify-between bg-pink-50/40 no-print\">\n<button class=\"px-5 py-2.5 bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-700 hover:to-red-700 text-white font-extrabold text-xs md:text-sm rounded-xl transition-all shadow-md pastel-btn flex items-center space-x-1.5\" onclick=\"exportReportToPDF()\">\n<i class=\"fa-solid fa-file-pdf\"></i>\n<span>Xuất PDF</span>\n</button>\n<button class=\"px-8 py-2.5 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-xl text-xs md:text-sm transition-all pastel-btn\" onclick=\"closeHistoryModal()\">\n                    Đóng lại\n                </button>\n</div>\n</div>\n</div>\n<div class=\"hidden app-dialog-backdrop\" id=\"app-dialog-modal\">\n<div aria-labelledby=\"app-dialog-title\" aria-modal=\"true\" class=\"app-dialog-card\" role=\"dialog\">\n<div class=\"app-dialog-body\">\n<div class=\"app-dialog-icon-wrap\" id=\"app-dialog-icon-wrap\"><span id=\"app-dialog-icon\">🐰</span></div>\n<h3 class=\"app-dialog-title\" id=\"app-dialog-title\">Thông báo</h3>\n<p class=\"app-dialog-message\" id=\"app-dialog-message\"></p>\n</div>\n<div class=\"app-dialog-actions\">\n<button class=\"app-dialog-btn app-dialog-btn-cancel hidden\" id=\"app-dialog-cancel\" type=\"button\">Đóng</button>\n<button class=\"app-dialog-btn app-dialog-btn-ok\" id=\"app-dialog-ok\" type=\"button\">OK</button>\n</div>\n</div>\n</div>\n<div aria-atomic=\"true\" aria-live=\"polite\" class=\"app-toast-container\" id=\"app-toast-container\"></div>";
const TV_RUNTIME_CSS_ = "/*! tailwindcss v4.1.10 | MIT License | https://tailwindcss.com */\n@layer properties;\n@layer theme, base, components, utilities;\n@layer theme{\n  #class2-vietnamese-runtime,\n#class2-vietnamese-runtime{\n    --font-sans: ui-sans-serif, system-ui, sans-serif, \"Apple Color Emoji\",\n      \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji\";\n    --font-serif: ui-serif, Georgia, Cambria, \"Times New Roman\", Times, serif;\n    --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\",\n      \"Courier New\", monospace;\n    --color-red-50: oklch(97.1% 0.013 17.38);\n    --color-red-100: oklch(93.6% 0.032 17.717);\n    --color-red-200: oklch(88.5% 0.062 18.334);\n    --color-red-300: oklch(80.8% 0.114 19.571);\n    --color-red-400: oklch(70.4% 0.191 22.216);\n    --color-red-500: oklch(63.7% 0.237 25.331);\n    --color-red-600: oklch(57.7% 0.245 27.325);\n    --color-red-700: oklch(50.5% 0.213 27.518);\n    --color-red-800: oklch(44.4% 0.177 26.899);\n    --color-red-900: oklch(39.6% 0.141 25.723);\n    --color-orange-50: oklch(98% 0.016 73.684);\n    --color-orange-100: oklch(95.4% 0.038 75.164);\n    --color-orange-200: oklch(90.1% 0.076 70.697);\n    --color-orange-300: oklch(83.7% 0.128 66.29);\n    --color-orange-400: oklch(75% 0.183 55.934);\n    --color-orange-500: oklch(70.5% 0.213 47.604);\n    --color-orange-600: oklch(64.6% 0.222 41.116);\n    --color-orange-700: oklch(55.3% 0.195 38.402);\n    --color-orange-800: oklch(47% 0.157 37.304);\n    --color-orange-900: oklch(40.8% 0.123 38.172);\n    --color-amber-50: oklch(98.7% 0.022 95.277);\n    --color-amber-100: oklch(96.2% 0.059 95.617);\n    --color-amber-200: oklch(92.4% 0.12 95.746);\n    --color-amber-300: oklch(87.9% 0.169 91.605);\n    --color-amber-400: oklch(82.8% 0.189 84.429);\n    --color-amber-500: oklch(76.9% 0.188 70.08);\n    --color-amber-600: oklch(66.6% 0.179 58.318);\n    --color-amber-700: oklch(55.5% 0.163 48.998);\n    --color-amber-800: oklch(47.3% 0.137 46.201);\n    --color-amber-900: oklch(41.4% 0.112 45.904);\n    --color-amber-950: oklch(27.9% 0.077 45.635);\n    --color-yellow-50: oklch(98.7% 0.026 102.212);\n    --color-yellow-100: oklch(97.3% 0.071 103.193);\n    --color-yellow-200: oklch(94.5% 0.129 101.54);\n    --color-yellow-300: oklch(90.5% 0.182 98.111);\n    --color-yellow-400: oklch(85.2% 0.199 91.936);\n    --color-yellow-500: oklch(79.5% 0.184 86.047);\n    --color-yellow-600: oklch(68.1% 0.162 75.834);\n    --color-yellow-700: oklch(55.4% 0.135 66.442);\n    --color-yellow-800: oklch(47.6% 0.114 61.907);\n    --color-yellow-900: oklch(42.1% 0.095 57.708);\n    --color-green-50: oklch(98.2% 0.018 155.826);\n    --color-green-100: oklch(96.2% 0.044 156.743);\n    --color-green-200: oklch(92.5% 0.084 155.995);\n    --color-green-300: oklch(87.1% 0.15 154.449);\n    --color-green-400: oklch(79.2% 0.209 151.711);\n    --color-green-500: oklch(72.3% 0.219 149.579);\n    --color-green-600: oklch(62.7% 0.194 149.214);\n    --color-green-700: oklch(52.7% 0.154 150.069);\n    --color-green-800: oklch(44.8% 0.119 151.328);\n    --color-green-900: oklch(39.3% 0.095 152.535);\n    --color-emerald-50: oklch(97.9% 0.021 166.113);\n    --color-emerald-100: oklch(95% 0.052 163.051);\n    --color-emerald-200: oklch(90.5% 0.093 164.15);\n    --color-emerald-300: oklch(84.5% 0.143 164.978);\n    --color-emerald-400: oklch(76.5% 0.177 163.223);\n    --color-emerald-500: oklch(69.6% 0.17 162.48);\n    --color-emerald-600: oklch(59.6% 0.145 163.225);\n    --color-emerald-700: oklch(50.8% 0.118 165.612);\n    --color-emerald-800: oklch(43.2% 0.095 166.913);\n    --color-emerald-900: oklch(37.8% 0.077 168.94);\n    --color-teal-50: oklch(98.4% 0.014 180.72);\n    --color-teal-100: oklch(95.3% 0.051 180.801);\n    --color-teal-200: oklch(91% 0.096 180.426);\n    --color-teal-300: oklch(85.5% 0.138 181.071);\n    --color-teal-400: oklch(77.7% 0.152 181.912);\n    --color-teal-500: oklch(70.4% 0.14 182.503);\n    --color-teal-600: oklch(60% 0.118 184.704);\n    --color-teal-700: oklch(51.1% 0.096 186.391);\n    --color-teal-800: oklch(43.7% 0.078 188.216);\n    --color-teal-900: oklch(38.6% 0.063 188.416);\n    --color-cyan-50: oklch(98.4% 0.019 200.873);\n    --color-cyan-100: oklch(95.6% 0.045 203.388);\n    --color-cyan-200: oklch(91.7% 0.08 205.041);\n    --color-cyan-300: oklch(86.5% 0.127 207.078);\n    --color-cyan-400: oklch(78.9% 0.154 211.53);\n    --color-cyan-500: oklch(71.5% 0.143 215.221);\n    --color-cyan-600: oklch(60.9% 0.126 221.723);\n    --color-cyan-700: oklch(52% 0.105 223.128);\n    --color-cyan-800: oklch(45% 0.085 224.283);\n    --color-cyan-900: oklch(39.8% 0.07 227.392);\n    --color-sky-50: oklch(97.7% 0.013 236.62);\n    --color-sky-100: oklch(95.1% 0.026 236.824);\n    --color-sky-200: oklch(90.1% 0.058 230.902);\n    --color-sky-300: oklch(82.8% 0.111 230.318);\n    --color-sky-400: oklch(74.6% 0.16 232.661);\n    --color-sky-500: oklch(68.5% 0.169 237.323);\n    --color-sky-600: oklch(58.8% 0.158 241.966);\n    --color-sky-700: oklch(50% 0.134 242.749);\n    --color-sky-800: oklch(44.3% 0.11 240.79);\n    --color-sky-900: oklch(39.1% 0.09 240.876);\n    --color-blue-50: oklch(97% 0.014 254.604);\n    --color-blue-100: oklch(93.2% 0.032 255.585);\n    --color-blue-200: oklch(88.2% 0.059 254.128);\n    --color-blue-300: oklch(80.9% 0.105 251.813);\n    --color-blue-400: oklch(70.7% 0.165 254.624);\n    --color-blue-500: oklch(62.3% 0.214 259.815);\n    --color-blue-600: oklch(54.6% 0.245 262.881);\n    --color-blue-700: oklch(48.8% 0.243 264.376);\n    --color-blue-800: oklch(42.4% 0.199 265.638);\n    --color-blue-900: oklch(37.9% 0.146 265.522);\n    --color-indigo-50: oklch(96.2% 0.018 272.314);\n    --color-indigo-100: oklch(93% 0.034 272.788);\n    --color-indigo-200: oklch(87% 0.065 274.039);\n    --color-indigo-300: oklch(78.5% 0.115 274.713);\n    --color-indigo-400: oklch(67.3% 0.182 276.935);\n    --color-indigo-500: oklch(58.5% 0.233 277.117);\n    --color-indigo-600: oklch(51.1% 0.262 276.966);\n    --color-indigo-700: oklch(45.7% 0.24 277.023);\n    --color-indigo-800: oklch(39.8% 0.195 277.366);\n    --color-indigo-900: oklch(35.9% 0.144 278.697);\n    --color-violet-50: oklch(96.9% 0.016 293.756);\n    --color-violet-100: oklch(94.3% 0.029 294.588);\n    --color-violet-200: oklch(89.4% 0.057 293.283);\n    --color-violet-300: oklch(81.1% 0.111 293.571);\n    --color-violet-400: oklch(70.2% 0.183 293.541);\n    --color-violet-500: oklch(60.6% 0.25 292.717);\n    --color-violet-600: oklch(54.1% 0.281 293.009);\n    --color-violet-700: oklch(49.1% 0.27 292.581);\n    --color-violet-800: oklch(43.2% 0.232 292.759);\n    --color-violet-900: oklch(38% 0.189 293.745);\n    --color-purple-50: oklch(97.7% 0.014 308.299);\n    --color-purple-100: oklch(94.6% 0.033 307.174);\n    --color-purple-200: oklch(90.2% 0.063 306.703);\n    --color-purple-300: oklch(82.7% 0.119 306.383);\n    --color-purple-400: oklch(71.4% 0.203 305.504);\n    --color-purple-500: oklch(62.7% 0.265 303.9);\n    --color-purple-600: oklch(55.8% 0.288 302.321);\n    --color-purple-700: oklch(49.6% 0.265 301.924);\n    --color-purple-800: oklch(43.8% 0.218 303.724);\n    --color-purple-900: oklch(38.1% 0.176 304.987);\n    --color-fuchsia-50: oklch(97.7% 0.017 320.058);\n    --color-fuchsia-100: oklch(95.2% 0.037 318.852);\n    --color-fuchsia-200: oklch(90.3% 0.076 319.62);\n    --color-fuchsia-300: oklch(83.3% 0.145 321.434);\n    --color-fuchsia-400: oklch(74% 0.238 322.16);\n    --color-fuchsia-500: oklch(66.7% 0.295 322.15);\n    --color-fuchsia-600: oklch(59.1% 0.293 322.896);\n    --color-fuchsia-700: oklch(51.8% 0.253 323.949);\n    --color-fuchsia-800: oklch(45.2% 0.211 324.591);\n    --color-fuchsia-900: oklch(40.1% 0.17 325.612);\n    --color-pink-50: oklch(97.1% 0.014 343.198);\n    --color-pink-100: oklch(94.8% 0.028 342.258);\n    --color-pink-200: oklch(89.9% 0.061 343.231);\n    --color-pink-300: oklch(82.3% 0.12 346.018);\n    --color-pink-400: oklch(71.8% 0.202 349.761);\n    --color-pink-500: oklch(65.6% 0.241 354.308);\n    --color-pink-600: oklch(59.2% 0.249 0.584);\n    --color-pink-700: oklch(52.5% 0.223 3.958);\n    --color-pink-800: oklch(45.9% 0.187 3.815);\n    --color-pink-900: oklch(40.8% 0.153 2.432);\n    --color-pink-950: oklch(28.4% 0.109 3.907);\n    --color-rose-50: oklch(96.9% 0.015 12.422);\n    --color-rose-100: oklch(94.1% 0.03 12.58);\n    --color-rose-200: oklch(89.2% 0.058 10.001);\n    --color-rose-300: oklch(81% 0.117 11.638);\n    --color-rose-400: oklch(71.2% 0.194 13.428);\n    --color-rose-500: oklch(64.5% 0.246 16.439);\n    --color-rose-600: oklch(58.6% 0.253 17.585);\n    --color-rose-700: oklch(51.4% 0.222 16.935);\n    --color-rose-800: oklch(45.5% 0.188 13.697);\n    --color-rose-900: oklch(41% 0.159 10.272);\n    --color-slate-50: oklch(98.4% 0.003 247.858);\n    --color-slate-100: oklch(96.8% 0.007 247.896);\n    --color-slate-200: oklch(92.9% 0.013 255.508);\n    --color-slate-300: oklch(86.9% 0.022 252.894);\n    --color-slate-400: oklch(70.4% 0.04 256.788);\n    --color-slate-500: oklch(55.4% 0.046 257.417);\n    --color-slate-600: oklch(44.6% 0.043 257.281);\n    --color-slate-700: oklch(37.2% 0.044 257.287);\n    --color-slate-800: oklch(27.9% 0.041 260.031);\n    --color-slate-900: oklch(20.8% 0.042 265.755);\n    --color-gray-50: oklch(98.5% 0.002 247.839);\n    --color-gray-100: oklch(96.7% 0.003 264.542);\n    --color-gray-200: oklch(92.8% 0.006 264.531);\n    --color-gray-300: oklch(87.2% 0.01 258.338);\n    --color-gray-400: oklch(70.7% 0.022 261.325);\n    --color-gray-500: oklch(55.1% 0.027 264.364);\n    --color-gray-600: oklch(44.6% 0.03 256.802);\n    --color-gray-700: oklch(37.3% 0.034 259.733);\n    --color-gray-800: oklch(27.8% 0.033 256.848);\n    --color-gray-900: oklch(21% 0.034 264.665);\n    --color-black: #000;\n    --color-white: #fff;\n    --spacing: 0.25rem;\n    --container-xs: 20rem;\n    --container-md: 28rem;\n    --container-xl: 36rem;\n    --container-2xl: 42rem;\n    --container-3xl: 48rem;\n    --container-4xl: 56rem;\n    --container-5xl: 64rem;\n    --container-6xl: 72rem;\n    --text-xs: 1rem;\n    --text-xs--line-height: calc(1 / 0.75);\n    --text-sm: 1rem;\n    --text-sm--line-height: calc(1.25 / 0.875);\n    --text-base: 1rem;\n    --text-base--line-height: calc(1.5 / 1);\n    --text-lg: 1.125rem;\n    --text-lg--line-height: calc(1.75 / 1.125);\n    --text-xl: 1.25rem;\n    --text-xl--line-height: calc(1.75 / 1.25);\n    --text-2xl: 1.5rem;\n    --text-2xl--line-height: calc(2 / 1.5);\n    --text-3xl: 1.875rem;\n    --text-3xl--line-height: calc(2.25 / 1.875);\n    --text-4xl: 2.25rem;\n    --text-4xl--line-height: calc(2.5 / 2.25);\n    --text-5xl: 3rem;\n    --text-5xl--line-height: 1;\n    --text-6xl: 3.75rem;\n    --text-6xl--line-height: 1;\n    --text-7xl: 4.5rem;\n    --text-7xl--line-height: 1;\n    --text-8xl: 6rem;\n    --text-8xl--line-height: 1;\n    --text-9xl: 8rem;\n    --text-9xl--line-height: 1;\n    --font-weight-medium: 500;\n    --font-weight-semibold: 600;\n    --font-weight-bold: 700;\n    --font-weight-extrabold: 800;\n    --font-weight-black: 900;\n    --tracking-tight: -0.025em;\n    --tracking-wide: 0.025em;\n    --tracking-wider: 0.05em;\n    --leading-tight: 1.25;\n    --leading-snug: 1.375;\n    --leading-normal: 1.5;\n    --leading-relaxed: 1.625;\n    --radius-lg: 0.5rem;\n    --radius-xl: 0.75rem;\n    --radius-2xl: 1rem;\n    --radius-3xl: 1.5rem;\n    --ease-in: cubic-bezier(0.4, 0, 1, 1);\n    --ease-out: cubic-bezier(0, 0, 0.2, 1);\n    --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);\n    --blur-xs: 4px;\n    --blur-sm: 8px;\n    --blur-md: 12px;\n    --default-transition-duration: 150ms;\n    --default-transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n    --default-font-family: var(--font-sans);\n    --default-mono-font-family: var(--font-mono);\n  }\n}\n@layer base{\n  #class2-vietnamese-runtime *,\n#class2-vietnamese-runtime ::after,\n#class2-vietnamese-runtime ::before,\n#class2-vietnamese-runtime ::backdrop,\n#class2-vietnamese-runtime ::file-selector-button{\n    box-sizing: border-box;\n    margin: 0;\n    padding: 0;\n    border: 0 solid;\n  }\n  #class2-vietnamese-runtime,\n#class2-vietnamese-runtime{\n    line-height: 1.5;\n    -webkit-text-size-adjust: 100%;\n    tab-size: 4;\n    font-family: var(--default-font-family, ui-sans-serif, system-ui, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji\");\n    font-feature-settings: var(--default-font-feature-settings, normal);\n    font-variation-settings: var(--default-font-variation-settings, normal);\n    -webkit-tap-highlight-color: transparent;\n  }\n  #class2-vietnamese-runtime hr{\n    height: 0;\n    color: inherit;\n    border-top-width: 1px;\n  }\n  #class2-vietnamese-runtime abbr:where([title]){\n    -webkit-text-decoration: underline dotted;\n    text-decoration: underline dotted;\n  }\n  #class2-vietnamese-runtime h1,\n#class2-vietnamese-runtime h2,\n#class2-vietnamese-runtime h3,\n#class2-vietnamese-runtime h4,\n#class2-vietnamese-runtime h5,\n#class2-vietnamese-runtime h6{\n    font-size: inherit;\n    font-weight: inherit;\n  }\n  #class2-vietnamese-runtime a{\n    color: inherit;\n    -webkit-text-decoration: inherit;\n    text-decoration: inherit;\n  }\n  #class2-vietnamese-runtime b,\n#class2-vietnamese-runtime strong{\n    font-weight: bolder;\n  }\n  #class2-vietnamese-runtime code,\n#class2-vietnamese-runtime kbd,\n#class2-vietnamese-runtime samp,\n#class2-vietnamese-runtime pre{\n    font-family: var(--default-mono-font-family, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace);\n    font-feature-settings: var(--default-mono-font-feature-settings, normal);\n    font-variation-settings: var(--default-mono-font-variation-settings, normal);\n    font-size: 1em;\n  }\n  #class2-vietnamese-runtime small{\n    font-size: 100%;\n  }\n  #class2-vietnamese-runtime sub,\n#class2-vietnamese-runtime sup{\n    font-size: 100%;\n    line-height: 0;\n    position: relative;\n    vertical-align: baseline;\n  }\n  #class2-vietnamese-runtime sub{\n    bottom: -0.25em;\n  }\n  #class2-vietnamese-runtime sup{\n    top: -0.5em;\n  }\n  #class2-vietnamese-runtime table{\n    text-indent: 0;\n    border-color: inherit;\n    border-collapse: collapse;\n  }\n  #class2-vietnamese-runtime :-moz-focusring{\n    outline: auto;\n  }\n  #class2-vietnamese-runtime progress{\n    vertical-align: baseline;\n  }\n  #class2-vietnamese-runtime summary{\n    display: list-item;\n  }\n  #class2-vietnamese-runtime ol,\n#class2-vietnamese-runtime ul,\n#class2-vietnamese-runtime menu{\n    list-style: none;\n  }\n  #class2-vietnamese-runtime img,\n#class2-vietnamese-runtime svg,\n#class2-vietnamese-runtime video,\n#class2-vietnamese-runtime canvas,\n#class2-vietnamese-runtime audio,\n#class2-vietnamese-runtime iframe,\n#class2-vietnamese-runtime embed,\n#class2-vietnamese-runtime object{\n    display: block;\n    vertical-align: middle;\n  }\n  #class2-vietnamese-runtime img,\n#class2-vietnamese-runtime video{\n    max-width: 100%;\n    height: auto;\n  }\n  #class2-vietnamese-runtime button,\n#class2-vietnamese-runtime input,\n#class2-vietnamese-runtime select,\n#class2-vietnamese-runtime optgroup,\n#class2-vietnamese-runtime textarea,\n#class2-vietnamese-runtime ::file-selector-button{\n    font: inherit;\n    font-feature-settings: inherit;\n    font-variation-settings: inherit;\n    letter-spacing: inherit;\n    color: inherit;\n    border-radius: 0;\n    background-color: transparent;\n    opacity: 1;\n  }\n  #class2-vietnamese-runtime :where(select:is([multiple], [size])) optgroup{\n    font-weight: bolder;\n  }\n  #class2-vietnamese-runtime :where(select:is([multiple], [size])) optgroup option{\n    padding-inline-start: 20px;\n  }\n  #class2-vietnamese-runtime ::file-selector-button{\n    margin-inline-end: 4px;\n  }\n  #class2-vietnamese-runtime ::placeholder{\n    opacity: 1;\n  }\n  @supports (not (-webkit-appearance: -apple-pay-button))  or (contain-intrinsic-size: 1px){\n    #class2-vietnamese-runtime ::placeholder{\n      color: currentcolor;\n      @supports (color: color-mix(in lab, red, red)) {\n        color: color-mix(in oklab, currentcolor 50%, transparent);\n      }\n    }\n  }\n  #class2-vietnamese-runtime textarea{\n    resize: vertical;\n  }\n  #class2-vietnamese-runtime ::-webkit-search-decoration{\n    -webkit-appearance: none;\n  }\n  #class2-vietnamese-runtime ::-webkit-date-and-time-value{\n    min-height: 1lh;\n    text-align: inherit;\n  }\n  #class2-vietnamese-runtime ::-webkit-datetime-edit{\n    display: inline-flex;\n  }\n  #class2-vietnamese-runtime ::-webkit-datetime-edit-fields-wrapper{\n    padding: 0;\n  }\n  #class2-vietnamese-runtime ::-webkit-datetime-edit,\n#class2-vietnamese-runtime ::-webkit-datetime-edit-year-field,\n#class2-vietnamese-runtime ::-webkit-datetime-edit-month-field,\n#class2-vietnamese-runtime ::-webkit-datetime-edit-day-field,\n#class2-vietnamese-runtime ::-webkit-datetime-edit-hour-field,\n#class2-vietnamese-runtime ::-webkit-datetime-edit-minute-field,\n#class2-vietnamese-runtime ::-webkit-datetime-edit-second-field,\n#class2-vietnamese-runtime ::-webkit-datetime-edit-millisecond-field,\n#class2-vietnamese-runtime ::-webkit-datetime-edit-meridiem-field{\n    padding-block: 0;\n  }\n  #class2-vietnamese-runtime :-moz-ui-invalid{\n    box-shadow: none;\n  }\n  #class2-vietnamese-runtime button,\n#class2-vietnamese-runtime input:where([type=\"button\"], [type=\"reset\"], [type=\"submit\"]),\n#class2-vietnamese-runtime ::file-selector-button{\n    appearance: button;\n  }\n  #class2-vietnamese-runtime ::-webkit-inner-spin-button,\n#class2-vietnamese-runtime ::-webkit-outer-spin-button{\n    height: auto;\n  }\n  #class2-vietnamese-runtime [hidden]:where(:not([hidden=\"until-found\"])){\n    display: none !important;\n  }\n}\n@layer utilities{\n  #class2-vietnamese-runtime .pointer-events-none{\n    pointer-events: none;\n  }\n  #class2-vietnamese-runtime .visible{\n    visibility: visible;\n  }\n  #class2-vietnamese-runtime .absolute{\n    position: absolute;\n  }\n  #class2-vietnamese-runtime .fixed{\n    position: fixed;\n  }\n  #class2-vietnamese-runtime .relative{\n    position: relative;\n  }\n  #class2-vietnamese-runtime .sticky{\n    position: sticky;\n  }\n  #class2-vietnamese-runtime .inset-0{\n    inset: calc(var(--spacing) * 0);\n  }\n  #class2-vietnamese-runtime .inset-x-0{\n    inset-inline: calc(var(--spacing) * 0);\n  }\n  #class2-vietnamese-runtime .-top-1{\n    top: calc(var(--spacing) * -1);\n  }\n  #class2-vietnamese-runtime .-top-2{\n    top: calc(var(--spacing) * -2);\n  }\n  #class2-vietnamese-runtime .-top-6{\n    top: calc(var(--spacing) * -6);\n  }\n  #class2-vietnamese-runtime .top-0{\n    top: calc(var(--spacing) * 0);\n  }\n  #class2-vietnamese-runtime .top-1\\/2{\n    top: calc(1/2 * 100%);\n  }\n  #class2-vietnamese-runtime .top-2{\n    top: calc(var(--spacing) * 2);\n  }\n  #class2-vietnamese-runtime .top-8{\n    top: calc(var(--spacing) * 8);\n  }\n  #class2-vietnamese-runtime .top-10{\n    top: calc(var(--spacing) * 10);\n  }\n  #class2-vietnamese-runtime .top-14{\n    top: calc(var(--spacing) * 14);\n  }\n  #class2-vietnamese-runtime .top-20{\n    top: calc(var(--spacing) * 20);\n  }\n  #class2-vietnamese-runtime .top-\\[16\\%\\]{\n    top: 16%;\n  }\n  #class2-vietnamese-runtime .top-\\[29\\%\\]{\n    top: 29%;\n  }\n  #class2-vietnamese-runtime .top-\\[30\\%\\]{\n    top: 30%;\n  }\n  #class2-vietnamese-runtime .top-\\[34\\%\\]{\n    top: 34%;\n  }\n  #class2-vietnamese-runtime .top-\\[66\\%\\]{\n    top: 66%;\n  }\n  #class2-vietnamese-runtime .top-\\[78px\\]{\n    top: 78px;\n  }\n  #class2-vietnamese-runtime .top-\\[148px\\]{\n    top: 148px;\n  }\n  #class2-vietnamese-runtime .-right-1{\n    right: calc(var(--spacing) * -1);\n  }\n  #class2-vietnamese-runtime .-right-2{\n    right: calc(var(--spacing) * -2);\n  }\n  #class2-vietnamese-runtime .-right-5{\n    right: calc(var(--spacing) * -5);\n  }\n  #class2-vietnamese-runtime .right-0{\n    right: calc(var(--spacing) * 0);\n  }\n  #class2-vietnamese-runtime .right-2{\n    right: calc(var(--spacing) * 2);\n  }\n  #class2-vietnamese-runtime .right-3{\n    right: calc(var(--spacing) * 3);\n  }\n  #class2-vietnamese-runtime .right-\\[9\\%\\]{\n    right: 9%;\n  }\n  #class2-vietnamese-runtime .right-\\[10\\%\\]{\n    right: 10%;\n  }\n  #class2-vietnamese-runtime .right-\\[19\\%\\]{\n    right: 19%;\n  }\n  #class2-vietnamese-runtime .right-\\[32\\%\\]{\n    right: 32%;\n  }\n  #class2-vietnamese-runtime .-bottom-3{\n    bottom: calc(var(--spacing) * -3);\n  }\n  #class2-vietnamese-runtime .bottom-0{\n    bottom: calc(var(--spacing) * 0);\n  }\n  #class2-vietnamese-runtime .bottom-2{\n    bottom: calc(var(--spacing) * 2);\n  }\n  #class2-vietnamese-runtime .bottom-3{\n    bottom: calc(var(--spacing) * 3);\n  }\n  #class2-vietnamese-runtime .bottom-\\[58px\\]{\n    bottom: 58px;\n  }\n  #class2-vietnamese-runtime .-left-5{\n    left: calc(var(--spacing) * -5);\n  }\n  #class2-vietnamese-runtime .-left-6{\n    left: calc(var(--spacing) * -6);\n  }\n  #class2-vietnamese-runtime .left-0{\n    left: calc(var(--spacing) * 0);\n  }\n  #class2-vietnamese-runtime .left-1\\/2{\n    left: calc(1/2 * 100%);\n  }\n  #class2-vietnamese-runtime .left-2{\n    left: calc(var(--spacing) * 2);\n  }\n  #class2-vietnamese-runtime .left-3{\n    left: calc(var(--spacing) * 3);\n  }\n  #class2-vietnamese-runtime .left-\\[7\\%\\]{\n    left: 7%;\n  }\n  #class2-vietnamese-runtime .left-\\[8\\%\\]{\n    left: 8%;\n  }\n  #class2-vietnamese-runtime .left-\\[18\\%\\]{\n    left: 18%;\n  }\n  #class2-vietnamese-runtime .z-5{\n    z-index: 5;\n  }\n  #class2-vietnamese-runtime .z-10{\n    z-index: 10;\n  }\n  #class2-vietnamese-runtime .z-30{\n    z-index: 30;\n  }\n  #class2-vietnamese-runtime .z-40{\n    z-index: 40;\n  }\n  #class2-vietnamese-runtime .z-50{\n    z-index: 50;\n  }\n  #class2-vietnamese-runtime .z-\\[120\\]{\n    z-index: 120;\n  }\n  #class2-vietnamese-runtime .z-\\[130\\]{\n    z-index: 130;\n  }\n  #class2-vietnamese-runtime .col-span-full{\n    grid-column: 1 / -1;\n  }\n  #class2-vietnamese-runtime .container{\n    width: 100%;\n    @media (width >= 40rem) {\n      max-width: 40rem;\n    }\n    @media (width >= 48rem) {\n      max-width: 48rem;\n    }\n    @media (width >= 64rem) {\n      max-width: 64rem;\n    }\n    @media (width >= 80rem) {\n      max-width: 80rem;\n    }\n    @media (width >= 96rem) {\n      max-width: 96rem;\n    }\n  }\n  #class2-vietnamese-runtime .mx-1{\n    margin-inline: calc(var(--spacing) * 1);\n  }\n  #class2-vietnamese-runtime .mx-2{\n    margin-inline: calc(var(--spacing) * 2);\n  }\n  #class2-vietnamese-runtime .mx-auto{\n    margin-inline: auto;\n  }\n  #class2-vietnamese-runtime .my-0\\.5{\n    margin-block: calc(var(--spacing) * 0.5);\n  }\n  #class2-vietnamese-runtime .my-1{\n    margin-block: calc(var(--spacing) * 1);\n  }\n  #class2-vietnamese-runtime .mt-0\\.5{\n    margin-top: calc(var(--spacing) * 0.5);\n  }\n  #class2-vietnamese-runtime .mt-1{\n    margin-top: calc(var(--spacing) * 1);\n  }\n  #class2-vietnamese-runtime .mt-1\\.5{\n    margin-top: calc(var(--spacing) * 1.5);\n  }\n  #class2-vietnamese-runtime .mt-2{\n    margin-top: calc(var(--spacing) * 2);\n  }\n  #class2-vietnamese-runtime .mt-2\\.5{\n    margin-top: calc(var(--spacing) * 2.5);\n  }\n  #class2-vietnamese-runtime .mt-3{\n    margin-top: calc(var(--spacing) * 3);\n  }\n  #class2-vietnamese-runtime .mt-4{\n    margin-top: calc(var(--spacing) * 4);\n  }\n  #class2-vietnamese-runtime .mt-5{\n    margin-top: calc(var(--spacing) * 5);\n  }\n  #class2-vietnamese-runtime .mr-0\\.5{\n    margin-right: calc(var(--spacing) * 0.5);\n  }\n  #class2-vietnamese-runtime .mr-1{\n    margin-right: calc(var(--spacing) * 1);\n  }\n  #class2-vietnamese-runtime .mr-1\\.5{\n    margin-right: calc(var(--spacing) * 1.5);\n  }\n  #class2-vietnamese-runtime .mr-2{\n    margin-right: calc(var(--spacing) * 2);\n  }\n  #class2-vietnamese-runtime .mb-0\\.5{\n    margin-bottom: calc(var(--spacing) * 0.5);\n  }\n  #class2-vietnamese-runtime .mb-1{\n    margin-bottom: calc(var(--spacing) * 1);\n  }\n  #class2-vietnamese-runtime .mb-1\\.5{\n    margin-bottom: calc(var(--spacing) * 1.5);\n  }\n  #class2-vietnamese-runtime .mb-2{\n    margin-bottom: calc(var(--spacing) * 2);\n  }\n  #class2-vietnamese-runtime .mb-2\\.5{\n    margin-bottom: calc(var(--spacing) * 2.5);\n  }\n  #class2-vietnamese-runtime .mb-3{\n    margin-bottom: calc(var(--spacing) * 3);\n  }\n  #class2-vietnamese-runtime .mb-4{\n    margin-bottom: calc(var(--spacing) * 4);\n  }\n  #class2-vietnamese-runtime .mb-5{\n    margin-bottom: calc(var(--spacing) * 5);\n  }\n  #class2-vietnamese-runtime .ml-1{\n    margin-left: calc(var(--spacing) * 1);\n  }\n  #class2-vietnamese-runtime .ml-1\\.5{\n    margin-left: calc(var(--spacing) * 1.5);\n  }\n  #class2-vietnamese-runtime .ml-auto{\n    margin-left: auto;\n  }\n  #class2-vietnamese-runtime .line-clamp-2{\n    overflow: hidden;\n    display: -webkit-box;\n    -webkit-box-orient: vertical;\n    -webkit-line-clamp: 2;\n  }\n  #class2-vietnamese-runtime .block{\n    display: block;\n  }\n  #class2-vietnamese-runtime .flex{\n    display: flex;\n  }\n  #class2-vietnamese-runtime .grid{\n    display: grid;\n  }\n  #class2-vietnamese-runtime .hidden{\n    display: none;\n  }\n  #class2-vietnamese-runtime .inline-block{\n    display: inline-block;\n  }\n  #class2-vietnamese-runtime .inline-flex{\n    display: inline-flex;\n  }\n  #class2-vietnamese-runtime .table{\n    display: table;\n  }\n  #class2-vietnamese-runtime .h-2{\n    height: calc(var(--spacing) * 2);\n  }\n  #class2-vietnamese-runtime .h-6{\n    height: calc(var(--spacing) * 6);\n  }\n  #class2-vietnamese-runtime .h-7{\n    height: calc(var(--spacing) * 7);\n  }\n  #class2-vietnamese-runtime .h-8{\n    height: calc(var(--spacing) * 8);\n  }\n  #class2-vietnamese-runtime .h-9{\n    height: calc(var(--spacing) * 9);\n  }\n  #class2-vietnamese-runtime .h-10{\n    height: calc(var(--spacing) * 10);\n  }\n  #class2-vietnamese-runtime .h-11{\n    height: calc(var(--spacing) * 11);\n  }\n  #class2-vietnamese-runtime .h-14{\n    height: calc(var(--spacing) * 14);\n  }\n  #class2-vietnamese-runtime .h-64{\n    height: calc(var(--spacing) * 64);\n  }\n  #class2-vietnamese-runtime .h-\\[19px\\]{\n    height: 19px;\n  }\n  #class2-vietnamese-runtime .h-\\[42\\%\\]{\n    height: 42%;\n  }\n  #class2-vietnamese-runtime .h-\\[44px\\]{\n    height: 44px;\n  }\n  #class2-vietnamese-runtime .h-\\[150px\\]{\n    height: 150px;\n  }\n  #class2-vietnamese-runtime .h-auto{\n    height: auto;\n  }\n  #class2-vietnamese-runtime .h-full{\n    height: 100%;\n  }\n  #class2-vietnamese-runtime .max-h-\\[56vh\\]{\n    max-height: 56vh;\n  }\n  #class2-vietnamese-runtime .max-h-\\[85vh\\]{\n    max-height: 85vh;\n  }\n  #class2-vietnamese-runtime .max-h-\\[94vh\\]{\n    max-height: 94vh;\n  }\n  #class2-vietnamese-runtime .max-h-\\[96vh\\]{\n    max-height: 96vh;\n  }\n  #class2-vietnamese-runtime .max-h-\\[520px\\]{\n    max-height: 520px;\n  }\n  #class2-vietnamese-runtime .min-h-\\[28px\\]{\n    min-height: 28px;\n  }\n  #class2-vietnamese-runtime .min-h-\\[54px\\]{\n    min-height: 54px;\n  }\n  #class2-vietnamese-runtime .min-h-\\[82px\\]{\n    min-height: 82px;\n  }\n  #class2-vietnamese-runtime .min-h-\\[92px\\]{\n    min-height: 92px;\n  }\n  #class2-vietnamese-runtime .min-h-\\[96px\\]{\n    min-height: 96px;\n  }\n  #class2-vietnamese-runtime .min-h-\\[104px\\]{\n    min-height: 104px;\n  }\n  #class2-vietnamese-runtime .min-h-\\[132px\\]{\n    min-height: 132px;\n  }\n  #class2-vietnamese-runtime .min-h-\\[150px\\]{\n    min-height: 150px;\n  }\n  #class2-vietnamese-runtime .min-h-\\[250px\\]{\n    min-height: 250px;\n  }\n  #class2-vietnamese-runtime .min-h-\\[430px\\]{\n    min-height: 430px;\n  }\n  #class2-vietnamese-runtime .min-h-\\[480px\\]{\n    min-height: 480px;\n  }\n  #class2-vietnamese-runtime .min-h-\\[500px\\]{\n    min-height: 500px;\n  }\n  #class2-vietnamese-runtime .min-h-\\[535px\\]{\n    min-height: 535px;\n  }\n  #class2-vietnamese-runtime .w-6{\n    width: calc(var(--spacing) * 6);\n  }\n  #class2-vietnamese-runtime .w-7{\n    width: calc(var(--spacing) * 7);\n  }\n  #class2-vietnamese-runtime .w-8{\n    width: calc(var(--spacing) * 8);\n  }\n  #class2-vietnamese-runtime .w-9{\n    width: calc(var(--spacing) * 9);\n  }\n  #class2-vietnamese-runtime .w-10{\n    width: calc(var(--spacing) * 10);\n  }\n  #class2-vietnamese-runtime .w-12{\n    width: calc(var(--spacing) * 12);\n  }\n  #class2-vietnamese-runtime .w-14{\n    width: calc(var(--spacing) * 14);\n  }\n  #class2-vietnamese-runtime .w-\\[92\\%\\]{\n    width: 92%;\n  }\n  #class2-vietnamese-runtime .w-\\[180px\\]{\n    width: 180px;\n  }\n  #class2-vietnamese-runtime .w-full{\n    width: 100%;\n  }\n  #class2-vietnamese-runtime .max-w-2xl{\n    max-width: var(--container-2xl);\n  }\n  #class2-vietnamese-runtime .max-w-3xl{\n    max-width: var(--container-3xl);\n  }\n  #class2-vietnamese-runtime .max-w-4xl{\n    max-width: var(--container-4xl);\n  }\n  #class2-vietnamese-runtime .max-w-5xl{\n    max-width: var(--container-5xl);\n  }\n  #class2-vietnamese-runtime .max-w-6xl{\n    max-width: var(--container-6xl);\n  }\n  #class2-vietnamese-runtime .max-w-full{\n    max-width: 100%;\n  }\n  #class2-vietnamese-runtime .max-w-md{\n    max-width: var(--container-md);\n  }\n  #class2-vietnamese-runtime .max-w-xl{\n    max-width: var(--container-xl);\n  }\n  #class2-vietnamese-runtime .max-w-xs{\n    max-width: var(--container-xs);\n  }\n  #class2-vietnamese-runtime .min-w-0{\n    min-width: calc(var(--spacing) * 0);\n  }\n  #class2-vietnamese-runtime .min-w-\\[19px\\]{\n    min-width: 19px;\n  }\n  #class2-vietnamese-runtime .min-w-\\[58px\\]{\n    min-width: 58px;\n  }\n  #class2-vietnamese-runtime .min-w-\\[82px\\]{\n    min-width: 82px;\n  }\n  #class2-vietnamese-runtime .min-w-\\[92px\\]{\n    min-width: 92px;\n  }\n  #class2-vietnamese-runtime .min-w-\\[104px\\]{\n    min-width: 104px;\n  }\n  #class2-vietnamese-runtime .min-w-\\[140px\\]{\n    min-width: 140px;\n  }\n  #class2-vietnamese-runtime .min-w-\\[150px\\]{\n    min-width: 150px;\n  }\n  #class2-vietnamese-runtime .min-w-\\[820px\\]{\n    min-width: 820px;\n  }\n  #class2-vietnamese-runtime .flex-1{\n    flex: 1;\n  }\n  #class2-vietnamese-runtime .shrink-0{\n    flex-shrink: 0;\n  }\n  #class2-vietnamese-runtime .flex-grow{\n    flex-grow: 1;\n  }\n  #class2-vietnamese-runtime .border-collapse{\n    border-collapse: collapse;\n  }\n  #class2-vietnamese-runtime .-translate-x-1\\/2{\n    --tw-translate-x: calc(calc(1/2 * 100%) * -1);\n    translate: var(--tw-translate-x) var(--tw-translate-y);\n  }\n  #class2-vietnamese-runtime .-translate-y-1\\/2{\n    --tw-translate-y: calc(calc(1/2 * 100%) * -1);\n    translate: var(--tw-translate-x) var(--tw-translate-y);\n  }\n  #class2-vietnamese-runtime .scale-105{\n    --tw-scale-x: 105%;\n    --tw-scale-y: 105%;\n    --tw-scale-z: 105%;\n    scale: var(--tw-scale-x) var(--tw-scale-y);\n  }\n  #class2-vietnamese-runtime .cursor-not-allowed{\n    cursor: not-allowed;\n  }\n  #class2-vietnamese-runtime .cursor-pointer{\n    cursor: pointer;\n  }\n  #class2-vietnamese-runtime .list-disc{\n    list-style-type: disc;\n  }\n  #class2-vietnamese-runtime .grid-cols-1{\n    grid-template-columns: repeat(1, minmax(0, 1fr));\n  }\n  #class2-vietnamese-runtime .grid-cols-2{\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n  }\n  #class2-vietnamese-runtime .grid-cols-3{\n    grid-template-columns: repeat(3, minmax(0, 1fr));\n  }\n  #class2-vietnamese-runtime .grid-cols-10{\n    grid-template-columns: repeat(10, minmax(0, 1fr));\n  }\n  #class2-vietnamese-runtime .grid-cols-\\[auto_1fr_auto\\]{\n    grid-template-columns: auto 1fr auto;\n  }\n  #class2-vietnamese-runtime .grid-cols-\\[minmax\\(0\\,1fr\\)_auto\\]{\n    grid-template-columns: minmax(0,1fr) auto;\n  }\n  #class2-vietnamese-runtime .flex-col{\n    flex-direction: column;\n  }\n  #class2-vietnamese-runtime .flex-wrap{\n    flex-wrap: wrap;\n  }\n  #class2-vietnamese-runtime .items-baseline{\n    align-items: baseline;\n  }\n  #class2-vietnamese-runtime .items-center{\n    align-items: center;\n  }\n  #class2-vietnamese-runtime .items-start{\n    align-items: flex-start;\n  }\n  #class2-vietnamese-runtime .items-stretch{\n    align-items: stretch;\n  }\n  #class2-vietnamese-runtime .justify-between{\n    justify-content: space-between;\n  }\n  #class2-vietnamese-runtime .justify-center{\n    justify-content: center;\n  }\n  #class2-vietnamese-runtime .justify-end{\n    justify-content: flex-end;\n  }\n  #class2-vietnamese-runtime .justify-start{\n    justify-content: flex-start;\n  }\n  #class2-vietnamese-runtime .gap-1{\n    gap: calc(var(--spacing) * 1);\n  }\n  #class2-vietnamese-runtime .gap-1\\.5{\n    gap: calc(var(--spacing) * 1.5);\n  }\n  #class2-vietnamese-runtime .gap-2{\n    gap: calc(var(--spacing) * 2);\n  }\n  #class2-vietnamese-runtime .gap-2\\.5{\n    gap: calc(var(--spacing) * 2.5);\n  }\n  #class2-vietnamese-runtime .gap-3{\n    gap: calc(var(--spacing) * 3);\n  }\n  #class2-vietnamese-runtime .gap-4{\n    gap: calc(var(--spacing) * 4);\n  }\n  #class2-vietnamese-runtime .space-y-0\\.5{\n    :where(& > :not(:last-child)) {\n      --tw-space-y-reverse: 0;\n      margin-block-start: calc(calc(var(--spacing) * 0.5) * var(--tw-space-y-reverse));\n      margin-block-end: calc(calc(var(--spacing) * 0.5) * calc(1 - var(--tw-space-y-reverse)));\n    }\n  }\n  #class2-vietnamese-runtime .space-y-1{\n    :where(& > :not(:last-child)) {\n      --tw-space-y-reverse: 0;\n      margin-block-start: calc(calc(var(--spacing) * 1) * var(--tw-space-y-reverse));\n      margin-block-end: calc(calc(var(--spacing) * 1) * calc(1 - var(--tw-space-y-reverse)));\n    }\n  }\n  #class2-vietnamese-runtime .space-y-1\\.5{\n    :where(& > :not(:last-child)) {\n      --tw-space-y-reverse: 0;\n      margin-block-start: calc(calc(var(--spacing) * 1.5) * var(--tw-space-y-reverse));\n      margin-block-end: calc(calc(var(--spacing) * 1.5) * calc(1 - var(--tw-space-y-reverse)));\n    }\n  }\n  #class2-vietnamese-runtime .space-y-2{\n    :where(& > :not(:last-child)) {\n      --tw-space-y-reverse: 0;\n      margin-block-start: calc(calc(var(--spacing) * 2) * var(--tw-space-y-reverse));\n      margin-block-end: calc(calc(var(--spacing) * 2) * calc(1 - var(--tw-space-y-reverse)));\n    }\n  }\n  #class2-vietnamese-runtime .space-y-2\\.5{\n    :where(& > :not(:last-child)) {\n      --tw-space-y-reverse: 0;\n      margin-block-start: calc(calc(var(--spacing) * 2.5) * var(--tw-space-y-reverse));\n      margin-block-end: calc(calc(var(--spacing) * 2.5) * calc(1 - var(--tw-space-y-reverse)));\n    }\n  }\n  #class2-vietnamese-runtime .space-y-3{\n    :where(& > :not(:last-child)) {\n      --tw-space-y-reverse: 0;\n      margin-block-start: calc(calc(var(--spacing) * 3) * var(--tw-space-y-reverse));\n      margin-block-end: calc(calc(var(--spacing) * 3) * calc(1 - var(--tw-space-y-reverse)));\n    }\n  }\n  #class2-vietnamese-runtime .space-y-4{\n    :where(& > :not(:last-child)) {\n      --tw-space-y-reverse: 0;\n      margin-block-start: calc(calc(var(--spacing) * 4) * var(--tw-space-y-reverse));\n      margin-block-end: calc(calc(var(--spacing) * 4) * calc(1 - var(--tw-space-y-reverse)));\n    }\n  }\n  #class2-vietnamese-runtime .gap-x-4{\n    column-gap: calc(var(--spacing) * 4);\n  }\n  #class2-vietnamese-runtime .space-x-1{\n    :where(& > :not(:last-child)) {\n      --tw-space-x-reverse: 0;\n      margin-inline-start: calc(calc(var(--spacing) * 1) * var(--tw-space-x-reverse));\n      margin-inline-end: calc(calc(var(--spacing) * 1) * calc(1 - var(--tw-space-x-reverse)));\n    }\n  }\n  #class2-vietnamese-runtime .space-x-1\\.5{\n    :where(& > :not(:last-child)) {\n      --tw-space-x-reverse: 0;\n      margin-inline-start: calc(calc(var(--spacing) * 1.5) * var(--tw-space-x-reverse));\n      margin-inline-end: calc(calc(var(--spacing) * 1.5) * calc(1 - var(--tw-space-x-reverse)));\n    }\n  }\n  #class2-vietnamese-runtime .space-x-2{\n    :where(& > :not(:last-child)) {\n      --tw-space-x-reverse: 0;\n      margin-inline-start: calc(calc(var(--spacing) * 2) * var(--tw-space-x-reverse));\n      margin-inline-end: calc(calc(var(--spacing) * 2) * calc(1 - var(--tw-space-x-reverse)));\n    }\n  }\n  #class2-vietnamese-runtime .space-x-2\\.5{\n    :where(& > :not(:last-child)) {\n      --tw-space-x-reverse: 0;\n      margin-inline-start: calc(calc(var(--spacing) * 2.5) * var(--tw-space-x-reverse));\n      margin-inline-end: calc(calc(var(--spacing) * 2.5) * calc(1 - var(--tw-space-x-reverse)));\n    }\n  }\n  #class2-vietnamese-runtime .space-x-3{\n    :where(& > :not(:last-child)) {\n      --tw-space-x-reverse: 0;\n      margin-inline-start: calc(calc(var(--spacing) * 3) * var(--tw-space-x-reverse));\n      margin-inline-end: calc(calc(var(--spacing) * 3) * calc(1 - var(--tw-space-x-reverse)));\n    }\n  }\n  #class2-vietnamese-runtime .gap-y-2{\n    row-gap: calc(var(--spacing) * 2);\n  }\n  #class2-vietnamese-runtime .divide-x{\n    :where(& > :not(:last-child)) {\n      --tw-divide-x-reverse: 0;\n      border-inline-style: var(--tw-border-style);\n      border-inline-start-width: calc(1px * var(--tw-divide-x-reverse));\n      border-inline-end-width: calc(1px * calc(1 - var(--tw-divide-x-reverse)));\n    }\n  }\n  #class2-vietnamese-runtime .divide-y{\n    :where(& > :not(:last-child)) {\n      --tw-divide-y-reverse: 0;\n      border-bottom-style: var(--tw-border-style);\n      border-top-style: var(--tw-border-style);\n      border-top-width: calc(1px * var(--tw-divide-y-reverse));\n      border-bottom-width: calc(1px * calc(1 - var(--tw-divide-y-reverse)));\n    }\n  }\n  #class2-vietnamese-runtime .divide-pink-100{\n    :where(& > :not(:last-child)) {\n      border-color: var(--color-pink-100);\n    }\n  }\n  #class2-vietnamese-runtime .divide-pink-200{\n    :where(& > :not(:last-child)) {\n      border-color: var(--color-pink-200);\n    }\n  }\n  #class2-vietnamese-runtime .justify-self-start{\n    justify-self: flex-start;\n  }\n  #class2-vietnamese-runtime .truncate{\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n  }\n  #class2-vietnamese-runtime .overflow-auto{\n    overflow: auto;\n  }\n  #class2-vietnamese-runtime .overflow-hidden{\n    overflow: hidden;\n  }\n  #class2-vietnamese-runtime .overflow-x-auto{\n    overflow-x: auto;\n  }\n  #class2-vietnamese-runtime .overflow-y-auto{\n    overflow-y: auto;\n  }\n  #class2-vietnamese-runtime .rounded{\n    border-radius: 0.25rem;\n  }\n  #class2-vietnamese-runtime .rounded-2xl{\n    border-radius: var(--radius-2xl);\n  }\n  #class2-vietnamese-runtime .rounded-3xl{\n    border-radius: var(--radius-3xl);\n  }\n  #class2-vietnamese-runtime .rounded-\\[20px\\]{\n    border-radius: 20px;\n  }\n  #class2-vietnamese-runtime .rounded-\\[22px\\]{\n    border-radius: 22px;\n  }\n  #class2-vietnamese-runtime .rounded-\\[26px\\]{\n    border-radius: 26px;\n  }\n  #class2-vietnamese-runtime .rounded-\\[28px\\]{\n    border-radius: 28px;\n  }\n  #class2-vietnamese-runtime .rounded-\\[30px\\]{\n    border-radius: 30px;\n  }\n  #class2-vietnamese-runtime .rounded-full{\n    border-radius: calc(infinity * 1px);\n  }\n  #class2-vietnamese-runtime .rounded-lg{\n    border-radius: var(--radius-lg);\n  }\n  #class2-vietnamese-runtime .rounded-xl{\n    border-radius: var(--radius-xl);\n  }\n  #class2-vietnamese-runtime .border{\n    border-style: var(--tw-border-style);\n    border-width: 1px;\n  }\n  #class2-vietnamese-runtime .border-2{\n    border-style: var(--tw-border-style);\n    border-width: 2px;\n  }\n  #class2-vietnamese-runtime .border-t{\n    border-top-style: var(--tw-border-style);\n    border-top-width: 1px;\n  }\n  #class2-vietnamese-runtime .border-t-4{\n    border-top-style: var(--tw-border-style);\n    border-top-width: 4px;\n  }\n  #class2-vietnamese-runtime .border-b{\n    border-bottom-style: var(--tw-border-style);\n    border-bottom-width: 1px;\n  }\n  #class2-vietnamese-runtime .border-b-2{\n    border-bottom-style: var(--tw-border-style);\n    border-bottom-width: 2px;\n  }\n  #class2-vietnamese-runtime .border-dashed{\n    --tw-border-style: dashed;\n    border-style: dashed;\n  }\n  #class2-vietnamese-runtime .border-amber-50{\n    border-color: var(--color-amber-50);\n  }\n  #class2-vietnamese-runtime .border-amber-100{\n    border-color: var(--color-amber-100);\n  }\n  #class2-vietnamese-runtime .border-amber-200{\n    border-color: var(--color-amber-200);\n  }\n  #class2-vietnamese-runtime .border-amber-200\\/60{\n    border-color: color-mix(in srgb, oklch(92.4% 0.12 95.746) 60%, transparent);\n    @supports (color: color-mix(in lab, red, red)) {\n      border-color: color-mix(in oklab, var(--color-amber-200) 60%, transparent);\n    }\n  }\n  #class2-vietnamese-runtime .border-amber-200\\/80{\n    border-color: color-mix(in srgb, oklch(92.4% 0.12 95.746) 80%, transparent);\n    @supports (color: color-mix(in lab, red, red)) {\n      border-color: color-mix(in oklab, var(--color-amber-200) 80%, transparent);\n    }\n  }\n  #class2-vietnamese-runtime .border-amber-300{\n    border-color: var(--color-amber-300);\n  }\n  #class2-vietnamese-runtime .border-amber-400{\n    border-color: var(--color-amber-400);\n  }\n  #class2-vietnamese-runtime .border-amber-500{\n    border-color: var(--color-amber-500);\n  }\n  #class2-vietnamese-runtime .border-amber-600{\n    border-color: var(--color-amber-600);\n  }\n  #class2-vietnamese-runtime .border-amber-700{\n    border-color: var(--color-amber-700);\n  }\n  #class2-vietnamese-runtime .border-amber-800{\n    border-color: var(--color-amber-800);\n  }\n  #class2-vietnamese-runtime .border-amber-900{\n    border-color: var(--color-amber-900);\n  }\n  #class2-vietnamese-runtime .border-black{\n    border-color: var(--color-black);\n  }\n  #class2-vietnamese-runtime .border-blue-50{\n    border-color: var(--color-blue-50);\n  }\n  #class2-vietnamese-runtime .border-blue-100{\n    border-color: var(--color-blue-100);\n  }\n  #class2-vietnamese-runtime .border-blue-200{\n    border-color: var(--color-blue-200);\n  }\n  #class2-vietnamese-runtime .border-blue-300{\n    border-color: var(--color-blue-300);\n  }\n  #class2-vietnamese-runtime .border-blue-400{\n    border-color: var(--color-blue-400);\n  }\n  #class2-vietnamese-runtime .border-blue-500{\n    border-color: var(--color-blue-500);\n  }\n  #class2-vietnamese-runtime .border-blue-600{\n    border-color: var(--color-blue-600);\n  }\n  #class2-vietnamese-runtime .border-blue-700{\n    border-color: var(--color-blue-700);\n  }\n  #class2-vietnamese-runtime .border-blue-800{\n    border-color: var(--color-blue-800);\n  }\n  #class2-vietnamese-runtime .border-blue-900{\n    border-color: var(--color-blue-900);\n  }\n  #class2-vietnamese-runtime .border-current\\/10{\n    border-color: currentcolor;\n    @supports (color: color-mix(in lab, red, red)) {\n      border-color: color-mix(in oklab, currentcolor 10%, transparent);\n    }\n  }\n  #class2-vietnamese-runtime .border-cyan-50{\n    border-color: var(--color-cyan-50);\n  }\n  #class2-vietnamese-runtime .border-cyan-100{\n    border-color: var(--color-cyan-100);\n  }\n  #class2-vietnamese-runtime .border-cyan-200{\n    border-color: var(--color-cyan-200);\n  }\n  #class2-vietnamese-runtime .border-cyan-300{\n    border-color: var(--color-cyan-300);\n  }\n  #class2-vietnamese-runtime .border-cyan-400{\n    border-color: var(--color-cyan-400);\n  }\n  #class2-vietnamese-runtime .border-cyan-500{\n    border-color: var(--color-cyan-500);\n  }\n  #class2-vietnamese-runtime .border-cyan-600{\n    border-color: var(--color-cyan-600);\n  }\n  #class2-vietnamese-runtime .border-cyan-700{\n    border-color: var(--color-cyan-700);\n  }\n  #class2-vietnamese-runtime .border-cyan-800{\n    border-color: var(--color-cyan-800);\n  }\n  #class2-vietnamese-runtime .border-cyan-900{\n    border-color: var(--color-cyan-900);\n  }\n  #class2-vietnamese-runtime .border-emerald-50{\n    border-color: var(--color-emerald-50);\n  }\n  #class2-vietnamese-runtime .border-emerald-100{\n    border-color: var(--color-emerald-100);\n  }\n  #class2-vietnamese-runtime .border-emerald-200{\n    border-color: var(--color-emerald-200);\n  }\n  #class2-vietnamese-runtime .border-emerald-300{\n    border-color: var(--color-emerald-300);\n  }\n  #class2-vietnamese-runtime .border-emerald-400{\n    border-color: var(--color-emerald-400);\n  }\n  #class2-vietnamese-runtime .border-emerald-500{\n    border-color: var(--color-emerald-500);\n  }\n  #class2-vietnamese-runtime .border-emerald-600{\n    border-color: var(--color-emerald-600);\n  }\n  #class2-vietnamese-runtime .border-emerald-700{\n    border-color: var(--color-emerald-700);\n  }\n  #class2-vietnamese-runtime .border-emerald-800{\n    border-color: var(--color-emerald-800);\n  }\n  #class2-vietnamese-runtime .border-emerald-900{\n    border-color: var(--color-emerald-900);\n  }\n  #class2-vietnamese-runtime .border-fuchsia-50{\n    border-color: var(--color-fuchsia-50);\n  }\n  #class2-vietnamese-runtime .border-fuchsia-100{\n    border-color: var(--color-fuchsia-100);\n  }\n  #class2-vietnamese-runtime .border-fuchsia-200{\n    border-color: var(--color-fuchsia-200);\n  }\n  #class2-vietnamese-runtime .border-fuchsia-300{\n    border-color: var(--color-fuchsia-300);\n  }\n  #class2-vietnamese-runtime .border-fuchsia-400{\n    border-color: var(--color-fuchsia-400);\n  }\n  #class2-vietnamese-runtime .border-fuchsia-500{\n    border-color: var(--color-fuchsia-500);\n  }\n  #class2-vietnamese-runtime .border-fuchsia-600{\n    border-color: var(--color-fuchsia-600);\n  }\n  #class2-vietnamese-runtime .border-fuchsia-700{\n    border-color: var(--color-fuchsia-700);\n  }\n  #class2-vietnamese-runtime .border-fuchsia-800{\n    border-color: var(--color-fuchsia-800);\n  }\n  #class2-vietnamese-runtime .border-fuchsia-900{\n    border-color: var(--color-fuchsia-900);\n  }\n  #class2-vietnamese-runtime .border-gray-50{\n    border-color: var(--color-gray-50);\n  }\n  #class2-vietnamese-runtime .border-gray-100{\n    border-color: var(--color-gray-100);\n  }\n  #class2-vietnamese-runtime .border-gray-200{\n    border-color: var(--color-gray-200);\n  }\n  #class2-vietnamese-runtime .border-gray-300{\n    border-color: var(--color-gray-300);\n  }\n  #class2-vietnamese-runtime .border-gray-400{\n    border-color: var(--color-gray-400);\n  }\n  #class2-vietnamese-runtime .border-gray-500{\n    border-color: var(--color-gray-500);\n  }\n  #class2-vietnamese-runtime .border-gray-600{\n    border-color: var(--color-gray-600);\n  }\n  #class2-vietnamese-runtime .border-gray-700{\n    border-color: var(--color-gray-700);\n  }\n  #class2-vietnamese-runtime .border-gray-800{\n    border-color: var(--color-gray-800);\n  }\n  #class2-vietnamese-runtime .border-gray-900{\n    border-color: var(--color-gray-900);\n  }\n  #class2-vietnamese-runtime .border-green-50{\n    border-color: var(--color-green-50);\n  }\n  #class2-vietnamese-runtime .border-green-100{\n    border-color: var(--color-green-100);\n  }\n  #class2-vietnamese-runtime .border-green-200{\n    border-color: var(--color-green-200);\n  }\n  #class2-vietnamese-runtime .border-green-300{\n    border-color: var(--color-green-300);\n  }\n  #class2-vietnamese-runtime .border-green-400{\n    border-color: var(--color-green-400);\n  }\n  #class2-vietnamese-runtime .border-green-500{\n    border-color: var(--color-green-500);\n  }\n  #class2-vietnamese-runtime .border-green-600{\n    border-color: var(--color-green-600);\n  }\n  #class2-vietnamese-runtime .border-green-700{\n    border-color: var(--color-green-700);\n  }\n  #class2-vietnamese-runtime .border-green-800{\n    border-color: var(--color-green-800);\n  }\n  #class2-vietnamese-runtime .border-green-900{\n    border-color: var(--color-green-900);\n  }\n  #class2-vietnamese-runtime .border-indigo-50{\n    border-color: var(--color-indigo-50);\n  }\n  #class2-vietnamese-runtime .border-indigo-100{\n    border-color: var(--color-indigo-100);\n  }\n  #class2-vietnamese-runtime .border-indigo-200{\n    border-color: var(--color-indigo-200);\n  }\n  #class2-vietnamese-runtime .border-indigo-300{\n    border-color: var(--color-indigo-300);\n  }\n  #class2-vietnamese-runtime .border-indigo-400{\n    border-color: var(--color-indigo-400);\n  }\n  #class2-vietnamese-runtime .border-indigo-500{\n    border-color: var(--color-indigo-500);\n  }\n  #class2-vietnamese-runtime .border-indigo-600{\n    border-color: var(--color-indigo-600);\n  }\n  #class2-vietnamese-runtime .border-indigo-700{\n    border-color: var(--color-indigo-700);\n  }\n  #class2-vietnamese-runtime .border-indigo-800{\n    border-color: var(--color-indigo-800);\n  }\n  #class2-vietnamese-runtime .border-indigo-900{\n    border-color: var(--color-indigo-900);\n  }\n  #class2-vietnamese-runtime .border-orange-50{\n    border-color: var(--color-orange-50);\n  }\n  #class2-vietnamese-runtime .border-orange-100{\n    border-color: var(--color-orange-100);\n  }\n  #class2-vietnamese-runtime .border-orange-200{\n    border-color: var(--color-orange-200);\n  }\n  #class2-vietnamese-runtime .border-orange-300{\n    border-color: var(--color-orange-300);\n  }\n  #class2-vietnamese-runtime .border-orange-400{\n    border-color: var(--color-orange-400);\n  }\n  #class2-vietnamese-runtime .border-orange-500{\n    border-color: var(--color-orange-500);\n  }\n  #class2-vietnamese-runtime .border-orange-600{\n    border-color: var(--color-orange-600);\n  }\n  #class2-vietnamese-runtime .border-orange-700{\n    border-color: var(--color-orange-700);\n  }\n  #class2-vietnamese-runtime .border-orange-800{\n    border-color: var(--color-orange-800);\n  }\n  #class2-vietnamese-runtime .border-orange-900{\n    border-color: var(--color-orange-900);\n  }\n  #class2-vietnamese-runtime .border-pink-50{\n    border-color: var(--color-pink-50);\n  }\n  #class2-vietnamese-runtime .border-pink-100{\n    border-color: var(--color-pink-100);\n  }\n  #class2-vietnamese-runtime .border-pink-200{\n    border-color: var(--color-pink-200);\n  }\n  #class2-vietnamese-runtime .border-pink-300{\n    border-color: var(--color-pink-300);\n  }\n  #class2-vietnamese-runtime .border-pink-400{\n    border-color: var(--color-pink-400);\n  }\n  #class2-vietnamese-runtime .border-pink-500{\n    border-color: var(--color-pink-500);\n  }\n  #class2-vietnamese-runtime .border-pink-600{\n    border-color: var(--color-pink-600);\n  }\n  #class2-vietnamese-runtime .border-pink-700{\n    border-color: var(--color-pink-700);\n  }\n  #class2-vietnamese-runtime .border-pink-800{\n    border-color: var(--color-pink-800);\n  }\n  #class2-vietnamese-runtime .border-pink-900{\n    border-color: var(--color-pink-900);\n  }\n  #class2-vietnamese-runtime .border-purple-50{\n    border-color: var(--color-purple-50);\n  }\n  #class2-vietnamese-runtime .border-purple-100{\n    border-color: var(--color-purple-100);\n  }\n  #class2-vietnamese-runtime .border-purple-200{\n    border-color: var(--color-purple-200);\n  }\n  #class2-vietnamese-runtime .border-purple-300{\n    border-color: var(--color-purple-300);\n  }\n  #class2-vietnamese-runtime .border-purple-400{\n    border-color: var(--color-purple-400);\n  }\n  #class2-vietnamese-runtime .border-purple-500{\n    border-color: var(--color-purple-500);\n  }\n  #class2-vietnamese-runtime .border-purple-600{\n    border-color: var(--color-purple-600);\n  }\n  #class2-vietnamese-runtime .border-purple-700{\n    border-color: var(--color-purple-700);\n  }\n  #class2-vietnamese-runtime .border-purple-800{\n    border-color: var(--color-purple-800);\n  }\n  #class2-vietnamese-runtime .border-purple-900{\n    border-color: var(--color-purple-900);\n  }\n  #class2-vietnamese-runtime .border-red-50{\n    border-color: var(--color-red-50);\n  }\n  #class2-vietnamese-runtime .border-red-100{\n    border-color: var(--color-red-100);\n  }\n  #class2-vietnamese-runtime .border-red-200{\n    border-color: var(--color-red-200);\n  }\n  #class2-vietnamese-runtime .border-red-300{\n    border-color: var(--color-red-300);\n  }\n  #class2-vietnamese-runtime .border-red-400{\n    border-color: var(--color-red-400);\n  }\n  #class2-vietnamese-runtime .border-red-500{\n    border-color: var(--color-red-500);\n  }\n  #class2-vietnamese-runtime .border-red-600{\n    border-color: var(--color-red-600);\n  }\n  #class2-vietnamese-runtime .border-red-700{\n    border-color: var(--color-red-700);\n  }\n  #class2-vietnamese-runtime .border-red-800{\n    border-color: var(--color-red-800);\n  }\n  #class2-vietnamese-runtime .border-red-900{\n    border-color: var(--color-red-900);\n  }\n  #class2-vietnamese-runtime .border-rose-50{\n    border-color: var(--color-rose-50);\n  }\n  #class2-vietnamese-runtime .border-rose-100{\n    border-color: var(--color-rose-100);\n  }\n  #class2-vietnamese-runtime .border-rose-200{\n    border-color: var(--color-rose-200);\n  }\n  #class2-vietnamese-runtime .border-rose-300{\n    border-color: var(--color-rose-300);\n  }\n  #class2-vietnamese-runtime .border-rose-300\\/70{\n    border-color: color-mix(in srgb, oklch(81% 0.117 11.638) 70%, transparent);\n    @supports (color: color-mix(in lab, red, red)) {\n      border-color: color-mix(in oklab, var(--color-rose-300) 70%, transparent);\n    }\n  }\n  #class2-vietnamese-runtime .border-rose-400{\n    border-color: var(--color-rose-400);\n  }\n  #class2-vietnamese-runtime .border-rose-500{\n    border-color: var(--color-rose-500);\n  }\n  #class2-vietnamese-runtime .border-rose-600{\n    border-color: var(--color-rose-600);\n  }\n  #class2-vietnamese-runtime .border-rose-700{\n    border-color: var(--color-rose-700);\n  }\n  #class2-vietnamese-runtime .border-rose-800{\n    border-color: var(--color-rose-800);\n  }\n  #class2-vietnamese-runtime .border-rose-900{\n    border-color: var(--color-rose-900);\n  }\n  #class2-vietnamese-runtime .border-sky-50{\n    border-color: var(--color-sky-50);\n  }\n  #class2-vietnamese-runtime .border-sky-100{\n    border-color: var(--color-sky-100);\n  }\n  #class2-vietnamese-runtime .border-sky-200{\n    border-color: var(--color-sky-200);\n  }\n  #class2-vietnamese-runtime .border-sky-300{\n    border-color: var(--color-sky-300);\n  }\n  #class2-vietnamese-runtime .border-sky-400{\n    border-color: var(--color-sky-400);\n  }\n  #class2-vietnamese-runtime .border-sky-500{\n    border-color: var(--color-sky-500);\n  }\n  #class2-vietnamese-runtime .border-sky-600{\n    border-color: var(--color-sky-600);\n  }\n  #class2-vietnamese-runtime .border-sky-700{\n    border-color: var(--color-sky-700);\n  }\n  #class2-vietnamese-runtime .border-sky-800{\n    border-color: var(--color-sky-800);\n  }\n  #class2-vietnamese-runtime .border-sky-900{\n    border-color: var(--color-sky-900);\n  }\n  #class2-vietnamese-runtime .border-slate-50{\n    border-color: var(--color-slate-50);\n  }\n  #class2-vietnamese-runtime .border-slate-100{\n    border-color: var(--color-slate-100);\n  }\n  #class2-vietnamese-runtime .border-slate-200{\n    border-color: var(--color-slate-200);\n  }\n  #class2-vietnamese-runtime .border-slate-300{\n    border-color: var(--color-slate-300);\n  }\n  #class2-vietnamese-runtime .border-slate-400{\n    border-color: var(--color-slate-400);\n  }\n  #class2-vietnamese-runtime .border-slate-500{\n    border-color: var(--color-slate-500);\n  }\n  #class2-vietnamese-runtime .border-slate-600{\n    border-color: var(--color-slate-600);\n  }\n  #class2-vietnamese-runtime .border-slate-700{\n    border-color: var(--color-slate-700);\n  }\n  #class2-vietnamese-runtime .border-slate-800{\n    border-color: var(--color-slate-800);\n  }\n  #class2-vietnamese-runtime .border-slate-900{\n    border-color: var(--color-slate-900);\n  }\n  #class2-vietnamese-runtime .border-teal-50{\n    border-color: var(--color-teal-50);\n  }\n  #class2-vietnamese-runtime .border-teal-100{\n    border-color: var(--color-teal-100);\n  }\n  #class2-vietnamese-runtime .border-teal-200{\n    border-color: var(--color-teal-200);\n  }\n  #class2-vietnamese-runtime .border-teal-300{\n    border-color: var(--color-teal-300);\n  }\n  #class2-vietnamese-runtime .border-teal-400{\n    border-color: var(--color-teal-400);\n  }\n  #class2-vietnamese-runtime .border-teal-500{\n    border-color: var(--color-teal-500);\n  }\n  #class2-vietnamese-runtime .border-teal-600{\n    border-color: var(--color-teal-600);\n  }\n  #class2-vietnamese-runtime .border-teal-700{\n    border-color: var(--color-teal-700);\n  }\n  #class2-vietnamese-runtime .border-teal-800{\n    border-color: var(--color-teal-800);\n  }\n  #class2-vietnamese-runtime .border-teal-900{\n    border-color: var(--color-teal-900);\n  }\n  #class2-vietnamese-runtime .border-violet-50{\n    border-color: var(--color-violet-50);\n  }\n  #class2-vietnamese-runtime .border-violet-100{\n    border-color: var(--color-violet-100);\n  }\n  #class2-vietnamese-runtime .border-violet-200{\n    border-color: var(--color-violet-200);\n  }\n  #class2-vietnamese-runtime .border-violet-300{\n    border-color: var(--color-violet-300);\n  }\n  #class2-vietnamese-runtime .border-violet-400{\n    border-color: var(--color-violet-400);\n  }\n  #class2-vietnamese-runtime .border-violet-500{\n    border-color: var(--color-violet-500);\n  }\n  #class2-vietnamese-runtime .border-violet-600{\n    border-color: var(--color-violet-600);\n  }\n  #class2-vietnamese-runtime .border-violet-700{\n    border-color: var(--color-violet-700);\n  }\n  #class2-vietnamese-runtime .border-violet-800{\n    border-color: var(--color-violet-800);\n  }\n  #class2-vietnamese-runtime .border-violet-900{\n    border-color: var(--color-violet-900);\n  }\n  #class2-vietnamese-runtime .border-white{\n    border-color: var(--color-white);\n  }\n  #class2-vietnamese-runtime .border-white\\/15{\n    border-color: color-mix(in srgb, #fff 15%, transparent);\n    @supports (color: color-mix(in lab, red, red)) {\n      border-color: color-mix(in oklab, var(--color-white) 15%, transparent);\n    }\n  }\n  #class2-vietnamese-runtime .border-white\\/20{\n    border-color: color-mix(in srgb, #fff 20%, transparent);\n    @supports (color: color-mix(in lab, red, red)) {\n      border-color: color-mix(in oklab, var(--color-white) 20%, transparent);\n    }\n  }\n  #class2-vietnamese-runtime .border-yellow-50{\n    border-color: var(--color-yellow-50);\n  }\n  #class2-vietnamese-runtime .border-yellow-100{\n    border-color: var(--color-yellow-100);\n  }\n  #class2-vietnamese-runtime .border-yellow-200{\n    border-color: var(--color-yellow-200);\n  }\n  #class2-vietnamese-runtime .border-yellow-300{\n    border-color: var(--color-yellow-300);\n  }\n  #class2-vietnamese-runtime .border-yellow-400{\n    border-color: var(--color-yellow-400);\n  }\n  #class2-vietnamese-runtime .border-yellow-500{\n    border-color: var(--color-yellow-500);\n  }\n  #class2-vietnamese-runtime .border-yellow-600{\n    border-color: var(--color-yellow-600);\n  }\n  #class2-vietnamese-runtime .border-yellow-700{\n    border-color: var(--color-yellow-700);\n  }\n  #class2-vietnamese-runtime .border-yellow-800{\n    border-color: var(--color-yellow-800);\n  }\n  #class2-vietnamese-runtime .border-yellow-900{\n    border-color: var(--color-yellow-900);\n  }\n  #class2-vietnamese-runtime .bg-amber-50{\n    background-color: var(--color-amber-50);\n  }\n  #class2-vietnamese-runtime .bg-amber-50\\/70{\n    background-color: color-mix(in srgb, oklch(98.7% 0.022 95.277) 70%, transparent);\n    @supports (color: color-mix(in lab, red, red)) {\n      background-color: color-mix(in oklab, var(--color-amber-50) 70%, transparent);\n    }\n  }\n  #class2-vietnamese-runtime .bg-amber-50\\/80{\n    background-color: color-mix(in srgb, oklch(98.7% 0.022 95.277) 80%, transparent);\n    @supports (color: color-mix(in lab, red, red)) {\n      background-color: color-mix(in oklab, var(--color-amber-50) 80%, transparent);\n    }\n  }\n  #class2-vietnamese-runtime .bg-amber-50\\/95{\n    background-color: color-mix(in srgb, oklch(98.7% 0.022 95.277) 95%, transparent);\n    @supports (color: color-mix(in lab, red, red)) {\n      background-color: color-mix(in oklab, var(--color-amber-50) 95%, transparent);\n    }\n  }\n  #class2-vietnamese-runtime .bg-amber-100{\n    background-color: var(--color-amber-100);\n  }\n  #class2-vietnamese-runtime .bg-amber-100\\/90{\n    background-color: color-mix(in srgb, oklch(96.2% 0.059 95.617) 90%, transparent);\n    @supports (color: color-mix(in lab, red, red)) {\n      background-color: color-mix(in oklab, var(--color-amber-100) 90%, transparent);\n    }\n  }\n  #class2-vietnamese-runtime .bg-amber-200{\n    background-color: var(--color-amber-200);\n  }\n  #class2-vietnamese-runtime .bg-amber-300{\n    background-color: var(--color-amber-300);\n  }\n  #class2-vietnamese-runtime .bg-amber-400{\n    background-color: var(--color-amber-400);\n  }\n  #class2-vietnamese-runtime .bg-amber-500{\n    background-color: var(--color-amber-500);\n  }\n  #class2-vietnamese-runtime .bg-amber-600{\n    background-color: var(--color-amber-600);\n  }\n  #class2-vietnamese-runtime .bg-amber-700{\n    background-color: var(--color-amber-700);\n  }\n  #class2-vietnamese-runtime .bg-amber-800{\n    background-color: var(--color-amber-800);\n  }\n  #class2-vietnamese-runtime .bg-amber-900{\n    background-color: var(--color-amber-900);\n  }\n  #class2-vietnamese-runtime .bg-black{\n    background-color: var(--color-black);\n  }\n  #class2-vietnamese-runtime .bg-black\\/30{\n    background-color: color-mix(in srgb, #000 30%, transparent);\n    @supports (color: color-mix(in lab, red, red)) {\n      background-color: color-mix(in oklab, var(--color-black) 30%, transparent);\n    }\n  }\n  #class2-vietnamese-runtime .bg-blue-50{\n    background-color: var(--color-blue-50);\n  }\n  #class2-vietnamese-runtime .bg-blue-100{\n    background-color: var(--color-blue-100);\n  }\n  #class2-vietnamese-runtime .bg-blue-200{\n    background-color: var(--color-blue-200);\n  }\n  #class2-vietnamese-runtime .bg-blue-300{\n    background-color: var(--color-blue-300);\n  }\n  #class2-vietnamese-runtime .bg-blue-400{\n    background-color: var(--color-blue-400);\n  }\n  #class2-vietnamese-runtime .bg-blue-500{\n    background-color: var(--color-blue-500);\n  }\n  #class2-vietnamese-runtime .bg-blue-600{\n    background-color: var(--color-blue-600);\n  }\n  #class2-vietnamese-runtime .bg-blue-700{\n    background-color: var(--color-blue-700);\n  }\n  #class2-vietnamese-runtime .bg-blue-800{\n    background-color: var(--color-blue-800);\n  }\n  #class2-vietnamese-runtime .bg-blue-900{\n    background-color: var(--color-blue-900);\n  }\n  #class2-vietnamese-runtime .bg-cyan-50{\n    background-color: var(--color-cyan-50);\n  }\n  #class2-vietnamese-runtime .bg-cyan-100{\n    background-color: var(--color-cyan-100);\n  }\n  #class2-vietnamese-runtime .bg-cyan-200{\n    background-color: var(--color-cyan-200);\n  }\n  #class2-vietnamese-runtime .bg-cyan-300{\n    background-color: var(--color-cyan-300);\n  }\n  #class2-vietnamese-runtime .bg-cyan-400{\n    background-color: var(--color-cyan-400);\n  }\n  #class2-vietnamese-runtime .bg-cyan-500{\n    background-color: var(--color-cyan-500);\n  }\n  #class2-vietnamese-runtime .bg-cyan-600{\n    background-color: var(--color-cyan-600);\n  }\n  #class2-vietnamese-runtime .bg-cyan-700{\n    background-color: var(--color-cyan-700);\n  }\n  #class2-vietnamese-runtime .bg-cyan-800{\n    background-color: var(--color-cyan-800);\n  }\n  #class2-vietnamese-runtime .bg-cyan-900{\n    background-color: var(--color-cyan-900);\n  }\n  #class2-vietnamese-runtime .bg-emerald-50{\n    background-color: var(--color-emerald-50);\n  }\n  #class2-vietnamese-runtime .bg-emerald-50\\/50{\n    background-color: color-mix(in srgb, oklch(97.9% 0.021 166.113) 50%, transparent);\n    @supports (color: color-mix(in lab, red, red)) {\n      background-color: color-mix(in oklab, var(--color-emerald-50) 50%, transparent);\n    }\n  }\n  #class2-vietnamese-runtime .bg-emerald-50\\/70{\n    background-color: color-mix(in srgb, oklch(97.9% 0.021 166.113) 70%, transparent);\n    @supports (color: color-mix(in lab, red, red)) {\n      background-color: color-mix(in oklab, var(--color-emerald-50) 70%, transparent);\n    }\n  }\n  #class2-vietnamese-runtime .bg-emerald-50\\/80{\n    background-color: color-mix(in srgb, oklch(97.9% 0.021 166.113) 80%, transparent);\n    @supports (color: color-mix(in lab, red, red)) {\n      background-color: color-mix(in oklab, var(--color-emerald-50) 80%, transparent);\n    }\n  }\n  #class2-vietnamese-runtime .bg-emerald-100{\n    background-color: var(--color-emerald-100);\n  }\n  #class2-vietnamese-runtime .bg-emerald-200{\n    background-color: var(--color-emerald-200);\n  }\n  #class2-vietnamese-runtime .bg-emerald-300{\n    background-color: var(--color-emerald-300);\n  }\n  #class2-vietnamese-runtime .bg-emerald-400{\n    background-color: var(--color-emerald-400);\n  }\n  #class2-vietnamese-runtime .bg-emerald-500{\n    background-color: var(--color-emerald-500);\n  }\n  #class2-vietnamese-runtime .bg-emerald-600{\n    background-color: var(--color-emerald-600);\n  }\n  #class2-vietnamese-runtime .bg-emerald-700{\n    background-color: var(--color-emerald-700);\n  }\n  #class2-vietnamese-runtime .bg-emerald-800{\n    background-color: var(--color-emerald-800);\n  }\n  #class2-vietnamese-runtime .bg-emerald-900{\n    background-color: var(--color-emerald-900);\n  }\n  #class2-vietnamese-runtime .bg-fuchsia-50{\n    background-color: var(--color-fuchsia-50);\n  }\n  #class2-vietnamese-runtime .bg-fuchsia-50\\/40{\n    background-color: color-mix(in srgb, oklch(97.7% 0.017 320.058) 40%, transparent);\n    @supports (color: color-mix(in lab, red, red)) {\n      background-color: color-mix(in oklab, var(--color-fuchsia-50) 40%, transparent);\n    }\n  }\n  #class2-vietnamese-runtime .bg-fuchsia-100{\n    background-color: var(--color-fuchsia-100);\n  }\n  #class2-vietnamese-runtime .bg-fuchsia-200{\n    background-color: var(--color-fuchsia-200);\n  }\n  #class2-vietnamese-runtime .bg-fuchsia-300{\n    background-color: var(--color-fuchsia-300);\n  }\n  #class2-vietnamese-runtime .bg-fuchsia-400{\n    background-color: var(--color-fuchsia-400);\n  }\n  #class2-vietnamese-runtime .bg-fuchsia-500{\n    background-color: var(--color-fuchsia-500);\n  }\n  #class2-vietnamese-runtime .bg-fuchsia-600{\n    background-color: var(--color-fuchsia-600);\n  }\n  #class2-vietnamese-runtime .bg-fuchsia-700{\n    background-color: var(--color-fuchsia-700);\n  }\n  #class2-vietnamese-runtime .bg-fuchsia-800{\n    background-color: var(--color-fuchsia-800);\n  }\n  #class2-vietnamese-runtime .bg-fuchsia-900{\n    background-color: var(--color-fuchsia-900);\n  }\n  #class2-vietnamese-runtime .bg-gray-50{\n    background-color: var(--color-gray-50);\n  }\n  #class2-vietnamese-runtime .bg-gray-100{\n    background-color: var(--color-gray-100);\n  }\n  #class2-vietnamese-runtime .bg-gray-200{\n    background-color: var(--color-gray-200);\n  }\n  #class2-vietnamese-runtime .bg-gray-300{\n    background-color: var(--color-gray-300);\n  }\n  #class2-vietnamese-runtime .bg-gray-400{\n    background-color: var(--color-gray-400);\n  }\n  #class2-vietnamese-runtime .bg-gray-500{\n    background-color: var(--color-gray-500);\n  }\n  #class2-vietnamese-runtime .bg-gray-600{\n    background-color: var(--color-gray-600);\n  }\n  #class2-vietnamese-runtime .bg-gray-700{\n    background-color: var(--color-gray-700);\n  }\n  #class2-vietnamese-runtime .bg-gray-800{\n    background-color: var(--color-gray-800);\n  }\n  #class2-vietnamese-runtime .bg-gray-900{\n    background-color: var(--color-gray-900);\n  }\n  #class2-vietnamese-runtime .bg-green-50{\n    background-color: var(--color-green-50);\n  }\n  #class2-vietnamese-runtime .bg-green-100{\n    background-color: var(--color-green-100);\n  }\n  #class2-vietnamese-runtime .bg-green-200{\n    background-color: var(--color-green-200);\n  }\n  #class2-vietnamese-runtime .bg-green-300{\n    background-color: var(--color-green-300);\n  }\n  #class2-vietnamese-runtime .bg-green-400{\n    background-color: var(--color-green-400);\n  }\n  #class2-vietnamese-runtime .bg-green-500{\n    background-color: var(--color-green-500);\n  }\n  #class2-vietnamese-runtime .bg-green-600{\n    background-color: var(--color-green-600);\n  }\n  #class2-vietnamese-runtime .bg-green-700{\n    background-color: var(--color-green-700);\n  }\n  #class2-vietnamese-runtime .bg-green-800{\n    background-color: var(--color-green-800);\n  }\n  #class2-vietnamese-runtime .bg-green-900{\n    background-color: var(--color-green-900);\n  }\n  #class2-vietnamese-runtime .bg-indigo-50{\n    background-color: var(--color-indigo-50);\n  }\n  #class2-vietnamese-runtime .bg-indigo-50\\/85{\n    background-color: color-mix(in srgb, oklch(96.2% 0.018 272.314) 85%, transparent);\n    @supports (color: color-mix(in lab, red, red)) {\n      background-color: color-mix(in oklab, var(--color-indigo-50) 85%, transparent);\n    }\n  }\n  #class2-vietnamese-runtime .bg-indigo-100{\n    background-color: var(--color-indigo-100);\n  }\n  #class2-vietnamese-runtime .bg-indigo-200{\n    background-color: var(--color-indigo-200);\n  }\n  #class2-vietnamese-runtime .bg-indigo-300{\n    background-color: var(--color-indigo-300);\n  }\n  #class2-vietnamese-runtime .bg-indigo-400{\n    background-color: var(--color-indigo-400);\n  }\n  #class2-vietnamese-runtime .bg-indigo-500{\n    background-color: var(--color-indigo-500);\n  }\n  #class2-vietnamese-runtime .bg-indigo-600{\n    background-color: var(--color-indigo-600);\n  }\n  #class2-vietnamese-runtime .bg-indigo-700{\n    background-color: var(--color-indigo-700);\n  }\n  #class2-vietnamese-runtime .bg-indigo-800{\n    background-color: var(--color-indigo-800);\n  }\n  #class2-vietnamese-runtime .bg-indigo-900{\n    background-color: var(--color-indigo-900);\n  }\n  #class2-vietnamese-runtime .bg-orange-50{\n    background-color: var(--color-orange-50);\n  }\n  #class2-vietnamese-runtime .bg-orange-100{\n    background-color: var(--color-orange-100);\n  }\n  #class2-vietnamese-runtime .bg-orange-200{\n    background-color: var(--color-orange-200);\n  }\n  #class2-vietnamese-runtime .bg-orange-300{\n    background-color: var(--color-orange-300);\n  }\n  #class2-vietnamese-runtime .bg-orange-400{\n    background-color: var(--color-orange-400);\n  }\n  #class2-vietnamese-runtime .bg-orange-500{\n    background-color: var(--color-orange-500);\n  }\n  #class2-vietnamese-runtime .bg-orange-600{\n    background-color: var(--color-orange-600);\n  }\n  #class2-vietnamese-runtime .bg-orange-700{\n    background-color: var(--color-orange-700);\n  }\n  #class2-vietnamese-runtime .bg-orange-800{\n    background-color: var(--color-orange-800);\n  }\n  #class2-vietnamese-runtime .bg-orange-900{\n    background-color: var(--color-orange-900);\n  }\n  #class2-vietnamese-runtime .bg-pink-50{\n    background-color: var(--color-pink-50);\n  }\n  #class2-vietnamese-runtime .bg-pink-50\\/20{\n    background-color: color-mix(in srgb, oklch(97.1% 0.014 343.198) 20%, transparent);\n    @supports (color: color-mix(in lab, red, red)) {\n      background-color: color-mix(in oklab, var(--color-pink-50) 20%, transparent);\n    }\n  }\n  #class2-vietnamese-runtime .bg-pink-50\\/30{\n    background-color: color-mix(in srgb, oklch(97.1% 0.014 343.198) 30%, transparent);\n    @supports (color: color-mix(in lab, red, red)) {\n      background-color: color-mix(in oklab, var(--color-pink-50) 30%, transparent);\n    }\n  }\n  #class2-vietnamese-runtime .bg-pink-50\\/40{\n    background-color: color-mix(in srgb, oklch(97.1% 0.014 343.198) 40%, transparent);\n    @supports (color: color-mix(in lab, red, red)) {\n      background-color: color-mix(in oklab, var(--color-pink-50) 40%, transparent);\n    }\n  }\n  #class2-vietnamese-runtime .bg-pink-50\\/60{\n    background-color: color-mix(in srgb, oklch(97.1% 0.014 343.198) 60%, transparent);\n    @supports (color: color-mix(in lab, red, red)) {\n      background-color: color-mix(in oklab, var(--color-pink-50) 60%, transparent);\n    }\n  }\n  #class2-vietnamese-runtime .bg-pink-50\\/70{\n    background-color: color-mix(in srgb, oklch(97.1% 0.014 343.198) 70%, transparent);\n    @supports (color: color-mix(in lab, red, red)) {\n      background-color: color-mix(in oklab, var(--color-pink-50) 70%, transparent);\n    }\n  }\n  #class2-vietnamese-runtime .bg-pink-50\\/80{\n    background-color: color-mix(in srgb, oklch(97.1% 0.014 343.198) 80%, transparent);\n    @supports (color: color-mix(in lab, red, red)) {\n      background-color: color-mix(in oklab, var(--color-pink-50) 80%, transparent);\n    }\n  }\n  #class2-vietnamese-runtime .bg-pink-50\\/90{\n    background-color: color-mix(in srgb, oklch(97.1% 0.014 343.198) 90%, transparent);\n    @supports (color: color-mix(in lab, red, red)) {\n      background-color: color-mix(in oklab, var(--color-pink-50) 90%, transparent);\n    }\n  }\n  #class2-vietnamese-runtime .bg-pink-50\\/95{\n    background-color: color-mix(in srgb, oklch(97.1% 0.014 343.198) 95%, transparent);\n    @supports (color: color-mix(in lab, red, red)) {\n      background-color: color-mix(in oklab, var(--color-pink-50) 95%, transparent);\n    }\n  }\n  #class2-vietnamese-runtime .bg-pink-100{\n    background-color: var(--color-pink-100);\n  }\n  #class2-vietnamese-runtime .bg-pink-100\\/70{\n    background-color: color-mix(in srgb, oklch(94.8% 0.028 342.258) 70%, transparent);\n    @supports (color: color-mix(in lab, red, red)) {\n      background-color: color-mix(in oklab, var(--color-pink-100) 70%, transparent);\n    }\n  }\n  #class2-vietnamese-runtime .bg-pink-200{\n    background-color: var(--color-pink-200);\n  }\n  #class2-vietnamese-runtime .bg-pink-300{\n    background-color: var(--color-pink-300);\n  }\n  #class2-vietnamese-runtime .bg-pink-400{\n    background-color: var(--color-pink-400);\n  }\n  #class2-vietnamese-runtime .bg-pink-500{\n    background-color: var(--color-pink-500);\n  }\n  #class2-vietnamese-runtime .bg-pink-600{\n    background-color: var(--color-pink-600);\n  }\n  #class2-vietnamese-runtime .bg-pink-700{\n    background-color: var(--color-pink-700);\n  }\n  #class2-vietnamese-runtime .bg-pink-800{\n    background-color: var(--color-pink-800);\n  }\n  #class2-vietnamese-runtime .bg-pink-900{\n    background-color: var(--color-pink-900);\n  }\n  #class2-vietnamese-runtime .bg-purple-50{\n    background-color: var(--color-purple-50);\n  }\n  #class2-vietnamese-runtime .bg-purple-50\\/60{\n    background-color: color-mix(in srgb, oklch(97.7% 0.014 308.299) 60%, transparent);\n    @supports (color: color-mix(in lab, red, red)) {\n      background-color: color-mix(in oklab, var(--color-purple-50) 60%, transparent);\n    }\n  }\n  #class2-vietnamese-runtime .bg-purple-50\\/70{\n    background-color: color-mix(in srgb, oklch(97.7% 0.014 308.299) 70%, transparent);\n    @supports (color: color-mix(in lab, red, red)) {\n      background-color: color-mix(in oklab, var(--color-purple-50) 70%, transparent);\n    }\n  }\n  #class2-vietnamese-runtime .bg-purple-50\\/80{\n    background-color: color-mix(in srgb, oklch(97.7% 0.014 308.299) 80%, transparent);\n    @supports (color: color-mix(in lab, red, red)) {\n      background-color: color-mix(in oklab, var(--color-purple-50) 80%, transparent);\n    }\n  }\n  #class2-vietnamese-runtime .bg-purple-100{\n    background-color: var(--color-purple-100);\n  }\n  #class2-vietnamese-runtime .bg-purple-200{\n    background-color: var(--color-purple-200);\n  }\n  #class2-vietnamese-runtime .bg-purple-300{\n    background-color: var(--color-purple-300);\n  }\n  #class2-vietnamese-runtime .bg-purple-400{\n    background-color: var(--color-purple-400);\n  }\n  #class2-vietnamese-runtime .bg-purple-500{\n    background-color: var(--color-purple-500);\n  }\n  #class2-vietnamese-runtime .bg-purple-600{\n    background-color: var(--color-purple-600);\n  }\n  #class2-vietnamese-runtime .bg-purple-700{\n    background-color: var(--color-purple-700);\n  }\n  #class2-vietnamese-runtime .bg-purple-800{\n    background-color: var(--color-purple-800);\n  }\n  #class2-vietnamese-runtime .bg-purple-900{\n    background-color: var(--color-purple-900);\n  }\n  #class2-vietnamese-runtime .bg-red-50{\n    background-color: var(--color-red-50);\n  }\n  #class2-vietnamese-runtime .bg-red-100{\n    background-color: var(--color-red-100);\n  }\n  #class2-vietnamese-runtime .bg-red-200{\n    background-color: var(--color-red-200);\n  }\n  #class2-vietnamese-runtime .bg-red-300{\n    background-color: var(--color-red-300);\n  }\n  #class2-vietnamese-runtime .bg-red-400{\n    background-color: var(--color-red-400);\n  }\n  #class2-vietnamese-runtime .bg-red-500{\n    background-color: var(--color-red-500);\n  }\n  #class2-vietnamese-runtime .bg-red-600{\n    background-color: var(--color-red-600);\n  }\n  #class2-vietnamese-runtime .bg-red-700{\n    background-color: var(--color-red-700);\n  }\n  #class2-vietnamese-runtime .bg-red-800{\n    background-color: var(--color-red-800);\n  }\n  #class2-vietnamese-runtime .bg-red-900{\n    background-color: var(--color-red-900);\n  }\n  #class2-vietnamese-runtime .bg-rose-50{\n    background-color: var(--color-rose-50);\n  }\n  #class2-vietnamese-runtime .bg-rose-50\\/40{\n    background-color: color-mix(in srgb, oklch(96.9% 0.015 12.422) 40%, transparent);\n    @supports (color: color-mix(in lab, red, red)) {\n      background-color: color-mix(in oklab, var(--color-rose-50) 40%, transparent);\n    }\n  }\n  #class2-vietnamese-runtime .bg-rose-50\\/50{\n    background-color: color-mix(in srgb, oklch(96.9% 0.015 12.422) 50%, transparent);\n    @supports (color: color-mix(in lab, red, red)) {\n      background-color: color-mix(in oklab, var(--color-rose-50) 50%, transparent);\n    }\n  }\n  #class2-vietnamese-runtime .bg-rose-50\\/70{\n    background-color: color-mix(in srgb, oklch(96.9% 0.015 12.422) 70%, transparent);\n    @supports (color: color-mix(in lab, red, red)) {\n      background-color: color-mix(in oklab, var(--color-rose-50) 70%, transparent);\n    }\n  }\n  #class2-vietnamese-runtime .bg-rose-50\\/80{\n    background-color: color-mix(in srgb, oklch(96.9% 0.015 12.422) 80%, transparent);\n    @supports (color: color-mix(in lab, red, red)) {\n      background-color: color-mix(in oklab, var(--color-rose-50) 80%, transparent);\n    }\n  }\n  #class2-vietnamese-runtime .bg-rose-50\\/95{\n    background-color: color-mix(in srgb, oklch(96.9% 0.015 12.422) 95%, transparent);\n    @supports (color: color-mix(in lab, red, red)) {\n      background-color: color-mix(in oklab, var(--color-rose-50) 95%, transparent);\n    }\n  }\n  #class2-vietnamese-runtime .bg-rose-100{\n    background-color: var(--color-rose-100);\n  }\n  #class2-vietnamese-runtime .bg-rose-200{\n    background-color: var(--color-rose-200);\n  }\n  #class2-vietnamese-runtime .bg-rose-300{\n    background-color: var(--color-rose-300);\n  }\n  #class2-vietnamese-runtime .bg-rose-400{\n    background-color: var(--color-rose-400);\n  }\n  #class2-vietnamese-runtime .bg-rose-500{\n    background-color: var(--color-rose-500);\n  }\n  #class2-vietnamese-runtime .bg-rose-600{\n    background-color: var(--color-rose-600);\n  }\n  #class2-vietnamese-runtime .bg-rose-700{\n    background-color: var(--color-rose-700);\n  }\n  #class2-vietnamese-runtime .bg-rose-800{\n    background-color: var(--color-rose-800);\n  }\n  #class2-vietnamese-runtime .bg-rose-900{\n    background-color: var(--color-rose-900);\n  }\n  #class2-vietnamese-runtime .bg-sky-50{\n    background-color: var(--color-sky-50);\n  }\n  #class2-vietnamese-runtime .bg-sky-50\\/80{\n    background-color: color-mix(in srgb, oklch(97.7% 0.013 236.62) 80%, transparent);\n    @supports (color: color-mix(in lab, red, red)) {\n      background-color: color-mix(in oklab, var(--color-sky-50) 80%, transparent);\n    }\n  }\n  #class2-vietnamese-runtime .bg-sky-100{\n    background-color: var(--color-sky-100);\n  }\n  #class2-vietnamese-runtime .bg-sky-200{\n    background-color: var(--color-sky-200);\n  }\n  #class2-vietnamese-runtime .bg-sky-300{\n    background-color: var(--color-sky-300);\n  }\n  #class2-vietnamese-runtime .bg-sky-400{\n    background-color: var(--color-sky-400);\n  }\n  #class2-vietnamese-runtime .bg-sky-500{\n    background-color: var(--color-sky-500);\n  }\n  #class2-vietnamese-runtime .bg-sky-600{\n    background-color: var(--color-sky-600);\n  }\n  #class2-vietnamese-runtime .bg-sky-700{\n    background-color: var(--color-sky-700);\n  }\n  #class2-vietnamese-runtime .bg-sky-800{\n    background-color: var(--color-sky-800);\n  }\n  #class2-vietnamese-runtime .bg-sky-900{\n    background-color: var(--color-sky-900);\n  }\n  #class2-vietnamese-runtime .bg-slate-50{\n    background-color: var(--color-slate-50);\n  }\n  #class2-vietnamese-runtime .bg-slate-50\\/80{\n    background-color: color-mix(in srgb, oklch(98.4% 0.003 247.858) 80%, transparent);\n    @supports (color: color-mix(in lab, red, red)) {\n      background-color: color-mix(in oklab, var(--color-slate-50) 80%, transparent);\n    }\n  }\n  #class2-vietnamese-runtime .bg-slate-100{\n    background-color: var(--color-slate-100);\n  }\n  #class2-vietnamese-runtime .bg-slate-200{\n    background-color: var(--color-slate-200);\n  }\n  #class2-vietnamese-runtime .bg-slate-200\\/70{\n    background-color: color-mix(in srgb, oklch(92.9% 0.013 255.508) 70%, transparent);\n    @supports (color: color-mix(in lab, red, red)) {\n      background-color: color-mix(in oklab, var(--color-slate-200) 70%, transparent);\n    }\n  }\n  #class2-vietnamese-runtime .bg-slate-300{\n    background-color: var(--color-slate-300);\n  }\n  #class2-vietnamese-runtime .bg-slate-400{\n    background-color: var(--color-slate-400);\n  }\n  #class2-vietnamese-runtime .bg-slate-500{\n    background-color: var(--color-slate-500);\n  }\n  #class2-vietnamese-runtime .bg-slate-600{\n    background-color: var(--color-slate-600);\n  }\n  #class2-vietnamese-runtime .bg-slate-700{\n    background-color: var(--color-slate-700);\n  }\n  #class2-vietnamese-runtime .bg-slate-800{\n    background-color: var(--color-slate-800);\n  }\n  #class2-vietnamese-runtime .bg-slate-900{\n    background-color: var(--color-slate-900);\n  }\n  #class2-vietnamese-runtime .bg-slate-900\\/55{\n    background-color: color-mix(in srgb, oklch(20.8% 0.042 265.755) 55%, transparent);\n    @supports (color: color-mix(in lab, red, red)) {\n      background-color: color-mix(in oklab, var(--color-slate-900) 55%, transparent);\n    }\n  }\n  #class2-vietnamese-runtime .bg-slate-900\\/60{\n    background-color: color-mix(in srgb, oklch(20.8% 0.042 265.755) 60%, transparent);\n    @supports (color: color-mix(in lab, red, red)) {\n      background-color: color-mix(in oklab, var(--color-slate-900) 60%, transparent);\n    }\n  }\n  #class2-vietnamese-runtime .bg-teal-50{\n    background-color: var(--color-teal-50);\n  }\n  #class2-vietnamese-runtime .bg-teal-100{\n    background-color: var(--color-teal-100);\n  }\n  #class2-vietnamese-runtime .bg-teal-200{\n    background-color: var(--color-teal-200);\n  }\n  #class2-vietnamese-runtime .bg-teal-300{\n    background-color: var(--color-teal-300);\n  }\n  #class2-vietnamese-runtime .bg-teal-400{\n    background-color: var(--color-teal-400);\n  }\n  #class2-vietnamese-runtime .bg-teal-500{\n    background-color: var(--color-teal-500);\n  }\n  #class2-vietnamese-runtime .bg-teal-600{\n    background-color: var(--color-teal-600);\n  }\n  #class2-vietnamese-runtime .bg-teal-700{\n    background-color: var(--color-teal-700);\n  }\n  #class2-vietnamese-runtime .bg-teal-800{\n    background-color: var(--color-teal-800);\n  }\n  #class2-vietnamese-runtime .bg-teal-900{\n    background-color: var(--color-teal-900);\n  }\n  #class2-vietnamese-runtime .bg-violet-50{\n    background-color: var(--color-violet-50);\n  }\n  #class2-vietnamese-runtime .bg-violet-50\\/95{\n    background-color: color-mix(in srgb, oklch(96.9% 0.016 293.756) 95%, transparent);\n    @supports (color: color-mix(in lab, red, red)) {\n      background-color: color-mix(in oklab, var(--color-violet-50) 95%, transparent);\n    }\n  }\n  #class2-vietnamese-runtime .bg-violet-100{\n    background-color: var(--color-violet-100);\n  }\n  #class2-vietnamese-runtime .bg-violet-200{\n    background-color: var(--color-violet-200);\n  }\n  #class2-vietnamese-runtime .bg-violet-300{\n    background-color: var(--color-violet-300);\n  }\n  #class2-vietnamese-runtime .bg-violet-400{\n    background-color: var(--color-violet-400);\n  }\n  #class2-vietnamese-runtime .bg-violet-500{\n    background-color: var(--color-violet-500);\n  }\n  #class2-vietnamese-runtime .bg-violet-600{\n    background-color: var(--color-violet-600);\n  }\n  #class2-vietnamese-runtime .bg-violet-700{\n    background-color: var(--color-violet-700);\n  }\n  #class2-vietnamese-runtime .bg-violet-800{\n    background-color: var(--color-violet-800);\n  }\n  #class2-vietnamese-runtime .bg-violet-900{\n    background-color: var(--color-violet-900);\n  }\n  #class2-vietnamese-runtime .bg-white{\n    background-color: var(--color-white);\n  }\n  #class2-vietnamese-runtime .bg-white\\/10{\n    background-color: color-mix(in srgb, #fff 10%, transparent);\n    @supports (color: color-mix(in lab, red, red)) {\n      background-color: color-mix(in oklab, var(--color-white) 10%, transparent);\n    }\n  }\n  #class2-vietnamese-runtime .bg-white\\/75{\n    background-color: color-mix(in srgb, #fff 75%, transparent);\n    @supports (color: color-mix(in lab, red, red)) {\n      background-color: color-mix(in oklab, var(--color-white) 75%, transparent);\n    }\n  }\n  #class2-vietnamese-runtime .bg-white\\/80{\n    background-color: color-mix(in srgb, #fff 80%, transparent);\n    @supports (color: color-mix(in lab, red, red)) {\n      background-color: color-mix(in oklab, var(--color-white) 80%, transparent);\n    }\n  }\n  #class2-vietnamese-runtime .bg-white\\/85{\n    background-color: color-mix(in srgb, #fff 85%, transparent);\n    @supports (color: color-mix(in lab, red, red)) {\n      background-color: color-mix(in oklab, var(--color-white) 85%, transparent);\n    }\n  }\n  #class2-vietnamese-runtime .bg-white\\/90{\n    background-color: color-mix(in srgb, #fff 90%, transparent);\n    @supports (color: color-mix(in lab, red, red)) {\n      background-color: color-mix(in oklab, var(--color-white) 90%, transparent);\n    }\n  }\n  #class2-vietnamese-runtime .bg-white\\/95{\n    background-color: color-mix(in srgb, #fff 95%, transparent);\n    @supports (color: color-mix(in lab, red, red)) {\n      background-color: color-mix(in oklab, var(--color-white) 95%, transparent);\n    }\n  }\n  #class2-vietnamese-runtime .bg-yellow-50{\n    background-color: var(--color-yellow-50);\n  }\n  #class2-vietnamese-runtime .bg-yellow-100{\n    background-color: var(--color-yellow-100);\n  }\n  #class2-vietnamese-runtime .bg-yellow-200{\n    background-color: var(--color-yellow-200);\n  }\n  #class2-vietnamese-runtime .bg-yellow-300{\n    background-color: var(--color-yellow-300);\n  }\n  #class2-vietnamese-runtime .bg-yellow-400{\n    background-color: var(--color-yellow-400);\n  }\n  #class2-vietnamese-runtime .bg-yellow-500{\n    background-color: var(--color-yellow-500);\n  }\n  #class2-vietnamese-runtime .bg-yellow-600{\n    background-color: var(--color-yellow-600);\n  }\n  #class2-vietnamese-runtime .bg-yellow-700{\n    background-color: var(--color-yellow-700);\n  }\n  #class2-vietnamese-runtime .bg-yellow-800{\n    background-color: var(--color-yellow-800);\n  }\n  #class2-vietnamese-runtime .bg-yellow-900{\n    background-color: var(--color-yellow-900);\n  }\n  #class2-vietnamese-runtime .bg-gradient-to-b{\n    --tw-gradient-position: to bottom in oklab;\n    background-image: linear-gradient(var(--tw-gradient-stops));\n  }\n  #class2-vietnamese-runtime .bg-gradient-to-br{\n    --tw-gradient-position: to bottom right in oklab;\n    background-image: linear-gradient(var(--tw-gradient-stops));\n  }\n  #class2-vietnamese-runtime .bg-gradient-to-r{\n    --tw-gradient-position: to right in oklab;\n    background-image: linear-gradient(var(--tw-gradient-stops));\n  }\n  #class2-vietnamese-runtime .bg-gradient-to-tr{\n    --tw-gradient-position: to top right in oklab;\n    background-image: linear-gradient(var(--tw-gradient-stops));\n  }\n  #class2-vietnamese-runtime .from-amber-50{\n    --tw-gradient-from: var(--color-amber-50);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-amber-50\\/90{\n    --tw-gradient-from: color-mix(in srgb, oklch(98.7% 0.022 95.277) 90%, transparent);\n    @supports (color: color-mix(in lab, red, red)) {\n      --tw-gradient-from: color-mix(in oklab, var(--color-amber-50) 90%, transparent);\n    }\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-amber-100{\n    --tw-gradient-from: var(--color-amber-100);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-amber-200{\n    --tw-gradient-from: var(--color-amber-200);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-amber-300{\n    --tw-gradient-from: var(--color-amber-300);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-amber-400{\n    --tw-gradient-from: var(--color-amber-400);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-amber-500{\n    --tw-gradient-from: var(--color-amber-500);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-amber-600{\n    --tw-gradient-from: var(--color-amber-600);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-amber-700{\n    --tw-gradient-from: var(--color-amber-700);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-amber-800{\n    --tw-gradient-from: var(--color-amber-800);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-amber-900{\n    --tw-gradient-from: var(--color-amber-900);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-black{\n    --tw-gradient-from: var(--color-black);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-blue-50{\n    --tw-gradient-from: var(--color-blue-50);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-blue-100{\n    --tw-gradient-from: var(--color-blue-100);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-blue-200{\n    --tw-gradient-from: var(--color-blue-200);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-blue-300{\n    --tw-gradient-from: var(--color-blue-300);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-blue-400{\n    --tw-gradient-from: var(--color-blue-400);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-blue-500{\n    --tw-gradient-from: var(--color-blue-500);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-blue-600{\n    --tw-gradient-from: var(--color-blue-600);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-blue-700{\n    --tw-gradient-from: var(--color-blue-700);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-blue-800{\n    --tw-gradient-from: var(--color-blue-800);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-blue-900{\n    --tw-gradient-from: var(--color-blue-900);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-cyan-50{\n    --tw-gradient-from: var(--color-cyan-50);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-cyan-100{\n    --tw-gradient-from: var(--color-cyan-100);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-cyan-200{\n    --tw-gradient-from: var(--color-cyan-200);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-cyan-300{\n    --tw-gradient-from: var(--color-cyan-300);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-cyan-400{\n    --tw-gradient-from: var(--color-cyan-400);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-cyan-500{\n    --tw-gradient-from: var(--color-cyan-500);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-cyan-600{\n    --tw-gradient-from: var(--color-cyan-600);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-cyan-700{\n    --tw-gradient-from: var(--color-cyan-700);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-cyan-800{\n    --tw-gradient-from: var(--color-cyan-800);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-cyan-900{\n    --tw-gradient-from: var(--color-cyan-900);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-emerald-50{\n    --tw-gradient-from: var(--color-emerald-50);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-emerald-100{\n    --tw-gradient-from: var(--color-emerald-100);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-emerald-200{\n    --tw-gradient-from: var(--color-emerald-200);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-emerald-300{\n    --tw-gradient-from: var(--color-emerald-300);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-emerald-400{\n    --tw-gradient-from: var(--color-emerald-400);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-emerald-500{\n    --tw-gradient-from: var(--color-emerald-500);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-emerald-600{\n    --tw-gradient-from: var(--color-emerald-600);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-emerald-700{\n    --tw-gradient-from: var(--color-emerald-700);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-emerald-800{\n    --tw-gradient-from: var(--color-emerald-800);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-emerald-900{\n    --tw-gradient-from: var(--color-emerald-900);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-fuchsia-50{\n    --tw-gradient-from: var(--color-fuchsia-50);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-fuchsia-100{\n    --tw-gradient-from: var(--color-fuchsia-100);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-fuchsia-200{\n    --tw-gradient-from: var(--color-fuchsia-200);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-fuchsia-300{\n    --tw-gradient-from: var(--color-fuchsia-300);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-fuchsia-400{\n    --tw-gradient-from: var(--color-fuchsia-400);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-fuchsia-500{\n    --tw-gradient-from: var(--color-fuchsia-500);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-fuchsia-600{\n    --tw-gradient-from: var(--color-fuchsia-600);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-fuchsia-700{\n    --tw-gradient-from: var(--color-fuchsia-700);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-fuchsia-800{\n    --tw-gradient-from: var(--color-fuchsia-800);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-fuchsia-900{\n    --tw-gradient-from: var(--color-fuchsia-900);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-gray-50{\n    --tw-gradient-from: var(--color-gray-50);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-gray-100{\n    --tw-gradient-from: var(--color-gray-100);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-gray-200{\n    --tw-gradient-from: var(--color-gray-200);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-gray-300{\n    --tw-gradient-from: var(--color-gray-300);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-gray-400{\n    --tw-gradient-from: var(--color-gray-400);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-gray-500{\n    --tw-gradient-from: var(--color-gray-500);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-gray-600{\n    --tw-gradient-from: var(--color-gray-600);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-gray-700{\n    --tw-gradient-from: var(--color-gray-700);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-gray-800{\n    --tw-gradient-from: var(--color-gray-800);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-gray-900{\n    --tw-gradient-from: var(--color-gray-900);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-green-50{\n    --tw-gradient-from: var(--color-green-50);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-green-100{\n    --tw-gradient-from: var(--color-green-100);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-green-200{\n    --tw-gradient-from: var(--color-green-200);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-green-300{\n    --tw-gradient-from: var(--color-green-300);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-green-400{\n    --tw-gradient-from: var(--color-green-400);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-green-500{\n    --tw-gradient-from: var(--color-green-500);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-green-600{\n    --tw-gradient-from: var(--color-green-600);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-green-700{\n    --tw-gradient-from: var(--color-green-700);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-green-800{\n    --tw-gradient-from: var(--color-green-800);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-green-900{\n    --tw-gradient-from: var(--color-green-900);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-indigo-50{\n    --tw-gradient-from: var(--color-indigo-50);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-indigo-100{\n    --tw-gradient-from: var(--color-indigo-100);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-indigo-200{\n    --tw-gradient-from: var(--color-indigo-200);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-indigo-300{\n    --tw-gradient-from: var(--color-indigo-300);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-indigo-400{\n    --tw-gradient-from: var(--color-indigo-400);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-indigo-500{\n    --tw-gradient-from: var(--color-indigo-500);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-indigo-600{\n    --tw-gradient-from: var(--color-indigo-600);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-indigo-700{\n    --tw-gradient-from: var(--color-indigo-700);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-indigo-800{\n    --tw-gradient-from: var(--color-indigo-800);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-indigo-900{\n    --tw-gradient-from: var(--color-indigo-900);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-orange-50{\n    --tw-gradient-from: var(--color-orange-50);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-orange-100{\n    --tw-gradient-from: var(--color-orange-100);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-orange-200{\n    --tw-gradient-from: var(--color-orange-200);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-orange-300{\n    --tw-gradient-from: var(--color-orange-300);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-orange-400{\n    --tw-gradient-from: var(--color-orange-400);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-orange-500{\n    --tw-gradient-from: var(--color-orange-500);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-orange-600{\n    --tw-gradient-from: var(--color-orange-600);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-orange-700{\n    --tw-gradient-from: var(--color-orange-700);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-orange-800{\n    --tw-gradient-from: var(--color-orange-800);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-orange-900{\n    --tw-gradient-from: var(--color-orange-900);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-pink-50{\n    --tw-gradient-from: var(--color-pink-50);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-pink-50\\/30{\n    --tw-gradient-from: color-mix(in srgb, oklch(97.1% 0.014 343.198) 30%, transparent);\n    @supports (color: color-mix(in lab, red, red)) {\n      --tw-gradient-from: color-mix(in oklab, var(--color-pink-50) 30%, transparent);\n    }\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-pink-50\\/70{\n    --tw-gradient-from: color-mix(in srgb, oklch(97.1% 0.014 343.198) 70%, transparent);\n    @supports (color: color-mix(in lab, red, red)) {\n      --tw-gradient-from: color-mix(in oklab, var(--color-pink-50) 70%, transparent);\n    }\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-pink-100{\n    --tw-gradient-from: var(--color-pink-100);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-pink-200{\n    --tw-gradient-from: var(--color-pink-200);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-pink-300{\n    --tw-gradient-from: var(--color-pink-300);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-pink-400{\n    --tw-gradient-from: var(--color-pink-400);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-pink-500{\n    --tw-gradient-from: var(--color-pink-500);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-pink-600{\n    --tw-gradient-from: var(--color-pink-600);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-pink-700{\n    --tw-gradient-from: var(--color-pink-700);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-pink-800{\n    --tw-gradient-from: var(--color-pink-800);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-pink-900{\n    --tw-gradient-from: var(--color-pink-900);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-purple-50{\n    --tw-gradient-from: var(--color-purple-50);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-purple-100{\n    --tw-gradient-from: var(--color-purple-100);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-purple-200{\n    --tw-gradient-from: var(--color-purple-200);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-purple-300{\n    --tw-gradient-from: var(--color-purple-300);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-purple-400{\n    --tw-gradient-from: var(--color-purple-400);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-purple-500{\n    --tw-gradient-from: var(--color-purple-500);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-purple-600{\n    --tw-gradient-from: var(--color-purple-600);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-purple-700{\n    --tw-gradient-from: var(--color-purple-700);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-purple-800{\n    --tw-gradient-from: var(--color-purple-800);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-purple-900{\n    --tw-gradient-from: var(--color-purple-900);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-red-50{\n    --tw-gradient-from: var(--color-red-50);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-red-100{\n    --tw-gradient-from: var(--color-red-100);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-red-200{\n    --tw-gradient-from: var(--color-red-200);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-red-300{\n    --tw-gradient-from: var(--color-red-300);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-red-400{\n    --tw-gradient-from: var(--color-red-400);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-red-500{\n    --tw-gradient-from: var(--color-red-500);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-red-600{\n    --tw-gradient-from: var(--color-red-600);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-red-700{\n    --tw-gradient-from: var(--color-red-700);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-red-800{\n    --tw-gradient-from: var(--color-red-800);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-red-900{\n    --tw-gradient-from: var(--color-red-900);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-rose-50{\n    --tw-gradient-from: var(--color-rose-50);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-rose-100{\n    --tw-gradient-from: var(--color-rose-100);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-rose-200{\n    --tw-gradient-from: var(--color-rose-200);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-rose-300{\n    --tw-gradient-from: var(--color-rose-300);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-rose-400{\n    --tw-gradient-from: var(--color-rose-400);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-rose-500{\n    --tw-gradient-from: var(--color-rose-500);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-rose-600{\n    --tw-gradient-from: var(--color-rose-600);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-rose-700{\n    --tw-gradient-from: var(--color-rose-700);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-rose-800{\n    --tw-gradient-from: var(--color-rose-800);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-rose-900{\n    --tw-gradient-from: var(--color-rose-900);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-sky-50{\n    --tw-gradient-from: var(--color-sky-50);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-sky-50\\/70{\n    --tw-gradient-from: color-mix(in srgb, oklch(97.7% 0.013 236.62) 70%, transparent);\n    @supports (color: color-mix(in lab, red, red)) {\n      --tw-gradient-from: color-mix(in oklab, var(--color-sky-50) 70%, transparent);\n    }\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-sky-50\\/80{\n    --tw-gradient-from: color-mix(in srgb, oklch(97.7% 0.013 236.62) 80%, transparent);\n    @supports (color: color-mix(in lab, red, red)) {\n      --tw-gradient-from: color-mix(in oklab, var(--color-sky-50) 80%, transparent);\n    }\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-sky-100{\n    --tw-gradient-from: var(--color-sky-100);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-sky-200{\n    --tw-gradient-from: var(--color-sky-200);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-sky-200\\/30{\n    --tw-gradient-from: color-mix(in srgb, oklch(90.1% 0.058 230.902) 30%, transparent);\n    @supports (color: color-mix(in lab, red, red)) {\n      --tw-gradient-from: color-mix(in oklab, var(--color-sky-200) 30%, transparent);\n    }\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-sky-300{\n    --tw-gradient-from: var(--color-sky-300);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-sky-400{\n    --tw-gradient-from: var(--color-sky-400);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-sky-500{\n    --tw-gradient-from: var(--color-sky-500);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-sky-600{\n    --tw-gradient-from: var(--color-sky-600);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-sky-700{\n    --tw-gradient-from: var(--color-sky-700);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-sky-800{\n    --tw-gradient-from: var(--color-sky-800);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-sky-900{\n    --tw-gradient-from: var(--color-sky-900);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-slate-50{\n    --tw-gradient-from: var(--color-slate-50);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-slate-100{\n    --tw-gradient-from: var(--color-slate-100);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-slate-200{\n    --tw-gradient-from: var(--color-slate-200);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-slate-300{\n    --tw-gradient-from: var(--color-slate-300);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-slate-400{\n    --tw-gradient-from: var(--color-slate-400);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-slate-500{\n    --tw-gradient-from: var(--color-slate-500);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-slate-600{\n    --tw-gradient-from: var(--color-slate-600);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-slate-700{\n    --tw-gradient-from: var(--color-slate-700);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-slate-800{\n    --tw-gradient-from: var(--color-slate-800);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-slate-900{\n    --tw-gradient-from: var(--color-slate-900);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-teal-50{\n    --tw-gradient-from: var(--color-teal-50);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-teal-100{\n    --tw-gradient-from: var(--color-teal-100);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-teal-200{\n    --tw-gradient-from: var(--color-teal-200);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-teal-300{\n    --tw-gradient-from: var(--color-teal-300);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-teal-400{\n    --tw-gradient-from: var(--color-teal-400);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-teal-500{\n    --tw-gradient-from: var(--color-teal-500);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-teal-600{\n    --tw-gradient-from: var(--color-teal-600);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-teal-700{\n    --tw-gradient-from: var(--color-teal-700);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-teal-800{\n    --tw-gradient-from: var(--color-teal-800);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-teal-900{\n    --tw-gradient-from: var(--color-teal-900);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-violet-50{\n    --tw-gradient-from: var(--color-violet-50);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-violet-100{\n    --tw-gradient-from: var(--color-violet-100);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-violet-200{\n    --tw-gradient-from: var(--color-violet-200);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-violet-300{\n    --tw-gradient-from: var(--color-violet-300);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-violet-400{\n    --tw-gradient-from: var(--color-violet-400);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-violet-500{\n    --tw-gradient-from: var(--color-violet-500);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-violet-600{\n    --tw-gradient-from: var(--color-violet-600);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-violet-700{\n    --tw-gradient-from: var(--color-violet-700);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-violet-800{\n    --tw-gradient-from: var(--color-violet-800);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-violet-900{\n    --tw-gradient-from: var(--color-violet-900);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-white{\n    --tw-gradient-from: var(--color-white);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-yellow-50{\n    --tw-gradient-from: var(--color-yellow-50);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-yellow-100{\n    --tw-gradient-from: var(--color-yellow-100);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-yellow-200{\n    --tw-gradient-from: var(--color-yellow-200);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-yellow-300{\n    --tw-gradient-from: var(--color-yellow-300);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-yellow-400{\n    --tw-gradient-from: var(--color-yellow-400);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-yellow-500{\n    --tw-gradient-from: var(--color-yellow-500);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-yellow-600{\n    --tw-gradient-from: var(--color-yellow-600);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-yellow-700{\n    --tw-gradient-from: var(--color-yellow-700);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-yellow-800{\n    --tw-gradient-from: var(--color-yellow-800);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .from-yellow-900{\n    --tw-gradient-from: var(--color-yellow-900);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .via-amber-50{\n    --tw-gradient-via: var(--color-amber-50);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-amber-100{\n    --tw-gradient-via: var(--color-amber-100);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-amber-200{\n    --tw-gradient-via: var(--color-amber-200);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-amber-300{\n    --tw-gradient-via: var(--color-amber-300);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-amber-400{\n    --tw-gradient-via: var(--color-amber-400);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-amber-500{\n    --tw-gradient-via: var(--color-amber-500);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-amber-600{\n    --tw-gradient-via: var(--color-amber-600);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-amber-700{\n    --tw-gradient-via: var(--color-amber-700);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-amber-800{\n    --tw-gradient-via: var(--color-amber-800);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-amber-900{\n    --tw-gradient-via: var(--color-amber-900);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-black{\n    --tw-gradient-via: var(--color-black);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-blue-50{\n    --tw-gradient-via: var(--color-blue-50);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-blue-100{\n    --tw-gradient-via: var(--color-blue-100);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-blue-200{\n    --tw-gradient-via: var(--color-blue-200);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-blue-300{\n    --tw-gradient-via: var(--color-blue-300);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-blue-400{\n    --tw-gradient-via: var(--color-blue-400);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-blue-500{\n    --tw-gradient-via: var(--color-blue-500);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-blue-600{\n    --tw-gradient-via: var(--color-blue-600);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-blue-700{\n    --tw-gradient-via: var(--color-blue-700);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-blue-800{\n    --tw-gradient-via: var(--color-blue-800);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-blue-900{\n    --tw-gradient-via: var(--color-blue-900);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-cyan-50{\n    --tw-gradient-via: var(--color-cyan-50);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-cyan-100{\n    --tw-gradient-via: var(--color-cyan-100);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-cyan-200{\n    --tw-gradient-via: var(--color-cyan-200);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-cyan-300{\n    --tw-gradient-via: var(--color-cyan-300);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-cyan-400{\n    --tw-gradient-via: var(--color-cyan-400);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-cyan-500{\n    --tw-gradient-via: var(--color-cyan-500);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-cyan-600{\n    --tw-gradient-via: var(--color-cyan-600);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-cyan-700{\n    --tw-gradient-via: var(--color-cyan-700);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-cyan-800{\n    --tw-gradient-via: var(--color-cyan-800);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-cyan-900{\n    --tw-gradient-via: var(--color-cyan-900);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-emerald-50{\n    --tw-gradient-via: var(--color-emerald-50);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-emerald-100{\n    --tw-gradient-via: var(--color-emerald-100);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-emerald-200{\n    --tw-gradient-via: var(--color-emerald-200);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-emerald-300{\n    --tw-gradient-via: var(--color-emerald-300);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-emerald-400{\n    --tw-gradient-via: var(--color-emerald-400);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-emerald-500{\n    --tw-gradient-via: var(--color-emerald-500);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-emerald-600{\n    --tw-gradient-via: var(--color-emerald-600);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-emerald-700{\n    --tw-gradient-via: var(--color-emerald-700);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-emerald-800{\n    --tw-gradient-via: var(--color-emerald-800);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-emerald-900{\n    --tw-gradient-via: var(--color-emerald-900);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-fuchsia-50{\n    --tw-gradient-via: var(--color-fuchsia-50);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-fuchsia-100{\n    --tw-gradient-via: var(--color-fuchsia-100);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-fuchsia-200{\n    --tw-gradient-via: var(--color-fuchsia-200);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-fuchsia-300{\n    --tw-gradient-via: var(--color-fuchsia-300);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-fuchsia-400{\n    --tw-gradient-via: var(--color-fuchsia-400);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-fuchsia-500{\n    --tw-gradient-via: var(--color-fuchsia-500);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-fuchsia-600{\n    --tw-gradient-via: var(--color-fuchsia-600);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-fuchsia-700{\n    --tw-gradient-via: var(--color-fuchsia-700);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-fuchsia-800{\n    --tw-gradient-via: var(--color-fuchsia-800);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-fuchsia-900{\n    --tw-gradient-via: var(--color-fuchsia-900);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-gray-50{\n    --tw-gradient-via: var(--color-gray-50);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-gray-100{\n    --tw-gradient-via: var(--color-gray-100);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-gray-200{\n    --tw-gradient-via: var(--color-gray-200);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-gray-300{\n    --tw-gradient-via: var(--color-gray-300);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-gray-400{\n    --tw-gradient-via: var(--color-gray-400);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-gray-500{\n    --tw-gradient-via: var(--color-gray-500);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-gray-600{\n    --tw-gradient-via: var(--color-gray-600);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-gray-700{\n    --tw-gradient-via: var(--color-gray-700);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-gray-800{\n    --tw-gradient-via: var(--color-gray-800);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-gray-900{\n    --tw-gradient-via: var(--color-gray-900);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-green-50{\n    --tw-gradient-via: var(--color-green-50);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-green-100{\n    --tw-gradient-via: var(--color-green-100);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-green-200{\n    --tw-gradient-via: var(--color-green-200);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-green-300{\n    --tw-gradient-via: var(--color-green-300);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-green-400{\n    --tw-gradient-via: var(--color-green-400);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-green-500{\n    --tw-gradient-via: var(--color-green-500);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-green-600{\n    --tw-gradient-via: var(--color-green-600);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-green-700{\n    --tw-gradient-via: var(--color-green-700);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-green-800{\n    --tw-gradient-via: var(--color-green-800);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-green-900{\n    --tw-gradient-via: var(--color-green-900);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-indigo-50{\n    --tw-gradient-via: var(--color-indigo-50);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-indigo-100{\n    --tw-gradient-via: var(--color-indigo-100);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-indigo-200{\n    --tw-gradient-via: var(--color-indigo-200);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-indigo-300{\n    --tw-gradient-via: var(--color-indigo-300);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-indigo-400{\n    --tw-gradient-via: var(--color-indigo-400);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-indigo-500{\n    --tw-gradient-via: var(--color-indigo-500);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-indigo-600{\n    --tw-gradient-via: var(--color-indigo-600);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-indigo-700{\n    --tw-gradient-via: var(--color-indigo-700);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-indigo-800{\n    --tw-gradient-via: var(--color-indigo-800);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-indigo-900{\n    --tw-gradient-via: var(--color-indigo-900);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-orange-50{\n    --tw-gradient-via: var(--color-orange-50);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-orange-50\\/60{\n    --tw-gradient-via: color-mix(in srgb, oklch(98% 0.016 73.684) 60%, transparent);\n    @supports (color: color-mix(in lab, red, red)) {\n      --tw-gradient-via: color-mix(in oklab, var(--color-orange-50) 60%, transparent);\n    }\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-orange-100{\n    --tw-gradient-via: var(--color-orange-100);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-orange-200{\n    --tw-gradient-via: var(--color-orange-200);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-orange-300{\n    --tw-gradient-via: var(--color-orange-300);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-orange-400{\n    --tw-gradient-via: var(--color-orange-400);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-orange-500{\n    --tw-gradient-via: var(--color-orange-500);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-orange-600{\n    --tw-gradient-via: var(--color-orange-600);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-orange-700{\n    --tw-gradient-via: var(--color-orange-700);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-orange-800{\n    --tw-gradient-via: var(--color-orange-800);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-orange-900{\n    --tw-gradient-via: var(--color-orange-900);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-pink-50{\n    --tw-gradient-via: var(--color-pink-50);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-pink-50\\/30{\n    --tw-gradient-via: color-mix(in srgb, oklch(97.1% 0.014 343.198) 30%, transparent);\n    @supports (color: color-mix(in lab, red, red)) {\n      --tw-gradient-via: color-mix(in oklab, var(--color-pink-50) 30%, transparent);\n    }\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-pink-50\\/35{\n    --tw-gradient-via: color-mix(in srgb, oklch(97.1% 0.014 343.198) 35%, transparent);\n    @supports (color: color-mix(in lab, red, red)) {\n      --tw-gradient-via: color-mix(in oklab, var(--color-pink-50) 35%, transparent);\n    }\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-pink-50\\/40{\n    --tw-gradient-via: color-mix(in srgb, oklch(97.1% 0.014 343.198) 40%, transparent);\n    @supports (color: color-mix(in lab, red, red)) {\n      --tw-gradient-via: color-mix(in oklab, var(--color-pink-50) 40%, transparent);\n    }\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-pink-50\\/50{\n    --tw-gradient-via: color-mix(in srgb, oklch(97.1% 0.014 343.198) 50%, transparent);\n    @supports (color: color-mix(in lab, red, red)) {\n      --tw-gradient-via: color-mix(in oklab, var(--color-pink-50) 50%, transparent);\n    }\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-pink-50\\/60{\n    --tw-gradient-via: color-mix(in srgb, oklch(97.1% 0.014 343.198) 60%, transparent);\n    @supports (color: color-mix(in lab, red, red)) {\n      --tw-gradient-via: color-mix(in oklab, var(--color-pink-50) 60%, transparent);\n    }\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-pink-100{\n    --tw-gradient-via: var(--color-pink-100);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-pink-200{\n    --tw-gradient-via: var(--color-pink-200);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-pink-300{\n    --tw-gradient-via: var(--color-pink-300);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-pink-400{\n    --tw-gradient-via: var(--color-pink-400);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-pink-500{\n    --tw-gradient-via: var(--color-pink-500);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-pink-600{\n    --tw-gradient-via: var(--color-pink-600);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-pink-700{\n    --tw-gradient-via: var(--color-pink-700);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-pink-800{\n    --tw-gradient-via: var(--color-pink-800);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-pink-900{\n    --tw-gradient-via: var(--color-pink-900);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-pink-950{\n    --tw-gradient-via: var(--color-pink-950);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-purple-50{\n    --tw-gradient-via: var(--color-purple-50);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-purple-100{\n    --tw-gradient-via: var(--color-purple-100);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-purple-200{\n    --tw-gradient-via: var(--color-purple-200);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-purple-300{\n    --tw-gradient-via: var(--color-purple-300);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-purple-400{\n    --tw-gradient-via: var(--color-purple-400);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-purple-500{\n    --tw-gradient-via: var(--color-purple-500);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-purple-600{\n    --tw-gradient-via: var(--color-purple-600);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-purple-700{\n    --tw-gradient-via: var(--color-purple-700);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-purple-800{\n    --tw-gradient-via: var(--color-purple-800);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-purple-900{\n    --tw-gradient-via: var(--color-purple-900);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-red-50{\n    --tw-gradient-via: var(--color-red-50);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-red-100{\n    --tw-gradient-via: var(--color-red-100);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-red-200{\n    --tw-gradient-via: var(--color-red-200);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-red-300{\n    --tw-gradient-via: var(--color-red-300);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-red-400{\n    --tw-gradient-via: var(--color-red-400);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-red-500{\n    --tw-gradient-via: var(--color-red-500);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-red-600{\n    --tw-gradient-via: var(--color-red-600);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-red-700{\n    --tw-gradient-via: var(--color-red-700);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-red-800{\n    --tw-gradient-via: var(--color-red-800);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-red-900{\n    --tw-gradient-via: var(--color-red-900);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-rose-50{\n    --tw-gradient-via: var(--color-rose-50);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-rose-100{\n    --tw-gradient-via: var(--color-rose-100);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-rose-200{\n    --tw-gradient-via: var(--color-rose-200);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-rose-300{\n    --tw-gradient-via: var(--color-rose-300);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-rose-400{\n    --tw-gradient-via: var(--color-rose-400);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-rose-500{\n    --tw-gradient-via: var(--color-rose-500);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-rose-600{\n    --tw-gradient-via: var(--color-rose-600);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-rose-700{\n    --tw-gradient-via: var(--color-rose-700);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-rose-800{\n    --tw-gradient-via: var(--color-rose-800);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-rose-900{\n    --tw-gradient-via: var(--color-rose-900);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-sky-50{\n    --tw-gradient-via: var(--color-sky-50);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-sky-100{\n    --tw-gradient-via: var(--color-sky-100);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-sky-200{\n    --tw-gradient-via: var(--color-sky-200);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-sky-300{\n    --tw-gradient-via: var(--color-sky-300);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-sky-400{\n    --tw-gradient-via: var(--color-sky-400);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-sky-500{\n    --tw-gradient-via: var(--color-sky-500);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-sky-600{\n    --tw-gradient-via: var(--color-sky-600);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-sky-700{\n    --tw-gradient-via: var(--color-sky-700);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-sky-800{\n    --tw-gradient-via: var(--color-sky-800);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-sky-900{\n    --tw-gradient-via: var(--color-sky-900);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-slate-50{\n    --tw-gradient-via: var(--color-slate-50);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-slate-100{\n    --tw-gradient-via: var(--color-slate-100);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-slate-200{\n    --tw-gradient-via: var(--color-slate-200);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-slate-300{\n    --tw-gradient-via: var(--color-slate-300);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-slate-400{\n    --tw-gradient-via: var(--color-slate-400);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-slate-500{\n    --tw-gradient-via: var(--color-slate-500);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-slate-600{\n    --tw-gradient-via: var(--color-slate-600);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-slate-700{\n    --tw-gradient-via: var(--color-slate-700);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-slate-800{\n    --tw-gradient-via: var(--color-slate-800);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-slate-900{\n    --tw-gradient-via: var(--color-slate-900);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-teal-50{\n    --tw-gradient-via: var(--color-teal-50);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-teal-100{\n    --tw-gradient-via: var(--color-teal-100);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-teal-200{\n    --tw-gradient-via: var(--color-teal-200);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-teal-300{\n    --tw-gradient-via: var(--color-teal-300);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-teal-400{\n    --tw-gradient-via: var(--color-teal-400);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-teal-500{\n    --tw-gradient-via: var(--color-teal-500);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-teal-600{\n    --tw-gradient-via: var(--color-teal-600);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-teal-700{\n    --tw-gradient-via: var(--color-teal-700);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-teal-800{\n    --tw-gradient-via: var(--color-teal-800);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-teal-900{\n    --tw-gradient-via: var(--color-teal-900);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-violet-50{\n    --tw-gradient-via: var(--color-violet-50);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-violet-100{\n    --tw-gradient-via: var(--color-violet-100);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-violet-200{\n    --tw-gradient-via: var(--color-violet-200);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-violet-300{\n    --tw-gradient-via: var(--color-violet-300);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-violet-400{\n    --tw-gradient-via: var(--color-violet-400);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-violet-500{\n    --tw-gradient-via: var(--color-violet-500);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-violet-600{\n    --tw-gradient-via: var(--color-violet-600);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-violet-700{\n    --tw-gradient-via: var(--color-violet-700);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-violet-800{\n    --tw-gradient-via: var(--color-violet-800);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-violet-900{\n    --tw-gradient-via: var(--color-violet-900);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-white{\n    --tw-gradient-via: var(--color-white);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-yellow-50{\n    --tw-gradient-via: var(--color-yellow-50);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-yellow-100{\n    --tw-gradient-via: var(--color-yellow-100);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-yellow-200{\n    --tw-gradient-via: var(--color-yellow-200);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-yellow-300{\n    --tw-gradient-via: var(--color-yellow-300);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-yellow-400{\n    --tw-gradient-via: var(--color-yellow-400);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-yellow-500{\n    --tw-gradient-via: var(--color-yellow-500);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-yellow-600{\n    --tw-gradient-via: var(--color-yellow-600);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-yellow-700{\n    --tw-gradient-via: var(--color-yellow-700);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-yellow-800{\n    --tw-gradient-via: var(--color-yellow-800);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .via-yellow-900{\n    --tw-gradient-via: var(--color-yellow-900);\n    --tw-gradient-via-stops: var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  #class2-vietnamese-runtime .to-amber-50{\n    --tw-gradient-to: var(--color-amber-50);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-amber-50\\/55{\n    --tw-gradient-to: color-mix(in srgb, oklch(98.7% 0.022 95.277) 55%, transparent);\n    @supports (color: color-mix(in lab, red, red)) {\n      --tw-gradient-to: color-mix(in oklab, var(--color-amber-50) 55%, transparent);\n    }\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-amber-100{\n    --tw-gradient-to: var(--color-amber-100);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-amber-200{\n    --tw-gradient-to: var(--color-amber-200);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-amber-300{\n    --tw-gradient-to: var(--color-amber-300);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-amber-400{\n    --tw-gradient-to: var(--color-amber-400);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-amber-500{\n    --tw-gradient-to: var(--color-amber-500);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-amber-600{\n    --tw-gradient-to: var(--color-amber-600);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-amber-700{\n    --tw-gradient-to: var(--color-amber-700);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-amber-800{\n    --tw-gradient-to: var(--color-amber-800);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-amber-900{\n    --tw-gradient-to: var(--color-amber-900);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-black{\n    --tw-gradient-to: var(--color-black);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-blue-50{\n    --tw-gradient-to: var(--color-blue-50);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-blue-100{\n    --tw-gradient-to: var(--color-blue-100);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-blue-200{\n    --tw-gradient-to: var(--color-blue-200);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-blue-300{\n    --tw-gradient-to: var(--color-blue-300);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-blue-400{\n    --tw-gradient-to: var(--color-blue-400);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-blue-500{\n    --tw-gradient-to: var(--color-blue-500);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-blue-600{\n    --tw-gradient-to: var(--color-blue-600);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-blue-700{\n    --tw-gradient-to: var(--color-blue-700);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-blue-800{\n    --tw-gradient-to: var(--color-blue-800);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-blue-900{\n    --tw-gradient-to: var(--color-blue-900);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-cyan-50{\n    --tw-gradient-to: var(--color-cyan-50);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-cyan-100{\n    --tw-gradient-to: var(--color-cyan-100);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-cyan-200{\n    --tw-gradient-to: var(--color-cyan-200);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-cyan-300{\n    --tw-gradient-to: var(--color-cyan-300);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-cyan-400{\n    --tw-gradient-to: var(--color-cyan-400);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-cyan-500{\n    --tw-gradient-to: var(--color-cyan-500);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-cyan-600{\n    --tw-gradient-to: var(--color-cyan-600);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-cyan-700{\n    --tw-gradient-to: var(--color-cyan-700);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-cyan-800{\n    --tw-gradient-to: var(--color-cyan-800);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-cyan-900{\n    --tw-gradient-to: var(--color-cyan-900);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-emerald-50{\n    --tw-gradient-to: var(--color-emerald-50);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-emerald-50\\/60{\n    --tw-gradient-to: color-mix(in srgb, oklch(97.9% 0.021 166.113) 60%, transparent);\n    @supports (color: color-mix(in lab, red, red)) {\n      --tw-gradient-to: color-mix(in oklab, var(--color-emerald-50) 60%, transparent);\n    }\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-emerald-100{\n    --tw-gradient-to: var(--color-emerald-100);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-emerald-200{\n    --tw-gradient-to: var(--color-emerald-200);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-emerald-300{\n    --tw-gradient-to: var(--color-emerald-300);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-emerald-400{\n    --tw-gradient-to: var(--color-emerald-400);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-emerald-500{\n    --tw-gradient-to: var(--color-emerald-500);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-emerald-600{\n    --tw-gradient-to: var(--color-emerald-600);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-emerald-700{\n    --tw-gradient-to: var(--color-emerald-700);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-emerald-800{\n    --tw-gradient-to: var(--color-emerald-800);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-emerald-900{\n    --tw-gradient-to: var(--color-emerald-900);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-fuchsia-50{\n    --tw-gradient-to: var(--color-fuchsia-50);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-fuchsia-100{\n    --tw-gradient-to: var(--color-fuchsia-100);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-fuchsia-200{\n    --tw-gradient-to: var(--color-fuchsia-200);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-fuchsia-300{\n    --tw-gradient-to: var(--color-fuchsia-300);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-fuchsia-400{\n    --tw-gradient-to: var(--color-fuchsia-400);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-fuchsia-500{\n    --tw-gradient-to: var(--color-fuchsia-500);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-fuchsia-600{\n    --tw-gradient-to: var(--color-fuchsia-600);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-fuchsia-700{\n    --tw-gradient-to: var(--color-fuchsia-700);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-fuchsia-800{\n    --tw-gradient-to: var(--color-fuchsia-800);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-fuchsia-900{\n    --tw-gradient-to: var(--color-fuchsia-900);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-gray-50{\n    --tw-gradient-to: var(--color-gray-50);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-gray-100{\n    --tw-gradient-to: var(--color-gray-100);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-gray-200{\n    --tw-gradient-to: var(--color-gray-200);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-gray-300{\n    --tw-gradient-to: var(--color-gray-300);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-gray-400{\n    --tw-gradient-to: var(--color-gray-400);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-gray-500{\n    --tw-gradient-to: var(--color-gray-500);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-gray-600{\n    --tw-gradient-to: var(--color-gray-600);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-gray-700{\n    --tw-gradient-to: var(--color-gray-700);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-gray-800{\n    --tw-gradient-to: var(--color-gray-800);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-gray-900{\n    --tw-gradient-to: var(--color-gray-900);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-green-50{\n    --tw-gradient-to: var(--color-green-50);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-green-100{\n    --tw-gradient-to: var(--color-green-100);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-green-200{\n    --tw-gradient-to: var(--color-green-200);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-green-300{\n    --tw-gradient-to: var(--color-green-300);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-green-400{\n    --tw-gradient-to: var(--color-green-400);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-green-500{\n    --tw-gradient-to: var(--color-green-500);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-green-600{\n    --tw-gradient-to: var(--color-green-600);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-green-700{\n    --tw-gradient-to: var(--color-green-700);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-green-800{\n    --tw-gradient-to: var(--color-green-800);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-green-900{\n    --tw-gradient-to: var(--color-green-900);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-indigo-50{\n    --tw-gradient-to: var(--color-indigo-50);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-indigo-100{\n    --tw-gradient-to: var(--color-indigo-100);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-indigo-200{\n    --tw-gradient-to: var(--color-indigo-200);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-indigo-300{\n    --tw-gradient-to: var(--color-indigo-300);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-indigo-400{\n    --tw-gradient-to: var(--color-indigo-400);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-indigo-500{\n    --tw-gradient-to: var(--color-indigo-500);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-indigo-600{\n    --tw-gradient-to: var(--color-indigo-600);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-indigo-700{\n    --tw-gradient-to: var(--color-indigo-700);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-indigo-800{\n    --tw-gradient-to: var(--color-indigo-800);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-indigo-900{\n    --tw-gradient-to: var(--color-indigo-900);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-orange-50{\n    --tw-gradient-to: var(--color-orange-50);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-orange-100{\n    --tw-gradient-to: var(--color-orange-100);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-orange-200{\n    --tw-gradient-to: var(--color-orange-200);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-orange-300{\n    --tw-gradient-to: var(--color-orange-300);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-orange-400{\n    --tw-gradient-to: var(--color-orange-400);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-orange-500{\n    --tw-gradient-to: var(--color-orange-500);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-orange-600{\n    --tw-gradient-to: var(--color-orange-600);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-orange-700{\n    --tw-gradient-to: var(--color-orange-700);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-orange-800{\n    --tw-gradient-to: var(--color-orange-800);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-orange-900{\n    --tw-gradient-to: var(--color-orange-900);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-pink-50{\n    --tw-gradient-to: var(--color-pink-50);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-pink-100{\n    --tw-gradient-to: var(--color-pink-100);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-pink-200{\n    --tw-gradient-to: var(--color-pink-200);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-pink-300{\n    --tw-gradient-to: var(--color-pink-300);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-pink-400{\n    --tw-gradient-to: var(--color-pink-400);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-pink-500{\n    --tw-gradient-to: var(--color-pink-500);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-pink-600{\n    --tw-gradient-to: var(--color-pink-600);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-pink-700{\n    --tw-gradient-to: var(--color-pink-700);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-pink-800{\n    --tw-gradient-to: var(--color-pink-800);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-pink-900{\n    --tw-gradient-to: var(--color-pink-900);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-purple-50{\n    --tw-gradient-to: var(--color-purple-50);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-purple-50\\/30{\n    --tw-gradient-to: color-mix(in srgb, oklch(97.7% 0.014 308.299) 30%, transparent);\n    @supports (color: color-mix(in lab, red, red)) {\n      --tw-gradient-to: color-mix(in oklab, var(--color-purple-50) 30%, transparent);\n    }\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-purple-50\\/35{\n    --tw-gradient-to: color-mix(in srgb, oklch(97.7% 0.014 308.299) 35%, transparent);\n    @supports (color: color-mix(in lab, red, red)) {\n      --tw-gradient-to: color-mix(in oklab, var(--color-purple-50) 35%, transparent);\n    }\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-purple-50\\/40{\n    --tw-gradient-to: color-mix(in srgb, oklch(97.7% 0.014 308.299) 40%, transparent);\n    @supports (color: color-mix(in lab, red, red)) {\n      --tw-gradient-to: color-mix(in oklab, var(--color-purple-50) 40%, transparent);\n    }\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-purple-50\\/50{\n    --tw-gradient-to: color-mix(in srgb, oklch(97.7% 0.014 308.299) 50%, transparent);\n    @supports (color: color-mix(in lab, red, red)) {\n      --tw-gradient-to: color-mix(in oklab, var(--color-purple-50) 50%, transparent);\n    }\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-purple-50\\/70{\n    --tw-gradient-to: color-mix(in srgb, oklch(97.7% 0.014 308.299) 70%, transparent);\n    @supports (color: color-mix(in lab, red, red)) {\n      --tw-gradient-to: color-mix(in oklab, var(--color-purple-50) 70%, transparent);\n    }\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-purple-100{\n    --tw-gradient-to: var(--color-purple-100);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-purple-200{\n    --tw-gradient-to: var(--color-purple-200);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-purple-300{\n    --tw-gradient-to: var(--color-purple-300);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-purple-400{\n    --tw-gradient-to: var(--color-purple-400);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-purple-500{\n    --tw-gradient-to: var(--color-purple-500);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-purple-600{\n    --tw-gradient-to: var(--color-purple-600);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-purple-700{\n    --tw-gradient-to: var(--color-purple-700);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-purple-800{\n    --tw-gradient-to: var(--color-purple-800);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-purple-900{\n    --tw-gradient-to: var(--color-purple-900);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-red-50{\n    --tw-gradient-to: var(--color-red-50);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-red-100{\n    --tw-gradient-to: var(--color-red-100);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-red-200{\n    --tw-gradient-to: var(--color-red-200);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-red-300{\n    --tw-gradient-to: var(--color-red-300);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-red-400{\n    --tw-gradient-to: var(--color-red-400);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-red-500{\n    --tw-gradient-to: var(--color-red-500);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-red-600{\n    --tw-gradient-to: var(--color-red-600);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-red-700{\n    --tw-gradient-to: var(--color-red-700);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-red-800{\n    --tw-gradient-to: var(--color-red-800);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-red-900{\n    --tw-gradient-to: var(--color-red-900);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-rose-50{\n    --tw-gradient-to: var(--color-rose-50);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-rose-50\\/50{\n    --tw-gradient-to: color-mix(in srgb, oklch(96.9% 0.015 12.422) 50%, transparent);\n    @supports (color: color-mix(in lab, red, red)) {\n      --tw-gradient-to: color-mix(in oklab, var(--color-rose-50) 50%, transparent);\n    }\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-rose-100{\n    --tw-gradient-to: var(--color-rose-100);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-rose-200{\n    --tw-gradient-to: var(--color-rose-200);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-rose-300{\n    --tw-gradient-to: var(--color-rose-300);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-rose-400{\n    --tw-gradient-to: var(--color-rose-400);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-rose-500{\n    --tw-gradient-to: var(--color-rose-500);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-rose-600{\n    --tw-gradient-to: var(--color-rose-600);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-rose-700{\n    --tw-gradient-to: var(--color-rose-700);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-rose-800{\n    --tw-gradient-to: var(--color-rose-800);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-rose-900{\n    --tw-gradient-to: var(--color-rose-900);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-sky-50{\n    --tw-gradient-to: var(--color-sky-50);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-sky-100{\n    --tw-gradient-to: var(--color-sky-100);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-sky-200{\n    --tw-gradient-to: var(--color-sky-200);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-sky-300{\n    --tw-gradient-to: var(--color-sky-300);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-sky-400{\n    --tw-gradient-to: var(--color-sky-400);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-sky-500{\n    --tw-gradient-to: var(--color-sky-500);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-sky-600{\n    --tw-gradient-to: var(--color-sky-600);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-sky-700{\n    --tw-gradient-to: var(--color-sky-700);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-sky-800{\n    --tw-gradient-to: var(--color-sky-800);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-sky-900{\n    --tw-gradient-to: var(--color-sky-900);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-slate-50{\n    --tw-gradient-to: var(--color-slate-50);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-slate-100{\n    --tw-gradient-to: var(--color-slate-100);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-slate-200{\n    --tw-gradient-to: var(--color-slate-200);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-slate-300{\n    --tw-gradient-to: var(--color-slate-300);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-slate-400{\n    --tw-gradient-to: var(--color-slate-400);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-slate-500{\n    --tw-gradient-to: var(--color-slate-500);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-slate-600{\n    --tw-gradient-to: var(--color-slate-600);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-slate-700{\n    --tw-gradient-to: var(--color-slate-700);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-slate-800{\n    --tw-gradient-to: var(--color-slate-800);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-slate-900{\n    --tw-gradient-to: var(--color-slate-900);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-teal-50{\n    --tw-gradient-to: var(--color-teal-50);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-teal-100{\n    --tw-gradient-to: var(--color-teal-100);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-teal-200{\n    --tw-gradient-to: var(--color-teal-200);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-teal-300{\n    --tw-gradient-to: var(--color-teal-300);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-teal-400{\n    --tw-gradient-to: var(--color-teal-400);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-teal-500{\n    --tw-gradient-to: var(--color-teal-500);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-teal-600{\n    --tw-gradient-to: var(--color-teal-600);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-teal-700{\n    --tw-gradient-to: var(--color-teal-700);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-teal-800{\n    --tw-gradient-to: var(--color-teal-800);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-teal-900{\n    --tw-gradient-to: var(--color-teal-900);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-transparent{\n    --tw-gradient-to: transparent;\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-violet-50{\n    --tw-gradient-to: var(--color-violet-50);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-violet-100{\n    --tw-gradient-to: var(--color-violet-100);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-violet-200{\n    --tw-gradient-to: var(--color-violet-200);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-violet-300{\n    --tw-gradient-to: var(--color-violet-300);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-violet-400{\n    --tw-gradient-to: var(--color-violet-400);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-violet-500{\n    --tw-gradient-to: var(--color-violet-500);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-violet-600{\n    --tw-gradient-to: var(--color-violet-600);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-violet-700{\n    --tw-gradient-to: var(--color-violet-700);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-violet-800{\n    --tw-gradient-to: var(--color-violet-800);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-violet-900{\n    --tw-gradient-to: var(--color-violet-900);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-white{\n    --tw-gradient-to: var(--color-white);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-yellow-50{\n    --tw-gradient-to: var(--color-yellow-50);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-yellow-100{\n    --tw-gradient-to: var(--color-yellow-100);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-yellow-200{\n    --tw-gradient-to: var(--color-yellow-200);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-yellow-300{\n    --tw-gradient-to: var(--color-yellow-300);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-yellow-400{\n    --tw-gradient-to: var(--color-yellow-400);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-yellow-500{\n    --tw-gradient-to: var(--color-yellow-500);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-yellow-600{\n    --tw-gradient-to: var(--color-yellow-600);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-yellow-700{\n    --tw-gradient-to: var(--color-yellow-700);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-yellow-800{\n    --tw-gradient-to: var(--color-yellow-800);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .to-yellow-900{\n    --tw-gradient-to: var(--color-yellow-900);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  #class2-vietnamese-runtime .object-contain{\n    object-fit: contain;\n  }\n  #class2-vietnamese-runtime .object-cover{\n    object-fit: cover;\n  }\n  #class2-vietnamese-runtime .p-0{\n    padding: calc(var(--spacing) * 0);\n  }\n  #class2-vietnamese-runtime .p-0\\.5{\n    padding: calc(var(--spacing) * 0.5);\n  }\n  #class2-vietnamese-runtime .p-1{\n    padding: calc(var(--spacing) * 1);\n  }\n  #class2-vietnamese-runtime .p-2{\n    padding: calc(var(--spacing) * 2);\n  }\n  #class2-vietnamese-runtime .p-2\\.5{\n    padding: calc(var(--spacing) * 2.5);\n  }\n  #class2-vietnamese-runtime .p-3{\n    padding: calc(var(--spacing) * 3);\n  }\n  #class2-vietnamese-runtime .p-3\\.5{\n    padding: calc(var(--spacing) * 3.5);\n  }\n  #class2-vietnamese-runtime .p-4{\n    padding: calc(var(--spacing) * 4);\n  }\n  #class2-vietnamese-runtime .p-5{\n    padding: calc(var(--spacing) * 5);\n  }\n  #class2-vietnamese-runtime .p-6{\n    padding: calc(var(--spacing) * 6);\n  }\n  #class2-vietnamese-runtime .px-1{\n    padding-inline: calc(var(--spacing) * 1);\n  }\n  #class2-vietnamese-runtime .px-1\\.5{\n    padding-inline: calc(var(--spacing) * 1.5);\n  }\n  #class2-vietnamese-runtime .px-2{\n    padding-inline: calc(var(--spacing) * 2);\n  }\n  #class2-vietnamese-runtime .px-2\\.5{\n    padding-inline: calc(var(--spacing) * 2.5);\n  }\n  #class2-vietnamese-runtime .px-3{\n    padding-inline: calc(var(--spacing) * 3);\n  }\n  #class2-vietnamese-runtime .px-3\\.5{\n    padding-inline: calc(var(--spacing) * 3.5);\n  }\n  #class2-vietnamese-runtime .px-4{\n    padding-inline: calc(var(--spacing) * 4);\n  }\n  #class2-vietnamese-runtime .px-5{\n    padding-inline: calc(var(--spacing) * 5);\n  }\n  #class2-vietnamese-runtime .px-6{\n    padding-inline: calc(var(--spacing) * 6);\n  }\n  #class2-vietnamese-runtime .px-7{\n    padding-inline: calc(var(--spacing) * 7);\n  }\n  #class2-vietnamese-runtime .px-8{\n    padding-inline: calc(var(--spacing) * 8);\n  }\n  #class2-vietnamese-runtime .py-0{\n    padding-block: calc(var(--spacing) * 0);\n  }\n  #class2-vietnamese-runtime .py-0\\.5{\n    padding-block: calc(var(--spacing) * 0.5);\n  }\n  #class2-vietnamese-runtime .py-1{\n    padding-block: calc(var(--spacing) * 1);\n  }\n  #class2-vietnamese-runtime .py-1\\.5{\n    padding-block: calc(var(--spacing) * 1.5);\n  }\n  #class2-vietnamese-runtime .py-2{\n    padding-block: calc(var(--spacing) * 2);\n  }\n  #class2-vietnamese-runtime .py-2\\.5{\n    padding-block: calc(var(--spacing) * 2.5);\n  }\n  #class2-vietnamese-runtime .py-3{\n    padding-block: calc(var(--spacing) * 3);\n  }\n  #class2-vietnamese-runtime .py-4{\n    padding-block: calc(var(--spacing) * 4);\n  }\n  #class2-vietnamese-runtime .py-5{\n    padding-block: calc(var(--spacing) * 5);\n  }\n  #class2-vietnamese-runtime .py-7{\n    padding-block: calc(var(--spacing) * 7);\n  }\n  #class2-vietnamese-runtime .py-8{\n    padding-block: calc(var(--spacing) * 8);\n  }\n  #class2-vietnamese-runtime .py-10{\n    padding-block: calc(var(--spacing) * 10);\n  }\n  #class2-vietnamese-runtime .py-12{\n    padding-block: calc(var(--spacing) * 12);\n  }\n  #class2-vietnamese-runtime .pt-0\\.5{\n    padding-top: calc(var(--spacing) * 0.5);\n  }\n  #class2-vietnamese-runtime .pt-1{\n    padding-top: calc(var(--spacing) * 1);\n  }\n  #class2-vietnamese-runtime .pt-1\\.5{\n    padding-top: calc(var(--spacing) * 1.5);\n  }\n  #class2-vietnamese-runtime .pt-2{\n    padding-top: calc(var(--spacing) * 2);\n  }\n  #class2-vietnamese-runtime .pt-3{\n    padding-top: calc(var(--spacing) * 3);\n  }\n  #class2-vietnamese-runtime .pr-1{\n    padding-right: calc(var(--spacing) * 1);\n  }\n  #class2-vietnamese-runtime .pr-3{\n    padding-right: calc(var(--spacing) * 3);\n  }\n  #class2-vietnamese-runtime .pb-1\\.5{\n    padding-bottom: calc(var(--spacing) * 1.5);\n  }\n  #class2-vietnamese-runtime .pb-2{\n    padding-bottom: calc(var(--spacing) * 2);\n  }\n  #class2-vietnamese-runtime .pl-5{\n    padding-left: calc(var(--spacing) * 5);\n  }\n  #class2-vietnamese-runtime .pl-9{\n    padding-left: calc(var(--spacing) * 9);\n  }\n  #class2-vietnamese-runtime .text-center{\n    text-align: center;\n  }\n  #class2-vietnamese-runtime .text-left{\n    text-align: left;\n  }\n  #class2-vietnamese-runtime .text-right{\n    text-align: right;\n  }\n  #class2-vietnamese-runtime .font-serif{\n    font-family: var(--font-serif);\n  }\n  #class2-vietnamese-runtime .text-2xl{\n    font-size: var(--text-2xl);\n    line-height: var(--tw-leading, var(--text-2xl--line-height));\n  }\n  #class2-vietnamese-runtime .text-3xl{\n    font-size: var(--text-3xl);\n    line-height: var(--tw-leading, var(--text-3xl--line-height));\n  }\n  #class2-vietnamese-runtime .text-4xl{\n    font-size: var(--text-4xl);\n    line-height: var(--tw-leading, var(--text-4xl--line-height));\n  }\n  #class2-vietnamese-runtime .text-5xl{\n    font-size: var(--text-5xl);\n    line-height: var(--tw-leading, var(--text-5xl--line-height));\n  }\n  #class2-vietnamese-runtime .text-6xl{\n    font-size: var(--text-6xl);\n    line-height: var(--tw-leading, var(--text-6xl--line-height));\n  }\n  #class2-vietnamese-runtime .text-7xl{\n    font-size: var(--text-7xl);\n    line-height: var(--tw-leading, var(--text-7xl--line-height));\n  }\n  #class2-vietnamese-runtime .text-8xl{\n    font-size: var(--text-8xl);\n    line-height: var(--tw-leading, var(--text-8xl--line-height));\n  }\n  #class2-vietnamese-runtime .text-9xl{\n    font-size: var(--text-9xl);\n    line-height: var(--tw-leading, var(--text-9xl--line-height));\n  }\n  #class2-vietnamese-runtime .text-base{\n    font-size: var(--text-base);\n    line-height: var(--tw-leading, var(--text-base--line-height));\n  }\n  #class2-vietnamese-runtime .text-lg{\n    font-size: var(--text-lg);\n    line-height: var(--tw-leading, var(--text-lg--line-height));\n  }\n  #class2-vietnamese-runtime .text-sm{\n    font-size: var(--text-sm);\n    line-height: var(--tw-leading, var(--text-sm--line-height));\n  }\n  #class2-vietnamese-runtime .text-xl{\n    font-size: var(--text-xl);\n    line-height: var(--tw-leading, var(--text-xl--line-height));\n  }\n  #class2-vietnamese-runtime .text-xs{\n    font-size: var(--text-xs);\n    line-height: var(--tw-leading, var(--text-xs--line-height));\n  }\n  #class2-vietnamese-runtime .text-\\[1\\.9rem\\]{\n    font-size: 1.9rem;\n  }\n  #class2-vietnamese-runtime .text-\\[1\\.65rem\\]{\n    font-size: 1.65rem;\n  }\n  #class2-vietnamese-runtime .text-\\[1\\.69rem\\]{\n    font-size: 1.69rem;\n  }\n  #class2-vietnamese-runtime .text-\\[1\\.125rem\\]{\n    font-size: 1.125rem;\n  }\n  #class2-vietnamese-runtime .text-\\[2\\.3rem\\]{\n    font-size: 2.3rem;\n  }\n  #class2-vietnamese-runtime .text-\\[2\\.05rem\\]{\n    font-size: 2.05rem;\n  }\n  #class2-vietnamese-runtime .text-\\[2\\.7rem\\]{\n    font-size: 2.7rem;\n  }\n  #class2-vietnamese-runtime .text-\\[2\\.8rem\\]{\n    font-size: 2.8rem;\n  }\n  #class2-vietnamese-runtime .text-\\[2\\.15rem\\]{\n    font-size: 2.15rem;\n  }\n  #class2-vietnamese-runtime .text-\\[2rem\\]{\n    font-size: 2rem;\n  }\n  #class2-vietnamese-runtime .text-\\[9px\\]{\n    font-size: 16px;\n  }\n  #class2-vietnamese-runtime .text-\\[10px\\]{\n    font-size: 16px;\n  }\n  #class2-vietnamese-runtime .text-\\[11px\\]{\n    font-size: 16px;\n  }\n  #class2-vietnamese-runtime .text-\\[12px\\]{\n    font-size: 16px;\n  }\n  #class2-vietnamese-runtime .text-\\[13px\\]{\n    font-size: 16px;\n  }\n  #class2-vietnamese-runtime .text-\\[15px\\]{\n    font-size: 16px;\n  }\n  #class2-vietnamese-runtime .text-\\[16px\\]{\n    font-size: 16px;\n  }\n  #class2-vietnamese-runtime .text-\\[17px\\]{\n    font-size: 17px;\n  }\n  #class2-vietnamese-runtime .text-\\[21px\\]{\n    font-size: 21px;\n  }\n  #class2-vietnamese-runtime .leading-5{\n    --tw-leading: calc(var(--spacing) * 5);\n    line-height: calc(var(--spacing) * 5);\n  }\n  #class2-vietnamese-runtime .leading-6{\n    --tw-leading: calc(var(--spacing) * 6);\n    line-height: calc(var(--spacing) * 6);\n  }\n  #class2-vietnamese-runtime .leading-7{\n    --tw-leading: calc(var(--spacing) * 7);\n    line-height: calc(var(--spacing) * 7);\n  }\n  #class2-vietnamese-runtime .leading-8{\n    --tw-leading: calc(var(--spacing) * 8);\n    line-height: calc(var(--spacing) * 8);\n  }\n  #class2-vietnamese-runtime .leading-\\[1\\.6\\]{\n    --tw-leading: 1.6;\n    line-height: 1.6;\n  }\n  #class2-vietnamese-runtime .leading-\\[1\\.35\\]{\n    --tw-leading: 1.35;\n    line-height: 1.35;\n  }\n  #class2-vietnamese-runtime .leading-\\[19px\\]{\n    --tw-leading: 19px;\n    line-height: 19px;\n  }\n  #class2-vietnamese-runtime .leading-none{\n    --tw-leading: 1;\n    line-height: 1;\n  }\n  #class2-vietnamese-runtime .leading-normal{\n    --tw-leading: var(--leading-normal);\n    line-height: var(--leading-normal);\n  }\n  #class2-vietnamese-runtime .leading-relaxed{\n    --tw-leading: var(--leading-relaxed);\n    line-height: var(--leading-relaxed);\n  }\n  #class2-vietnamese-runtime .leading-snug{\n    --tw-leading: var(--leading-snug);\n    line-height: var(--leading-snug);\n  }\n  #class2-vietnamese-runtime .leading-tight{\n    --tw-leading: var(--leading-tight);\n    line-height: var(--leading-tight);\n  }\n  #class2-vietnamese-runtime .font-black{\n    --tw-font-weight: var(--font-weight-black);\n    font-weight: var(--font-weight-black);\n  }\n  #class2-vietnamese-runtime .font-bold{\n    --tw-font-weight: var(--font-weight-bold);\n    font-weight: var(--font-weight-bold);\n  }\n  #class2-vietnamese-runtime .font-extrabold{\n    --tw-font-weight: var(--font-weight-extrabold);\n    font-weight: var(--font-weight-extrabold);\n  }\n  #class2-vietnamese-runtime .font-medium{\n    --tw-font-weight: var(--font-weight-medium);\n    font-weight: var(--font-weight-medium);\n  }\n  #class2-vietnamese-runtime .font-semibold{\n    --tw-font-weight: var(--font-weight-semibold);\n    font-weight: var(--font-weight-semibold);\n  }\n  #class2-vietnamese-runtime .tracking-tight{\n    --tw-tracking: var(--tracking-tight);\n    letter-spacing: var(--tracking-tight);\n  }\n  #class2-vietnamese-runtime .tracking-wide{\n    --tw-tracking: var(--tracking-wide);\n    letter-spacing: var(--tracking-wide);\n  }\n  #class2-vietnamese-runtime .tracking-wider{\n    --tw-tracking: var(--tracking-wider);\n    letter-spacing: var(--tracking-wider);\n  }\n  #class2-vietnamese-runtime .whitespace-nowrap{\n    white-space: nowrap;\n  }\n  #class2-vietnamese-runtime .whitespace-pre-line{\n    white-space: pre-line;\n  }\n  #class2-vietnamese-runtime .text-amber-50{\n    color: var(--color-amber-50);\n  }\n  #class2-vietnamese-runtime .text-amber-100{\n    color: var(--color-amber-100);\n  }\n  #class2-vietnamese-runtime .text-amber-200{\n    color: var(--color-amber-200);\n  }\n  #class2-vietnamese-runtime .text-amber-300{\n    color: var(--color-amber-300);\n  }\n  #class2-vietnamese-runtime .text-amber-400{\n    color: var(--color-amber-400);\n  }\n  #class2-vietnamese-runtime .text-amber-500{\n    color: var(--color-amber-500);\n  }\n  #class2-vietnamese-runtime .text-amber-600{\n    color: var(--color-amber-600);\n  }\n  #class2-vietnamese-runtime .text-amber-700{\n    color: var(--color-amber-700);\n  }\n  #class2-vietnamese-runtime .text-amber-800{\n    color: var(--color-amber-800);\n  }\n  #class2-vietnamese-runtime .text-amber-900{\n    color: var(--color-amber-900);\n  }\n  #class2-vietnamese-runtime .text-amber-950{\n    color: var(--color-amber-950);\n  }\n  #class2-vietnamese-runtime .text-black{\n    color: var(--color-black);\n  }\n  #class2-vietnamese-runtime .text-blue-50{\n    color: var(--color-blue-50);\n  }\n  #class2-vietnamese-runtime .text-blue-100{\n    color: var(--color-blue-100);\n  }\n  #class2-vietnamese-runtime .text-blue-200{\n    color: var(--color-blue-200);\n  }\n  #class2-vietnamese-runtime .text-blue-300{\n    color: var(--color-blue-300);\n  }\n  #class2-vietnamese-runtime .text-blue-400{\n    color: var(--color-blue-400);\n  }\n  #class2-vietnamese-runtime .text-blue-500{\n    color: var(--color-blue-500);\n  }\n  #class2-vietnamese-runtime .text-blue-600{\n    color: var(--color-blue-600);\n  }\n  #class2-vietnamese-runtime .text-blue-700{\n    color: var(--color-blue-700);\n  }\n  #class2-vietnamese-runtime .text-blue-800{\n    color: var(--color-blue-800);\n  }\n  #class2-vietnamese-runtime .text-blue-900{\n    color: var(--color-blue-900);\n  }\n  #class2-vietnamese-runtime .text-cyan-50{\n    color: var(--color-cyan-50);\n  }\n  #class2-vietnamese-runtime .text-cyan-100{\n    color: var(--color-cyan-100);\n  }\n  #class2-vietnamese-runtime .text-cyan-200{\n    color: var(--color-cyan-200);\n  }\n  #class2-vietnamese-runtime .text-cyan-300{\n    color: var(--color-cyan-300);\n  }\n  #class2-vietnamese-runtime .text-cyan-400{\n    color: var(--color-cyan-400);\n  }\n  #class2-vietnamese-runtime .text-cyan-500{\n    color: var(--color-cyan-500);\n  }\n  #class2-vietnamese-runtime .text-cyan-600{\n    color: var(--color-cyan-600);\n  }\n  #class2-vietnamese-runtime .text-cyan-700{\n    color: var(--color-cyan-700);\n  }\n  #class2-vietnamese-runtime .text-cyan-800{\n    color: var(--color-cyan-800);\n  }\n  #class2-vietnamese-runtime .text-cyan-900{\n    color: var(--color-cyan-900);\n  }\n  #class2-vietnamese-runtime .text-emerald-50{\n    color: var(--color-emerald-50);\n  }\n  #class2-vietnamese-runtime .text-emerald-100{\n    color: var(--color-emerald-100);\n  }\n  #class2-vietnamese-runtime .text-emerald-200{\n    color: var(--color-emerald-200);\n  }\n  #class2-vietnamese-runtime .text-emerald-300{\n    color: var(--color-emerald-300);\n  }\n  #class2-vietnamese-runtime .text-emerald-400{\n    color: var(--color-emerald-400);\n  }\n  #class2-vietnamese-runtime .text-emerald-500{\n    color: var(--color-emerald-500);\n  }\n  #class2-vietnamese-runtime .text-emerald-600{\n    color: var(--color-emerald-600);\n  }\n  #class2-vietnamese-runtime .text-emerald-700{\n    color: var(--color-emerald-700);\n  }\n  #class2-vietnamese-runtime .text-emerald-800{\n    color: var(--color-emerald-800);\n  }\n  #class2-vietnamese-runtime .text-emerald-900{\n    color: var(--color-emerald-900);\n  }\n  #class2-vietnamese-runtime .text-fuchsia-50{\n    color: var(--color-fuchsia-50);\n  }\n  #class2-vietnamese-runtime .text-fuchsia-100{\n    color: var(--color-fuchsia-100);\n  }\n  #class2-vietnamese-runtime .text-fuchsia-200{\n    color: var(--color-fuchsia-200);\n  }\n  #class2-vietnamese-runtime .text-fuchsia-300{\n    color: var(--color-fuchsia-300);\n  }\n  #class2-vietnamese-runtime .text-fuchsia-400{\n    color: var(--color-fuchsia-400);\n  }\n  #class2-vietnamese-runtime .text-fuchsia-500{\n    color: var(--color-fuchsia-500);\n  }\n  #class2-vietnamese-runtime .text-fuchsia-600{\n    color: var(--color-fuchsia-600);\n  }\n  #class2-vietnamese-runtime .text-fuchsia-700{\n    color: var(--color-fuchsia-700);\n  }\n  #class2-vietnamese-runtime .text-fuchsia-800{\n    color: var(--color-fuchsia-800);\n  }\n  #class2-vietnamese-runtime .text-fuchsia-900{\n    color: var(--color-fuchsia-900);\n  }\n  #class2-vietnamese-runtime .text-gray-50{\n    color: var(--color-gray-50);\n  }\n  #class2-vietnamese-runtime .text-gray-100{\n    color: var(--color-gray-100);\n  }\n  #class2-vietnamese-runtime .text-gray-200{\n    color: var(--color-gray-200);\n  }\n  #class2-vietnamese-runtime .text-gray-300{\n    color: var(--color-gray-300);\n  }\n  #class2-vietnamese-runtime .text-gray-400{\n    color: var(--color-gray-400);\n  }\n  #class2-vietnamese-runtime .text-gray-500{\n    color: var(--color-gray-500);\n  }\n  #class2-vietnamese-runtime .text-gray-600{\n    color: var(--color-gray-600);\n  }\n  #class2-vietnamese-runtime .text-gray-700{\n    color: var(--color-gray-700);\n  }\n  #class2-vietnamese-runtime .text-gray-800{\n    color: var(--color-gray-800);\n  }\n  #class2-vietnamese-runtime .text-gray-900{\n    color: var(--color-gray-900);\n  }\n  #class2-vietnamese-runtime .text-green-50{\n    color: var(--color-green-50);\n  }\n  #class2-vietnamese-runtime .text-green-100{\n    color: var(--color-green-100);\n  }\n  #class2-vietnamese-runtime .text-green-200{\n    color: var(--color-green-200);\n  }\n  #class2-vietnamese-runtime .text-green-300{\n    color: var(--color-green-300);\n  }\n  #class2-vietnamese-runtime .text-green-400{\n    color: var(--color-green-400);\n  }\n  #class2-vietnamese-runtime .text-green-500{\n    color: var(--color-green-500);\n  }\n  #class2-vietnamese-runtime .text-green-600{\n    color: var(--color-green-600);\n  }\n  #class2-vietnamese-runtime .text-green-700{\n    color: var(--color-green-700);\n  }\n  #class2-vietnamese-runtime .text-green-800{\n    color: var(--color-green-800);\n  }\n  #class2-vietnamese-runtime .text-green-900{\n    color: var(--color-green-900);\n  }\n  #class2-vietnamese-runtime .text-indigo-50{\n    color: var(--color-indigo-50);\n  }\n  #class2-vietnamese-runtime .text-indigo-100{\n    color: var(--color-indigo-100);\n  }\n  #class2-vietnamese-runtime .text-indigo-200{\n    color: var(--color-indigo-200);\n  }\n  #class2-vietnamese-runtime .text-indigo-300{\n    color: var(--color-indigo-300);\n  }\n  #class2-vietnamese-runtime .text-indigo-400{\n    color: var(--color-indigo-400);\n  }\n  #class2-vietnamese-runtime .text-indigo-500{\n    color: var(--color-indigo-500);\n  }\n  #class2-vietnamese-runtime .text-indigo-600{\n    color: var(--color-indigo-600);\n  }\n  #class2-vietnamese-runtime .text-indigo-700{\n    color: var(--color-indigo-700);\n  }\n  #class2-vietnamese-runtime .text-indigo-800{\n    color: var(--color-indigo-800);\n  }\n  #class2-vietnamese-runtime .text-indigo-900{\n    color: var(--color-indigo-900);\n  }\n  #class2-vietnamese-runtime .text-orange-50{\n    color: var(--color-orange-50);\n  }\n  #class2-vietnamese-runtime .text-orange-100{\n    color: var(--color-orange-100);\n  }\n  #class2-vietnamese-runtime .text-orange-200{\n    color: var(--color-orange-200);\n  }\n  #class2-vietnamese-runtime .text-orange-300{\n    color: var(--color-orange-300);\n  }\n  #class2-vietnamese-runtime .text-orange-400{\n    color: var(--color-orange-400);\n  }\n  #class2-vietnamese-runtime .text-orange-500{\n    color: var(--color-orange-500);\n  }\n  #class2-vietnamese-runtime .text-orange-600{\n    color: var(--color-orange-600);\n  }\n  #class2-vietnamese-runtime .text-orange-700{\n    color: var(--color-orange-700);\n  }\n  #class2-vietnamese-runtime .text-orange-800{\n    color: var(--color-orange-800);\n  }\n  #class2-vietnamese-runtime .text-orange-900{\n    color: var(--color-orange-900);\n  }\n  #class2-vietnamese-runtime .text-pink-50{\n    color: var(--color-pink-50);\n  }\n  #class2-vietnamese-runtime .text-pink-100{\n    color: var(--color-pink-100);\n  }\n  #class2-vietnamese-runtime .text-pink-200{\n    color: var(--color-pink-200);\n  }\n  #class2-vietnamese-runtime .text-pink-300{\n    color: var(--color-pink-300);\n  }\n  #class2-vietnamese-runtime .text-pink-400{\n    color: var(--color-pink-400);\n  }\n  #class2-vietnamese-runtime .text-pink-500{\n    color: var(--color-pink-500);\n  }\n  #class2-vietnamese-runtime .text-pink-600{\n    color: var(--color-pink-600);\n  }\n  #class2-vietnamese-runtime .text-pink-700{\n    color: var(--color-pink-700);\n  }\n  #class2-vietnamese-runtime .text-pink-800{\n    color: var(--color-pink-800);\n  }\n  #class2-vietnamese-runtime .text-pink-900{\n    color: var(--color-pink-900);\n  }\n  #class2-vietnamese-runtime .text-pink-950{\n    color: var(--color-pink-950);\n  }\n  #class2-vietnamese-runtime .text-purple-50{\n    color: var(--color-purple-50);\n  }\n  #class2-vietnamese-runtime .text-purple-100{\n    color: var(--color-purple-100);\n  }\n  #class2-vietnamese-runtime .text-purple-200{\n    color: var(--color-purple-200);\n  }\n  #class2-vietnamese-runtime .text-purple-300{\n    color: var(--color-purple-300);\n  }\n  #class2-vietnamese-runtime .text-purple-400{\n    color: var(--color-purple-400);\n  }\n  #class2-vietnamese-runtime .text-purple-500{\n    color: var(--color-purple-500);\n  }\n  #class2-vietnamese-runtime .text-purple-600{\n    color: var(--color-purple-600);\n  }\n  #class2-vietnamese-runtime .text-purple-700{\n    color: var(--color-purple-700);\n  }\n  #class2-vietnamese-runtime .text-purple-800{\n    color: var(--color-purple-800);\n  }\n  #class2-vietnamese-runtime .text-purple-900{\n    color: var(--color-purple-900);\n  }\n  #class2-vietnamese-runtime .text-red-50{\n    color: var(--color-red-50);\n  }\n  #class2-vietnamese-runtime .text-red-100{\n    color: var(--color-red-100);\n  }\n  #class2-vietnamese-runtime .text-red-200{\n    color: var(--color-red-200);\n  }\n  #class2-vietnamese-runtime .text-red-300{\n    color: var(--color-red-300);\n  }\n  #class2-vietnamese-runtime .text-red-400{\n    color: var(--color-red-400);\n  }\n  #class2-vietnamese-runtime .text-red-500{\n    color: var(--color-red-500);\n  }\n  #class2-vietnamese-runtime .text-red-600{\n    color: var(--color-red-600);\n  }\n  #class2-vietnamese-runtime .text-red-700{\n    color: var(--color-red-700);\n  }\n  #class2-vietnamese-runtime .text-red-800{\n    color: var(--color-red-800);\n  }\n  #class2-vietnamese-runtime .text-red-900{\n    color: var(--color-red-900);\n  }\n  #class2-vietnamese-runtime .text-rose-50{\n    color: var(--color-rose-50);\n  }\n  #class2-vietnamese-runtime .text-rose-100{\n    color: var(--color-rose-100);\n  }\n  #class2-vietnamese-runtime .text-rose-200{\n    color: var(--color-rose-200);\n  }\n  #class2-vietnamese-runtime .text-rose-300{\n    color: var(--color-rose-300);\n  }\n  #class2-vietnamese-runtime .text-rose-400{\n    color: var(--color-rose-400);\n  }\n  #class2-vietnamese-runtime .text-rose-500{\n    color: var(--color-rose-500);\n  }\n  #class2-vietnamese-runtime .text-rose-600{\n    color: var(--color-rose-600);\n  }\n  #class2-vietnamese-runtime .text-rose-700{\n    color: var(--color-rose-700);\n  }\n  #class2-vietnamese-runtime .text-rose-800{\n    color: var(--color-rose-800);\n  }\n  #class2-vietnamese-runtime .text-rose-900{\n    color: var(--color-rose-900);\n  }\n  #class2-vietnamese-runtime .text-sky-50{\n    color: var(--color-sky-50);\n  }\n  #class2-vietnamese-runtime .text-sky-100{\n    color: var(--color-sky-100);\n  }\n  #class2-vietnamese-runtime .text-sky-200{\n    color: var(--color-sky-200);\n  }\n  #class2-vietnamese-runtime .text-sky-300{\n    color: var(--color-sky-300);\n  }\n  #class2-vietnamese-runtime .text-sky-400{\n    color: var(--color-sky-400);\n  }\n  #class2-vietnamese-runtime .text-sky-500{\n    color: var(--color-sky-500);\n  }\n  #class2-vietnamese-runtime .text-sky-600{\n    color: var(--color-sky-600);\n  }\n  #class2-vietnamese-runtime .text-sky-700{\n    color: var(--color-sky-700);\n  }\n  #class2-vietnamese-runtime .text-sky-800{\n    color: var(--color-sky-800);\n  }\n  #class2-vietnamese-runtime .text-sky-900{\n    color: var(--color-sky-900);\n  }\n  #class2-vietnamese-runtime .text-slate-50{\n    color: var(--color-slate-50);\n  }\n  #class2-vietnamese-runtime .text-slate-100{\n    color: var(--color-slate-100);\n  }\n  #class2-vietnamese-runtime .text-slate-200{\n    color: var(--color-slate-200);\n  }\n  #class2-vietnamese-runtime .text-slate-300{\n    color: var(--color-slate-300);\n  }\n  #class2-vietnamese-runtime .text-slate-400{\n    color: var(--color-slate-400);\n  }\n  #class2-vietnamese-runtime .text-slate-500{\n    color: var(--color-slate-500);\n  }\n  #class2-vietnamese-runtime .text-slate-600{\n    color: var(--color-slate-600);\n  }\n  #class2-vietnamese-runtime .text-slate-700{\n    color: var(--color-slate-700);\n  }\n  #class2-vietnamese-runtime .text-slate-800{\n    color: var(--color-slate-800);\n  }\n  #class2-vietnamese-runtime .text-slate-900{\n    color: var(--color-slate-900);\n  }\n  #class2-vietnamese-runtime .text-teal-50{\n    color: var(--color-teal-50);\n  }\n  #class2-vietnamese-runtime .text-teal-100{\n    color: var(--color-teal-100);\n  }\n  #class2-vietnamese-runtime .text-teal-200{\n    color: var(--color-teal-200);\n  }\n  #class2-vietnamese-runtime .text-teal-300{\n    color: var(--color-teal-300);\n  }\n  #class2-vietnamese-runtime .text-teal-400{\n    color: var(--color-teal-400);\n  }\n  #class2-vietnamese-runtime .text-teal-500{\n    color: var(--color-teal-500);\n  }\n  #class2-vietnamese-runtime .text-teal-600{\n    color: var(--color-teal-600);\n  }\n  #class2-vietnamese-runtime .text-teal-700{\n    color: var(--color-teal-700);\n  }\n  #class2-vietnamese-runtime .text-teal-800{\n    color: var(--color-teal-800);\n  }\n  #class2-vietnamese-runtime .text-teal-900{\n    color: var(--color-teal-900);\n  }\n  #class2-vietnamese-runtime .text-violet-50{\n    color: var(--color-violet-50);\n  }\n  #class2-vietnamese-runtime .text-violet-100{\n    color: var(--color-violet-100);\n  }\n  #class2-vietnamese-runtime .text-violet-200{\n    color: var(--color-violet-200);\n  }\n  #class2-vietnamese-runtime .text-violet-300{\n    color: var(--color-violet-300);\n  }\n  #class2-vietnamese-runtime .text-violet-400{\n    color: var(--color-violet-400);\n  }\n  #class2-vietnamese-runtime .text-violet-500{\n    color: var(--color-violet-500);\n  }\n  #class2-vietnamese-runtime .text-violet-600{\n    color: var(--color-violet-600);\n  }\n  #class2-vietnamese-runtime .text-violet-700{\n    color: var(--color-violet-700);\n  }\n  #class2-vietnamese-runtime .text-violet-800{\n    color: var(--color-violet-800);\n  }\n  #class2-vietnamese-runtime .text-violet-900{\n    color: var(--color-violet-900);\n  }\n  #class2-vietnamese-runtime .text-white{\n    color: var(--color-white);\n  }\n  #class2-vietnamese-runtime .text-yellow-50{\n    color: var(--color-yellow-50);\n  }\n  #class2-vietnamese-runtime .text-yellow-100{\n    color: var(--color-yellow-100);\n  }\n  #class2-vietnamese-runtime .text-yellow-200{\n    color: var(--color-yellow-200);\n  }\n  #class2-vietnamese-runtime .text-yellow-300{\n    color: var(--color-yellow-300);\n  }\n  #class2-vietnamese-runtime .text-yellow-400{\n    color: var(--color-yellow-400);\n  }\n  #class2-vietnamese-runtime .text-yellow-500{\n    color: var(--color-yellow-500);\n  }\n  #class2-vietnamese-runtime .text-yellow-600{\n    color: var(--color-yellow-600);\n  }\n  #class2-vietnamese-runtime .text-yellow-700{\n    color: var(--color-yellow-700);\n  }\n  #class2-vietnamese-runtime .text-yellow-800{\n    color: var(--color-yellow-800);\n  }\n  #class2-vietnamese-runtime .text-yellow-900{\n    color: var(--color-yellow-900);\n  }\n  #class2-vietnamese-runtime .capitalize{\n    text-transform: capitalize;\n  }\n  #class2-vietnamese-runtime .uppercase{\n    text-transform: uppercase;\n  }\n  #class2-vietnamese-runtime .italic{\n    font-style: italic;\n  }\n  #class2-vietnamese-runtime .opacity-10{\n    opacity: 10%;\n  }\n  #class2-vietnamese-runtime .opacity-20{\n    opacity: 20%;\n  }\n  #class2-vietnamese-runtime .opacity-40{\n    opacity: 40%;\n  }\n  #class2-vietnamese-runtime .opacity-60{\n    opacity: 60%;\n  }\n  #class2-vietnamese-runtime .opacity-65{\n    opacity: 65%;\n  }\n  #class2-vietnamese-runtime .opacity-70{\n    opacity: 70%;\n  }\n  #class2-vietnamese-runtime .opacity-75{\n    opacity: 75%;\n  }\n  #class2-vietnamese-runtime .opacity-80{\n    opacity: 80%;\n  }\n  #class2-vietnamese-runtime .opacity-85{\n    opacity: 85%;\n  }\n  #class2-vietnamese-runtime .shadow-2xl{\n    --tw-shadow: 0 25px 50px -12px var(--tw-shadow-color, rgb(0 0 0 / 0.25));\n    box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);\n  }\n  #class2-vietnamese-runtime .shadow-inner{\n    --tw-shadow: inset 0 2px 4px 0 var(--tw-shadow-color, rgb(0 0 0 / 0.05));\n    box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);\n  }\n  #class2-vietnamese-runtime .shadow-lg{\n    --tw-shadow: 0 10px 15px -3px var(--tw-shadow-color, rgb(0 0 0 / 0.1)), 0 4px 6px -4px var(--tw-shadow-color, rgb(0 0 0 / 0.1));\n    box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);\n  }\n  #class2-vietnamese-runtime .shadow-md{\n    --tw-shadow: 0 4px 6px -1px var(--tw-shadow-color, rgb(0 0 0 / 0.1)), 0 2px 4px -2px var(--tw-shadow-color, rgb(0 0 0 / 0.1));\n    box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);\n  }\n  #class2-vietnamese-runtime .shadow-sm{\n    --tw-shadow: 0 1px 3px 0 var(--tw-shadow-color, rgb(0 0 0 / 0.1)), 0 1px 2px -1px var(--tw-shadow-color, rgb(0 0 0 / 0.1));\n    box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);\n  }\n  #class2-vietnamese-runtime .shadow-xl{\n    --tw-shadow: 0 20px 25px -5px var(--tw-shadow-color, rgb(0 0 0 / 0.1)), 0 8px 10px -6px var(--tw-shadow-color, rgb(0 0 0 / 0.1));\n    box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);\n  }\n  #class2-vietnamese-runtime .shadow-xs{\n    --tw-shadow: 0 1px 2px 0 var(--tw-shadow-color, rgb(0 0 0 / 0.05));\n    box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);\n  }\n  #class2-vietnamese-runtime .ring-4{\n    --tw-ring-shadow: var(--tw-ring-inset,) 0 0 0 calc(4px + var(--tw-ring-offset-width)) var(--tw-ring-color, currentcolor);\n    box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);\n  }\n  #class2-vietnamese-runtime .ring-amber-50{\n    --tw-ring-color: var(--color-amber-50);\n  }\n  #class2-vietnamese-runtime .ring-amber-100{\n    --tw-ring-color: var(--color-amber-100);\n  }\n  #class2-vietnamese-runtime .ring-amber-200{\n    --tw-ring-color: var(--color-amber-200);\n  }\n  #class2-vietnamese-runtime .ring-amber-300{\n    --tw-ring-color: var(--color-amber-300);\n  }\n  #class2-vietnamese-runtime .ring-amber-400{\n    --tw-ring-color: var(--color-amber-400);\n  }\n  #class2-vietnamese-runtime .ring-amber-500{\n    --tw-ring-color: var(--color-amber-500);\n  }\n  #class2-vietnamese-runtime .ring-amber-600{\n    --tw-ring-color: var(--color-amber-600);\n  }\n  #class2-vietnamese-runtime .ring-amber-700{\n    --tw-ring-color: var(--color-amber-700);\n  }\n  #class2-vietnamese-runtime .ring-amber-800{\n    --tw-ring-color: var(--color-amber-800);\n  }\n  #class2-vietnamese-runtime .ring-amber-900{\n    --tw-ring-color: var(--color-amber-900);\n  }\n  #class2-vietnamese-runtime .ring-black{\n    --tw-ring-color: var(--color-black);\n  }\n  #class2-vietnamese-runtime .ring-blue-50{\n    --tw-ring-color: var(--color-blue-50);\n  }\n  #class2-vietnamese-runtime .ring-blue-100{\n    --tw-ring-color: var(--color-blue-100);\n  }\n  #class2-vietnamese-runtime .ring-blue-200{\n    --tw-ring-color: var(--color-blue-200);\n  }\n  #class2-vietnamese-runtime .ring-blue-300{\n    --tw-ring-color: var(--color-blue-300);\n  }\n  #class2-vietnamese-runtime .ring-blue-400{\n    --tw-ring-color: var(--color-blue-400);\n  }\n  #class2-vietnamese-runtime .ring-blue-500{\n    --tw-ring-color: var(--color-blue-500);\n  }\n  #class2-vietnamese-runtime .ring-blue-600{\n    --tw-ring-color: var(--color-blue-600);\n  }\n  #class2-vietnamese-runtime .ring-blue-700{\n    --tw-ring-color: var(--color-blue-700);\n  }\n  #class2-vietnamese-runtime .ring-blue-800{\n    --tw-ring-color: var(--color-blue-800);\n  }\n  #class2-vietnamese-runtime .ring-blue-900{\n    --tw-ring-color: var(--color-blue-900);\n  }\n  #class2-vietnamese-runtime .ring-cyan-50{\n    --tw-ring-color: var(--color-cyan-50);\n  }\n  #class2-vietnamese-runtime .ring-cyan-100{\n    --tw-ring-color: var(--color-cyan-100);\n  }\n  #class2-vietnamese-runtime .ring-cyan-200{\n    --tw-ring-color: var(--color-cyan-200);\n  }\n  #class2-vietnamese-runtime .ring-cyan-300{\n    --tw-ring-color: var(--color-cyan-300);\n  }\n  #class2-vietnamese-runtime .ring-cyan-400{\n    --tw-ring-color: var(--color-cyan-400);\n  }\n  #class2-vietnamese-runtime .ring-cyan-500{\n    --tw-ring-color: var(--color-cyan-500);\n  }\n  #class2-vietnamese-runtime .ring-cyan-600{\n    --tw-ring-color: var(--color-cyan-600);\n  }\n  #class2-vietnamese-runtime .ring-cyan-700{\n    --tw-ring-color: var(--color-cyan-700);\n  }\n  #class2-vietnamese-runtime .ring-cyan-800{\n    --tw-ring-color: var(--color-cyan-800);\n  }\n  #class2-vietnamese-runtime .ring-cyan-900{\n    --tw-ring-color: var(--color-cyan-900);\n  }\n  #class2-vietnamese-runtime .ring-emerald-50{\n    --tw-ring-color: var(--color-emerald-50);\n  }\n  #class2-vietnamese-runtime .ring-emerald-100{\n    --tw-ring-color: var(--color-emerald-100);\n  }\n  #class2-vietnamese-runtime .ring-emerald-200{\n    --tw-ring-color: var(--color-emerald-200);\n  }\n  #class2-vietnamese-runtime .ring-emerald-300{\n    --tw-ring-color: var(--color-emerald-300);\n  }\n  #class2-vietnamese-runtime .ring-emerald-400{\n    --tw-ring-color: var(--color-emerald-400);\n  }\n  #class2-vietnamese-runtime .ring-emerald-500{\n    --tw-ring-color: var(--color-emerald-500);\n  }\n  #class2-vietnamese-runtime .ring-emerald-600{\n    --tw-ring-color: var(--color-emerald-600);\n  }\n  #class2-vietnamese-runtime .ring-emerald-700{\n    --tw-ring-color: var(--color-emerald-700);\n  }\n  #class2-vietnamese-runtime .ring-emerald-800{\n    --tw-ring-color: var(--color-emerald-800);\n  }\n  #class2-vietnamese-runtime .ring-emerald-900{\n    --tw-ring-color: var(--color-emerald-900);\n  }\n  #class2-vietnamese-runtime .ring-fuchsia-50{\n    --tw-ring-color: var(--color-fuchsia-50);\n  }\n  #class2-vietnamese-runtime .ring-fuchsia-100{\n    --tw-ring-color: var(--color-fuchsia-100);\n  }\n  #class2-vietnamese-runtime .ring-fuchsia-200{\n    --tw-ring-color: var(--color-fuchsia-200);\n  }\n  #class2-vietnamese-runtime .ring-fuchsia-300{\n    --tw-ring-color: var(--color-fuchsia-300);\n  }\n  #class2-vietnamese-runtime .ring-fuchsia-400{\n    --tw-ring-color: var(--color-fuchsia-400);\n  }\n  #class2-vietnamese-runtime .ring-fuchsia-500{\n    --tw-ring-color: var(--color-fuchsia-500);\n  }\n  #class2-vietnamese-runtime .ring-fuchsia-600{\n    --tw-ring-color: var(--color-fuchsia-600);\n  }\n  #class2-vietnamese-runtime .ring-fuchsia-700{\n    --tw-ring-color: var(--color-fuchsia-700);\n  }\n  #class2-vietnamese-runtime .ring-fuchsia-800{\n    --tw-ring-color: var(--color-fuchsia-800);\n  }\n  #class2-vietnamese-runtime .ring-fuchsia-900{\n    --tw-ring-color: var(--color-fuchsia-900);\n  }\n  #class2-vietnamese-runtime .ring-gray-50{\n    --tw-ring-color: var(--color-gray-50);\n  }\n  #class2-vietnamese-runtime .ring-gray-100{\n    --tw-ring-color: var(--color-gray-100);\n  }\n  #class2-vietnamese-runtime .ring-gray-200{\n    --tw-ring-color: var(--color-gray-200);\n  }\n  #class2-vietnamese-runtime .ring-gray-300{\n    --tw-ring-color: var(--color-gray-300);\n  }\n  #class2-vietnamese-runtime .ring-gray-400{\n    --tw-ring-color: var(--color-gray-400);\n  }\n  #class2-vietnamese-runtime .ring-gray-500{\n    --tw-ring-color: var(--color-gray-500);\n  }\n  #class2-vietnamese-runtime .ring-gray-600{\n    --tw-ring-color: var(--color-gray-600);\n  }\n  #class2-vietnamese-runtime .ring-gray-700{\n    --tw-ring-color: var(--color-gray-700);\n  }\n  #class2-vietnamese-runtime .ring-gray-800{\n    --tw-ring-color: var(--color-gray-800);\n  }\n  #class2-vietnamese-runtime .ring-gray-900{\n    --tw-ring-color: var(--color-gray-900);\n  }\n  #class2-vietnamese-runtime .ring-green-50{\n    --tw-ring-color: var(--color-green-50);\n  }\n  #class2-vietnamese-runtime .ring-green-100{\n    --tw-ring-color: var(--color-green-100);\n  }\n  #class2-vietnamese-runtime .ring-green-200{\n    --tw-ring-color: var(--color-green-200);\n  }\n  #class2-vietnamese-runtime .ring-green-300{\n    --tw-ring-color: var(--color-green-300);\n  }\n  #class2-vietnamese-runtime .ring-green-400{\n    --tw-ring-color: var(--color-green-400);\n  }\n  #class2-vietnamese-runtime .ring-green-500{\n    --tw-ring-color: var(--color-green-500);\n  }\n  #class2-vietnamese-runtime .ring-green-600{\n    --tw-ring-color: var(--color-green-600);\n  }\n  #class2-vietnamese-runtime .ring-green-700{\n    --tw-ring-color: var(--color-green-700);\n  }\n  #class2-vietnamese-runtime .ring-green-800{\n    --tw-ring-color: var(--color-green-800);\n  }\n  #class2-vietnamese-runtime .ring-green-900{\n    --tw-ring-color: var(--color-green-900);\n  }\n  #class2-vietnamese-runtime .ring-indigo-50{\n    --tw-ring-color: var(--color-indigo-50);\n  }\n  #class2-vietnamese-runtime .ring-indigo-100{\n    --tw-ring-color: var(--color-indigo-100);\n  }\n  #class2-vietnamese-runtime .ring-indigo-200{\n    --tw-ring-color: var(--color-indigo-200);\n  }\n  #class2-vietnamese-runtime .ring-indigo-300{\n    --tw-ring-color: var(--color-indigo-300);\n  }\n  #class2-vietnamese-runtime .ring-indigo-400{\n    --tw-ring-color: var(--color-indigo-400);\n  }\n  #class2-vietnamese-runtime .ring-indigo-500{\n    --tw-ring-color: var(--color-indigo-500);\n  }\n  #class2-vietnamese-runtime .ring-indigo-600{\n    --tw-ring-color: var(--color-indigo-600);\n  }\n  #class2-vietnamese-runtime .ring-indigo-700{\n    --tw-ring-color: var(--color-indigo-700);\n  }\n  #class2-vietnamese-runtime .ring-indigo-800{\n    --tw-ring-color: var(--color-indigo-800);\n  }\n  #class2-vietnamese-runtime .ring-indigo-900{\n    --tw-ring-color: var(--color-indigo-900);\n  }\n  #class2-vietnamese-runtime .ring-orange-50{\n    --tw-ring-color: var(--color-orange-50);\n  }\n  #class2-vietnamese-runtime .ring-orange-100{\n    --tw-ring-color: var(--color-orange-100);\n  }\n  #class2-vietnamese-runtime .ring-orange-200{\n    --tw-ring-color: var(--color-orange-200);\n  }\n  #class2-vietnamese-runtime .ring-orange-300{\n    --tw-ring-color: var(--color-orange-300);\n  }\n  #class2-vietnamese-runtime .ring-orange-400{\n    --tw-ring-color: var(--color-orange-400);\n  }\n  #class2-vietnamese-runtime .ring-orange-500{\n    --tw-ring-color: var(--color-orange-500);\n  }\n  #class2-vietnamese-runtime .ring-orange-600{\n    --tw-ring-color: var(--color-orange-600);\n  }\n  #class2-vietnamese-runtime .ring-orange-700{\n    --tw-ring-color: var(--color-orange-700);\n  }\n  #class2-vietnamese-runtime .ring-orange-800{\n    --tw-ring-color: var(--color-orange-800);\n  }\n  #class2-vietnamese-runtime .ring-orange-900{\n    --tw-ring-color: var(--color-orange-900);\n  }\n  #class2-vietnamese-runtime .ring-pink-50{\n    --tw-ring-color: var(--color-pink-50);\n  }\n  #class2-vietnamese-runtime .ring-pink-100{\n    --tw-ring-color: var(--color-pink-100);\n  }\n  #class2-vietnamese-runtime .ring-pink-200{\n    --tw-ring-color: var(--color-pink-200);\n  }\n  #class2-vietnamese-runtime .ring-pink-300{\n    --tw-ring-color: var(--color-pink-300);\n  }\n  #class2-vietnamese-runtime .ring-pink-400{\n    --tw-ring-color: var(--color-pink-400);\n  }\n  #class2-vietnamese-runtime .ring-pink-500{\n    --tw-ring-color: var(--color-pink-500);\n  }\n  #class2-vietnamese-runtime .ring-pink-600{\n    --tw-ring-color: var(--color-pink-600);\n  }\n  #class2-vietnamese-runtime .ring-pink-700{\n    --tw-ring-color: var(--color-pink-700);\n  }\n  #class2-vietnamese-runtime .ring-pink-800{\n    --tw-ring-color: var(--color-pink-800);\n  }\n  #class2-vietnamese-runtime .ring-pink-900{\n    --tw-ring-color: var(--color-pink-900);\n  }\n  #class2-vietnamese-runtime .ring-purple-50{\n    --tw-ring-color: var(--color-purple-50);\n  }\n  #class2-vietnamese-runtime .ring-purple-100{\n    --tw-ring-color: var(--color-purple-100);\n  }\n  #class2-vietnamese-runtime .ring-purple-200{\n    --tw-ring-color: var(--color-purple-200);\n  }\n  #class2-vietnamese-runtime .ring-purple-300{\n    --tw-ring-color: var(--color-purple-300);\n  }\n  #class2-vietnamese-runtime .ring-purple-400{\n    --tw-ring-color: var(--color-purple-400);\n  }\n  #class2-vietnamese-runtime .ring-purple-500{\n    --tw-ring-color: var(--color-purple-500);\n  }\n  #class2-vietnamese-runtime .ring-purple-600{\n    --tw-ring-color: var(--color-purple-600);\n  }\n  #class2-vietnamese-runtime .ring-purple-700{\n    --tw-ring-color: var(--color-purple-700);\n  }\n  #class2-vietnamese-runtime .ring-purple-800{\n    --tw-ring-color: var(--color-purple-800);\n  }\n  #class2-vietnamese-runtime .ring-purple-900{\n    --tw-ring-color: var(--color-purple-900);\n  }\n  #class2-vietnamese-runtime .ring-red-50{\n    --tw-ring-color: var(--color-red-50);\n  }\n  #class2-vietnamese-runtime .ring-red-100{\n    --tw-ring-color: var(--color-red-100);\n  }\n  #class2-vietnamese-runtime .ring-red-200{\n    --tw-ring-color: var(--color-red-200);\n  }\n  #class2-vietnamese-runtime .ring-red-300{\n    --tw-ring-color: var(--color-red-300);\n  }\n  #class2-vietnamese-runtime .ring-red-400{\n    --tw-ring-color: var(--color-red-400);\n  }\n  #class2-vietnamese-runtime .ring-red-500{\n    --tw-ring-color: var(--color-red-500);\n  }\n  #class2-vietnamese-runtime .ring-red-600{\n    --tw-ring-color: var(--color-red-600);\n  }\n  #class2-vietnamese-runtime .ring-red-700{\n    --tw-ring-color: var(--color-red-700);\n  }\n  #class2-vietnamese-runtime .ring-red-800{\n    --tw-ring-color: var(--color-red-800);\n  }\n  #class2-vietnamese-runtime .ring-red-900{\n    --tw-ring-color: var(--color-red-900);\n  }\n  #class2-vietnamese-runtime .ring-rose-50{\n    --tw-ring-color: var(--color-rose-50);\n  }\n  #class2-vietnamese-runtime .ring-rose-100{\n    --tw-ring-color: var(--color-rose-100);\n  }\n  #class2-vietnamese-runtime .ring-rose-200{\n    --tw-ring-color: var(--color-rose-200);\n  }\n  #class2-vietnamese-runtime .ring-rose-300{\n    --tw-ring-color: var(--color-rose-300);\n  }\n  #class2-vietnamese-runtime .ring-rose-400{\n    --tw-ring-color: var(--color-rose-400);\n  }\n  #class2-vietnamese-runtime .ring-rose-500{\n    --tw-ring-color: var(--color-rose-500);\n  }\n  #class2-vietnamese-runtime .ring-rose-600{\n    --tw-ring-color: var(--color-rose-600);\n  }\n  #class2-vietnamese-runtime .ring-rose-700{\n    --tw-ring-color: var(--color-rose-700);\n  }\n  #class2-vietnamese-runtime .ring-rose-800{\n    --tw-ring-color: var(--color-rose-800);\n  }\n  #class2-vietnamese-runtime .ring-rose-900{\n    --tw-ring-color: var(--color-rose-900);\n  }\n  #class2-vietnamese-runtime .ring-sky-50{\n    --tw-ring-color: var(--color-sky-50);\n  }\n  #class2-vietnamese-runtime .ring-sky-100{\n    --tw-ring-color: var(--color-sky-100);\n  }\n  #class2-vietnamese-runtime .ring-sky-200{\n    --tw-ring-color: var(--color-sky-200);\n  }\n  #class2-vietnamese-runtime .ring-sky-300{\n    --tw-ring-color: var(--color-sky-300);\n  }\n  #class2-vietnamese-runtime .ring-sky-400{\n    --tw-ring-color: var(--color-sky-400);\n  }\n  #class2-vietnamese-runtime .ring-sky-500{\n    --tw-ring-color: var(--color-sky-500);\n  }\n  #class2-vietnamese-runtime .ring-sky-600{\n    --tw-ring-color: var(--color-sky-600);\n  }\n  #class2-vietnamese-runtime .ring-sky-700{\n    --tw-ring-color: var(--color-sky-700);\n  }\n  #class2-vietnamese-runtime .ring-sky-800{\n    --tw-ring-color: var(--color-sky-800);\n  }\n  #class2-vietnamese-runtime .ring-sky-900{\n    --tw-ring-color: var(--color-sky-900);\n  }\n  #class2-vietnamese-runtime .ring-slate-50{\n    --tw-ring-color: var(--color-slate-50);\n  }\n  #class2-vietnamese-runtime .ring-slate-100{\n    --tw-ring-color: var(--color-slate-100);\n  }\n  #class2-vietnamese-runtime .ring-slate-200{\n    --tw-ring-color: var(--color-slate-200);\n  }\n  #class2-vietnamese-runtime .ring-slate-300{\n    --tw-ring-color: var(--color-slate-300);\n  }\n  #class2-vietnamese-runtime .ring-slate-400{\n    --tw-ring-color: var(--color-slate-400);\n  }\n  #class2-vietnamese-runtime .ring-slate-500{\n    --tw-ring-color: var(--color-slate-500);\n  }\n  #class2-vietnamese-runtime .ring-slate-600{\n    --tw-ring-color: var(--color-slate-600);\n  }\n  #class2-vietnamese-runtime .ring-slate-700{\n    --tw-ring-color: var(--color-slate-700);\n  }\n  #class2-vietnamese-runtime .ring-slate-800{\n    --tw-ring-color: var(--color-slate-800);\n  }\n  #class2-vietnamese-runtime .ring-slate-900{\n    --tw-ring-color: var(--color-slate-900);\n  }\n  #class2-vietnamese-runtime .ring-teal-50{\n    --tw-ring-color: var(--color-teal-50);\n  }\n  #class2-vietnamese-runtime .ring-teal-100{\n    --tw-ring-color: var(--color-teal-100);\n  }\n  #class2-vietnamese-runtime .ring-teal-200{\n    --tw-ring-color: var(--color-teal-200);\n  }\n  #class2-vietnamese-runtime .ring-teal-300{\n    --tw-ring-color: var(--color-teal-300);\n  }\n  #class2-vietnamese-runtime .ring-teal-400{\n    --tw-ring-color: var(--color-teal-400);\n  }\n  #class2-vietnamese-runtime .ring-teal-500{\n    --tw-ring-color: var(--color-teal-500);\n  }\n  #class2-vietnamese-runtime .ring-teal-600{\n    --tw-ring-color: var(--color-teal-600);\n  }\n  #class2-vietnamese-runtime .ring-teal-700{\n    --tw-ring-color: var(--color-teal-700);\n  }\n  #class2-vietnamese-runtime .ring-teal-800{\n    --tw-ring-color: var(--color-teal-800);\n  }\n  #class2-vietnamese-runtime .ring-teal-900{\n    --tw-ring-color: var(--color-teal-900);\n  }\n  #class2-vietnamese-runtime .ring-violet-50{\n    --tw-ring-color: var(--color-violet-50);\n  }\n  #class2-vietnamese-runtime .ring-violet-100{\n    --tw-ring-color: var(--color-violet-100);\n  }\n  #class2-vietnamese-runtime .ring-violet-200{\n    --tw-ring-color: var(--color-violet-200);\n  }\n  #class2-vietnamese-runtime .ring-violet-300{\n    --tw-ring-color: var(--color-violet-300);\n  }\n  #class2-vietnamese-runtime .ring-violet-400{\n    --tw-ring-color: var(--color-violet-400);\n  }\n  #class2-vietnamese-runtime .ring-violet-500{\n    --tw-ring-color: var(--color-violet-500);\n  }\n  #class2-vietnamese-runtime .ring-violet-600{\n    --tw-ring-color: var(--color-violet-600);\n  }\n  #class2-vietnamese-runtime .ring-violet-700{\n    --tw-ring-color: var(--color-violet-700);\n  }\n  #class2-vietnamese-runtime .ring-violet-800{\n    --tw-ring-color: var(--color-violet-800);\n  }\n  #class2-vietnamese-runtime .ring-violet-900{\n    --tw-ring-color: var(--color-violet-900);\n  }\n  #class2-vietnamese-runtime .ring-white{\n    --tw-ring-color: var(--color-white);\n  }\n  #class2-vietnamese-runtime .ring-yellow-50{\n    --tw-ring-color: var(--color-yellow-50);\n  }\n  #class2-vietnamese-runtime .ring-yellow-100{\n    --tw-ring-color: var(--color-yellow-100);\n  }\n  #class2-vietnamese-runtime .ring-yellow-200{\n    --tw-ring-color: var(--color-yellow-200);\n  }\n  #class2-vietnamese-runtime .ring-yellow-300{\n    --tw-ring-color: var(--color-yellow-300);\n  }\n  #class2-vietnamese-runtime .ring-yellow-400{\n    --tw-ring-color: var(--color-yellow-400);\n  }\n  #class2-vietnamese-runtime .ring-yellow-500{\n    --tw-ring-color: var(--color-yellow-500);\n  }\n  #class2-vietnamese-runtime .ring-yellow-600{\n    --tw-ring-color: var(--color-yellow-600);\n  }\n  #class2-vietnamese-runtime .ring-yellow-700{\n    --tw-ring-color: var(--color-yellow-700);\n  }\n  #class2-vietnamese-runtime .ring-yellow-800{\n    --tw-ring-color: var(--color-yellow-800);\n  }\n  #class2-vietnamese-runtime .ring-yellow-900{\n    --tw-ring-color: var(--color-yellow-900);\n  }\n  #class2-vietnamese-runtime .backdrop-blur-md{\n    --tw-backdrop-blur: blur(var(--blur-md));\n    -webkit-backdrop-filter: var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);\n    backdrop-filter: var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);\n  }\n  #class2-vietnamese-runtime .backdrop-blur-sm{\n    --tw-backdrop-blur: blur(var(--blur-sm));\n    -webkit-backdrop-filter: var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);\n    backdrop-filter: var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);\n  }\n  #class2-vietnamese-runtime .backdrop-blur-xs{\n    --tw-backdrop-blur: blur(var(--blur-xs));\n    -webkit-backdrop-filter: var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);\n    backdrop-filter: var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);\n  }\n  #class2-vietnamese-runtime .transition{\n    transition-property: color, background-color, border-color, outline-color, text-decoration-color, fill, stroke, --tw-gradient-from, --tw-gradient-via, --tw-gradient-to, opacity, box-shadow, transform, translate, scale, rotate, filter, -webkit-backdrop-filter, backdrop-filter, display, visibility, content-visibility, overlay, pointer-events;\n    transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));\n    transition-duration: var(--tw-duration, var(--default-transition-duration));\n  }\n  #class2-vietnamese-runtime .transition-all{\n    transition-property: all;\n    transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));\n    transition-duration: var(--tw-duration, var(--default-transition-duration));\n  }\n  #class2-vietnamese-runtime .transition-colors{\n    transition-property: color, background-color, border-color, outline-color, text-decoration-color, fill, stroke, --tw-gradient-from, --tw-gradient-via, --tw-gradient-to;\n    transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));\n    transition-duration: var(--tw-duration, var(--default-transition-duration));\n  }\n  #class2-vietnamese-runtime .transition-shadow{\n    transition-property: box-shadow;\n    transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));\n    transition-duration: var(--tw-duration, var(--default-transition-duration));\n  }\n  #class2-vietnamese-runtime .transition-transform{\n    transition-property: transform, translate, scale, rotate;\n    transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));\n    transition-duration: var(--tw-duration, var(--default-transition-duration));\n  }\n  #class2-vietnamese-runtime .duration-150{\n    --tw-duration: 150ms;\n    transition-duration: 150ms;\n  }\n  #class2-vietnamese-runtime .duration-200{\n    --tw-duration: 200ms;\n    transition-duration: 200ms;\n  }\n  #class2-vietnamese-runtime .duration-500{\n    --tw-duration: 500ms;\n    transition-duration: 500ms;\n  }\n  #class2-vietnamese-runtime .ease-in{\n    --tw-ease: var(--ease-in);\n    transition-timing-function: var(--ease-in);\n  }\n  #class2-vietnamese-runtime .ease-in-out{\n    --tw-ease: var(--ease-in-out);\n    transition-timing-function: var(--ease-in-out);\n  }\n  #class2-vietnamese-runtime .ease-out{\n    --tw-ease: var(--ease-out);\n    transition-timing-function: var(--ease-out);\n  }\n  #class2-vietnamese-runtime .outline-none{\n    --tw-outline-style: none;\n    outline-style: none;\n  }\n  #class2-vietnamese-runtime .select-none{\n    -webkit-user-select: none;\n    user-select: none;\n  }\n  #class2-vietnamese-runtime .select-text{\n    -webkit-user-select: text;\n    user-select: text;\n  }\n  #class2-vietnamese-runtime .group-hover\\:scale-110{\n    &:is(:where(.group):hover *) {\n      @media (hover: hover) {\n        --tw-scale-x: 110%;\n        --tw-scale-y: 110%;\n        --tw-scale-z: 110%;\n        scale: var(--tw-scale-x) var(--tw-scale-y);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .last\\:mb-0{\n    &:last-child {\n      margin-bottom: calc(var(--spacing) * 0);\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-amber-50{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-amber-50);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-amber-100{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-amber-100);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-amber-200{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-amber-200);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-amber-300{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-amber-300);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-amber-400{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-amber-400);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-amber-500{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-amber-500);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-amber-600{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-amber-600);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-amber-700{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-amber-700);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-amber-800{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-amber-800);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-amber-900{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-amber-900);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-black{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-black);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-blue-50{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-blue-50);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-blue-100{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-blue-100);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-blue-200{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-blue-200);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-blue-300{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-blue-300);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-blue-400{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-blue-400);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-blue-500{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-blue-500);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-blue-600{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-blue-600);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-blue-700{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-blue-700);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-blue-800{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-blue-800);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-blue-900{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-blue-900);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-cyan-50{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-cyan-50);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-cyan-100{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-cyan-100);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-cyan-200{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-cyan-200);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-cyan-300{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-cyan-300);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-cyan-400{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-cyan-400);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-cyan-500{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-cyan-500);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-cyan-600{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-cyan-600);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-cyan-700{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-cyan-700);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-cyan-800{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-cyan-800);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-cyan-900{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-cyan-900);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-emerald-50{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-emerald-50);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-emerald-100{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-emerald-100);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-emerald-200{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-emerald-200);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-emerald-300{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-emerald-300);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-emerald-400{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-emerald-400);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-emerald-500{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-emerald-500);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-emerald-600{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-emerald-600);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-emerald-700{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-emerald-700);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-emerald-800{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-emerald-800);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-emerald-900{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-emerald-900);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-fuchsia-50{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-fuchsia-50);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-fuchsia-100{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-fuchsia-100);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-fuchsia-200{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-fuchsia-200);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-fuchsia-300{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-fuchsia-300);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-fuchsia-400{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-fuchsia-400);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-fuchsia-500{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-fuchsia-500);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-fuchsia-600{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-fuchsia-600);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-fuchsia-700{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-fuchsia-700);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-fuchsia-800{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-fuchsia-800);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-fuchsia-900{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-fuchsia-900);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-gray-50{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-gray-50);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-gray-100{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-gray-100);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-gray-200{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-gray-200);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-gray-300{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-gray-300);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-gray-400{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-gray-400);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-gray-500{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-gray-500);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-gray-600{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-gray-600);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-gray-700{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-gray-700);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-gray-800{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-gray-800);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-gray-900{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-gray-900);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-green-50{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-green-50);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-green-100{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-green-100);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-green-200{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-green-200);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-green-300{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-green-300);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-green-400{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-green-400);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-green-500{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-green-500);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-green-600{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-green-600);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-green-700{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-green-700);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-green-800{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-green-800);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-green-900{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-green-900);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-indigo-50{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-indigo-50);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-indigo-100{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-indigo-100);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-indigo-200{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-indigo-200);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-indigo-300{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-indigo-300);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-indigo-400{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-indigo-400);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-indigo-500{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-indigo-500);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-indigo-600{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-indigo-600);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-indigo-700{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-indigo-700);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-indigo-800{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-indigo-800);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-indigo-900{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-indigo-900);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-orange-50{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-orange-50);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-orange-100{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-orange-100);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-orange-200{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-orange-200);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-orange-300{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-orange-300);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-orange-400{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-orange-400);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-orange-500{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-orange-500);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-orange-600{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-orange-600);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-orange-700{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-orange-700);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-orange-800{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-orange-800);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-orange-900{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-orange-900);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-pink-50{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-pink-50);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-pink-100{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-pink-100);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-pink-200{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-pink-200);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-pink-300{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-pink-300);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-pink-400{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-pink-400);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-pink-500{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-pink-500);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-pink-600{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-pink-600);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-pink-700{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-pink-700);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-pink-800{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-pink-800);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-pink-900{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-pink-900);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-purple-50{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-purple-50);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-purple-100{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-purple-100);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-purple-200{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-purple-200);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-purple-300{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-purple-300);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-purple-400{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-purple-400);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-purple-500{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-purple-500);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-purple-600{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-purple-600);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-purple-700{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-purple-700);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-purple-800{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-purple-800);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-purple-900{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-purple-900);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-red-50{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-red-50);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-red-100{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-red-100);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-red-200{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-red-200);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-red-300{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-red-300);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-red-400{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-red-400);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-red-500{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-red-500);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-red-600{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-red-600);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-red-700{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-red-700);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-red-800{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-red-800);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-red-900{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-red-900);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-rose-50{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-rose-50);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-rose-100{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-rose-100);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-rose-200{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-rose-200);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-rose-300{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-rose-300);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-rose-400{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-rose-400);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-rose-500{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-rose-500);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-rose-600{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-rose-600);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-rose-700{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-rose-700);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-rose-800{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-rose-800);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-rose-900{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-rose-900);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-sky-50{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-sky-50);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-sky-100{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-sky-100);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-sky-200{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-sky-200);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-sky-300{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-sky-300);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-sky-400{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-sky-400);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-sky-500{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-sky-500);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-sky-600{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-sky-600);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-sky-700{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-sky-700);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-sky-800{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-sky-800);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-sky-900{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-sky-900);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-slate-50{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-slate-50);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-slate-100{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-slate-100);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-slate-200{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-slate-200);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-slate-300{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-slate-300);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-slate-400{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-slate-400);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-slate-500{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-slate-500);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-slate-600{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-slate-600);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-slate-700{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-slate-700);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-slate-800{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-slate-800);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-slate-900{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-slate-900);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-teal-50{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-teal-50);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-teal-100{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-teal-100);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-teal-200{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-teal-200);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-teal-300{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-teal-300);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-teal-400{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-teal-400);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-teal-500{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-teal-500);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-teal-600{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-teal-600);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-teal-700{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-teal-700);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-teal-800{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-teal-800);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-teal-900{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-teal-900);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-violet-50{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-violet-50);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-violet-100{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-violet-100);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-violet-200{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-violet-200);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-violet-300{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-violet-300);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-violet-400{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-violet-400);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-violet-500{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-violet-500);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-violet-600{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-violet-600);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-violet-700{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-violet-700);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-violet-800{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-violet-800);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-violet-900{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-violet-900);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-white{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-white);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-yellow-50{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-yellow-50);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-yellow-100{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-yellow-100);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-yellow-200{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-yellow-200);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-yellow-300{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-yellow-300);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-yellow-400{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-yellow-400);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-yellow-500{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-yellow-500);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-yellow-600{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-yellow-600);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-yellow-700{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-yellow-700);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-yellow-800{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-yellow-800);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:border-yellow-900{\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-yellow-900);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-amber-50{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-amber-50);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-amber-100{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-amber-100);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-amber-200{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-amber-200);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-amber-300{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-amber-300);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-amber-400{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-amber-400);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-amber-500{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-amber-500);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-amber-600{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-amber-600);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-amber-700{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-amber-700);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-amber-800{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-amber-800);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-amber-900{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-amber-900);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-black{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-black);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-blue-50{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-blue-50);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-blue-100{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-blue-100);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-blue-200{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-blue-200);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-blue-300{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-blue-300);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-blue-400{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-blue-400);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-blue-500{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-blue-500);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-blue-600{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-blue-600);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-blue-700{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-blue-700);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-blue-800{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-blue-800);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-blue-900{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-blue-900);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-cyan-50{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-cyan-50);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-cyan-100{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-cyan-100);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-cyan-200{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-cyan-200);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-cyan-300{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-cyan-300);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-cyan-400{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-cyan-400);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-cyan-500{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-cyan-500);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-cyan-600{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-cyan-600);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-cyan-700{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-cyan-700);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-cyan-800{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-cyan-800);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-cyan-900{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-cyan-900);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-emerald-50{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-emerald-50);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-emerald-100{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-emerald-100);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-emerald-200{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-emerald-200);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-emerald-300{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-emerald-300);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-emerald-400{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-emerald-400);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-emerald-500{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-emerald-500);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-emerald-600{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-emerald-600);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-emerald-700{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-emerald-700);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-emerald-800{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-emerald-800);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-emerald-900{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-emerald-900);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-fuchsia-50{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-fuchsia-50);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-fuchsia-100{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-fuchsia-100);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-fuchsia-200{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-fuchsia-200);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-fuchsia-300{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-fuchsia-300);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-fuchsia-400{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-fuchsia-400);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-fuchsia-500{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-fuchsia-500);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-fuchsia-600{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-fuchsia-600);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-fuchsia-700{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-fuchsia-700);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-fuchsia-800{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-fuchsia-800);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-fuchsia-900{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-fuchsia-900);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-gray-50{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-gray-50);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-gray-100{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-gray-100);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-gray-200{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-gray-200);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-gray-300{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-gray-300);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-gray-400{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-gray-400);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-gray-500{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-gray-500);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-gray-600{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-gray-600);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-gray-700{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-gray-700);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-gray-800{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-gray-800);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-gray-900{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-gray-900);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-green-50{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-green-50);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-green-100{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-green-100);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-green-200{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-green-200);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-green-300{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-green-300);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-green-400{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-green-400);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-green-500{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-green-500);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-green-600{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-green-600);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-green-700{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-green-700);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-green-800{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-green-800);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-green-900{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-green-900);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-indigo-50{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-indigo-50);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-indigo-100{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-indigo-100);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-indigo-200{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-indigo-200);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-indigo-300{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-indigo-300);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-indigo-400{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-indigo-400);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-indigo-500{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-indigo-500);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-indigo-600{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-indigo-600);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-indigo-700{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-indigo-700);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-indigo-800{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-indigo-800);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-indigo-900{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-indigo-900);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-orange-50{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-orange-50);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-orange-100{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-orange-100);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-orange-200{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-orange-200);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-orange-300{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-orange-300);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-orange-400{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-orange-400);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-orange-500{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-orange-500);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-orange-600{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-orange-600);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-orange-700{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-orange-700);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-orange-800{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-orange-800);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-orange-900{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-orange-900);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-pink-50{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-pink-50);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-pink-50\\/30{\n    &:hover {\n      @media (hover: hover) {\n        background-color: color-mix(in srgb, oklch(97.1% 0.014 343.198) 30%, transparent);\n        @supports (color: color-mix(in lab, red, red)) {\n          background-color: color-mix(in oklab, var(--color-pink-50) 30%, transparent);\n        }\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-pink-50\\/40{\n    &:hover {\n      @media (hover: hover) {\n        background-color: color-mix(in srgb, oklch(97.1% 0.014 343.198) 40%, transparent);\n        @supports (color: color-mix(in lab, red, red)) {\n          background-color: color-mix(in oklab, var(--color-pink-50) 40%, transparent);\n        }\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-pink-50\\/50{\n    &:hover {\n      @media (hover: hover) {\n        background-color: color-mix(in srgb, oklch(97.1% 0.014 343.198) 50%, transparent);\n        @supports (color: color-mix(in lab, red, red)) {\n          background-color: color-mix(in oklab, var(--color-pink-50) 50%, transparent);\n        }\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-pink-100{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-pink-100);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-pink-100\\/70{\n    &:hover {\n      @media (hover: hover) {\n        background-color: color-mix(in srgb, oklch(94.8% 0.028 342.258) 70%, transparent);\n        @supports (color: color-mix(in lab, red, red)) {\n          background-color: color-mix(in oklab, var(--color-pink-100) 70%, transparent);\n        }\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-pink-200{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-pink-200);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-pink-300{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-pink-300);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-pink-400{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-pink-400);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-pink-500{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-pink-500);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-pink-600{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-pink-600);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-pink-700{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-pink-700);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-pink-800{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-pink-800);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-pink-900{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-pink-900);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-purple-50{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-purple-50);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-purple-100{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-purple-100);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-purple-200{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-purple-200);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-purple-300{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-purple-300);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-purple-400{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-purple-400);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-purple-500{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-purple-500);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-purple-600{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-purple-600);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-purple-700{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-purple-700);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-purple-800{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-purple-800);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-purple-900{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-purple-900);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-red-50{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-red-50);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-red-100{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-red-100);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-red-200{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-red-200);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-red-300{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-red-300);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-red-400{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-red-400);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-red-500{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-red-500);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-red-600{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-red-600);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-red-700{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-red-700);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-red-800{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-red-800);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-red-900{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-red-900);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-rose-50{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-rose-50);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-rose-100{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-rose-100);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-rose-200{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-rose-200);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-rose-300{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-rose-300);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-rose-400{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-rose-400);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-rose-500{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-rose-500);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-rose-600{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-rose-600);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-rose-700{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-rose-700);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-rose-800{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-rose-800);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-rose-900{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-rose-900);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-sky-50{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-sky-50);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-sky-100{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-sky-100);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-sky-200{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-sky-200);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-sky-300{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-sky-300);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-sky-400{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-sky-400);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-sky-500{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-sky-500);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-sky-600{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-sky-600);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-sky-700{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-sky-700);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-sky-800{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-sky-800);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-sky-900{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-sky-900);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-slate-50{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-slate-50);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-slate-100{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-slate-100);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-slate-200{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-slate-200);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-slate-300{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-slate-300);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-slate-400{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-slate-400);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-slate-500{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-slate-500);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-slate-600{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-slate-600);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-slate-700{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-slate-700);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-slate-800{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-slate-800);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-slate-900{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-slate-900);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-teal-50{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-teal-50);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-teal-100{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-teal-100);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-teal-200{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-teal-200);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-teal-300{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-teal-300);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-teal-400{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-teal-400);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-teal-500{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-teal-500);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-teal-600{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-teal-600);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-teal-700{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-teal-700);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-teal-800{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-teal-800);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-teal-900{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-teal-900);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-violet-50{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-violet-50);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-violet-100{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-violet-100);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-violet-200{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-violet-200);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-violet-300{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-violet-300);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-violet-400{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-violet-400);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-violet-500{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-violet-500);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-violet-600{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-violet-600);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-violet-700{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-violet-700);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-violet-800{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-violet-800);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-violet-900{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-violet-900);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-white{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-white);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-yellow-50{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-yellow-50);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-yellow-100{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-yellow-100);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-yellow-200{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-yellow-200);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-yellow-300{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-yellow-300);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-yellow-400{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-yellow-400);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-yellow-500{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-yellow-500);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-yellow-600{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-yellow-600);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-yellow-700{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-yellow-700);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-yellow-800{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-yellow-800);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:bg-yellow-900{\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-yellow-900);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:from-fuchsia-600{\n    &:hover {\n      @media (hover: hover) {\n        --tw-gradient-from: var(--color-fuchsia-600);\n        --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:from-pink-600{\n    &:hover {\n      @media (hover: hover) {\n        --tw-gradient-from: var(--color-pink-600);\n        --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:from-rose-700{\n    &:hover {\n      @media (hover: hover) {\n        --tw-gradient-from: var(--color-rose-700);\n        --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:to-pink-600{\n    &:hover {\n      @media (hover: hover) {\n        --tw-gradient-to: var(--color-pink-600);\n        --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:to-red-700{\n    &:hover {\n      @media (hover: hover) {\n        --tw-gradient-to: var(--color-red-700);\n        --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:to-rose-600{\n    &:hover {\n      @media (hover: hover) {\n        --tw-gradient-to: var(--color-rose-600);\n        --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-amber-50{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-amber-50);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-amber-100{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-amber-100);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-amber-200{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-amber-200);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-amber-300{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-amber-300);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-amber-400{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-amber-400);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-amber-500{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-amber-500);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-amber-600{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-amber-600);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-amber-700{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-amber-700);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-amber-800{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-amber-800);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-amber-900{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-amber-900);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-black{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-black);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-blue-50{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-blue-50);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-blue-100{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-blue-100);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-blue-200{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-blue-200);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-blue-300{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-blue-300);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-blue-400{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-blue-400);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-blue-500{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-blue-500);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-blue-600{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-blue-600);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-blue-700{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-blue-700);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-blue-800{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-blue-800);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-blue-900{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-blue-900);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-cyan-50{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-cyan-50);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-cyan-100{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-cyan-100);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-cyan-200{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-cyan-200);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-cyan-300{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-cyan-300);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-cyan-400{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-cyan-400);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-cyan-500{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-cyan-500);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-cyan-600{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-cyan-600);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-cyan-700{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-cyan-700);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-cyan-800{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-cyan-800);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-cyan-900{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-cyan-900);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-emerald-50{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-emerald-50);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-emerald-100{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-emerald-100);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-emerald-200{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-emerald-200);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-emerald-300{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-emerald-300);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-emerald-400{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-emerald-400);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-emerald-500{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-emerald-500);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-emerald-600{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-emerald-600);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-emerald-700{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-emerald-700);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-emerald-800{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-emerald-800);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-emerald-900{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-emerald-900);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-fuchsia-50{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-fuchsia-50);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-fuchsia-100{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-fuchsia-100);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-fuchsia-200{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-fuchsia-200);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-fuchsia-300{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-fuchsia-300);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-fuchsia-400{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-fuchsia-400);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-fuchsia-500{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-fuchsia-500);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-fuchsia-600{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-fuchsia-600);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-fuchsia-700{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-fuchsia-700);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-fuchsia-800{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-fuchsia-800);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-fuchsia-900{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-fuchsia-900);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-gray-50{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-gray-50);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-gray-100{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-gray-100);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-gray-200{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-gray-200);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-gray-300{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-gray-300);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-gray-400{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-gray-400);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-gray-500{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-gray-500);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-gray-600{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-gray-600);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-gray-700{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-gray-700);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-gray-800{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-gray-800);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-gray-900{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-gray-900);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-green-50{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-green-50);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-green-100{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-green-100);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-green-200{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-green-200);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-green-300{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-green-300);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-green-400{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-green-400);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-green-500{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-green-500);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-green-600{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-green-600);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-green-700{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-green-700);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-green-800{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-green-800);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-green-900{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-green-900);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-indigo-50{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-indigo-50);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-indigo-100{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-indigo-100);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-indigo-200{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-indigo-200);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-indigo-300{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-indigo-300);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-indigo-400{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-indigo-400);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-indigo-500{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-indigo-500);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-indigo-600{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-indigo-600);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-indigo-700{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-indigo-700);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-indigo-800{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-indigo-800);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-indigo-900{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-indigo-900);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-orange-50{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-orange-50);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-orange-100{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-orange-100);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-orange-200{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-orange-200);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-orange-300{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-orange-300);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-orange-400{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-orange-400);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-orange-500{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-orange-500);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-orange-600{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-orange-600);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-orange-700{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-orange-700);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-orange-800{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-orange-800);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-orange-900{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-orange-900);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-pink-50{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-pink-50);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-pink-100{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-pink-100);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-pink-200{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-pink-200);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-pink-300{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-pink-300);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-pink-400{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-pink-400);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-pink-500{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-pink-500);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-pink-600{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-pink-600);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-pink-700{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-pink-700);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-pink-800{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-pink-800);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-pink-900{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-pink-900);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-purple-50{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-purple-50);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-purple-100{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-purple-100);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-purple-200{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-purple-200);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-purple-300{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-purple-300);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-purple-400{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-purple-400);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-purple-500{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-purple-500);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-purple-600{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-purple-600);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-purple-700{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-purple-700);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-purple-800{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-purple-800);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-purple-900{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-purple-900);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-red-50{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-red-50);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-red-100{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-red-100);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-red-200{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-red-200);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-red-300{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-red-300);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-red-400{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-red-400);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-red-500{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-red-500);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-red-600{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-red-600);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-red-700{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-red-700);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-red-800{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-red-800);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-red-900{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-red-900);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-rose-50{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-rose-50);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-rose-100{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-rose-100);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-rose-200{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-rose-200);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-rose-300{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-rose-300);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-rose-400{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-rose-400);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-rose-500{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-rose-500);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-rose-600{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-rose-600);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-rose-700{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-rose-700);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-rose-800{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-rose-800);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-rose-900{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-rose-900);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-sky-50{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-sky-50);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-sky-100{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-sky-100);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-sky-200{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-sky-200);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-sky-300{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-sky-300);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-sky-400{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-sky-400);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-sky-500{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-sky-500);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-sky-600{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-sky-600);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-sky-700{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-sky-700);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-sky-800{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-sky-800);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-sky-900{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-sky-900);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-slate-50{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-slate-50);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-slate-100{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-slate-100);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-slate-200{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-slate-200);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-slate-300{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-slate-300);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-slate-400{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-slate-400);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-slate-500{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-slate-500);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-slate-600{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-slate-600);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-slate-700{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-slate-700);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-slate-800{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-slate-800);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-slate-900{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-slate-900);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-teal-50{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-teal-50);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-teal-100{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-teal-100);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-teal-200{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-teal-200);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-teal-300{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-teal-300);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-teal-400{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-teal-400);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-teal-500{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-teal-500);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-teal-600{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-teal-600);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-teal-700{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-teal-700);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-teal-800{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-teal-800);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-teal-900{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-teal-900);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-violet-50{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-violet-50);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-violet-100{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-violet-100);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-violet-200{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-violet-200);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-violet-300{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-violet-300);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-violet-400{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-violet-400);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-violet-500{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-violet-500);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-violet-600{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-violet-600);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-violet-700{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-violet-700);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-violet-800{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-violet-800);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-violet-900{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-violet-900);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-white{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-white);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-yellow-50{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-yellow-50);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-yellow-100{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-yellow-100);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-yellow-200{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-yellow-200);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-yellow-300{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-yellow-300);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-yellow-400{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-yellow-400);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-yellow-500{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-yellow-500);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-yellow-600{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-yellow-600);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-yellow-700{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-yellow-700);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-yellow-800{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-yellow-800);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:text-yellow-900{\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-yellow-900);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:opacity-100{\n    &:hover {\n      @media (hover: hover) {\n        opacity: 100%;\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:shadow-\\[0_0_10px_rgba\\(99\\,102\\,241\\,0\\.5\\)\\]{\n    &:hover {\n      @media (hover: hover) {\n        --tw-shadow: 0 0 10px var(--tw-shadow-color, rgba(99,102,241,0.5));\n        box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:shadow-\\[0_0_18px_rgba\\(244\\,114\\,182\\,0\\.65\\)\\]{\n    &:hover {\n      @media (hover: hover) {\n        --tw-shadow: 0 0 18px var(--tw-shadow-color, rgba(244,114,182,0.65));\n        box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:shadow-md{\n    &:hover {\n      @media (hover: hover) {\n        --tw-shadow: 0 4px 6px -1px var(--tw-shadow-color, rgb(0 0 0 / 0.1)), 0 2px 4px -2px var(--tw-shadow-color, rgb(0 0 0 / 0.1));\n        box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:brightness-95{\n    &:hover {\n      @media (hover: hover) {\n        --tw-brightness: brightness(95%);\n        filter: var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .hover\\:brightness-105{\n    &:hover {\n      @media (hover: hover) {\n        --tw-brightness: brightness(105%);\n        filter: var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,);\n      }\n    }\n  }\n  #class2-vietnamese-runtime .focus\\:border-pink-400{\n    &:focus {\n      border-color: var(--color-pink-400);\n    }\n  }\n  #class2-vietnamese-runtime .active\\:scale-95{\n    &:active {\n      --tw-scale-x: 95%;\n      --tw-scale-y: 95%;\n      --tw-scale-z: 95%;\n      scale: var(--tw-scale-x) var(--tw-scale-y);\n    }\n  }\n  #class2-vietnamese-runtime .disabled\\:cursor-not-allowed{\n    &:disabled {\n      cursor: not-allowed;\n    }\n  }\n  #class2-vietnamese-runtime .disabled\\:opacity-40{\n    &:disabled {\n      opacity: 40%;\n    }\n  }\n  #class2-vietnamese-runtime .sm\\:col-span-2{\n    @media (width >= 40rem) {\n      grid-column: span 2 / span 2;\n    }\n  }\n  #class2-vietnamese-runtime .sm\\:hidden{\n    @media (width >= 40rem) {\n      display: none;\n    }\n  }\n  #class2-vietnamese-runtime .sm\\:inline{\n    @media (width >= 40rem) {\n      display: inline;\n    }\n  }\n  #class2-vietnamese-runtime .sm\\:grid-cols-2{\n    @media (width >= 40rem) {\n      grid-template-columns: repeat(2, minmax(0, 1fr));\n    }\n  }\n  #class2-vietnamese-runtime .sm\\:grid-cols-3{\n    @media (width >= 40rem) {\n      grid-template-columns: repeat(3, minmax(0, 1fr));\n    }\n  }\n  #class2-vietnamese-runtime .sm\\:grid-cols-4{\n    @media (width >= 40rem) {\n      grid-template-columns: repeat(4, minmax(0, 1fr));\n    }\n  }\n  #class2-vietnamese-runtime .sm\\:flex-row{\n    @media (width >= 40rem) {\n      flex-direction: row;\n    }\n  }\n  #class2-vietnamese-runtime .sm\\:items-center{\n    @media (width >= 40rem) {\n      align-items: center;\n    }\n  }\n  #class2-vietnamese-runtime .sm\\:p-4{\n    @media (width >= 40rem) {\n      padding: calc(var(--spacing) * 4);\n    }\n  }\n  #class2-vietnamese-runtime .sm\\:p-5{\n    @media (width >= 40rem) {\n      padding: calc(var(--spacing) * 5);\n    }\n  }\n  #class2-vietnamese-runtime .sm\\:p-6{\n    @media (width >= 40rem) {\n      padding: calc(var(--spacing) * 6);\n    }\n  }\n  #class2-vietnamese-runtime .sm\\:text-3xl{\n    @media (width >= 40rem) {\n      font-size: var(--text-3xl);\n      line-height: var(--tw-leading, var(--text-3xl--line-height));\n    }\n  }\n  #class2-vietnamese-runtime .sm\\:text-base{\n    @media (width >= 40rem) {\n      font-size: var(--text-base);\n      line-height: var(--tw-leading, var(--text-base--line-height));\n    }\n  }\n  #class2-vietnamese-runtime .sm\\:text-lg{\n    @media (width >= 40rem) {\n      font-size: var(--text-lg);\n      line-height: var(--tw-leading, var(--text-lg--line-height));\n    }\n  }\n  #class2-vietnamese-runtime .sm\\:text-sm{\n    @media (width >= 40rem) {\n      font-size: var(--text-sm);\n      line-height: var(--tw-leading, var(--text-sm--line-height));\n    }\n  }\n  #class2-vietnamese-runtime .sm\\:text-xl{\n    @media (width >= 40rem) {\n      font-size: var(--text-xl);\n      line-height: var(--tw-leading, var(--text-xl--line-height));\n    }\n  }\n  #class2-vietnamese-runtime .sm\\:text-xs{\n    @media (width >= 40rem) {\n      font-size: var(--text-xs);\n      line-height: var(--tw-leading, var(--text-xs--line-height));\n    }\n  }\n  #class2-vietnamese-runtime .md\\:mx-2{\n    @media (width >= 48rem) {\n      margin-inline: calc(var(--spacing) * 2);\n    }\n  }\n  #class2-vietnamese-runtime .md\\:mt-6{\n    @media (width >= 48rem) {\n      margin-top: calc(var(--spacing) * 6);\n    }\n  }\n  #class2-vietnamese-runtime .md\\:mr-0\\.5{\n    @media (width >= 48rem) {\n      margin-right: calc(var(--spacing) * 0.5);\n    }\n  }\n  #class2-vietnamese-runtime .md\\:block{\n    @media (width >= 48rem) {\n      display: block;\n    }\n  }\n  #class2-vietnamese-runtime .md\\:inline{\n    @media (width >= 48rem) {\n      display: inline;\n    }\n  }\n  #class2-vietnamese-runtime .md\\:h-7{\n    @media (width >= 48rem) {\n      height: calc(var(--spacing) * 7);\n    }\n  }\n  #class2-vietnamese-runtime .md\\:h-16{\n    @media (width >= 48rem) {\n      height: calc(var(--spacing) * 16);\n    }\n  }\n  #class2-vietnamese-runtime .md\\:h-\\[53px\\]{\n    @media (width >= 48rem) {\n      height: 53px;\n    }\n  }\n  #class2-vietnamese-runtime .md\\:h-\\[166px\\]{\n    @media (width >= 48rem) {\n      height: 166px;\n    }\n  }\n  #class2-vietnamese-runtime .md\\:min-h-\\[535px\\]{\n    @media (width >= 48rem) {\n      min-height: 535px;\n    }\n  }\n  #class2-vietnamese-runtime .md\\:min-h-\\[560px\\]{\n    @media (width >= 48rem) {\n      min-height: 560px;\n    }\n  }\n  #class2-vietnamese-runtime .md\\:w-7{\n    @media (width >= 48rem) {\n      width: calc(var(--spacing) * 7);\n    }\n  }\n  #class2-vietnamese-runtime .md\\:w-16{\n    @media (width >= 48rem) {\n      width: calc(var(--spacing) * 16);\n    }\n  }\n  #class2-vietnamese-runtime .md\\:w-\\[40\\%\\]{\n    @media (width >= 48rem) {\n      width: 40%;\n    }\n  }\n  #class2-vietnamese-runtime .md\\:w-\\[48px\\]{\n    @media (width >= 48rem) {\n      width: 48px;\n    }\n  }\n  #class2-vietnamese-runtime .md\\:w-\\[60\\%\\]{\n    @media (width >= 48rem) {\n      width: 60%;\n    }\n  }\n  #class2-vietnamese-runtime .md\\:max-w-\\[62rem\\]{\n    @media (width >= 48rem) {\n      max-width: 62rem;\n    }\n  }\n  #class2-vietnamese-runtime .md\\:min-w-\\[104px\\]{\n    @media (width >= 48rem) {\n      min-width: 104px;\n    }\n  }\n  #class2-vietnamese-runtime .md\\:min-w-\\[126px\\]{\n    @media (width >= 48rem) {\n      min-width: 126px;\n    }\n  }\n  #class2-vietnamese-runtime .md\\:min-w-\\[190px\\]{\n    @media (width >= 48rem) {\n      min-width: 190px;\n    }\n  }\n  #class2-vietnamese-runtime .md\\:columns-2{\n    @media (width >= 48rem) {\n      columns: 2;\n    }\n  }\n  #class2-vietnamese-runtime .md\\:grid-cols-2{\n    @media (width >= 48rem) {\n      grid-template-columns: repeat(2, minmax(0, 1fr));\n    }\n  }\n  #class2-vietnamese-runtime .md\\:grid-cols-3{\n    @media (width >= 48rem) {\n      grid-template-columns: repeat(3, minmax(0, 1fr));\n    }\n  }\n  #class2-vietnamese-runtime .md\\:grid-cols-4{\n    @media (width >= 48rem) {\n      grid-template-columns: repeat(4, minmax(0, 1fr));\n    }\n  }\n  #class2-vietnamese-runtime .md\\:grid-cols-\\[48\\%_52\\%\\]{\n    @media (width >= 48rem) {\n      grid-template-columns: 48% 52%;\n    }\n  }\n  #class2-vietnamese-runtime .md\\:flex-row{\n    @media (width >= 48rem) {\n      flex-direction: row;\n    }\n  }\n  #class2-vietnamese-runtime .md\\:gap-3{\n    @media (width >= 48rem) {\n      gap: calc(var(--spacing) * 3);\n    }\n  }\n  #class2-vietnamese-runtime .md\\:gap-4{\n    @media (width >= 48rem) {\n      gap: calc(var(--spacing) * 4);\n    }\n  }\n  #class2-vietnamese-runtime .md\\:gap-6{\n    @media (width >= 48rem) {\n      gap: calc(var(--spacing) * 6);\n    }\n  }\n  #class2-vietnamese-runtime .md\\:gap-\\[7px\\]{\n    @media (width >= 48rem) {\n      gap: 7px;\n    }\n  }\n  #class2-vietnamese-runtime .md\\:gap-\\[11px\\]{\n    @media (width >= 48rem) {\n      gap: 11px;\n    }\n  }\n  #class2-vietnamese-runtime .md\\:space-y-2{\n    @media (width >= 48rem) {\n      :where(& > :not(:last-child)) {\n        --tw-space-y-reverse: 0;\n        margin-block-start: calc(calc(var(--spacing) * 2) * var(--tw-space-y-reverse));\n        margin-block-end: calc(calc(var(--spacing) * 2) * calc(1 - var(--tw-space-y-reverse)));\n      }\n    }\n  }\n  #class2-vietnamese-runtime .md\\:space-y-\\[7px\\]{\n    @media (width >= 48rem) {\n      :where(& > :not(:last-child)) {\n        --tw-space-y-reverse: 0;\n        margin-block-start: calc(7px * var(--tw-space-y-reverse));\n        margin-block-end: calc(7px * calc(1 - var(--tw-space-y-reverse)));\n      }\n    }\n  }\n  #class2-vietnamese-runtime .md\\:gap-x-6{\n    @media (width >= 48rem) {\n      column-gap: calc(var(--spacing) * 6);\n    }\n  }\n  #class2-vietnamese-runtime .md\\:p-2{\n    @media (width >= 48rem) {\n      padding: calc(var(--spacing) * 2);\n    }\n  }\n  #class2-vietnamese-runtime .md\\:p-3{\n    @media (width >= 48rem) {\n      padding: calc(var(--spacing) * 3);\n    }\n  }\n  #class2-vietnamese-runtime .md\\:p-3\\.5{\n    @media (width >= 48rem) {\n      padding: calc(var(--spacing) * 3.5);\n    }\n  }\n  #class2-vietnamese-runtime .md\\:p-4{\n    @media (width >= 48rem) {\n      padding: calc(var(--spacing) * 4);\n    }\n  }\n  #class2-vietnamese-runtime .md\\:p-5{\n    @media (width >= 48rem) {\n      padding: calc(var(--spacing) * 5);\n    }\n  }\n  #class2-vietnamese-runtime .md\\:p-6{\n    @media (width >= 48rem) {\n      padding: calc(var(--spacing) * 6);\n    }\n  }\n  #class2-vietnamese-runtime .md\\:p-7{\n    @media (width >= 48rem) {\n      padding: calc(var(--spacing) * 7);\n    }\n  }\n  #class2-vietnamese-runtime .md\\:p-\\[11px\\]{\n    @media (width >= 48rem) {\n      padding: 11px;\n    }\n  }\n  #class2-vietnamese-runtime .md\\:px-2\\.5{\n    @media (width >= 48rem) {\n      padding-inline: calc(var(--spacing) * 2.5);\n    }\n  }\n  #class2-vietnamese-runtime .md\\:px-4{\n    @media (width >= 48rem) {\n      padding-inline: calc(var(--spacing) * 4);\n    }\n  }\n  #class2-vietnamese-runtime .md\\:px-5{\n    @media (width >= 48rem) {\n      padding-inline: calc(var(--spacing) * 5);\n    }\n  }\n  #class2-vietnamese-runtime .md\\:px-8{\n    @media (width >= 48rem) {\n      padding-inline: calc(var(--spacing) * 8);\n    }\n  }\n  #class2-vietnamese-runtime .md\\:px-9{\n    @media (width >= 48rem) {\n      padding-inline: calc(var(--spacing) * 9);\n    }\n  }\n  #class2-vietnamese-runtime .md\\:px-\\[9px\\]{\n    @media (width >= 48rem) {\n      padding-inline: 9px;\n    }\n  }\n  #class2-vietnamese-runtime .md\\:px-\\[11px\\]{\n    @media (width >= 48rem) {\n      padding-inline: 11px;\n    }\n  }\n  #class2-vietnamese-runtime .md\\:px-\\[13px\\]{\n    @media (width >= 48rem) {\n      padding-inline: 13px;\n    }\n  }\n  #class2-vietnamese-runtime .md\\:py-2\\.5{\n    @media (width >= 48rem) {\n      padding-block: calc(var(--spacing) * 2.5);\n    }\n  }\n  #class2-vietnamese-runtime .md\\:py-3{\n    @media (width >= 48rem) {\n      padding-block: calc(var(--spacing) * 3);\n    }\n  }\n  #class2-vietnamese-runtime .md\\:py-4{\n    @media (width >= 48rem) {\n      padding-block: calc(var(--spacing) * 4);\n    }\n  }\n  #class2-vietnamese-runtime .md\\:py-5{\n    @media (width >= 48rem) {\n      padding-block: calc(var(--spacing) * 5);\n    }\n  }\n  #class2-vietnamese-runtime .md\\:py-7{\n    @media (width >= 48rem) {\n      padding-block: calc(var(--spacing) * 7);\n    }\n  }\n  #class2-vietnamese-runtime .md\\:py-9{\n    @media (width >= 48rem) {\n      padding-block: calc(var(--spacing) * 9);\n    }\n  }\n  #class2-vietnamese-runtime .md\\:py-\\[5px\\]{\n    @media (width >= 48rem) {\n      padding-block: 5px;\n    }\n  }\n  #class2-vietnamese-runtime .md\\:text-left{\n    @media (width >= 48rem) {\n      text-align: left;\n    }\n  }\n  #class2-vietnamese-runtime .md\\:text-2xl{\n    @media (width >= 48rem) {\n      font-size: var(--text-2xl);\n      line-height: var(--tw-leading, var(--text-2xl--line-height));\n    }\n  }\n  #class2-vietnamese-runtime .md\\:text-3xl{\n    @media (width >= 48rem) {\n      font-size: var(--text-3xl);\n      line-height: var(--tw-leading, var(--text-3xl--line-height));\n    }\n  }\n  #class2-vietnamese-runtime .md\\:text-4xl{\n    @media (width >= 48rem) {\n      font-size: var(--text-4xl);\n      line-height: var(--tw-leading, var(--text-4xl--line-height));\n    }\n  }\n  #class2-vietnamese-runtime .md\\:text-5xl{\n    @media (width >= 48rem) {\n      font-size: var(--text-5xl);\n      line-height: var(--tw-leading, var(--text-5xl--line-height));\n    }\n  }\n  #class2-vietnamese-runtime .md\\:text-6xl{\n    @media (width >= 48rem) {\n      font-size: var(--text-6xl);\n      line-height: var(--tw-leading, var(--text-6xl--line-height));\n    }\n  }\n  #class2-vietnamese-runtime .md\\:text-7xl{\n    @media (width >= 48rem) {\n      font-size: var(--text-7xl);\n      line-height: var(--tw-leading, var(--text-7xl--line-height));\n    }\n  }\n  #class2-vietnamese-runtime .md\\:text-base{\n    @media (width >= 48rem) {\n      font-size: var(--text-base);\n      line-height: var(--tw-leading, var(--text-base--line-height));\n    }\n  }\n  #class2-vietnamese-runtime .md\\:text-lg{\n    @media (width >= 48rem) {\n      font-size: var(--text-lg);\n      line-height: var(--tw-leading, var(--text-lg--line-height));\n    }\n  }\n  #class2-vietnamese-runtime .md\\:text-sm{\n    @media (width >= 48rem) {\n      font-size: var(--text-sm);\n      line-height: var(--tw-leading, var(--text-sm--line-height));\n    }\n  }\n  #class2-vietnamese-runtime .md\\:text-xl{\n    @media (width >= 48rem) {\n      font-size: var(--text-xl);\n      line-height: var(--tw-leading, var(--text-xl--line-height));\n    }\n  }\n  #class2-vietnamese-runtime .md\\:text-xs{\n    @media (width >= 48rem) {\n      font-size: var(--text-xs);\n      line-height: var(--tw-leading, var(--text-xs--line-height));\n    }\n  }\n  #class2-vietnamese-runtime .md\\:text-\\[1\\.35rem\\]{\n    @media (width >= 48rem) {\n      font-size: 1.35rem;\n    }\n  }\n  #class2-vietnamese-runtime .md\\:text-\\[2\\.03rem\\]{\n    @media (width >= 48rem) {\n      font-size: 2.03rem;\n    }\n  }\n  #class2-vietnamese-runtime .md\\:text-\\[2\\.6rem\\]{\n    @media (width >= 48rem) {\n      font-size: 2.6rem;\n    }\n  }\n  #class2-vietnamese-runtime .md\\:text-\\[2\\.15rem\\]{\n    @media (width >= 48rem) {\n      font-size: 2.15rem;\n    }\n  }\n  #class2-vietnamese-runtime .md\\:text-\\[2\\.45rem\\]{\n    @media (width >= 48rem) {\n      font-size: 2.45rem;\n    }\n  }\n  #class2-vietnamese-runtime .md\\:text-\\[2\\.75rem\\]{\n    @media (width >= 48rem) {\n      font-size: 2.75rem;\n    }\n  }\n  #class2-vietnamese-runtime .md\\:text-\\[3\\.05rem\\]{\n    @media (width >= 48rem) {\n      font-size: 3.05rem;\n    }\n  }\n  #class2-vietnamese-runtime .md\\:text-\\[3\\.65rem\\]{\n    @media (width >= 48rem) {\n      font-size: 3.65rem;\n    }\n  }\n  #class2-vietnamese-runtime .md\\:text-\\[10px\\]{\n    @media (width >= 48rem) {\n      font-size: 16px;\n    }\n  }\n  #class2-vietnamese-runtime .md\\:text-\\[11px\\]{\n    @media (width >= 48rem) {\n      font-size: 16px;\n    }\n  }\n  #class2-vietnamese-runtime .md\\:text-\\[12px\\]{\n    @media (width >= 48rem) {\n      font-size: 16px;\n    }\n  }\n  #class2-vietnamese-runtime .md\\:text-\\[13px\\]{\n    @media (width >= 48rem) {\n      font-size: 16px;\n    }\n  }\n  #class2-vietnamese-runtime .md\\:text-\\[15px\\]{\n    @media (width >= 48rem) {\n      font-size: 16px;\n    }\n  }\n  #class2-vietnamese-runtime .md\\:text-\\[17px\\]{\n    @media (width >= 48rem) {\n      font-size: 17px;\n    }\n  }\n  #class2-vietnamese-runtime .md\\:text-\\[18px\\]{\n    @media (width >= 48rem) {\n      font-size: 18px;\n    }\n  }\n  #class2-vietnamese-runtime .md\\:text-\\[19px\\]{\n    @media (width >= 48rem) {\n      font-size: 19px;\n    }\n  }\n  #class2-vietnamese-runtime .md\\:text-\\[24px\\]{\n    @media (width >= 48rem) {\n      font-size: 24px;\n    }\n  }\n  #class2-vietnamese-runtime .md\\:text-\\[33px\\]{\n    @media (width >= 48rem) {\n      font-size: 33px;\n    }\n  }\n  #class2-vietnamese-runtime .md\\:text-\\[40px\\]{\n    @media (width >= 48rem) {\n      font-size: 40px;\n    }\n  }\n  #class2-vietnamese-runtime .lg\\:col-span-3{\n    @media (width >= 64rem) {\n      grid-column: span 3 / span 3;\n    }\n  }\n  #class2-vietnamese-runtime .lg\\:grid-cols-3{\n    @media (width >= 64rem) {\n      grid-template-columns: repeat(3, minmax(0, 1fr));\n    }\n  }\n  #class2-vietnamese-runtime .lg\\:grid-cols-4{\n    @media (width >= 64rem) {\n      grid-template-columns: repeat(4, minmax(0, 1fr));\n    }\n  }\n  #class2-vietnamese-runtime .lg\\:grid-cols-6{\n    @media (width >= 64rem) {\n      grid-template-columns: repeat(6, minmax(0, 1fr));\n    }\n  }\n  #class2-vietnamese-runtime .lg\\:text-lg{\n    @media (width >= 64rem) {\n      font-size: var(--text-lg);\n      line-height: var(--tw-leading, var(--text-lg--line-height));\n    }\n  }\n  #class2-vietnamese-runtime .xl\\:grid-cols-8{\n    @media (width >= 80rem) {\n      grid-template-columns: repeat(8, minmax(0, 1fr));\n    }\n  }\n}\n@property --tw-translate-x{\n  syntax: \"*\";\n  inherits: false;\n  initial-value: 0;\n}\n@property --tw-translate-y{\n  syntax: \"*\";\n  inherits: false;\n  initial-value: 0;\n}\n@property --tw-translate-z{\n  syntax: \"*\";\n  inherits: false;\n  initial-value: 0;\n}\n@property --tw-scale-x{\n  syntax: \"*\";\n  inherits: false;\n  initial-value: 1;\n}\n@property --tw-scale-y{\n  syntax: \"*\";\n  inherits: false;\n  initial-value: 1;\n}\n@property --tw-scale-z{\n  syntax: \"*\";\n  inherits: false;\n  initial-value: 1;\n}\n@property --tw-space-y-reverse{\n  syntax: \"*\";\n  inherits: false;\n  initial-value: 0;\n}\n@property --tw-space-x-reverse{\n  syntax: \"*\";\n  inherits: false;\n  initial-value: 0;\n}\n@property --tw-divide-x-reverse{\n  syntax: \"*\";\n  inherits: false;\n  initial-value: 0;\n}\n@property --tw-border-style{\n  syntax: \"*\";\n  inherits: false;\n  initial-value: solid;\n}\n@property --tw-divide-y-reverse{\n  syntax: \"*\";\n  inherits: false;\n  initial-value: 0;\n}\n@property --tw-gradient-position{\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-gradient-from{\n  syntax: \"<color>\";\n  inherits: false;\n  initial-value: #0000;\n}\n@property --tw-gradient-via{\n  syntax: \"<color>\";\n  inherits: false;\n  initial-value: #0000;\n}\n@property --tw-gradient-to{\n  syntax: \"<color>\";\n  inherits: false;\n  initial-value: #0000;\n}\n@property --tw-gradient-stops{\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-gradient-via-stops{\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-gradient-from-position{\n  syntax: \"<length-percentage>\";\n  inherits: false;\n  initial-value: 0%;\n}\n@property --tw-gradient-via-position{\n  syntax: \"<length-percentage>\";\n  inherits: false;\n  initial-value: 50%;\n}\n@property --tw-gradient-to-position{\n  syntax: \"<length-percentage>\";\n  inherits: false;\n  initial-value: 100%;\n}\n@property --tw-leading{\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-font-weight{\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-tracking{\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-shadow{\n  syntax: \"*\";\n  inherits: false;\n  initial-value: 0 0 #0000;\n}\n@property --tw-shadow-color{\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-shadow-alpha{\n  syntax: \"<percentage>\";\n  inherits: false;\n  initial-value: 100%;\n}\n@property --tw-inset-shadow{\n  syntax: \"*\";\n  inherits: false;\n  initial-value: 0 0 #0000;\n}\n@property --tw-inset-shadow-color{\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-inset-shadow-alpha{\n  syntax: \"<percentage>\";\n  inherits: false;\n  initial-value: 100%;\n}\n@property --tw-ring-color{\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-ring-shadow{\n  syntax: \"*\";\n  inherits: false;\n  initial-value: 0 0 #0000;\n}\n@property --tw-inset-ring-color{\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-inset-ring-shadow{\n  syntax: \"*\";\n  inherits: false;\n  initial-value: 0 0 #0000;\n}\n@property --tw-ring-inset{\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-ring-offset-width{\n  syntax: \"<length>\";\n  inherits: false;\n  initial-value: 0px;\n}\n@property --tw-ring-offset-color{\n  syntax: \"*\";\n  inherits: false;\n  initial-value: #fff;\n}\n@property --tw-ring-offset-shadow{\n  syntax: \"*\";\n  inherits: false;\n  initial-value: 0 0 #0000;\n}\n@property --tw-backdrop-blur{\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-backdrop-brightness{\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-backdrop-contrast{\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-backdrop-grayscale{\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-backdrop-hue-rotate{\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-backdrop-invert{\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-backdrop-opacity{\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-backdrop-saturate{\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-backdrop-sepia{\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-duration{\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-ease{\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-blur{\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-brightness{\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-contrast{\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-grayscale{\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-hue-rotate{\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-invert{\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-opacity{\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-saturate{\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-sepia{\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-drop-shadow{\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-drop-shadow-color{\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-drop-shadow-alpha{\n  syntax: \"<percentage>\";\n  inherits: false;\n  initial-value: 100%;\n}\n@property --tw-drop-shadow-size{\n  syntax: \"*\";\n  inherits: false;\n}\n@layer properties{\n  @supports ((-webkit-hyphens: none) and (not (margin-trim: inline))) or ((-moz-orient: inline) and (not (color:rgb(from red r g b)))){\n    #class2-vietnamese-runtime *,\n#class2-vietnamese-runtime ::before,\n#class2-vietnamese-runtime ::after,\n#class2-vietnamese-runtime ::backdrop{\n      --tw-translate-x: 0;\n      --tw-translate-y: 0;\n      --tw-translate-z: 0;\n      --tw-scale-x: 1;\n      --tw-scale-y: 1;\n      --tw-scale-z: 1;\n      --tw-space-y-reverse: 0;\n      --tw-space-x-reverse: 0;\n      --tw-divide-x-reverse: 0;\n      --tw-border-style: solid;\n      --tw-divide-y-reverse: 0;\n      --tw-gradient-position: initial;\n      --tw-gradient-from: #0000;\n      --tw-gradient-via: #0000;\n      --tw-gradient-to: #0000;\n      --tw-gradient-stops: initial;\n      --tw-gradient-via-stops: initial;\n      --tw-gradient-from-position: 0%;\n      --tw-gradient-via-position: 50%;\n      --tw-gradient-to-position: 100%;\n      --tw-leading: initial;\n      --tw-font-weight: initial;\n      --tw-tracking: initial;\n      --tw-shadow: 0 0 #0000;\n      --tw-shadow-color: initial;\n      --tw-shadow-alpha: 100%;\n      --tw-inset-shadow: 0 0 #0000;\n      --tw-inset-shadow-color: initial;\n      --tw-inset-shadow-alpha: 100%;\n      --tw-ring-color: initial;\n      --tw-ring-shadow: 0 0 #0000;\n      --tw-inset-ring-color: initial;\n      --tw-inset-ring-shadow: 0 0 #0000;\n      --tw-ring-inset: initial;\n      --tw-ring-offset-width: 0px;\n      --tw-ring-offset-color: #fff;\n      --tw-ring-offset-shadow: 0 0 #0000;\n      --tw-backdrop-blur: initial;\n      --tw-backdrop-brightness: initial;\n      --tw-backdrop-contrast: initial;\n      --tw-backdrop-grayscale: initial;\n      --tw-backdrop-hue-rotate: initial;\n      --tw-backdrop-invert: initial;\n      --tw-backdrop-opacity: initial;\n      --tw-backdrop-saturate: initial;\n      --tw-backdrop-sepia: initial;\n      --tw-duration: initial;\n      --tw-ease: initial;\n      --tw-blur: initial;\n      --tw-brightness: initial;\n      --tw-contrast: initial;\n      --tw-grayscale: initial;\n      --tw-hue-rotate: initial;\n      --tw-invert: initial;\n      --tw-opacity: initial;\n      --tw-saturate: initial;\n      --tw-sepia: initial;\n      --tw-drop-shadow: initial;\n      --tw-drop-shadow-color: initial;\n      --tw-drop-shadow-alpha: 100%;\n      --tw-drop-shadow-size: initial;\n    }\n  }\n}\n\n\n        #class2-vietnamese-runtime{ background: #ffffff; }\n        #class2-vietnamese-runtime{\n            font-family: \"Quicksand\", \"Nunito\", sans-serif;\n            background: #ffffff;\n            color: #4a4a4a;\n            user-select: none;\n            min-height: 100vh;\n            display: flex;\n            flex-direction: column;\n            align-items: center;\n            justify-content: flex-start;\n        }\n        #class2-vietnamese-runtime .pastel-card{\n            background: #ffffff;\n            border-radius: 28px;\n            box-shadow: 0 12px 30px rgba(236, 72, 153, 0.12);\n            border: 3px solid #fbcfe8;\n        }\n        #class2-vietnamese-runtime .pastel-btn{\n            transition: all 0.2s ease;\n            box-shadow: 0 3px 10px rgba(0,0,0,0.05);\n        }\n        #class2-vietnamese-runtime .pastel-btn:hover{\n            transform: translateY(-2px);\n            box-shadow: 0 5px 15px rgba(0,0,0,0.09);\n        }\n        #class2-vietnamese-runtime .pastel-btn:active{ transform: translateY(1px); }\n        @keyframes tv2kf_float{\n            0%, 100% { transform: translateY(0px); }\n            50% { transform: translateY(-6px); }\n        }\n        #class2-vietnamese-runtime .floating{ animation: tv2kf_float 3s ease-in-out infinite; }\n        @keyframes tv2kf_sway{\n            0%, 100% { transform: translateY(0px) rotate(0deg); }\n            25% { transform: translateY(-5px) rotate(-7deg); }\n            75% { transform: translateY(-5px) rotate(7deg); }\n        }\n        #class2-vietnamese-runtime .swaying{\n            animation: tv2kf_sway 2.4s ease-in-out infinite;\n            display: inline-block;\n            transform-origin: bottom center;\n        }\n        @keyframes tv2kf_pulse-glow{\n            0%, 100% { filter: drop-shadow(0 0 6px rgba(236, 72, 153, 0.6)); transform: scale(1); }\n            50% { filter: drop-shadow(0 0 16px rgba(236, 72, 153, 0.9)); transform: scale(1.04); }\n        }\n        #class2-vietnamese-runtime .node-current{\n            animation: tv2kf_pulse-glow 2s infinite ease-in-out;\n            transform-origin: center;\n        }\n        #class2-vietnamese-runtime ::-webkit-scrollbar{ width: 3px; height: 3px; }\n        #class2-vietnamese-runtime ::-webkit-scrollbar-track{ background: #fdf2f8; }\n        #class2-vietnamese-runtime ::-webkit-scrollbar-thumb{ background: #f472b6; border-radius: 10px; }\n        #class2-vietnamese-runtime ::-webkit-scrollbar-thumb:hover{ background: #ec4899; }\n\n\n        @media (max-width: 767px){\n            #class2-vietnamese-runtime #screen-login img[src=\"icon-512.png\"]{\n                border: none !important;\n                border-radius: 0 !important;\n                box-shadow: none !important;\n                background: transparent !important;\n            }\n\n            #class2-vietnamese-runtime .app-main-header{\n                display: grid !important;\n                grid-template-columns: auto minmax(0, 1fr) auto auto auto;\n                grid-template-rows: auto auto;\n                gap: 0.35rem 0.35rem !important;\n                align-items: center;\n                padding: 0.35rem 0.45rem !important;\n            }\n\n            #class2-vietnamese-runtime #header-nav-zone,\n#class2-vietnamese-runtime #header-info-zone{\n                display: contents !important;\n            }\n\n            #class2-vietnamese-runtime #btn-header-home{\n                grid-row: 1;\n                grid-column: 1;\n            }\n\n            #class2-vietnamese-runtime #header-learning-tabs{\n                grid-row: 1;\n                grid-column: 2;\n                min-width: 0;\n                overflow-x: auto;\n                overflow-y: hidden;\n                scrollbar-width: none;\n                margin-left: 0;\n            }\n            #class2-vietnamese-runtime #header-learning-tabs::-webkit-scrollbar{ display: none; }\n\n            #class2-vietnamese-runtime #header-level2-icon{ display: none !important; }\n            #class2-vietnamese-runtime #header-level2-tab > button{\n                padding-left: 0.5rem !important;\n                padding-right: 0.5rem !important;\n                column-gap: 0 !important;\n            }\n\n            #class2-vietnamese-runtime #btn-bai-hoc-header{\n                grid-row: 1;\n                grid-column: 3;\n                justify-self: end;\n            }\n\n            #class2-vietnamese-runtime #btn-progress-header{\n                grid-row: 1;\n                grid-column: 4;\n                justify-self: end;\n            }\n\n            #class2-vietnamese-runtime #btn-minigame-header{\n                grid-row: 1;\n                grid-column: 5;\n                justify-self: end;\n            }\n\n            #class2-vietnamese-runtime #btn-bai-hoc-header,\n#class2-vietnamese-runtime #btn-progress-header,\n#class2-vietnamese-runtime #btn-minigame-header{\n                width: 2.5rem !important;\n                min-width: 2.5rem !important;\n                padding-left: 0 !important;\n                padding-right: 0 !important;\n                justify-content: center !important;\n            }\n\n            #class2-vietnamese-runtime #btn-toggle-autospeech{\n                grid-row: 2;\n                grid-column: 1;\n                justify-self: start;\n                margin: 0;\n            }\n\n            #class2-vietnamese-runtime #header-star-box{\n                grid-row: 2;\n                grid-column: 1;\n                justify-self: start;\n                margin-left: 0 !important;\n                transform: translateX(2.7rem);\n            }\n\n            #class2-vietnamese-runtime #user-info-box{\n                grid-row: 2;\n                grid-column: 2 / 6;\n                justify-self: end;\n                width: auto;\n                min-width: 0;\n                margin-left: auto;\n                text-align: right;\n            }\n\n            #class2-vietnamese-runtime #user-info-box > div,\n#class2-vietnamese-runtime #user-info-box > span{ margin-left: auto; }\n\n            #class2-vietnamese-runtime #user-info-box > *{ max-width: 100%; }\n        }\n\n        @media print{\n            #class2-vietnamese-runtime *{ visibility: hidden; }\n            #class2-vietnamese-runtime #printable-report-area,\n#class2-vietnamese-runtime #printable-report-area *{ visibility: visible; }\n            #class2-vietnamese-runtime #printable-report-area{\n                position: absolute !important;\n                left: 0 !important;\n                top: 0 !important;\n                width: 100% !important;\n                background: white !important;\n                padding: 10px !important;\n            }\n            #class2-vietnamese-runtime .no-print{ display: none !important; }\n            #class2-vietnamese-runtime .page-break-1{ page-break-after: always; break-after: page; }\n            #class2-vietnamese-runtime .page-break-2{ page-break-before: always; break-before: page; page-break-after: always; break-after: page; }\n            #class2-vietnamese-runtime .page-break-3{ page-break-before: always; break-before: page; }\n        }\n    \n        /* TV2: tang be rong khung chuong trinh */\n        #class2-vietnamese-runtime #screen-dashboard{\n            max-width: 82rem !important;\n        }\n\n\n        /* TV2 UI V11 - 6 tab co dinh nhu TV2 */\n        #class2-vietnamese-runtime .main-module-tab{\n            position:relative; min-height:46px; padding:7px 8px; border-radius:14px;\n            border:1.5px solid #f5c5df; background:linear-gradient(180deg,#fff,#fff8fc);\n            color:#7e3bb8; font-weight:900; font-size:16px; line-height:1.05;\n            display:flex; align-items:center; justify-content:center; gap:6px;\n            box-shadow:0 2px 7px rgba(109,40,217,.07);\n            transition:box-shadow .18s,border-color .18s,background .18s,color .18s;\n        }\n        #class2-vietnamese-runtime .main-module-tab:hover{border-color:#e879f9;box-shadow:0 0 13px rgba(217,70,239,.22);}\n        #class2-vietnamese-runtime .main-module-tab.is-active{\n            color:#fff; border-color:#d946ef;\n            background:linear-gradient(135deg,#ec4899 0%,#a855f7 55%,#7c3aed 100%);\n            box-shadow:0 5px 14px rgba(168,85,247,.28);\n        }\n        @media (min-width:768px){#class2-vietnamese-runtime .main-module-tab{min-height:50px;font-size:16px;}}\n\n        #class2-vietnamese-runtime .semester-switch-btn{\n            min-width:88px; height:34px; padding:0 14px; border-radius:12px;\n            font-weight:900; font-size:16px; transform:none !important;\n            transition:background .18s,color .18s,border-color .18s,box-shadow .18s,filter .18s !important;\n        }\n        #class2-vietnamese-runtime .semester-switch-btn:hover{transform:none !important;filter:brightness(1.04);}\n        #class2-vietnamese-runtime .semester-switch-btn.is-active{\n            color:#fff !important; background:linear-gradient(135deg,#ec4899 0%,#a855f7 100%) !important;\n            border:2px solid #c026d3 !important; box-shadow:0 5px 12px rgba(168,85,247,.28) !important;\n        }\n        #class2-vietnamese-runtime .semester-switch-btn.is-inactive{\n            color:#7e22ce !important; background:linear-gradient(135deg,#fff1f7 0%,#f5f3ff 100%) !important;\n            border:1.5px solid #e9d5ff !important; box-shadow:0 2px 6px rgba(126,34,206,.08) !important;\n        }\n\n        @media (max-width:767px){\n            #class2-vietnamese-runtime .app-main-header{display:flex !important;flex-direction:column !important;align-items:stretch !important;gap:.35rem !important;padding:.35rem .45rem !important;}\n            #class2-vietnamese-runtime #header-nav-zone{display:flex !important;width:100% !important;min-width:0;justify-content:flex-start !important;overflow:hidden !important;}\n            #class2-vietnamese-runtime #btn-header-home{width:72px !important;height:48px !important;min-width:72px !important;}\n            #class2-vietnamese-runtime #header-learning-tabs{flex:1;min-width:0;overflow-x:auto;overflow-y:hidden;scrollbar-width:none;}\n            #class2-vietnamese-runtime #header-learning-tabs::-webkit-scrollbar{display:none;}\n            #class2-vietnamese-runtime #header-info-zone{display:flex !important;width:100% !important;justify-content:flex-end !important;gap:.35rem !important;min-width:0;}\n            #class2-vietnamese-runtime #btn-toggle-autospeech{width:38px !important;height:38px !important;min-width:38px !important;}\n            #class2-vietnamese-runtime #header-star-box{transform:none !important;margin-left:0 !important;}\n            #class2-vietnamese-runtime #user-info-box{margin-left:auto !important;min-width:0;text-align:right;}\n            #class2-vietnamese-runtime .semester-switch-btn{min-width:76px;height:32px;padding:0 9px;font-size:16px;}\n        }\n\n\n\n        /* THÔNG BÁO TRONG APP - thay alert/confirm mặc định của trình duyệt */\n        #class2-vietnamese-runtime .app-dialog-backdrop{\n            position: fixed; inset: 0; z-index: 120;\n            display: flex; align-items: center; justify-content: center;\n            padding: 16px; background: rgba(30, 41, 59, .48);\n            backdrop-filter: blur(5px); -webkit-backdrop-filter: blur(5px);\n        }\n        #class2-vietnamese-runtime .app-dialog-backdrop.hidden{ display: none !important; }\n        #class2-vietnamese-runtime .app-dialog-card{\n            width: min(92vw, 390px); overflow: hidden;\n            background: #fff; border: 2px solid #fbcfe8; border-radius: 28px;\n            box-shadow: 0 24px 70px rgba(76, 29, 149, .24), 0 8px 24px rgba(236, 72, 153, .14);\n            animation: tv2kf_appDialogPop .18s ease-out;\n        }\n        #class2-vietnamese-runtime .app-dialog-body{ padding: 24px 24px 18px; text-align: center; }\n        #class2-vietnamese-runtime .app-dialog-icon-wrap{\n            width: 60px; height: 60px; margin: 0 auto 12px;\n            display: flex; align-items: center; justify-content: center;\n            border: 2px solid #fbcfe8; border-radius: 20px;\n            font-size: 30px; background: #fdf2f8;\n        }\n        #class2-vietnamese-runtime .app-dialog-title{ font-size: 20px; line-height: 1.2; font-weight: 900; color: #ec4899; }\n        #class2-vietnamese-runtime .app-dialog-message{\n            margin-top: 10px; color: #475569; font-size: 16px; line-height: 1.7;\n            font-weight: 700; white-space: pre-line; user-select: text; -webkit-user-select: text;\n        }\n        #class2-vietnamese-runtime .app-dialog-actions{\n            display: flex; gap: 10px; padding: 12px 16px 16px;\n            border-top: 1px solid #fce7f3; background: linear-gradient(180deg,#fff,#fff7fb);\n        }\n        #class2-vietnamese-runtime .app-dialog-btn{\n            flex: 1; min-height: 44px; border-radius: 14px; font-size: 16px; font-weight: 900;\n            transition: transform .15s ease, filter .15s ease, box-shadow .15s ease;\n        }\n        #class2-vietnamese-runtime .app-dialog-btn:active{ transform: translateY(1px); }\n        #class2-vietnamese-runtime .app-dialog-btn-cancel{ background: #f8fafc; color: #64748b; border: 1px solid #e2e8f0; }\n        #class2-vietnamese-runtime .app-dialog-btn-ok{ color: #fff; border: 0; box-shadow: 0 5px 14px rgba(168,85,247,.24); }\n        #class2-vietnamese-runtime .app-dialog-btn.hidden{ display: none !important; }\n        #class2-vietnamese-runtime .app-toast-container{\n            position: fixed; z-index: 130; left: 50%; bottom: max(22px, env(safe-area-inset-bottom));\n            transform: translateX(-50%); width: min(92vw, 440px);\n            display: flex; flex-direction: column; gap: 8px; pointer-events: none;\n        }\n        #class2-vietnamese-runtime .app-toast-item{\n            display: flex; align-items: center; gap: 10px; padding: 11px 14px;\n            border: 1.5px solid #fbcfe8; border-radius: 16px;\n            box-shadow: 0 10px 28px rgba(15,23,42,.16); color: #334155;\n            opacity: 0; transform: translateY(12px) scale(.98);\n            transition: opacity .2s ease, transform .2s ease;\n        }\n        #class2-vietnamese-runtime .app-toast-item.is-visible{ opacity: 1; transform: translateY(0) scale(1); }\n        #class2-vietnamese-runtime .app-toast-icon{ font-size: 20px; flex: 0 0 auto; }\n        #class2-vietnamese-runtime .app-toast-text{ font-size: 16px; line-height: 1.45; font-weight: 900; }\n        @keyframes tv2kf_appDialogPop{ from { opacity:0; transform:translateY(10px) scale(.96); } to { opacity:1; transform:none; } }\n\n\n\n        /* TV2 - bầu trời thiên nhiên dùng chung trên TOÀN BỘ các màn học tập */\n        #class2-vietnamese-runtime .topic4-reading-stage,\n#class2-vietnamese-runtime .nature-ambient-host{ position:relative; isolation:isolate; }\n        #class2-vietnamese-runtime .nature-ambient-host > :not(.nature-ambient-layer){ position:relative; z-index:1; }\n        #class2-vietnamese-runtime .nature-ambient-layer{\n            position:absolute; inset:0; overflow:hidden; pointer-events:none; z-index:0;\n            border-radius:inherit; opacity:.72;\n        }\n        #class2-vietnamese-runtime #view-dashboard-grid.nature-ambient-host{ overflow:hidden; border-radius:28px; }\n        #class2-vietnamese-runtime #view-dashboard-grid.nature-ambient-host > .nature-ambient-layer{ opacity:.58; }\n        #class2-vietnamese-runtime #view-quiz.nature-ambient-host > .nature-ambient-layer,\n#class2-vietnamese-runtime #view-result.nature-ambient-host > .nature-ambient-layer{ opacity:.62; }\n        #class2-vietnamese-runtime #view-game-play.nature-ambient-host > .nature-ambient-layer{ opacity:.68; }\n\n        /* Mây trôi */\n        #class2-vietnamese-runtime .nature-cloud{\n            position:absolute; opacity:.30;\n            filter:drop-shadow(0 3px 3px rgba(100,116,139,.10));\n            animation:tv2kf_natureCloudDrift linear infinite; will-change:transform;\n        }\n        #class2-vietnamese-runtime .nature-cloud-1{ top:6%; left:-14%; font-size:3.5rem; animation-duration:28s; }\n        #class2-vietnamese-runtime .nature-cloud-2{ top:17%; left:-20%; font-size:2.55rem; animation-duration:37s; animation-delay:-14s; opacity:.23; }\n        #class2-vietnamese-runtime .nature-cloud-3{ top:48%; left:-18%; font-size:2rem; animation-duration:42s; animation-delay:-24s; opacity:.16; }\n\n        /* Chim bay */\n        #class2-vietnamese-runtime .nature-bird{ position:absolute; left:-8%; opacity:.55; animation:tv2kf_natureBirdFly linear infinite; will-change:transform; }\n        #class2-vietnamese-runtime .nature-bird-1{ top:21%; font-size:1.35rem; animation-duration:19s; }\n        #class2-vietnamese-runtime .nature-bird-2{ top:36%; font-size:1rem; animation-duration:25s; animation-delay:-10s; opacity:.43; }\n        #class2-vietnamese-runtime .nature-bird-3{ top:58%; font-size:.9rem; animation-duration:29s; animation-delay:-18s; opacity:.32; }\n\n        /* Lá thu đỏ - vàng. Gió làm lá lượn sang hai bên thay vì rơi thẳng. */\n        #class2-vietnamese-runtime .nature-leaf{ position:absolute; top:-14%; opacity:.70; animation:tv2kf_natureLeafFall linear infinite; will-change:transform; }\n        #class2-vietnamese-runtime .nature-leaf-red{ filter:saturate(1.28) drop-shadow(0 2px 2px rgba(190,24,93,.12)); }\n        #class2-vietnamese-runtime .nature-leaf-yellow{ filter:saturate(1.18) brightness(1.08) drop-shadow(0 2px 2px rgba(217,119,6,.12)); }\n        #class2-vietnamese-runtime .nature-leaf-1{ left:8%;  font-size:1.10rem; animation-duration:11s; animation-delay:-1s; }\n        #class2-vietnamese-runtime .nature-leaf-2{ left:24%; font-size:.92rem; animation-duration:14s; animation-delay:-6s; }\n        #class2-vietnamese-runtime .nature-leaf-3{ left:41%; font-size:1.15rem; animation-duration:12s; animation-delay:-9s; }\n        #class2-vietnamese-runtime .nature-leaf-4{ left:58%; font-size:.95rem; animation-duration:15s; animation-delay:-3s; }\n        #class2-vietnamese-runtime .nature-leaf-5{ left:73%; font-size:1.05rem; animation-duration:13s; animation-delay:-10s; }\n        #class2-vietnamese-runtime .nature-leaf-6{ left:87%; font-size:.88rem; animation-duration:16s; animation-delay:-7s; }\n        #class2-vietnamese-runtime .nature-leaf-7{ left:49%; font-size:.82rem; animation-duration:17s; animation-delay:-13s; opacity:.55; }\n        #class2-vietnamese-runtime .nature-leaf-8{ left:94%; font-size:.78rem; animation-duration:18s; animation-delay:-4s; opacity:.50; }\n\n        /* Luồng gió mảnh, xanh nhạt, lướt ngang màn hình */\n        #class2-vietnamese-runtime .nature-wind{\n            position:absolute; left:-220px; width:145px; height:30px; opacity:.34;\n            border-top:3px solid rgba(125,211,252,.55); border-radius:60% 70% 0 0;\n            animation:tv2kf_natureWindGust linear infinite; will-change:transform;\n        }\n        #class2-vietnamese-runtime .nature-wind::before,\n#class2-vietnamese-runtime .nature-wind::after{\n            content:\"\"; position:absolute; left:22px; border-top:2px solid rgba(167,243,208,.52); border-radius:60%;\n        }\n        #class2-vietnamese-runtime .nature-wind::before{ top:9px; width:105px; height:20px; }\n        #class2-vietnamese-runtime .nature-wind::after{ top:18px; left:54px; width:72px; height:14px; border-top-color:rgba(196,181,253,.46); }\n        #class2-vietnamese-runtime .nature-wind-1{ top:31%; animation-duration:13s; animation-delay:-2s; }\n        #class2-vietnamese-runtime .nature-wind-2{ top:54%; width:180px; animation-duration:17s; animation-delay:-10s; opacity:.27; }\n        #class2-vietnamese-runtime .nature-wind-3{ top:76%; width:120px; animation-duration:15s; animation-delay:-7s; opacity:.24; }\n\n        @keyframes tv2kf_natureCloudDrift{\n            from { transform:translateX(0); }\n            to { transform:translateX(1550px); }\n        }\n        @keyframes tv2kf_natureBirdFly{\n            0% { transform:translateX(0) translateY(0) rotate(-4deg); }\n            35% { transform:translateX(470px) translateY(-18px) rotate(2deg); }\n            68% { transform:translateX(920px) translateY(10px) rotate(-1deg); }\n            100% { transform:translateX(1480px) translateY(-8px) rotate(2deg); }\n        }\n        @keyframes tv2kf_natureLeafFall{\n            0%   { transform:translate3d(0,-30px,0) rotate(0deg); }\n            20%  { transform:translate3d(34px,145px,0) rotate(95deg); }\n            43%  { transform:translate3d(-20px,300px,0) rotate(205deg); }\n            66%  { transform:translate3d(44px,455px,0) rotate(315deg); }\n            82%  { transform:translate3d(8px,565px,0) rotate(390deg); }\n            100% { transform:translate3d(62px,760px,0) rotate(520deg); }\n        }\n        @keyframes tv2kf_natureWindGust{\n            0%   { transform:translate3d(0,0,0) scaleX(.85); opacity:0; }\n            8%   { opacity:.34; }\n            48%  { transform:translate3d(760px,-8px,0) scaleX(1.08); opacity:.36; }\n            92%  { opacity:.20; }\n            100% { transform:translate3d(1650px,5px,0) scaleX(.95); opacity:0; }\n        }\n        @media (max-width:640px){\n            #class2-vietnamese-runtime .nature-cloud-3,\n#class2-vietnamese-runtime .nature-bird-3,\n#class2-vietnamese-runtime .nature-leaf-7,\n#class2-vietnamese-runtime .nature-leaf-8,\n#class2-vietnamese-runtime .nature-wind-3{ display:none; }\n            #class2-vietnamese-runtime .nature-ambient-layer{ opacity:.60; }\n        }\n        @media (prefers-reduced-motion: reduce){\n            #class2-vietnamese-runtime .nature-cloud,\n#class2-vietnamese-runtime .nature-bird,\n#class2-vietnamese-runtime .nature-leaf,\n#class2-vietnamese-runtime .nature-wind{ animation:none !important; opacity:.12 !important; }\n        }\n        @media print{ #class2-vietnamese-runtime .nature-ambient-layer{ display:none !important; } }\n\n\n        /* =========================================================\n           TV2 UI 2026-09-20 - APP SHELL MOI\n           Chi thay presentation/layout, giu nguyen engine va workflow.\n           ========================================================= */\n        #class2-vietnamese-runtime .app-main-header{\n            display:grid !important;\n            grid-template-columns:auto minmax(0,1fr) auto;\n            align-items:center;\n            gap:10px;\n            padding:7px 9px !important;\n            border-radius:20px !important;\n        }\n        #class2-vietnamese-runtime #btn-header-home{\n            width:101px !important;\n            min-width:101px !important;\n            height:67px !important;\n            border-radius:16px !important;\n        }\n        #class2-vietnamese-runtime #header-nav-zone{ display:contents !important; }\n        #class2-vietnamese-runtime #header-info-zone{\n            width:auto !important;\n            min-width:0;\n            margin-left:0 !important;\n            justify-content:flex-end !important;\n            gap:7px !important;\n        }\n        #class2-vietnamese-runtime #btn-toggle-autospeech{ display:none !important; }\n\n        #class2-vietnamese-runtime #main-module-tabs{\n            width:100%;\n            min-width:0;\n            background:transparent !important;\n            border:0 !important;\n            border-radius:0 !important;\n            padding:0 !important;\n            box-shadow:none !important;\n        }\n        #class2-vietnamese-runtime #main-module-tabs > div{\n            display:grid;\n            grid-template-columns:repeat(6,minmax(0,1fr));\n            gap:7px;\n        }\n        #class2-vietnamese-runtime .main-module-tab{\n            min-width:0;\n            min-height:62px;\n            padding:7px 5px;\n            border-radius:16px;\n            flex-direction:column;\n            gap:3px;\n            font-size:16px;\n            line-height:1.05;\n            border-width:1.5px;\n            box-shadow:0 3px 9px rgba(76,29,149,.08);\n            position:relative;\n            overflow:visible;\n        }\n        #class2-vietnamese-runtime .main-module-tab > span:first-child{ font-size:21px !important; line-height:1; }\n        #class2-vietnamese-runtime .main-module-tab::after{\n            content:\"\";\n            position:absolute;\n            left:34%; right:34%; bottom:-5px;\n            height:3px; border-radius:99px;\n            opacity:0; transform:scaleX(.45);\n            transition:all .18s ease;\n            background:currentColor;\n        }\n        #class2-vietnamese-runtime .main-module-tab.is-active::after{ opacity:.95; transform:scaleX(1); }\n\n        /* Mau rieng tung tab: pastel khi nghi, dam khi duoc chon */\n        #class2-vietnamese-runtime .main-module-tab[data-tab=\"discover\"]{background:#f3e8ff;color:#7c3aed;border-color:#ddd6fe;}\n        #class2-vietnamese-runtime .main-module-tab[data-tab=\"lessons\"]{background:#fce7f3;color:#db2777;border-color:#fbcfe8;}\n        #class2-vietnamese-runtime .main-module-tab[data-tab=\"exercises\"]{background:#e0f2fe;color:#0369a1;border-color:#bae6fd;}\n        #class2-vietnamese-runtime .main-module-tab[data-tab=\"review\"]{background:#fef3c7;color:#b45309;border-color:#fde68a;}\n        #class2-vietnamese-runtime .main-module-tab[data-tab=\"exams\"]{background:#dcfce7;color:#15803d;border-color:#bbf7d0;}\n        #class2-vietnamese-runtime .main-module-tab[data-tab=\"games\"]{background:#ede9fe;color:#6d28d9;border-color:#ddd6fe;}\n        #class2-vietnamese-runtime .main-module-tab[data-tab=\"discover\"].is-active{background:linear-gradient(135deg,#a855f7,#7c3aed);color:#fff;border-color:#8b5cf6;box-shadow:0 7px 17px rgba(124,58,237,.27);}\n        #class2-vietnamese-runtime .main-module-tab[data-tab=\"lessons\"].is-active{background:linear-gradient(135deg,#f472b6,#ec4899);color:#fff;border-color:#ec4899;box-shadow:0 7px 17px rgba(236,72,153,.25);}\n        #class2-vietnamese-runtime .main-module-tab[data-tab=\"exercises\"].is-active{background:linear-gradient(135deg,#38bdf8,#0284c7);color:#fff;border-color:#0ea5e9;box-shadow:0 7px 17px rgba(14,165,233,.25);}\n        #class2-vietnamese-runtime .main-module-tab[data-tab=\"review\"].is-active{background:linear-gradient(135deg,#fbbf24,#f59e0b);color:#fff;border-color:#f59e0b;box-shadow:0 7px 17px rgba(245,158,11,.25);}\n        #class2-vietnamese-runtime .main-module-tab[data-tab=\"exams\"].is-active{background:linear-gradient(135deg,#4ade80,#16a34a);color:#fff;border-color:#22c55e;box-shadow:0 7px 17px rgba(34,197,94,.24);}\n        #class2-vietnamese-runtime .main-module-tab[data-tab=\"games\"].is-active{background:linear-gradient(135deg,#8b5cf6,#6d28d9);color:#fff;border-color:#7c3aed;box-shadow:0 7px 17px rgba(109,40,217,.25);}\n\n        /* Banner slot: banner chinh o root, banner phu khi vao noi dung */\n        #class2-vietnamese-runtime #app-banner-slot{ width:100%; position:relative; }\n        #class2-vietnamese-runtime #app-main-banner{\n            position:relative;\n            width:100%;\n            aspect-ratio:6/1;\n            min-height:0;\n            overflow:hidden;\n            border-radius:0;\n            border:0;\n            box-shadow:none;\n            background:#fff;\n        }\n        #class2-vietnamese-runtime #app-main-banner picture{display:block;width:100%;height:100%;}\n        #class2-vietnamese-runtime #app-main-banner img{width:100%;height:100%;object-fit:cover;display:block;}\n        #class2-vietnamese-runtime .app-main-banner-copy{\n            position:absolute;\n            left:50%; top:48%; transform:translate(-50%,-50%);\n            width:36%; text-align:center; pointer-events:none;\n            text-shadow:0 2px 0 rgba(255,255,255,.9),0 3px 12px rgba(126,34,206,.12);\n        }\n        #class2-vietnamese-runtime .app-main-banner-title{font-size:clamp(21px,2.35vw,34px);line-height:1;font-weight:900;color:#ec4899;letter-spacing:-.02em;}\n        #class2-vietnamese-runtime .app-main-banner-teacher{margin-top:5px;font-size:clamp(16px,1.15vw,17px);font-weight:900;color:#7e22ce;}\n\n        /* Root tab: banner phu phai an hoan toan.\n           ID selector ben duoi co display:flex, nen can rule rieng de .hidden thang specificity. */\n        #class2-vietnamese-runtime #app-context-banner.hidden{ display:none !important; }\n        #class2-vietnamese-runtime #app-main-banner.hidden{ display:none !important; }\n\n        #class2-vietnamese-runtime #app-context-banner{\n            position:relative;\n            min-height:58px;\n            overflow:hidden;\n            border-radius:0;\n            border:0 !important;\n            background:none !important;\n            box-shadow:none !important;\n            display:flex;\n            align-items:center;\n            padding:7px 10px;\n        }\n        /* Banner phụ dùng artwork riêng. Tạm thời có thể copy footer-bg.jpg và đổi tên thành banner-sub.jpg. */\n        #class2-vietnamese-runtime #app-context-banner::before{\n            content:\"\";\n            position:absolute;\n            inset:0;\n            background-image:url(\"banner-sub.jpg\");\n            background-size:cover;\n            background-position:center;\n            background-repeat:no-repeat;\n            transform:none;\n            opacity:1;\n            filter:none;\n            pointer-events:none;\n            z-index:0;\n        }\n        #class2-vietnamese-runtime #header-learning-tabs{\n            width:100% !important;\n            max-width:none !important;\n            flex:1 1 auto !important;\n            min-width:0 !important;\n            overflow-x:auto !important;\n            overflow-y:hidden !important;\n            scrollbar-width:none;\n            gap:5px;\n            position:relative;\n            z-index:2;\n        }\n        #class2-vietnamese-runtime #header-learning-tabs::-webkit-scrollbar{display:none;}\n        #class2-vietnamese-runtime #header-level2-tab,\n#class2-vietnamese-runtime #header-level3-tab,\n#class2-vietnamese-runtime #header-level4-tab,\n#class2-vietnamese-runtime #header-level5-tab{\n            width:auto !important; min-width:0 !important; max-width:none !important; flex:0 0 auto !important; overflow:visible !important;\n        }\n        #class2-vietnamese-runtime #header-level2-tab > button,\n#class2-vietnamese-runtime #header-level3-tab > div,\n#class2-vietnamese-runtime #header-level4-tab > div,\n#class2-vietnamese-runtime #header-level5-tab > div{\n            height:38px !important;\n            max-width:220px !important;\n            min-width:0 !important;\n            padding:0 12px !important;\n            border-radius:13px !important;\n            background:rgba(255,255,255,.50) !important;\n            backdrop-filter:blur(4px);\n            -webkit-backdrop-filter:blur(4px);\n            box-shadow:0 2px 7px rgba(76,29,149,.08) !important;\n        }\n        #class2-vietnamese-runtime #header-level2-tab > button{color:#be185d !important;border:1.5px solid #f9a8d4 !important;}\n        #class2-vietnamese-runtime #header-level3-tab > div{color:#7e22ce !important;border:1.5px solid #d8b4fe !important;}\n        #class2-vietnamese-runtime #header-level4-tab > div{color:#b45309 !important;border:1.5px solid #fde68a !important;}\n        #class2-vietnamese-runtime #header-level5-tab > div{color:#0369a1 !important;border:1.5px solid #bae6fd !important;}\n        #class2-vietnamese-runtime #header-level2-title,\n#class2-vietnamese-runtime #header-level3-title,\n#class2-vietnamese-runtime #header-level4-title,\n#class2-vietnamese-runtime #header-level5-title{font-size:16px !important;font-weight:900 !important;}\n        #class2-vietnamese-runtime #header-level3-tab > span,\n#class2-vietnamese-runtime #header-level4-tab > span,\n#class2-vietnamese-runtime #header-level5-tab > span{color:#c084fc !important;font-size:16px !important;}\n\n        /* Footer tranh dung chung - chu HTML luon sac net */\n        #class2-vietnamese-runtime #app-footer{\n            width:100%;\n            max-width:82rem;\n            min-height:76px;\n            margin:10px auto 0;\n            padding:0 14px;\n            border-radius:0;\n            background-image:url(\"footer-bg.jpg\");\n            background-size:cover;\n            background-position:center;\n            background-repeat:no-repeat;\n            display:flex;\n            align-items:center;\n            justify-content:center;\n            text-align:center;\n            color:#1827f2;\n            border:0;\n            box-shadow:none;\n        }\n        #class2-vietnamese-runtime #app-footer .footer-title{font-size:17px;font-weight:900;line-height:1.35;text-shadow:0 1px 0 #fff;}\n        #class2-vietnamese-runtime #app-footer .footer-sub{font-size:16px;font-weight:800;line-height:1.35;color:#1827f2;text-shadow:0 1px 0 #fff;}\n\n        @media (max-width:767px){\n            #class2-vietnamese-runtime .app-main-header{\n                display:grid !important;\n                grid-template-columns:auto minmax(0,1fr);\n                grid-template-rows:auto auto;\n                gap:7px !important;\n                padding:7px !important;\n            }\n            #class2-vietnamese-runtime #btn-header-home{\n                grid-column:1;grid-row:1;\n                width:86px !important;min-width:86px !important;height:58px !important;\n                justify-self:start;\n            }\n            #class2-vietnamese-runtime #header-info-zone{\n                grid-column:2;grid-row:1;\n                justify-self:end !important;\n                width:auto !important;\n                gap:5px !important;\n            }\n            #class2-vietnamese-runtime #main-module-tabs{\n                grid-column:1 / 3;grid-row:2;\n                width:100% !important;\n            }\n            #class2-vietnamese-runtime #main-module-tabs > div{grid-template-columns:repeat(3,minmax(0,1fr));gap:6px;}\n            #class2-vietnamese-runtime .main-module-tab{\n                min-height:52px;\n                flex-direction:row;\n                gap:6px;\n                font-size:16px;\n                padding:6px 8px;\n                border-radius:15px;\n            }\n            #class2-vietnamese-runtime .main-module-tab > span:first-child{font-size:18px !important;}\n            #class2-vietnamese-runtime .main-module-tab::after{bottom:-4px;height:2px;}\n            #class2-vietnamese-runtime #header-star-box{transform:none !important;margin-left:0 !important;padding:3px 5px !important;}\n            #class2-vietnamese-runtime #user-info-box{margin-left:0 !important;min-width:0;text-align:right;}\n            #class2-vietnamese-runtime #user-info-box .admin-manage-label{display:none !important;}\n            #class2-vietnamese-runtime #user-info-box button[title=\"Quản lý tài khoản\"]{width:34px !important;padding-left:0 !important;padding-right:0 !important;justify-content:center !important;}\n\n            #class2-vietnamese-runtime #app-main-banner{aspect-ratio:4/1;border-radius:0;}\n            #class2-vietnamese-runtime .app-main-banner-copy{width:39%;left:51%;top:49%;}\n            #class2-vietnamese-runtime .app-main-banner-title{font-size:clamp(16px,4.2vw,20px);}\n            #class2-vietnamese-runtime .app-main-banner-teacher{font-size:clamp(16px,2.8vw,16px);margin-top:2px;}\n\n            #class2-vietnamese-runtime #app-context-banner{min-height:52px;border-radius:0;padding:6px 8px;}\n            #class2-vietnamese-runtime #header-learning-tabs{gap:4px;}\n            #class2-vietnamese-runtime #header-level2-tab > button,\n#class2-vietnamese-runtime #header-level3-tab > div,\n#class2-vietnamese-runtime #header-level4-tab > div,\n#class2-vietnamese-runtime #header-level5-tab > div{height:34px !important;max-width:150px !important;padding:0 9px !important;border-radius:11px !important;}\n            #class2-vietnamese-runtime #header-level2-title,\n#class2-vietnamese-runtime #header-level3-title,\n#class2-vietnamese-runtime #header-level4-title,\n#class2-vietnamese-runtime #header-level5-title{font-size:16px !important;}\n            #class2-vietnamese-runtime #header-level2-icon{display:none !important;}\n            #class2-vietnamese-runtime #app-footer{min-height:64px;margin-top:8px;border-radius:0;}\n            #class2-vietnamese-runtime #app-footer .footer-title{font-size:16px;}\n            #class2-vietnamese-runtime #app-footer .footer-sub{font-size:16px;}\n        }\n\n\n\n        /* =========================================================\n           TV2 UI - NEN TRANG + HEADER KHONG KHUNG\n           Theo mau giao dien moi: cac tab noi truc tiep tren nen trang.\n           Chi thay doi presentation, khong doi logic/ID/function.\n           ========================================================= */\n        #class2-vietnamese-runtime{\n            background: #ffffff !important;\n        }\n        /* Nen chung cua toan bo chuong trinh: trang tinh khiet.\n           Chi cac card/control chuc nang moi giu mau rieng. */\n        #class2-vietnamese-runtime #screen-dashboard,\n#class2-vietnamese-runtime #app-viewport,\n#class2-vietnamese-runtime #view-dashboard-grid,\n#class2-vietnamese-runtime #view-dashboard-grid.nature-ambient-host{\n            background: #ffffff !important;\n        }\n        #class2-vietnamese-runtime #screen-dashboard{\n            background: #ffffff !important;\n        }\n        #class2-vietnamese-runtime .app-main-header{\n            background: transparent !important;\n            border: 0 !important;\n            box-shadow: none !important;\n            backdrop-filter: none !important;\n            -webkit-backdrop-filter: none !important;\n            border-radius: 0 !important;\n            padding-left: 0 !important;\n            padding-right: 0 !important;\n        }\n\n        /* Home va 6 tab van giu card rieng; bo cam giac nam trong mot khung lon. */\n        #class2-vietnamese-runtime #btn-header-home{\n            box-shadow: 0 3px 10px rgba(76,29,149,.08) !important;\n        }\n        #class2-vietnamese-runtime #header-star-box{\n            background: #fff7fb !important;\n        }\n\n        @media (max-width: 767px){\n            #class2-vietnamese-runtime .app-main-header{\n                background: transparent !important;\n                border: 0 !important;\n                box-shadow: none !important;\n                border-radius: 0 !important;\n            }\n        }\n\n        /* TV2 - Root view cua 5 tab con lai dung chung nen trang cua chuong trinh.\n           Bo card/khung vien ngoai cung, chi giu cac card noi dung ben trong. */\n        #class2-vietnamese-runtime #view-bai-hoc-hub,\n#class2-vietnamese-runtime #view-roadmap,\n#class2-vietnamese-runtime #view-minigame-hub,\n#class2-vietnamese-runtime #view-exam-hub{\n            background: transparent !important;\n            border: 0 !important;\n            box-shadow: none !important;\n            border-radius: 0 !important;\n            padding-left: 0 !important;\n            padding-right: 0 !important;\n        }\n\n        /* Bài tập: bỏ thêm khung nền/viền bên trong chứa lưới bài. */\n        #class2-vietnamese-runtime #roadmap-svg-container{\n            background: transparent !important;\n            border: 0 !important;\n            border-radius: 0 !important;\n            box-shadow: none !important;\n            padding-left: 0 !important;\n            padding-right: 0 !important;\n        }\n\n        /* On tap dang dung view-lecture o man goc tab. Chi bo khung ngoai khi tab On tap active,\n           khong anh huong view-lecture cua cac chuyen muc Kham pha. */\n        #class2-vietnamese-runtime:has(#main-tab-review.is-active) #view-lecture{\n            background: transparent !important;\n            border: 0 !important;\n            box-shadow: none !important;\n            border-radius: 0 !important;\n            padding-left: 0 !important;\n            padding-right: 0 !important;\n        }\n\n        /* TV2 - CAC MAN NHANH: bo toan bo vo/khung ngoai, uu tien chieu cao gon.\n           Chi giu vien cua cau hoi, dap an va control chuc nang ben trong. */\n        #class2-vietnamese-runtime #view-lecture,\n#class2-vietnamese-runtime #view-bai-hoc-lesson,\n#class2-vietnamese-runtime #view-game-play{\n            background: transparent !important;\n            border: 0 !important;\n            box-shadow: none !important;\n            border-radius: 0 !important;\n            min-height: 0 !important;\n            padding: 8px 0 !important;\n        }\n\n        /* Phong cau hoi: bo card bao ngoai va min-height 480px de vua mot khung tablet. */\n        #class2-vietnamese-runtime #view-quiz > .pastel-card{\n            background: transparent !important;\n            border: 0 !important;\n            box-shadow: none !important;\n            border-radius: 0 !important;\n            min-height: 0 !important;\n            padding: 8px 0 !important;\n        }\n\n        /* Chuan hoa khoang cach doc trong cac man nhanh. */\n        #class2-vietnamese-runtime #view-lecture{ justify-content: flex-start !important; gap: 8px !important; }\n        #class2-vietnamese-runtime #view-lecture > .w-full{ gap: 8px !important; }\n        #class2-vietnamese-runtime #view-lecture .mb-3,\n#class2-vietnamese-runtime #view-lecture .mb-2\\.5{ margin-bottom: 8px !important; }\n        #class2-vietnamese-runtime #view-lecture .mt-2\\.5{ margin-top: 8px !important; }\n        #class2-vietnamese-runtime #view-lecture .pt-2{ padding-top: 8px !important; }\n\n        #class2-vietnamese-runtime #view-quiz{ gap: 8px !important; }\n        #class2-vietnamese-runtime #view-quiz #question-box{ margin-top: 4px !important; margin-bottom: 4px !important; }\n        #class2-vietnamese-runtime #view-quiz #quiz-bottom-nav{ padding-top: 6px !important; }\n\n        #class2-vietnamese-runtime #view-bai-hoc-lesson .space-y-3 > :not([hidden]) ~ :not([hidden]),\n#class2-vietnamese-runtime #view-game-play .space-y-3 > :not([hidden]) ~ :not([hidden]){\n            margin-top: 8px !important;\n        }\n\n        @media (max-width: 767px){\n            #class2-vietnamese-runtime #view-lecture,\n#class2-vietnamese-runtime #view-bai-hoc-lesson,\n#class2-vietnamese-runtime #view-game-play,\n#class2-vietnamese-runtime #view-quiz > .pastel-card{\n                padding-top: 6px !important;\n                padding-bottom: 6px !important;\n            }\n        }\n\n\n        /* TV2 - Nen luoi Kham pha trang that su.\n           Bo hoan toan bong do cua card de cac khe giua card hien nen trang #fff.\n           Giu nguyen vien mau cua tung card. */\n        #class2-vietnamese-runtime #view-dashboard-grid .pastel-card,\n#class2-vietnamese-runtime #view-dashboard-grid .pastel-card:hover{\n            box-shadow: none !important;\n            border-width: 1px !important;\n        }\n\n        /* Card Khám phá vẫn giữ nền pastel rất nhẹ theo màu của từng mục.\n           Nền TRANG là trắng; chỉ bản thân từng card mới có màu nền. */\n        #class2-vietnamese-runtime #view-dashboard-grid .pastel-card:has(h3.text-pink-700){ background: rgba(253,242,248,.82) !important; }\n        #class2-vietnamese-runtime #view-dashboard-grid .pastel-card:has(h3.text-purple-700){ background: rgba(250,245,255,.84) !important; }\n        #class2-vietnamese-runtime #view-dashboard-grid .pastel-card:has(h3.text-blue-700){ background: rgba(239,246,255,.86) !important; }\n        #class2-vietnamese-runtime #view-dashboard-grid .pastel-card:has(h3.text-fuchsia-700){ background: rgba(253,244,255,.84) !important; }\n        #class2-vietnamese-runtime #view-dashboard-grid .pastel-card:has(h3.text-emerald-700){ background: rgba(236,253,245,.86) !important; }\n        #class2-vietnamese-runtime #view-dashboard-grid .pastel-card:has(h3.text-indigo-700){ background: rgba(238,242,255,.86) !important; }\n        #class2-vietnamese-runtime #view-dashboard-grid .pastel-card:has(h3.text-amber-700){ background: rgba(255,251,235,.88) !important; }\n        #class2-vietnamese-runtime #view-dashboard-grid .pastel-card:has(h3.text-rose-700){ background: rgba(255,241,242,.86) !important; }\n        #class2-vietnamese-runtime #view-dashboard-grid .pastel-card:has(h3.text-teal-700){ background: rgba(240,253,250,.88) !important; }\n        #class2-vietnamese-runtime #view-dashboard-grid .pastel-card:has(h3.text-yellow-700){ background: rgba(254,252,232,.90) !important; }\n\n        /* TV2 - Tang 20% co chu card Khám phá: hàng tiêu đề + hàng mô tả */\n        #class2-vietnamese-runtime #view-dashboard-grid .pastel-card h3{\n            font-size:1.2rem !important;\n        }\n        #class2-vietnamese-runtime #view-dashboard-grid .pastel-card > div:last-child{\n            font-size:16px !important;\n        }\n        @media (max-width:767px){\n            #class2-vietnamese-runtime #view-dashboard-grid .pastel-card h3{\n                font-size:1.05rem !important;\n            }\n            #class2-vietnamese-runtime #view-dashboard-grid .pastel-card > div:last-child{\n                font-size:16px !important;\n            }\n        }\n\n\n        /* TV2 - Co chu tab chinh tren header: desktop 16px, mobile 14px */\n        @media (min-width: 768px){\n            #class2-vietnamese-runtime .main-module-tab{ font-size: 16px !important; }\n            #class2-vietnamese-runtime #header-star-box > div > span:first-child{ font-size: 16px !important; }\n            #class2-vietnamese-runtime #star-green-count,\n#class2-vietnamese-runtime #star-red-count{ font-size: 16px !important; }\n            #class2-vietnamese-runtime #user-info-box > div > div > div:first-child{ font-size: 16px !important; }\n            #class2-vietnamese-runtime #user-info-box > div > div > div:nth-child(2){ font-size: 16px !important; }\n            #class2-vietnamese-runtime #user-info-box button[title=\"Quản lý tài khoản\"]{ font-size: 16px !important; }\n        }\n\n        /* TV2 - Banner phu desktop: tang x2 gioi han be rong tab (220px -> 440px) */\n        @media (min-width: 768px){\n            #class2-vietnamese-runtime #header-level2-tab > button,\n#class2-vietnamese-runtime #header-level3-tab > div,\n#class2-vietnamese-runtime #header-level4-tab > div,\n#class2-vietnamese-runtime #header-level5-tab > div{\n                width: auto !important;\n                min-width: 0 !important;\n                max-width: 440px !important;\n                padding-left: 18px !important;\n                padding-right: 18px !important;\n            }\n\n            #class2-vietnamese-runtime #header-level2-title,\n#class2-vietnamese-runtime #header-level3-title,\n#class2-vietnamese-runtime #header-level4-title,\n#class2-vietnamese-runtime #header-level5-title{\n                font-size: 16px !important;\n                max-width: 400px !important;\n                overflow: hidden !important;\n                text-overflow: ellipsis !important;\n                white-space: nowrap !important;\n            }\n        }\n\n        @media (max-width: 767px){\n            #class2-vietnamese-runtime .main-module-tab{ font-size: 16px !important; }\n        }\n\n\n        /* TV2 2026-09-22 - Bang chu cai +20%, chu den; hop sao can chieu cao tab */\n        @media (min-width: 768px){\n            #class2-vietnamese-runtime #header-star-box{\n                height: 62px !important;\n                min-height: 62px !important;\n                padding: 5px 8px !important;\n                justify-content: center !important;\n                gap: 3px !important;\n            }\n            #class2-vietnamese-runtime #header-star-box > div{\n                min-height: 22px !important;\n            }\n            #class2-vietnamese-runtime #header-star-box > div > span:first-child{\n                font-size: 16px !important;\n                min-width: 48px !important;\n                padding: 3px 6px !important;\n            }\n            #class2-vietnamese-runtime #header-star-box .fa-star{ font-size: 16px !important; }\n            #class2-vietnamese-runtime #star-green-count,\n#class2-vietnamese-runtime #star-red-count{\n                font-size: 16px !important;\n                line-height: 1 !important;\n                min-width: 14px !important;\n                text-align: center !important;\n            }\n        }\n\n        @media (max-width: 767px){\n            #class2-vietnamese-runtime #header-star-box{\n                height: 52px !important;\n                min-height: 52px !important;\n                padding: 4px 6px !important;\n                justify-content: center !important;\n                gap: 2px !important;\n            }\n            #class2-vietnamese-runtime #header-star-box > div > span:first-child{\n                font-size: 16px !important;\n                padding: 2px 5px !important;\n            }\n            #class2-vietnamese-runtime #star-green-count,\n#class2-vietnamese-runtime #star-red-count{ font-size: 16px !important; }\n        }\n\n        /* TV2 FOOTER 8:1 - dong bo cach hien thi voi TV2.\n           Footer nam ngoai #screen-dashboard, nen bu tru padding cua dashboard\n           de be rong artwork bang chinh xac banner. */\n        #class2-vietnamese-runtime #app-footer{\n            width: calc(100% - 1rem) !important;\n            max-width: calc(82rem - 1rem) !important;\n            aspect-ratio: 8 / 1 !important;\n            min-height: 0 !important;\n            height: auto !important;\n            background-image: url(\"footer-bg.jpg\") !important;\n            background-size: cover !important;\n            background-position: center !important;\n            background-repeat: no-repeat !important;\n        }\n        @media (max-width: 767px){\n            #class2-vietnamese-runtime #app-footer{\n                width: calc(100% - 0.5rem) !important;\n                max-width: calc(82rem - 0.5rem) !important;\n                aspect-ratio: 8 / 1 !important;\n                min-height: 0 !important;\n                height: auto !important;\n            }\n        }\n\n\n#class2-vietnamese-runtime{width:100%;max-width:100%;font-family:'Quicksand','Nunito',system-ui,sans-serif;color:#4a4a4a;position:relative;}\n#class2-vietnamese-runtime #screen-dashboard{width:100%!important;max-width:100%!important;padding:0!important;margin:0!important;min-height:0!important;}\n#class2-vietnamese-runtime .app-main-header,#class2-vietnamese-runtime #app-banner-slot{display:none!important;}\n#class2-vietnamese-runtime #app-viewport{width:100%!important;max-width:100%!important;margin:0!important;padding:0!important;min-height:0!important;}\n#content-stage:has(#class2-vietnamese-runtime){padding:.12rem .05rem 0!important;min-height:0!important;}\n#content-stage:has(#class2-vietnamese-runtime)+.app-footer{margin-top:0!important;}\n#class2-vietnamese-runtime img{max-width:100%;}\n#class2-vietnamese-runtime button,#class2-vietnamese-runtime input,#class2-vietnamese-runtime select,#class2-vietnamese-runtime textarea{font:inherit;}\n#class2-vietnamese-runtime .fixed{position:fixed;}\n#class2-vietnamese-runtime #view-dashboard-grid,#class2-vietnamese-runtime #view-bai-hoc-hub,#class2-vietnamese-runtime #view-bai-hoc-lesson,#class2-vietnamese-runtime #view-lecture,#class2-vietnamese-runtime #view-quiz,#class2-vietnamese-runtime #view-roadmap,#class2-vietnamese-runtime #view-minigame-hub,#class2-vietnamese-runtime #view-game-play,#class2-vietnamese-runtime #view-exam-hub,#class2-vietnamese-runtime #view-result{margin-top:0!important;margin-bottom:0!important;}\n#class2-vietnamese-runtime #view-game-play>div{max-width:1280px!important;}\n@media(max-width:767px){#content-stage:has(#class2-vietnamese-runtime){padding-top:.08rem!important;}}\n";


const TV_SHELL_BREADCRUMB_CSS_ = `
body:has(#class2-vietnamese-runtime) #sub-pill.tv-sub-breadcrumbs{
    min-width:0!important;
    width:auto!important;
    max-width:calc(100% - 1rem)!important;
    min-height:0!important;
    padding:0!important;
    border:0!important;
    border-radius:0!important;
    background:transparent!important;
    box-shadow:none!important;
    backdrop-filter:none!important;
    -webkit-backdrop-filter:none!important;
    display:flex!important;
    align-items:center!important;
    gap:.34rem!important;
    overflow-x:auto!important;
    overflow-y:hidden!important;
    scrollbar-width:none!important;
    white-space:nowrap!important;
}
body:has(#class2-vietnamese-runtime) #sub-pill.tv-sub-breadcrumbs::-webkit-scrollbar{display:none!important;}
body:has(#class2-vietnamese-runtime) #sub-pill.tv-sub-breadcrumbs .tv-breadcrumb-sep{
    flex:0 0 auto;
    color:#c084fc;
    font-size:16px;
    font-weight:900;
}
body:has(#class2-vietnamese-runtime) #sub-pill.tv-sub-breadcrumbs .tv-breadcrumb-tab{
    flex:0 0 auto;
    height:38px;
    max-width:min(430px,42vw);
    padding:0 16px;
    border-radius:13px;
    display:inline-flex;
    align-items:center;
    justify-content:center;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
    font-size:16px;
    font-weight:900;
    line-height:1;
    box-shadow:0 2px 7px rgba(76,29,149,.08);
    cursor:default;
}
body:has(#class2-vietnamese-runtime) #sub-pill.tv-sub-breadcrumbs button.tv-breadcrumb-tab{
    cursor:pointer;
    transition:background .16s,border-color .16s,box-shadow .16s,transform .16s;
}
body:has(#class2-vietnamese-runtime) #sub-pill.tv-sub-breadcrumbs button.tv-breadcrumb-tab:hover{
    transform:translateY(-1px);
    box-shadow:0 4px 11px rgba(76,29,149,.13);
}
body:has(#class2-vietnamese-runtime) #sub-pill.tv-sub-breadcrumbs .tv-breadcrumb-level2{
    color:#be185d;
    border:1.5px solid #f9a8d4;
    background:rgba(255,255,255,.78);
}
body:has(#class2-vietnamese-runtime) #sub-pill.tv-sub-breadcrumbs .tv-breadcrumb-level3{
    color:#7e22ce;
    border:1.5px solid #d8b4fe;
    background:rgba(255,255,255,.72);
}
body:has(#class2-vietnamese-runtime) #sub-pill.tv-sub-breadcrumbs .tv-breadcrumb-level4{
    color:#b45309;
    border:1.5px solid #fde68a;
    background:rgba(255,255,255,.72);
}
body:has(#class2-vietnamese-runtime) #sub-pill.tv-sub-breadcrumbs .tv-breadcrumb-level5{
    color:#0f766e;
    border:1.5px solid #99f6e4;
    background:rgba(255,255,255,.72);
}
body:has(#class2-vietnamese-runtime) #score-box{font-size:16px!important;font-weight:900!important;}
body:has(#class2-vietnamese-runtime) #score-box strong{font-size:17px!important;}
body:has(#class2-vietnamese-runtime) #class2-vietnamese-runtime #btn-prev-q-prac,
body:has(#class2-vietnamese-runtime) #class2-vietnamese-runtime #btn-next-q-prac,
body:has(#class2-vietnamese-runtime) #class2-vietnamese-runtime #btn-prev-q-exam,
body:has(#class2-vietnamese-runtime) #class2-vietnamese-runtime #btn-next-q-exam,
body:has(#class2-vietnamese-runtime) #class2-vietnamese-runtime #practice-step-indicator,
body:has(#class2-vietnamese-runtime) #class2-vietnamese-runtime #practice-step-text{
    font-size:16px!important;
    font-weight:900!important;
}
@media(max-width:767px){
    body:has(#class2-vietnamese-runtime) #score-box{font-size:16px!important;}
    body:has(#class2-vietnamese-runtime) #score-box strong{font-size:16px!important;}
    body:has(#class2-vietnamese-runtime) #class2-vietnamese-runtime #btn-prev-q-prac,
    body:has(#class2-vietnamese-runtime) #class2-vietnamese-runtime #btn-next-q-prac,
    body:has(#class2-vietnamese-runtime) #class2-vietnamese-runtime #btn-prev-q-exam,
    body:has(#class2-vietnamese-runtime) #class2-vietnamese-runtime #btn-next-q-exam,
    body:has(#class2-vietnamese-runtime) #class2-vietnamese-runtime #practice-step-indicator,
    body:has(#class2-vietnamese-runtime) #class2-vietnamese-runtime #practice-step-text{font-size:16px!important;}
    body:has(#class2-vietnamese-runtime) #sub-pill.tv-sub-breadcrumbs{max-width:calc(100% - .35rem)!important;gap:.22rem!important;}
    body:has(#class2-vietnamese-runtime) #sub-pill.tv-sub-breadcrumbs .tv-breadcrumb-tab{
        height:34px;
        max-width:44vw;
        padding:0 10px;
        border-radius:11px;
        font-size:16px;
    }
    body:has(#class2-vietnamese-runtime) #sub-pill.tv-sub-breadcrumbs .tv-breadcrumb-sep{font-size:16px;}
}
`;

const TV_MODULE_UI_CSS_ = `
/* Lớp 2 - Tiếng Việt: đồng bộ nhịp bố cục với module Toán. */
#class2-vietnamese-runtime{min-height:0!important;height:auto!important;display:block!important;}
#class2-vietnamese-runtime #screen-dashboard{min-height:0!important;height:auto!important;gap:0!important;}
#class2-vietnamese-runtime #screen-dashboard > *{margin-block-start:0!important;margin-block-end:0!important;}
#class2-vietnamese-runtime #app-viewport{min-height:0!important;height:auto!important;margin-top:0!important;margin-bottom:0!important;padding-top:0!important;padding-bottom:0!important;}
#content-stage:has(#class2-vietnamese-runtime){min-height:0!important;padding:.12rem .05rem 0!important;}
#content-stage:has(#class2-vietnamese-runtime)+.app-footer{margin-top:0!important;}
#class2-vietnamese-runtime #view-dashboard-grid{padding-top:0!important;padding-bottom:0!important;}
#class2-vietnamese-runtime #view-dashboard-grid,
#class2-vietnamese-runtime #view-bai-hoc-hub,
#class2-vietnamese-runtime #view-bai-hoc-lesson,
#class2-vietnamese-runtime #view-lecture,
#class2-vietnamese-runtime #view-roadmap,
#class2-vietnamese-runtime #view-minigame-hub,
#class2-vietnamese-runtime #view-game-play,
#class2-vietnamese-runtime #view-exam-hub,
#class2-vietnamese-runtime #view-result{margin-top:0!important;margin-bottom:0!important;}
#class2-vietnamese-runtime #view-bai-hoc-hub,
#class2-vietnamese-runtime #view-roadmap,
#class2-vietnamese-runtime #view-minigame-hub,
#class2-vietnamese-runtime #view-exam-hub{min-height:0!important;padding-top:.35rem!important;padding-bottom:.35rem!important;background:transparent!important;border:0!important;box-shadow:none!important;border-radius:0!important;}
#class2-vietnamese-runtime #view-lecture,
#class2-vietnamese-runtime #view-bai-hoc-lesson,
#class2-vietnamese-runtime #view-game-play{min-height:0!important;padding-top:.35rem!important;padding-bottom:.35rem!important;}
#class2-vietnamese-runtime #view-quiz{gap:.3rem!important;}
#class2-vietnamese-runtime #view-quiz > .pastel-card{min-height:0!important;padding-top:.35rem!important;padding-bottom:.35rem!important;}

/* Khám phá: cùng độ thoáng, chiều cao card và palette với Toán. */
#class2-vietnamese-runtime #view-dashboard-grid{gap:.5rem!important;align-items:stretch;}
#class2-vietnamese-runtime #view-dashboard-grid .pastel-card{
    border-width:1px!important;
    box-shadow:none!important;
    min-height:96px!important;
    padding:6px 10px!important;
}
#class2-vietnamese-runtime #view-dashboard-grid .pastel-card:has(h3.text-pink-700){background:#fbcfe8!important;border-color:#f9a8d4!important;}
#class2-vietnamese-runtime #view-dashboard-grid .pastel-card:has(h3.text-purple-700){background:#e9d5ff!important;border-color:#d8b4fe!important;}
#class2-vietnamese-runtime #view-dashboard-grid .pastel-card:has(h3.text-indigo-700){background:#e0e7ff!important;border-color:#c7d2fe!important;}
#class2-vietnamese-runtime #view-dashboard-grid .pastel-card:has(h3.text-blue-700){background:#dbeafe!important;border-color:#bfdbfe!important;}
#class2-vietnamese-runtime #view-dashboard-grid .pastel-card:has(h3.text-cyan-700){background:#cffafe!important;border-color:#a5f3fc!important;}
#class2-vietnamese-runtime #view-dashboard-grid .pastel-card:has(h3.text-teal-700){background:#ccfbf1!important;border-color:#99f6e4!important;}
#class2-vietnamese-runtime #view-dashboard-grid .pastel-card:has(h3.text-emerald-700){background:#d1fae5!important;border-color:#a7f3d0!important;}
#class2-vietnamese-runtime #view-dashboard-grid .pastel-card:has(h3.text-amber-700){background:#fef3c7!important;border-color:#fde68a!important;}
#class2-vietnamese-runtime #view-dashboard-grid .pastel-card:has(h3.text-yellow-700){background:#fef9c3!important;border-color:#fde68a!important;}
#class2-vietnamese-runtime #view-dashboard-grid .pastel-card:has(h3.text-rose-700){background:#ffe4e6!important;border-color:#fecdd3!important;}
#class2-vietnamese-runtime #view-dashboard-grid .pastel-card:has(h3.text-fuchsia-700){background:#fae8ff!important;border-color:#f0abfc!important;}
#class2-vietnamese-runtime #view-dashboard-grid .pastel-card h3{font-size:18px!important;line-height:1.2!important;}
#class2-vietnamese-runtime #view-dashboard-grid .pastel-card > div:last-child{margin-top:4px!important;padding-top:4px!important;align-items:flex-end!important;}
#class2-vietnamese-runtime #view-dashboard-grid .pastel-card > div:last-child > span:first-child{font-size:16px!important;line-height:1.28!important;color:#334155!important;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;}
#class2-vietnamese-runtime #view-dashboard-grid .pastel-card > div:last-child > span:last-child{font-size:16px!important;}
#content-stage:has(#class2-vietnamese-runtime #view-dashboard-grid:not(.hidden)){padding-top:.5rem!important;}

/* Bài học: cùng cỡ card, palette, chữ với Toán. */
#class2-vietnamese-runtime #view-bai-hoc-hub > div{max-width:100%!important;}
#class2-vietnamese-runtime #bai-hoc-grid > button{
    min-height:88px!important;
    border-width:1px!important;
    padding:10px 12px!important;
    box-shadow:none!important;
}
#class2-vietnamese-runtime #bai-hoc-grid > button:nth-child(6n+1){background:#fbcfe8!important;border-color:#f9a8d4!important;}
#class2-vietnamese-runtime #bai-hoc-grid > button:nth-child(6n+2){background:#e9d5ff!important;border-color:#d8b4fe!important;}
#class2-vietnamese-runtime #bai-hoc-grid > button:nth-child(6n+3){background:#dbeafe!important;border-color:#bfdbfe!important;}
#class2-vietnamese-runtime #bai-hoc-grid > button:nth-child(6n+4){background:#d1fae5!important;border-color:#a7f3d0!important;}
#class2-vietnamese-runtime #bai-hoc-grid > button:nth-child(6n+5){background:#fef3c7!important;border-color:#fde68a!important;}
#class2-vietnamese-runtime #bai-hoc-grid > button:nth-child(6n+6){background:#cffafe!important;border-color:#a5f3fc!important;}
#class2-vietnamese-runtime #bai-hoc-grid > button > div:first-child{font-size:20px!important;line-height:1.25!important;color:#7e22ce!important;}
#class2-vietnamese-runtime #bai-hoc-grid > button > div:nth-child(2){font-size:16.5px!important;line-height:1.38!important;color:#334155!important;margin-top:4px!important;}
#class2-vietnamese-runtime #view-bai-hoc-hub h2{font-size:22px!important;}
#class2-vietnamese-runtime #bai-hoc-hub-subtitle{font-size:16px!important;}

/* Chi tiết Bài học: nhịp chữ và tab giống Toán, nhưng giữ nội dung TV2 hiện tại. */
#class2-vietnamese-runtime #view-bai-hoc-lesson{width:100%!important;max-width:100%!important;}
#class2-vietnamese-runtime #view-bai-hoc-lesson > div{width:100%!important;max-width:100%!important;}
#class2-vietnamese-runtime #view-bai-hoc-lesson #bai-hoc-lesson-meta{font-size:18px!important;line-height:1.3!important;}
#class2-vietnamese-runtime #bai-hoc-sections > .grid.grid-cols-3 button{font-size:16px!important;height:44px!important;padding-top:0!important;padding-bottom:0!important;}
#class2-vietnamese-runtime #bai-hoc-sections{font-size:16px!important;}
#class2-vietnamese-runtime #bai-hoc-sections section{border-width:1px!important;box-shadow:none!important;}
#class2-vietnamese-runtime #bai-hoc-sections input{font-size:17px!important;min-height:44px!important;}
#class2-vietnamese-runtime #bai-hoc-sections button{min-height:42px;}
#class2-vietnamese-runtime #bai-hoc-sections > .flex.items-center.justify-between button{font-size:16px!important;min-height:44px;}
#class2-vietnamese-runtime #bai-hoc-sections > .flex.items-center.justify-between > div{font-size:16px!important;}

/* Bài tập: bỏ khung nền lớn, card pastel ổn định như Toán. */
#class2-vietnamese-runtime #roadmap-svg-container{padding:0!important;border-width:0!important;background:transparent!important;box-shadow:none!important;}
#class2-vietnamese-runtime #roadmap-svg-container > div{width:100%!important;}
#class2-vietnamese-runtime #roadmap-svg-container button{
    min-height:94px!important;
    border-width:1px!important;
    padding:10px 12px!important;
    box-shadow:none!important;
}
#class2-vietnamese-runtime #roadmap-svg-container button:nth-child(6n+1){background:#fbcfe8!important;border-color:#f9a8d4!important;}
#class2-vietnamese-runtime #roadmap-svg-container button:nth-child(6n+2){background:#e9d5ff!important;border-color:#d8b4fe!important;}
#class2-vietnamese-runtime #roadmap-svg-container button:nth-child(6n+3){background:#dbeafe!important;border-color:#bfdbfe!important;}
#class2-vietnamese-runtime #roadmap-svg-container button:nth-child(6n+4){background:#d1fae5!important;border-color:#a7f3d0!important;}
#class2-vietnamese-runtime #roadmap-svg-container button:nth-child(6n+5){background:#fef3c7!important;border-color:#fde68a!important;}
#class2-vietnamese-runtime #roadmap-svg-container button:nth-child(6n+6){background:#cffafe!important;border-color:#a5f3fc!important;}
#class2-vietnamese-runtime #roadmap-svg-container button > div:first-child{font-size:20px!important;line-height:1.25!important;}
#class2-vietnamese-runtime #roadmap-svg-container button > div:nth-child(2){font-size:16.5px!important;line-height:1.35!important;color:#334155!important;}
#class2-vietnamese-runtime #roadmap-svg-container button > div:nth-child(3){font-size:16px!important;line-height:1.3!important;}
#class2-vietnamese-runtime #view-roadmap h2{font-size:22px!important;line-height:1.25!important;}
#class2-vietnamese-runtime #view-roadmap h2 + p{font-size:16px!important;line-height:1.35!important;}
#class2-vietnamese-runtime #view-bai-hoc-hub .semester-switch-btn,
#class2-vietnamese-runtime #view-roadmap .semester-switch-btn{font-size:16px!important;min-height:42px!important;padding-left:18px!important;padding-right:18px!important;}
#class2-vietnamese-runtime #view-roadmap h2{font-size:20px!important;}
#class2-vietnamese-runtime #view-roadmap h2 + p{font-size:16px!important;}

/* Ôn tập / các danh sách mục nhỏ. */
#class2-vietnamese-runtime #lecture-subtopics-list > button{border-width:1px!important;font-size:16px!important;line-height:1.35!important;padding:10px 13px!important;box-shadow:none!important;}
#class2-vietnamese-runtime #lecture-subtopics-list > button:nth-child(6n+1){background:#fbcfe8!important;}
#class2-vietnamese-runtime #lecture-subtopics-list > button:nth-child(6n+2){background:#d1fae5!important;}
#class2-vietnamese-runtime #lecture-subtopics-list > button:nth-child(6n+3){background:#e9d5ff!important;}
#class2-vietnamese-runtime #lecture-subtopics-list > button:nth-child(6n+4){background:#fef3c7!important;}
#class2-vietnamese-runtime #lecture-subtopics-list > button:nth-child(6n+5){background:#e0e7ff!important;}
#class2-vietnamese-runtime #lecture-subtopics-list > button:nth-child(6n+6){background:#ffe4e6!important;}

/* Đề thi: cùng chiều cao, palette và cỡ chữ với Toán. */
#class2-vietnamese-runtime #view-exam-hub > div{width:100%!important;max-width:100%!important;}
#class2-vietnamese-runtime #exam-categories-grid > div{border-width:1px!important;min-height:225px!important;box-shadow:none!important;}
#class2-vietnamese-runtime #exam-categories-grid > div:nth-child(1){background:#fbcfe8!important;border-color:#f9a8d4!important;}
#class2-vietnamese-runtime #exam-categories-grid > div:nth-child(2){background:#e9d5ff!important;border-color:#d8b4fe!important;}
#class2-vietnamese-runtime #exam-categories-grid > div:nth-child(3){background:#fef3c7!important;border-color:#fde68a!important;}
#class2-vietnamese-runtime #exam-categories-grid h3{font-size:21px!important;line-height:1.25!important;}
#class2-vietnamese-runtime #exam-categories-grid p{font-size:17px!important;line-height:1.4!important;}
#class2-vietnamese-runtime #exam-categories-grid span{font-size:16px!important;}
#class2-vietnamese-runtime #exam-categories-grid button{font-size:16px!important;line-height:1.25!important;}
#class2-vietnamese-runtime #view-exam-hub > div > .text-center h2{font-size:22px!important;line-height:1.25!important;}
#class2-vietnamese-runtime #view-exam-hub > div > .text-center p{font-size:16px!important;line-height:1.4!important;}

/* Mini games: cùng số cột, chiều cao card, palette và cỡ chữ với Toán. */
#class2-vietnamese-runtime #view-minigame-hub > div{width:100%!important;max-width:100%!important;}
#class2-vietnamese-runtime #minigame-grid{width:100%!important;grid-template-columns:repeat(4,minmax(0,1fr))!important;gap:10px!important;}
#class2-vietnamese-runtime #minigame-grid > div{
    min-height:122px!important;
    padding:11px 13px!important;
    border-width:1px!important;
    border-radius:22px!important;
    box-shadow:none!important;
}
#class2-vietnamese-runtime #minigame-grid > div:nth-child(6n+1){background:#ffe4e6!important;border-color:#fda4af!important;}
#class2-vietnamese-runtime #minigame-grid > div:nth-child(6n+2){background:#dbeafe!important;border-color:#93c5fd!important;}
#class2-vietnamese-runtime #minigame-grid > div:nth-child(6n+3){background:#ede9fe!important;border-color:#c4b5fd!important;}
#class2-vietnamese-runtime #minigame-grid > div:nth-child(6n+4){background:#fef3c7!important;border-color:#fcd34d!important;}
#class2-vietnamese-runtime #minigame-grid > div:nth-child(6n+5){background:#fae8ff!important;border-color:#e879f9!important;}
#class2-vietnamese-runtime #minigame-grid > div:nth-child(6n+6){background:#d1fae5!important;border-color:#6ee7b7!important;}
#class2-vietnamese-runtime #minigame-grid > div > div.text-4xl{font-size:30px!important;line-height:1!important;margin-top:0!important;}
#class2-vietnamese-runtime #minigame-grid h3{font-size:18px!important;line-height:1.25!important;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;}
#class2-vietnamese-runtime #minigame-grid p{font-size:16px!important;line-height:1.35!important;margin-top:4px!important;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;}
#class2-vietnamese-runtime #minigame-grid > div > span{font-size:16px!important;}
#class2-vietnamese-runtime #view-minigame-hub h2{font-size:20px!important;}
#class2-vietnamese-runtime #view-minigame-hub h2 + p{font-size:16px!important;}

@media(max-width:1023px){
    #class2-vietnamese-runtime #minigame-grid{grid-template-columns:repeat(3,minmax(0,1fr))!important;}
}
@media(max-width:767px){
    #content-stage:has(#class2-vietnamese-runtime){padding-top:.08rem!important;padding-bottom:0!important;}
    #class2-vietnamese-runtime #view-bai-hoc-hub,
    #class2-vietnamese-runtime #view-bai-hoc-lesson,
    #class2-vietnamese-runtime #view-lecture,
    #class2-vietnamese-runtime #view-roadmap,
    #class2-vietnamese-runtime #view-minigame-hub,
    #class2-vietnamese-runtime #view-game-play,
    #class2-vietnamese-runtime #view-exam-hub,
    #class2-vietnamese-runtime #view-quiz > .pastel-card{padding-top:.25rem!important;padding-bottom:.25rem!important;}
    #class2-vietnamese-runtime #view-dashboard-grid .pastel-card h3{font-size:17px!important;}
    #class2-vietnamese-runtime #view-dashboard-grid .pastel-card > div:last-child > span:first-child{font-size:16px!important;}
    #class2-vietnamese-runtime #bai-hoc-grid > button > div:first-child,
    #class2-vietnamese-runtime #roadmap-svg-container button > div:first-child{font-size:18px!important;}
    #class2-vietnamese-runtime #bai-hoc-grid > button > div:nth-child(2),
    #class2-vietnamese-runtime #roadmap-svg-container button > div:nth-child(2){font-size:16px!important;}
    #class2-vietnamese-runtime #view-bai-hoc-lesson #bai-hoc-lesson-meta{font-size:16px!important;}
    #class2-vietnamese-runtime #bai-hoc-sections > .grid.grid-cols-3 button{font-size:16px!important;height:42px!important;}
    #class2-vietnamese-runtime #minigame-grid{grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:8px!important;}
    #class2-vietnamese-runtime #minigame-grid > div{min-height:118px!important;padding:10px!important;}
    #class2-vietnamese-runtime #minigame-grid h3{font-size:16.5px!important;}
    #class2-vietnamese-runtime #minigame-grid p{font-size:16px!important;}
}
`;

const TV_INLINE_BRIDGE_GETTERS_ = Object.freeze({
    'answerStoryQuestion_': () => (typeof answerStoryQuestion_ === 'function' ? answerStoryQuestion_ : null),
    'changeAccountType': () => (typeof changeAccountType === 'function' ? changeAccountType : null),
    'checkAnswer': () => (typeof checkAnswer === 'function' ? checkAnswer : null),
    'checkTopic3FusionAnswer': () => (typeof checkTopic3FusionAnswer === 'function' ? checkTopic3FusionAnswer : null),
    'closeAccountManager': () => (typeof closeAccountManager === 'function' ? closeAccountManager : null),
    'closeHistoryModal': () => (typeof closeHistoryModal === 'function' ? closeHistoryModal : null),
    'closePremiumAccessPopup': () => (typeof closePremiumAccessPopup === 'function' ? closePremiumAccessPopup : null),
    'closeReviewWrongModal': () => (typeof closeReviewWrongModal === 'function' ? closeReviewWrongModal : null),
    'exportReportToPDF': () => (typeof exportReportToPDF === 'function' ? exportReportToPDF : null),
    'goHome': () => (typeof goHome === 'function' ? goHome : null),
    'handleNextExamFromReport': () => (typeof handleNextExamFromReport === 'function' ? handleNextExamFromReport : null),
    'isMiniGameActive': () => (typeof isMiniGameActive === 'function' ? isMiniGameActive : null),
    'jumpToQuestion': () => (typeof jumpToQuestion === 'function' ? jumpToQuestion : null),
    'loadAccountManager': () => (typeof loadAccountManager === 'function' ? loadAccountManager : null),
    'logout': () => (typeof logout === 'function' ? logout : null),
    'markCurrentBaiHocCompleteTV2_': () => (typeof markCurrentBaiHocCompleteTV2_ === 'function' ? markCurrentBaiHocCompleteTV2_ : null),
    'nextQuestion': () => (typeof nextQuestion === 'function' ? nextQuestion : null),
    'openAccountManager': () => (typeof openAccountManager === 'function' ? openAccountManager : null),
    'openAlphabetSubmenuItem_': () => (typeof openAlphabetSubmenuItem_ === 'function' ? openAlphabetSubmenuItem_ : null),
    'openAuthScreen': () => (typeof openAuthScreen === 'function' ? openAuthScreen : null),
    'openBaiHocByNumberTV2_': () => (typeof openBaiHocByNumberTV2_ === 'function' ? openBaiHocByNumberTV2_ : null),
    'openBaiHocHub': () => (typeof openBaiHocHub === 'function' ? openBaiHocHub : null),
    'openFairyCategory_': () => (typeof openFairyCategory_ === 'function' ? openFairyCategory_ : null),
    'openFairyLibrary_': () => (typeof openFairyLibrary_ === 'function' ? openFairyLibrary_ : null),
    'openGamePlay': () => (typeof openGamePlay === 'function' ? openGamePlay : null),
    'openHistoryModal': () => (typeof openHistoryModal === 'function' ? openHistoryModal : null),
    'openMainTab': () => (typeof openMainTab === 'function' ? openMainTab : null),
    'openMiniGameHub': () => (typeof openMiniGameHub === 'function' ? openMiniGameHub : null),
    'openReviewWrongModal': () => (typeof openReviewWrongModal === 'function' ? openReviewWrongModal : null),
    'openRoadmap': () => (typeof openRoadmap === 'function' ? openRoadmap : null),
    'openThoNhacMenu': () => (typeof openThoNhacMenu === 'function' ? openThoNhacMenu : null),
    'openThoNhacStory_': () => (typeof openThoNhacStory_ === 'function' ? openThoNhacStory_ : null),
    'openTopic': () => (typeof openTopic === 'function' ? openTopic : null),
    'playAudio': () => (typeof playAudio === 'function' ? playAudio : null),
    'prevQuestion': () => (typeof prevQuestion === 'function' ? prevQuestion : null),
    'renderAccountManagerRows': () => (typeof renderAccountManagerRows === 'function' ? renderAccountManagerRows : null),
    'renderAlphabetBoard': () => (typeof renderAlphabetBoard === 'function' ? renderAlphabetBoard : null),
    'startTV2Alphabet11AfterIntro_': () => (typeof startTV2Alphabet11AfterIntro_ === 'function' ? startTV2Alphabet11AfterIntro_ : null),
    'toggleTV2Alphabet11Reference_': () => (typeof toggleTV2Alphabet11Reference_ === 'function' ? toggleTV2Alphabet11Reference_ : null),
    'resolveClass2VietnameseImageSrc': () => (typeof resolveClass2VietnameseImageSrc === 'function' ? resolveClass2VietnameseImageSrc : null),
    'returnToTopicLecture': () => (typeof returnToTopicLecture === 'function' ? returnToTopicLecture : null),
    'selectBaiTapTV2_': () => (typeof selectBaiTapTV2_ === 'function' ? selectBaiTapTV2_ : null),
    'selectSubtopic': () => (typeof selectSubtopic === 'function' ? selectSubtopic : null),
    'setMiniGameQuestionAudio': () => (typeof setMiniGameQuestionAudio === 'function' ? setMiniGameQuestionAudio : null),
    'showLockedBaiTapTV2_': () => (typeof showLockedBaiTapTV2_ === 'function' ? showLockedBaiTapTV2_ : null),
    'sortAccountManager': () => (typeof sortAccountManager === 'function' ? sortAccountManager : null),
    'speakActiveFairyStory_': () => (typeof speakActiveFairyStory_ === 'function' ? speakActiveFairyStory_ : null),
    'speakCurrentQuestion': () => (typeof speakCurrentQuestion === 'function' ? speakCurrentQuestion : null),
    'speakTopic11Poem_': () => (typeof speakTopic11Poem_ === 'function' ? speakTopic11Poem_ : null),
    'speakLecture': () => (typeof speakLecture === 'function' ? speakLecture : null),
    'speakMiniGameQuestion': () => (typeof speakMiniGameQuestion === 'function' ? speakMiniGameQuestion : null),
    'speakMiniGameTextSafe': () => (typeof speakMiniGameTextSafe === 'function' ? speakMiniGameTextSafe : null),
    'speakPedagogicalEvaluation': () => (typeof speakPedagogicalEvaluation === 'function' ? speakPedagogicalEvaluation : null),
    'speakTopic3FusionQuestion': () => (typeof speakTopic3FusionQuestion === 'function' ? speakTopic3FusionQuestion : null),
    'speakTopic4Reading_': () => (typeof speakTopic4Reading_ === 'function' ? speakTopic4Reading_ : null),
    'speakVietnamese': () => (typeof speakVietnamese === 'function' ? speakVietnamese : null),
    'startRandomExam': () => (typeof startRandomExam === 'function' ? startRandomExam : null),
    'topic4ReadingDone_': () => (typeof topic4ReadingDone_ === 'function' ? topic4ReadingDone_ : null),
    'topic4ReadingHint_': () => (typeof topic4ReadingHint_ === 'function' ? topic4ReadingHint_ : null),
    'topic8PickToken': () => (typeof topic8PickToken === 'function' ? topic8PickToken : null),
    'topic8ResetCurrent': () => (typeof topic8ResetCurrent === 'function' ? topic8ResetCurrent : null),
    'topic8ReturnToken': () => (typeof topic8ReturnToken === 'function' ? topic8ReturnToken : null),
    'triggerSubmitQuizPrompt': () => (typeof triggerSubmitQuizPrompt === 'function' ? triggerSubmitQuizPrompt : null)
});

// ================= CLASS 2 VIETNAMESE MODULE BRIDGE =================
async function loadSharedImageCatalogTV2_(){
  if(sharedImageCatalogCacheTV2_) return sharedImageCatalogCacheTV2_;
  const res=await fetch(SHARED_IMAGE_CATALOG_FILE_TV2,{cache:'no-store'}); if(!res.ok) throw new Error('Không thể tải kho ảnh dùng chung Lớp 2');
  const data=await res.json(); if(!data||!data.images) throw new Error('Kho ảnh dùng chung không đúng cấu trúc');
  sharedImageCatalogCacheTV2_=data; sharedImageByBasenameTV2_=new Map();
  Object.entries(data.images).forEach(([imageId,meta])=>{const src=String(meta?.src||''); const base=src.split('/').pop().toLowerCase(); if(base) sharedImageByBasenameTV2_.set(base,{imageId,...meta});});
  return data;
}
function catalogMetaByRefTV2_(itemOrPath){
  if(!sharedImageCatalogCacheTV2_) return null;
  if(itemOrPath&&typeof itemOrPath==='object'){
    const imageId=String(itemOrPath.imageId||itemOrPath.image_id||'').trim(); if(imageId&&sharedImageCatalogCacheTV2_.images?.[imageId]) return {imageId,...sharedImageCatalogCacheTV2_.images[imageId]};
    itemOrPath=itemOrPath.img||itemOrPath.image_url||itemOrPath.image||itemOrPath.src||'';
  }
  const raw=String(itemOrPath||'').trim(); if(!raw) return null; const base=raw.split('/').pop().toLowerCase();
  const exact=sharedImageByBasenameTV2_.get(base); if(exact) return exact;
  const stem=base.replace(/\.(?:jpe?g|png|webp)$/i,''); if(stem&&sharedImageCatalogCacheTV2_.images?.[stem]) return {imageId:stem,...sharedImageCatalogCacheTV2_.images[stem]};
  return null;
}
function resolveCatalogImageSrcTV2_(itemOrPath){return catalogMetaByRefTV2_(itemOrPath)?.src||'';}
function resolveClass2VietnameseImageSrc(imageIdOrLegacy){return resolveCatalogImageSrcTV2_(typeof imageIdOrLegacy==='string'?imageIdOrLegacy:{imageId:imageIdOrLegacy});}

function class2LocalUserTV2_(){
  const shared=tvModuleCtx_?.user||null; const userId=shared?.userId?String(shared.userId).toUpperCase():'KHACH'; const name=shared?.name?String(shared.name):(userId==='KHACH'?'Bé Khách':'Bé'); const access=String(tvModuleCtx_?.accessType||'regular').toLowerCase(); const role=String(shared?.role||(access==='admin'?'admin':'student')).toLowerCase()==='admin'?'admin':'student';
  return {name,hoTen:name,maHS:userId,lop:'',ngaySinh:'',vaiTro:role,role,loaiTaiKhoan:access,isGuest:!shared||!userId||userId==='KHACH',sessionPending:false};
}
function syncClass2ModuleStateTV2_(){const prev=String(currentUser?.maHS||''); currentUser=class2LocalUserTV2_(); if(prev!==String(currentUser.maHS||'')) resetAdaptiveLearningState_(); updatePremiumUI();}
function newTvAssessmentAttemptId_(){return `TV-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2,10).toUpperCase()}`.slice(0,48);}
function assessmentAnswersPayloadTV2_(){return activeQuestionsList.map((q,i)=>({questionId:String(q.question_id??''),answer:String(userAnswers[i]??'')})).filter(x=>x.questionId);}
function handleTvAssessmentBackendUnavailable_(err){
  if(['ASSESSMENT_NOT_SUPPORTED','UNSUPPORTED_ACTION'].includes(String(err?.code||''))&&!tvOfficialAssessmentBackendNoticeShown_){tvOfficialAssessmentBackendNoticeShown_=true; showAppToast('Tiến độ chính thức Tiếng Việt 2 chưa được backend Lớp 2 bật; kết quả vẫn dùng để luyện tập nhưng module không tự mở khóa từ dữ liệu client.', 'warning', 3600);}
}
let tvScoreObserver_ = null;
function syncClass2ScoreTV2_(){
 if(tvModuleDestroyed_ || !tvModuleCtx_)return;
 tvModuleCtx_.hooks?.setScore?.(Math.max(0,Number(starGreenCount)||0),Math.max(0,Number(starRedCount)||0));
}
function installTvScoreObserver_(){
 tvScoreObserver_?.disconnect(); tvScoreObserver_=null;
 const green=document.getElementById('star-green-count');
 const red=document.getElementById('star-red-count');
 if(!green||!red)return;
 tvScoreObserver_=new MutationObserver(syncClass2ScoreTV2_);
 tvScoreObserver_.observe(green,{childList:true,characterData:true,subtree:true});
 tvScoreObserver_.observe(red,{childList:true,characterData:true,subtree:true});
 syncClass2ScoreTV2_();
}
const __tvPlayAudioStandalone_=playAudio;
playAudio=function(type){const out=__tvPlayAudioStandalone_.apply(this,arguments);setTimeout(syncClass2ScoreTV2_,0);return out;};
function resetStars(){starGreenCount=0;starRedCount=0; const g=document.getElementById('star-green-count');if(g)g.textContent='0';const r=document.getElementById('star-red-count');if(r)r.textContent='0';syncClass2ScoreTV2_();}

const __tvUpdateNavStandalone_=updateNavTabs;
updateNavTabs=function(level2Title,level2Icon,level3Title,level4Title){const out=__tvUpdateNavStandalone_.apply(this,arguments);syncClass2BannerTV2_();return out;};
const __tvSetShellRootStandalone_=setAppShellRootMode_;
setAppShellRootMode_=function(isRoot){const out=__tvSetShellRootStandalone_.apply(this,arguments);syncClass2BannerTV2_();return out;};
function tvReadStandaloneBreadcrumb_(){
  const out=[];
  [2,3,4,5].forEach(level=>{
    const tab=document.getElementById(`header-level${level}-tab`);
    const title=document.getElementById(`header-level${level}-title`);
    if(!tab||!title||tab.classList.contains('hidden'))return;
    const label=String(title.textContent||'').trim();
    if(label)out.push({level,title:label});
  });
  return out;
}
function tvBreadcrumbActionForLevel_(level){
  const tab=document.getElementById(`header-level${level}-tab`);
  if(!tab)return null;
  const target=level===2?tab.querySelector('button'):tab.querySelector('div');
  if(!target)return null;
  const clickable=typeof target.onclick==='function'||target.getAttribute('role')==='button';
  if(!clickable)return null;
  return ()=>{try{target.click();}catch(_){}};
}
function resetClass2TvBreadcrumb_(){
  const pill=document.getElementById('sub-pill');
  if(!pill)return;
  pill.classList.remove('tv-sub-breadcrumbs');
  pill.removeAttribute('aria-label');
  pill.removeAttribute('title');
}
function syncClass2BannerTV2_(){
  if(!tvModuleCtx_?.hooks)return;
  if(appShellRootMode_){
    tvModuleCtx_.hooks.clearDetail?.();
    resetClass2TvBreadcrumb_();
    return;
  }
  const crumbs=tvReadStandaloneBreadcrumb_();
  const fallback=crumbs.map(x=>x.title).join(' · ')||'Tiếng Việt 2';
  tvModuleCtx_.hooks.setDetail?.(fallback);
  const pill=document.getElementById('sub-pill');
  if(!pill)return;
  pill.classList.add('tv-sub-breadcrumbs');
  pill.setAttribute('aria-label','Điều hướng chuyên mục Tiếng Việt');
  pill.title=fallback;
  if(!crumbs.length){pill.textContent=fallback;return;}
  pill.replaceChildren();
  crumbs.forEach((crumb,index)=>{
    if(index){
      const sep=document.createElement('span');
      sep.className='tv-breadcrumb-sep';
      sep.setAttribute('aria-hidden','true');
      sep.textContent='›';
      pill.appendChild(sep);
    }
    const action=tvBreadcrumbActionForLevel_(crumb.level);
    const node=document.createElement(action?'button':'span');
    if(action)node.type='button';
    node.className=`tv-breadcrumb-tab tv-breadcrumb-level${crumb.level}`;
    node.textContent=crumb.title;
    node.title=crumb.title;
    if(action){
      node.setAttribute('aria-label',`Quay lại ${crumb.title}`);
      node.addEventListener('click',action);
    }
    pill.appendChild(node);
  });
}

const tvInlineBridgePrevious_=new Map();
function installTvInlineBridge_(){
  Object.entries(TV_INLINE_BRIDGE_GETTERS_).forEach(([name,getter])=>{
    let fn=null; try{fn=getter();}catch(_){fn=null;}
    if(typeof fn!=='function') return;
    if(!tvInlineBridgePrevious_.has(name)) tvInlineBridgePrevious_.set(name,{had:Object.prototype.hasOwnProperty.call(window,name),value:window[name]});
    window[name]=fn;
  });
}
function removeTvInlineBridge_(){tvInlineBridgePrevious_.forEach((prev,name)=>{if(prev.had)window[name]=prev.value;else try{delete window[name];}catch(_){window[name]=undefined;}});tvInlineBridgePrevious_.clear();}
function ensureTvDependency_(kind,id,url){if(document.getElementById(id))return;if(kind==='link'){const el=document.createElement('link');el.id=id;el.rel='stylesheet';el.href=url;document.head.appendChild(el);return;}const el=document.createElement('script');el.id=id;el.src=url;el.async=true;document.head.appendChild(el);}
function ensureTvDependencies_(){ensureTvDependency_('link','class2-tv-fontawesome','https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');ensureTvDependency_('link','class2-tv-fonts','https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Quicksand:wght@500;700;800&display=swap');ensureTvDependency_('script','class2-tv-chartjs','https://cdn.jsdelivr.net/npm/chart.js');ensureTvDependency_('script','class2-tv-confetti','https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js');ensureTvDependency_('script','class2-tv-html2pdf','https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js');}
const TV_EXPLORE_TA2_SCALE_CSS_ = `

/* Class 2 Tiếng Việt: 11 thẻ Khám phá - biểu tượng và chữ cân với Tiếng Anh 2. */
#class2-vietnamese-runtime #view-dashboard-grid > .tv2-explore-card{
    min-height:148px!important;
    padding:12px 12px 10px!important;
}
#class2-vietnamese-runtime #view-dashboard-grid > .tv2-explore-card .tv2-explore-head{
    display:flex!important;
    align-items:center!important;
    gap:11px!important;
    min-width:0!important;
}
#class2-vietnamese-runtime #view-dashboard-grid > .tv2-explore-card .tv2-explore-icon{
    box-sizing:border-box!important;
    width:60px!important;
    height:60px!important;
    min-width:60px!important;
    min-height:60px!important;
    flex:0 0 60px!important;
    display:inline-flex!important;
    align-items:center!important;
    justify-content:center!important;
    border-radius:17px!important;
    border:2px solid #d6bdf6!important;
    background:#eee0ff!important;
    font-family:'Apple Color Emoji','Segoe UI Emoji','Noto Color Emoji',sans-serif!important;
    font-size:36px!important;
    line-height:1!important;
    font-weight:400!important;
    opacity:1!important;
    filter:saturate(1.25) contrast(1.07)!important;
    box-shadow:0 3px 9px rgba(109,40,217,.15),inset 0 1px 2px rgba(255,255,255,.9)!important;
    transition:transform .18s ease,box-shadow .18s ease!important;
}
#class2-vietnamese-runtime #view-dashboard-grid > .tv2-explore-card:hover .tv2-explore-icon{
    transform:translateY(-2px) scale(1.06)!important;
    box-shadow:0 5px 12px rgba(109,40,217,.20),inset 0 1px 2px rgba(255,255,255,.9)!important;
}
#class2-vietnamese-runtime #view-dashboard-grid .tv2-explore-icon.bg-pink-100{background:#ffd9eb!important;border-color:#f89bc8!important;}
#class2-vietnamese-runtime #view-dashboard-grid .tv2-explore-icon.bg-rose-100{background:#ffe0e7!important;border-color:#fda4bc!important;}
#class2-vietnamese-runtime #view-dashboard-grid .tv2-explore-icon.bg-purple-100{background:#eee0ff!important;border-color:#c3a3f3!important;}
#class2-vietnamese-runtime #view-dashboard-grid .tv2-explore-icon.bg-violet-100{background:#e8d9ff!important;border-color:#bda3f7!important;}
#class2-vietnamese-runtime #view-dashboard-grid .tv2-explore-icon.bg-indigo-100{background:#e0e7ff!important;border-color:#a5b4fc!important;}
#class2-vietnamese-runtime #view-dashboard-grid .tv2-explore-icon.bg-blue-100{background:#dbeafe!important;border-color:#93c5fd!important;}
#class2-vietnamese-runtime #view-dashboard-grid .tv2-explore-icon.bg-sky-100{background:#e0f2fe!important;border-color:#7dd3fc!important;}
#class2-vietnamese-runtime #view-dashboard-grid .tv2-explore-icon.bg-cyan-100{background:#cffafe!important;border-color:#67e8f9!important;}
#class2-vietnamese-runtime #view-dashboard-grid .tv2-explore-icon.bg-emerald-100{background:#d1fae5!important;border-color:#6ee7b7!important;}
#class2-vietnamese-runtime #view-dashboard-grid .tv2-explore-icon.bg-amber-100{background:#fef3c7!important;border-color:#fcd34d!important;}
#class2-vietnamese-runtime #view-dashboard-grid .tv2-explore-icon.bg-yellow-100{background:#fef9c3!important;border-color:#fde047!important;}
#class2-vietnamese-runtime #view-dashboard-grid .tv2-explore-icon.bg-fuchsia-100{background:#fae8ff!important;border-color:#f0abfc!important;}
#class2-vietnamese-runtime #view-dashboard-grid .tv2-explore-icon--text{
    font-family:'Nunito',sans-serif!important;
    font-size:23px!important;
    font-weight:900!important;
}
#class2-vietnamese-runtime #view-dashboard-grid > .tv2-explore-card .tv2-explore-title{
    min-width:0!important;
    font-size:19.5px!important;
    font-weight:900!important;
    line-height:1.18!important;
}
#class2-vietnamese-runtime #view-dashboard-grid > .tv2-explore-card .tv2-explore-foot{
    margin-top:8px!important;
    padding-top:8px!important;
    gap:8px!important;
    align-items:flex-end!important;
}
#class2-vietnamese-runtime #view-dashboard-grid > .tv2-explore-card .tv2-explore-foot .tv2-explore-desc{
    min-width:0!important;
    flex:1 1 auto;
    font-size:16px!important;
    line-height:1.3!important;
}
#class2-vietnamese-runtime #view-dashboard-grid > .tv2-explore-card .tv2-explore-foot .tv2-explore-count{
    flex:0 0 auto;
}
@media(max-width:520px){
    #class2-vietnamese-runtime #view-dashboard-grid > .tv2-explore-card{min-height:132px!important;}
    #class2-vietnamese-runtime #view-dashboard-grid > .tv2-explore-card .tv2-explore-icon{
        width:52px!important;height:52px!important;
        min-width:52px!important;min-height:52px!important;
        flex-basis:52px!important;font-size:31px!important;border-radius:15px!important;
    }
    #class2-vietnamese-runtime #view-dashboard-grid > .tv2-explore-card .tv2-explore-title{font-size:18px!important;}
}

`;

const TV_FOLDER_TA2_HOVER_CSS_ = `
/* TV2 visual parity with approved Class-1 cards: stationary box, accented border, growing icon. */
#class2-vietnamese-runtime :is(
  #view-dashboard-grid > .tv2-explore-card,
  #bai-hoc-grid > button,
  #roadmap-svg-container button,
  #lecture-subtopics-list > button,
  #exam-categories-grid > div,
  #minigame-grid > div
){
  transform:none!important;translate:none!important;rotate:none!important;
  animation:none!important;
  transition:border-color .18s ease,box-shadow .18s ease!important;
}
@media(hover:hover) and (pointer:fine){
  #class2-vietnamese-runtime #view-dashboard-grid > .tv2-explore-card:hover{
    transform:none!important;filter:none!important;box-shadow:none!important;
    border-color:#a855f7!important;
  }
  #class2-vietnamese-runtime #view-dashboard-grid > .tv2-explore-card:hover:has(h3.text-pink-700){border-color:#f472b6!important;}
  #class2-vietnamese-runtime #view-dashboard-grid > .tv2-explore-card:hover:has(h3.text-purple-700){border-color:#c084fc!important;}
  #class2-vietnamese-runtime #view-dashboard-grid > .tv2-explore-card:hover:has(h3.text-indigo-700){border-color:#818cf8!important;}
  #class2-vietnamese-runtime #view-dashboard-grid > .tv2-explore-card:hover:has(h3.text-cyan-700){border-color:#22d3ee!important;}
  #class2-vietnamese-runtime #view-dashboard-grid > .tv2-explore-card:hover:has(h3.text-sky-700){border-color:#38bdf8!important;}
  #class2-vietnamese-runtime #view-dashboard-grid > .tv2-explore-card:hover:has(h3.text-emerald-700){border-color:#34d399!important;}
  #class2-vietnamese-runtime #view-dashboard-grid > .tv2-explore-card:hover:has(h3.text-amber-700){border-color:#fbbf24!important;}
  #class2-vietnamese-runtime #view-dashboard-grid > .tv2-explore-card:hover:has(h3.text-yellow-700){border-color:#facc15!important;}
  #class2-vietnamese-runtime #view-dashboard-grid > .tv2-explore-card:hover:has(h3.text-rose-700){border-color:#fb7185!important;}
  #class2-vietnamese-runtime #view-dashboard-grid > .tv2-explore-card:hover:has(h3.text-fuchsia-700){border-color:#e879f9!important;}
  #class2-vietnamese-runtime #view-dashboard-grid > .tv2-explore-card:hover .tv2-explore-icon{
    transform:scale(1.06)!important;
    box-shadow:0 5px 12px rgba(109,40,217,.18),inset 0 1px 2px rgba(255,255,255,.9)!important;
  }
  #class2-vietnamese-runtime #bai-hoc-grid > button:not(:disabled):hover,
  #class2-vietnamese-runtime #roadmap-svg-container button:not(:disabled):not(.opacity-60):hover{
    box-shadow:0 4px 6px -1px rgba(0,0,0,.10),0 2px 4px -2px rgba(0,0,0,.10)!important;
    border-color:#c084fc!important;
  }
  #class2-vietnamese-runtime #lecture-subtopics-list > button:not(.tv2-learning-card):hover,
  #class2-vietnamese-runtime #exam-categories-grid > div:hover,
  #class2-vietnamese-runtime #minigame-grid > div:hover{
    transform:none!important;filter:none!important;box-shadow:none!important;border-color:#a855f7!important;
  }
}
#class2-vietnamese-runtime #minigame-grid > div > div.text-4xl,
#class2-vietnamese-runtime #exam-categories-grid > div > div:first-child > div.text-4xl{
  box-sizing:border-box!important;
  width:60px!important;height:60px!important;min-width:60px!important;min-height:60px!important;
  display:flex!important;align-items:center!important;justify-content:center!important;
  flex-shrink:0!important;margin-left:auto!important;margin-right:auto!important;margin-bottom:8px!important;
  border-radius:17px!important;border:2px solid #c3a3f3!important;background:#eee0ff!important;
  font-family:'Apple Color Emoji','Segoe UI Emoji','Noto Color Emoji',sans-serif!important;
  font-size:36px!important;line-height:1!important;font-weight:400!important;
  box-shadow:0 3px 9px rgba(109,40,217,.14),inset 0 1px 2px rgba(255,255,255,.9)!important;
  transform:none!important;transition:transform .18s ease!important;
}
@media(hover:hover) and (pointer:fine){
  #class2-vietnamese-runtime #minigame-grid > div:hover > div.text-4xl,
  #class2-vietnamese-runtime #exam-categories-grid > div:hover > div:first-child > div.text-4xl{
    transform:scale(1.06)!important;
  }
}
@media(max-width:560px){
  #class2-vietnamese-runtime #minigame-grid > div > div.text-4xl,
  #class2-vietnamese-runtime #exam-categories-grid > div > div:first-child > div.text-4xl{
    width:52px!important;height:52px!important;min-width:52px!important;min-height:52px!important;
    font-size:31px!important;border-radius:15px!important;
  }
}
@media(prefers-reduced-motion:reduce){
  #class2-vietnamese-runtime :is(#view-dashboard-grid > .tv2-explore-card,#bai-hoc-grid > button,#roadmap-svg-container button,#lecture-subtopics-list > button,#exam-categories-grid > div,#minigame-grid > div),
  #class2-vietnamese-runtime .tv2-learning-icon,
  #class2-vietnamese-runtime #minigame-grid > div > div.text-4xl,
  #class2-vietnamese-runtime #exam-categories-grid > div > div:first-child > div.text-4xl{transition:none!important;}
  #class2-vietnamese-runtime #view-dashboard-grid > .tv2-explore-card:hover .tv2-explore-icon,
  #class2-vietnamese-runtime #minigame-grid > div:hover > div.text-4xl,
  #class2-vietnamese-runtime #exam-categories-grid > div:hover > div:first-child > div.text-4xl{transform:none!important;}
}
`;

const TV_CHILD_TA_PARITY_CSS_ = `
/* TV2: Exact child-card UI from ta_app(7).js, isolated from old Explore rules. */
#class2-vietnamese-runtime #lecture-subtopics-list > button.tv2-learning-card{
  --lc-bg:#fff1f7;--lc-border:#f9a8d4;--lc-ink:#be185d;--lc-icon:#fce7f3;--lc-glow:rgba(236,72,153,.10);
  display:flex!important; flex-direction:column; justify-content:space-between; gap:7px;
  min-width:0;width:100%;min-height:143px;padding:12px 12px 10px!important;
  text-align:left;cursor:pointer; border:1px solid var(--lc-border)!important;
  border-radius:22px!important; background:var(--lc-bg)!important;color:#334155!important;
  box-shadow:none!important; outline-offset:3px; box-sizing:border-box;
  transform:none!important;translate:none!important;scale:1!important;rotate:none!important;
  animation:none!important;filter:none!important;
  transition:border-color .18s ease!important;
}
#class2-vietnamese-runtime #lecture-subtopics-list > button.tv2-learning-card--pink{--lc-bg:#fcecf5;--lc-border:#f9a8d4;--lc-ink:#c2185b;--lc-icon:#fce7f3;--lc-glow:rgba(236,72,153,.11);}
#class2-vietnamese-runtime #lecture-subtopics-list > button.tv2-learning-card--violet{--lc-bg:#f5ecff;--lc-border:#e9a8ff;--lc-ink:#9d00e8;--lc-icon:#f3e8ff;--lc-glow:rgba(168,85,247,.11);}
#class2-vietnamese-runtime #lecture-subtopics-list > button.tv2-learning-card--sky{--lc-bg:#eaf3ff;--lc-border:#b4d5ff;--lc-ink:#2563eb;--lc-icon:#e0f2fe;--lc-glow:rgba(59,130,246,.10);}
#class2-vietnamese-runtime #lecture-subtopics-list > button.tv2-learning-card--fuchsia{--lc-bg:#f9ecff;--lc-border:#e9b4fa;--lc-ink:#b000d4;--lc-icon:#fae8ff;--lc-glow:rgba(217,70,239,.105);}
#class2-vietnamese-runtime #lecture-subtopics-list > button.tv2-learning-card--mint{--lc-bg:#e5f8ef;--lc-border:#a7e7c4;--lc-ink:#047857;--lc-icon:#d1fae5;--lc-glow:rgba(16,185,129,.09);}
#class2-vietnamese-runtime #lecture-subtopics-list > button.tv2-learning-card--peach{--lc-bg:#fff0e8;--lc-border:#ffc9ad;--lc-ink:#c2410c;--lc-icon:#ffedd5;--lc-glow:rgba(249,115,22,.09);}
#class2-vietnamese-runtime .tv2-learning-card .tv2-learning-top{
  display:flex!important;align-items:center;gap:11px;min-width:0;width:100%;
}
#class2-vietnamese-runtime .tv2-learning-card .tv2-learning-icon{
  width:60px;height:60px;flex:0 0 60px;min-width:60px;min-height:60px;
  display:inline-flex;align-items:center;justify-content:center;
  background:var(--lc-icon); color:var(--lc-ink);
  border:2px solid var(--lc-border);border-radius:17px;
  font-family:'Apple Color Emoji','Segoe UI Emoji','Noto Color Emoji',sans-serif;
  font-size:35px;line-height:1; font-weight:400;
  box-shadow:0 3px 9px rgba(109,40,217,.14),inset 0 1px 2px rgba(255,255,255,.95);
  transform:none!important;translate:none!important;scale:1!important;rotate:none!important;
  transition:transform .18s ease!important;
  transform-origin:center center;
  will-change:transform;
}
#class2-vietnamese-runtime .tv2-learning-card .tv2-learning-icon-glyph{
  display:inline-block;line-height:1;transform:none!important;
  transition:transform .18s ease!important;transform-origin:center;
}
#class2-vietnamese-runtime .tv2-learning-card .tv2-learning-heading{display:flex;flex:1 1 auto;min-width:0;flex-direction:column;gap:3px;}
#class2-vietnamese-runtime .tv2-learning-card .tv2-learning-title{
  display:block;color:var(--lc-ink)!important;font-size:19.5px!important;font-weight:900!important;
  line-height:1.18!important;overflow-wrap:anywhere;
}
#class2-vietnamese-runtime .tv2-learning-card .tv2-learning-title-vi{
  display:block;color:#1f2937!important;font-size:14px!important;font-weight:800!important;
  line-height:1.22!important;overflow-wrap:anywhere;
}
#class2-vietnamese-runtime .tv2-learning-card .tv2-learning-bottom{
  display:flex;align-items:flex-end;justify-content:space-between;gap:8px;width:100%;min-width:0;
  padding-top:8px;border-top:1px solid color-mix(in srgb,var(--lc-border) 34%,transparent);
}
#class2-vietnamese-runtime .tv2-learning-card .tv2-learning-details{
  display:flex;flex:1 1 auto;min-width:0;flex-direction:column;gap:2px;
}
#class2-vietnamese-runtime .tv2-learning-card .tv2-learning-desc-en{
  display:block;font-size:15px!important;line-height:1.28!important;font-weight:800!important;color:#334155!important;overflow-wrap:anywhere;
}
#class2-vietnamese-runtime .tv2-learning-card .tv2-learning-desc-vi{
  display:block;font-size:13.5px!important;line-height:1.25!important;font-weight:800!important;color:#475569!important;overflow-wrap:anywhere;
}
#class2-vietnamese-runtime .tv2-learning-card .tv2-learning-badge{
  display:inline-flex;align-items:center;justify-content:center;flex:0 0 auto;
  border:1px solid var(--lc-border);border-radius:999px;padding:4px 10px;
  white-space:nowrap;background:#fff;color:var(--lc-ink);font-size:13px!important;
  font-weight:900!important;line-height:1.2!important;
}
/* Mục 11: bỏ mô tả lặp, vẫn giữ số câu và thu gọn thẻ chủ đề. */
#class2-vietnamese-runtime #lecture-subtopics-list > button.tv2-learning-card.tv2-m11-subtopic-card{
  min-height:108px!important;
}
#class2-vietnamese-runtime .tv2-m11-subtopic-card .tv2-learning-bottom{
  justify-content:flex-end;
}
@media(hover:hover) and (pointer:fine){
 #class2-vietnamese-runtime #lecture-subtopics-list > button.tv2-learning-card:not(.is-locked):hover{
   border-color:var(--lc-ink,#e879f9)!important;
   box-shadow:none!important;
   transform:none!important;translate:none!important;scale:1!important;rotate:none!important;
 }
}
#class2-vietnamese-runtime .tv2-learning-card:focus-visible,
#class2-vietnamese-runtime #view-dashboard-grid > .tv2-explore-card:focus-visible{
  outline:2px solid var(--lc-ink,#a855f7);outline-offset:2px;
  box-shadow:0 0 0 2px var(--lc-glow,rgba(168,85,247,.10))!important;
}
#class2-vietnamese-runtime .tv2-learning-card.is-locked{
  --lc-bg:#f8fafc;--lc-border:#e2e8f0;--lc-ink:#64748b;--lc-icon:#f1f5f9;
  opacity:.78;cursor:pointer;
}
@media(hover:hover) and (pointer:fine){
  /* Icon scales 1.06 exactly as TA1; the card itself never moves. */
  #class2-vietnamese-runtime .tv2-learning-card:not(.is-locked):hover .tv2-learning-icon{
    transform:scale(1.06)!important;
  }
}

/* TA1 fixed-card hover and accessible focus. */
#class2-vietnamese-runtime .tv2-learning-card,
#class2-vietnamese-runtime .tv2-learning-card:hover,
#class2-vietnamese-runtime .tv2-learning-card:active {
  transform:none!important;translate:none!important;scale:1!important;rotate:none!important;
  animation:none!important;transition:border-color .18s ease!important;
}
@media(hover:hover) and (pointer:fine){
  #class2-vietnamese-runtime #lecture-subtopics-list > button.tv2-learning-card:not(.is-locked):hover{
    transform:none!important;translate:none!important;scale:1!important;rotate:none!important;
    box-shadow:none!important;border-color:#a855f7!important;
  }
}
@media(max-width:560px){
 #class2-vietnamese-runtime #lecture-subtopics-list > button.tv2-learning-card{min-height:132px;padding:10px!important;border-radius:18px!important;}
 #class2-vietnamese-runtime .tv2-learning-card .tv2-learning-icon{width:52px;height:52px;min-width:52px;min-height:52px;flex-basis:52px;font-size:31px;border-radius:15px;}
 #class2-vietnamese-runtime .tv2-learning-card .tv2-learning-title{font-size:18px!important;}
 #class2-vietnamese-runtime .tv2-learning-card .tv2-learning-desc-en{font-size:14px!important;}
 #class2-vietnamese-runtime .tv2-learning-card .tv2-learning-badge{font-size:12px!important;padding:4px 8px;}
}
@media(prefers-reduced-motion:reduce){
 #class2-vietnamese-runtime .tv2-learning-card,
 #class2-vietnamese-runtime .tv2-learning-card .tv2-learning-icon{transition:none!important;}
 #class2-vietnamese-runtime .tv2-learning-card:hover .tv2-learning-icon{transform:none!important;}
}

`;

const TV_FAIRY_CARD_GRID_CSS_ = `
/* Muc 12: cac the danh muc va danh sach truyen phai chia cot bang nhau.
   Tieu de/mo ta toi da 2 dong, khong ep chu xuong tung tu. */
#class2-vietnamese-runtime #lecture-subtopics-list.tv-fairy-card-grid{
    display:grid!important;
    grid-template-columns:repeat(4,minmax(0,1fr))!important;
    width:100%!important;
    min-width:0!important;
    max-width:100%!important;
    gap:12px!important;
    align-items:stretch!important;
}
#class2-vietnamese-runtime #lecture-subtopics-list.tv-fairy-card-grid > .tv2-learning-card{
    min-width:0!important;
    width:100%!important;
    max-width:100%!important;
    min-height:142px!important;
}
#class2-vietnamese-runtime #lecture-subtopics-list.tv-fairy-card-grid .tv2-learning-title,
#class2-vietnamese-runtime #lecture-subtopics-list.tv-fairy-card-grid .tv2-learning-desc-en{
    display:-webkit-box!important;
    -webkit-box-orient:vertical!important;
    -webkit-line-clamp:2!important;
    overflow:hidden!important;
    overflow-wrap:break-word!important;
    word-break:normal!important;
}
@media(max-width:1023px){
    #class2-vietnamese-runtime #lecture-subtopics-list.tv-fairy-card-grid{
        grid-template-columns:repeat(2,minmax(0,1fr))!important;
    }
}
@media(max-width:639px){
    #class2-vietnamese-runtime #lecture-subtopics-list.tv-fairy-card-grid{
        grid-template-columns:minmax(0,1fr)!important;
        gap:10px!important;
    }
}
`;

// Muc 1.1: CSS tu dong theo man hinh, khong phu thuoc Tailwind dynamic class.
const TV2_ALPHABET11_CSS_ = `
#class2-vietnamese-runtime .tv2-a11-grid{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:7px;}
#class2-vietnamese-runtime .tv2-a11-key-upper{font-size:29px;}
#class2-vietnamese-runtime .tv2-a11-key-lower{font-size:27px;}
#class2-vietnamese-runtime .tv2-a11-target-tile{min-width:92px;height:95px;font-size:48px;}
#class2-vietnamese-runtime .tv2-a11-answer-letter{font-size:31px;font-weight:900;line-height:1.2;}
#class2-vietnamese-runtime .tv2-a11-answer-word{font-size:19px;font-weight:800;line-height:1.35;}
@media(min-width:640px){
 #class2-vietnamese-runtime .tv2-a11-grid{grid-template-columns:repeat(6,minmax(0,1fr));gap:9px;}
 #class2-vietnamese-runtime .tv2-a11-key-upper{font-size:34px;}
 #class2-vietnamese-runtime .tv2-a11-key-lower{font-size:31px;}
}
@media(min-width:768px){
 #class2-vietnamese-runtime .tv2-a11-grid{grid-template-columns:repeat(10,minmax(0,1fr));}
 #class2-vietnamese-runtime .tv2-a11-target-tile{min-width:112px;height:112px;font-size:60px;}
 #class2-vietnamese-runtime .tv2-a11-answer-letter{font-size:36px;}
 #class2-vietnamese-runtime .tv2-a11-answer-word{font-size:22px;}
}
`;

// Đồng bộ nét chữ học tập trong toàn module Tiếng Việt 2.
// Chỉ tác động câu hỏi/đáp án; không đổi Home, nút điều hướng, thuật toán chấm.
const TV2_LEARNING_TYPOGRAPHY_CSS_ = `
/* Khám phá / Bài tập / Ôn tập / Đề thi: một chuẩn cho các trạng thái trước/sau trả lời. */
#class2-vietnamese-runtime #question-box .tv2-quiz-question{
  font-family:'Nunito',system-ui,sans-serif!important;
  font-size:23px!important;
  font-weight:900!important;
  line-height:1.38!important;
  letter-spacing:0!important;
  overflow-wrap:break-word;
}
#class2-vietnamese-runtime #question-box .option-btn{
  font-family:'Nunito',system-ui,sans-serif!important;
  font-size:19px!important;
  font-weight:800!important;
  line-height:1.42!important;
  letter-spacing:0!important;
  overflow-wrap:anywhere;
  min-height:58px;
}
#class2-vietnamese-runtime #question-box .option-btn .opt-text,
#class2-vietnamese-runtime #question-box .option-btn > span,
#class2-vietnamese-runtime #question-box .option-btn > span > span{
  font-family:inherit!important;
  font-weight:800!important;
  line-height:inherit!important;
}
/* Giữ chữ cái đơn ở mục 1.1 lớn hơn chữ đáp án thông thường. */
#class2-vietnamese-runtime #question-box .option-btn .tv2-a11-answer-letter{font-size:31px!important;font-weight:900!important;}
#class2-vietnamese-runtime #question-box .option-btn .opt-badge{font-size:15px!important;line-height:1!important;}
#class2-vietnamese-runtime #question-box .tv2-quiz-reading-passage{
  font-family:'Nunito',system-ui,sans-serif!important;
  font-size:18px!important;
  font-weight:700!important;
  line-height:1.55!important;
}
#class2-vietnamese-runtime #question-box .tv2-topic8-token{
  font-family:'Nunito',system-ui,sans-serif!important;
  font-size:19px!important;
  font-weight:800!important;
  line-height:1.4!important;
}
/* Câu hỏi tại Bài học và phần đọc hiểu Truyện: vẫn dùng cùng bộ chữ. */
#class2-vietnamese-runtime #bai-hoc-sections .tv2-lesson-question{
  font-family:'Nunito',system-ui,sans-serif!important;
  font-size:20px!important;
  font-weight:900!important;
  line-height:1.48!important;
}
#class2-vietnamese-runtime #bai-hoc-sections .tv2-lesson-answer{
  font-family:'Nunito',system-ui,sans-serif!important;
  font-size:19px!important;
  font-weight:800!important;
  line-height:1.45!important;
  min-height:50px;
}
#class2-vietnamese-runtime .tv2-story-question{
  font-family:'Nunito',system-ui,sans-serif!important;
  font-size:20px!important;
  font-weight:900!important;
  line-height:1.45!important;
}
#class2-vietnamese-runtime .story-answer-btn{
  font-family:'Nunito',system-ui,sans-serif!important;
  font-size:18px!important;
  font-weight:800!important;
  line-height:1.45!important;
}
@media(max-width:639px){
  #class2-vietnamese-runtime #question-box .tv2-quiz-question{font-size:21px!important;line-height:1.4!important;}
  #class2-vietnamese-runtime #question-box .option-btn{font-size:18px!important;line-height:1.43!important;min-height:56px;}
  #class2-vietnamese-runtime #question-box .option-btn .tv2-a11-answer-letter{font-size:31px!important;}
  #class2-vietnamese-runtime #question-box .tv2-quiz-reading-passage{font-size:17px!important;}
  #class2-vietnamese-runtime #question-box .tv2-topic8-token{font-size:18px!important;}
  #class2-vietnamese-runtime #bai-hoc-sections .tv2-lesson-question{font-size:19px!important;}
  #class2-vietnamese-runtime #bai-hoc-sections .tv2-lesson-answer{font-size:18px!important;}
  #class2-vietnamese-runtime .tv2-story-question{font-size:19px!important;}
  #class2-vietnamese-runtime .story-answer-btn{font-size:18px!important;}
}
@media(min-width:768px){
  #class2-vietnamese-runtime #question-box .option-btn .tv2-a11-answer-letter{font-size:36px!important;}
}

/* Khám phá Mục 9/11: thơ hoặc văn bản bên trái, câu hỏi và đáp án bên phải.
   Khong anh huong renderer Khám phá khac / De thi / Bai tap / On tap. */
#class2-vietnamese-runtime #question-box .tv2-m9-layout{
  width:100%; max-width:100%; min-width:0;
  display:grid; grid-template-columns:minmax(0,1fr);
  align-items:stretch; gap:14px; margin:0 auto;
}
#class2-vietnamese-runtime #question-box .tv2-m9-reading-pane,
#class2-vietnamese-runtime #question-box .tv2-m9-question-pane{
  box-sizing:border-box; min-width:0;
  border:1px solid #f5c5dd; border-radius:20px;
  padding:clamp(14px,1.8vw,22px);
  box-shadow:0 2px 9px rgba(190,93,144,.06);
}
#class2-vietnamese-runtime #question-box .tv2-m9-reading-pane{
  background:#fff9fc; text-align:left;
}
#class2-vietnamese-runtime #question-box .tv2-m9-question-pane{
  display:flex; flex-direction:column; justify-content:flex-start;
  background:#fff; border-color:#e9d5f8;
}
#class2-vietnamese-runtime #question-box .tv2-m9-reading-title{
  font-family:'Nunito',system-ui,sans-serif;
  font-size:21px; font-weight:900; line-height:1.35;
  text-align:center; color:#a21caf; margin-bottom:13px;
}
#class2-vietnamese-runtime #question-box .tv2-m9-reading-pane .tv2-quiz-reading-passage{
  column-count:1!important; columns:1!important;
  text-align:left; white-space:pre-line;
  overflow-wrap:break-word; margin:0;
}
#class2-vietnamese-runtime #question-box .tv2-m9-poem .tv2-quiz-reading-passage{
  width:max-content; max-width:100%; margin:0 auto;
}
/* Muc 11: nut doc tho o day khung trai, khong anh huong Muc 9. */
#class2-vietnamese-runtime #question-box .tv2-m11-poem{
  display:flex;
  flex-direction:column;
}
#class2-vietnamese-runtime #question-box .tv2-m11-poem-listen-wrap{
  display:flex;
  justify-content:center;
  width:100%;
  margin-top:auto;
  padding-top:16px;
}
/* Chi Muc 11: tang 1px co chu tho, can giua tung dong luc bat (ca mobile). */
#class2-vietnamese-runtime #question-box .tv2-m11-poem .tv2-quiz-reading-passage{
  width:100%; max-width:100%; margin:0 auto;
  text-align:center!important;
  font-size:19px!important;
}
@media(max-width:639px){
  #class2-vietnamese-runtime #question-box .tv2-m11-poem .tv2-quiz-reading-passage{
    font-size:18px!important;
  }
}
/* Muc 9.1: giu tho mot cot va tach kho sau moi 4 dong. */
#class2-vietnamese-runtime #question-box .tv2-m9-poem .tv2-m9-poem-stanza{
  display:block;
  white-space:pre-line;
}
#class2-vietnamese-runtime #question-box .tv2-m9-poem .tv2-m9-poem-stanza + .tv2-m9-poem-stanza{
  margin-top:14px;
}
#class2-vietnamese-runtime #question-box .tv2-m9-question-title{
  text-align:left; margin:0 0 10px; width:100%;
}
#class2-vietnamese-runtime #question-box .tv2-m9-answer-grid{
  display:grid; grid-template-columns:minmax(0,1fr);
  gap:10px; width:100%; margin-top:6px;
}
#class2-vietnamese-runtime #question-box .tv2-m9-answer-grid .option-btn{
  width:100%; text-align:left; min-width:0;
}
@media(min-width:880px){
  #class2-vietnamese-runtime #question-box .tv2-m9-layout{
    grid-template-columns:minmax(0,0.94fr) minmax(0,1.06fr);
    gap:16px;
  }
}
@media(max-width:879px){
  #class2-vietnamese-runtime #question-box .tv2-m9-layout{gap:12px;}
  #class2-vietnamese-runtime #question-box .tv2-m9-question-title{text-align:center;}
}

/* Khám phá Mục 7 & 8: tận dụng chiều rộng, chữ lớn hơn và ô trả lời thoáng hơn.
   Chỉ kích hoạt khi loadQuestion đánh dấu #question-box.tv2-m78-wide. */
#class2-vietnamese-runtime #question-box.tv2-m78-wide .tv2-m78-situation-pane,
#class2-vietnamese-runtime #question-box.tv2-m78-wide .tv2-m78-question-head,
#class2-vietnamese-runtime #question-box.tv2-m78-wide .tv2-m78-answer-grid{
  box-sizing:border-box;
  width:100%!important;
  max-width:min(100%,58rem)!important;
  min-width:0;
}
#class2-vietnamese-runtime #question-box.tv2-m78-wide .tv2-m78-situation-pane{
  padding:16px 20px!important;
  margin-bottom:7px!important;
}
#class2-vietnamese-runtime #question-box.tv2-m78-wide .tv2-m78-situation-title{
  font-size:18px!important;
  line-height:1.4!important;
  margin-bottom:6px!important;
}
#class2-vietnamese-runtime #question-box.tv2-m78-wide .tv2-m78-situation-pane .tv2-quiz-reading-passage{
  font-size:20px!important;
  line-height:1.56!important;
}
#class2-vietnamese-runtime #question-box.tv2-m78-wide .tv2-m78-question-head .tv2-quiz-question{
  font-size:24px!important;
  line-height:1.4!important;
}
#class2-vietnamese-runtime #question-box.tv2-m78-wide .tv2-m78-answer-grid{
  column-gap:14px!important;
  row-gap:12px!important;
  margin-top:8px!important;
}
#class2-vietnamese-runtime #question-box.tv2-m78-wide .tv2-m78-answer-grid .option-btn{
  font-size:20px!important;
  font-weight:800!important;
  min-height:70px;
  padding:15px 18px!important;
}
@media(max-width:767px){
  #class2-vietnamese-runtime #question-box.tv2-m78-wide .tv2-m78-situation-pane{
    padding:13px 14px!important;
  }
  #class2-vietnamese-runtime #question-box.tv2-m78-wide .tv2-m78-situation-title{
    font-size:17px!important;
  }
  #class2-vietnamese-runtime #question-box.tv2-m78-wide .tv2-m78-situation-pane .tv2-quiz-reading-passage{
    font-size:18px!important;
  }
  #class2-vietnamese-runtime #question-box.tv2-m78-wide .tv2-m78-question-head .tv2-quiz-question{
    font-size:22px!important;
  }
  #class2-vietnamese-runtime #question-box.tv2-m78-wide .tv2-m78-answer-grid{
    row-gap:10px!important;
    column-gap:10px!important;
  }
  #class2-vietnamese-runtime #question-box.tv2-m78-wide .tv2-m78-answer-grid .option-btn{
    font-size:19px!important;
    min-height:64px;
    padding:13px 14px!important;
  }
}
`;

function ensureTvStyles_(){if(document.getElementById(TV_MODULE_STYLE_ID_))return;const st=document.createElement('style');st.id=TV_MODULE_STYLE_ID_;st.textContent=TV_RUNTIME_CSS_+TV_SHELL_BREADCRUMB_CSS_+TV_MODULE_UI_CSS_+TV_EXPLORE_TA2_SCALE_CSS_+TV_FOLDER_TA2_HOVER_CSS_+TV_CHILD_TA_PARITY_CSS_+TV_FAIRY_CARD_GRID_CSS_+TV2_ALPHABET11_CSS_+TV2_LEARNING_TYPOGRAPHY_CSS_;document.head.appendChild(st);}
function primeTvAudio_(){if(tvModuleAudioPrimed_)return;tvModuleAudioPrimed_=true;const once=()=>{try{const C=window.AudioContext||window.webkitAudioContext;if(!audioCtx&&C)audioCtx=new C();if(audioCtx?.state==='suspended')audioCtx.resume();}catch(_){}};tvModuleRoot_?.addEventListener('pointerdown',once,{once:true,passive:true});}
function mountTvRuntime_(){if(!tvModuleCtx_?.host)throw new Error('TV_MODULE_HOST_MISSING');ensureTvStyles_();ensureTvDependencies_();tvModuleCtx_.host.innerHTML=`<div id="${TV_MODULE_RUNTIME_ID_}">${TV_RUNTIME_HTML_}</div>`;tvModuleRoot_=document.getElementById(TV_MODULE_RUNTIME_ID_);installTvInlineBridge_();syncClass2ModuleStateTV2_();resetStars();installTvScoreObserver_();updateAutoSpeechButtonUI();primeTvAudio_();tvModuleMounted_=true;}
async function bootstrapTvRuntime_(){if(!tvModuleMounted_||!tvModuleRoot_||!tvModuleRoot_.isConnected||tvModuleRoot_.parentElement!==tvModuleCtx_.host){mountTvRuntime_();await loadSharedImageCatalogTV2_();await Promise.resolve(renderDashboardGrid());await Promise.resolve(renderExamHubGrid());}else syncClass2ModuleStateTV2_();if(tvModuleCtx_?.isAuthenticated)loadLearningProfile_();}
async function renderClass2Vietnamese_(ctx){tvModuleDestroyed_=false;tvModuleCtx_=ctx||null;await bootstrapTvRuntime_();syncClass2ScoreTV2_();const tab=String(ctx?.tabId||'discover');tvModuleLastTab_=tab;if(tab==='lessons')return openBaiHocHub(1);if(tab==='exercises')return openRoadmap(1);if(tab==='review')return openReviewTab();if(tab==='exams')return openExamHub();if(tab==='games')return openMiniGameHub();return goHome();}
function destroyClass2Vietnamese_(){
  tvModuleDestroyed_=true;
  tvScoreObserver_?.disconnect?.(); tvScoreObserver_=null;
  try{closeAppDialog_(false);}catch(_){} try{stopSpeaking();}catch(_){} try{window.speechSynthesis?.cancel?.();}catch(_){}
  try{clearInterval(quizTimerInterval);}catch(_){} try{if(speechChunkTimer_)clearTimeout(speechChunkTimer_);}catch(_){} try{clearTopic23AutoAdvance_();}catch(_){} try{stopActiveMiniGameTV2_();}catch(_){}
  try{if(adaptiveLearningState.flushTimer)clearTimeout(adaptiveLearningState.flushTimer);}catch(_){} try{histLineChartInstance?.destroy?.();}catch(_){} try{histBarChartInstance?.destroy?.();}catch(_){}
  try{banMaiAudio.pause();banMaiAudio.currentTime=0;banMaiAudio.onended=null;banMaiAudio.onerror=null;}catch(_){}
  tvModuleCtx_?.hooks?.clearDetail?.(); resetClass2TvBreadcrumb_(); tvModuleCtx_?.hooks?.setScore?.(0,0); removeTvInlineBridge_();
  if(tvModuleRoot_?.isConnected)tvModuleRoot_.remove(); tvModuleRoot_=null; tvModuleMounted_=false; tvModuleAudioPrimed_=false; tvModuleCtx_=null;
}
window.CLASS2_SUBJECT_MODULES=window.CLASS2_SUBJECT_MODULES||{};window.CLASS2_SUBJECT_MODULES.vietnamese=Object.freeze({render:renderClass2Vietnamese_,destroy:destroyClass2Vietnamese_});

})();
