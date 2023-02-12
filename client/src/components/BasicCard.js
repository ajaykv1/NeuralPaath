import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

export default function BasicCard({ children }) {
  return (
    <Card sx={{ minWidth: 450, minHeight: 250 }}>
      <CardContent sx={{ textAlign: "center" }}>{children}</CardContent>
    </Card>
  );
}
