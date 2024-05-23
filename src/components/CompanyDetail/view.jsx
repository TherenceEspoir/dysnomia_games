import React from 'react';

const CompanyDetailsView = ({ data, error, loading }) => {
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (data === null) {
        return <div>No details available for this company.</div>;
    }

    return (
        <div>
            <h1>Company Details</h1>
            <p><strong>Name:</strong> {data.name}</p>
            <p><strong>Summary:</strong> {data.summary}</p>
        </div>
    );
};

export default CompanyDetailsView;
