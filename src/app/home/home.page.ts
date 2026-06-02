import { Component, AfterViewInit } from '@angular/core';
import { WeatherService } from '../services/bitcoins.service';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements AfterViewInit {

  constructor(private weatherService: WeatherService) {}

  ngAfterViewInit() {
    console.log('Consumiendo CoinGecko API (Criptomonedas)...');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    this.weatherService.getTopCryptos().subscribe({
      next: (data: any) => {
        console.log('TOP 10 CRIPTOMONEDAS (por Capitalización de Mercado):');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        
        data.forEach((crypto: any, index: number) => {
          const marketCap = crypto.market_cap;
          let marketCapFormatted = '';
          if (marketCap >= 1e12) {
            marketCapFormatted = `$${(marketCap / 1e12).toFixed(2)}T`;
          } else if (marketCap >= 1e9) {
            marketCapFormatted = `$${(marketCap / 1e9).toFixed(2)}B`;
          } else if (marketCap >= 1e6) {
            marketCapFormatted = `$${(marketCap / 1e6).toFixed(2)}M`;
          }
          
          console.log(`${index + 1}.${crypto.name} (${crypto.symbol.toUpperCase()})`);
          console.log(`Precio: $${crypto.current_price.toLocaleString('en-US')} USD`);
          console.log(`Cambio 24h: ${crypto.price_change_percentage_24h?.toFixed(2)}% ${crypto.price_change_percentage_24h >= 0 ? '⬆' : '⬇'}`);
          console.log(`Capitalización: ${marketCapFormatted}`);
          console.log(`Volumen 24h: $${(crypto.total_volume / 1e6).toFixed(0)}M`);
          console.log(`Logo: ${crypto.image}`);
          console.log('---');
        });
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      },
      error: (err: any) => {
        console.error('Error al obtener top criptomonedas:', err.status);
        if (err.status === 429) {
          console.error('Demasiadas peticiones. Espera unos segundos y reintenta.');
        }
      }
    });

    setTimeout(() => {
      this.weatherService.getPrecioCrypto('bitcoin').subscribe({
        next: (data: any) => {
          console.log('\nPRECIO DE BITCOIN (BTC) EN DIFERENTES MONEDAS:');
          console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
          console.log(`Bitcoin (BTC) → $${data.bitcoin?.usd?.toLocaleString() || 'N/A'} USD`);
          console.log(`Bitcoin (BTC) → €${data.bitcoin?.eur?.toLocaleString() || 'N/A'} EUR`);
          console.log(`Bitcoin (BTC) → $${data.bitcoin?.cop?.toLocaleString() || 'N/A'} COP`);
          console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        },
        error: (err: any) => {
          console.error('Error al obtener precio de Bitcoin:', err);
        }
      });
    }, 1000);

    setTimeout(() => {
      this.weatherService.getPreciosMultiples('bitcoin,ethereum,cardano,dogecoin,ripple').subscribe({
        next: (data: any) => {
          console.log('\nPRECIOS EN USD:');
          console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
          const cryptos = ['bitcoin', 'ethereum', 'cardano', 'dogecoin', 'ripple'];
          cryptos.forEach(crypto => {
            if (data[crypto]) {
              console.log(`${crypto.toUpperCase()}: $${data[crypto].usd?.toLocaleString() || 'N/A'} USD`);
            }
          });
          console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        },
        error: (err: any) => {
          console.error('Error:', err);
        }
      });
    }, 2000);

  }
}