import React, {useState} from "react";
import {IconButton, InputAdornment, TextField} from "@mui/material";
import {Search} from "../../../assets/icons/Search.tsx";

interface SearchInputProps extends  Omit<SearchInputProps, "onSearch" | "value">{
    value?: string;
    onSearch: () => void;
    restProps?: any ;
}

export const SearchInput: React.FC<SearchInputProps> = ({value = '', onSearch, ...restProps}) => {
    const [searchValue, setSearchValue] = useState<string>(value);
    const handleChange = (event) => setSearchValue(event.target.value);

    return (
        <TextField
            variant="outlined"
            value={searchValue}
            onChange={handleChange}
            sx={{
                width: '458px',
                minWidth: '250px',
                '& .MuiOutlinedInput-notchedOutline': {
                    borderRadius: '50px',
                },
                '& .MuiInputBase-root': {
                    height: '50px'
                },
                '& .MuiInputBase-input::placeholder': {
                    color: '#727280',
                    fontSize: '0.9em',
                    opacity: '1',
                },
            }}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton
                            edge="end"
                            onClick={onSearch}
                            sx={{
                                backgroundColor: '#F0F4FB',
                                borderRadius: '50px',
                                height: '42px',
                                width: '90px',
                                marginRight: '-10px'
                            }}
                            disableRipple
                        >
                            <Search/>
                        </IconButton>
                    </InputAdornment>
                ),
            }}
            {...restProps }
        />
    );
};