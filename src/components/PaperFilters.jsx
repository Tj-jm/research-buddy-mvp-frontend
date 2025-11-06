import React from "react";
import { Box, TextField, Select, MenuItem } from "@mui/material";
import { FormControlLabel, Checkbox } from "@mui/material";

const PaperFilters = ({ searchInput, setSearchInput, search, setSearch, sortBy, setSortBy, sortOrder, setSortOrder, favoriteOnly,
  setFavoriteOnly }) => {
    return (
        <Box display="flex" gap={2} mb={2}>
            {/* Search */}
            <TextField
                label="Search"
                size="small"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
            />

            {/* Sort By */}
            <Select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                size="small"
            >
                <MenuItem value="created_at">Created At</MenuItem>
                <MenuItem value="title">Title</MenuItem>
            </Select>

            {/* Sort Order */}
            <Select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                size="small"
            >
                <MenuItem value="asc">Asc</MenuItem>
                <MenuItem value="desc">Desc</MenuItem>
            </Select>
            <FormControlLabel
                control={
                    <Checkbox
                        checked={favoriteOnly}
                        onChange={(e) => setFavoriteOnly(e.target.checked)}
                    />
                }
                label="Show favorites only"
            />
        </Box>
    );
};

export default PaperFilters;
