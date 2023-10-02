import { useContext, useEffect, useState } from "react";
import Header from "components/Headers/Header.js";
import AdminNavbar from "components/Navbars/AdminNavbar";
import { Bar } from 'react-chartjs-2';
import AppContext from "appState/context";
import { Grid } from "@mui/material";
import baseUrl from "url";
import basePath from "basePath";
import { useNavigate } from "react-router-dom";
import GlobalBarGraph from "components/globalBarGraph";
import useDashboard from "hooks/useDashboard";
const Index = () => {
  const appState = useContext(AppContext)
  const { setChangePassword } = appState;
  const { getData,
    chartData,
    chart1Data } = useDashboard()
  useEffect(() => {
    getData()
  }, [])
  let charts = [
    chartData,
    chart1Data
  ]
  return (
    <>
      <Header />
      <AdminNavbar
        brandText='Dashboard'
        setChangePassword={setChangePassword}
      />
      <Grid container spacing={2}>
        {charts?.map((chart, index) => (
          <Grid item xs={12} sm={12} md={(chart.size == 'full') ? 12 : 6} lg={(chart.size == 'full') ? 12 : 6} key={index}>
            <GlobalBarGraph data={chart} />
          </Grid>
        )
        )}
      </Grid>
    </>
  );
};

export default Index;
