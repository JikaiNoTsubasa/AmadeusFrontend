import { HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "../Models/User";

export function provideAuthInterceptor(req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> {
    const authUser = JSON.parse(sessionStorage.getItem('authUser') ?? '{}') as User;
    if (authUser.id) {
        req = req.clone({
            setHeaders: {
                "userId": authUser.id.toString()
            }
        });
    }
    
    return next(req);
}