
import { Injectable } from "@angular/core";
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "../model/auth.service";

@Injectable()
export class AuthGuard{
    constructor(private router: Router,
    private authSvc: AuthService
    ){
        
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        if(!this.authSvc.authenticated){
            this.router.navigateByUrl("/admin/auth");

            return false;
        }

        return true;
    }
}