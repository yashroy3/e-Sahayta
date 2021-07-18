import React, { useState, useEffect } from 'react';
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import Web3 from 'web3';

import Posts from "./components/Posts/Posts";
import Form from "./components/Form/Form";

import {Container,AppBar,Typography,Grow,Grid} from '@material-ui/core';
import {useDispatch} from 'react-redux';
import {getPosts} from './actions/Posts';

import useStyles from './styles'

//Declare IPFS
const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient.create({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })  // leaving out the arguments will default to these values


function App() {

  const [currentId, setCurrentId] = useState(null);
  const classes = useStyles();
  const dispatch = useDispatch();

  const [buffer,setBuffer] = useState([])
  const [account,setAccount] = useState("")
  const [files,setfiles]=useState([])
  const [simplestorage,setsimplestorage] = useState('')
  const [loading,setloading] = useState(true)
  const [currentHash,setcurrentHash] =useState('')
  const [currentTitle,setcurrentTitle] = useState('')
  const [filesCount,setfilesCount]=useState(0)

  useEffect(() => {

    dispatch(getPosts());

    async function loadWeb3(){
      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum)
        await window.ethereum.enable()
      }
      else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider)
      }
      else {
        window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
      }
    }

    loadWeb3()

    async function loadBlockchainData(){
      const web3 = window.web3
      // Load account
      const accounts = await web3.eth.getAccounts()
      setAccount(accounts[0])
      // Network ID
      const networkId = await web3.eth.net.getId()
      const networkData = SimpleStorageContract.networks[networkId]
      console.log(networkData);
      if(networkData) {
        const simplestorage = new web3.eth.Contract(SimpleStorageContract.abi, networkData.address)
        setsimplestorage(simplestorage)
 
        setloading(false)
      } else {
        window.alert('Simple Storage contract not deployed to detected network.')
      }
    }

    loadBlockchainData()


  }, [currentId,dispatch]);


    function captureFile (event){
      event.preventDefault()
      const file = event.target.files[0]
      const reader = new window.FileReader()
      reader.readAsArrayBuffer(file)
  
      reader.onloadend = () => {
        console.log(Buffer(reader.result))
        setBuffer({buffer : Buffer(reader.result)})
        console.log(buffer)
        uploadFile(Buffer(reader.result))
      }
    }

    function uploadFile(title,file){
     
        setloading(true)
        simplestorage.methods.uploadFile(1,file, title).send({ from: account }).on('transactionHash', (hash) => {
          setloading(false)
        })

    }
  
  
    return (
      <Container maxidth='lg'>
        <AppBar className={classes.appBar} position="static" color="inherit" >
          <Typography className={classes.heading} variant="h4" align="center" style={{marginLeft:'1%'}}>e-Sahayta</Typography>
          <Typography className={classes.heading} variant="h6" style={{marginLeft:'40%',marginTop:'1%'}} >{account}</Typography>
        </AppBar>
        <Grow in>
          {/* Privides animations */}
          <Container>
            <Grid className={classes.mainContainer} container justify="space-between" alignItems="stretch" spacing={3}>
              <Grid item xs={12} sm={4}>
                <Form currentId={currentId} setCurrentId={setCurrentId} uploadFile={uploadFile} captureFile={captureFile} />
              </Grid>
              <Grid item xs={12} sm={7}>
                <Posts setCurrentId={setCurrentId} />
              </Grid>
            </Grid>
          </Container>

        </Grow>
      </Container>
  )
}

export default App;


