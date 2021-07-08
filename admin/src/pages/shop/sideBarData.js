import { createImage } from '../../helper';

export default [
    // {
    //     iconHeader: createImage('TP.png'),
    //     headerTitle: ' Vận chuyển',
    //     listItem: ['Quản Lý Vận Chuyển', 'Giao Hàng Loạt', 'Cài Đặt Vận Chuyển'],
    // },
    // {
    //     iconHeader: createImage('TP.png'),
    //     headerTitle: 'quản lý đơn hàng',
    //     listItem: ['tất cả', 'đơn hủy', 'trả hàng / hoàn tiền'],
    // },
    {
        iconHeader: createImage('TP.png'),
        headerTitle: 'quản lí sản phẩm',
        listItem: [
            { itemName: 'tất cả sản phẩm', path: '/shop/sale/order' },
            { itemName: 'thêm sản phẩm', path: '/shop/sale/order?type=cancelled' },
            { itemName: 'sản phẩm vi phạm', path: '/shop/sale/returnlist' },
        ],
    },
    // {
    //     iconHeader: createImage('TP.png'),
    //     headerTitle: 'kênh marketing',
    //     listItem: ['kênh marketing', 'quảng cáo shopee'],
    // },
    // {
    //     iconHeader: createImage('TP.png'),
    //     headerTitle: 'tài chính',
    //     listItem: ['doanh thu', 'số dư TK Shopee', 'tài khoản ngân hàng', 'thiết lập thanh toán'],
    // },
    // {
    //     iconHeader: createImage('TP.png'),
    //     headerTitle: 'dữ liệu',
    //     listItem: ['phân tích bán hàng', 'hiệu quả hoạt động *'],
    // },
    // {
    //     iconHeader: createImage('TP.png'),
    //     headerTitle: 'phát triển',
    //     listItem: ['shop yêu thích *'],
    // },
    // {
    //     iconHeader: createImage('TP.png'),
    //     headerTitle: 'chăm sóc khách hàng',
    //     listItem: ['trợ lý chat *'],
    // },
    // {
    //     iconHeader: createImage('TP.png'),
    //     headerTitle: 'quản lý shop',
    //     listItem: [
    //         'đánh giá shop',
    //         'hồ sơ shop',
    //         'trang trí shop',
    //         'danh mục của shop',
    //         'báo cáo của tôi',
    //     ],
    // },
    // {
    //     iconHeader: createImage('TP.png'),
    //     headerTitle: 'thiết lập shop',
    //     listItem: ['địa chỉ ', 'thiết lập shop', 'tài khoản', 'nền tảng đối tác (Kết nối API)'],
    // },
];
