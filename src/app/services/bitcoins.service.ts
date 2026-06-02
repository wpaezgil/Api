import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private baseUrl = 'https://api.coingecko.com/api/v3';

  constructor(private http: HttpClient) { }

  getTopCryptos(): Observable<any> {
    const url = `${this.baseUrl}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false`;
    return this.http.get(url);
  }

  getCryptoPorId(cryptoId: string): Observable<any> {
    const url = `${this.baseUrl}/coins/${cryptoId}`;
    return this.http.get(url);
  }

  getPrecioCrypto(cryptoId: string): Observable<any> {
    const url = `${this.baseUrl}/simple/price?ids=${cryptoId}&vs_currencies=usd,eur,cop`;
    return this.http.get(url);
  }

  getPreciosMultiples(cryptos: string): Observable<any> {
    const url = `${this.baseUrl}/simple/price?ids=${cryptos}&vs_currencies=usd,eur,cop`;
    return this.http.get(url);
  }

  getHistorial(cryptoId: string, days: number = 30): Observable<any> {
    const url = `${this.baseUrl}/coins/${cryptoId}/market_chart?vs_currency=usd&days=${days}`;
    return this.http.get(url);
  }
}