import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from "@angular/router";
import { AuthService } from '../../core/auth/services/auth.service';
import { json } from 'stream/consumers';

@Component({
  selector: 'app-login',
  imports: [RouterLink , ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);
private readonly authService = inject(AuthService);
private readonly router = inject(Router);


loginForm : FormGroup = this.fb.group({
  email: ["" , [Validators.required ,  Validators.email] ] ,
  password: ["" , [Validators.required , Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)] ] ,
}  );




confirmPassword(group:AbstractControl){
const password = group.get('password')?.value;
const repassword = group.get('repassword')?.value;

if(repassword !== password && repassword !== ""){
group.get('repassword')?.setErrors({mismatch:true})

return {mismatch:true}
}
return null;
}




submitForm():void{
 if(this.loginForm.valid){
  console.log(this.loginForm.value);
  this.authService.signIn(this.loginForm.value).subscribe({
    next:(res)=>{
      console.log(res);

      if(res.message === 'success'){
        localStorage.setItem('freshToken' , res.token);
        localStorage.setItem('freshUser' , JSON.stringify(res.user));

        this.authService.isLogged.set(true);
        console.log(this.authService.isLogged.set(true));

        this.router.navigate(['/']);
      }
    },
    
  })


 }
 else{
  this.loginForm.markAllAsTouched();
 }
}
}
