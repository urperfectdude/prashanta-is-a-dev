'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';


export function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // Small delay to ensure client-side data is ready and avoid hydration mismatches
    const timer = setTimeout(async () => {
      let ipData: any = {};
      try {
        const response = await fetch('https://ipapi.co/json/');
        ipData = await response.json();
      } catch (error) {
        console.error('Failed to fetch IP data:', error);
      }

      const data = {
        path: pathname,
        url: window.location.href,
        userAgent: navigator.userAgent,
        screenSize: `${window.screen.width}x${window.screen.height}`,
        language: navigator.language,
        referrer: document.referrer,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        ip: ipData.ip,
        city: ipData.city,
        region: ipData.region,
        country: ipData.country_name,
        isp: ipData.isp || ipData.org,
      };
      
      const TELEGRAM_BOT_TOKEN = '8272049705:AAH5sjoDIqL-D_4c23YnfjVQQzlJ8qCI1D0';
      // TODO: Replace with your actual Chat ID. Check the README or messaging the bot to get it.
      const TELEGRAM_CHAT_ID = '1136028852'; 

      if (!TELEGRAM_CHAT_ID) {
        console.warn('Telegram Chat ID is not set. Analytics not sent.');
        return;
      }

      const message = `
*🚀 New Site Visit!*

📅 *Time:* ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
📍 *Path:* \`${data.path}\`
🔗 *URL:* ${data.url}
🖥️ *Screen:* ${data.screenSize}
🌍 *Language:* ${data.language}
🔗 *Referrer:* ${data.referrer || 'Direct'}
🕒 *Visitor Timezone:* ${data.timezone}
🌐 *IP:* \`${data.ip || 'Unknown'}\`
📍 *Location:* ${data.city || 'Unknown'}, ${data.region || ''}, ${data.country || ''}
🏢 *ISP:* ${data.isp || 'Unknown'}
🤖 *User Agent:* \`${data.userAgent}\`
      `.trim();

      try {
        await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text: message,
            parse_mode: 'Markdown',
          }),
        });
      } catch (error) {
        console.error('Failed to send Telegram analytics:', error);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}
