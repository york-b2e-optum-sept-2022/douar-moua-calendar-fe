import { Injectable } from '@angular/core';
import {HttpService} from "./http.service";

@Injectable({
  providedIn: 'root'
})
export class InviteService {

  constructor(private httpService: HttpService) { }
}
