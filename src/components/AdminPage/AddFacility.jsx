import React from 'react'
import { DataGrid} from '@material-ui/data-grid';

export default function AddFacility() {

    const rows = [
        { id: 1, col1: 'Hello', col2: 'World' },
        { id: 2, col1: 'XGrid', col2: 'is Awesome' },
        { id: 3, col1: 'Material-UI', col2: 'is Amazing' },
    ];

    const columns = [
        { field: 'col1', headerName: 'Column 1', width: 150 },
        { field: 'col2', headerName: 'Column 2', width: 150 },
    ];



    return (
        <div className="AddFacility">
            <h2> testing a datafrid from material UI</h2>
            <DataGrid rows={rows} columns={columns} checkboxSelection/>
        </div>
    )
}

