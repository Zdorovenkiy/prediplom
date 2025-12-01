import { useNavigate } from "react-router";

export function useNavigation() {
    const navigate = useNavigate();

    return function navigateHandler(path: string) {
        navigate(path);
    }
}