import React from 'react';

interface Props {
    data: string[],
    fileName: string
}

export const ValidateLongitudeAndLatitude = ({data, fileName}: Props) => {

    //Validate latitude and longitude
    //Checks if latitude is between -90 and 90
    //And Checks if longitude is between -180 and 180
    const validateLongitudeAndLatitude = () => {
        return data.some((value: string) => {
            let valueArray: string[] = value.split(',');
            if (valueArray.length === 2) {
                if (Number(valueArray[0]) >= -90 && Number(valueArray[0]) <= 90) {
                    if (Number(valueArray[1]) >= -180 && Number(valueArray[1]) <= 180) {
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    return false;
                }
            }else {
                return false;
            }
        })
    }

    return (
        <p>
            The {fileName} File validated to be {validateLongitudeAndLatitude() ? 'True' : 'False'}.
        </p>
    );
}