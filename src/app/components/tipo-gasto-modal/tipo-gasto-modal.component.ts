import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TipoGasto } from '../../core/models/gasto.model';
import { GastoService } from '../../core/services/gasto.service';

@Component({
  selector: 'app-tipo-gasto-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tipo-gasto-modal.component.html',
  styleUrl: './tipo-gasto-modal.component.css'
})
export class TipoGastoModalComponent {
  @Output() close = new EventEmitter<void>();
  
  tipoGasto: TipoGasto = { nombre: '', grupo: 'Seleccione', tipo: 'Seleccione' };

  constructor(private api: GastoService) {}

  guardar() {
    this.api.crearTipoGasto(this.tipoGasto).subscribe(() => {
      this.close.emit();
    });
  }
}
