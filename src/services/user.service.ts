import { authRepository } from "./auth.repository";

class UserService{
    private readonly baseUrl = 'http://192.168.1.69:3030/users';
    
    public async create (name: string, username: string, password: string){
        const logged = await authRepository.getLoggedUser();
        if(logged){
            const response = await fetch(`${this.baseUrl}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${logged.token}`
                },
                body: JSON.stringify({ name, username, password })
            });


                
            return response.ok;
        }        
        return null
    }
}

export const userService = new UserService()