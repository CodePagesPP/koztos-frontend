import { Component } from '@angular/core';
import { Gasto, Page } from '../../core/models/gasto.model';
import { GastoService } from '../../core/services/gasto.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GastoModalComponent } from '../gasto-modal/gasto-modal.component';

@Component({
  selector: 'app-gastos',
  standalone: true,
  imports: [CommonModule, FormsModule, GastoModalComponent],
  templateUrl: './gastos.component.html',
  styleUrl: './gastos.component.css'
})
export class GastosComponent {
  gastos: Gasto[] = [];
  totalElements = 0;
  
  filtroLocal = '';
  filtroMoneda = '';
  filtroFecha = '';
  busquedaGlobal = '';
  pageSize = 10;
  currentPage = 0;

  showGastoModal = false;

  constructor(private api: GastoService) {}

  ngOnInit() {
    this.cargarGastos();
  }

  cargarGastos() {
    const params = {
      local: this.filtroLocal,
      moneda: this.filtroMoneda,
      busqueda: this.busquedaGlobal,
      page: this.currentPage,
      size: this.pageSize
    };

    this.api.getGastos(params).subscribe({
      next: (res: any) => {
        
        this.gastos = res?.content || []; 
        this.totalElements = res?.totalElements || 0;
        console.log("Gastos cargados:", this.gastos);
      },
      error: (err) => {
        console.error("Error al cargar gastos:", err);
        this.gastos = []; 
      }
    });
  }

  abrirModalNuevo() {
    this.showGastoModal = true;
  }

  cerrarModal() {
    this.showGastoModal = false;
    this.cargarGastos(); 
  }

  cambiarPagina(direccion: number) {
    this.currentPage += direccion;
    this.cargarGastos();
  }
}
