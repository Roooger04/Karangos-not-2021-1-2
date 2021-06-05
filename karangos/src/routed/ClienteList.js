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

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function ClienteList(){
    const classes = useStyles();


    // É importante inicializar esta variavel de estado como um vetor vazio
    const [clientes, setClientes] = useState([])

    useEffect(() => {
        const getData = async () => {
            try {
                let response =  await axios.get('https://api.faustocintra.com.br/clientes')
                setClientes(response.data)
            }
            catch(error){
                console.error(error)
            }
        }
        getData()
    }, []) // Quando a dependencia de um useEffect é um vetor vazio, isso indica
        // que ele será executado apenas uma vez, na inicialização do componente
    return (
        <>
            <h1>Listagem de Cliente</h1>
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
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            clientes.map(clientes => 
                                <TableRow key={clientes.id}>
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
                                </TableRow>
                            )
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}