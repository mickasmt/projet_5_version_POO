const url = "http://localhost:3000/api/teddies";

class Product {
    async getTeddies() {
        try {
            let response = await fetch(url);
            let data = await response.json()
            return data;            
        } catch (error) {
            console.log(error);
        }
    }

    async getTeddyById(id) {
        try {
            let response = await fetch(url+"/"+id);
            let data = await response.json()
            return data;
        } catch (error) {
            console.log(error);
        }
    }
}