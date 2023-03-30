import { Box, Typography } from "@material-ui/core";
import React from "react";

export default function CollectionCard({
  selectedCollection,
  setSelectedCollection,
  data,
  isLoading,
}) {
  return (
    <Box
      className={`setPrice ${
        selectedCollection !== "create" && selectedCollection?._id === data?._id
          ? "active"
          : ""
      }`}
      onClick={() => (isLoading ? false : setSelectedCollection(data))}
      mb={2}
    >
      <img
        src={
          data?.collectionImage
            ? data?.collectionImage
            : "/images/logo-small.png"
        }
        style={{ borderRadius: "50%" }}
        alt='Onlycam'
      />
      <Typography
        variant='h6'
        style={{
          textAlign: "center",
          wordBreak: "break-all",
          padding: "0 5px",
          fontSize: "14px",
          textTransform: "capitalize",
        }}
      >
        {data?.displayName}
      </Typography>
      <Typography variant='body2'>{data?.network}</Typography>
    </Box>
  );
}
