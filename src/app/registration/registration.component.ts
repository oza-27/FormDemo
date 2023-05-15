import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  exform: FormGroup;
  submiting:boolean=false;
  constructor(public router:Router, public fb:FormBuilder) { }
  ngOnInit(): void {
    this.exform = this.fb.group({
      name: [null, Validators.required],
      email: [null, [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      username: [null, [Validators.required, Validators.pattern('^[a-zA-Z0-9]+$')]],
      phone: [null, [Validators.required, Validators.pattern('^[0-9]*$')]],
      password: [null, [Validators.required, Validators.minLength(8)]],
      conpassword: [null, [Validators.required, this.validateConfirmPassword.bind(this), Validators.minLength(8)]]
    });
  }

  validateConfirmPassword(control: FormControl): ValidationErrors | null {
    let password = this.exform?.get('password')?.value;
    let confirmPassword = control.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  clicksub(){

    this.submiting = true;
    if(this.exform.invalid){
      return;
    } 
    else
    {
      console.log(this.exform.value);
      this.submiting = false;
      this.router.navigate(["login"]);
    }
  }
  
  get getAllValidation(){
    return this.exform.controls;
  }
}
