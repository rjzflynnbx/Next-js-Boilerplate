// src/types/personalization.ts
export interface PersonalizationResponse {
  component?: {
    layout?: string;
    description?: string;
    type?: string;
    position?: string;
  };
  variation?: string;
}

export interface FeatureFlag {
  feature: {
    enabled: boolean;
    config?: {
      style?: string;
      position?: string;
      variant?: string;
      // any other generic config properties we might need
      [key: string]: any;  // allows for flexible additional properties
    }
  }
}