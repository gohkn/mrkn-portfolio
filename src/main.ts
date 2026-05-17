import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, appConfig).catch((err: unknown) => {
  // Use error to avoid noisy console.log; rethrows are not allowed at boot
  // eslint-disable-next-line no-console
  console.error('Application bootstrap failed', err);
});
