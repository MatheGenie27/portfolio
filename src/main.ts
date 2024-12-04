/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { routes } from './app/app.routes';

// Bootstrap der Anwendung mit zusätzlichen Router-Konfigurationen
bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    ...appConfig.providers,
    provideRouter(routes, 
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled', // Stellt die Scroll-Position nach Navigation auf Anfang wieder her
        anchorScrolling: 'enabled' // Ermöglicht das Scrollen zu Anker-Links innerhalb der Seite
      })
    )
  ],
})
.catch((err) => console.error(err));
