// src/app/_api/engage.ts
import type { Engage } from '@sitecore/engage';
import { init } from '@sitecore/engage';

class EngageService {
  private static instance: Engage | null = null;
  private static initializationPromise: Promise<Engage | null> | null = null;

  static async initialize() {
    if (!this.initializationPromise) {
      console.log('Initializing Engage SDK'); // Add this
      this.initializationPromise = init({
        clientKey: 'sise1eunua85o8xcud0kedjg1clno632',
        targetURL: 'https://api-engage-eu.sitecorecloud.io',
        pointOfSale: 'SomeDemo',
        cookieDomain: 'localhost',
        cookieExpiryDays: 365,
        forceServerCookieMode: false,
        includeUTMParameters: true,
        webPersonalization: true,
      }).then(instance => {
        this.instance = instance;
        return instance;
      }).catch(error => {
        console.error('Failed to initialize Engage:', error);
        this.instance = null;
        return null;
      });
    }
    return this.initializationPromise;
  }

  static async getInstance() {
    if (!this.instance) {
      await this.initialize();
    }
    return this.instance;
  }
}

// Initialize on import
EngageService.initialize();

export default EngageService;