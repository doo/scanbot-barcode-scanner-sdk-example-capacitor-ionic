import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.scanbot.example.sdk.barcode.capacitor',
  appName: 'Capacitor Scanbot Barcode Scanner SDK Example',
  webDir: 'www/browser',
  server: {
    androidScheme: 'https'
  }
};

export default config;
