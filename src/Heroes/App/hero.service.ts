﻿import { Injectable } from "@angular/core";
import { Hero } from "./hero";
import { HEROES } from "./mock-heroes";

@Injectable()
export class HeroService {
    getHeroes(): Promise<Hero[]> {
        return new Promise<Hero[]>(
            resolve => setTimeout(() => resolve(HEROES), 400) // .4 Sec
        );
    }

    getHero(id: number) : Promise<Hero> {
        return Promise.resolve(HEROES).then(
            heroes => heroes.filter(hero => hero.id === id)[0]
        );
    }
}