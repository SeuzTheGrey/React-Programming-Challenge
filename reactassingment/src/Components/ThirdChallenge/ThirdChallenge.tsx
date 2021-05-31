import React, {useState} from 'react';
import {Button} from "@material-ui/core";
import p3Data from '../../Json Files/p3Data.json'

export const ThirdChallenge = () =>{

    const [challenge, setChallenge] = useState(false)

    const setChallengeState = () => {
        setChallenge(true);
    }

    const doUnion = () => {
        let unionArray = [...p3Data.testSet1, ...p3Data.testSet2];
        console.log(unionArray);
        unionArray.map(value => {
            let dupArray = unionArray.filter(dup => dup.name === value.name && dup !== value)

            dupArray.forEach(dupItem => {
                Object.entries(dupItem).forEach(item => {
                    Object.entries(value).map(valueItem => {
                        if (item[0] === valueItem[0])
                        {

                            valueItem[1] += item[1];
                        }
                        console.log(valueItem)
                    })
                })


                Object.assign(value,dupItem)
                unionArray.splice(unionArray.indexOf(dupItem),1);

            });
            console.log(value)

        });
console.log(unionArray);
        return unionArray;
    }

    if (!challenge) {
        return (
            <div>
                <Button variant="contained" color="primary" onClick={setChallengeState}>
                    Start Challenge
                </Button>
            </div>
        )
    } else {
        return (
            <div>
                <Button variant="contained" color="primary" onClick={setChallengeState}>
                    Start Challenge
                </Button>
                <div>
                    {doUnion()}
                </div>
            </div>
        );
    }
}