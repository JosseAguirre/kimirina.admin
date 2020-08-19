import { Component, OnInit } from '@angular/core';
import { FormService } from '../../services/form.service';
import { Form } from '../../models/form';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
