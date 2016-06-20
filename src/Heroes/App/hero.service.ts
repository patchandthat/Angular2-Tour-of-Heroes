import { Injectable } from "@angular/core";
import { Headers, Http } from "@angular/http";
import { Hero } from "./hero";

/*
    Nb. there's an issue in v0.4 the VS typescript service which may prevent the following import from resolving correctly
    A workaround is here: http://stackoverflow.com/questions/37030963/angular-2-2-0-0-rc-1-property-map-does-not-exist-on-type-observableresponse
    Overwrite your "C:\Program Files (x86)\Microsoft Visual Studio 14.0\Common7\IDE\CommonExtensions\Microsoft\TypeScript\typescriptServices.js"
    with the content here "https://raw.githubusercontent.com/Microsoft/TypeScript/Fix8518/lib/typescriptServices.js".
    There is a line "ts.servicesVersion = "0.5";" - change this to 0.4 to prevent VS failing an assertion when opening the project.
 */
import "rxjs/add/operator/toPromise";
//import "../node_modules/rxjs/add/operator/toPromise";

@Injectable()
export class HeroService {

    private heroesUrl = "app/heroes";  // URL to web api

    constructor(private http: Http) { }

    getHeroes(): Promise<Hero[]> {
        return this.http.get(this.heroesUrl)
            .toPromise()
            .then(response => response.json().data)
            .catch(this.handleError);
    }

    getHero(id: number) : Promise<Hero> {
        return this.getHeroes().then(
            heroes => heroes.filter(hero => hero.id === id)[0]
        );
    }

    save(hero: Hero): Promise<Hero> {
        if (hero.id) {
            return this.put(hero);
        }
        return this.post(hero);
    }

    delete(hero: Hero) {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");

        let url = `${this.heroesUrl}/${hero.id}`;

        return this.http
            .delete(url, headers)
            .toPromise()
            .catch(this.handleError);
    }

    // Add new Hero
    private post(hero: Hero): Promise<Hero> {
        let headers = new Headers({
            'Content-Type': "application/json"
        });

        return this.http
            .post(this.heroesUrl, JSON.stringify(hero), { headers: headers })
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    // Update existing Hero
    private put(hero: Hero) {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");

        let url = `${this.heroesUrl}/${hero.id}`;

        return this.http
            .put(url, JSON.stringify(hero), { headers: headers })
            .toPromise()
            .then(() => hero)
            .catch(this.handleError);
    }

    private handleError(error: any) {
        console.error("an error occurred", error);
        return Promise.reject(error.message || error);
    }
}