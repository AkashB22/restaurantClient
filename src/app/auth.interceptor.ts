import {HttpInterceptor, HttpRequest, HttpHandler} from '@angular/common/http';
import {UserService} from './user.service';
import {Injectable} from '@angular/core';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {Observable, pipe} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor{
    constructor(private service: UserService, private router: Router){}
    intercept(req: HttpRequest<any>, next: HttpHandler){
        let token = this.service.getToken();
        if(req.headers.get('x-noauth')){
            return next.handle(req.clone());
        } else{
            //console.log(req.headers);
            let clonedReq = req.clone({
                headers : req.headers.set("Authorization", "Bearer " + token)
            });
            return next.handle(clonedReq).pipe(
                tap(
                    (event)=>{},
                    (err)=>{
                        if(err.error.auth == false){
                            this.router.navigateByUrl('/signin');
                        }
                    }
                )
            );
        }
        
    }
}