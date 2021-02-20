import axios from 'axios'

export default axios.create({
  baseURL: 'https://buildbarger-default-rtdb.europe-west1.firebasedatabase.app'
})