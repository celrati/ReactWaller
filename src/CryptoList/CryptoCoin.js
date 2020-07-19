import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import axios from 'axios';
import { CircularProgress } from '@material-ui/core';
import Pourcent from './Pourcent';
import ls from 'local-storage';

const CryptoCoin = (props) => {

    const { coin, coinSolde, totalSolde} = props;

    const classes = useStyles();


    const [euroValue, setEuroValue] = React.useState(0);
    const [logoLink, setLogoLink] = React.useState("");
    const [nameCurrency, setNameCurrency] = React.useState("");

    

    const [imageIsShowed, setImageIsShowed] = React.useState(false);

    const [visibility, setVisibility] = React.useState("hidden");

    const getEuroValue = async () => { 
        const response = await axios.get(`https://min-api.cryptocompare.com/data/price?fsym=${coin}&tsyms=EUR&api_key=b2449a590e53ed211b0e3bec6a6126c0b535082fc097f82b7857d669cf9c4b9d`);
        const euroValue = await response.data.EUR * coinSolde;
        setEuroValue(euroValue.toFixed(2));

    };

    const getLogoLink = () => {
        const coinLowerCase = coin.toLowerCase();
        setLogoLink(`https://cryptoicons.org/api/icon/${coinLowerCase}/200`);
    };


    const getRealName = () => {
        // maybe there is an APi to do that !
        switch (coin) {
            case 'BTC':
                setNameCurrency("Bitcoin");
                break;
            case 'ETH':
                setNameCurrency("Ethereum");
                break;
            case 'DASH':
                setNameCurrency("Dash");
                break;
            case 'BAT':
                setNameCurrency("Basic Attention T.");
                break;
            case 'USDC':
                setNameCurrency("USD Coin");
                break;
        }
    };

    React.useEffect(() => {
        getEuroValue();
        getLogoLink();
        getRealName();
    }, [euroValue, logoLink]);



    return (
        <div>
            {(euroValue === 0 || !imageIsShowed) && <CircularProgress className={classes.loaderStyle} variant="indeterminate" thickness="5" size="40px" />}

            

                <Grid style={{visibility: visibility}}
                    className={classes.containerStyle}
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                >
                    <div className={classes.minWidthStyle}>

                        <img className={classes.logoStyle}
                            onLoad={() => {setImageIsShowed(true); setVisibility("visible")}}
                            src={logoLink} />

                        <span className={classes.nameCoinStyle} >{nameCurrency}</span>
                    </div>

                    <div className={classes.minWidthStyle}>

                        <Pourcent nameCoin={coin} walletTotal={totalSolde} coinTotal={euroValue}/>


                    </div>


                    <div className={classes.minWidthStyle}>

                        <span className={classes.soldeCoinStyle} >{coinSolde} {coin} </span>
                        <span className={classes.euroExchangeStyle} > {euroValue} €</span>
                    </div>

                </Grid>
            


        </div>
    );
};


const useStyles = makeStyles((theme) => ({
    containerStyle: {
        fontWeight: "bold",
        fontSize: "25px"
    },
    logoStyle: {
        width: "60px",
        display: "inline-block",
        marginRight: "10%"
    },
    pourcentCoinGraphStyle: {
        marginRight: "10%"
    },

    euroExchangeStyle: {
        float: "right"
    },

    minWidthStyle: {
        minWidth: "30%"
    },
    loaderStyle: {
        marginLeft: "50%"
    }

}));


export default CryptoCoin;