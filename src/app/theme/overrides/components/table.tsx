import { Theme, alpha } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";
import { tableRowClasses } from "@mui/material/TableRow";

// ----------------------------------------------------------------------

export function table(theme: Theme) {
  return {
    MuiTableContainer: {
      styleOverrides: {
        root: {
          position: "relative",
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          [`&.${tableRowClasses.selected}`]: {
            backgroundColor: alpha(theme.palette.primary.dark, 0.04),
            "&:hover": {
              backgroundColor: alpha(theme.palette.primary.dark, 0.08),
            },
          },
          "&:last-of-type": {
            [`& .${tableCellClasses.root}`]: {
              borderColor: "transparent",
            },
          },
          "&:nth-of-type(odd)": {
            backgroundColor: theme.palette.primary.lighter,
          },
          "&:nth-of-type(even)": {
            backgroundColor: alpha(theme.palette.primary.lighter, 0.3),
          },
          "&:hover": {
            backgroundColor: alpha(theme.palette.secondary.lighter, 0.5),
            "& .StickyCell": {
              backgroundColor: "#f8ddcd",
            },
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottomStyle: "none",
        },
        head: {
          fontSize: 14,
          color: theme.palette.primary.contrastText,
          fontWeight: theme.typography.fontWeightSemiBold,
          backgroundColor: theme.palette.background.neutral,
        },
        body: {
          fontSize: 13,
        },
        stickyHeader: {
          backgroundColor: alpha(theme.palette.primary.main, 0.9),
        },
        paddingCheckbox: {
          paddingLeft: theme.spacing(1),
        },
      },
    },
    MuiTablePagination: {
      styleOverrides: {
        root: {
          width: "100%",
        },
        toolbar: {
          height: 64,
        },
        actions: {
          marginRight: 8,
        },
        select: {
          paddingLeft: 8,
          "&:focus": {
            borderRadius: theme.shape.borderRadius,
          },
        },
        selectIcon: {
          right: 4,
          width: 16,
          height: 16,
          top: "calc(50% - 8px)",
        },
      },
    },
  };
}
