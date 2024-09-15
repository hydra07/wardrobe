'use server';
import Clothes from '@/models/clothes.model';
import Tag from '@/models/tag.model';
import { getImageIds } from './image.service';

interface ClothesQuery {
  tags?: string | null;
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
            tag = await Tag.create({ name: tagName, userId: userId });
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

  if (options?.tags) {
    const tags = await Tag.find({ name: { $in: options.tags.split(',') } });
    const tagIds = tags.map((tag) => tag._id);

    query = query.where('tags').in(tagIds);
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

async function editCloth(
  id: string,
  data: any,
  userId: string,
): Promise<InstanceType<typeof Clothes> | null> {
  const cloth = await Clothes.findById(id);
  if (!cloth || cloth.userId !== userId) {
    return null; // Không tìm thấy hoặc không phải của người dùng
  }

  // Cập nhật các trường
  cloth.title = data.title || cloth.title;
  cloth.brand = data.brand || cloth.brand;
  cloth.description = data.description || cloth.description;

  if (data.tags) {
    const tagIds = await Promise.all(
      data.tags.map(async (tagName: string) => {
        let tag = await Tag.findOne({ name: tagName });
        if (!tag) {
          tag = await Tag.create({ name: tagName });
        }
        return tag._id;
      }),
    );
    cloth.tags = tagIds;
  }

  if (data.images) {
    cloth.images = await getImageIds(data.images);
  }

  return await cloth.save();
}

export { addCloth, editCloth, getClothes };
