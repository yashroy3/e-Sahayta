import React,{useState,useEffect} from 'react';

import { TextField,Button,Typography,Paper } from '@material-ui/core';

import useStyles from './styles';
import FileBase from 'react-file-base64';
import { useSelector } from 'react-redux';
import {useDispatch} from 'react-redux';

import {createPost,updatePost} from '../../actions/Posts';


const Form = ({currentId, setCurrentId,uploadFile,captureFile}) => {
    const classes=useStyles();
    const dispatch=useDispatch();
    const[postData,setPostData]= useState({creator:'',title:'',message:'',tags:'',selectedFile:''})
    const post=useSelector((state)=>currentId ? state.Posts.find((p)=>p._id===currentId):null);
    const[buffer,setBuffer]=useState("")

    useEffect(() => {
        if (post) setPostData(post);
    }, [post])

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }

    const handleSubmit= async (e)=>{
        e.preventDefault();
        
        uploadFile(postData.title,postData.selectedFile)
        await sleep(5000);
        if (currentId){
            dispatch(updatePost(currentId,postData));
        }
        else{
            dispatch(createPost(postData));
        }
        clear();
    }

    const clear=()=>{
        setCurrentId(null);
        setPostData({creator:'',title:'',message:'',tags:'',selectedFile:''});
    }

    return (
        <Paper className={classes.paper}>
            <form autoComplete ="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6">{`${currentId?'Editing':'Creating'}`} a Issue</Typography>
                <TextField 
                    name="creator" 
                    variant="outlined" 
                    label="Name" 
                    fullWidth value={postData.creator} 
                    onChange={(e)=>setPostData({ ...postData,creator:e.target.value})}  
                />
                <TextField 
                    name="title" 
                    variant="outlined" 
                    label="Issue" 
                    fullWidth value={postData.title} 
                    onChange={(e)=>setPostData({ ...postData,title:e.target.value})}  
                />
                <TextField 
                    name="message" 
                    variant="outlined" 
                    label="Description of Issue" 
                    fullWidth value={postData.message} 
                    onChange={(e)=>setPostData({ ...postData,message:e.target.value})}  
                />
                <TextField 
                    name="tags" 
                    variant="outlined" 
                    label="Location" 
                    fullWidth value={postData.tags} 
                    onChange={(e)=>setPostData({ ...postData,tags:e.target.value.split(',')})}  
                />   

                <div className={classes.fileInput}>
                    <FileBase 
                        type="file"
                        multiple={false}
                        onDone={({base64})=> setPostData({...postData,selectedFile:base64})}/>
                </div>
                <Button className={classes.buttonSubmit} variant="contained" color="secondary" size="large" type="submit" fullWidth>Submit</Button>
                <Button variant="contained" color="primary" size="small" onClick={clear} fullWidth> Clear </Button>
            </form>
        </Paper>
    )
}

export default Form;
