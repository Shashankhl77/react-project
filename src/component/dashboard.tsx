import React, { useEffect, useState } from "react";
import { Container, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Grid } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
const Dashboard: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  useEffect(() => {
    const savedUsers = localStorage.getItem("users");
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    }
  }, []);

  // Count users by email domain
  const domainCounts = users.reduce((acc: Record<string, number>, user) => {
    const domain = user.email.split("@")[1];
    acc[domain] = (acc[domain] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(domainCounts).map(([domain, count]) => ({
    domain,
    count,
  }));

  return (
    <Container>
      {/* User Counter */}
      <Paper sx={{ p: 10, mb: 2, textAlign: "center", backgroundColor: "#f5f5f5" }}>
        <Typography variant="h6">Total Users</Typography>
        <Typography variant="h3">{users.length}</Typography>
      </Paper>

      <Grid container spacing={3}>
        {/* User Data Table */}
        <Grid item xs={12} md={6}>
          <Typography variant="h6">User List</Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><b>Name</b></TableCell>
                  <TableCell><b>Address</b></TableCell>
                  <TableCell><b>Email</b></TableCell>
                  <TableCell><b>Phone</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.userId}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.address}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.phone}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        {/* Email Domain Chart */}
        <Grid item xs={12} md={6}>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>📧 Users </Typography>
        <Paper sx={{ p: 2, height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="domain" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#1976d2" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
