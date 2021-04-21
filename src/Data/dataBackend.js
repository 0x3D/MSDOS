import Axios from 'axios'


export default class dataBackend {


    insertToSql() {
        Axios.post('http://localhost:3002/api/insert', {
            pname: "Filip",
            appNr: "16"
        }).then(() => {
            alert("succes insert")
        })
    }

}