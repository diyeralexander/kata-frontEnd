import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:8080/tasks';

  constructor(private http: HttpClient) {}

  obtenerTareas(): Observable<any> {
    return this.http.get<any>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  adicionarTarea(task: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, task).pipe(
      catchError(this.handleError)
    );
  }

  editarTarea(id: string, task: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, task).pipe(
      catchError(this.handleError)
    );
  }

  eliminarTarea(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }



  private handleError(error: HttpErrorResponse) {
    if (error.status === 401 || error.status === 403) {
      alert('No tienes suficientes permisos para realizar esta acción.');
    } else {
      console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
    }
    return throwError('Algo salió mal; por favor, intenta nuevamente más tarde.');
  }
}