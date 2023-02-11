export class Constants {
    static baseApiUrl: String = 'http://localhost:3000';

    static apiLoginUrl: String = this.baseApiUrl + '/login';
    static apiUsersUrl: String = this.baseApiUrl + '/users';
    static apiAssembliesUrl: String = this.baseApiUrl+ '/assemblies';
    static apiBiddingsUrl: String = this.baseApiUrl+ '/biddings';
    static defaultPassword: String = '123456';

    static spanishLocale: String = 'es';
    static englishLocale: String = 'en-US';

    static dateFormats = {
        display: {
            dateInput: 'DD/MMM/YYYY'
        }
    };
}
