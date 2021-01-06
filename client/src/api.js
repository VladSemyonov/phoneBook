import axios from 'axios'

export default {
    numbers: {
        fetchAll: () => axios.get("/api/numbers").then(res => res.data.numbers),
        create: number => axios.post("/api/numbers", number).then(res => res.data.number),
        update: number => axios.put(`/api/numbers/${number._id}`, {number}).then(res => res.data.number),
        delete: number => axios.delete(`/api/numbers/${number._id}`),
    },
}
