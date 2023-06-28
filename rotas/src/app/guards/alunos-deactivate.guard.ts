import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AlunoFormComponent } from '../alunos/aluno-form/aluno-form.component';
import { Injectable } from '@angular/core';

@Injectable()
export class AlunosDeactivateGuard {

    canDeactivate(
        component: AlunoFormComponent,
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean>|Promise<boolean>|boolean {
        
        console.log('guarda de desativação');

        return component.podeMudarRota() ? component.podeMudarRota(): true;

        
    }
}