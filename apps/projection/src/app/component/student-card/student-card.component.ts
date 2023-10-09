import { Component, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randStudent,
} from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { CardType } from '../../model/card.model';
import { Student } from '../../model/student.model';
import { CardComponent } from '../../ui/card/card.component';
import { TemplateDirective } from '../../directives/template.directive';

@Component({
  selector: 'app-student-card',
  template: `<app-card
    [list]="students"
    imageUrl="assets/img/student.webp"
    (addNewItem)="onAddNewItem()"
    (deleteItem)="onDeleteItem($event)">
    <ng-template #itemTemplate let-item>
      {{ item.firstname }}
    </ng-template>
  </app-card>`,
  standalone: true,
  styles: [
    `
      ::ng-deep .bg-light-green {
        background-color: rgba(0, 250, 0, 0.1);
      }
    `,
  ],
  imports: [CardComponent, TemplateDirective],
})
export class StudentCardComponent implements OnInit {
  students: Student[] = [];
  cardType = CardType.STUDENT;
  imgSrcUrl = '';

  constructor(private http: FakeHttpService, private store: StudentStore) {}

  ngOnInit(): void {
    this.http.fetchStudents$.subscribe((s) => this.store.addAll(s));

    this.store.students$.subscribe((s) => (this.students = s));
  }

  onAddNewItem() {
    this.store.addOne(randStudent());
  }

  onDeleteItem(id: number) {
    this.store.deleteOne(id);
  }
}
