import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return "Bienvenu sur l'API du calendrier de la gestion des cours de dance d'UrbanSection";
  }
}
