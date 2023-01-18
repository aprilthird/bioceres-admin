export class Constants {
    static baseApiUrl: String = 'http://localhost:3000';

    static apiLoginUrl: String = this.baseApiUrl + '/login';
    static apiUsersUrl: String = this.baseApiUrl + '/users';

    static defaultPassword: String = '123456';

    static spanishLocale: String = 'es';
    static englishLocale: String = 'en-US';
}