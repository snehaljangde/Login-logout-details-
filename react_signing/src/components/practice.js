import React, { createContext } from 'react';
import {data, components} from './data';


const DataContext = createContext({});

const useDataContextValue = () => {
    
    const [dataList, setDataList] = React.useState(data);

    const [finaleRate, setFinaleRate] = React.useState(data.defaultRate);

    const changeComponent = (componentName, varient) => {
        let varientFromList;
        let rateList = [];
        components.forEach(row => {
            if (row.name.toLowerCase() === componentName.toLowerCase()) {
                varientFromList = row.varient.filter(item => {
                    return item.v_s_no === varient
                })[0];
            }
        })

        const selectedUserData = { ...dataList };
        selectedUserData.components.forEach(row => {
            if (row.name.toLowerCase() === componentName.toLowerCase()) {
                row.varient = varientFromList;
            }
            rateList = [...rateList, row.varient.price];
        })
        setDataList(selectedUserData);
        setFinaleRate(getSum(rateList));
    }

    const getSum = (values) => {
        return values.reduce((preValue, nextValue) => {
            return Number(preValue) + Number(nextValue);
        }, data.defaultRate);
    }

    return {
        dataList,
        components,
        changeComponent,
        finaleRate
    }
}


const useDataContext = () => {
    const dataContext = React.useContext(DataContext);
    if (!dataContext) {
        throw new Error('useDataContext must be used within the DataContext.Provider');
    }
    return dataContext;
}

export { useDataContextValue, useDataContext, DataContext };