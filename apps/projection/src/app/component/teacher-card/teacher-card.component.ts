import { Component, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { CardType } from '../../model/card.model';
import { Teacher } from '../../model/teacher.model';
import { CardComponent } from '../../ui/card/card.component';
import { TemplateDirective } from '../../directives/template.directive';

@Component({
  selector: 'app-teacher-card',
  template: `<app-card
    [list]="teachers"
    imageUrl="assets/img/teacher.png"
    (addNewItem)="onAddNewItem()"
    (deleteItem)="onDeleteItem($event)">
    <ng-template #itemTemplate let-item>
      {{ item.firstname }}
    </ng-template>
  </app-card>`,
  styles: [
    `
      ::ng-deep .bg-light-red {
        background-color: rgba(250, 0, 0, 0.1);
      }
    `,
  ],
  standalone: true,
  imports: [CardComponent, TemplateDirective],
})
export class TeacherCardComponent implements OnInit {
  teachers: Teacher[] = [];
  cardType = CardType.TEACHER;

  constructor(private http: FakeHttpService, private store: TeacherStore) {}

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));

    this.store.teachers$.subscribe((t) => {
      this.teachers = t;
      console.log(this.teachers);
    });
  }

  onAddNewItem() {
    this.store.addOne(randTeacher());
  }

  onDeleteItem(id: number) {
    this.store.deleteOne(id);
  }
}
