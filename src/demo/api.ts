import { ItemProps } from '@/components/ui.custom/ListCard';

// export const wardrobeItems: ItemProps[] = [
//   {
//     name: 'White Dress Shirt',
//     description:
//         'White dress shirt, made of cotton, suitable for office and formal events.',
//     button: {
//       name: 'Try Now',
//       href: 'https://example.com/white-dress-shirt',
//     },
//   },
//   {
//     name: 'Blue Jeans',
//     description:
//         'Blue jeans, simple design, suitable for any occasion.',
//     button: {
//       name: 'Try Now',
//       href: 'https://example.com/blue-jeans',
//     },
//   },
//   {
//     name: 'Black T-shirt',
//     description:
//         'Black t-shirt, soft cotton material, easy to match with various outfits.',
//     button: {
//       name: 'Try Now',
//       href: 'https://example.com/black-t-shirt',
//     },
//   },
//   {
//     name: 'Beige Shorts',
//     description:
//         'Beige shorts, comfortable for outdoor activities.',
//     button: {
//       name: 'Try Now',
//       href: 'https://example.com/beige-shorts',
//     },
//   },
//   {
//     name: 'Black Leather Jacket',
//     description: 'Black leather jacket, stylish and warm for winter.',
//     button: {
//       name: 'Try Now',
//       href: 'https://example.com/black-leather-jacket',
//     },
//   },
//   {
//     name: 'Gray Dress Pants',
//     description:
//         'Gray dress pants, suitable for meetings and important events.',
//     button: {
//       name: 'Try Now',
//       href: 'https://example.com/gray-dress-pants',
//     },
//   },
//   {
//     name: 'Navy Blue Crewneck Sweater',
//     description: 'Navy blue crewneck sweater, warm for cold weather.',
//     button: {
//       name: 'Try Now',
//       href: 'https://example.com/navy-blue-crewneck-sweater',
//     },
//   },
//   {
//     name: 'Gray Joggers',
//     description:
//         'Gray joggers, comfortable and stylish for workouts.',
//     button: {
//       name: 'Try Now',
//       href: 'https://example.com/gray-joggers',
//     },
//   },
//   {
//     name: 'Black Vest',
//     description: 'Black vest, suitable for elegant suits.',
//     button: {
//       name: 'Try Now',
//       href: 'https://example.com/black-vest',
//     },
//   },
//   {
//     name: 'Khaki Cargo Pants',
//     description:
//         'Khaki cargo pants, olive green, with many convenient pockets for outdoor activities.',
//     button: {
//       name: 'Try Now',
//       href: 'https://example.com/khaki-cargo-pants',
//     },
//   },
// ];

export const wardrobeTags = ['Shirt', 'Jeans', 'Skirt', 'Jacket'];

export const clothing_options: {
  label: string;
  value: string;
  disable?: boolean;
}[] = [
  { label: 'Dress Shirt', value: 'dress-shirt' },
  { label: 'Jeans', value: 'jeans' },
  { label: 'Skirt', value: 'skirt' },
  { label: 'Jacket', value: 'jacket' },
  { label: 'T-shirt', value: 't-shirt' },
  { label: 'Dress Pants', value: 'dress-pants' },
  { label: 'Dress', value: 'dress' },
  { label: 'Sweater', value: 'sweater' },
  { label: 'Long Dress', value: 'long-dress', disable: true },
  { label: 'Shorts', value: 'shorts', disable: true },
  { label: 'Blazer', value: 'blazer' },
];

export const listTags: { name: string }[] = [
  { name: 'T-shirt' },
  { name: 'Dress Shirt' },
  { name: 'Jeans' },
  { name: 'Skirts Dresses' },
  { name: 'Sportswear' },
  { name: 'Accessories' },
];