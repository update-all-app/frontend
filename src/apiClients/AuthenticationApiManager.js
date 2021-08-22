import ApiManager from "./ApiManager";

export default class AuthenticationApiManager extends ApiManager{

    static async login(email, password) {
        return await this.post("/login", {
        user: {
            email,
            password
        }
        });
    }

    static async signup(
        firstName,
        lastName,
        email,
        password,
        passwordConfirmation
    ) {
        return await this.post("/signup", {
        user: {
            name: `${firstName} ${lastName}`,
            email,
            password,
            password_confirmation: passwordConfirmation
        }
        });
    }

} 