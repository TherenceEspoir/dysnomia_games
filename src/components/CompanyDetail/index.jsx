/*import useCompanyDetails from "../../hooks/useCompanyDetails";
import { useParams } from "react-router-dom";

export default function CompanyDetail() {
    const { id } = useParams();
    const { data, error, loading } = useCompanyDetails(id);
    
    if (loading) {
        return <p>Loading...</p>;
    }
    
    if (error) {
        return <p>Error: {error.message}</p>;
    }
    
    if (data===null) {
        return <p>No details available for this company.</p>;
    }
    
    return (
        <div>
        <h1>Name : {data.name}</h1>
        <br />
        <h2>Summary :</h2>
        <p>{data.summary}</p>
        </div>
    );
    }
    */

import React from 'react';
import { useParams } from 'react-router-dom';
import useCompanyDetails from '../../hooks/useCompanyDetails';
import CompanyDetailsView from './view';

const CompanyDetails = () => {
    const { companyId } = useParams();
    const { data, error, loading } = useCompanyDetails(companyId);
    console.log(data);

    return (
        <CompanyDetailsView
            data={data}
            error={error}
            loading={loading}
        />
    );
};

export default CompanyDetails;
