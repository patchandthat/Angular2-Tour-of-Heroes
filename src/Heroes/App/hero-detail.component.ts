import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { RouteParams } from '@angular/router-deprecated';

import { Hero } from "./hero";
import { HeroService } from './hero.service';


@Component({
    selector: "my-hero-detail",
    templateUrl: "app/hero-detail.component.html"
})

export class HeroDetailComponent implements OnInit {
    @Input() hero: Hero;
    @Output() close = new EventEmitter();
    error: any;
    navigated = false;

    constructor(
        private heroService: HeroService,
        private routeParams: RouteParams) {
    }

    ngOnInit() {
        if (this.routeParams.get('id') != null) {
            let id: number = +this.routeParams.get("id");
            this.navigated = true;
            this.heroService.getHero(id)
                .then(hero => this.hero = hero);
        } else {
            this.navigated = false;
            this.hero = new Hero();
        }
    }

    save() {
        this.heroService
            .save(this.hero)
            .then(hero => {
                this.hero = hero; // Updated hero with id populated
                this.goBack(hero);
            })
            .catch(error => this.error = error);
    }

    goBack(savedHero: Hero = null) {
        this.close.emit(savedHero);
        if (this.navigated) {
            window.history.back();
        }
    }
}