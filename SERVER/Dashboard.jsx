import React from 'react'
import styled from 'styled-components'
import {
  Box,
  H1,
  Button,
  Link
} from '@adminjs/design-system'



export const Dashboard = () => {
    return (
        <Box>
            <H1 style={{width: '100%', textAlign: 'center', marginTop: '20px'}}>Bienvenue Admin!</H1>

            <Box style={{display: 'flex', justifyContent: 'space-around'}}>
                <Box style={{width: '25%', height: '400px'}}>
                    <Button style={{width: '100%', height: '100%', fontSize: '30px'}} animate onClick={() => window.location='http://localhost:3000/'}>Revenir sur Groupomania</Button>
                </Box>
                <Box style={{width: '25%', height: '400px'}}>
                    <Button style={{width: '100%', height: '100%', fontSize: '30px'}} animate onClick={() => window.location='http://localhost:3050/admin/resources/user'}>Users</Button>
                </Box>
                <Box style={{width: '25%', height: '400px'}}>
                    <Button style={{width: '100%', height: '100%', fontSize: '30px'}} animate onClick={() => window.location='http://localhost:3050/admin/resources/post'}>Posts</Button>
                </Box>
            </Box>
        </Box>
    )
}

export default Dashboard