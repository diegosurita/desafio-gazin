import {Fragment, useState, useEffect} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {DataGrid, GridColDef} from '@material-ui/data-grid';
import {Edit, Visibility, Delete} from "@material-ui/icons";
import DeveloperService from "../src/frontend/service/developer";
import ClearAllIcon from '@material-ui/icons/ClearAll';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) => ({
    '@global': {
        ul: {
            margin: 0,
            padding: 0,
            listStyle: 'none',
        },
    },
    appBar: {
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
    toolbar: {
        flexWrap: 'wrap',
    },
    toolbarTitle: {
        flexGrow: 1,
    },
    link: {
        margin: theme.spacing(1, 1.5),
    },
    heroContent: {
        padding: theme.spacing(8, 0, 6),
    },
    actionButtons: {
        '& > *': {
            margin: theme.spacing(1),
        },
    }
}));

export default function Index() {
    let [developers, setDevelopers] = useState<Array<any>>([]),
        [loading, setLoading] = useState(true),
        content: any = '';

    const classes = useStyles(),
        columns: GridColDef[] = [
            {field: 'name', headerName: 'Nome', width: 300, align: 'center', headerAlign: 'center'},
            {field: 'sex', headerName: 'Sexo', width: 150, align: 'center', headerAlign: 'center'},
            {field: 'age', headerName: 'Idade', width: 150, align: 'center', headerAlign: 'center'},
            {field: 'hobby', headerName: 'Hobby', width: 150, align: 'center', headerAlign: 'center'},
            {field: 'birthDate', headerName: 'Data de Nascimento', width: 250, align: 'center', headerAlign: 'center'},
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

    useEffect(() => {
        const fetchAllDevelopers = async () => {
            const result = await DeveloperService.fetchAll();

            if (result.data.length > 0) {
                setDevelopers([]);

                result.data.forEach((developer: any) => {
                    const newDevelopers: Array<any> = [...developers, {
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
                    }];

                    setDevelopers(newDevelopers);
                    setLoading(false);
                });
            }
        }

        fetchAllDevelopers();
    }, []);

    if (!loading) {
        if (developers.length > 0) {
            content = (
                <Fragment>
                    <Button
                        variant='contained'
                        style={{marginBottom: '20px'}}
                        color='primary'
                    >
                        Novo
                    </Button>
                    <div style={{height: 500, width: '100%'}}>
                        <DataGrid rows={developers} columns={columns}/>
                    </div>
                </Fragment>
            );
        } else {
            content = (
                <Fragment>
                    <ClearAllIcon/>
                    <div>Nenhum desenvolvedor encontrado</div>
                </Fragment>
            );
        }
    } else {
        content = (
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <CircularProgress/>
            </div>
        );
    }

    return (
        <Fragment>
            <CssBaseline/>
            <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
                <Toolbar className={classes.toolbar}>
                    <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
                        Gazin Tech
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container maxWidth="lg" component="main" className={classes.heroContent}>
                {content}
            </Container>
        </Fragment>
    );
}
