import { useState, useEffect } from 'react'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import { makeStyles } from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import InputMask from 'react-input-mask'
import InputAdornment from '@material-ui/core/InputAdornment'
import { Button, Toolbar } from '@material-ui/core'
import axios from 'axios'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { useHistory } from 'react-router-dom'

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
    toolbar: { 
        marginTop: '36px',
        width: '100%',
        display: 'flex',
        justifyContent: 'space-around'
    },
    checkbox: {
        alignItems: 'center',
    },
}))

/* Classes de caractere de entrada para a mascara do campo placa 
 1) Três primeiras posições: qualquer letra, de A a Z ()maiscula ou miniscula ~> [A-Za-z]
 2) Posições numericas (1°, a 3° e a 4° depois do traço) ~> [0-9]
 3) 2° posição apos o traço: pode receber digitos ou letras de A a J (maisculas ou minuscalas) ~> [0-9A-Ja-j]
*/

// Representando as classes de caracteres da mascara como um objeto
const formatChars = {
    'A': '[A-Za-z]',
    '0': '[0-9]',
    '#': '[0-9A-Ja-j]'
}

// Finalmente, a mascara de entrada do campo placa
const placaMask = 'AAA-0#00'

// Mascara para CPF: '000.000.000-00'
// Mascara para CNPJ: '00.000.000/0000-00'

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

    const [snackState, setSnackState] = useState({
        open: false,
        severity: 'success',
        message: 'Karango salvo com sucesso'
    })

    const [btnSendState, setBtnSendState] = useState({
        disabled: false,
        label: 'Enviar'
    })

    const history = useHistory()

    function handleInputChange(event, property) {

        // Se houver id no event.target, ele será o nome da propriedade
        // se não, usaremos o valor do segundo parâmetro
        if(event.target.id) property = event.target.id

        if(property === 'importado') {
            const newState = ! importadoChecked
            setKarangos({...karangos, importado: (newState ? '1': '0')})
            setImportadoChecked(newState)
        }
        else if(property === 'placa'){
            setKarangos({...karangos, [property]: event.target.value.toUpperCase()})
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

    async function saveData(){
        try {
            // Desabilitar botão
            setBtnSendState({disabled: true, label: 'Enviando...'})

         await axios.post('https://api.faustocintra.com.br/karangos', karangos)
         
         setSnackState({
             open: true,
             severity: 'success',
             message: 'Karango salvo com sucesso!'
         }) 
        }
        catch(error) {
            setSnackState({
                open: true,
                severity: 'error',
                message: 'ERRO: ' + error.message
            }) 
        }
        // Reabilitar o botão de enviar
        setBtnSendState({disabled: false, label: 'Enviar'})
    }

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    function handleSnackClose(event, reason) {
        // Evita que a snackbar seja fechada clicando-se fora
        if(reason === 'clickaway') return 
        setSnackState({...snackState, open: false}) // Fecha a snackbar
    }

    function handleSubmit(event) {

        event.preventDefault() // Envia o recarregamento da página
        
        saveData()

    }

    return (
        <>

            <Snackbar open={snackState.open} autoHideDuration={6000} onClose={handleSnackClose}>
            <Alert onClose={handleSnackClose} severity={snackState.severity}>
                {snackState.message}
            </Alert>
            </Snackbar>

            <h1>Cadastrar Novo Karango</h1>
            <form className={classes.form} onSubmit={handleSubmit}>

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

                <InputMask formatChars={formatChars} mask={placaMask} id="placa" 
                onChange={event => handleInputChange(event, 'placa')} value={karangos.placa}>
                    {() => <TextField label="Placa" variant="filled" fullWidth/>}
                </InputMask>

                <TextField 
                id="preco" 
                label="Preço" 
                variant="filled" 
                value={karangos.preco}
                onChange={handleInputChange} 
                fullWidth 
                type="number"
                onFocus={event => event.target.select()}
                InputProps={{
                    startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                }}
                />

                <FormControl className={classes.checkbox} fullWidth>
                    <FormControlLabel
                        control={<Checkbox checked={importadoChecked} onChange={handleInputChange} 
                        id="importado" />}
                        label="Importado?"
                    />
                </FormControl>

                <Toolbar className={classes.toolbar}>
                    <Button 
                    variant="contained" 
                    color="secondary" 
                    type="submit">
                        {btnSendState.label}
                    </Button>
                    <Button variant="contained">Voltar</Button>
                </Toolbar>

                <div>{JSON.stringify(karangos)}<br />currentId: {currentId}</div>
            </form>
        </>
    )
}