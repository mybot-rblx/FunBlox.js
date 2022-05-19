import tough from 'tough-cookie';
import { FileCookieStore } from 'tough-cookie-file-store';
const jar = new tough.CookieJar(new FileCookieStore('./.cookies'));

export default jar;
