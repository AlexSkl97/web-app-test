import React from "react";
import { Description } from "./Description";
import { SearchBar } from "./SearchBar";
import { Divider } from "antd";

const Main = () => (
  <>
    <Description />
    <Divider orientation="left">Search by User</Divider>
    <SearchBar />
  </>
);

export default Main;
