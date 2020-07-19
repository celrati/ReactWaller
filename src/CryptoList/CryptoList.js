import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Table, TableRow, TableBody, TableContainer, TableCell } from '@material-ui/core';
import CryptoCoin from './CryptoCoin';
import axios from 'axios';
import ls from 'local-storage';

const CryptoList = (props) => {

    const classes = useStyles();
    const assets = { BTC: 0.1205, ETH: 1.2349, DASH: 0.2527, BAT: 82.4851, USDC: 14.5099 };
    const {soldeTotal} = props;
    
    return (
        <TableContainer>
            <Table className={classes.tableStyle}>
                <TableBody>
                    {
                        Object.keys(assets).map(function (keyName, keyIndex) {
                            return (
                                <TableRow hover className={classes.tableRowStyle} >
                                    <TableCell>
                                        <CryptoCoin coin={keyName}
                                            coinSolde={assets[keyName]}
                                            totalSolde={soldeTotal}
                                             />
                                    </TableCell>
                                </TableRow>
                            );
                        })
                    }
                    <br />
                <h1  className={classes.soldeTotalStyle}> Solde Total = {soldeTotal} €</h1>

                </TableBody>
            </Table>

        </TableContainer>

    );
};


const useStyles = makeStyles((theme) => ({
    tableRowStyle: {
        width: "100%"
    },
    tableStyle: {
        width: "100%"
    },
    soldeTotalStyle: {
        textAlign: 'center'
    },
    
    loaderStyle: {
    margin: "10%"
}
}));


export default CryptoList;