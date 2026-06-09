import { Component, AfterViewInit } from '@angular/core';
import { WeatherService } from '../services/bitcoins.service';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements AfterViewInit {

  cryptos: any[] = [];
  cryptoSeleccionado: any = null;
  modalAbierto: boolean = false;
  cargando: boolean = true;
  fechaActualizacion: Date = new Date();

  constructor(private weatherService: WeatherService) {}

  ngAfterViewInit() {
    this.cargarCriptomonedas();
  }

  cargarCriptomonedas() {
    this.cargando = true;
    
    this.weatherService.getTopCryptos().subscribe({
      next: (data: any) => {
        this.cryptos = data;
        this.fechaActualizacion = new Date();
        this.cargando = false;
        console.log('Criptomonedas cargadas:', this.cryptos.length);
      },
      error: (err: any) => {
        console.error('Error al cargar criptomonedas:', err);
        this.cargando = false;
      }
    });
  }

  verDetalle(crypto: any) {
    this.cryptoSeleccionado = crypto;
    this.modalAbierto = true;
    console.log('Detalle de:', crypto.name);
  }

  cerrarModal() {
    this.modalAbierto = false;
    this.cryptoSeleccionado = null;
  }

  formatMarketCap(marketCap: number): string {
    if (!marketCap) return 'N/A';
    if (marketCap >= 1e12) {
      return `$${(marketCap / 1e12).toFixed(2)}T`;
    } else if (marketCap >= 1e9) {
      return `$${(marketCap / 1e9).toFixed(2)}B`;
    } else if (marketCap >= 1e6) {
      return `$${(marketCap / 1e6).toFixed(2)}M`;
    }
    return `$${marketCap.toLocaleString()}`;
  }
}