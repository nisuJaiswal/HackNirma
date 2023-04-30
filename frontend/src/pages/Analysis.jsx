import React, { Fragment, useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import { styled } from "@mui/joy/styles";
import Sheet from "@mui/joy/Sheet";
import Grid from "@mui/joy/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
// import Button from "@mui/joy/Button";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
// import IconButton from "@mui/joy/IconButton";
// import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import { green } from "@material-ui/core/colors";
import { grey } from "@mui/material/colors";
import "../styles/analysis.css";
import { Input, OutlinedInput, TextField } from "@mui/material";
import { useLocation } from "react-router-dom";
import axios from "axios";
import WebViewer from "@pdftron/webviewer";

const Analysis = () => {
    const viewer = useRef(null);

    const { state: file } = useLocation()
    const [chathistory, setChathistory] = useState([])


    const fileBlob = new Blob([file], { type: 'application/pdf' })
    const url = URL.createObjectURL(fileBlob)
    console.log(fileBlob)

    const Item = styled(Sheet)(({ theme }) => ({
        backgroundColor:
            theme.palette.mode === "dark" ? theme.palette.background.level1 : "#fff",
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: "center",
        borderRadius: 4,
        color: theme.vars.palette.text.secondary,
    }));

    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = await axios.get(`http://localhost:8000/query?query_string=${'Summarize this'}`)
        // console.log(data)
        setResponse(data);
    }
    const updateHistroy = (data) => {
        setChathistory(data)
    }
    useEffect(() => {


        WebViewer(
            {
                path: '/lib',
                initialDoc: url,
            },
            viewer.current,
        )
            .then(instance => {
                // `myBlob` is your blob data which can come
                // from sources such as a server or the filesystem
                instance.UI.loadDocument(fileBlob, { filename: file.name });

                const { documentViewer } = instance.Core;
                documentViewer.addEventListener('documentLoaded', () => {
                    // perform document operations  
                });
            });

    }, [url, fileBlob, file.name]);



    return (
        <>
            <Header />
            <Grid
                style={{ margin: 0 }}
                container
                spacing={2}
                columns={16}
                sx={{ flexGrow: 1 }}
            >
                <Grid
                    // sx={{ background: "green" }}
                    // sx={{ background: "green" }}
                    xs={8}
                >
                    <Item>
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <Typography variant="h6" ml={3} color="black">
                                <b>{file.name}</b>
                            </Typography>
                            <Button style={{ marginLeft: "auto" }} variant="contained">
                                View PDF
                            </Button>
                        </div>
                    </Item>
                    {/* <Item>
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <Button sx={{ my: 1, mx: 1.5 }} variant="text">
                                Summary
                            </Button>

                            <Button sx={{ my: 1 }} variant="text">
                                Viewer
                            </Button>

                            <Button
                                color="secondary"
                                sx={{ my: 1, p: 0.3 }}
                                style={{
                                    marginLeft: "auto",
                                    color: "#000000",
                                    borderColor: "#757575",
                                }}
                                variant="outlined"
                            >
                                <b>1</b>
                            </Button>

                            <Button
                                color="secondary"
                                sx={{
                                    my: 1,
                                    p: 0.3,
                                    ml: 1,
                                    color: grey[600],
                                    borderColor: grey[600],
                                }}
                                variant="outlined"
                            >
                                <KeyboardArrowUpIcon />
                            </Button>

                            <Button
                                color="secondary"
                                // sx={{ my: 1}}
                                sx={{ my: 1, p: 0.3, color: grey[600], borderColor: grey[600] }}
                                variant="outlined"
                            >
                                <KeyboardArrowDownIcon />
                            </Button>

                            <Button
                                color="secondary"
                                // sx={{ my: 1}}
                                sx={{
                                    my: 1,
                                    p: 0.3,
                                    ml: 2,
                                    color: grey[600],
                                    borderColor: grey[600],
                                }}
                                variant="outlined"
                            >
                                <ZoomInIcon />
                            </Button>

                            <Button
                                color="secondary"
                                // sx={{ my: 1}}
                                sx={{
                                    my: 1,
                                    p: 0.3,
                                    color: grey[600],
                                    borderColor: grey[600],
                                }}
                                variant="outlined"
                            >
                                <ZoomOutIcon />
                            </Button>
                        </div>
                    </Item> */}
                    <Item>
                        {/* <iframe
                            src={`${url}#toolbar=0`}
                            // src="/210120702006_Vatsal.pdf"
                            width="100%"
                            height="600px"
                        /> */}
                        <div className="webviewer" ref={viewer} style={{ height: "100vh" }}></div>
                    </Item>
                </Grid>

                <Grid
                    //  sx={{ background: "pink" }}
                    sx={{ borderLeft: "1px solid grey" }}
                    xs={8}
                >
                    <Item>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                height: "87vh",
                                padding: "0px",
                            }}
                        >
                            <div
                                style={{
                                    margin: "1.3rem",
                                    justifyContent: "flex-start",
                                    padding: "0px",
                                }}
                            >
                                {chathistory?.map((chat) => {
                                    return (
                                        <>
                                            {chat.type == "backend" ?
                                                <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: 10 }}>
                                                    <div style={{ backgroundColor: '#80808096', maxWidth: '400px', padding: 14, borderRadius: 14, color: 'black' }}>
                                                        {chat?.data?.response}
                                                    </div>
                                                </div>
                                                :
                                                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 10 }}>
                                                    <div style={{ backgroundColor: "#E6E6FA", maxWidth: '400px', padding: 14, borderRadius: 14, color: 'black' }}>
                                                        {chat?.data}9c27b0d9
                                                    </div>
                                                </div>
                                            }
                                        </>
                                    )
                                })}
                            </div >
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    marginTop: "auto",
                                }}
                            >
                                <Button
                                    color="secondary"
                                    size="small"
                                    sx={{ ml: 1, mr: 1, my: 1 }}
                                    style={{
                                        color: "#000000",
                                        borderColor: "#757575",
                                    }}
                                    variant="outlined"
                                >
                                    Summarize
                                </Button>
                                <Button
                                    color="secondary"
                                    size="small"
                                    sx={{ mx: 1, my: 1 }}
                                    style={{
                                        color: "#000000",
                                        borderColor: "#757575",
                                    }}
                                    variant="outlined"
                                >
                                    Explain
                                </Button>
                                <Button
                                    color="secondary"
                                    size="small"
                                    sx={{ mx: 1, my: 1 }}
                                    style={{
                                        color: "#000000",
                                        borderColor: "#757575",
                                    }}
                                    variant="outlined"
                                >
                                    Examples
                                </Button>
                                <Button
                                    color="secondary"
                                    size="small"
                                    sx={{ mx: 1, my: 1 }}
                                    style={{
                                        color: "#000000",
                                        borderColor: "#757575",
                                    }}
                                    variant="outlined"
                                >
                                    Questions
                                </Button>
                            </div>
                            <div>
                                {/* <TextField
                                    // className={removeUpDownArrow}
                                    style={{
                                        color: "#000000",
                                        borderColor: "#757575",
                                    }}
                                    fullWidth
                                    id="outlined-multiline-flexible"
                                    placeholder="Ask anything about the document!"
                                    multiline
                                    maxRows={1}
                                /> */}
                                <AskQuestion chathistory={chathistory} updateHistroy={updateHistroy} />
                            </div>
                        </div>
                    </Item>
                </Grid>
            </Grid >
        </>
    );
};

export default Analysis;


const AskQuestion = (props) => {
    console.log("this are props", props)
    const { chathistory, updateHistroy } = props;
    console.log({ chathistory, updateHistroy })
    const [question, setQuestion] = useState("")
    console.log(chathistory)
    const handleSubmit = async () => {
        const data = await axios.get(`http://localhost:8000/query?query_string=${question}`)
        console.log(data);
        const chatHistoryData = chathistory.length > 0 ? [...chathistory] : [];

        chatHistoryData.push(
            {
                data: question,
                type: "user"
            },
            {
                data: data?.data,
                type: "backend"
            }
        );
        console.log(chatHistoryData)
        updateHistroy(chatHistoryData)
    }
    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>

            <textarea
                id="message"
                name="message"
                value={question}
                cols={80}
                onChange={event => {
                    // 👇️ access textarea value
                    setQuestion(event.target.value);
                    // console.log(event.target.value);
                }}
            // style={{
            //     border: isFocused ? 'none' : '1px solid #ccc',
            //     outline: 'none',
            //     boxShadow: isFocused ? '0 0 5px 0 blue' : 'none',
            // }}
            />
            {/* <OutlinedInput
                fullWidth
                sx={{ mx: 1, my: 1 }}
                placeholder="Ask anything about the document!"
                id="component-outlined"
                multiline
                inputRef={inputRef}
                value={question}
                onChange={(e) => {
                    console.log(e.target.innerText)
                    setQuestion(...question, e.target.value)
                }}
            /> */}
            <Button variant='contained' onClick={handleSubmit}>
                Ask
            </Button>

        </div>
    )
}

