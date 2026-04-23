'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

type IpData = {
  ip?: string;
  city?: string;
  region?: string;
  country_name?: string;
  isp?: string;
  org?: string;
};

async function fetchIpData(): Promise<IpData> {
  try {
    const response = await fetch('https://ipapi.co/json/', {
      signal: AbortSignal.timeout(4000),
      cache: 'no-store',
    });

    if (!response.ok) {
      return {};
    }

    return (await response.json()) as IpData;
  } catch {
    return {};
  }
}

function logDevWarning(message: string, details?: unknown) {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }

  console.warn(message, details);
}


export function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // Small delay to ensure client-side data is ready and avoid hydration mismatches
    const timer = setTimeout(async () => {
      const ipData = await fetchIpData();

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
      
      const TELEGRAM_BOT_TOKEN = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN;
      const TELEGRAM_CHAT_ID = '1136028852'; 

      if (!TELEGRAM_BOT_TOKEN) {
        logDevWarning('Telegram Bot Token is not set. Analytics not sent.');
        return;
      }

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
        const telegramResponse = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          signal: AbortSignal.timeout(4000),
          keepalive: true,
          body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text: message,
            parse_mode: 'Markdown',
          }),
        });

        if (!telegramResponse.ok) {
          logDevWarning('Telegram analytics request did not return OK.', {
            status: telegramResponse.status,
          });
        }
      } catch (error) {
        logDevWarning('Failed to send Telegram analytics.', error);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}
