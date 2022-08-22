import React from 'react'
import { Box, H1, Button } from '@adminjs/design-system'



export const Dashboard = () => {
    return (
        <Box>
            <H1 style={{width: '100%', textAlign: 'center', marginTop: '20px'}}>Bienvenue Admin!</H1>

            <Box style={{display: 'flex', justifyContent: 'space-around'}}>
                <Box style={{width: '25%', height: '300px'}}>
                    <Button style={{width: '100%', height: '100%', fontSize: '30px'}} animate onClick={() => window.location='${process.env.CLIENT_URL}/feed'}>Revenir sur Groupomania</Button>
                </Box>
                <Box style={{width: '25%', height: '300px'}}>
                    <Button style={{width: '100%', height: '100%', fontSize: '30px'}} animate onClick={() => window.location='http://localhost:3050/admin/resources/user'}>Users</Button>
                </Box>
                <Box style={{width: '25%', height: '300px'}}>
                    <Button style={{width: '100%', height: '100%', fontSize: '30px'}} animate onClick={() => window.location='http://localhost:3050/admin/resources/post'}>Posts</Button>
                </Box>
            </Box>
        </Box>
    )
}

export default Dashboard