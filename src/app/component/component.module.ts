import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ComponentsRoutes } from './component.routing';
import { NgbdCarouselBasicComponent } from './carousel/carousel.component';
import { NgbdModalBasicComponent } from './modal/modal.component';
import { NgbdtypeheadBasicComponent } from './typehead/typehead.component';
import { ButtonsComponent } from './buttons/buttons.component';
import { CardsComponent } from './card/card.component';
import { UserComponent } from './user/user.component';

import { FiltertablePipe } from '../pipes/filtertable.pipe';
import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';
import { ProductComponent } from './product/product.component';
import { NewsComponent } from './news/news.component';
import { FormComponent } from './form/form.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ComponentsRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgBootstrapFormValidationModule
  ],
  declarations: [
    NgbdCarouselBasicComponent,
    NgbdModalBasicComponent,
    NgbdtypeheadBasicComponent,
    ButtonsComponent,
    CardsComponent,
    FiltertablePipe,
    UserComponent,
    ProductComponent,
    NewsComponent,
    FormComponent
  ]
})
export class ComponentsModule {}
