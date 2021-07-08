import {Fragment, useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import {DataGrid, GridColDef} from '@material-ui/data-grid';
import {Edit, Visibility, Delete} from "@material-ui/icons";
import DeveloperService from "../src/frontend/service/developer";
import IconButton from '@material-ui/core/IconButton';

const paginationDefault: any = {
    page: 1,
    limit: 25
};

export default function Index(props: any) {
    let [developers, setDevelopers] = useState<Array<any>>([]),
        [metadataGrid, setMetadataGrid] = useState({
            page: paginationDefault.page,
            limit: paginationDefault.limit,
            total: 0
        }),
        [loading, setLoading] = useState<boolean>(true),
        [search, setSearch] = useState<string>('');

    const {classes} = props,
        columns: GridColDef[] = [
            {field: 'id', headerName: 'ID', width: 100, align: 'center', headerAlign: 'center'},
            {field: 'name', headerName: 'Nome', width: 250},
            {field: 'sex', headerName: 'Sexo', width: 120},
            {field: 'age', headerName: 'Idade', width: 120},
            {field: 'hobby', headerName: 'Hobby', width: 120},
            {field: 'birthDate', headerName: 'Data de Nascimento', width: 200, align: 'center', headerAlign: 'center'},
            {
                field: 'actions',
                headerName: 'Ações',
                width: 250,
                align: 'center',
                headerAlign: 'center',
                renderCell: (params: any) => {
                    const {detailsUrl, editUrl} = JSON.parse(params.value);

                    return (
                        <div className={classes.actionButtons}>
                            <IconButton aria-label="details" href={detailsUrl}>
                                <Visibility fontSize='small'/>
                            </IconButton>
                            <IconButton aria-label="edit" href={editUrl}>
                                <Edit fontSize='small' color='primary'/>
                            </IconButton>
                            <IconButton aria-label="delete" onClick={() => console.log('deleting...')}>
                                <Delete fontSize='small' color='error'/>
                            </IconButton>
                        </div>
                    );
                }
            },
        ];

    const loadDevelopersList = async (page?: number, limit?: number, search?: string) => {
        setDevelopers([]);
        setLoading(true);
        const {data, meta} = await DeveloperService.fetchAll(page, limit, search);

        if (data.length > 0) {
            let developersList: any = [];

            data.forEach((developer: any) => {
                developersList.push({
                    id: developer.developer_id,
                    name: developer.name,
                    sex: developer.sex,
                    age: developer.age,
                    hobby: developer.hobby,
                    birthDate: developer.birthDate,
                    actions: JSON.stringify({
                        detailsUrl: `/developer/${developer.developer_id}/details`,
                        editUrl: `/developer/${developer.developer_id}/edit`
                    })
                });
            });

            setDevelopers(developersList);
            setMetadataGrid(meta);
            setLoading(false);
        }
    }

    useEffect(() => {
        loadDevelopersList();
    }, []);

    const newButton: JSX.Element = (
        <Button
            variant='contained'
            style={{margin: '20px 0'}}
            color='primary'
            href={`/developer/new`}
        >
            Novo
        </Button>
    );

    return (
        <Fragment>
            {newButton}
            <div style={{height: 500, width: '100%'}}>
                <DataGrid
                    paginationMode="server"
                    page={metadataGrid.page - 1}
                    pageSize={metadataGrid.limit}
                    rowCount={metadataGrid.total}
                    onPageChange={(param) => {
                        loadDevelopersList(param.page + 1, param.pageSize, search);
                    }}
                    onPageSizeChange={(param) => {
                        loadDevelopersList(param.page + 1, param.pageSize, search);
                    }}
                    // rowsPerPageOptions={[5, 10, 25]}
                    rows={developers}
                    columns={columns}
                    loading={loading}
                    hideFooterSelectedRowCount={true}
                />
            </div>
        </Fragment>
    );
}
