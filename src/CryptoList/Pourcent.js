import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ls from 'local-storage';

const Pourcent = (props) => {

    const { walletTotal, coinTotal, nameCoin } = props;
    const classes = useStyles();



    React.useEffect(() => {
        ls.set( nameCoin ,  (100 * coinTotal / walletTotal).toFixed(2));
    });

    return (
        <span>
 
            <canvas className={classes.pourcentBarStyle} width={(100 * coinTotal / walletTotal).toFixed(2) * 40} />
            <span className={classes.pourcentValueStyle}>{(100 * coinTotal / walletTotal).toFixed(2)}  %</span>

        </span>
    );
};


const useStyles = makeStyles((theme) => ({
    pourcentBarStyle: {
        padding: 1,
        height: 10,
        borderRadius: 30,
        backgroundColor: "cyan"
    },
    pourcentValueStyle: {
        float: "right"
    }
}));


export default Pourcent;