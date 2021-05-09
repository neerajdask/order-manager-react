import React from "react";

import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

export const Copyright = () => {
  return (
    <Typography
      variant='body2'
      color='textSecondary'
      align='center'
      style={{ position: "absolute", top: "90vh"}}>
      {"Copyright © "}
      <Link color='inherit' href='https://material-ui.com/'>
        Neeraj Das K
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};
