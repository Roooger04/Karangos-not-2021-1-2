import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles';
import LocalCafeTwoToneIcon from '@material-ui/icons/LocalCafeTwoTone';

const useStyles = makeStyles((theme) => ({
    text: {
        //background: 'yellow',
        width: '100%',
        color: theme.palette.text.secondary
    },
    Toolbar: {
        backgroundColor: theme.palette.background.paper,
        minHeight: '42px',
        // Posicionando a barra no rodapé da pagina
        width: '100%',
        position: 'fixed',
        bottom: 0
    },
    link: {
        color: theme.palette.secondary.light,
        textDecoration: 'none', // tira o sublinhado do link
        '&:hover': { // mouse passando sobre o link
            textDecoration: 'underline' // retorna o sublinhado
        }
    }
}));

export default function FooterBar(){
    const classes = useStyles();
    return(
        <Toolbar className={classes.Toolbar}>
            <Typography variant="caption" align="center" className={classes.text}>
                Desenvolvido com <LocalCafeTwoToneIcon fontSize="small"/> por <a href="mailto:rogerrogerio97@gmail.com" className={classes.link}>Roger Rogerio</a>
            </Typography>
        </Toolbar>
    )
}