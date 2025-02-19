import React, { useState, useEffect } from "react";
import { Container, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box } from "@mui/material";

const UserForm: React.FC = () => {
  const [userData, setUserData] = useState({
    userId: "",
    name: "",
    address: "",
    email: "",
    phone: ""
  });
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const savedUsers = localStorage.getItem("users");
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    }
  }, []);

  const generateUserId = () => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
  
    const randomLetter = () => letters[Math.floor(Math.random() * letters.length)];
    const randomNumber = () => numbers[Math.floor(Math.random() * numbers.length)];
  
    return (
      randomLetter() + randomLetter() +  // Two letters
      randomNumber() +                   // One number
      randomLetter() +                    // One letter
      randomNumber() + randomNumber()     // Two numbers
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser = { ...userData, userId: generateUserId() };
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setUserData({ userId: "", name: "", address: "", email: "", phone: "" });
  };

  return (
    <Container>
      <h1>User Data Form</h1>
      <Box sx={{ width: 800, mx: "auto" }}>
        <form onSubmit={handleSubmit}>
          <TextField fullWidth label="Name" name="name" value={userData.name} onChange={handleChange} required margin="normal" />
          <TextField fullWidth label="Address" name="address" value={userData.address} onChange={handleChange} required margin="normal" />
          <TextField fullWidth label="Email" type="email" name="email" value={userData.email} onChange={handleChange} required margin="normal" />
          <TextField fullWidth label="Phone" name="phone" value={userData.phone} onChange={handleChange} required margin="normal" />
          <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>Save</Button>
        </form>
      </Box>
      <h2>Saved Users</h2>
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>ID</b></TableCell>
              <TableCell><b>Name</b></TableCell>
              <TableCell><b>Address</b></TableCell>
              <TableCell><b>Email</b></TableCell>
              <TableCell><b>Phone</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.userId}>
                <TableCell>{user.userId}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.address}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default UserForm;
