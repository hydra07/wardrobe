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

export const feedItems = [
  {
    id: 1,
    title: 'White Dress Shirt',
    content: 'This is the first feed item',
    description:
      'Welcome the season of renewal with our Fresh Spring Breeze Look, a perfect ensemble that captures the essence of spring with its vibrant colors and lightweight fabrics.',
    listItem: [
      {
        name: 'Leather Jacket',
        description:
          'A classic leather jacket that will never go out of style.',
        image: '/ao.webp',
      },
      {
        name: 'Denim Jacket',
        description: 'Stylish and versatile for any casual outfit.',
        image: '/ao-khoac.jpg',
      },
    ],
  },
  {
    id: 2,
    title: 'Gray Hoodie',
    content: 'This is the second feed item',
    description:
      'Stay cozy and warm with our new gray hoodie, perfect for a chilly day.',
    listItem: [
      {
        name: 'Gray Hoodie',
        description: 'Perfect for layering and casual wear.',
        image: '/ao-xam.jpg',
      },
      {
        name: 'Black Hoodie',
        description: 'A staple for your winter wardrobe.',
        image: '/ao-den.jpg',
      },
      {
        name: 'White Hoodie',
        description: 'Lightweight and comfortable.',
        image: '/ao.webp',
      },
    ],
  },
  {
    id: 3,
    title: 'Black Leather Jacket',
    content: 'This is the third feed item',
    description: 'A timeless piece that gives you a bold and edgy look.',
    listItem: [
      {
        name: 'Black Leather Jacket',
        description: 'Adds a touch of sophistication to any outfit.',
        image: '/ao-den.jpg',
      },
      {
        name: 'Brown Leather Jacket',
        description: 'Classic design with a modern twist.',
        image: '/ao.webp',
      },
    ],
  },
  {
    id: 4,
    title: 'Casual Jeans',
    content: 'This is the fourth feed item',
    description: 'Comfortable and stylish, perfect for everyday wear.',
    listItem: [
      {
        name: 'Blue Jeans',
        description: 'Classic fit jeans that never go out of style.',
        image: '/quan.avif',
      },
      {
        name: 'Black Jeans',
        description: 'A versatile choice for any outfit.',
        image: '/ao-khoac.jpg',
      },
      {
        name: 'Slim Fit Jeans',
        description: 'Fashionable and comfortable.',
        image: '/ao.webp',
      },
    ],
  },
  {
    id: 5,
    title: 'Summer Polo Shirt',
    content: 'This is the fifth feed item',
    description: 'Lightweight and breathable, ideal for warm weather.',
    listItem: [
      {
        name: 'White Polo',
        description: 'Keep it casual and cool this summer.',
        image: '/ao.webp',
      },
      {
        name: 'Navy Polo',
        description: 'Stylish and comfortable for outings.',
        image: '/ao-xam.jpg',
      },
    ],
  },
  {
    id: 6,
    title: 'Winter Coat',
    content: 'This is the sixth feed item',
    description: 'Stay warm and stylish with our winter coat.',
    listItem: [
      {
        name: 'Puffy Winter Coat',
        description: 'Designed to keep you warm in cold weather.',
        image: '/ao-khoac.jpg',
      },
      {
        name: 'Trench Coat',
        description: 'Elegant and perfect for layering.',
        image: '/ao.webp',
      },
      {
        name: 'Faux Fur Coat',
        description: 'Luxurious and warm.',
        image: '/ao-xam.jpg',
      },
      {
        name: 'Overcoat',
        description: 'Sophisticated and stylish for formal occasions.',
        image: '/ao-den.jpg',
      },
    ],
  },
  {
    id: 7,
    title: 'Formal Trousers',
    content: 'This is the seventh feed item',
    description: 'Upgrade your office wardrobe with our formal trousers.',
    listItem: [
      {
        name: 'Black Formal Trousers',
        description: 'Crafted for style and comfort.',
        image: '/quan.avif',
      },
      {
        name: 'Gray Formal Trousers',
        description: 'Perfect for business meetings.',
        image: '/ao-khoac.jpg',
      },
    ],
  },
  {
    id: 8,
    title: 'Denim Shirt',
    content: 'This is the eighth feed item',
    description: 'A versatile denim shirt for any occasion.',
    listItem: [
      {
        name: 'Light Denim Shirt',
        description: 'Timeless piece that can be dressed up or down.',
        image: '/ao-den.jpg',
      },
      {
        name: 'Dark Denim Shirt',
        description: 'Stylish and perfect for layering.',
        image: '/ao.webp',
      },
    ],
  },
  {
    id: 9,
    title: 'Black T-Shirt',
    content: 'This is the ninth feed item',
    description: 'A must-have for every wardrobe.',
    listItem: [
      {
        name: 'Basic Black T-Shirt',
        description: 'Simple yet stylish for everyday wear.',
        image: '/ao.webp',
      },
      {
        name: 'Graphic Black T-Shirt',
        description: 'Express your style with a graphic tee.',
        image: '/ao-xam.jpg',
      },
      {
        name: 'Long Sleeve Black T-Shirt',
        description: 'Comfortable and versatile for cooler days.',
        image: '/ao-den.jpg',
      },
    ],
  },
  {
    id: 10,
    title: 'Chino Pants',
    content: 'This is the tenth feed item',
    description: 'Comfortable alternative to jeans.',
    listItem: [
      {
        name: 'Beige Chino Pants',
        description: 'Smart casual look for various occasions.',
        image: '/quan.avif',
      },
      {
        name: 'Navy Chino Pants',
        description: 'Versatile and comfortable for any setting.',
        image: '/ao-khoac.jpg',
      },
    ],
  },
  {
    id: 11,
    title: 'White Sneakers',
    content: 'This is the eleventh feed item',
    description: 'Perfect for a casual day out.',
    listItem: [
      {
        name: 'Classic White Sneakers',
        description: 'Comfortable and stylish footwear.',
        image: '/ao.webp',
      },
      {
        name: 'Sporty White Sneakers',
        description: 'Ideal for active days.',
        image: '/ao-xam.jpg',
      },
    ],
  },
  {
    id: 12,
    title: 'Floral Dress',
    content: 'This is the twelfth feed item',
    description: 'Embrace the floral trend this season.',
    listItem: [
      {
        name: 'Red Floral Dress',
        description: 'Lightweight and perfect for summer.',
        image: '/ao-xam.jpg',
      },
      {
        name: 'Blue Floral Dress',
        description: 'Stylish and comfortable for warm days.',
        image: '/ao.webp',
      },
      {
        name: 'Pink Floral Dress',
        description: 'Bright and cheerful for sunny days.',
        image: '/ao-den.jpg',
      },
    ],
  },
  {
    id: 13,
    title: 'Cargo Shorts',
    content: 'This is the thirteenth feed item',
    description: 'Stylish and functional for summer outings.',
    listItem: [
      {
        name: 'Khaki Cargo Shorts',
        description: 'Great for casual wear with ample pockets.',
        image: '/quan.avif',
      },
      {
        name: 'Navy Cargo Shorts',
        description: 'Perfect for summer adventures.',
        image: '/ao-khoac.jpg',
      },
    ],
  },
  {
    id: 14,
    title: 'Athletic Wear',
    content: 'This is the fourteenth feed item',
    description: 'Comfortable and stylish for your workouts.',
    listItem: [
      {
        name: 'Athletic Shirt',
        description: 'Breathable fabric for active days.',
        image: '/ao.webp',
      },
      {
        name: 'Athletic Shorts',
        description: 'Perfect for training and outdoor activities.',
        image: '/quan.avif',
      },
    ],
  },
  {
    id: 15,
    title: 'Beachwear',
    content: 'This is the fifteenth feed item',
    description: 'Get ready for your next beach day.',
    listItem: [
      {
        name: 'Swim Trunks',
        description: 'Quick-drying and comfortable for the beach.',
        image: '/ao-xam.jpg',
      },
      {
        name: 'Beach Cover-Up',
        description: 'Lightweight and stylish for your beach outings.',
        image: '/ao.webp',
      },
      {
        name: 'Flip Flops',
        description: 'Essential footwear for the beach.',
        image: '/ao-den.jpg',
      },
    ],
  },
];
