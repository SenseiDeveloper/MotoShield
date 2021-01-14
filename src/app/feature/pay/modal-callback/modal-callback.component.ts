import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-modal-callback',
  templateUrl: './modal-callback.component.html',
  styleUrls: ['./modal-callback.component.scss']
})
export class ModalCallbackComponent implements OnInit {

  @Input() mes;

  constructor() { }

  ngOnInit(): void {
  }

}
