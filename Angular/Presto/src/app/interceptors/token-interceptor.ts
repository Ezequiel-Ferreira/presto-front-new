import { HttpHandler, HttpInterceptor, HttpRequest, HttpEvent } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "../authService/authservice.service";
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private auth: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.auth.loggedUser() !== null) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${this.auth.loggedUser().token}`
                }
            });
        }
        return next.handle(request);
    }
}