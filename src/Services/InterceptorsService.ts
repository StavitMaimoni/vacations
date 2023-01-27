import axios from "axios";
import { authStore } from "../Redux/AuthState";

class InterceptorsService {//Set up request headers with an authentication token if one exists. This allows for secure communication between the client and server.

    public createInterceptors(): void {
        
        axios.interceptors.request.use(request => {
            
            // If we have a token:
            if(authStore.getState().token) {

                // Create JWT header with that token:
                request.headers = {
                    authorization: "Bearer " + authStore.getState().token
                };

            }

            return request;

        });
    }

}

const interceptorsService = new InterceptorsService();

export default interceptorsService;
