const purchasedGamesStyles = {
  container: {
    padding: 1,
    backgroundColor: "rgb(236, 236, 237)",
  },
  headerContainer: {
    textAlign: "left",
    padding: 2,
    paddingBottom: 0,
  },
  filterBox: {
    textAlign: "center",
    marginTop: 2,
    marginBottom: 2,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "& .MuiSelect-select": {
      backgroundColor: "white",
    },
    "& .MuiSelect-icon": {
      color: "black",
    },
  },
  sortBox: {
    textAlign: "center",
    marginTop: 2,
    marginBottom: 2,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "& .MuiSelect-select": {
      backgroundColor: "white",
    },
    "& .MuiSelect-icon": {
      color: "black",
    },
  },
  noPurchasedGamesBox: {
    backgroundColor: "white",
    borderRadius: "8px",
    padding: "16px",
    margin: "16px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};

export default purchasedGamesStyles;
