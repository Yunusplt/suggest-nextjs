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
  const [productSuggestions, setProductSuggestions] = useState<Product[]>([]);
  const [categorySuggestions, setCategorySuggestions] = useState<Product[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (query.trim() === "") {
      setProductSuggestions([]);
      setCategorySuggestions([]);
      return;
    }

    // filter products based on the query
    const filteredProducts = products
      .filter((item) => item.name.toLowerCase().includes(query.toLowerCase()))
      .slice(0, 6);

    setProductSuggestions(filteredProducts);

    // filter categories based on the query
    const filteredCategories = products
      .filter((item) =>
        item.category.toLowerCase().includes(query.toLowerCase())
      )
      .slice(0, 6);

    setCategorySuggestions(filteredCategories);
    setShowSuggestions(true);
  }, [query]);

  console.log("products", products);

  return (
    <Box
      sx={{
        position: "relative",
        mx: "auto",
        width: {
          xs: "350px",
          sm: "500px",
          md: "800px",
        },
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
      {showSuggestions &&
        (productSuggestions.length > 0 || categorySuggestions.length > 0) && (
          <Paper
            sx={{
              position: "relative",
              width: "100%",
              zIndex: 10,
              overflowY: "auto",
              mt: "8px",
              pt: "8px",
              display: "flex",
              flexDirection: {
                xs: "column",
                md: "row",
              },
              padding: "0 16px",
            }}
          >
            <Box
              sx={{
                width: {
                  xs: "100%",
                  md: "50%",
                },
                paddingRight: "8px",
                overflowY: "auto",
                pt: "8px",
                borderRight: {
                  xs: "none",
                  md: "1px solid #ccc",
                },
              }}
            >
              <h4>PRODUKTE</h4>
              <List>
                {productSuggestions.map((item, index) => (
                  <ListItem key={index}>
                    <ListItemText>
                      <strong
                        style={{
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          display: "block",
                          maxWidth: "100%",
                        }}
                      >
                        {item.name}
                      </strong>
                      <small>{item.category}</small>
                    </ListItemText>
                  </ListItem>
                ))}
              </List>
            </Box>

            <Box
              sx={{
                width: {
                  xs: "100%",
                  md: "50%",
                },
                paddingLeft: "8px",
                overflowY: "auto",
                pt: "8px",
              }}
            >
              <h4>KATEGORIEN</h4>
              <List>
                {categorySuggestions.map((item, index) => (
                  <ListItem key={index}>
                    <ListItemText>
                      <small>{item.category}</small>
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
