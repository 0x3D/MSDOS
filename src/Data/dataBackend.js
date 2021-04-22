import Axios from 'axios'


export default class dataBackend {


    insertToUsers(inAppartmentNumber, inEmail) {
        Axios.post('http://localhost:3002/api/insert', {
            appartmentNo: inAppartmentNumber,
            email: inEmail
        }).then(() => {
            alert("succes insert")
        })
    }

    async getUsers() {
        let arr = []

        Axios({
            method: 'get',
            url: 'http://localhost:3002/api/get'
        }).then(res => {
            arr = res.data[0].json_agg;
            return arr
        }
        ).catch(err => console.log(err))

    }


    testtest() {
        Axios.get('http://localhost:3002/api/get')
            .then(response => {
                console.log(response.data);
                return response.data;
            })
            .catch(error => {
                console.log(error)
            });
    }

}