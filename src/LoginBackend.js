// Backend 

import { localStorageAvailable } from "@material-ui/data-grid";
import Users from "./testData/users.json"

export default class LoginBackend {
    getLoginToken(apartment, password) {
        // TODO: Json webtokens and/or Argon2 // Ask Erik B or Erik R
        return apartment + password;
    }

    basic_login(apartmentNo, password) {
        const token = this.getLoginToken(apartmentNo, password);

        // Save cookie if browser allows. 
        if (localStorageAvailable) {
            localStorage.setItem('loginToken', token);
        }
        return true;
    }

    authenticate_token(token) {
        // TODO: make this pretty 
        let found = false;
        Users.map((user) => {
            console.log(user.password);
            console.log(token)
            console.log(user.password === token);
            if (user.password.valueOf() === token.valueOf()) {
                found = true; 
            }
        })
        return found;
        //if (token !== null && token.length > 1) {
        //    return true
        //} else {
        //    return false;
        //}
    }
}