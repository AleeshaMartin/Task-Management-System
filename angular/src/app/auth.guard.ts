import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';


export const authGuard: CanActivateFn = (route, state) => {
  let router = inject(Router);
  
   let role = localStorage.getItem('role')
   if(localStorage.getItem('token') === null){
    router.navigateByUrl('login')
    return false;
  }
  else if(role === 'USER'){
    router.navigateByUrl('login')
    return false;
  }
  else{
    
    return true;
  }

  
};
