import axios from 'axios';

export default class Developer {

    public static async fetchAll() {
        const developers: any = await axios.get(process.env.API_URL + '/developers');

        if (developers.status === 400) {
            alert(developers.error.message);
        }

        return developers.data;
    }

}
