import React from 'react';
import './App.css';
import {FirstChallenge} from "./Components/FirstChallenge/FirstChallenge";
import {SecondChallenge} from "./Components/SecondChallenge/SecondChallenge";
import {ThirdChallenge} from "./Components/ThirdChallenge/ThirdChallenge";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import {Box, Button, makeStyles} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    margin: {
        margin: theme.spacing(1),
    },
    root: {
        background: "#999FA9",
        textAlign: "center",
        minHeight: "100vh",
    },
}));


function App() {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <header className="App-header">
                <Box>
                    <h3>Welcome to the application</h3>
                    <p>
                        Please select a link to view the solutions to the challenges
                    </p>
                </Box>
            </header>

            <Router>
                <Button component={Link} to="/" variant="outlined" href="#outlined-buttons" className={classes.margin}>
                    Home
                </Button>
                <Button component={Link} to="/firstChallenge" variant="outlined" href="#outlined-buttons"
                        className={classes.margin}>
                    First Challenge
                </Button>
                <Button component={Link} to="/secondChallenge" variant="outlined" href="#outlined-buttons"
                        className={classes.margin}>
                    Second Challenge
                </Button>
                <Button component={Link} to="/thirdChallenge" variant="outlined" href="#outlined-buttons"
                        className={classes.margin}>
                    Third Challenge
                </Button>


                <Switch>
                    <Route path="/firstChallenge">
                        <FirstChallenge />
                    </Route>
                    <Route path="/secondChallenge">
                        <SecondChallenge />
                    </Route>
                    <Route path="/thirdChallenge">
                        <ThirdChallenge />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
