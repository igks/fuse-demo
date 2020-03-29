import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { JwtHelperService } from "@auth0/angular-jwt";
import { environment } from "../../environments/environment";
@Injectable({
    providedIn: "root"
})
export class AuthService {
    baseUrl = environment.apiUrl + "auth/";
    jwtHelper = new JwtHelperService();
    decodedToken: any;
    users: any;

    constructor(private http: HttpClient) {}

    login(model: any) {
        return this.http.post(this.baseUrl + "login", model).pipe(
            map((response: any) => {
                const user = response;
                if (user) {
                    localStorage.setItem("token", user.token);
                    localStorage.setItem("id_user", user.user.id);
                    localStorage.setItem("isAdmin", user.user.adminStatus);
                    this.decodedToken = this.jwtHelper.decodeToken(user.token);
                    console.log("Login success");
                }
                console.log("Login fail");
            })
        );
    }

    test() {
        console.log("Test console");
    }

    loggedIn() {
        const token = localStorage.getItem("token") || undefined;
        return !this.jwtHelper.isTokenExpired(token);
    }
}
