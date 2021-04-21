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
       Axios({
           method: 'get',
           url: 'http://localhost:3002/api/insert'
       }).then(res => console.log(res)).catch(err => console.log(err))
}
}