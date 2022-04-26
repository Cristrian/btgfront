import React, { useEffect } from "react";

//It's completed, whe need to parse the data into a Table and we're done with all the product
export default function Transaction({userId}) {
    useEffect(function () {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };
          
          fetch("api/v1/transactions/?user_id=" + userId, requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }, [])
}