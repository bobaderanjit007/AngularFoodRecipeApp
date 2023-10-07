import { Component } from '@angular/core';
import { RecipesService } from './services/recipes.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private _recipeService: RecipesService,
    private sanitizer: DomSanitizer) {
    this.getRecipeByName('');
  }

  searchInput: string = '';
  showRecipe = false;
  recipes: any;
  myRecipe: any;
  Ingredients: string[] = [];

  loadingImageSrc: SafeResourceUrl = 'https://www.themealdb.com/images/media/meals/adxcbq1619787919.jpg'
  isLoading: boolean = false;

  vidCode: SafeResourceUrl = '';

  showIngredients: boolean = false;
  mealNotFound:boolean = false;

  getRecipeByName(recipeName: string) {

    this._recipeService.getRecipe(recipeName).subscribe({
      next: (response: any) => {
        this.recipes = response;
        console.log(response);
        if(response.meals == null){
          this.mealNotFound = true;          
        }else{
          this.mealNotFound = false;
        }
        
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  getRecipeById(mealId: number, showRecipe: boolean) {
    this._recipeService.getRecipeWithId(mealId).subscribe({
      next: (response: any) => {
        console.log(response);
        this.myRecipe = response;
        this.vidCode = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + this.myRecipe.meals[0].strYoutube.trim().slice(-11));
        console.log(this.vidCode);

        for (let i = 1; i <= 20; i++) {
          const ingredient = this.myRecipe.meals[0][`strIngredient${i}`];
          if (ingredient !== null && ingredient.trim() !== "") {
            this.Ingredients.push(ingredient);
            // console.log(ingredient);
          }
        }
        console.log(this.Ingredients);
      },
      error: (err: any) => {
        console.log(err);
      }
    })
    this.showRecipe = showRecipe;





    // if (ingredient !== null && ingredient.trim() !== "") {
    //     Ingredients.push(ingredient);
    // }
    // }

  }

  closeRecipe(close: boolean) {
    this.showRecipe = close;
  }

  // showClass(){
  //   this.showIngredients != this.showIngredients;
  // }

}
