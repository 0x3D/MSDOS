// Backend 

import { localStorageAvailable } from "@material-ui/data-grid";

export default class LoginBackend {
    getLoginToken(apartment, password){
        // TODO: Json webtokens and/or Argon2 // Ask Erik B or Erik R
        return apartment + password;
    }

    basic_login(apartmentNo, password) {
        const token = this.getLoginToken(apartmentNo, password);
    
        // Save cookie if browser allows. 
        if (localStorageAvailable){
            localStorage.setItem('loginToken',token);
        }
        return true; 
    }

    authenticate_token(token) {
        if( token !== null && token.length > 1){
            return true
        } else {
            return false;
        }
    }


}