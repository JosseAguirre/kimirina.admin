import { Routes } from '@angular/router';

import { NgbdCarouselBasicComponent } from './carousel/carousel.component';
import { NgbdModalBasicComponent } from './modal/modal.component';
import { NgbdtypeheadBasicComponent } from './typehead/typehead.component';
import { ButtonsComponent } from './buttons/buttons.component';
import { CardsComponent } from './card/card.component';
import { UserComponent } from './user/user.component';
import { ProductComponent } from './product/product.component';
import { NewsComponent } from './news/news.component';
import { FormComponent } from './form/form.component';

export const ComponentsRoutes: Routes = [
	{
		path: '',
		children: [
			{
				path: 'cards',
				component: CardsComponent,
				data: {
					title: 'Cards',
					urls: [
						{ title: 'Dashboard', url: '/dashboard' },
						{ title: 'ngComponent' },
						{ title: 'Cards' }
					]
				}
			},
			{
				path: 'carousel',
				component: NgbdCarouselBasicComponent,
				data: {
					title: 'Carousel',
					urls: [
						{ title: 'Dashboard', url: '/dashboard' },
						{ title: 'ngComponent' },
						{ title: 'Carousel' }
					]
				}
			},
			{
				path: 'modal',
				component: NgbdModalBasicComponent,
				data: {
					title: 'Modal',
					urls: [
						{ title: 'Dashboard', url: '/dashboard' },
						{ title: 'ngComponent' },
						{ title: 'Modal' }
					]
				}
			},
			{
				path: 'typehead',
				component: NgbdtypeheadBasicComponent,
				data: {
					title: 'Typehead',
					urls: [
						{ title: 'Dashboard', url: '/dashboard' },
						{ title: 'ngComponent' },
						{ title: 'Typehead' }
					]
				}
			},
			{
				path: 'buttons',
				component: ButtonsComponent,
				data: {
					title: 'Button',
					urls: [
						{ title: 'Dashboard', url: '/dashboard' },
						{ title: 'ngComponent' },
						{ title: 'Button' }
					]
				}
			},
			{
				path: 'users',
				component: UserComponent,
				data: {
					title: 'Usuarios',
				}
			},
			{
				path: 'products',
				component: ProductComponent,
				data: {
					title: 'Productos',
				}
			},
			{
				path: 'news',
				component: NewsComponent,
				data: {
					title: 'Noticias',
				}
			},
			{
				path: 'forms',
				component: FormComponent,
				data: {
					title: 'Encuestas',
				}
			}
		]
	}
];
