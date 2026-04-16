import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withInMemoryScrolling, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { errorInterceptor } from './core/interceotors/error-interceptor';
import { NgxSpinnerModule } from "ngx-spinner";
import { loadingInterceptor } from './core/interceotors/loading-interceptor';
import { headerInterceptor } from './core/interceotors/header-interceptor';


export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes , withInMemoryScrolling({scrollPositionRestoration: "top"}) , withViewTransitions() ), provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch() , withInterceptors([errorInterceptor , loadingInterceptor , headerInterceptor])),
    provideToastr({
  timeOut: 3000, // تختفي بعد 3 ثواني
  preventDuplicates: true, // يمنع تكرار نفس الرسالة ورا بعض
  countDuplicates: true,
}), 
    importProvidersFrom(NgxSpinnerModule,)
  ]
};
