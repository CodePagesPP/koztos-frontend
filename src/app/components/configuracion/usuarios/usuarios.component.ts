import { Component } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css',
})
export class UsuariosComponent {
  usuarios: any[] = [];
  filtroRol: string = 'ALL';
  showModal: boolean = false;
  userForm: FormGroup;
  isEditing: boolean = false;
  cargando: boolean = false;
  usuarioEditId: number | null = null;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
  ) {
    this.userForm = this.fb.group({
      dni: [
        '',
        [Validators.required, Validators.minLength(8), Validators.maxLength(8)],
      ],
      username: ['', Validators.required],
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      sex: ['M', Validators.required],
      password: ['', Validators.required],
      role: ['OPERATIVO', Validators.required],
    });
  }

  ngOnInit(): void {
    this.listarUsuarios();
  }

  listarUsuarios() {
    this.cargando = true;
    this.userService.getUsers(this.filtroRol).subscribe({
      next: (data) => {
        this.usuarios = data;
        this.cargando = false;
      },
      error: () => {
        this.cargando = false;
      },
    });
  }

  onFilterChange() {
    this.listarUsuarios();
  }

  abrirModalNuevo() {
    this.isEditing = false;
    this.userForm.reset({ sex: 'M', role: 'OPERATIVO' });
    this.showModal = true;
  }

  eliminarUsuario(id: number) {
  Swal.fire({
    title: '¿Estás seguro?',
    text: "Esta acción no se puede deshacer",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#dc3545',
    cancelButtonColor: '#6c757d',
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      this.userService.deleteUser(id).subscribe({
        next: () => {
          this.listarUsuarios();
          Swal.fire('Eliminado', 'El usuario ha sido borrado.', 'success');
        },
        error: () => Swal.fire('Error', 'No se pudo eliminar el usuario', 'error')
      });
    }
  });
}

  editarUsuario(user: any) {
    this.isEditing = true;
    this.usuarioEditId = user.id;
    this.showModal = true;

    this.userForm.patchValue({
      dni: user.dni,
      username: user.username,
      name: user.name,
      lastName: user.lastName,
      sex: user.sex,
      role: user.role,
      password: '',
    });

    this.userForm.get('password')?.clearValidators();
    this.userForm.get('password')?.updateValueAndValidity();
  }

  guardarUsuario() {
    if (this.userForm.invalid) return;

    const datos = this.userForm.value;

    const operacion = this.isEditing
      ? this.userService.updateUser(this.usuarioEditId!, datos)
      : this.userService.createUser(datos);

    operacion.subscribe({
      next: () => {
        this.listarUsuarios();
        this.cerrarModal();
        Swal.fire({
          title: '¡Logrado!',
          text: `Usuario ${this.isEditing ? 'actualizado' : 'creado'} correctamente`,
          icon: 'success',
          confirmButtonColor: '#00a8e8',
        });
      },
      error: (err) => {
        Swal.fire('Error', err.error?.message || 'Hubo un problema', 'error');
      },
    });
  }

  cerrarModal() {
    this.showModal = false;
  }
}
