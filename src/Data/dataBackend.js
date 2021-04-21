import Axios from 'axios'


export default class dataBackend {


    insertToSql() {
        Axios.post('http://localhost:3002/api/insert', {
            appartmentNo: 45,
            email: "msdos@msdosen.com"
        }).then(() => {
            alert("succes insert")
        })
    }

}