import { useState, useEffect } from 'react'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import { makeStyles } from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'

const useStyles = makeStyles(() => ({
    form: {
        maxWidth: '90%',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        '& .MuiFormControl-root': {
            minWidth: '200px',
            maxWidth: '500px',
            marginBottom: '24px'
        }
    },
}))

export default function KarangosForm(){
    const classes = useStyles()

    const [karangos, setKarangos] = useState({
        id: null,
        marca: '',
        modelo: '',
        cor: '',
        ano_fabricacao: (new Date()).getFullYear(), // Ano corrente
        importado: '0',
        placa: '',
        preco: 0
    })

    const [currentId, setCurrentId] = useState()
    const [importadoChecked, setImportadoChecked] = useState()

    function handleInputChange(event, property) {

        // Se houver id no event.target, ele será o nome da propriedade
        // se não, usaremos o valor do segundo parâmetro
        if(event.target.id) property = event.target.id

        if(property === 'importado') {
            const newState = ! importadoChecked
            setKarangos({...karangos, importado: (newState ? '1': '0')})
            setImportadoChecked(newState)
        }
        else{
            // Quando o nome de uma propriedade de um objeto aparece entre [],
            // isso se chama "propriedade calculada". O nome da propriedade vai
            // corresponder à avaliação da expressaõ entre os colchotes
            setCurrentId(event.target.id)
            setKarangos({...karangos,[property]: event.target.value})
        }        
    }

    function years(){
        let result = []
        for(let i = (new Date()).getFullYear(); i >= 1900; i--) result.push(i)
        return result
    }

    return (
        <>
            <h1>Cadastrar Novo Karango</h1>
            <form className={classes.form}>

                <TextField id="marca" label="Marca" variant="filled" value={karangos.marca}
                onChange={handleInputChange} fullWidth/>

                <TextField id="modelo" label="Modelo" variant="filled" value={karangos.modelo}
                onChange={handleInputChange} fullWidth/>

                <TextField id="cor" label="Cor" variant="filled" value={karangos.cor}
                onChange={event => handleInputChange(event, 'cor')} select fullWidth>
                    <MenuItem value="Amarelo">Amarelo</MenuItem>
                    <MenuItem value="Azul">Azul</MenuItem>
                    <MenuItem value="Bege">Bege</MenuItem>
                    <MenuItem value="Branco">Branco</MenuItem>
                    <MenuItem value="Cinza">Cinza</MenuItem>
                    <MenuItem value="Dourado">Dourado</MenuItem>
                    <MenuItem value="Laranja">Laranja</MenuItem>
                    <MenuItem value="Marrom">Marrom</MenuItem>
                    <MenuItem value="Prata">Prata</MenuItem>
                    <MenuItem value="Preto">Preto</MenuItem>
                    <MenuItem value="Roxo">Roxo</MenuItem>
                    <MenuItem value="Verde">Verde</MenuItem>
                    <MenuItem value="Vermelho">Vermelho</MenuItem>
                </TextField>

                <TextField id="ano_fabricacao" label="Ano de Fabricação" variant="filled" value={karangos.ano_fabricacao}
                onChange={event => handleInputChange(event, 'ano_fabricacao')} select fullWidth>
                    {years().map(year => <MenuItem value ={year}>{year}</MenuItem>)}                    
                </TextField>

                <FormControl fullWidth>
                <FormControlLabel
                    control={<Checkbox checked={importadoChecked} onChange={handleInputChange} 
                    id="importado" />}
                    label="Importado?"
                />
                </FormControl>

                <div>{JSON.stringify(karangos)}<br />currentId: {currentId}</div>
            </form>
        </>
    )
}