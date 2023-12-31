import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { switchMap, tap } from 'rxjs';

import { CountriesService } from '../../services/countries.service';
import { Country, Region, SmallCountry } from '../../interfaces/country.interfaces';

@Component({
  selector: 'selector-page',
  templateUrl: './selector-page.component.html',
})
export class SelectorPageComponent implements OnInit{

  public countriesByRegion: SmallCountry[] = []; 

  public myForm: FormGroup =  this.fb.group({
    region: ['', Validators.required],
    country: ['', Validators.required],
    borders: ['', Validators.required],
  })

  constructor(
    private fb:FormBuilder,
    private  countriesService: CountriesService,
  ){}

  ngOnInit(): void {
    this.onRegionChanged();
  }

  get regions():Region[]{
    return this.countriesService.regions;
  }

  onRegionChanged(){
    this.myForm.get('region')!.valueChanges
      .pipe(
        // tap( () =>  ),
        switchMap(region => this.countriesService.getCountryesByRegion(region)),
      )
      .subscribe( countries => this.countriesByRegion = countries)
  }

  

}
