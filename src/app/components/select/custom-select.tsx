import { FormControl, FormHelperText, InputLabel, MenuItem, Select, SelectProps } from "@mui/material";
import { ReactNode, forwardRef } from "react";

type CustomSelectProps = {
  lists: Array<{
    label: string;
    value: string | number;
  }>;
  helperText?: ReactNode | undefined;
} & SelectProps;

const CustomSelect = forwardRef((props: CustomSelectProps, ref) => {
  const { lists, label, error, helperText, required, sx, ...rest } = props;
  return (
    <FormControl error={error}>
      {label && <InputLabel required={required}>{label}</InputLabel>}
      <Select ref={ref} label={label} variant="standard" sx={{ minWidth: { xs: 200, md: 250 }, ...sx }} {...rest}>
        {lists.map(({ label, value }, i) => (
          <MenuItem sx={{ p: 1 }} value={value} key={i}>
            {label}
          </MenuItem>
        ))}
      </Select>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
});

export default CustomSelect;
