import { Injectable } from '@angular/core';
import { Geolocation, GeolocationPosition } from '@capacitor/geolocation';
import { Capacitor } from '@capacitor/core';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {
  constructor() {}

  public async getCurrentPosition(): Promise<GeolocationPosition | undefined> {
    if (!Capacitor.isPluginAvailable('Geolocation')) {
      throw new Error('Geolocation plugin not available.');
    }

    try {
      const position = await Geolocation.getCurrentPosition();
      return position;
    } catch (error) {
      console.log('Error getting current position:', error);
      return undefined;
    }
  }
}
