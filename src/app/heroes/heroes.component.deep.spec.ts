import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HeroesComponent } from './heroes.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HeroService } from '../hero.service';
import {of} from 'rxjs';
import { Hero } from '../hero';
import { Component, Input } from '@angular/core';
import { By } from '@angular/platform-browser';
import { HeroComponent } from '../hero/hero.component';

describe('HeroesComponent (deep tests)', () => {
  let fixture: ComponentFixture<HeroesComponent>;
  let mockHeroService;
  let HEROES;


  beforeEach(() => {
    HEROES = [{
      id:1, name: 'SpiderDude', strength: 8
    },{
      id:2, name: 'Wonderful Woman', strength: 24
    },{
      id:3, name: 'SuperDude', strength: 25
    }];
    mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);

    TestBed.configureTestingModule({
      declarations: [
        HeroesComponent,
        HeroComponent
      ],
      providers: [{
        provide: HeroService, useValue: mockHeroService
      }],
      schemas: [NO_ERRORS_SCHEMA]
    })
    fixture = TestBed.createComponent(HeroesComponent);
  });

  it('should render each hero as HeroComponent', () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();

    const heroComponentsDEs = fixture.debugElement.queryAll(By.directive(HeroComponent));
    expect(heroComponentsDEs.length).toEqual(3);
    expect(heroComponentsDEs[0].componentInstance.hero.name).toEqual('SpiderDude');
  })
});
