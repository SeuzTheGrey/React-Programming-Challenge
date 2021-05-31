import React, {useState} from 'react';
import {ValidateIPVFour} from '../Validation/ValidateIPVFour';
import {ValidateLongitudeAndLatitude} from '../Validation/ValidateLongAndLat';
import data from '../../Json Files/data.json';
import geo from '../../Json Files/geo.json';
import {Button} from "@material-ui/core";

export const FirstChallenge = () => {

    const [validate, setValidate] = useState(false)

    //Map data for validation
    const MappedGeoIpv = geo.map(value => {
        return value.ipv4;
    })
    const MappedGeo = geo.map(value => {
        return value.geo;
    })
    const MappedData = data.map(value => {
        return value.meta;
    })

    const setValidationState = () => {
        setValidate(true);
    }

    if (!validate) {
        return (
            <div>
                <Button variant="contained" color="primary" onClick={setValidationState}>
                    Start Validation
                </Button>
            </div>
        )
    } else {
        return (
            <div>
                <Button variant="contained" color="primary" onClick={setValidationState}>
                    Start Validation
                </Button>
                <div>
                    <ValidateIPVFour data={MappedGeoIpv} fileName='geo'/>
                    <ValidateIPVFour data={MappedData} fileName='data'/>
                    <ValidateLongitudeAndLatitude data={MappedGeo} fileName='geo'/>
                </div>
            </div>
        );
    }
}