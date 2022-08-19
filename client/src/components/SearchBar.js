import { Input, List, Typography, ListItem } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
    const [search, setSearch] = useState("");
    const users = useSelector((state) => state.usersReducer);
    const navigate = useNavigate();
    
    const handleSearch = (e) => {
        let value = e.target.value;
        setSearch(value.toLowerCase());
    }

    const searchUser = (e, id) => {
        e.preventDefault()
        navigate(`/profile/${id}`);
    }
    
    return (
        <>
            <Box>
                <Input
                    type="text"
                    className="search"
                    placeholder="Search..."
                    onChange={handleSearch}
                />
            </Box>
            <List>
                {
                    users.length > 0 && users.filter((value) => {
                        if(search === "") {
                            return null
                        }
                        else{
                            return value.nom.toLowerCase().includes(search.replace(/ /g, '')) || value.prenom.toLowerCase().includes(search.replace(/ /g, ''))
                        }
                    })
                    .map((val) => {
                        return (
                            <ListItem onClick={(e) => searchUser(e, val.id)} key={val.id} ><Typography>{val.nom + ' ' + val.prenom}</Typography></ListItem>
                        )
                    })
                }    
            </List>
        </>
    );
}

export default SearchBar;