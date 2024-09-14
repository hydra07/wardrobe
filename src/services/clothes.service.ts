'use server';
import Clothes from '@/models/clothes.model';
import Tag from '@/models/tag.model';
import { getImageIds } from './image.service';

interface ClothesQuery {
  tags?: string;
  brand?: string;
  title?: string;
  userId?: string;
}
// this order by options
interface ClothesOptions {
  orderBy?: string;
}

async function addCloth(
  data: any,
  userId: string,
): Promise<InstanceType<typeof Clothes>> {
  const tagIds = data.tags
    ? await Promise.all(
        data.tags.map(async (tagName: string) => {
          let tag = await Tag.findOne({ name: tagName });
          if (!tag) {
            tag = await Tag.create({ name: tagName });
          }
          return tag._id;
        }),
      )
    : [];

  const imageIds = await getImageIds(data.images);
  const cloth = new Clothes({
    userId: userId,
    title: data.title,
    brand: data.brand,
    tags: tagIds,
    description: data.description,
    images: imageIds,
  });
  return await cloth.save();
}

async function getClothes(
  options?: ClothesQuery,
  skip?: number,
  take?: number,
): Promise<InstanceType<typeof Clothes>[]> {
  let query = Clothes.find();

  if (options?.userId) {
    query = query.where('userId', options.userId);
  }

  query = query.populate('tags', 'name');
  query = query.populate('images', 'url');

  if (skip) {
    query = query.skip(skip);
  }

  if (take) {
    query = query.limit(take);
  }

  const clothes = await query;
  return clothes;
}

export { addCloth, getClothes };
