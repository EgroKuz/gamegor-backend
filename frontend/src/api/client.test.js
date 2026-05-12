import { describe, it, expect, vi, beforeEach } from 'vitest';
import api from './client';

describe('API Client', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('has correct base URL', () => {
    expect(api.defaults.baseURL).toBeDefined();
  });

  it('attaches Authorization header if token is present in localStorage', async () => {
    localStorage.setItem('access_token', 'test-token');
    
    // Create a mock interceptor config
    const config = { headers: {} };
    
    // We expect the request interceptor to attach the token
    const interceptor = api.interceptors.request.handlers[0].fulfilled;
    const resultConfig = await interceptor(config);
    
    expect(resultConfig.headers['Authorization']).toBe('Bearer test-token');
  });

  it('does not attach Authorization header if token is absent', async () => {
    const config = { headers: {} };
    
    const interceptor = api.interceptors.request.handlers[0].fulfilled;
    const resultConfig = await interceptor(config);
    
    expect(resultConfig.headers['Authorization']).toBeUndefined();
  });
});
