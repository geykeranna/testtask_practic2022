export class DataService {
    getDataset(){
        return fetch('https://reqres.in/api/users?page=2')
            .then(res => res.json())
            .then(d => d.data);
    }

    async deleteDataset(id) {
        try {
            await fetch(`https://reqres.in/api/users/${id}`,{ method: 'DELETE' })
            return true;
        } catch (e) {
            return false;
        }
    }
}