import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";

@Injectable()
export class AlunosGuard{
    
    canActivateChild(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
        ): Observable <boolean> | boolean {
            
            if(state.url.includes('editar')){
               // alert('Usuário não autorizado para edição de alunos.')
                //return false;
            }
              return true;
        }
}