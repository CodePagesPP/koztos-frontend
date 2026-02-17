import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GastoService } from '../../core/services/gasto.service';
import { Gasto, TipoGasto } from '../../core/models/gasto.model';
import { TipoGastoModalComponent } from '../tipo-gasto-modal/tipo-gasto-modal.component';

@Component({
  selector: 'app-gasto-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, TipoGastoModalComponent],
  templateUrl: './gasto-modal.component.html',
  styleUrl: './gasto-modal.component.css'
})
export class GastoModalComponent {
  @Output() close = new EventEmitter<void>();
  
  tiposGasto: TipoGasto[] = [];
  showTipoGastoModal = false;

  gasto: Partial<Gasto> = {
    local: 'TRUJILLO',
    fechaEmision: new Date().toISOString().split('T')[0],
    condicion: 'Seleccione',
    gravable: 'NO',
    moneda: 'Seleccione'
  };

  constructor(private api: GastoService) {}

  ngOnInit() {
    this.cargarTiposGasto();
  }

  cargarTiposGasto() {
    this.api.getTiposGasto().subscribe({
      next: (res: TipoGasto[]) => {
        this.tiposGasto = res;
        console.log("Tipos de gasto cargados:", this.tiposGasto);
      },
      error: (err) => {
        console.error("Error al cargar los tipos de gasto", err);
        this.tiposGasto = [];
      }
    });
  }

  guardar() {
    this.api.crearGasto(this.gasto as Gasto).subscribe(() => {
      this.close.emit();
    });
  }

  abrirNuevoTipoGasto() {
    this.showTipoGastoModal = true;
  }

  cerrarTipoGastoModal() {
    this.showTipoGastoModal = false;
    this.cargarTiposGasto();
  }
}
