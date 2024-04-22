import { authRepository } from "./auth.repository";

class UserService{
    private readonly baseUrl = 'http://192.168.1.64:3030/users';

    private async getHeaders(){
        const logged = await authRepository.getLoggedUser();               
        if(!logged) return null;

        return {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${logged.token}`
        };
    }
    
    public async create (name: string, username: string, password: string, roles: string[]){
        const logged = await authRepository.getLoggedUser();
        const header = await this.getHeaders();

        if(logged){
            const response = await fetch(`${this.baseUrl}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${logged.token}`
                },
                body: JSON.stringify({ name, username, password, roles })
            });

            if(response.status === 400) return 'Usuário já existe';
            if(response.status === 401) return null; 
            return response.ok;
        }
        return null
    }

    public async get (){
        const logged = await authRepository.getLoggedUser();
        const header = await this.getHeaders();
        if(logged){
            const response = await fetch(`${this.baseUrl}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${logged.token}`
                }
            });

            if(response.status === 401) return null; 
            if(response.ok){
                return (await response.json()) as any[];
            }
        }        
        return null
    }

    public async getById (id: number){
        const logged = await authRepository.getLoggedUser();
        if(logged){
            const response = await fetch(`${this.baseUrl}/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${logged.token}`
                }                
            });

            if(response.status === 401) return null; 
            if(response.ok){
                return (await response.json());
            }
        }        
        return null
    }

    public async update (id: number, name: string, roles: string[]){
        const logged = await authRepository.getLoggedUser();
        if(logged){
            const response = await fetch(`${this.baseUrl}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${logged.token}`
                },
                body: JSON.stringify({ name, roles })
            });
            
            if(response.status === 401) return null; 
            return response.ok;
        }
        return null
    }

    public async remove (id: number){
        const logged = await authRepository.getLoggedUser();
        const token = logged ? logged.token : null;
        
        const response = await fetch(`${this.baseUrl}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${logged.token}`
            },
            body: JSON.stringify({ name })
        });
                   
        return response.ok;
    }
}

export const userService = new UserService()