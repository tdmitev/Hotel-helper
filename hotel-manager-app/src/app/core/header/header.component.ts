import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'src/app/types/menuItems';
import { MealItemService } from 'src/app/services/meal-item.service';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{

  dishes: MenuItem[] = [];

  constructor(@Inject(MealItemService) private mealItemService: MealItemService) { }

  ngOnInit(): void {

    const mealEventId = '65fab6da042d6284bb31009f';
    this.mealItemService.getDishes(mealEventId).subscribe(dishes => {
      this.dishes = dishes;
    });
  }

}