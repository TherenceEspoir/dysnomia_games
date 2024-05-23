export default async function getCompanyById(companyId) {
    try {
        const result = await fetch(`https://m1.dysnomia.studio/api/Companies/${companyId}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        });

        if(result.status===204){
            return { data: null, error: null };
        }

        if (!result.ok) {
        
            throw new Error("Error fetching company details");
        }

        const data = await result.json();
        return { data: data, error: null };
    } catch (err) {
        return { data: null, error: err };
    }
}