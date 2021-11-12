import React, { useState } from "react";
import { Input, Alert, Spin } from "antd";
import { getAllGistUrl} from "./config";
import { SearchResults } from "./SearchResults";

const { Search } = Input;

export const SearchBar = () => {
    const[username, setUsername] = useState(null);
    const[data, setData] = useState([]);
    const[loading, setLoading] = useState(false);
    const[error, setError] = useState(false);

    const onSearch = async (username) => {
        const username = username.trim();
        setUsername(username);
        setLoading(true);
        if(username && username !== ""){
            try{
                const URL = getAllGistUrl(username);
                const res = await fetch(URL);
                const data = await res.json();
                setData(data);
                setLoading(false);
                setError(false);
            }catch(e){
                setLoading(false);
                setError(true);
            }
        
        }else if(username === ""){
            setLoading(false);
            setError(true);
        }
        setLoading(false);
    };

    return(
        <>
            <Search
                placeholder="Search username"
                allowClear
                enterButton="Search"
                size="large"
                onSearch={onSearch}
            />
            {loading ? <Spin tip="Loading..." style={{ margin: 10 }} /> : null}

            {username !== "" && data && !error ? (
                <SearchResults data={data} username={username}/>
            ) : null}

            {username && data.length === 0 ? (
                <Alert
                    message="Error"
                    description="User has no data"
                    type="error"
                    showIcon
                    style={{ marginTop: 10 }}
                />
            ) : null}

            {username === '' ? (
                <Alert
                    message="Error"
                    description="Please enter a valid username"
                    type="error"
                    showIcon
                    style={{ marginTop: 10 }}
                />
            ) : null}
        </>
    );
};