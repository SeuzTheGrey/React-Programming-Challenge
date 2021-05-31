import React from 'react';

interface Props {
    active: number,
    asn: number,
    countrycode: string,
    id: number,
    statecode: string,
    meta: string
}

export const ShortestDistance = ({active, asn, countrycode, id, statecode, meta}: Props) => {

    return (
        <p>
            Active: {active} | asn: {asn} | Country Code: {countrycode} | id: {id} | state code: {statecode} | meta: {meta}
        </p>
    );
}