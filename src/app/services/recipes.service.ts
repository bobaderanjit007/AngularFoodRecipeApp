import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs/internal/Observable';
import { retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  constructor(private _http: HttpClient) { }

  getRecipe(recipeName:string):Observable<any>{
    return this._http.get(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${recipeName}`)
  }

  getRecipeWithId(mealId:number):Observable<any>{
    return this._http.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
  }

}
