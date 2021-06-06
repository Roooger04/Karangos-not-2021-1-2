import { useState, useEffect } from 'react'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import { makeStyles } from '@material-ui/core/styles'

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

    function handleInputChange(event, property) {

        // Se houver id no event.target, ele será o nome da propriedade
        // se não, usaremos o valor do segundo parâmetro
        if(event.target.id) property = event.target.id

        // Quando o nome de uma propriedade de um objeto aparece entre [],
        // isso se chama "propriedade calculada". O nome da propriedade vai
        // corresponder à avaliação da expressaõ entre os colchotes
        setCurrentId(event.target.id)
        setClientes({...clientes,[property]: event.target.value})
        
    }

    return (
        <>
            <h1>Cadastrar Novo Cliente</h1>
            <form className={classes.form}>

                <TextField id="nome" label="Nome" variant="filled" value={clientes.nome} 
                onChange={handleInputChange} fullWidth/>

                <TextField id="cpf" label="CPF" variant="filled" value={clientes.cpf} 
                onChange={handleInputChange} fullWidth/>

                <TextField id="rg" label="RG" variant="filled" value={clientes.rg} 
                onChange={handleInputChange} fullWidth/>

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

                <div>{JSON.stringify(clientes)}<br />currentId: {currentId}</div>
            </form>
        </>
    )
}