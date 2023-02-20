import React from "react";
import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
const PageNotFound = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/");
  };
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button type="primary" onClick={handleBack}>
          Back Home
        </Button>
      }
    />
  );
};

export default PageNotFound;
