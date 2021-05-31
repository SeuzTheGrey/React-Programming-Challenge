import React from 'react';

interface Props {
    data: string[],
    fileName: string
}

export const ValidateIPVFour = ({data, fileName}: Props) => {

    ///Validates an IPV4 address for having the three dots and the values being between 0 and 255
    ///Manipulates the meta data from the data.json file to search for an ipv 4 match
    const validateIPV4 = (): boolean => {
        return data.some((value: string) => {
            if (value.includes(' '))
            {
               let metaDataSplit : string[] = value.split(' ')
               value = metaDataSplit.find(item => item.length < 16 && item.includes('.')) as string;
            }
            if (value.toLowerCase() === "undefined")
            {
                return false;
            }
            let valueArray: string[] = value.split('.');
            if (valueArray.length === 4) {
                if (valueArray.some(item => Number(item) < 0 && Number(item) > 255)) {
                    return false;
                } else {
                    return true;
                }
            } else {
                return false;
            }
        })
    }

    return (
        <p>
           The {fileName} File validated to be {validateIPV4() ? 'True' : 'False'}.
        </p>
    );
}