
// Configuration for social media platforms
export interface SocialPlatformConfig {
  platform: string;
  name: string;
  color: string;
}

export const socialPlatforms: SocialPlatformConfig[] = [
  { platform: 'facebook', name: 'Facebook', color: '#1877F2' },
  { platform: 'instagram', name: 'Instagram', color: '#E4405F' },
  { platform: 'youtube', name: 'YouTube', color: '#FF0000' },
  { platform: 'tiktok', name: 'TikTok', color: '#000000' },
  { platform: 'x', name: 'X', color: '#000000' },
  { platform: 'snapchat', name: 'Snapchat', color: '#FFFC00' },
  { platform: 'linkedin', name: 'LinkedIn', color: '#0A66C2' },
  { platform: 'whatsapp', name: 'WhatsApp', color: '#25D366' },
  { platform: 'meta', name: 'Meta', color: '#0668E1' },
  { platform: 'messenger', name: 'Messenger', color: '#00B2FF' }
];
