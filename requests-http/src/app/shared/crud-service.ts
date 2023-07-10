import { HttpClient } from "@angular/common/http";
import { delay, take, tap } from "rxjs/operators";

export class CrudService<T>{

    //fazer T sempre extender de uma clase com ID
    constructor(
        protected http: HttpClient,
        private API_URL: string
    ){}

    list(){
        return this.http.get<T[]>(this.API_URL)
          .pipe(
            delay(2000),
            tap(console.log)
          );
      }
    
      loadById(id: number) {
        return this.http.get<T>(`${this.API_URL}/${id}`).pipe(take(1));
      }
    
      private create(registro: T){
        return this.http.post('API_URL', registro).pipe(take(1));
      }
    
      private update(registro: T) {
        return this.http.put(`API_URL/${registro/*.id*/}`, registro).pipe(take(1));
      }
    
      save(registro: T) {
        if(registro/*.id*/) {
          return this.update(registro);
        }
        return this.create(registro);
      }
    
      remove(id: number){
        return this.http.delete(`API_URL/${id}`).pipe(take(1));
      }
}