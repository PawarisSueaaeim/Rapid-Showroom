import { Box } from "@mui/material";
import React, { useState } from "react";
import classes from "@/style/components/common/search/search.module.css";
import { useRouter } from "next/navigation";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";

interface IVehicle {
  listing_vpark_id: number;
  vehicle_id: number;
  brand: string;
  model: string;
  submodel: string;
  brand_id: number;
  model_id: number;
  submodel_id: number;
}

interface SearchProps {
  data: IVehicle[];
  placeholder: string;
}

const NewSearch: React.FC<SearchProps> = ({ data, placeholder }) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<IVehicle[]>([]);

  const handleSearch = (query: string) => {
    const lowerQuery = query.toLowerCase();

    const results = data.filter((vehicle) => {
      const { brand, model, submodel } = vehicle;
      return (
        brand.toLowerCase().includes(lowerQuery) ||
        model.toLowerCase().includes(lowerQuery) ||
        submodel.toLowerCase().includes(lowerQuery)
      );
    });

    setSearchResults(results);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    handleSearch(event.target.value);
  };

  const handleSelected = async (
    brand: string,
    model: string,
    submodel: string,
    brand_id: number,
    model_id: number,
    submodel_id: number
  ) => {
    try {
      setSearchTerm(`${brand}-${model}-${submodel}`);
      router.push(
        `?search=${brand}-${model}-${submodel}&brand_id=${brand_id}&model_id=${model_id}&submodel_id=${submodel_id}`
      );
    } catch (error) {
      console.log(error);
    } finally {
      setSearchResults([]);
    }
  };

  return (
    <Box width={"100%"} marginY={2}>
      <Box display={"flex"}>
        <input
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={handleChange}
          style={{
            width: "100%",
            border: "1px solid #D9D9D9",
            borderRadius: "5px 0 0 5px"
          }}
        />
        <button
          style={{ backgroundColor: "#4679C7" }}
          className={classes.button}
        >
          {searchResults.length === 0 ? (
            <SearchIcon
              onClick={() => {
                handleSelected;
              }}
            />
          ) : (
            <CloseIcon
              onClick={() => {
                setSearchResults([]);
              }}
            />
          )}
        </button>
      </Box>

      {searchResults.length !== 0 && (
        <Box className={classes.dataResult}>
          {searchResults.map((result, index) => (
            <Box
              key={`${result.vehicle_id}-${result.model_id}-${index}`}
              className={classes.dataItem}
              onClick={() => {
                handleSelected(
                  result.brand,
                  result.model,
                  result.submodel,
                  result.brand_id,
                  result.model_id,
                  result.submodel_id
                );
              }}
            >
              {result.brand} {result.model} {result.submodel}
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default NewSearch;
