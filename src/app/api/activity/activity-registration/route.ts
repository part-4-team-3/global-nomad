import { handleRequest } from '@/app/(action)/axios';
import { ActivitySettingData } from '@/types/activity';

export async function POST(body: ActivitySettingData) {
  return handleRequest('/activities', 'post', body);
}
