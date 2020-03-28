import {Injectable} from '@angular/core';
import {User} from "../model/model.user";
import 'rxjs/add/operator/map';
import {AppComponent} from "../app.component";
import {HttpClient} from "@angular/common/http";
import {Point} from "../model/model.point";
import {packParams} from "../utils/packParams";

@Injectable()
export class UserService {
  constructor(public http: HttpClient) { }

  public getGames(){
    return this.http.get(AppComponent.API_URL+'/api/v1/user/get/games',{ headers: { 'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' +  localStorage.getItem('userHash')}});
  }

  public getWins(){
    return this.http.get(AppComponent.API_URL+'/api/v1/user/get/wins',{ headers: { 'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' +  localStorage.getItem('userHash')}});
  }

  public getCommon(){
    return this.http.get(AppComponent.API_URL+'/api/v1/user/get/common',{ headers: { 'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' +  localStorage.getItem('userHash')}});
  }

  public getSecret(){
    return this.http.get(AppComponent.API_URL+'/api/v1/user/get/secret',{ headers: { 'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' +  localStorage.getItem('userHash')}});
  }

  public addGame(result: boolean) {
    return this.http.post(AppComponent.API_URL+'/api/v1/user/add/game',
      packParams({result: result ? 1 : 0}),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' +  localStorage.getItem('userHash')}});

  }

  public addCommon(index: number) {
    return this.http.post(AppComponent.API_URL+'/api/v1/user/add/common',
      packParams({index: index}),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' +  localStorage.getItem('userHash')}});

  }

  public addSecret(index: number) {
    return this.http.post(AppComponent.API_URL+'/api/v1/user/add/secret',
      packParams({index: index}),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' +  localStorage.getItem('userHash')}});

  }

}
