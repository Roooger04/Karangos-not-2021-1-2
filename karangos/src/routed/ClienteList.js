import axios from 'axios'
import { useEffect, useState } from 'react'
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import AddBoxIcon from '@material-ui/icons/AddBox';
import { useHistory } from 'react-router-dom'
import ConfirmDialogo from '../ui/ConfirmDialogo'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';


const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  deleteButton: {
    color: theme.palette.error.dark
},
tableRow: {
    '& button': { // Linha da tabela em etado "normal"
      visibility: 'hidden'
    },
    '&:hover' : { // Linha da tabela com mouse sobreposto
        backgroundColor: theme.palette.action.hover
    },
    '&:hover button': { // Botões na linha com mouse sobreposto
        visibility: 'visible'
    } 
},
toolbar: {
    justifyContent: 'flex-end',
    paddingRight: 0
}
}));

export default function ClienteList(){
    const classes = useStyles();

    const history = useHistory()

    // É importante inicializar esta variavel de estado como um vetor vazio
    const [clientes, setClientes] = useState([])
    const [dialogOpen, setDialogOpen] = useState(false)
    const [deletable, setDeletable] = useState() // Cód. do registro a ser excluido
    const [snackState, setSnackState] = useState({
        open: false,
        severity: 'success',
        message: 'Cliente excluído com sucesso'
    })

    function handleDialogClose(result) {
        setDialogOpen(false)
        if(result) deleteItem()
    }

    function handleDeleteClick(id) {
        setDeletable(id)
        setDialogOpen(true)
    }

    async function deleteItem(){
        try {
            await axios.delete(`https://api.faustocintra.com.br/clientes/${deletable}`)
            getData() // Atualiza os dados da tabelas
            setSnackState({...snackState, open: true}) // Exibe a snackbar de sucesso
        }
        catch(error){
            // Mostra a snackbar de erro
            setSnackState({
                open: true,
                severity: 'error',
                message: 'ERRO: ' + error.message
            })
        }
    }

    async function getData() {
        try {
            let response =  await axios.get('https://api.faustocintra.com.br/clientes?by=nome,municipio')
            if(response.data.length > 0) setClientes(response.data)
        }
        catch(error){
            console.error(error)
        }
    }

    useEffect(() => {
        getData()
    }, []) // Quando a dependencia de um useEffect é um vetor vazio, isso indica
        // que ele será executado apenas uma vez, na inicialização do componente

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    function handleSnackClose(event, reason) {
        // Evita que a snackbar seja fechada clicando-se fora
        if(reason === 'clickaway') return 
        setSnackState({...snackState, open: false}) // Fecha a snackbar
    }

    return (
        <>
            <ConfirmDialogo isOpen={dialogOpen} onClose={handleDialogClose}>
                Deseja realmente excluir este karango?
            </ConfirmDialogo>

            <Snackbar open={snackState.open} autoHideDuration={6000} onClose={handleSnackClose}>
            <Alert onClose={handleSnackClose} severity={snackState.severity}>
                {snackState.message}
            </Alert>
            </Snackbar>

            <h1>Listagem de Cliente</h1>
            <Toolbar className={classes.toolbar}>
                <Button color="secondary" variant="contained" size="large" startIcon={<AddBoxIcon />} 
                onClick={() => history.push("/cliente") }>
                    Novo Cliente
                </Button>
            </Toolbar>
            <TableContainer component={Paper}>
                <Table className={classes.table} size="small" aria-label="a dense table">
                    <TableHead>
                    <TableRow>
                        <TableCell align="center">Cód.</TableCell>
                        <TableCell>Nome</TableCell>
                        <TableCell>CPF</TableCell>
                        <TableCell>RG</TableCell>
                        <TableCell>Logradouro</TableCell>
                        <TableCell align="center">N°</TableCell>
                        <TableCell align="center">Complemento</TableCell>
                        <TableCell align="center">Bairro</TableCell>
                        <TableCell align="center">Municipio</TableCell>
                        <TableCell align="center">Estado</TableCell>
                        <TableCell>Telefone</TableCell>
                        <TableCell align="center">E-mail</TableCell>
                        <TableCell align="center">Editar</TableCell>
                        <TableCell align="center">Excluir</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            clientes.map(clientes => 
                                <TableRow key={clientes.id} className={classes.tableRow}>
                                    <TableCell align="center">{clientes.id}</TableCell>
                                    <TableCell>{clientes.nome}</TableCell>
                                    <TableCell>{clientes.cpf}</TableCell>
                                    <TableCell>{clientes.rg}</TableCell>
                                    <TableCell>{clientes.logradouro}</TableCell>
                                    <TableCell align="center">{clientes.num_imovel}</TableCell>
                                    <TableCell align="center">{clientes.complemento}</TableCell>
                                    <TableCell align="center">{clientes.bairro}</TableCell>
                                    <TableCell align="center">{clientes.municipio}</TableCell>
                                    <TableCell align="center">{clientes.uf}</TableCell>
                                    <TableCell>{clientes.telefone}</TableCell>
                                    <TableCell>{clientes.email}</TableCell>
                                    <TableCell align="center">
                                        <IconButton aria-label="edit">
                                            <EditIcon />
                                        </IconButton>
                                    </TableCell>
                                    <TableCell align="center">
                                        <IconButton aria-label="delete" className={classes.deleteButton}
                                        onClick={() => handleDeleteClick(clientes.id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            )
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}