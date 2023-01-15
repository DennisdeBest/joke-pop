import {useState} from "react";

const Button = ({apiName = '', apiTitle = ''}) => {
  return (
    <button data-name={apiName}>{apiTitle}</button>
  )
}
