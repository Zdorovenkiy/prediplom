import { useNavigate } from "react-router";

export function useNavigation() {
    const navigate = useNavigate();

    return function navigateHandler(path: string, id?: string) {
        console.log("path", path, 'id', id);
        
        if (id) {
            navigate(path, {state: id});
        } else {
            navigate(path);
        }
    }
}