'use server';
import Tag from '@/models/tag.model';

class TagService {
  async createTag(name: string): Promise<InstanceType<typeof Tag>> {
    const tag = new Tag({ name });
    return await tag.save();
  }

  async getAllTags(): Promise<InstanceType<typeof Tag>[]> {
    return await Tag.find();
  }
}

export default TagService;

export async function getTags(
  options?: any,
): Promise<InstanceType<typeof Tag>[]> {
  let query = Tag.find();

  if (options?.userId) {
    query = query.where('userId', options.userId);
  }

  if (options?.sortBy) {
    const sortOrder = options.sortOrder === 'desc' ? -1 : 1;
    query = query.sort({ [options.sortBy]: sortOrder });
  }

  const tags = await query;
  return tags;
}

export async function addTag(
  name: string,
  userId: string,
): Promise<InstanceType<typeof Tag>> {
  console.log(userId);
  const tag = new Tag({
    userId: userId,
    name: name,
  });
  return await tag.save();
}
