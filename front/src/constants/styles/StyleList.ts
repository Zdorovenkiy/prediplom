import type { Theme } from "@emotion/react"
import { ColorsEnum } from "../colors/ColorsEnum"
import type { SxProps } from "@mui/material"

enum StyleListEnum {
    DEFAULT = 'default',
    CONTAINER = 'container',
    PAGES = 'pages',
    PAGES_CONTAINER = 'pagesContainer',
    FORM = 'form',
}

export const StyleList: Record<StyleListEnum, SxProps<Theme>> = {
    [StyleListEnum.DEFAULT]: { bgcolor: ColorsEnum.SECONDARY_BG_DARK, width: "100%", maxHeight: "100px", height: "100%", display: "flex", justifyContent: "center"},
    [StyleListEnum.CONTAINER]: { maxWidth: "1200px", width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center"},
    [StyleListEnum.PAGES]:  { width: "100%", height: "100%", display: "flex", justifyContent: "center", position: 'relative', paddingBlock: "8px"},
    [StyleListEnum.PAGES_CONTAINER]: { maxWidth: "1200px", width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "column", gap: '20px'},
    [StyleListEnum.FORM]: { width: '500px', borderColor: ColorsEnum.SECONDARY_BG_DARK, borderWidth: '3px', borderStyle: 'solid', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '12px', padding: '12px'},
}