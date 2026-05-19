import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'patheya-express',
  webDir: 'dist/patheya-express',
  server: {
    androidScheme: 'http',
    cleartext: true
  }
};

export default config;
