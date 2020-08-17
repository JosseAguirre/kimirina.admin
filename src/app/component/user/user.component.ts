import { Component, OnInit } from '@angular/core';
import { User } from './../../models/user';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from '../toast/toast.service';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';


@Component({
  templateUrl: './user.component.html',
  providers: [UserService]
})
export class UserComponent implements OnInit {

  page = 1;
  pageSize = 10;
  filtertext: null;
  postForm: FormGroup;
  putForm: FormGroup;
  previewImage: string;
  submittedForm = false;
  passwordPattern = '(?=\\D*\\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,60}';
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';

  constructor(public userService: UserService, private modalService: NgbModal, private formBuilder: FormBuilder,
              public toastService: ToastService) { }

  ngOnInit(): void {
    this.filtertext = null;
    this.getUsers();

    this.postForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(this.passwordPattern)]],
      email: ['',  [Validators.required, Validators.pattern(this.emailPattern)]],
      name: ['', [Validators.required, Validators.minLength(6)]],
      age: ['', Validators.required],
      gender: ['', Validators.required],
      rol: ['', Validators.required],
      image: [null]
    });

    this.putForm = this.formBuilder.group({
      _id: [''],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(this.passwordPattern)]],
      email: ['',  [Validators.required, Validators.pattern(this.emailPattern)]],
      name: ['', [Validators.required, Validators.minLength(6)]],
      age: ['', Validators.required],
      gender: ['', Validators.required],
      rol: ['', Validators.required],
      image: [null]
    });
  }

  // Acceso a los controles de la form
  // Post Form
  get f() { return this.postForm.controls; }
  // Put Form
  get fp() { return this.putForm.controls; }

  uploadFile(event, accion: boolean) {
    const file = (event.target as HTMLInputElement).files[0];

    if (accion === true) {
      this.postForm.patchValue({
        image: file
      });
      this.postForm.get('image').updateValueAndValidity();
    } else {
      this.putForm.patchValue({
        image: file
      });
      this.putForm.get('image').updateValueAndValidity();
    }

    // File preview
    const reader = new FileReader();
    reader.onload = () => {
      this.previewImage = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  // Modales
  // This is for the first modal
  open1(content1: string) {
    this.modalService.open(content1, {ariaLabelledBy: 'modal-basic-title'}).result.then((_result) => {
      // this.closeResult = `Closed with: ${result}`;
    }, (_reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  getUsers() {
    this.userService.getUsers().subscribe(res => {
      this.userService.users = res['data'] as User[];
    });
  }

  postUser() {
    this.submittedForm = true;
    if (this.postForm.invalid) {
      return;
    } else {
      this.userService.postUser(
        this.postForm.value.password,
        this.postForm.value.email,
        this.postForm.value.name,
        this.postForm.value.age,
        this.postForm.value.gender,
        this.postForm.value.rol,
        this.postForm.value.image
      ).subscribe(res => {
        const resJson = JSON.stringify(res);
        const resObject = JSON.parse(resJson);
        // tslint:disable-next-line: no-string-literal
        if (resObject['status'] === 200) {
          this.getUsers();
          Swal.fire(
            'Muy Bien',
            'Se ha creado exitosamente',
            'success'
          );
          this.modalService.dismissAll();
        } else {
          // this.closeModal(true);
        }
      });
      // this.closeModal(true);
    }
  }

  putUser() {
    this.submittedForm = true;
    if (this.putForm.invalid) {
      return;
    } else {
      this.userService.putUser(
        this.putForm.value._id,
        this.putForm.value.password,
        this.putForm.value.email,
        this.putForm.value.name,
        this.putForm.value.age,
        this.putForm.value.gender,
        this.putForm.value.rol,
        this.putForm.value.image
      ).subscribe(res => {
        console.log(res);
        this.getUsers();
        location.reload();
      });
      Swal.fire(
        'Muy Bien',
          'Usuario actualizado exitosamente',
          'success'
        );
    }
  }

 // tslint:disable-next-line: variable-name
 softDelete(_id: string) {
  const env = { id: _id };

  Swal.fire({
    title: 'Estas seguro?',
    text: 'No podras revertir esta acción!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, eliminalo!',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.value) {
      this.userService.softDeleteUser(env).subscribe(res => {
        // tslint:disable-next-line: no-string-literal tslint:disable-next-line: triple-equals
        if (res['status'] == 200) {
          this.getUsers();
          Swal.fire(
            'Eliminado!',
            'El usuario ha sido eliminado.',
            'success'
          );
          } else {
            Swal.fire(
              'Error',
              'No se ha podido eliminar el usuario.',
              'error'
            );
          }
        });
      }
    });
  }

}