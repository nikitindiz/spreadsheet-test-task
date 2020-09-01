import fakeData from './songs-fake-data';
import Song from '../interfaces/Song';

interface Response {
    json: () => Promise<Song[]>
}

export default {
    /**
     * Имитация fetch
     */
    getSongs: (): Promise<Response> => {
        return new Promise((res) => {
            setTimeout(() => {
                res({
                    json() {
                        return new Promise((resJson) => {
                            resJson(fakeData);
                        });
                    }
                });
            }, 2000);
        });
    }
};