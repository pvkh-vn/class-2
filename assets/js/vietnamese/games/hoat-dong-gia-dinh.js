// ============================================================
// MINI GAME TV2 - HOAT DONG GIA DINH
// Nguon: 30 tranh gia dinh, 3 the he.
// Muc tieu TV2: quan sat co chon loc -> lien ket du kien -> suy luan nhe -> ung xu.
// Quy tac vong anh:
//   - Moi chu ky phai di het 30 anh, khong lap anh trong cung chu ky.
//   - Het 30 anh moi tron lai cho chu ky moi.
//   - Khi mot anh quay lai, uu tien cau hoi KHAC voi lan truoc.
// Layout: giu y het ai-mac-gi.js: anh vuong ben trai, 4 dap an doc ben phai; mobile xep doc.
// ============================================================


function faSpeakSafe(text, rate=0.94){if(typeof speakMiniGameTextSafe==='function')return speakMiniGameTextSafe(text,rate,'family-activity');}
const FA_SCENES = [
  {id:'family_01_dinner',qs:[
    {q:'Câu nào mô tả đúng nhất bức tranh gia đình đang dùng bữa?',a:'Cả nhà quây quần bên bàn ăn và cùng dùng bữa.',o:['Cả nhà quây quần bên bàn ăn và cùng dùng bữa.','Mọi người đang đứng ngoài sân để tập thể dục.','Các bạn nhỏ đang dọn đồ chơi trong phòng khách.','Ông bà đang tưới cây ở ban công.'],level:1,skill:'mô tả'},
    {q:'Trong câu “Cả nhà vui vẻ dùng bữa”, từ nào là từ chỉ hoạt động?',a:'dùng bữa',o:['cả nhà','vui vẻ','dùng bữa','bữa'],level:2,skill:'từ chỉ hoạt động'},
    {q:'Chi tiết nào cho thấy đây là một bữa ăn gia đình?',a:'Nhiều thành viên cùng ngồi quanh một bàn ăn.',o:['Nhiều thành viên cùng ngồi quanh một bàn ăn.','Có một chiếc xe đạp dựng cạnh cửa.','Trên bàn có sách và bút màu.','Ngoài sân có một chú chó đang chạy.'],level:2,skill:'tìm bằng chứng'},
    {q:'Nếu em làm đổ bát canh trong lúc ăn cùng cả nhà, việc nào nên làm trước?',a:'Báo cho người lớn và cùng lau dọn chỗ bị đổ.',o:['Báo cho người lớn và cùng lau dọn chỗ bị đổ.','Bỏ chạy sang phòng khác.','Tiếp tục ăn như không có chuyện gì.','Đẩy bát sang phía người bên cạnh.'],level:4,skill:'ứng xử'}
  ]},
  {id:'family_02_garden_watering',qs:[
    {q:'Ông và em nhỏ đang cùng làm việc gì trong khu vườn?',a:'Tưới hoa.',o:['Tưới hoa.','Rửa xe.','Cho chó ăn.','Quét sân.'],level:1,skill:'quan sát'},
    {q:'Để tưới hoa, hai ông cháu đang dùng đồ vật nào?',a:'Bình tưới.',o:['Bình tưới.','Chổi quét.','Máy hút bụi.','Kính thiên văn.'],level:1,skill:'công dụng đồ vật'},
    {q:'Câu nào là câu nêu hoạt động phù hợp nhất với tranh?',a:'Ông giúp em nhỏ tưới những khóm hoa trong vườn.',o:['Ông giúp em nhỏ tưới những khóm hoa trong vườn.','Khu vườn có nhiều bông hoa rực rỡ.','Chú chó có bộ lông xù màu nâu.','Ngôi nhà phía sau rất cao.'],level:2,skill:'câu nêu hoạt động'},
    {q:'Nếu đất quanh gốc hoa đã rất ướt, việc nào hợp lí nhất?',a:'Tạm dừng tưới để tránh cây bị úng nước.',o:['Tạm dừng tưới để tránh cây bị úng nước.','Tưới thêm thật nhiều nước.','Nhổ cây lên khỏi đất.','Dẫm lên luống hoa cho đất chặt hơn.'],level:4,skill:'suy luận'}
  ]},
  {id:'family_03_front_yard_car',qs:[
    {q:'Người bố đang làm gì với chiếc ô tô trước nhà?',a:'Rửa xe bằng vòi nước.',o:['Rửa xe bằng vòi nước.','Sửa xe bằng cờ lê.','Đẩy xe vào gara.','Sơn lại cửa xe.'],level:1,skill:'quan sát'},
    {q:'Bạn nhỏ đang làm gì trong khi bố rửa xe?',a:'Vui đùa với bọt nước.',o:['Vui đùa với bọt nước.','Đọc sách trên ghế.','Tưới hoa bằng bình tưới.','Xếp quần áo vào tủ.'],level:1,skill:'liên kết'},
    {q:'Từ nào dưới đây phù hợp nhất để chỉ hoạt động của bố?',a:'rửa',o:['rửa','đỏ','chiếc xe','sạch sẽ'],level:2,skill:'từ chỉ hoạt động'},
    {q:'Nếu muốn giúp bố rửa xe mà vẫn an toàn, bạn nhỏ nên làm gì?',a:'Đứng ở chỗ không trơn và làm theo hướng dẫn của bố.',o:['Đứng ở chỗ không trơn và làm theo hướng dẫn của bố.','Chạy nhanh quanh chỗ có nhiều xà phòng.','Tự ý cầm vòi xịt vào người khác.','Ngồi lên nắp ca-pô khi xe còn ướt.'],level:4,skill:'ứng xử'}
  ]},
  {id:'family_04_living_room_tv',qs:[
    {q:'Ba bà cháu/mẹ con đang cùng làm gì trong phòng khách?',a:'Ngồi xem chương trình trên tivi.',o:['Ngồi xem chương trình trên tivi.','Cùng nấu bữa tối.','Cùng dọn sân vườn.','Cùng đánh răng.'],level:1,skill:'quan sát'},
    {q:'Chi tiết nào cho thấy khung cảnh diễn ra vào buổi tối?',a:'Bên ngoài cửa sổ đã tối và đèn trong phòng đang sáng.',o:['Bên ngoài cửa sổ đã tối và đèn trong phòng đang sáng.','Có nhiều chậu cây trong phòng.','Mọi người đang ngồi trên ghế sofa.','Con mèo nằm trên thảm.'],level:3,skill:'tìm bằng chứng'},
    {q:'Câu nào nêu đặc điểm phù hợp với không khí trong tranh?',a:'Phòng khách ấm áp và yên bình.',o:['Phòng khách ấm áp và yên bình.','Mọi người chạy nhảy rất ồn ào.','Ngoài trời nắng gắt giữa trưa.','Căn phòng trống không có ai.'],level:2,skill:'câu nêu đặc điểm'},
    {q:'Nếu em muốn đổi kênh tivi khi cả nhà đang cùng xem, lời nói nào lịch sự nhất?',a:'Mọi người cho con đổi sang kênh khác một chút được không ạ?',o:['Mọi người cho con đổi sang kênh khác một chút được không ạ?','Con đổi kênh đây, mọi người đừng xem nữa!','Ai cũng phải xem kênh con thích!','Tắt tivi đi ngay!'],level:4,skill:'giao tiếp'}
  ]},
  {id:'family_05_study_homework',qs:[
    {q:'Hai bạn nhỏ đang làm gì ở bàn học?',a:'Cùng vẽ và tô màu.',o:['Cùng vẽ và tô màu.','Cùng gấp quần áo.','Cùng cho thú cưng ăn.','Cùng rửa xe.'],level:1,skill:'quan sát'},
    {q:'Người mẹ đang làm gì bên cạnh hai bạn nhỏ?',a:'Đứng quan sát và khích lệ các con.',o:['Đứng quan sát và khích lệ các con.','Ngủ trên ghế sofa.','Nấu ăn ở bếp.','Tập thể dục ngoài sân.'],level:2,skill:'liên kết'},
    {q:'Trong câu “Hai chị em chăm chú vẽ tranh”, từ “chăm chú” cho biết điều gì?',a:'Đặc điểm/trạng thái khi hai bạn đang vẽ.',o:['Đặc điểm/trạng thái khi hai bạn đang vẽ.','Tên của một đồ vật.','Tên của một người.','Nơi diễn ra hoạt động.'],level:2,skill:'từ chỉ đặc điểm'},
    {q:'Nếu em nhỏ chưa biết tô màu trong đường viền, bạn lớn nên làm gì?',a:'Hướng dẫn em từ từ và động viên em thử lại.',o:['Hướng dẫn em từ từ và động viên em thử lại.','Giành hết bút màu và làm thay.','Chê em vẽ xấu.','Cất tranh đi để em không được vẽ nữa.'],level:4,skill:'ứng xử'}
  ]},
  {id:'family_06_bedtime_story',qs:[
    {q:'Trước giờ ngủ, người bà đang làm gì cùng các cháu?',a:'Đọc truyện cho các cháu nghe.',o:['Đọc truyện cho các cháu nghe.','Dạy các cháu rửa xe.','Cho các cháu tập xe đạp.','Cùng các cháu nấu ăn.'],level:1,skill:'quan sát'},
    {q:'Chi tiết nào giúp em đoán đây là lúc chuẩn bị đi ngủ?',a:'Mọi người ngồi trên giường, mặc đồ ngủ và có đèn ngủ.',o:['Mọi người ngồi trên giường, mặc đồ ngủ và có đèn ngủ.','Có một bình tưới cây ở gần đó.','Có xe đạp dựng trước cửa.','Có bàn ăn đầy thức ăn.'],level:3,skill:'suy luận'},
    {q:'Câu nào phù hợp nhất với bức tranh?',a:'Bà dịu dàng kể chuyện cho các cháu nghe trước khi ngủ.',o:['Bà dịu dàng kể chuyện cho các cháu nghe trước khi ngủ.','Bố đang dạy con chơi đàn ngoài sân.','Mẹ đang rửa bát trong nhà bếp.','Ông đang đọc báo ngoài ban công.'],level:2,skill:'mô tả'},
    {q:'Sau khi nghe xong câu chuyện, lời nói nào của bạn nhỏ là phù hợp nhất?',a:'Cháu cảm ơn bà, câu chuyện rất hay ạ!',o:['Cháu cảm ơn bà, câu chuyện rất hay ạ!','Bà đọc sai hết rồi!','Cháu không cần nghe bà nữa!','Bà phải đọc thêm ngay!'],level:4,skill:'giao tiếp'}
  ]},
  {id:'family_07_kitchen_cooking',qs:[
    {q:'Hai người lớn đang cùng chuẩn bị việc gì trong bếp?',a:'Chuẩn bị rau và thức ăn cho bữa ăn.',o:['Chuẩn bị rau và thức ăn cho bữa ăn.','Chuẩn bị đi ngủ.','Chuẩn bị đi học.','Chuẩn bị chơi trốn tìm.'],level:1,skill:'quan sát'},
    {q:'Người mẹ đứng bên bồn rửa đang làm gì?',a:'Rửa rau.',o:['Rửa rau.','Tưới hoa.','Giặt quần áo.','Lau bàn.'],level:1,skill:'chi tiết'},
    {q:'Chi tiết nào thể hiện sự phối hợp trong gia đình?',a:'Một người rửa rau, một người cắt rau để cùng chuẩn bị bữa ăn.',o:['Một người rửa rau, một người cắt rau để cùng chuẩn bị bữa ăn.','Mỗi người ở một nơi và không làm gì.','Mọi người chỉ ngồi xem tivi.','Chỉ em bé làm tất cả công việc.'],level:3,skill:'liên kết'},
    {q:'Em nhỏ ở gần khu vực nấu ăn nên làm gì để an toàn?',a:'Ở trong khu vực an toàn và không tự ý chạm vào dao, bếp nóng.',o:['Ở trong khu vực an toàn và không tự ý chạm vào dao, bếp nóng.','Leo lên bàn bếp để xem cho rõ.','Cầm dao chơi khi người lớn không để ý.','Chạm tay vào nồi đang nóng.'],level:4,skill:'an toàn'}
  ]},
  {id:'family_08_pet_feeding',qs:[
    {q:'Hai bạn nhỏ đang chăm sóc những con vật nào?',a:'Chó và mèo.',o:['Chó và mèo.','Gà và vịt.','Cá và chim.','Thỏ và ngựa.'],level:1,skill:'quan sát'},
    {q:'Hoạt động chính của hai bạn trong tranh là gì?',a:'Cho thú cưng ăn.',o:['Cho thú cưng ăn.','Tắm cho em bé.','Tưới cây.','Gấp quần áo.'],level:1,skill:'từ chỉ hoạt động'},
    {q:'Câu nào thể hiện trách nhiệm với vật nuôi?',a:'Hai bạn cùng chuẩn bị thức ăn cho chó và mèo.',o:['Hai bạn cùng chuẩn bị thức ăn cho chó và mèo.','Hai bạn bỏ mặc vật nuôi khi đói.','Hai bạn làm đổ thức ăn rồi bỏ đi.','Hai bạn trêu chọc vật nuôi khi chúng đang ăn.'],level:2,skill:'ý nghĩa'},
    {q:'Nếu bát thức ăn của chó đã đầy, bạn nhỏ nên làm gì?',a:'Dừng đổ thêm và cất phần thức ăn còn lại.',o:['Dừng đổ thêm và cất phần thức ăn còn lại.','Đổ tiếp cho tràn ra sàn.','Lấy thức ăn của mèo đổ sang.','Đá bát thức ăn ra chỗ khác.'],level:4,skill:'suy luận'}
  ]},
  {id:'family_09_reading_balcony',qs:[
    {q:'Người ông đang làm gì trên ban công?',a:'Ngồi đọc báo.',o:['Ngồi đọc báo.','Chơi đàn piano.','Tắm cho em bé.','Lau bàn.'],level:1,skill:'quan sát'},
    {q:'Đồ vật nào là nguồn thông tin ông đang đọc?',a:'Tờ báo.',o:['Tờ báo.','Bình tưới.','Kính thiên văn.','Hộp đồ chơi.'],level:1,skill:'công dụng'},
    {q:'Câu nào nêu đặc điểm phù hợp với khung cảnh?',a:'Ban công yên tĩnh và có nhiều cây, hoa.',o:['Ban công yên tĩnh và có nhiều cây, hoa.','Ban công rất đông người đang chạy.','Ngoài trời tối đen và mưa lớn.','Ban công không có cây nào.'],level:2,skill:'câu nêu đặc điểm'},
    {q:'Nếu gió mạnh làm tờ báo sắp bay, ông nên làm gì trước?',a:'Giữ chặt hoặc gấp tờ báo lại.',o:['Giữ chặt hoặc gấp tờ báo lại.','Thả tờ báo bay đi.','Đổ nước lên tờ báo.','Ném tờ báo xuống sân.'],level:4,skill:'nếu-thì'}
  ]},
  {id:'family_10_playing_toys',qs:[
    {q:'Người bố và em bé đang chơi với đồ vật gì?',a:'Các khối xếp hình.',o:['Các khối xếp hình.','Bộ cờ vua.','Quả bóng đá.','Bút màu.'],level:1,skill:'quan sát'},
    {q:'Người bố đang làm gì với các khối màu?',a:'Xếp chúng thành một tháp.',o:['Xếp chúng thành một tháp.','Cất chúng vào tủ lạnh.','Rửa chúng dưới vòi nước.','Treo chúng lên dây phơi.'],level:1,skill:'hành động'},
    {q:'Từ nào dưới đây là từ chỉ đặc điểm phù hợp với các khối đồ chơi?',a:'nhiều màu sắc',o:['nhiều màu sắc','xếp','em bé','trên thảm'],level:2,skill:'từ chỉ đặc điểm'},
    {q:'Nếu tháp khối bị đổ, người bố nên nói gì để khích lệ em bé?',a:'Không sao, bố con mình cùng xếp lại nhé!',o:['Không sao, bố con mình cùng xếp lại nhé!','Con làm hỏng hết rồi!','Thôi không được chơi nữa!','Bố sẽ cất hết đồ chơi đi!'],level:4,skill:'giao tiếp'}
  ]},
  {id:'family_11_cycling_yard',qs:[
    {q:'Bạn gái lớn đang tập hoạt động gì trước nhà?',a:'Đi xe đạp.',o:['Đi xe đạp.','Trượt patin.','Chạy bộ.','Đá bóng.'],level:1,skill:'quan sát'},
    {q:'Chi tiết nào cho thấy bạn nhỏ đang chú ý đến an toàn?',a:'Bạn đội mũ bảo hiểm khi đi xe đạp.',o:['Bạn đội mũ bảo hiểm khi đi xe đạp.','Bạn đi xe thật nhanh sát ô tô.','Bạn bỏ hai tay khỏi tay lái.','Bạn nhắm mắt khi đạp xe.'],level:2,skill:'tìm bằng chứng'},
    {q:'Câu nào là câu nêu hoạt động đúng với tranh?',a:'Bạn gái đang đạp xe, còn em nhỏ vui vẻ cổ vũ.',o:['Bạn gái đang đạp xe, còn em nhỏ vui vẻ cổ vũ.','Hai bạn đang đánh răng trong phòng tắm.','Ông đang ngồi đọc báo ngoài ban công.','Bố đang nướng thức ăn ngoài sân.'],level:2,skill:'câu nêu hoạt động'},
    {q:'Nếu xe đạp bị lệch tay lái khi đang tập, bạn nên làm gì?',a:'Giảm tốc độ, dừng lại và nhờ người lớn kiểm tra.',o:['Giảm tốc độ, dừng lại và nhờ người lớn kiểm tra.','Cố đạp nhanh hơn để giữ thăng bằng.','Bỏ tay khỏi ghi-đông.','Tiếp tục đi mà không cần kiểm tra.'],level:4,skill:'an toàn'}
  ]},
  {id:'family_12_bathroom_brushing',qs:[
    {q:'Hai bạn nhỏ đang thực hiện thói quen nào trong phòng tắm?',a:'Đánh răng.',o:['Đánh răng.','Rửa xe.','Tưới cây.','Đọc sách.'],level:1,skill:'quan sát'},
    {q:'Đồ vật nào cả hai bạn đang dùng?',a:'Bàn chải đánh răng.',o:['Bàn chải đánh răng.','Bình tưới.','Cọ vẽ.','Thìa ăn cơm.'],level:1,skill:'đồ vật'},
    {q:'Câu nào phù hợp nhất với bức tranh?',a:'Hai chị em cùng đánh răng trước gương.',o:['Hai chị em cùng đánh răng trước gương.','Hai chị em đang ăn sáng ngoài sân.','Hai chị em đang chơi bóng với chó.','Hai chị em đang ngắm sao trên sân thượng.'],level:2,skill:'mô tả'},
    {q:'Sau khi đánh răng xong, việc nào phù hợp nhất?',a:'Súc miệng, rửa sạch bàn chải và cất gọn.',o:['Súc miệng, rửa sạch bàn chải và cất gọn.','Ném bàn chải xuống sàn.','Để vòi nước chảy mãi.','Dùng chung bàn chải với người khác.'],level:4,skill:'thói quen tốt'}
  ]},
  {id:'family_13_motorbike_school',qs:[
    {q:'Trước cổng nhà, người bố đang giúp bạn nhỏ làm gì?',a:'Chỉnh quai mũ bảo hiểm.',o:['Chỉnh quai mũ bảo hiểm.','Buộc dây giày thể thao.','Cài cúc áo mưa.','Đeo kính bơi.'],level:1,skill:'quan sát'},
    {q:'Chi tiết nào cho thấy bạn nhỏ đang chuẩn bị ra ngoài/đi học?',a:'Bạn đeo ba lô và đứng cạnh bố ở cổng nhà.',o:['Bạn đeo ba lô và đứng cạnh bố ở cổng nhà.','Bạn đang nằm ngủ trên giường.','Bạn đang ngồi trong bồn tắm.','Bạn đang cầm bát ăn cơm.'],level:3,skill:'suy luận'},
    {q:'Vì sao bố kiểm tra mũ bảo hiểm cho con?',a:'Để mũ được cài chắc và an toàn khi di chuyển.',o:['Để mũ được cài chắc và an toàn khi di chuyển.','Để mũ trông to hơn.','Để bạn nhỏ không phải mang ba lô.','Để xe có thể chạy nhanh hơn.'],level:3,skill:'nguyên nhân-kết quả'},
    {q:'Nếu quai mũ còn lỏng, bạn nhỏ nên làm gì?',a:'Nhờ bố chỉnh lại cho vừa và chắc chắn.',o:['Nhờ bố chỉnh lại cho vừa và chắc chắn.','Bỏ mũ ra và đi luôn.','Kéo mũ che kín mắt.','Đội mũ nhưng không cần cài quai.'],level:4,skill:'an toàn'}
  ]},
  {id:'family_14_tea_patio',qs:[
    {q:'Ông và bà đang cùng làm gì trong khu vườn?',a:'Ngồi uống trà và trò chuyện.',o:['Ngồi uống trà và trò chuyện.','Chơi trốn tìm.','Rửa xe.','Tập đi xe đạp.'],level:1,skill:'quan sát'},
    {q:'Đồ vật nào cả hai người đang cầm?',a:'Tách trà.',o:['Tách trà.','Bình tưới.','Bàn chải.','Kính thiên văn.'],level:1,skill:'chi tiết'},
    {q:'Câu nào nêu đặc điểm đúng nhất về khung cảnh?',a:'Khu vườn nhiều hoa, tạo cảm giác thư thái.',o:['Khu vườn nhiều hoa, tạo cảm giác thư thái.','Khu vườn tối om và không có cây.','Khu vườn đông xe cộ qua lại.','Khu vườn đầy đồ chơi vương vãi.'],level:2,skill:'câu nêu đặc điểm'},
    {q:'Nếu muốn tham gia cuộc trò chuyện của ông bà, em nên làm gì?',a:'Lại gần, chào ông bà và xin phép ngồi cùng.',o:['Lại gần, chào ông bà và xin phép ngồi cùng.','Chen ngang và nói thật to.','Giật tách trà trên tay ông.','Bỏ đi mà không chào hỏi.'],level:4,skill:'giao tiếp'}
  ]},
  {id:'family_15_toddler_crying',qs:[
    {q:'Người mẹ đang làm gì khi em bé khóc?',a:'Ôm và dỗ dành em bé.',o:['Ôm và dỗ dành em bé.','Để em bé một mình.','Rủ em bé đi xe đạp.','Cho em bé cầm dao chơi.'],level:1,skill:'quan sát'},
    {q:'Từ nào phù hợp nhất để nói về hành động của mẹ?',a:'dỗ dành',o:['dỗ dành','ồn ào','chiếc thảm','phòng khách'],level:2,skill:'từ chỉ hoạt động'},
    {q:'Chi tiết nào cho thấy em bé đang buồn hoặc khó chịu?',a:'Em bé khóc và có nước mắt.',o:['Em bé khóc và có nước mắt.','Em bé đang cười lớn.','Em bé đang ngủ yên.','Em bé đang vỗ tay.'],level:2,skill:'tìm bằng chứng'},
    {q:'Nếu em thấy em nhỏ đang khóc, cách ứng xử nào phù hợp nhất?',a:'Nhẹ nhàng hỏi han hoặc báo người lớn để cùng giúp em.',o:['Nhẹ nhàng hỏi han hoặc báo người lớn để cùng giúp em.','Trêu em khóc to hơn.','Bỏ mặc em rồi chạy đi.','Lấy đồ chơi của em mang đi.'],level:4,skill:'ứng xử'}
  ]},
  {id:'family_16_backyard_barbecue',qs:[
    {q:'Người bố đang làm gì ở sân sau?',a:'Nướng thức ăn trên bếp nướng.',o:['Nướng thức ăn trên bếp nướng.','Tưới cây bằng vòi.','Rửa xe.','Chơi đàn piano.'],level:1,skill:'quan sát'},
    {q:'Những người còn lại đang làm gì gần bàn ăn?',a:'Chuẩn bị bàn và đồ dùng cho bữa ăn.',o:['Chuẩn bị bàn và đồ dùng cho bữa ăn.','Đi ngủ.','Đánh răng.','Dọn phòng ngủ.'],level:2,skill:'liên kết'},
    {q:'Chi tiết nào cho thấy mọi người đang cùng chuẩn bị một bữa ăn ngoài trời?',a:'Có bếp nướng, bàn ăn, đĩa và nhiều người cùng làm việc.',o:['Có bếp nướng, bàn ăn, đĩa và nhiều người cùng làm việc.','Chỉ có một chiếc giường và đèn ngủ.','Có bàn học với nhiều bút màu.','Có kính thiên văn hướng lên trời.'],level:3,skill:'tìm bằng chứng'},
    {q:'Khi ở gần bếp nướng nóng, trẻ nhỏ nên làm gì?',a:'Giữ khoảng cách an toàn và làm theo hướng dẫn của người lớn.',o:['Giữ khoảng cách an toàn và làm theo hướng dẫn của người lớn.','Chạm tay vào vỉ nướng để kiểm tra.','Chạy vòng quanh bếp nướng.','Tự ý đổ thêm than vào bếp.'],level:4,skill:'an toàn'}
  ]},
  {id:'family_17_folding_clothes',qs:[
    {q:'Hai người đang cùng làm công việc gì ngoài ban công?',a:'Gấp quần áo.',o:['Gấp quần áo.','Rửa bát.','Tắm cho em bé.','Chơi bóng.'],level:1,skill:'quan sát'},
    {q:'Chi tiết nào cho thấy quần áo đã được giặt và phơi?',a:'Có quần áo treo trên dây và nhiều đồ đã khô được xếp lại.',o:['Có quần áo treo trên dây và nhiều đồ đã khô được xếp lại.','Có bếp nướng đang bốc khói.','Có kính thiên văn trên sân thượng.','Có xe đạp trước cửa.'],level:3,skill:'liên kết'},
    {q:'Câu nào thể hiện tinh thần chia sẻ việc nhà?',a:'Hai bà cháu cùng gấp quần áo đã khô.',o:['Hai bà cháu cùng gấp quần áo đã khô.','Một người làm việc còn người kia bỏ đi chơi.','Quần áo bị vứt khắp sàn.','Không ai quan tâm đến việc nhà.'],level:2,skill:'ý nghĩa'},
    {q:'Nếu trời sắp mưa mà vẫn còn quần áo trên dây, việc nào nên làm trước?',a:'Nhanh chóng thu quần áo vào nơi khô ráo.',o:['Nhanh chóng thu quần áo vào nơi khô ráo.','Treo thêm quần áo ra ngoài.','Đổ nước lên quần áo.','Để nguyên cho mưa làm ướt.'],level:4,skill:'nếu-thì'}
  ]},
  {id:'family_18_dog_fetch',qs:[
    {q:'Hai bạn nhỏ và chú chó đang chơi trò gì ngoài vườn?',a:'Chơi ném và đuổi theo bóng.',o:['Chơi ném và đuổi theo bóng.','Chơi xếp hình.','Chơi đàn piano.','Chơi trốn tìm trong nhà.'],level:1,skill:'quan sát'},
    {q:'Vật nào đang ở giữa hai bạn và chú chó?',a:'Quả bóng.',o:['Quả bóng.','Bình tưới.','Tờ báo.','Bàn chải.'],level:1,skill:'chi tiết'},
    {q:'Từ “chạy” trong câu “Chú chó chạy theo quả bóng” thuộc nhóm nào?',a:'Từ chỉ hoạt động.',o:['Từ chỉ hoạt động.','Từ chỉ sự vật.','Từ chỉ đặc điểm.','Tên riêng.'],level:2,skill:'từ loại lớp 2'},
    {q:'Nếu quả bóng lăn ra gần đường có xe chạy, các bạn nên làm gì?',a:'Dừng lại và nhờ người lớn lấy bóng khi an toàn.',o:['Dừng lại và nhờ người lớn lấy bóng khi an toàn.','Chạy ngay ra đường để nhặt.','Bảo chú chó lao ra lấy bóng.','Tiếp tục chơi sát mép đường.'],level:4,skill:'an toàn'}
  ]},
  {id:'family_19_morning_exercise',qs:[
    {q:'Người ông đang làm gì trong khu vườn?',a:'Tập thể dục.',o:['Tập thể dục.','Rửa xe.','Đọc truyện.','Nấu ăn.'],level:1,skill:'quan sát'},
    {q:'Câu nào mô tả đúng nhất tư thế của ông?',a:'Ông đứng vững và đưa hai tay ra khi tập.',o:['Ông nằm ngủ trên ghế.','Ông ngồi ăn cơm bên bàn.','Ông đang cúi rửa rau.','Ông đang đạp xe thật nhanh.'],level:2,skill:'mô tả'},
    {q:'Hoạt động trong tranh có ích gì?',a:'Giúp rèn luyện cơ thể và duy trì thói quen vận động.',o:['Giúp rèn luyện cơ thể và duy trì thói quen vận động.','Làm quần áo khô nhanh hơn.','Giúp xe ô tô sạch hơn.','Giúp đồ chơi tự xếp gọn.'],level:3,skill:'mục đích'},
    {q:'Nếu mặt sân đang ướt và trơn, ông nên làm gì trước khi tập?',a:'Chọn chỗ khô ráo hoặc lau khô để tránh trượt ngã.',o:['Chọn chỗ khô ráo hoặc lau khô để tránh trượt ngã.','Tập nhanh hơn trên chỗ trơn.','Nhắm mắt khi tập.','Đặt thêm nước lên sàn.'],level:4,skill:'an toàn'}
  ]},
  {id:'family_20_sleeping_toddler',qs:[
    {q:'Em bé đang làm gì trong chiếc cũi?',a:'Ngủ và ôm gấu bông.',o:['Ngủ và ôm gấu bông.','Ăn sáng.','Đánh răng.','Chơi xe đạp.'],level:1,skill:'quan sát'},
    {q:'Chi tiết nào cho thấy đây là không gian nghỉ ngơi ban đêm?',a:'Phòng tối, có đèn ngủ và em bé đang ngủ.',o:['Phòng tối, có đèn ngủ và em bé đang ngủ.','Có nắng chói và xe ô tô ngoài sân.','Có bếp nướng đang hoạt động.','Có bàn học với nhiều bút màu.'],level:3,skill:'suy luận'},
    {q:'Từ nào là từ chỉ đặc điểm phù hợp với em bé trong tranh?',a:'yên giấc',o:['yên giấc','đọc','chiếc cũi','gấu bông'],level:2,skill:'từ chỉ đặc điểm'},
    {q:'Nếu em bé đã ngủ, mọi người trong nhà nên làm gì?',a:'Giữ yên lặng và hạn chế tiếng động lớn.',o:['Giữ yên lặng và hạn chế tiếng động lớn.','Bật nhạc thật to.','Gọi em bé dậy để chơi.','Đập đồ chơi xuống sàn.'],level:4,skill:'ứng xử'}
  ]},
  {id:'family_21_livingroom_music',qs:[
    {q:'Bạn nhỏ đang chơi nhạc cụ nào?',a:'Đàn piano.',o:['Đàn piano.','Đàn ghi-ta.','Trống.','Sáo.'],level:1,skill:'quan sát'},
    {q:'Mẹ và bà đang làm gì khi bạn nhỏ chơi đàn?',a:'Ngồi nghe và cổ vũ bạn.',o:['Ngồi nghe và cổ vũ bạn.','Cùng rửa xe.','Cùng gấp quần áo.','Cùng tưới cây.'],level:2,skill:'liên kết'},
    {q:'Câu nào phù hợp nhất với tranh?',a:'Bạn nhỏ chăm chú chơi đàn, còn mẹ và bà vui vẻ lắng nghe.',o:['Bạn nhỏ chăm chú chơi đàn, còn mẹ và bà vui vẻ lắng nghe.','Cả nhà đang chạy bộ ngoài công viên.','Ông đang tắm cho em bé.','Bố đang sửa chiếc xe đạp.'],level:2,skill:'câu đầy đủ'},
    {q:'Sau khi bạn nhỏ chơi xong một bản nhạc, lời nói nào của người nghe phù hợp nhất?',a:'Con chơi rất cố gắng, bản nhạc nghe thật vui!',o:['Con chơi rất cố gắng, bản nhạc nghe thật vui!','Con đừng chơi đàn nữa!','Sao con chơi chậm thế!','Mọi người không muốn nghe đâu!'],level:4,skill:'giao tiếp'}
  ]},
  {id:'family_22_house_cleaning',qs:[
    {q:'Trong phòng khách, mỗi người đang cùng làm việc gì?',a:'Cùng dọn dẹp nhà cửa.',o:['Cùng dọn dẹp nhà cửa.','Cùng chuẩn bị đi ngủ.','Cùng ngắm sao.','Cùng ăn sáng.'],level:1,skill:'quan sát'},
    {q:'Người bố đang dùng đồ vật nào để làm sạch sàn?',a:'Máy hút bụi.',o:['Máy hút bụi.','Kính thiên văn.','Bình tưới.','Máy ảnh.'],level:1,skill:'công dụng đồ vật'},
    {q:'Chi tiết nào cho thấy mọi người đang chia nhau công việc?',a:'Bố hút bụi, một bạn lau bàn, một bạn cất đồ chơi.',o:['Bố hút bụi, một bạn lau bàn, một bạn cất đồ chơi.','Mọi người cùng đứng yên một chỗ.','Chỉ một người làm còn những người khác ngủ.','Không có ai thu dọn đồ vật.'],level:3,skill:'liên kết'},
    {q:'Nếu thấy đồ chơi nằm giữa lối đi, bạn nhỏ nên làm gì?',a:'Cất đồ chơi vào hộp để lối đi gọn và an toàn.',o:['Cất đồ chơi vào hộp để lối đi gọn và an toàn.','Để nguyên cho người khác dẫm phải.','Đá đồ chơi sang góc khác.','Ném đồ chơi ra ngoài cửa.'],level:4,skill:'ứng xử'}
  ]},
  {id:'family_23_watering_balcony',qs:[
    {q:'Người mẹ đang làm gì trên ban công?',a:'Tưới các chậu hoa và cây cảnh.',o:['Tưới các chậu hoa và cây cảnh.','Gấp quần áo.','Rửa xe.','Chơi đàn.'],level:1,skill:'quan sát'},
    {q:'Đồ vật nào được dùng để tưới cây?',a:'Bình tưới.',o:['Bình tưới.','Chổi.','Bàn chải.','Tờ báo.'],level:1,skill:'công dụng'},
    {q:'Câu nào là câu nêu hoạt động?',a:'Mẹ đang tưới những chậu hoa trên ban công.',o:['Mẹ đang tưới những chậu hoa trên ban công.','Những bông hoa rất rực rỡ.','Ban công có nhiều chậu cây.','Bầu trời trong xanh.'],level:2,skill:'câu nêu hoạt động'},
    {q:'Nếu một chậu cây vừa được tưới đủ nước, mẹ nên làm gì?',a:'Chuyển sang chăm chậu khác thay vì tiếp tục tưới quá nhiều.',o:['Chuyển sang chăm chậu khác thay vì tiếp tục tưới quá nhiều.','Tiếp tục đổ nước cho tràn chậu.','Nhổ cây ra khỏi chậu.','Đặt chậu chắn lối đi.'],level:4,skill:'suy luận'}
  ]},
  {id:'family_24_drawing_table',qs:[
    {q:'Các bạn nhỏ đang cùng làm hoạt động gì quanh bàn?',a:'Vẽ và in màu lên giấy.',o:['Vẽ và in màu lên giấy.','Rửa bát.','Tập xe đạp.','Ngắm sao.'],level:1,skill:'quan sát'},
    {q:'Em bé đang tạo hình trên giấy bằng cách nào?',a:'In bàn tay có màu lên giấy.',o:['In bàn tay có màu lên giấy.','Cắt giấy bằng kéo.','Dán ảnh lên tường.','Viết bằng bút mực.'],level:2,skill:'chi tiết'},
    {q:'Từ nào dưới đây là từ chỉ sự vật có trong tranh?',a:'bút màu',o:['bút màu','vẽ','rực rỡ','chăm chú'],level:2,skill:'từ chỉ sự vật'},
    {q:'Nếu màu vẽ bị đổ ra bàn, các bạn nên làm gì?',a:'Báo người lớn và cùng lau sạch chỗ bị đổ.',o:['Báo người lớn và cùng lau sạch chỗ bị đổ.','Bôi màu ra khắp bàn.','Để nguyên cho màu khô lại.','Đổ thêm nước lên sách.'],level:4,skill:'ứng xử'}
  ]},
  {id:'family_25_welcoming_father',qs:[
    {q:'Hai bạn nhỏ đang làm gì khi bố vừa về đến nhà?',a:'Chạy ra ôm và chào đón bố.',o:['Chạy ra ôm và chào đón bố.','Trốn khỏi bố.','Cùng bố rửa xe.','Bắt đầu đi ngủ.'],level:1,skill:'quan sát'},
    {q:'Chi tiết nào cho thấy các bạn nhỏ vui khi bố trở về?',a:'Các bạn cười và ôm lấy bố.',o:['Các bạn cười và ôm lấy bố.','Các bạn quay lưng bỏ đi.','Các bạn đang ngủ.','Các bạn đang khóc vì sợ.'],level:2,skill:'tìm bằng chứng'},
    {q:'Lời chào nào phù hợp nhất trong tình huống này?',a:'Bố về rồi ạ! Con chào bố!',o:['Bố về rồi ạ! Con chào bố!','Bố đứng ngoài đó đi!','Con không muốn chào đâu!','Bố phải đưa quà cho con ngay!'],level:3,skill:'giao tiếp'},
    {q:'Nếu bố đang xách nhiều đồ nặng, hai bạn nên làm gì?',a:'Hỏi bố xem có thể giúp mang món đồ nhẹ nào không.',o:['Hỏi bố xem có thể giúp mang món đồ nhẹ nào không.','Bám vào tay bố để bố khó đi hơn.','Chạy vòng quanh chân bố.','Lấy đồ trong tay bố rồi ném xuống đất.'],level:4,skill:'ứng xử'}
  ]},
  {id:'family_26_playing_hide_seek',qs:[
    {q:'Bạn nhỏ bịt mắt và đếm đang chơi trò gì?',a:'Trốn tìm.',o:['Trốn tìm.','Kéo co.','Đá cầu.','Xếp hình.'],level:1,skill:'quan sát'},
    {q:'Một bạn khác đang làm gì phía sau bụi hoa?',a:'Đang tìm chỗ ẩn để chơi trốn tìm.',o:['Đang tìm chỗ ẩn để chơi trốn tìm.','Đang tưới hoa.','Đang đọc báo.','Đang ngủ.'],level:2,skill:'liên kết'},
    {q:'Điều gì có thể xảy ra tiếp theo sau khi bạn đếm xong?',a:'Bạn sẽ mở mắt và đi tìm người đang trốn.',o:['Bạn sẽ mở mắt và đi tìm người đang trốn.','Mọi người sẽ ngồi vào bàn ăn.','Ông sẽ bật máy hút bụi.','Bạn sẽ đi đánh răng.'],level:3,skill:'trình tự'},
    {q:'Khi chơi trốn tìm trong vườn, chỗ nào KHÔNG nên chọn để trốn?',a:'Nơi nguy hiểm, quá xa hoặc gần đường xe chạy.',o:['Nơi nguy hiểm, quá xa hoặc gần đường xe chạy.','Sau một bụi cây thấp trong khu vực an toàn.','Gần nơi người lớn có thể quan sát.','Một góc sân không có vật sắc nhọn.'],level:4,skill:'an toàn'}
  ]},
  {id:'family_27_breakfast_kitchen',qs:[
    {q:'Gia đình đang làm gì quanh bàn trong bếp?',a:'Cùng ăn sáng.',o:['Cùng ăn sáng.','Cùng dọn phòng.','Cùng chơi bóng.','Cùng ngắm sao.'],level:1,skill:'quan sát'},
    {q:'Chi tiết nào gợi ý đây là thời điểm chuẩn bị bắt đầu một ngày mới?',a:'Các bạn nhỏ ngồi ăn và có ba lô chuẩn bị đi học.',o:['Các bạn nhỏ ngồi ăn và có ba lô chuẩn bị đi học.','Bên ngoài trời tối và có trăng sao.','Mọi người mặc đồ ngủ trên giường.','Có bếp nướng ngoài sân.'],level:3,skill:'suy luận'},
    {q:'Câu nào phù hợp nhất với tranh?',a:'Cả nhà vui vẻ dùng bữa sáng trước khi bắt đầu công việc và học tập.',o:['Cả nhà vui vẻ dùng bữa sáng trước khi bắt đầu công việc và học tập.','Cả nhà đang tổ chức tiệc nướng vào ban đêm.','Hai bạn đang cho thú cưng ăn ngoài hiên.','Ông đang tập thể dục một mình trong vườn.'],level:2,skill:'mô tả'},
    {q:'Nếu đã ăn xong trước mọi người, bạn nhỏ nên làm gì?',a:'Xin phép rời bàn và cất dọn phần đồ dùng của mình nếu có thể.',o:['Xin phép rời bàn và cất dọn phần đồ dùng của mình nếu có thể.','Đẩy ghế rồi chạy đi ngay.','Để bát đĩa rơi xuống sàn.','Lấy phần ăn của người khác.'],level:4,skill:'ứng xử'}
  ]},
  {id:'family_28_bathtub_fun',qs:[
    {q:'Người mẹ đang làm gì cho em bé?',a:'Tắm cho em bé.',o:['Tắm cho em bé.','Đọc báo cho em nghe.','Cho em đi xe đạp.','Dạy em chơi đàn.'],level:1,skill:'quan sát'},
    {q:'Những chú vịt đồ chơi đang ở đâu?',a:'Trong bồn tắm cùng em bé.',o:['Trong bồn tắm cùng em bé.','Trên bàn ăn.','Ngoài vườn.','Trên sân thượng.'],level:1,skill:'vị trí'},
    {q:'Câu nào nêu hoạt động đúng với tranh?',a:'Mẹ nhẹ nhàng tắm cho em bé trong bồn.',o:['Mẹ nhẹ nhàng tắm cho em bé trong bồn.','Mẹ đang rửa xe ngoài sân.','Mẹ đang chơi trốn tìm trong vườn.','Mẹ đang tưới hoa ngoài ban công.'],level:2,skill:'câu nêu hoạt động'},
    {q:'Trong lúc tắm cho em bé, người lớn cần chú ý điều gì nhất?',a:'Luôn ở bên cạnh và giữ an toàn cho em bé.',o:['Luôn ở bên cạnh và giữ an toàn cho em bé.','Để em bé một mình trong bồn.','Rời khỏi phòng thật lâu.','Cho em bé nghịch vòi nước nóng.'],level:4,skill:'an toàn'}
  ]},
  {id:'family_29_stargazing_terrace',qs:[
    {q:'Hai ông cháu đang cùng làm gì trên sân thượng?',a:'Quan sát bầu trời đêm bằng kính thiên văn.',o:['Quan sát bầu trời đêm bằng kính thiên văn.','Rửa xe.','Gấp quần áo.','Nấu ăn.'],level:1,skill:'quan sát'},
    {q:'Dụng cụ nào giúp bạn nhỏ nhìn rõ các vật ở xa trên bầu trời?',a:'Kính thiên văn.',o:['Kính thiên văn.','Bình tưới.','Máy hút bụi.','Bàn chải.'],level:1,skill:'công dụng'},
    {q:'Chi tiết nào cho thấy cảnh diễn ra vào ban đêm?',a:'Trên trời có trăng lưỡi liềm và rất nhiều ngôi sao.',o:['Trên trời có trăng lưỡi liềm và rất nhiều ngôi sao.','Có nhiều chậu cây trên sân thượng.','Ông đang đứng cạnh cháu.','Có một chiếc ghế ở phía sau.'],level:2,skill:'tìm bằng chứng'},
    {q:'Nếu bạn nhỏ chưa nhìn rõ qua kính, ông nên làm gì?',a:'Hướng dẫn bạn điều chỉnh kính từ từ và quan sát lại.',o:['Hướng dẫn bạn điều chỉnh kính từ từ và quan sát lại.','Lắc mạnh kính thiên văn.','Bảo bạn nhìn thẳng vào đèn sáng.','Đẩy kính ra sát mép sân thượng.'],level:4,skill:'hướng dẫn'}
  ]},
  {id:'family_30_full_family_portrait',qs:[
    {q:'Bức tranh cho thấy gia đình có mấy thế hệ cùng đứng bên nhau?',a:'Ba thế hệ.',o:['Ba thế hệ.','Một thế hệ.','Hai thế hệ.','Bốn thế hệ.'],level:2,skill:'quan hệ gia đình'},
    {q:'Những ai thuộc thế hệ lớn tuổi nhất trong tranh?',a:'Ông và bà.',o:['Ông và bà.','Bố và mẹ.','Hai bạn nhỏ.','Em bé và chú chó.'],level:1,skill:'quan hệ'},
    {q:'Câu nào phù hợp nhất với bức tranh?',a:'Cả gia đình ba thế hệ vui vẻ chụp ảnh trước ngôi nhà.',o:['Cả gia đình ba thế hệ vui vẻ chụp ảnh trước ngôi nhà.','Mọi người đang dọn phòng khách.','Hai bạn nhỏ đang đánh răng.','Ông và cháu đang ngắm sao.'],level:2,skill:'mô tả'},
    {q:'Nếu muốn giới thiệu bức ảnh này với bạn, câu mở đầu nào phù hợp nhất?',a:'Đây là gia đình mình, gồm ông bà, bố mẹ và các con.',o:['Đây là gia đình mình, gồm ông bà, bố mẹ và các con.','Đây là lớp học của mình.','Đây là đội bóng của trường.','Đây là khu vườn không có người.'],level:3,skill:'câu giới thiệu'}
  ]}
].map(s=>({...s,image:(typeof resolveClass2VietnameseImageSrc==='function' ? (resolveClass2VietnameseImageSrc(s.id) || `assets/images/${s.id}.jpg`) : `assets/images/${s.id}.jpg`)}));

let faDeck=[];
let faRound=0;
let faCycle=0;
let faScore=0;
let faStreak=0;
let faBest=0;
let faLocked=false;
let faCurrent=null;
const faQuestionState={};

function faShuffle(arr){
  const a=arr.slice();
  for(let i=a.length-1;i>0;i--){
    const j=Math.floor(Math.random()*(i+1));
    [a[i],a[j]]=[a[j],a[i]];
  }
  return a;
}

function faBuildDeck(){
  faDeck=faShuffle(FA_SCENES);
  faCycle++;
  if(faCurrent&&faDeck.length>1&&faDeck[0].id===faCurrent.scene.id){
    [faDeck[0],faDeck[1]]=[faDeck[1],faDeck[0]];
  }
}

// Moi anh co deck cau hoi rieng. Chi khi dung het cau cua anh moi tron lai.
// Khi tron lai, tranh lap dung cau vua ra o lan gan nhat neu co the.
function faPickQuestion(scene){
  let state=faQuestionState[scene.id];
  if(!state){
    state=faQuestionState[scene.id]={deck:[],lastIndex:-1};
  }
  if(!state.deck.length){
    state.deck=faShuffle(scene.qs.map((_,i)=>i));
    if(state.deck.length>1&&state.deck[0]===state.lastIndex){
      [state.deck[0],state.deck[1]]=[state.deck[1],state.deck[0]];
    }
  }
  const index=state.deck.shift();
  state.lastIndex=index;
  return scene.qs[index];
}

function faNext(){if(typeof isMiniGameActive==='function'&&!isMiniGameActive('family-activity'))return;
  if(!faDeck.length)faBuildDeck();
  const scene=faDeck.shift();
  const q=faPickQuestion(scene);
  faCurrent={scene,q};
  faRound++;
  faLocked=false;
  faRender();
}

function faEnsureStyles(){
  if(document.getElementById('family-activity-style'))return;
  const s=document.createElement('style');
  s.id='family-activity-style';
  s.textContent=`
@keyframes faShake{0%,100%{transform:translateX(0)}25%{transform:translateX(-7px)}50%{transform:translateX(7px)}75%{transform:translateX(-4px)}}
@keyframes faGlow{0%,100%{box-shadow:none}50%{box-shadow:0 0 28px rgba(16,185,129,.3)}}
.fa-shake{animation:faShake .3s ease}.fa-correct{animation:faGlow .65s ease}
.fa-main-layout{display:grid;grid-template-columns:minmax(300px,410px) minmax(0,1fr);gap:14px;align-items:stretch}
.fa-picture-wrap{position:relative;aspect-ratio:1/1;width:100%;overflow:hidden}
.fa-picture{width:100%;height:100%;object-fit:cover;display:block}
.fa-options{display:grid;grid-template-columns:1fr;gap:10px;align-content:center}
.fa-option{min-height:58px}
@media(max-width:900px){.fa-main-layout{grid-template-columns:minmax(260px,350px) minmax(0,1fr);gap:10px}.fa-option{min-height:54px}}
@media(max-width:700px){.fa-main-layout{grid-template-columns:1fr}.fa-picture-wrap{max-width:430px;margin:0 auto}.fa-options{grid-template-columns:1fr 1fr}.fa-option{min-height:50px}}
@media(max-width:460px){.fa-options{grid-template-columns:1fr}}
`;
  document.head.appendChild(s);
}

function startFamilyActivityGame(){
  faEnsureStyles();
  faDeck=[];
  faRound=0;
  faCycle=0;
  faScore=0;
  faStreak=0;
  faBest=0;
  faLocked=false;
  faCurrent=null;
  Object.keys(faQuestionState).forEach(k=>delete faQuestionState[k]);
  faNext();
}

function faEscapeAttr(value){
  return String(value).replace(/&/g,'&amp;').replace(/"/g,'&quot;');
}

function faRender(){
  const box=document.getElementById('game-play-container');
  if(!box||!faCurrent)return;
  const {q:question,a:correct,o:rawOptions}=faCurrent.q;
  const options=faShuffle(rawOptions);
  const palettes=[
    'bg-pink-50 border-pink-200 hover:bg-pink-100',
    'bg-sky-50 border-sky-200 hover:bg-sky-100',
    'bg-amber-50 border-amber-200 hover:bg-amber-100',
    'bg-emerald-50 border-emerald-200 hover:bg-emerald-100'
  ];
  box.innerHTML=`
<div class="rounded-[28px] border-2 border-pink-100 bg-gradient-to-b from-sky-50/70 via-pink-50/50 to-emerald-50/60 p-2.5 md:p-3">
  <div class="flex items-center justify-between gap-2 mb-2">
    <div class="flex items-center gap-2 min-w-0">
      <span class="px-3 py-1.5 rounded-full bg-white/90 border border-pink-200 text-pink-600 font-black text-xs md:text-sm shrink-0">🏡 Lượt ${faRound}</span>
      <div id="fa-question" data-minigame-question class="font-black text-teal-700 text-sm md:text-lg leading-tight">${question}</div>
    </div>
    <div class="flex gap-1.5 shrink-0">
      <span class="px-2.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 font-black text-xs md:text-sm">⭐ ${faScore}</span>
      <span class="px-2.5 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-rose-600 font-black text-xs md:text-sm">🔥 x${faStreak}</span>
      <span class="px-2.5 py-1.5 rounded-full bg-purple-50 border border-purple-200 text-purple-600 font-black text-xs md:text-sm">🏆 ${faBest}</span>
    </div>
  </div>
  <div class="fa-main-layout">
    <div class="fa-picture-wrap"><img class="fa-picture" src="${faCurrent.scene.image}" alt="Hoạt động gia đình"></div>
    <div class="fa-options">
      ${options.map((op,i)=>`<button class="fa-option px-4 py-2.5 rounded-2xl border-2 ${palettes[i]} text-slate-700 font-black text-sm md:text-base shadow-sm transition-all" data-answer="${faEscapeAttr(op)}" onclick="faChoose(this)">${op}</button>`).join('')}
      <div id="fa-feedback" class="min-h-[28px] flex items-center justify-center text-center text-xs md:text-sm font-black text-slate-500">👀 Bé quan sát thật kỹ, đọc đủ câu hỏi rồi chọn phương án hợp lý nhất nhé!</div>
    </div>
  </div>
</div>`;
  if(typeof setMiniGameQuestionAudio==='function')setMiniGameQuestionAudio(question,0.94);
  if(typeof faSpeakSafe==='function')setTimeout(()=>faSpeakSafe(question,0.94),150);
}

function faChoose(btn){
  if(faLocked||!faCurrent)return;
  const answer=btn.dataset.answer;
  const correct=faCurrent.q.a;
  if(answer===correct){
    faLocked=true;
    faScore+=10+Math.min(faStreak,5)*2;
    faStreak++;
    faBest=Math.max(faBest,faStreak);
    btn.classList.add('bg-emerald-100','border-emerald-400','text-emerald-800','fa-correct');
    const fb=document.getElementById('fa-feedback');
    if(fb)fb.innerHTML=`🎉 Chính xác! <span class="text-emerald-700 ml-1">${correct}</span>`;
    if(typeof playAudio==='function')playAudio('correct');
    if(typeof confetti==='function')confetti({particleCount:50,spread:65,origin:{y:.72}});
    if(typeof faSpeakSafe==='function')faSpeakSafe(`${correct}. Chính xác!`,1.0);
    setTimeout(faNext,1200);
  }else{
    faStreak=0;
    btn.classList.add('fa-shake','border-rose-400','bg-rose-50');
    setTimeout(()=>btn.classList.remove('fa-shake','border-rose-400','bg-rose-50'),360);
    const fb=document.getElementById('fa-feedback');
    if(fb)fb.textContent='🔎 Chưa đúng rồi. Bé đọc lại câu hỏi và quan sát thêm một lần nhé!';
    if(typeof playAudio==='function')playAudio('wrong');
  }
}

window.startFamilyActivityGame=startFamilyActivityGame;
window.faChoose=faChoose;
