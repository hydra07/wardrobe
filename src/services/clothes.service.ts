'use server';
import Clothes from '@/models/clothes.model';
import Tag from '@/models/tag.model';
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
  const cloth = new Clothes({
    userId: userId,
    title: data.title,
    brand: data.brand,
    tags: data.tags,
    description: data.description,
  });
  return await cloth.save();
}

async function getClothes(
  // options?: ClothesQuery,
  skip?: number,
  take?: number,
): Promise<InstanceType<typeof Clothes>[]> {
  let query = Clothes.find().populate('tags', 'name');

  skip && (query = query.skip(skip));
  take && (query = query.limit(take));
  const clothes = await query;
  return clothes;
}

export { addCloth, getClothes };
