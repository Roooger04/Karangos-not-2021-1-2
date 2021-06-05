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
import Checkbox from '@material-ui/core/Checkbox'
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

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
  }
}));

export default function KarangosList(){
    const classes = useStyles();

    // É importante inicializar esta variavel de estado como um vetor vazio
    const [karangos, setKarangos] = useState([])
    
    useEffect(() => {
        const getData = async () => {
            try {
                let response =  await axios.get('https://api.faustocintra.com.br/karangos?by=marca,modelo')
                setKarangos(response.data)
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
            <h1>Listagem de Karangos</h1>
            <TableContainer component={Paper}>
                <Table className={classes.table} size="small" aria-label="a dense table">
                    <TableHead>
                    <TableRow>
                        <TableCell align="right">Cód.</TableCell>
                        <TableCell>Marca</TableCell>
                        <TableCell>Modelo</TableCell>
                        <TableCell>Cor</TableCell>
                        <TableCell align="center">Ano</TableCell>
                        <TableCell align="center">Importado?</TableCell>
                        <TableCell align="center">Placa</TableCell>
                        <TableCell align="right">Preço</TableCell>
                        <TableCell align="center">Editar</TableCell>
                        <TableCell align="center">Excluir</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            karangos.map(karangos => 
                                <TableRow key={karangos.id} className={classes.tableRow}>
                                    <TableCell align="right">{karangos.id}</TableCell>
                                    <TableCell>{karangos.marca}</TableCell>
                                    <TableCell>{karangos.modelo}</TableCell>
                                    <TableCell>{karangos.cor}</TableCell>
                                    <TableCell align="center">{karangos.ano_fabricacao}</TableCell>
                                    <TableCell align="center">
                                        <Checkbox checked={karangos.importado === '1'} readOnly />
                                    </TableCell>
                                    <TableCell align="center">{karangos.placa}</TableCell>
                                    <TableCell align="right">
                                        { Number(karangos.preco).toLocaleString('pt-br', {style: 'currency', currency: 'BRL'}) }
                                    </TableCell>
                                    <TableCell align="center">
                                        <IconButton aria-label="edit">
                                            <EditIcon />
                                        </IconButton>
                                    </TableCell>
                                    <TableCell align="center">
                                        <IconButton aria-label="delete" className={classes.deleteButton}>
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