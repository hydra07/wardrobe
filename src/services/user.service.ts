import User from '@/models/user.model';
import { getImageIds } from './image.service';

export async function updateUserProfile(
  userId: string,
  options: {
    username?: string;
    image?: string;
    photos?: string;
  },
): Promise<InstanceType<typeof User> | null> {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    if (options.username) {
      user.username = options.username;
    }

    if (options.image) {
      user.avatar = options.image;
    }

    if (options.photos) {
      const imageIds = await getImageIds(options.photos);
      user.photos = imageIds;
    }

    return User.updateOne({ _id: user._id }, user);
  } catch (error) {
    console.error('Error updateing user profile', error);
  }
}

export async function getUser(
  userId: string,
): Promise<InstanceType<typeof User> | null> {
  try {
    const user = await User.findById(userId).populate('photos');
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  } catch (error) {
    console.error('Error fetch user profile', error);
  }
}

export async function upgradeUserToPremium(
  userId: string,
): Promise<InstanceType<typeof User> | null> {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    if (!user.role) {
      user.role = [];
    }
    if (!user.role.includes('premium')) {
      user.role.push('premium'); // Thêm 'premium' vào mảng role
    }
    const status = {
      isPremium: false,
      premiumExpiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // Thêm 30 ngày
    };
    user.premiumStatus = status;
    return User.updateOne({ _id: user._id }, user);
  } catch (error: any) {
    console.log(error);
  }
}
