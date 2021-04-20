import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service' 
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm = new FormGroup({
    fname : new FormControl('', [Validators.required]),
    lname: new FormControl ('', [Validators.required]),
    uname: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    state: new FormControl('',[Validators.required]),
    zip: new FormControl('', [Validators.required, Validators.pattern("^\d{6}$")]),
    term : new FormControl('', [Validators.required])
  });

  get fname():any{ return this.registerForm.get("fname") }
  get lname():any{ return this.registerForm.get("lname") }
  get uname():any{ return this.registerForm.get("uname") }
  get city():any{ return this.registerForm.get("city") }
  get state():any{ return this.registerForm.get("state") }
  get zip():any{ return this.registerForm.get("zip") }
  get term():any{ return this.registerForm.get("term") }

  constructor( private auth : AuthService ) { }

  ngOnInit(): void {
  }

  register(){
    if(this.registerForm.valid){
        this.auth.registerUser( JSON.stringify(this.registerForm.value))
    }
  }
}
