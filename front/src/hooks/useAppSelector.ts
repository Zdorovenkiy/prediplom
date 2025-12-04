import type { StateSchema } from "@/globalState/types/stateSchema";
import { useSelector, type TypedUseSelectorHook } from "react-redux";

export const useAppSelector: TypedUseSelectorHook<StateSchema> = useSelector;