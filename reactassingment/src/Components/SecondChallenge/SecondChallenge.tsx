import React, {useState} from 'react';
import data from '../../Json Files/data.json';
import geo from '../../Json Files/geo.json';
import {Button, makeStyles, TextField} from "@material-ui/core";
import {ShortestDistance} from "../ShortestDistance/ShortestDistance";

const useStyles = makeStyles(theme => ({
    margin: {
        margin: theme.spacing(1),
    },
}));

export const SecondChallenge = () => {

    const [run, setRun] = useState(false);
    const [shortestDistance, setShortestDistance] = useState([{}] as any[]);
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);

    const classes = useStyles();

    //Find the ipv 4 address from data.meta in geo.json to find corresponding latitude and longitude
    //Calculate the shortest distance between the given latitude and longitude and the geo.json latitude and longitude
    //Create a new array with the shortest distance and sort by size
    //return the smallest 10
    const checkShortestDistance = (latitude: number, longitude: number) => {
        let shortestDistanceList = [];
        shortestDistanceList = data.map(value => {
            if (value.meta.includes(' ')) {
                let metaDataSplit: string[] = value.meta.split(' ')
                let ipv4Address: string = metaDataSplit.find(item => item.length < 16 && item.includes('.')) as string;

                let geoMatch = geo.find(item => item.ipv4 === ipv4Address);
                let latAndLong: string[] = geoMatch?.geo.split(',') ?? ['undefined'];

                if (latAndLong[0] !== 'undefined') {
                    const radius = 6371;
                    let rLatitude = latitude * Math.PI / 180;
                    let rGeoLatitude = Number(latAndLong[0]) * Math.PI / 180;
                    let dLatitude = (Number(latAndLong[0]) - latitude) * Math.PI / 180;
                    let dLongitude = (Number(latAndLong[1]) - longitude) * Math.PI / 180;

                    let a = Math.sin(dLatitude / 2) * Math.sin(dLatitude / 2) +
                        Math.cos(rLatitude) * Math.cos(rGeoLatitude) *
                        Math.sin(dLongitude / 2) * Math.sin(dLongitude / 2);
                    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

                    let d = radius * c;
                    value.meta = value.meta.concat(' ' + d);
                    return value;

                }
            }
        });

        //Sort the array
        shortestDistanceList = shortestDistanceList.sort((distance1, distance2) => {
            let splitDistance1 = distance1?.meta.split(' ');
            let splitDistance2 = distance2?.meta.split(' ');
            if (Number(splitDistance1![splitDistance1!.length - 1]) > Number(splitDistance2![splitDistance2!.length - 1])) {
                return 1;
            }

            if (Number(splitDistance1![splitDistance1!.length - 1]) < Number(splitDistance2![splitDistance2!.length - 1])) {
                return -1;
            }

            return 0;
        });

        shortestDistanceList = shortestDistanceList.slice(0, 10)
        return shortestDistanceList;
    }

    //Conditional rendering value
    const setRunState = () => {
        setRun(true);
    }

    //Prevent Event from running and calculate shortest distance
    const onSubmit = (event: React.ChangeEvent<any>) => {
        event.preventDefault();
        console.log(checkShortestDistance(latitude, longitude))

        setShortestDistance(checkShortestDistance(latitude, longitude))
    }

    //Handle input change
    const handleLatitudeChange = (event: React.ChangeEvent<any>) => {
        setLatitude(event.target.value);
    }

    //Handle input change
    const handleLongitudeChange = (event: React.ChangeEvent<any>) => {
        setLongitude(event.target.value);
    }

    if (!run) {
        return (
            <div>
                <Button variant="contained" color="primary" onClick={setRunState}>
                    Start Calculation
                </Button>
            </div>
        )
    } else {
        return (
            <div>
                <Button variant="contained" color="primary" onClick={setRunState}>
                    Start Calculation
                </Button>
                <form onSubmit={onSubmit}>
                    <TextField className={classes.margin} id="outlined-basic" variant="outlined" value={latitude}
                               onChange={handleLatitudeChange}/>
                    <TextField className={classes.margin} id="outlined-basic" variant="outlined" value={longitude}
                               onChange={handleLongitudeChange}/>
                    <div>
                        <Button className={classes.margin} variant="contained" color="primary" type="submit">
                            Submit Latitude and Longitude
                        </Button>
                    </div>
                </form>
                <div>
                    <h1>Shortest Distance List</h1>
                    <ul>
                        {shortestDistance.map(item =>
                            <ShortestDistance key={item.id} active={item.active} asn={item.asn} id={item.id}
                                              meta={item.meta} countrycode={item.countrycode}
                                              statecode={item.statecode}/>
                        )}
                    </ul>
                </div>

            </div>
        );
    }
}