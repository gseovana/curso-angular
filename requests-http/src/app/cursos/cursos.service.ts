import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Curso } from './curso';
import { delay, take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  private readonly API = 'http://localhost:3000/cursos';

  constructor(private http: HttpClient) { }

  list(){
    return this.http.get<Curso[]>(this.API)
      .pipe(
        delay(2000),
        tap(console.log)
      );
  }

  loadById(id: number) {
    return this.http.get<Curso>(`http://localhost:3000/cursos/${id}`).pipe(take(1));
  }

  private create(curso: Curso){
    return this.http.post('http://localhost:3000/cursos', curso).pipe(take(1));
  }

  private update(curso: Curso) {
    return this.http.put(`http://localhost:3000/cursos/${curso.id}`, curso).pipe(take(1));
  }

  save(curso: Curso) {
    if(curso.id) {
      return this.update(curso);
    }
    return this.create(curso);
  }

  remove(id: number){
    return this.http.delete(`http://localhost:3000/cursos/${id}`).pipe(take(1));
  }
}
