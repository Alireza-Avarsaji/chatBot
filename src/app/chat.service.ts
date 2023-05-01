import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http: HttpClient) { }


  getResponse (message: string): Observable<any> {
    const body = {
      question: message
    }
    return this.http.post<any>('http://192.168.6.59:6001/test', body);
  }
}
