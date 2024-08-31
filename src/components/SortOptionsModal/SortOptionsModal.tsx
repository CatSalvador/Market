import {Box, InputLabel, MenuItem, Modal, Select, SelectChangeEvent} from "@mui/material";
import React from "react";
import {SortTypes} from "../../constant/sortTypes.tsx";

interface SortOptionsModalProps {
    open: boolean
    setOpen: (boolean) => void
    sort: string
    setSort: (v: string) => void
}

export const SortOptionsModal: React.FC<SortOptionsModalProps> = ({open, setOpen, sort = '', setSort}) => {
    const [currentSort, setCurrentSort] = React.useState<string>(sort);

    const closeHandler = () => {
        setOpen(false)
        setSort(currentSort)
    }

    const handleChange = (event: SelectChangeEvent) => setCurrentSort(event.target.value as string);

    return (
        <div>
            <Modal
                open={open}
                onClose={closeHandler}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}
            >
                <Box sx={{backgroundColor: '#ffff', width: '200px', height: '120px', padding: '20px'}}>
                    <InputLabel id="sort-label">Сортировка</InputLabel>
                    <Select
                        labelId="sort-label"
                        id="demo-simple-select"
                        value={currentSort}
                        label="Тип сортировки"
                        onChange={handleChange}
                        sx={{width: '140px'}}
                    >
                        <MenuItem value={SortTypes.PRICE_ASC}>По цене - от дешевого</MenuItem>
                        <MenuItem value={SortTypes.PRICE_DESC}>По цене - от дорогого</MenuItem>
                        <MenuItem value={SortTypes.NAME_ACS}>По алфавиту (a-я)</MenuItem>
                        <MenuItem value={SortTypes.NAME_DESC}>По алфавиту (я-а)</MenuItem>
                    </Select>
                </Box>
            </Modal>
        </div>
    )
}