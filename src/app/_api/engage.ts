// src/app/_api/engage.ts
import type { Engage } from '@sitecore/engage';
import { init } from '@sitecore/engage';

class EngageService {
  private static instance: Engage | null = null;

  static async initialize() {
    if (this.instance) {
      return this.instance;
    }

    try {
      this.instance = await init({
        clientKey: 'sise1eunua85o8xcud0kedjg1clno632',
        targetURL: 'https://api-engage-eu.sitecorecloud.io',
        pointOfSale: 'SomeDemo',
        cookieDomain: 'localhost',
        cookieExpiryDays: 365,
        forceServerCookieMode: false,
        includeUTMParameters: true,
        webPersonalization: true,
      });
    } catch (error) {
      console.error('Failed to initialize Engage:', error);
      this.instance = null;
    }

    return this.instance;
  }

  static getInstance() {
    return this.instance;
  }
}

// Initialize on import
EngageService.initialize();

export default EngageService;
