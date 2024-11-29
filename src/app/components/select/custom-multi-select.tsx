import { Box, Checkbox, Chip, CircularProgress, InputAdornment, ListItemText, MenuItem, Select } from "@mui/material";
import Fade from "../animate/Fade";

const ITEM_HEIGHT = 100;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

interface CustomMultiSelectProps {
  value: any;
  onChange: (any: any) => any;
  options: any[];
  loading?: boolean;
}

const CustomMultiSelect = ({ value, onChange, options, loading }: CustomMultiSelectProps) => {
  return (
    <Select
      multiple
      variant="standard"
      labelId="demo-multiple-checkbox-label"
      id="demo-multiple-checkbox"
      value={value}
      onChange={onChange}
      MenuProps={MenuProps}
      renderValue={(selected) => (
        <Fade duration={0.25}>
          <Box sx={{ py: 0.5, display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {selected.map((value: any) => (
              <Chip onDelete={() => {}} key={value} label={value} />
            ))}
          </Box>
        </Fade>
      )}
      sx={{ minHeight: 50 }}
      endAdornment={
        loading && (
          <InputAdornment position="end" sx={{ mx: 4 }}>
            <CircularProgress size={16} />
          </InputAdornment>
        )
      }
    >
      {options.map((option: any) => (
        <MenuItem key={option} value={option}>
          <Checkbox checked={value.indexOf(option) > -1} />
          <ListItemText primary={option} />
        </MenuItem>
      ))}
    </Select>
  );
};

export default CustomMultiSelect;
