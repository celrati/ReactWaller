import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Card } from '@material-ui/core';
import CryptoList from '../CryptoList/CryptoList';
import Graphique from '../Graphique/Graphique';
import { CircularProgress } from '@material-ui/core';
import axios from 'axios';
import ls from 'local-storage';


const Wallet = () => {

  const classes = useStyles();

  // here we manage the state of the TabIndex to show..
  const [indexTab, setIndexTab] = React.useState(0);
  const [show, setShow] = React.useState(true);
  const [soldeTotal, setSoldeTotal] = React.useState(0);

  const [data, setData] = React.useState({});


  const assets = { BTC: 0.1205, ETH: 1.2349, DASH: 0.2527, BAT: 82.4851, USDC: 14.5099 };

  const handleChange = (event, newIndex) => {
    setIndexTab(newIndex);
  };

  const initData = async () => {
    const totalSolde = await Object.keys(assets)
      .map(async (keyName, keyIndex) => {
        const response = await axios.get(`https://min-api.cryptocompare.com/data/price?fsym=${keyName}&tsyms=EUR&api_key=b2449a590e53ed211b0e3bec6a6126c0b535082fc097f82b7857d669cf9c4b9d`);
        const euroValue = response.data.EUR * assets[keyName];


        return euroValue;
      })
      .reduce(async (acc, value) => {
        let ret_1 = await value;
        let acc_1 = await acc;

        console.log("alo " + (ret_1 + acc_1));
        return ret_1 + acc_1;
      }, 0);
    setSoldeTotal(totalSolde.toFixed(2));
  };

  React.useEffect(() => {
    initData();
    // setData([
    //   { title: 'One', value: 10, color: '#E38627' },
    //   { title: 'Two', value: 15, color: '#C13C37' },
    //   { title: 'Three', value: 20, color: '#6A2135' }
    // ]);
  });

  return (
    <div>
      {
        show
        &&
        <Card raised className={classes.cardStyle}>
          <h2 className={classes.titleStyle}> Votre portefeuille : </h2>
          <Tabs className={classes.tabsStyle} value={indexTab} onChange={handleChange} aria-label="simple tabs example">
            <Tab className={classes.tabStyle} label="Liste" />
            <Tab className={classes.tabStyle} label="Graphique" />
          </Tabs>


          {indexTab == 0 && <CryptoList soldeTotal={soldeTotal} />}
          {indexTab == 1 && <Graphique  />}

          <h1></h1>
        </Card>
      }




    </div>
  );
};


const useStyles = makeStyles((theme) => ({
  cardStyle: {
    margin: "10%",
  },
  titleStyle: {
    display: "inline-block",
    marginLeft: "2%",
    fontSize: "30px"
  },
  tabsStyle: {
    display: "inline-block",
    float: "right"
  },
  tabStyle: {
    fontWeight: "bold",
    fontSize: "20px"
  }
}));


export default Wallet;