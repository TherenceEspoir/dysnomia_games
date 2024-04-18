import { useEffect, useState } from 'react';

export default function useAPI() {
        const [data, setData] = useState([]);

        useEffect(() =>{
            async function getData(){
                const result = await fetch('https://m1.dysnomia.studio/api/Games/top?pageSize=10&page=1');

                if(!result.ok){
                    throw 'Pas OK';
                }

                const data = await result.json();
                setData(data);
            }
            getData();
        },[]);

        return data;
}