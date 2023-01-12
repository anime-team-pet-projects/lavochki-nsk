import {Button, Checkbox, Table, TableBody, TableCell, TableHead, TableRow} from '@mui/material'
import React, {ChangeEvent, FC, ReactElement, MouseEvent, useState, useEffect} from 'react'
import {BenchType} from "@/types/bench.type";

interface IProps {
    benches: BenchType[]
    updateDialogToggle: () => void
    detailBenchDrawerVisible: () => void
    getBenchById: (id: string) => void
}

const BenchesTable: FC<IProps> = ({ benches, updateDialogToggle, detailBenchDrawerVisible, getBenchById }): ReactElement => {
    const [selected, setSelected] = useState<readonly string[]>([]);
    const isSelected = (id: string) => selected.indexOf(id) !== -1;

    const handleRowSelect = (event: MouseEvent<HTMLElement>, id: string): void => {
        event.stopPropagation()

        const selectedIndex = selected.indexOf(id);
        let newSelected: readonly string[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id)
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            )
        }

        setSelected(newSelected)
    }

    const handleSelectAllClick = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelected = benches.map(({id}) => id);

            setSelected(newSelected);

            return;
        }

        setSelected([]);
    }

    const handleUpdateDialogOpen = (event: MouseEvent<HTMLButtonElement>): void => {
        event.stopPropagation()

        updateDialogToggle()
    }

    const handleDetailBenchToggle = (id: string): void => {
        detailBenchDrawerVisible()

        getBenchById(id)
    }

    return (
        <div className={'w-100'}>
            <Table sx={{ minWidth: 650 }} aria-label='posts table'>
                <TableHead>
                    <TableRow>
                        <TableCell padding="checkbox">
                            <Checkbox
                                color="primary"
                                indeterminate={selected.length > 0 && selected.length < benches.length}
                                checked={benches.length > 0 && selected.length === benches.length}
                                onChange={handleSelectAllClick}
                                inputProps={{
                                    'aria-label': 'select all benches',
                                }}
                            />
                        </TableCell>
                        <TableCell align='left'>ID</TableCell>
                        <TableCell align='left'>Расположение</TableCell>
                        <TableCell align='left'>ID владельца</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        benches &&
                        benches.map((bench) => {
                            const isItemSelected = isSelected(bench.id);
                            const labelId = `enhanced-table-checkbox-${bench.id}`;

                            return (
                                <TableRow
                                    key={bench.id}
                                    selected={isItemSelected}
                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                    onClick={handleDetailBenchToggle.bind(null, bench.id)}
                                >
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            color="primary"
                                            checked={isItemSelected}
                                            inputProps={{
                                                'aria-labelledby': labelId,
                                            }}
                                            onClick={(event) => handleRowSelect(event, bench.id)}
                                        />
                                    </TableCell>
                                    <TableCell component='th' scope='row'>
                                        {
                                            isItemSelected ? <Button onClick={handleUpdateDialogOpen}>Изменить</Button> : bench.id
                                        }
                                    </TableCell>
                                    <TableCell>
                                        {
                                            isItemSelected
                                                ? <Button>Удалить</Button>
                                                :  `${bench.lat}, ${bench.lng}`
                                        }
                                    </TableCell>
                                    <TableCell>
                                        {bench.owner}
                                    </TableCell>
                                </TableRow>
                            )
                        })
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default BenchesTable
