import React from "react";
import { Route } from "react-router-dom";
import PageLayout from "./index";

const PublicRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(matchProps) => (
        <PageLayout>
          <Component {...matchProps} />
        </PageLayout>
      )}
    />
  );
};

export default PublicRoute;
