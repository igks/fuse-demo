import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { FuseConfigService } from "@fuse/services/config.service";
import { fuseAnimations } from "@fuse/animations";
import { AuthService } from "app/services/auth.service";
import { Router } from "@angular/router";
import { AlertService } from "app/services/alert.service";

@Component({
    selector: "login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;

    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private alert: AlertService
    ) {
        // Configure the layout
        this._fuseConfigService.config = {
            layout: {
                navbar: {
                    hidden: true,
                },
                toolbar: {
                    hidden: true,
                },
                footer: {
                    hidden: true,
                },
                sidepanel: {
                    hidden: true,
                },
            },
        };
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.loginForm = this._formBuilder.group({
            username: ["", Validators.required],
            password: ["", Validators.required],
        });
    }

    //Own function
    login() {
        this.alert.Success("Login Success", "");
        this.router.navigate(["/pages"]);

        // this.authService.login(this.loginForm.value).subscribe(
        //     next => {
        //         this.alert.Success("Login Success", "");
        //     },
        //     error => {
        //         this.alert.Error(error.statusText, "");
        //     },
        //     () => {
        //         this.router.navigate(["/apps"]);
        //     }
        // );
    }
}
