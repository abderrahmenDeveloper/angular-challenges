import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import {
  Component,
  ContentChild,
  Input,
  Output,
  EventEmitter,
  OnInit,
  TemplateRef,
} from '@angular/core';
import { CardType } from '../../model/card.model';
import { TemplateDirective } from '../../directives/template.directive';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  standalone: true,
  imports: [NgIf, NgFor, NgTemplateOutlet],
})
export class CardComponent implements OnInit {
  @Input() customClass = '';
  @Input() list: any[] = [];
  @Input() imgSrc = '';
  @Input() itemTemplate!: TemplateRef<any>;

  @Output()
  addNewItem: EventEmitter<void> = new EventEmitter<void>();
  @Output() deleteItem: EventEmitter<number> = new EventEmitter<number>();

  CardType = CardType;

  constructor() {}

  ngOnInit(): void {
    console.log(this.itemTemplate);
  }
}
