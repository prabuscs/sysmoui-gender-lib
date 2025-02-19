import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from '@angular/core';
import {
  ControlValueAccessor,
  FormBuilder,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SysmoGenderComponent } from './sysmo-gender.component';
import { CapitalizeFirstLetterPipe } from '../extras/capitalize-first-letter.pipe';
import { CustomStyleSheet } from './stylesheet.model';
import { Genders } from './gender.model';

@Component({
  selector: 'sysmoui-gender',
  templateUrl: './sysmoui-gender.component.html',
  imports: [IonicModule, FormsModule, CommonModule, ReactiveFormsModule, SysmoGenderComponent, CapitalizeFirstLetterPipe],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: SysmouiGenderComponent,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SysmouiGenderComponent implements OnInit, ControlValueAccessor {
  gender: string = '';
  titles: string[] = [];
  selectedTitle: string = '';
  // Input to custom styles for title
  @Input() titleStyleProps?: CustomStyleSheet;
  // Input to custom styles for gender
  @Input() genderStyleProps?: CustomStyleSheet;
  // Input for custom styles for options
  @Input() selectStyleProps?: CustomStyleSheet;
  // Input for array of an user objects with gender, icon and titles
  @Input() users: Array<Genders> = [
    { gender: 'Male', icon: '../gender_icons/male_icon.png', titles: ['Mr'] },
    { gender: 'Female', icon: '../gender_icons/female_icon.png', titles: ['Ms'] },
    {
      gender: 'Others',
      icon: '',
      titles: ['Others'],
    },
  ];

  onChange: (value: string) => void = () => {};
  onTouched: () => void = () => {};

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.gender = 'Male';
    this.titles = this.getAllTitles(this.users);
  }

  // Method returns the all users titles
  getAllTitles = (users: Array<Genders>) => {
    const allTitles = users.reduce<string[]>((acc, gender: Genders) => {
      return acc.concat(gender.titles || []);
    }, []);
    return [...new Set(allTitles)];
  };

  // Control Value Accessor methods
  writeValue(value: string): void {
    if (value != undefined) {
    }
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {}

  // Event handler to notify the parent component of title changes
  onTitleChanged(event: any): void {
    const value = event.target.value;
    this.selectedTitle = value;
    this.getGenderByTitle(value);
    this.onChange(value);
  }

  // Method for get the gender based on title
  getGenderByTitle(selectedTitle: string): void {
    const user = this.users.find((user) =>
      user?.titles.includes(selectedTitle)
    );
    this.gender = user ? user?.gender : 'others';
  }
}
