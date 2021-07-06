import {Fragment, useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {DataGrid, GridRowsProp, GridColDef, GridCellParams} from '@material-ui/data-grid';
import {Edit, Visibility, Delete} from "@material-ui/icons";

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
    },
}));

export default function Index() {
    const classes = useStyles();

    const rows: GridRowsProp = [
        {
            id: 1,
            name: 'Diego Surita',
            sex: 'M',
            age: 30,
            hobby: 'Baterista',
            birthDate: '20/06/1991',
            actions: JSON.stringify({
                detailsUrl: '/developer/details/1',
                editUrl: '/developer/edit/1',
                deleteUrl: '/developer/delete/1'
            })
        }
    ];

    const columns: GridColDef[] = [
        {field: 'name', headerName: 'Nome', width: 300, align: 'center', headerAlign: 'center'},
        {field: 'sex', headerName: 'Sexo', width: 150, align: 'center', headerAlign: 'center'},
        {field: 'age', headerName: 'Idade', width: 150, align: 'center', headerAlign: 'center'},
        {field: 'hobby', headerName: 'Hobby', width: 150, align: 'center', headerAlign: 'center'},
        {field: 'birthDate', headerName: 'Data de Nascimento', width: 200, align: 'center', headerAlign: 'center'},
        {
            field: 'actions',
            headerName: 'Ações',
            width: 300,
            align: 'center',
            headerAlign: 'center',
            renderCell: (params: GridCellParams | any) => {
                const {detailsUrl, editUrl, deleteUrl} = JSON.parse(params.value);

                return (
                    <div className={classes.actionButtons}>
                        <Button
                            variant="outlined"
                            size="small"
                            href={detailsUrl}
                        >
                            <Visibility fontSize='small'/>
                        </Button>
                        <Button
                            variant="outlined"
                            size="small"
                            href={editUrl}
                        >
                            <Edit fontSize='small'/>
                        </Button>
                        <Button
                            variant="outlined"
                            size="small"
                            href={deleteUrl}
                        >
                            <Delete fontSize='small'/>
                        </Button>
                    </div>
                )
            }
        },
    ];

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
                <div style={{height: 500, width: '100%'}}>
                    <DataGrid rows={rows} columns={columns}/>
                </div>
            </Container>
        </Fragment>
    );
}
