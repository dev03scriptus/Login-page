import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { AuthService } from '../auth.service' 
import { MustMatch } from '../_helper/must_match.validators'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  

  constructor( 
    private auth : AuthService, 
    private f : FormBuilder,
    ) { }

  
  registerForm = new FormGroup({
    fname : new FormControl('', [Validators.required]),
    lname: new FormControl ('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z0-9.!#$%&'*+\=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$")]),
    password: new FormControl('', [Validators.required, Validators.pattern("^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$")]),
    confPassword: new FormControl('',[Validators.required]),
    zip: new FormControl('', [Validators.required, Validators.pattern("^[0-9]{6}")]),
    term : new FormControl('', [Validators.required])
  });

  get fname(): AbstractControl | null { 
    return this.registerForm.get("fname");
  }
  get lname():AbstractControl | null{ 
    return this.registerForm.get("lname") 
  }
  get email():AbstractControl | null{ 
    return this.registerForm.get("email") 
  }
  get password():AbstractControl | null{ 
    return this.registerForm.get("password")
  }
  get confPassword():AbstractControl | null{ 
    return this.registerForm.get("confPassword")
  }
  get zip():AbstractControl | null{
     return this.registerForm.get("zip") 
    }
  get term():AbstractControl | null{ 
    return this.registerForm.get("term") 
  }  


  ngOnInit(): void {
  }

  register(){
    if(this.registerForm.valid){
      const localStorageData = localStorage.getItem('register')
      if(!localStorageData){
        localStorage.setItem('register',JSON.stringify([this.registerForm.value]))
      }
      else{
        const parseLocalStorageData = JSON.parse(localStorageData)
        parseLocalStorageData.push(this.registerForm.value)
        localStorage.setItem('register',JSON.stringify(parseLocalStorageData))
      }
    }
  }
}
