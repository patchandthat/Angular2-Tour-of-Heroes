import { Component, OnInit } from "@angular/core";
import { Hero } from "./hero";
import { HeroService } from "./hero.service";
import { Router } from "@angular/router-deprecated";

@
Component({
    selector: "my-heroes",
    templateUrl: "app/heroes.component.html",
    styleUrls: ["app/heroes.component.css"]
})
export class HeroesComponent implements OnInit {
    constructor(
        private router: Router,
        private heroService: HeroService) {
    }

    public heroes: Hero[];
    private getHeroes() {
        this.heroService.getHeroes()
            .then(heroes => this.heroes = heroes);
    }

    public selectedHero: Hero;
    public onSelect(hero: Hero) {
        this.selectedHero = hero;
    };

    ngOnInit() {
        this.getHeroes();
    }

    gotoDetail() {
        this.router.navigate(['HeroDetail', { id: this.selectedHero.id }]);
    }
}