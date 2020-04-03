import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule, Routes } from "@angular/router";
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { InMemoryWebApiModule } from "angular-in-memory-web-api";
import { TranslateModule } from "@ngx-translate/core";
import "hammerjs";

import { FuseModule } from "@fuse/fuse.module";
import { FuseSharedModule } from "@fuse/shared.module";
import {
    FuseProgressBarModule,
    FuseSidebarModule,
    FuseThemeOptionsModule
} from "@fuse/components";

import { fuseConfig } from "app/fuse-config";

import { AppComponent } from "app/app.component";
import { AppStoreModule } from "app/store/store.module";
import { LayoutModule } from "app/layout/layout.module";
import { LoginModule } from "./main/pages/authentication/login/login.module";
import { AuthService } from "./services/auth.service";
import { AuthGuard } from "./guards/auth.guard";
import { FakeDbService } from "./fake-db/fake-db.service";
import { ToastrModule } from "ngx-toastr";
import { MatDialogModule } from "@angular/material/dialog";
import { ConfirmDialogModule } from "./layout/components/confirm-dialog/confirm-dialog.module";
import { MasterModule } from "./main/pages/master/master.module";
import { AuthInterceptor } from "./services/auth.interceptor";
import { ReportModule } from "./main/pages/reports/report.module";

const appRoutes: Routes = [
    {
        path: "apps",
        loadChildren: "./main/apps/apps.module#AppsModule",
        canActivate: [AuthGuard]
    },
    {
        path: "pages",
        loadChildren: "./main/pages/pages.module#PagesModule",
        canActivate: [AuthGuard]
    },
    {
        path: "ui",
        loadChildren: "./main/ui/ui.module#UIModule",
        canActivate: [AuthGuard]
    },
    {
        path: "documentation",
        loadChildren:
            "./main/documentation/documentation.module#DocumentationModule",
        canActivate: [AuthGuard]
    },
    {
        path: "angular-material-elements",
        loadChildren:
            "./main/angular-material-elements/angular-material-elements.module#AngularMaterialElementsModule",
        canActivate: [AuthGuard]
    },
    {
        path: "**",
        redirectTo: "auth/login"
    }
];

@NgModule({
    declarations: [AppComponent],
    imports: [
        ToastrModule.forRoot(),
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes),

        TranslateModule.forRoot(),
        InMemoryWebApiModule.forRoot(FakeDbService, {
            delay: 0,
            passThruUnknownUrl: true
        }),

        // Material moment date module
        MatMomentDateModule,

        // Material
        MatButtonModule,
        MatIconModule,
        MatDialogModule,

        // Fuse modules
        FuseModule.forRoot(fuseConfig),
        FuseProgressBarModule,
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,

        // App modules
        LayoutModule,
        AppStoreModule,
        LoginModule,
        ConfirmDialogModule,
        MasterModule,
        ReportModule
    ],
    bootstrap: [AppComponent],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        AuthService
    ]
})
export class AppModule {}
