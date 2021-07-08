import {Fragment, useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import {DataGrid, GridColDef} from '@material-ui/data-grid';
import {Edit, Visibility, Delete} from "@material-ui/icons";
import DeveloperService from "../src/frontend/service/developer";
import IconButton from '@material-ui/core/IconButton';
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import {Paper} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';

const initParams: any = {
    pagination: {
        page: 1,
        limit: 25
    }
};

const useStyles = makeStyles((theme) => ({
    wrap: {
        display: "flex",
        flexFlow: 'column'
    },
    newButton: {
        margin: '10px 0',
        alignSelf: 'flex-start'
    },
    searchBase: {
        marginTop: '30px',
        padding: '2px 4px',
        display: 'flex',
        alignSelf: 'center',
        width: 400,
    },
    inputSearch: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    actionButtons: {
        '& > *': {
            margin: theme.spacing(1),
        },
    }
}));

export default function Index(props: any) {
    let [developers, setDevelopers] = useState<Array<any>>([]),
        [listPage, setListPage] = useState(initParams.pagination.page),
        [listLimit, setListLimit] = useState(initParams.pagination.limit),
        [listTotal, setListTotal] = useState(0),
        [loading, setLoading] = useState<boolean>(true),
        [search, setSearch] = useState('');

    const classes = useStyles(),
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
                            <Tooltip title='Detalhes'>
                                <IconButton href={detailsUrl}>
                                    <Visibility fontSize='small'/>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title='Editar'>
                                <IconButton href={editUrl}>
                                    <Edit fontSize='small' color='primary'/>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title='Excluir'>
                                <IconButton onClick={() => console.log('deleting...')}>
                                    <Delete fontSize='small' color='error'/>
                                </IconButton>
                            </Tooltip>
                        </div>
                    );
                }
            },
        ];

    const loadDevelopersList = async (page?: number, limit?: number, search?: string) => {
        setDevelopers([]);
        setLoading(true);
        const {data, meta} = await DeveloperService.fetchAll(page, limit, search);

        setListPage(meta.page);
        setListLimit(meta.limit);
        setListTotal(meta.total);

        if (data.length > 0) {
            let developersList: any = [];

            data.forEach((developer: any) => {
                const birthdate: any = new Date(developer.birthdate);

                developersList.push({
                    id: developer.developer_id,
                    name: developer.name,
                    sex: developer.sex,
                    age: developer.age,
                    hobby: developer.hobby,
                    birthDate: `${(birthdate.getDate() + 1).toString().padStart(2, '0')}/${(birthdate.getMonth() + 1).toString().padStart(2, '0')}/${birthdate.getFullYear()}`,
                    actions: JSON.stringify({
                        detailsUrl: `/developer/${developer.developer_id}/details`,
                        editUrl: `/developer/${developer.developer_id}/edit`
                    })
                });
            });

            setDevelopers(developersList);
        } else {
            setDevelopers(data);
        }

        setLoading(false);
    }

    const onChangeSearch = (e: any) => {
        if (e.target.value !== '') {
            setSearch(e.target.value);
        } else {
            setListPage(initParams.pagination.page);
            setListLimit(initParams.pagination.limit);
            setSearch(e.target.value);
            loadDevelopersList(listPage, listLimit, e.target.value);
        }
    }

    useEffect(() => {
        loadDevelopersList();
    }, []);

    return (
        <div className={classes.wrap}>
            <Paper className={classes.searchBase}>
                <InputBase
                    className={classes.inputSearch}
                    placeholder="Pesquisar"
                    value={search}
                    onChange={onChangeSearch}
                />
                <IconButton
                    type="button"
                    className={classes.iconButton}
                    onClick={() => loadDevelopersList(listPage, listLimit, search)}
                >
                    <SearchIcon/>
                </IconButton>
            </Paper>
            <Button variant='contained' className={classes.newButton} color='primary' href='/developer/new'>
                Novo
            </Button>
            <div style={{width: '100%'}}>
                <DataGrid
                    paginationMode="server"
                    page={listPage - 1}
                    pageSize={listLimit}
                    rowCount={listTotal}
                    onPageChange={(param) => {
                        loadDevelopersList(param.page + 1, param.pageSize, search);
                    }}
                    onPageSizeChange={(param) => {
                        loadDevelopersList(param.page + 1, param.pageSize, search);
                    }}
                    rowsPerPageOptions={[5, 10, 25, 50, 100]}
                    rows={developers}
                    columns={columns}
                    loading={loading}
                    hideFooterSelectedRowCount={true}
                    autoHeight={true}
                />
            </div>
        </div>
    );
}
