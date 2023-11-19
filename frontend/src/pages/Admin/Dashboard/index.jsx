import { useEffect } from 'react'
import html2canvas from 'html2canvas'
import * as pdfMake from 'pdfmake/build/pdfmake.js';
import { DownloadOutlined } from '@ant-design/icons';
import { Stack, Grid, Container, Typography, Box, IconButton } from '@mui/material'
import { useDispatch, useSelector } from "react-redux";
import SumnaryCard from './SummaryCard'
import { getDashboard } from '../../../store/actions/studentAction';

const Dashboard = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getDashboard());
      }, []);
    const generatePdf = () => {
        const pdfTable = document.getElementsByTagName('main')[0]
        if (pdfTable) {
            html2canvas(pdfTable).then(function (canvas) {
                const imgObj = {
                    image: canvas.toDataURL(),
                    width: 580,
                    height: 580,
                    style: {
                        alignment: 'center'
                    }
                }
                const documentDefinition = {
                    content: [imgObj],
                    pageSize: 'A4',
                    pageOrientation: 'landscape',
                    pageMargins: [5, 10, 5, 10]
                }
                const pdfDocGenerator = pdfMake.createPdf(documentDefinition)
                pdfDocGenerator.download()
            })
          } else {
            console.error("Main element not found");
          }
        
    }

    return (
      <>
            <Container maxWidth={false} sx={{ p: '0 !important' }}>
                <Stack>
                    <Box mb={2}>
                        <Grid item xs={12} sx={{ mb: 1, justifyContent: 'space-between', display: 'flex', alignItems: 'center', pl: 1, pr: 1 }}>
                            <Typography variant='h5'>Dashboard</Typography>
                            <IconButton onClick={generatePdf} title='Export file pdf this page'>
                                <DownloadOutlined style={{ fontSize: 24 }} />
                            </IconButton>
                        </Grid>
                        <SumnaryCard />
                    </Box>

                    {/* <Box mb={2}>
                        <Grid item xs={12}>
                            <Grid item xs={12} sx={{ mb: 1.7 }}>
                                <Typography variant='h5'>Registered Device</Typography>
                            </Grid>

                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <MainCard>
                                        <BarChart />
                                    </MainCard>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box> */}

                    {/* <Box mb={2}>
                        <Table />
                    </Box> */}

                    {/* {deviceGroupTypes.length !== 0 &&
                        <>
                            <Grid item xs={12} sx={{ mb: 1.7 }}>
                                <Typography variant='h5'>Devices/Device Group Types</Typography>
                            </Grid>
                            <Box mb={2}>
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <MainCard>
                                            <PieChart deviceGroupTypeId={deviceGroupTypes[0]['id']} />
                                        </MainCard>
                                    </Grid>

                                    <Grid item xs={6}>
                                        <MainCard>
                                            <PieChart deviceGroupTypeId={deviceGroupTypes[1]['id']} />
                                        </MainCard>
                                    </Grid>
                                </Grid>
                            </Box>

                            <Box mb={2}>
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <MainCard>
                                            <PieChart deviceGroupTypeId={deviceGroupTypes[2]['id']} />
                                        </MainCard>
                                    </Grid>

                                    <Grid item xs={6}>
                                        <MainCard>
                                            <PieChart deviceGroupTypeId={deviceGroupTypes[3]['id']} />
                                        </MainCard>
                                    </Grid>
                                </Grid>
                            </Box>
                        </>
                    } */}
                </Stack>
            </Container>
        </>
    );
  };
  
  export default Dashboard;
  