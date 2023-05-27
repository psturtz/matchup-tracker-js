import { connectToDB } from '@utils/database';
import User from '@models/user';

export const PATCH = async (req, { params }) => {
  const { id } = params;
  const updatedSettings = await req.json();
  try {
    await connectToDB();
    
    const existingSettings = await User.findById(id);

    if(!existingSettings) {
      return new Response('User not found', { status: 404 });
    }
    console.log(
      existingSettings.settings[0].stats[0],
      'existing',
      updatedSettings,
      'new'
    );
    existingSettings.settings[0].stats = [updatedSettings.stats];
    await existingSettings.save();

    return new Response('Successfully updated the Settings', { status: 200 });
  } catch (error) {
    console.log(error)
    return new Response('Error Updating Settings', { status: 500 });
  }
};
