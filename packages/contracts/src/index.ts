export const APP_NAME = 'My App';

export interface HealthResponse {
  status: 'ok';
  service: 'app-server';
}

export function isHealthResponse(value: unknown): value is HealthResponse {
  return typeof value === 'object' && value !== null
    && 'status' in value && value.status === 'ok'
    && 'service' in value && value.service === 'app-server';
}
