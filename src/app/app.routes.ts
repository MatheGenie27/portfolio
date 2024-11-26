import { Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { LegalNoticeComponent } from './legal-notice/legal-notice.component';
import { ImpressumComponent } from './impressum/impressum.component';
import { DatenschutzComponent } from './datenschutz/datenschutz.component';
import { PrivacyComponent } from './privacy/privacy.component';

export const routes: Routes = [
    {path:'', component: MainComponent},
    {path:'legalNotice', component: LegalNoticeComponent},
    {path: 'impressum', component:ImpressumComponent},
    {path: 'datenschutz', component: DatenschutzComponent},
    {path: 'privacy', component:PrivacyComponent},
    { path: '**', redirectTo: '' }
];
