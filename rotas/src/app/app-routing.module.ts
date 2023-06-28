import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { CursosGuard } from './guards/cursos.guard';
import { AlunosGuard } from './guards/alunos.guard';

/*import { CursosComponent } from './cursos/cursos.component';
import { CursoDetalheComponent } from './cursos/curso-detalhe/curso-detalhe.component';
import { CursoNaoEncontradoComponent } from './cursos/curso-nao-encontrado/curso-nao-encontrado.component';
*/
const appRoutes: Routes = [
  {
    path: 'cursos',
    loadChildren: () => import('./cursos/cursos.module').then(m => m.CursosModule),
    canActivate: [AuthGuard],
    canActivateChild: [CursosGuard]
  },
  {
    path: 'alunos',
    loadChildren: () => import('./alunos/alunos.module').then(m => m.AlunosModule),
    canActivate: [AuthGuard]//,
    //canActivateChild: [AlunosGuard]

  },
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent,
      canActivate: [AuthGuard]
  }
 
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
