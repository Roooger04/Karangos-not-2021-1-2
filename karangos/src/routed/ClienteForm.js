import { useState, useEffect } from 'react'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import { makeStyles } from '@material-ui/core/styles'
import InputMask from 'react-input-mask'
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
        },
        toolbar: { 
            marginTop: '36px',
            width: '100%',
            display: 'flex',
            justifyContent: 'space-around'
        },
    },
}))

/* Classes de caractere de entrada para a mascara do campo CPF,RG,numero do imóvel 
 1) Três primeiras posições: qualquer letra, de A a Z (maiscula ou miniscula) ~> [A-Za-z]
 2) Posições numericas (1°, a 3° e a 4° depois do traço) ~> [0-9]
 3) 2° posição apos o traço: pode receber digitos ou letras de A a J (maisculas ou minuscalas) ~> [0-9A-Ja-j]
*/

// Representando as classes de caracteres da mascara como um objeto
const formatChars = {
    'A': '[A-Za-z]',
    '0': '[0-9]',
    '#': '[0-9A-Ja-j]'
}

// curiosidade: Mascara para CNPJ: '00.000.000/0000-00'
// Finalmente, a mascara de entrada do campo CPF
// Mascara para CPF: '000.000.000-00'
const cpfMask = '000.000.000-00'
const rgMask = '00.000.000-0/AAA-AA'
const telefoneMask = '(00) 00000-0000'


export default function ClienteForm(){
    const classes = useStyles()

    const [clientes, setClientes] = useState({
        id: null,
        nome: '',
        cpf: '',
        rg: '',
        logradouro: '',
        num_imovel: null,
        complemento: '',
        bairro: '',
        municipio: '',
        uf: '',
        telefone: '',
        email: ''
    })

    const [currentId, setCurrentId] = useState()

    const [snackState, setSnackState] = useState({
        open: false,
        severity: 'success',
        message: 'Cliente salvo com sucesso'
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

        if(property === 'rg'){ // era para deichar a expedição do RG maiscula ****CORRIGIR*****
            setClientes({...clientes, [property]: event.target.value.toUpperCase()})
        }

        // Quando o nome de uma propriedade de um objeto aparece entre [],
        // isso se chama "propriedade calculada". O nome da propriedade vai
        // corresponder à avaliação da expressaõ entre os colchotes
        setCurrentId(event.target.id)
        setClientes({...clientes,[property]: event.target.value})
        
    }

    async function saveData(){
        try {
            // Desabilitar botão
            setBtnSendState({disabled: true, label: 'Enviando...'})

         await axios.post('https://api.faustocintra.com.br/clientes', clientes)
         setSnackState({
            open: true,
            severity: 'success',
            message: 'Cliente salvo com sucesso'
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

    function handleSubmit(event) {

        event.preventDefault() // Envia o recarregamento da página
        
        saveData()

    }

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

            <Snackbar open={snackState.open} autoHideDuration={6000} onClose={handleSnackClose}>
            <Alert onClose={handleSnackClose} severity={snackState.severity}>
                {snackState.message}
            </Alert>
            </Snackbar>

            <h1>Cadastrar Novo Cliente</h1>
            <form className={classes.form} onSubmit={handleSubmit}>

                <TextField id="nome" label="Nome" variant="filled" value={clientes.nome} 
                onChange={handleInputChange} fullWidth/>

                <InputMask formatChars={formatChars} mask={cpfMask} id="cpf" value={clientes.cpf} 
                onChange={event => handleInputChange(event, 'cpf')}>
                    {() => <TextField  label="CPF" variant="filled" fullWidth/>}
                </InputMask>

                <InputMask formatChars={formatChars} mask={rgMask} id="rg" value={clientes.rg} 
                onChange={event => handleInputChange(event, 'rg')}>
                    {() => <TextField  label="RG" variant="filled" fullWidth/>}
                </InputMask>                

                <TextField id="logradouro" label="Logradouro" variant="filled" value={clientes.logradouro} 
                onChange={handleInputChange} fullWidth/>

                <TextField id="num_imovel" label="Numero do imóvel" variant="filled" value={clientes.num_imovel} 
                onChange={handleInputChange} type="number" fullWidth/>
    
                <TextField id="complemento" label="Complemento" variant="filled" value={clientes.complemento} 
                onChange={handleInputChange} fullWidth/>

                <TextField id="bairro" label="Bairro" variant="filled" value={clientes.bairro} 
                onChange={handleInputChange} fullWidth/>

                <TextField id="municipio" label="Município" variant="filled" value={clientes.municipio} 
                onChange={handleInputChange} fullWidth/>

                <TextField id="uf" label="UF" variant="filled" value={clientes.uf}
                onChange={event => handleInputChange(event, 'uf')} select fullWidth>
                    <MenuItem value="AC">Acre</MenuItem>
                    <MenuItem value="AL">Alagoas</MenuItem>
                    <MenuItem value="AP">Amapá</MenuItem>
                    <MenuItem value="AM">Amazonas</MenuItem>
                    <MenuItem value="BA">Bahia</MenuItem>
                    <MenuItem value="CE">Ceará</MenuItem>
                    <MenuItem value="ES">Espírito Santo</MenuItem>
                    <MenuItem value="GO">Goiás</MenuItem>
                    <MenuItem value="MA">Maranhão</MenuItem>
                    <MenuItem value="MT">Mato Grosso</MenuItem>
                    <MenuItem value="MS">Mato Grosso do Sul</MenuItem>
                    <MenuItem value="MG">Minas Gerais</MenuItem>
                    <MenuItem value="PA">Pará</MenuItem>
                    <MenuItem value="PB">Paraíba</MenuItem>
                    <MenuItem value="PR">Paraná</MenuItem>
                    <MenuItem value="PE">Pernambuco</MenuItem>
                    <MenuItem value="PI">Piauí</MenuItem>
                    <MenuItem value="RJ">Rio de Janeiro</MenuItem>
                    <MenuItem value="RN">Rio Grande do Norte</MenuItem>
                    <MenuItem value="RS">Rio Grande do Sul</MenuItem>
                    <MenuItem value="RO">Rondônia</MenuItem>
                    <MenuItem value="RR">Roraima</MenuItem>
                    <MenuItem value="SC">Santa Catarina</MenuItem>
                    <MenuItem value="SP">São Paulo</MenuItem>
                    <MenuItem value="SE">Sergipe</MenuItem>
                    <MenuItem value="TO">Tocantins</MenuItem>
                    <MenuItem value="DF">Distrito Federal</MenuItem>
                </TextField>

                <InputMask formatChars={formatChars} mask={telefoneMask} id="telefone" value={clientes.telefone} 
                onChange={event => handleInputChange(event, 'telefone')}>
                    {() => <TextField  label="Telefone" variant="filled" fullWidth/>}
                </InputMask>

                <TextField id="email" label="E-mail" variant="filled" value={clientes.email} 
                onChange={handleInputChange} fullWidth/>

                <Toolbar className={classes.toolbar}>
                    <Button variant="contained" color="secondary" type="submit">Enviar</Button>
                    <Button variant="contained">Voltar</Button>
                </Toolbar>

                <div>{JSON.stringify(clientes)}<br />currentId: {currentId}</div>
            </form>
        </>
    )
}