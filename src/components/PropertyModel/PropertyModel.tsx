import {
    Box,
    Checkbox,
    InputLabel,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText, MenuItem,
    Modal,
    Paper,
    Select, SelectChangeEvent
} from "@mui/material";
import {Button} from "../shared/Button/Button.tsx";
import React, {MouseEventHandler, useEffect, useState} from "react";
import {
    ProductVariationPropertiesFields,
    VariationsPropertyListValuesFields
} from "../shared/ProductCard/ProductCard.tsx";
import {SortTypes} from "../../constant/sortTypes.tsx";

interface PropertyModelProps {
    open: boolean
    setOpen: (boolean) => void
    variationsProperty: [ProductVariationPropertiesFields]
    variationsPropertyListValues: [VariationsPropertyListValuesFields]
    addProductToCart: (id: string) => void
}

export const PropertyModel: React.FC<PropertyModelProps> = (props) => {
    const {
        open,
        setOpen,
        variationsProperty,
        variationsPropertyListValues,
        addProductToCart,
    } = props
    const [value, setValue] = useState<string>('')

    const closedHandler = () => {
        setOpen(false)
        setValue('')
    }

    return (
        <Modal
            open={open}
            onClose={closedHandler}
            sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}
        >
            <Box sx={{backgroundColor: '#ffff', minHeight: '250px', height: 'content', width: '250px', justifyContent: 'center', display: 'grid'}}>
                { variationsProperty.length

                    ? variationsProperty.map((property) => {
                    return (
                        <Box key={property.id}
                             sx={{backgroundColor: '#ffff', width: '200px', height: '120px', padding: '20px'}}>
                            <InputLabel id={`${property.name}-label`}>{property.name}</InputLabel>
                            <Select
                                labelId={property.name}
                                value={value}
                                label={property.name}
                                onChange={(event: SelectChangeEvent) => setValue(event.target.value as string)}
                                sx={{width: '140px'}}
                            >
                                {variationsPropertyListValues
                                    .filter(value => value.product_variation_property_id === property.id)
                                    .map((item) => (
                                        <MenuItem key={item.id} value={item.id}>{item.value}</MenuItem>
                                    ))}
                            </Select>
                        </Box>
                    )
                })
                : <h3>Вариаций не обнаружено</h3>
                }
                <Button
                    name='Добавить'
                    variant="outlined"
                    onClick={() => {
                        addProductToCart(value)
                        closedHandler()
                    }}/>
            </Box>
        </Modal>
    )
}