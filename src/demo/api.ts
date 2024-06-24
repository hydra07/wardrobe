import { ItemProps } from '@/components/ui.custom/ListCard';

export const wardrobeItems: ItemProps[] = [
  {
    name: 'Áo sơ mi trắng',
    description:
      'Áo sơ mi trắng, chất liệu cotton, phù hợp cho công sở và các sự kiện trang trọng.',
    button: {
      name: 'Thử ngay',
      href: 'https://example.com/ao-so-mi-trang',
    },
  },
  {
    name: 'Quần jeans xanh',
    description:
      'Quần jeans xanh, thiết kế đơn giản, phù hợp cho mọi hoàn cảnh.',
    button: {
      name: 'Thử ngay',
      href: 'https://example.com/quan-jeans-xanh',
    },
  },
  {
    name: 'Áo phông đen',
    description:
      'Áo phông đen, chất liệu cotton mềm mại, dễ dàng phối với nhiều trang phục khác.',
    button: {
      name: 'Thử ngay',
      href: 'https://example.com/ao-phong-den',
    },
  },
  {
    name: 'Quần short kaki',
    description:
      'Quần short kaki màu be, thoải mái cho các hoạt động ngoài trời.',
    button: {
      name: 'Thử ngay',
      href: 'https://example.com/quan-short-kaki',
    },
  },
  {
    name: 'Áo khoác da',
    description: 'Áo khoác da màu đen, phong cách và ấm áp cho mùa đông.',
    button: {
      name: 'Thử ngay',
      href: 'https://example.com/ao-khoac-da',
    },
  },
  {
    name: 'Quần tây xám',
    description:
      'Quần tây xám, phù hợp cho các buổi họp và sự kiện quan trọng.',
    button: {
      name: 'Thử ngay',
      href: 'https://example.com/quan-tay-xam',
    },
  },
  {
    name: 'Áo len cổ tròn',
    description: 'Áo len cổ tròn, màu xanh navy, ấm áp cho mùa lạnh.',
    button: {
      name: 'Thử ngay',
      href: 'https://example.com/ao-len-co-tron',
    },
  },
  {
    name: 'Quần jogger',
    description:
      'Quần jogger màu xám, thoải mái và phong cách cho việc tập luyện.',
    button: {
      name: 'Thử ngay',
      href: 'https://example.com/quan-jogger',
    },
  },
  {
    name: 'Áo vest',
    description: 'Áo vest màu đen, phù hợp với các bộ suit lịch lãm.',
    button: {
      name: 'Thử ngay',
      href: 'https://example.com/ao-vest',
    },
  },
  {
    name: 'Quần cargo',
    description:
      'Quần cargo màu xanh rêu, nhiều túi tiện lợi cho các hoạt động ngoài trời.',
    button: {
      name: 'Thử ngay',
      href: 'https://example.com/quan-cargo',
    },
  },
];

export const wardrobeTags = ['Áo', 'Quần', 'Váy', 'Áo khoác'];

export const clothing_options: {
  label: string;
  value: string;
  disable?: boolean;
}[] = [
  { label: 'Áo sơ mi', value: 'ao-so-mi' },
  { label: 'Quần jean', value: 'quan-jean' },
  { label: 'Váy', value: 'vay' },
  { label: 'Áo khoác', value: 'ao-khoac' },
  { label: 'Áo thun', value: 'ao-thun' },
  { label: 'Quần tây', value: 'quan-tay' },
  { label: 'Đầm', value: 'dam' },
  { label: 'Áo len', value: 'ao-len' },
  { label: 'Áo dài', value: 'ao-dai', disable: true },
  { label: 'Quần short', value: 'quan-short', disable: true },
  { label: 'Áo blazer', value: 'ao-blazer' },
];

export const listTags: { name: string }[] = [
  { name: 'Áo Thun' },
  { name: 'Áo Sơ Mi' },
  { name: 'Quần Jean' },
  { name: 'Váy Đầm' },
  { name: 'Đồ Thể Thao' },
  { name: 'Phụ Kiện' },
];
