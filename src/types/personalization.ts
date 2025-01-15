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