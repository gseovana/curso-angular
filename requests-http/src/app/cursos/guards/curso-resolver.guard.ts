import { ActivatedRouteSnapshot, CanActivateFn, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { Curso } from '../curso';
import { CursosService } from '../cursos.service';
import { Observable, of } from 'rxjs';
import { inject } from '@angular/core';

export const CursoResolverGuard: ResolveFn<Curso> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
  ): Observable<Curso> => {
    
    if(route.params && route.params['id']){
      const cursosService: CursosService = inject(CursosService);
      return cursosService.loadById(route.params['id']);
    }

    return of({
      id: null,
      nome: null
    });
};

