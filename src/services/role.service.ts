import { authRepository } from "./auth.repository";

class RoleService{
    private readonly baseUrl = 'http://192.168.1.64:3030/roles';

    private async getHeaders(){
        const logged = await authRepository.getLoggedUser();               
        if(!logged) return null;

        return {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${logged.token}`
        };
    }
    
    public async create (name: string, description: string){
        const logged = await authRepository.getLoggedUser();
        const header = await this.getHeaders();

        if(logged){
            const response = await fetch(`${this.baseUrl}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${logged.token}`
                },
                body: JSON.stringify({ name, description })
            });

            if(response.status === 400) return 'Role já existe';
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

    public async update (id: number, name: string){
        const logged = await authRepository.getLoggedUser();
        if(logged){
            const response = await fetch(`${this.baseUrl}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${logged.token}`
                },
                body: JSON.stringify({ name })
            });
            
            if(response.status === 401) return null; 
            return response.ok;
        }
        return null
    }

}

export const roleService = new RoleService()