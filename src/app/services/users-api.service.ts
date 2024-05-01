// Import necessary modules
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl =
    'https://6061cac0ac47190017a71c0d.mockapi.io/api/Users/Persons';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<any>(this.baseUrl);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<any>(this.baseUrl, user);
  }

  updateUser(userId: number, user: User): Observable<User> {
    const url = `${this.baseUrl}/${userId}`;
    return this.http.put<any>(url, user);
  }

  getUser(userId: number): Observable<User> {
    const url = `${this.baseUrl}/${userId}`;
    return this.http.get<any>(url);
  }
}
