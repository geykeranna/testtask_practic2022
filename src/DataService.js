export class DataService {
    async getDataset(){
        try{
            const response = await fetch('https://reqres.in/api/users?page=2');
            const data = await response.json();
            return data.data || [];
        } catch (e){
            return undefined;
        }
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