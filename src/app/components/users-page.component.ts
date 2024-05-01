import { Component } from '@angular/core';
import { UserService } from '../services/users-api.service';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserQueneStatus, User } from '../models/user.model';

@Component({
  selector: 'users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.css'],
})
export class UsersPageComponent {
  activeUser$: Observable<User>;
  usersInLine$: Observable<User[]>;
  userNameInput = '';
  userUpdate = new BehaviorSubject(null);

  constructor(private userService: UserService) {
    this.observeUsers();
  }

  onNextClick(): void {
    this.activeUser$
      .pipe(
        take(1),
        switchMap((user: User) =>
          this.userService.updateUser(user.id as number, {
            ...user,
            Status: UserQueneStatus.inactive,
          })
        ),
        tap(() => this.userUpdate.next(null))
      )
      .subscribe();
  }

  onAddClick(): void {
    this.userService
      .createUser({
        FullName: this.userNameInput,
        dateTime: new Date().getTime(),
        Status: 0,
      })
      .pipe(
        take(1),
        tap(() => this.userUpdate.next(null)),
        tap(() => (this.userNameInput = ''))
      )
      .subscribe();
  }

  private observeUsers(): void {
    this.activeUser$ = this.userUpdate.asObservable().pipe(
      switchMap(() => this.userService.getUsers()),
      map((users: User[]) =>
        users.find((user) => user.Status == UserQueneStatus.active)
      )
    );
    this.usersInLine$ = this.userUpdate.asObservable().pipe(
      switchMap(() => this.userService.getUsers()),
      map((users: User[]) =>
        users.filter(
          (user: User) =>
            user.Status === UserQueneStatus.inLine ||
            (user.Status as string) === UserQueneStatus.inLine.toString()
        )
      )
    );
  }
}
