"use client";
import React, { useEffect, useState } from "react";
import products from "../public/top-1000-products.json";
import {
  List,
  Paper,
  ListItem,
  TextField,
  ListItemText,
  Box,
} from "@mui/material";

type Product = {
  name: string;
  category: string;
  price: number;
};

export default function SearchSuggest() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (query.trim() === "") {
      setSuggestions([]);
      return;
    }
    const filtered = products
      .filter((item) => item.name.toLowerCase().includes(query.toLowerCase()))
      .slice(0, 6);

    setSuggestions(filtered);
  }, [query]);

  console.log("products", products);
  console.log(suggestions);

  return (
    <Box
      sx={{
        position: "relative",
        mx: "auto",
        width: "800px",
        height: "100%",
        mt: "2rem",
      }}
    >
      <TextField
        fullWidth
        label="Wonach suchen Sie?"
        variant="outlined"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setShowSuggestions(true)}
      />
      {showSuggestions && suggestions.length > 0 && (
        <Paper
          style={{
            position: "relative",
            width: "100%",
            zIndex: 10,
            overflowY: "auto",
            marginTop: 4,
            overflow: "hidden",
          }}
        >
          <Box>
            <List>
              {suggestions.map((item, index) => (
                <ListItem key={index}>
                  <ListItemText>
                    <strong>{item.name}</strong>
                    <br />
                    <small> {item.category}</small>
                  </ListItemText>
                </ListItem>
              ))}
            </List>
          </Box>
        </Paper>
      )}
    </Box>
  );
}
