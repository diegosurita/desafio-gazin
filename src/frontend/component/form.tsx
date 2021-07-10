import TextField from "@material-ui/core/TextField";
import {
    Dialog,
    DialogActions,
    DialogContent, DialogContentText,
    DialogTitle,
    Divider,
    InputLabel,
    MenuItem,
    Select
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {createStyles, makeStyles} from "@material-ui/core/styles";
import {Fragment, useState, useEffect} from "react";
import DeveloperService from "../service/developer";

const useStyle = makeStyles((theme) =>
    createStyles({
        form: {
            display: 'flex',
            flexFlow: 'column',
            alignItems: 'stretch',
            flexGrow: 4
        },
        fields: {
            width: '600px',
            margin: '10px 0'
        },
        button: {
            margin: theme.spacing(1)
        }
    })
);

const Form = () => {
    const classes = useStyle(),
        [name, setName] = useState(''),
        [sex, setSex] = useState(''),
        [age, setAge] = useState<number | string>(''),
        [hobby, setHobby] = useState(''),
        [birthDate, setBirthDate] = useState(''),
        [submitted, setSubmitted] = useState(false),
        [openDialog, setOpenDialog] = useState(false);

    useEffect(() => {
        console.log(openDialog)
    })

    const onSubmit = async (e: any) => {
        e.preventDefault();
        setSubmitted(true);

        if (name !== '' && sex !== '' && age !== '' && hobby !== '' && birthDate !== '') {
            const result: any = await DeveloperService.create({name, sex, age, hobby, birthDate});

            if (result.status == 201) {
                setOpenDialog(true);
            }
        }
    }

    const onCancel = (e: any) => {
        e.preventDefault();
        window.location.href = '/';
    }

    const checkValidAge = (age: number) => {
        if (age > 100) {
            setAge(100);
        }
    }

    const onDialogClose = () => {
        window.location.href = '/';
    };

    return (
        <Fragment>
            <form className={classes.form} noValidate autoComplete="off" onSubmit={(e: any) => onSubmit(e)}>
                <TextField
                    error={name === '' && submitted}
                    helperText={name === '' && submitted ? 'Este campo é obrigatório' : ''}
                    className={classes.fields}
                    required
                    id="name"
                    label="Nome"
                    variant="outlined"
                    value={name}
                    onChange={(e: any) => setName(e.target.value.trimStart())}
                />
                <div>
                    <InputLabel id="sex">Sexo</InputLabel>
                    <Select
                        error={sex === '' && submitted}
                        className={classes.fields}
                        labelId="sex"
                        id="sex"
                        value={sex}
                        onChange={(e: any) => setSex(e.target.value)}
                        label="Sexo"
                    >
                        <MenuItem value=""><em>Selecione</em></MenuItem>
                        <MenuItem value="M">Masculino</MenuItem>
                        <MenuItem value='F'>Feminino</MenuItem>
                    </Select>
                </div>
                <TextField
                    error={age === '' && submitted}
                    helperText={age === '' && submitted ? 'Este campo é obrigatório' : ''}
                    className={classes.fields}
                    required
                    id="age"
                    label="Idade"
                    variant="outlined"
                    type="number"
                    value={age}
                    onKeyUp={(e: any) => checkValidAge(e.target.value)}
                    onChange={(e: any) => setAge(e.target.value)}
                />
                <TextField
                    error={hobby === '' && submitted}
                    helperText={hobby === '' && submitted ? 'Este campo é obrigatório' : ''}
                    className={classes.fields}
                    required
                    id="hobby"
                    label="Hobby"
                    variant="outlined"
                    value={hobby}
                    onChange={(e: any) => setHobby(e.target.value)}
                />
                <TextField
                    error={birthDate === '' && submitted}
                    helperText={birthDate === '' && submitted ? 'Este campo é obrigatório' : ''}
                    type='date'
                    className={classes.fields}
                    required
                    id="birthDay"
                    label="Data de Aniversário"
                    value={birthDate}
                    onChange={(e: any) => setBirthDate(e.target.value)}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <Divider style={{margin: '20px 0', width: '600px'}}/>
                <div style={{justifyItems: 'end'}}>
                    <Button
                        onClick={(e: any) => onCancel(e)}
                        type='button'
                        className={classes.button}
                        variant="contained"
                    >
                        Cancelar
                    </Button>
                    <Button
                        type='submit'
                        className={classes.button}
                        variant="contained"
                        color="primary"
                    >
                        Salvar
                    </Button>
                </div>
            </form>
            <Dialog open={openDialog} onClose={onDialogClose}>
                <DialogContent>
                    <DialogContentText id="dialog">Desenvolvedor cadastrado com sucesso!</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onDialogClose} color="primary" autoFocus>ok</Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    )
}

export default Form
