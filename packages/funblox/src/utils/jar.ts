import { CookieJar } from 'tough-cookie';
import { FileCookieStore } from 'tough-cookie-file-store';

const jar = new CookieJar(new FileCookieStore('./.cookies'));

export default jar;
