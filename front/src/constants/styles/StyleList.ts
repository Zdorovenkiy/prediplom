import type { Theme } from "@emotion/react"
import { ColorsEnum } from "../colors/ColorsEnum"
import type { SxProps } from "@mui/material"

enum StyleListEnum {
    DEFAULT = 'default',
    CONTAINER = 'container'
}

export const StyleList: Record<StyleListEnum, SxProps<Theme>> = {
    [StyleListEnum.DEFAULT]: { bgcolor: ColorsEnum.SECONDARY_BG_DARK, width: "100%", maxHeight: "100px", height: "100%", display: "flex", justifyContent: "center"},
    [StyleListEnum.CONTAINER]: { maxWidth: "1200px", width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center"}
}