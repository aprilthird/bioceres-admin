export class User {
    id?: Number;
    username: String;
    email: String;
    phoneNumber: String;
    password: String;
    company: String;
    dni: String;
    cuit: String;
    role: String;
    birthLocation: String;
    birthdate: String;

    constructor(id?: Number, username: String = "", password: String = "", 
        email: String = "", phoneNumber: String = "", company: String = "",
        dni: String = "", cuit: String = "", role: String = "", birthLocation: String = "",
        birthDate: String = "") {
            this.id = id;
            this.username = username;
            this.password = password;
            this.email = email;
            this.phoneNumber = phoneNumber;
            this.company = company;
            this.dni = dni;
            this.cuit = cuit;
            this.role = role;
            this.birthLocation = birthLocation;
            this.birthdate = birthDate;
        }
    
    public parsedBirthDateString(): String {
        return Date.parse(this.birthdate as string).toLocaleString().toString();
    }
}