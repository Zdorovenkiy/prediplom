import type { AppDispatch } from "@/globalState/types/AppDispatch";
import { useDispatch } from "react-redux";

export const useAppDispatch = () => useDispatch<AppDispatch>();