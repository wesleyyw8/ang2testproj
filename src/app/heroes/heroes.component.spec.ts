import { HeroesComponent } from './heroes.component';
import {of} from 'rxjs';

describe('heroesComponent', () => {
  let component: HeroesComponent;
  let HEROES;
  let mockHeroService;

  beforeEach(() => {
    HEROES = [{
      id:1, name: 'SpiderDude', strength: 8
    },{
      id:2, name: 'Wonderful Woman', strength: 24
    },{
      id:3, name: 'SuperDude', strength: 25
    }];

    mockHeroService = jasmine.createSpyObj([
      'getHeroes', 'addHero', 'deleteHero'
     ])
    component = new HeroesComponent(mockHeroService);
  });
  describe('delete', () => {
    it('shoudl remove the indicated hero from the heores list', () => {
      mockHeroService.deleteHero.and.returnValue(of(true));
      component.heroes = HEROES;

      component.delete(HEROES[2]);
      expect(component.heroes.length).toBe(2);
      expect(component.heroes.map((heroes) => {
        return heroes.name;
      })).toEqual(['SpiderDude', 'Wonderful Woman']);
    });
    it('should call deleteHero', () => {
      mockHeroService.deleteHero.and.returnValue(of(true));
      component.heroes = HEROES;

      component.delete(HEROES[2]);
      expect(mockHeroService.deleteHero).toHaveBeenCalled();
      expect(mockHeroService.deleteHero).toHaveBeenCalledWith(HEROES[2]);
    })
  });

});
