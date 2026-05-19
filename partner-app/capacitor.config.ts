import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.patheya.partner',
  appName: 'Patheya Partner',
  webDir: 'dist/patheya-partner-app',
  server: {
    androidScheme: 'https'
  }
};

export default config;