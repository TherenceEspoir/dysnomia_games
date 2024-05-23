import React from 'react';
import { useParams } from 'react-router-dom';
import useCompanyDetails from '../../hooks/useCompanyDetails';
import CompanyDetailsView from './view';

const CompanyDetails = () => {
    const { companyId } = useParams();
    const { data, error, loading } = useCompanyDetails(companyId);
    // console.log(data);

    return (
        <CompanyDetailsView
            data={data}
            error={error}
            loading={loading}
        />
    );
};

export default CompanyDetails;
