import React from "react";
import styles from "./InfoAdmin.module.css";
import { useParams } from "react-router-dom";

export default function InfoAdmin() {
  let { type } = useParams();
  console.log(type);
  return <div></div>;
}
